import Relay from 'react-relay'

export default class SceneRouteBase extends Relay.Route
{
  static prepareParams = ( prevParams ) => {
    return { ...prevParams }
  }
  static queries = { Viewer: ( ) => Relay.QL`query { Viewer }` }
  static routeName = 'RootQueryRoute'
}
