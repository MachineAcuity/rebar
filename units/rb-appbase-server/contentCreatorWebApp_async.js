// @flow

import fs from 'fs'
import path from 'path'

import ejs from 'ejs'
import createRender from 'found/lib/createRender'
import { getFarceResult } from 'found/lib/server'
import NestedError from 'nested-error-stacks'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { JssProvider, SheetsRegistry } from 'react-jss'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'

import AppWrapper from '../_configuration/rb-appbase-webapp/AppWrapper'
import ErrorComponent from '../_configuration/rb-appbase-webapp/ErrorComponent'
import getGraphQLLocalServerURL from '../_configuration/rb-base-server/getGraphQLLocalServerURL'
import log from '../rb-base-server/log'
import { version } from '../../package.json'
import UserToken2ServerRendering from '../_configuration/rb-base-server/UserToken2ServerRendering'
import htmlHeadAdditions from '../_configuration/rb-appbase-webapp/htmlHeadAdditions'
import type { SiteInformation } from '../rb-appbase-server/types/SiteInformation.types'
import { createResolver, historyMiddlewares, routeConfig } from '../rb-appbase-webapp/router'

import FetcherServer from './fetcherServer'

// Read environment
require('dotenv').config()

const envHost = process.env.HOST
if (envHost == null || typeof envHost !== 'string')
  throw new Error('Error: rb-appbase-webapp requires the environment variable HOST to be set')

const envPort = process.env.PORT
if (envPort == null || typeof envPort !== 'string')
  throw new Error('Error: rb-appbase-webapp requires the environment variable PORT to be set')

//

// HTML page templates
const htmlEjs = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'html.ejs'), 'utf8'))
const serverErrorHtml = ejs.compile(
  fs.readFileSync(path.resolve(__dirname, 'serverErrorHtml.ejs'), 'utf8'),
)

//

function getAssetsPath(siteInformation: SiteInformation): string {
  if (process.env.NODE_ENV === 'production') {
    // For when per-site assets are created
    /*
    const assetsPath =
      siteInformation.isMaDesignerDisabled || siteInformation.inEditingMode
        ? // When editing in production, use the assets with the configuration readign code intact (built when cutting a site version)
          `/assets/${version}`
        : // When in production mode, serve the assets compiled by designer
          `/sassets/${version}.${siteInformation.siteConfiguration.metadata.version}`
    */

    // If public URL is available in site configuration, prefix the assets with the public URL
    let assetsPathPrefix = ''
    if (
      siteInformation.siteConfiguration.webapp &&
      siteInformation.siteConfiguration.webapp.publicURL
    ) {
      assetsPathPrefix = siteInformation.siteConfiguration.webapp.publicURL
    }

    // Asset path is versioned
    const assetsPath = assetsPathPrefix + `/assets/${version}`
    return assetsPath
  } else {
    // Get webpack port only in development. In production it can be omitted
    const envPortWebpack = process.env.PORT_WEBPACK
    if (envPortWebpack == null || typeof envPortWebpack !== 'string')
      throw new Error(
        'Error: rb-appbase-webapp requires the environment variable PORT_WEBPACK to be set',
      )

    // When in development, always go to webpack over http
    return `http://${envHost}:${envPortWebpack}/${version}`
  }
}

const render = createRender({
  renderError(obj: Object): React$Element<*> {
    const { error } = obj

    if (error.status !== 404) {
      log('error', 'Error: rb-appbase-webapp createRender renderError', error)
    }

    return <ErrorComponent httpStatus={error.status} />
  },
})

export default (async function contentCreatorWebApp_async(
  siteInformation: SiteInformation,
  reqUrl: string,
  reqUserAgent: string,
  reqUserToken1: ?string,
  passUserToken1ToHeaders: boolean,
): Promise<{ htmlContent: string, status: number }> {
  try {
    const assetsPath = getAssetsPath(siteInformation)

    // It is possible that artifact_id can not be determined during development. For instance, when browsing
    // the project on localhost using a specific port, Chrome will request robots.txt and favicon.ico and
    // they will not have the proper dev-host header. In this case simply report the file missing.
    // This does not affect operation in production, since host will be passed for all requests.
    if (!siteInformation) {
      const htmlContent: string = serverErrorHtml({ root_html: 'Error 404' })
      return { htmlContent, status: 404 }
    }

    // If public URL is available in site configuration, prefix the assets with the public URL
    let artifactNamePrefix = ''
    if (
      siteInformation.siteConfiguration.webapp &&
      siteInformation.siteConfiguration.webapp.artifactNamePrefix
    ) {
      artifactNamePrefix = siteInformation.siteConfiguration.webapp.artifactNamePrefix
    }

    const graphQLServerUrl =
      `http://${envHost}:${envPort}` +
      artifactNamePrefix +
      getGraphQLLocalServerURL(siteInformation)

    const fetcher = new FetcherServer(graphQLServerUrl, reqUserToken1, UserToken2ServerRendering)

    const userAgent = reqUserAgent
    const { siteConfiguration } = siteInformation
    const siteConfigurationSubset = {
      webapp: siteConfiguration.webapp,
      builder: siteConfiguration.builder,
    }

    const siteRouteConfig = routeConfig(siteConfigurationSubset)

    const { redirect, element } = await getFarceResult({
      url: reqUrl,
      historyMiddlewares,
      routeConfig: siteRouteConfig,
      resolver: createResolver(fetcher),
      render,
    })

    if (redirect) {
      const htmlContent: string = serverErrorHtml({ root_html: 'Error 302' })
      const redirectUrl: string = redirect.url
      return { htmlContent, redirectUrl, status: 302 }
    }

    const relayPayloads = serialize(fetcher, { isJSON: true })

    if (
      typeof relayPayloads === 'string' &&
      relayPayloads.indexOf(
        // Notice that the string has no closing brace. A typical error string looks like:
        // '[{"errors":[{"message":"GraphQL server was given a session, but the session is invalid",
        // "locations":[{"line":888,"column":777}],"stack":"No stack information available",
        // "path":["node"]}],"data":null}]'
        '{"message":"GraphQL server was given a session, but the session is invalid"',
      ) > 0
    ) {
      const htmlContent: string = serverErrorHtml({ root_html: 'Error 403. Please log in again.' })
      return {
        status: 403,
        htmlContent,
      }
    }

    // [2 Crossroads][server] Update server rendering according to https://material-ui.com/guides/server-rendering/
    const sheets = new SheetsRegistry()
    const helmet = Helmet.rewind()

    const rootHTML = ReactDOMServer.renderToString(
      <JssProvider registry={sheets}>
        <AppWrapper userAgent={userAgent} siteConfiguration={siteConfigurationSubset} url={reqUrl}>
          {element}
        </AppWrapper>
      </JssProvider>,
    )

    if (rootHTML.startsWith('Error ')) {
      const status = parseInt(rootHTML.replace('Error ', ''))
      const htmlContent: string = serverErrorHtml({ root_html: rootHTML })

      return { status, htmlContent }
    } else {
      const htmlContent: string = htmlEjs({
        assets_path: assetsPath,
        root_html: rootHTML,
        server_side_styles: sheets.toString(),
        helmet,
        htmlHeadAdditions,
        siteConfiguration: JSON.stringify(siteConfigurationSubset),
        relayPayloads,
        UserToken1: JSON.stringify(passUserToken1ToHeaders ? reqUserToken1 : null),
      })

      return { status: 200, htmlContent }
    }
  } catch (err) {
    throw new NestedError('Rendering failed', err)
  }
})
