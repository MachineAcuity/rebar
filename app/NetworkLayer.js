import Relay, {
  DefaultNetworkLayer,
  RelayContext
} from 'react-relay';

import AnonymousUserToken2 from '../configuration/server/AnonymousUserToken2'
import publicURL from '../configuration/scripts/publicURL'


let user_token_1 = null
let user_token_2 = AnonymousUserToken2

export default class NetworkLayer
{
  static setUserTokens( _user_token_1, _user_token_2 )
  {
    user_token_1 = _user_token_1
    user_token_2 = _user_token_2
  }

  static injectNetworkLayer( )
  {
    const graphQLServerURL = publicURL + '/graphql';

    let headers = { }

    if( user_token_1 != null )
      headers.Cookie = 'user_token_1=' + user_token_1

    if( user_token_2 != null )
      headers.user_token_2 = user_token_2

    // TODO: equivalent of RelayContext.reset( )

    // Uncomment for connection to server in the cloud. Smarter way to do this will be needed.
    // graphQLServerURL = 'http://universal-relay-boilerplate.herokuapp.com/graphql';
    Relay.injectNetworkLayer( new DefaultNetworkLayer(
      graphQLServerURL,
      { headers: headers }
    ) );

  }
}
