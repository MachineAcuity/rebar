// @flow

import Route from 'found/Route'
import Async from 'react-code-splitting'
import { graphql } from 'react-relay'
import React from 'react'

const ForceLogin = (props) => (
  <Async load={import('./components/ForceLogin')} componentProps={props} />
)

export default (
  <Route key="force-login" path="force-login">
    <Route
      path="/"
      Component={ForceLogin}
      query={graphql`
        query routeAppFrameForceLogin_ForceLogin_Query {
          Viewer {
            ...ForceLogin_Viewer
          }
        }
      `}
    />
  </Route>
)
