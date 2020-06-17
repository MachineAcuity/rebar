// @flow

import React from 'react'
import { graphql } from 'react-relay'

import routesRoot from '../../_configuration/rb-appbase-webapp/routesRoot'
import routesAppFrame from '../../_configuration/rb-appbase-webapp/routesAppFrame'
import AppFrame from '../../_configuration/rb-appbase-webapp/AppFrame'

import Route from 'found/Route'

export default (siteConfiguration: Object) => {
  let artifactNamePrefix = ''
  if (siteConfiguration.webapp && siteConfiguration.webapp.artifactNamePrefix)
    artifactNamePrefix = siteConfiguration.webapp.artifactNamePrefix

  return (
    <Route path={artifactNamePrefix + '/'}>
      <Route
        path="/"
        Component={AppFrame}
        query={graphql`
          query createDefaultRoutes_AppFrame_Query {
            Viewer {
              ...AppFrame_Viewer
            }
          }
        `}
      >
        {routesAppFrame}
      </Route>
      {routesRoot.length > 0 && routesRoot}
    </Route>
  )
}
