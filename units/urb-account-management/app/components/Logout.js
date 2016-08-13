/* @flow weak */
'use strict'

import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import Relay from 'react-relay'
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import NetworkLayer from '../../../../app/NetworkLayer'


class Logout extends React.Component
{
  constructor(props, context)
  {
    super(props, context)
  }

  handle_onPress_Logout = ( ) =>
  {
    NetworkLayer.logout( ( ) => { setTimeout( ( ) => Actions[ 'home_login' ]( ), 100 ) } )
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={ styles.greeting }>
          Logged in as
          { ' ' + this.props.Viewer.User_DisplayName }
        </Text>
        <Button onPress={ this.handle_onPress_Logout }>Log out</Button>
      </View>
    )
  }
}

export default Relay.createContainer( Logout, {
  fragments: {
    Viewer: variables => Relay.QL`
      fragment on Viewer {
        User_DisplayName
      }
    `,
  },
})

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
} )
