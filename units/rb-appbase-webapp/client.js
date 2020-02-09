// @flow

// In order to use ES7 async/await
import 'babel-polyfill'

import BrowserProtocol from 'farce/lib/BrowserProtocol'
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter'
import createRender from 'found/lib/createRender'
import React from 'react'
import ReactDOM from 'react-dom'

import getGraphQLServerURL from '../_configuration/rb-appbase-webapp/getGraphQLServerURL'
import AppWrapper from '../_configuration/rb-appbase-webapp/AppWrapper'

import FetcherClient from './fetcherClient'
import { createResolver, historyMiddlewares, routeConfig } from './router'
import { getUserToken2, setUserToken2 } from './scripts/userToken2'

// Include global CSS used in all units. Will not be chunked
import '../_configuration/rb-appbase-webapp/global.css'

// Handler for error reporting
async function rebarErrorHandler(err, err_info) {
  try {
    // Do not report errors that do not carry meaningful information
    if (typeof err === 'string') {
      if (err.trimLeft() === '') return
    } else {
      if (err.message == null) return
      if (typeof err.message === 'string' && err.message.trimLeft() === '') return
      // TODO Disable react errors from client?
      // XXX Disable react errors from client?
      // if (
      //   typeof err.message === 'string' &&
      //   err.message.startsWith(
      //     'An error was thrown inside one of your components, but React does not know what it was.',
      //   )
      // )
      //   return
    }

    // Determine the host server
    const loc = window.location
    const host = loc.protocol + '//' + loc.hostname + ':' + loc.port

    // Pakcage up error details
    const body = JSON.stringify({
      UserToken2: getUserToken2(),
      err: { message: err.message, stack: err.stack },
      err_info,
    })

    // TODO Must provide correct name to client

    // Send away
    const response = await fetch(host + '/client-error/report', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    // Inform user of the result
    const responseAsObject = await response.json()
    if (responseAsObject.success) {
      alert(
        'An error has occurred. Use the following identifier when reporting to support:\n' +
          responseAsObject.issue_id,
      )
    } else {
      alert('An error has occurred. Attempt to assign an identifier has failed.')
    }
  } catch (err) {
    alert('An error has occurred. We were not able to assign an identifier to it.\nReason:' + err)
  }
}

// Load up react, relay and set up error handling

const render = createRender({})
;(async () => {
  const { relayPayloads, siteConfiguration, UserToken1 } = window.__rebar_properties__

  // It is critical that the app frame has UserToken2 retrieved. In the case of a rendering error like
  // 404 relaypayloads will be empty
  if (relayPayloads.length > 0) {
    setUserToken2(relayPayloads[0].data.Viewer.UserToken2)
  }

  // eslint-disable-next-line no-underscore-dangle
  const fetcher = new FetcherClient(
    getGraphQLServerURL(),
    relayPayloads,
    UserToken1,
    getUserToken2(),
  )
  const resolver = createResolver(fetcher)

  const Router = await createInitialFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares,
    routeConfig: routeConfig(siteConfiguration),
    resolver,
    render,
  })

  const contentComponent = (
    <AppWrapper siteConfiguration={siteConfiguration} url={document.location.href}>
      <Router resolver={resolver} />
    </AppWrapper>
  )
  ReactDOM.hydrate(
    contentComponent,
    // $AssureFlow
    document.getElementById('root'),
    () => {
      // IDEA Research if removal of styles if necessary
      // Previous version of react required removing of JSS styles but the new one seems to handle
      // them OK.
      // // We don't need the static css any more once we have launched our application.
      // const ssStyles = document.getElementById( 'server-side-styles' )
      // ssStyles.parentNode.removeChild( ssStyles )
    },
  )

  window.__rebar_error_handler__ = rebarErrorHandler
})()
