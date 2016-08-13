import { Actions } from 'react-native-router-flux'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from 'react-native-button'

import FloatingLabelTextInput from '../../../../app/components/FloatingLabelTextInput'
import NetworkLayer from '../../../../app/NetworkLayer'
import publicURL from '../../../../configuration/app/publicURL'
import { SuccessfulLoginRouteName, SuccessfulLoginRouteOptions } from '../../../../configuration/units/urb-account-management/app/SuccessfulLoginRoute'

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
} )

const mode_challenge = 1
const mode_login_in_progress = 2
const mode_login_failed = 3

export default class Login extends React.Component
{
  constructor( props )
  {
    super( props )

    this.loginAttempt = 0

    this.state = {
      mode: mode_challenge,
      User_AccountName: "",
      User_AccountPassword: "",
      ErrorMessage: "",
    }
  }

  handle_onPress_Login = ( ) =>
  {
    this.setState( {
      mode: mode_login_in_progress,
    } )

    const currentLoginAttempt = ++(this.loginAttempt)

    let UserToken1

    fetch( publicURL + '/auth/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        // TODO x5000 Test if the following is needed when posting to /auth/login: Host: 'localhost'?
      },
      body: JSON.stringify( {
        User_AccountName: this.state.User_AccountName,
        User_AccountPassword: this.state.User_AccountPassword,
      } )
    } )
    .then( ( response ) => {
      if( 'set-cookie' in response.headers.map )
        for( let cookie of response.headers.map[ 'set-cookie' ] )
          if( cookie.startsWith( 'UserToken1=' ) )
          {
            console.log( 'cookie=' + cookie )
            UserToken1 = cookie.substring( 11, cookie.indexOf( ';' ) )
            console.log( 'UserToken1=' + UserToken1 )
          }
      return response.json( )
    } )
    .then( (responseData ) => {
      if( currentLoginAttempt == this.loginAttempt )
      {
        if( responseData.success )
        {
          NetworkLayer.setUserTokens( UserToken1, responseData.UserToken2, true )

          Actions[ SuccessfulLoginRouteName ]( SuccessfulLoginRouteOptions )
        }
        else
        {
          let errorMessage
          if( responseData.error )
            errorMessage = responseData.error
          else
            errorMessage = "Login failed"

          this.setState( {
            mode: mode_login_failed,
            ErrorMessage: errorMessage,
          } )
        }
      }
      else
        console.log( "XXX Expired login event" )
    } )
    // TODO x5000 Error handling for failed login
    .done()
  }

  handle_onPress_Cancel = ( ) =>
  {
    this.loginAttempt++; // So that when the call back comes it is rejected

    this.setState( {
      mode: mode_challenge,
      User_AccountPassword: "",
    } )
  }

  handle_onPress_Retry = ( ) =>
  {
    this.setState( {
      mode: mode_challenge,
      User_AccountPassword: "",
    } )
  }

  render( )
  {
    if( this.state.mode == mode_challenge )
      return (
        <View style={styles.container}>
          <FloatingLabelTextInput
            placeholder={"Account Name"}
            value={this.state.User_AccountName}
            onChangeTextValue={(text) => this.setState({User_AccountName: text})}
          />
          <FloatingLabelTextInput
            placeholder={"Password"}
            secureTextEntry
            value={this.state.User_AccountPassword}
            onChangeTextValue={(text) => this.setState({User_AccountPassword: text})}
          />
          <Button onPress={ this.handle_onPress_Login }>Login</Button>
        </View>
      )
    else if( this.state.mode == mode_login_in_progress )
      return (
        <View style={styles.container}>
          <Text>Logging in as { this.state.User_AccountName }</Text>
          <Button onPress={ this.handle_onPress_Cancel }>Cancel</Button>
        </View>
      )
    else if( this.state.mode == mode_login_failed )
      return (
        <View style={styles.container}>
          <Text>Logging in as { this.state.User_AccountName } failed</Text>
          <Text>{ this.state.ErrorMessage }</Text>
          <Button onPress={ this.handle_onPress_Retry }>Retry</Button>
        </View>
      )
  }
}
