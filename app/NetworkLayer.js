import Keychain from 'react-native-keychain'
import Relay, {
  DefaultNetworkLayer,
} from 'react-relay';

import AnonymousUserToken2 from '../configuration/server/AnonymousUserToken2'
import publicURL from '../configuration/app/publicURL'


let UserToken1 = null
let UserToken2 = null
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
        NetworkLayer.setUserTokens( credentialsJSON.UserToken1, credentialsJSON.UserToken2 )
      } )
      .catch( ( error ) => {
        NetworkLayer.setUserTokens( null, AnonymousUserToken2, true )
      } )
  }

  static setUserTokens( _UserToken1, _UserToken2, doNotPersist )
  {
    UserToken1 = _UserToken1
    UserToken2 = _UserToken2
    currentEnvironment = null // In order to force the creation of new environment

    if( listeningComponent )
    {
      listeningComponent.updateEnvironment( )
    }

    if( ! doNotPersist )
    {
      const tokensAsJSON = JSON.stringify( { UserToken1, UserToken2 } )
      Keychain.setGenericPassword( 'user', tokensAsJSON )
    }
  }

  static createNetworkLayer( )
  {
    const graphQLServerURL = publicURL + '/graphql';

    let headers = { }

    if( UserToken1 != null )
      headers.Cookie = 'UserToken1=' + UserToken1

    if( UserToken2 != null )
      headers.UserToken2 = UserToken2

    return new DefaultNetworkLayer(
      graphQLServerURL,
      { headers: headers }
    )
  }

  static getCurrentEnvironment( )
  {
    // UserToken2 will be null before persistent credentials are retrieved, or anonymous credentials are set
    if( currentEnvironment == null && UserToken2 != null )
    {
      currentEnvironment = new Relay.Environment( )
      currentEnvironment.injectNetworkLayer( NetworkLayer.createNetworkLayer( ) )
    }

    return currentEnvironment
  }

  static RegisterListeningComponent( component )
  {
    listeningComponent = component
  }
}
