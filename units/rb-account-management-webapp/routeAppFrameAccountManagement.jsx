// @flow

import Route from 'found/Route'
import Async from 'react-code-splitting'
import React from 'react'
import { graphql } from 'react-relay'

const ChangeSecretScreen = (props) => (
  <Async load={import('./components/ChangeSecretScreen')} componentProps={props} />
)

const UserProfileScreen = (props) => (
  <Async load={import('./components/UserProfileScreen')} componentProps={props} />
)

const LogoutScreen = (props) => (
  <Async load={import('./components/LogoutScreen')} componentProps={props} />
)

const NewUserScreen = (props) => (
  <Async load={import('./components/NewUserScreen')} componentProps={props} />
)

export default (
  <Route key="user" path="user">
    <Route path="new" Component={NewUserScreen} />

    <Route
      key="profile"
      path="profile"
      Component={UserProfileScreen}
      query={graphql`
        query routeAppFrameAccountManagement_UserProfileScreen_Query {
          Viewer {
            ...UserProfileScreen_Viewer
          }
        }
      `}
    />

    <Route path="change-secret" Component={ChangeSecretScreen} />

    <Route path="logout" Component={LogoutScreen} />
  </Route>
)
