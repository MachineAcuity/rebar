/* @flow weak */

import Keychain from 'react-native-keychain'
import Relay, {
  DefaultNetworkLayer,
} from 'react-relay';

import AnonymousUserToken2 from '../configuration/server/AnonymousUserToken2'
import publicURL from '../configuration/app/publicURL'


let currentEnvironment = null
let listeningComponent = null

export default class NetworkLayer
{
  static loadPersistedCredentials( )
  {
    Keychain
      .getGenericPassword( )
      .then( (credentials) => {
        const credentialsJSON = JSON.parse( credentials.password, true )
        NetworkLayer.setUserTokens( credentialsJSON.UserToken1, credentialsJSON.UserToken2, false )
      } )
      .catch( ( error ) => {
        NetworkLayer.setUserTokens( null, AnonymousUserToken2, false )
      } )
  }

  static logout( cb )
  {
    Keychain.resetGenericPassword( )
    .then( ( ) => NetworkLayer.setUserTokens( null, AnonymousUserToken2, false ) )
    .then( ( ) => cb( ) )
  }

  static setUserTokens( UserToken1, UserToken2, persist )
  {
    // New tokens mean new environment
    currentEnvironment = new Relay.Environment( )

    // Set up options for network layer
    let headers = { }

    if( UserToken1 != null )
      headers.Cookie = 'UserToken1=' + UserToken1

    if( UserToken2 != null )
      headers.UserToken2 = UserToken2

    const graphQLServerURL = publicURL + '/graphql';

    // Create network layer with options and inject
    currentEnvironment.injectNetworkLayer( new DefaultNetworkLayer(
      graphQLServerURL,
      { headers: headers }
    ) )

    if( listeningComponent )
      listeningComponent.updateEnvironment( UserToken1 == null )

    if( persist )
    {
      const tokensAsJSON = JSON.stringify( { UserToken1, UserToken2 } )
      Keychain.setGenericPassword( 'user', tokensAsJSON )
    }
  }

  static getCurrentEnvironment( )
  {
    return currentEnvironment
  }

  static RegisterListeningComponent( component )
  {
    listeningComponent = component
  }
}
