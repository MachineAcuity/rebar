// @flow

import Route from 'found/Route'
import Async from 'react-code-splitting'
import { graphql } from 'react-relay'
import React from 'react'

const HomePageScreen = (props) => (
  <Async load={import('./components/HomePageScreen')} componentProps={props} />
)

export default (
  <Route
    key="/"
    path="/"
    Component={HomePageScreen}
    query={graphql`
      query routeAppFrameDemo_HomePageScreen_Query {
        Viewer {
          ...HomePageScreen_Viewer
        }
      }
    `}
  />
)
