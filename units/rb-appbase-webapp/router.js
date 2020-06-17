// @flow

import { Resolver } from 'found-relay'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

import createRoutes from '../_configuration/rb-appbase-webapp/createRoutes'

import queryMiddleware from 'farce/queryMiddleware'
import makeRouteConfig from 'found/makeRouteConfig'

export const historyMiddlewares = [ queryMiddleware ]

export function createResolver(fetcher: any) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  })

  return new Resolver(environment)
}

export function routeConfig(siteConfiguration: Object) {
  return makeRouteConfig(createRoutes(siteConfiguration))
}
