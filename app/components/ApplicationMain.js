import React from 'react'
import Relay from 'react-relay';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Reducer, Router, Scene } from 'react-native-router-flux'

import NavigationDrawer from './NavigationDrawer'
import NetworkLayer from '../NetworkLayer'
import RelayRenderer from './RelayComponentRenderer'
import ViewerQuery from '../ViewerQuery'

import routes from '../../configuration/app/routes'


const styles = StyleSheet.create( {
  container: {
    flex:1,
    backgroundColor:"red",
  },
} )

const reducerCreate = params=>
{
  const defaultReducer = Reducer(params)
  return ( state, action ) => defaultReducer( state, action )
}

function getSceneStyle ( )
{
  return {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#ffffff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  }
}

class MenuButton extends React.Component {
  render = ( ) => {
    const drawer = this.context.drawer
		return (
			<TouchableOpacity
				onPress={() => drawer.open()}
			>
				<Image
					source={require('../../configuration/app/images/drawer_open.png')}
					style={{marginTop:20, height: 44, width: 44}}
				/>
			</TouchableOpacity>
		)
	}
}

MenuButton.contextTypes = {
  drawer: React.PropTypes.object,
}

// Will start the process of loading credentials. Notice that the function returns before the loading is complete
NetworkLayer.loadPersistedCredentials( )

class ApplicationMain extends React.Component
{
  constructor(props)
  {
    super( props )
    this.state = {
      environment: NetworkLayer.getCurrentEnvironment( )
    }
    NetworkLayer.RegisterListeningComponent( this )
  }

  updateEnvironment( )
  {
    this.setState( {
      environment: NetworkLayer.getCurrentEnvironment( )
    } )
  }

  getChildContext ()
  {
    return {
      environment: this.state.environment
    }
  }

  render( )
  {
    // If the persisted credentials have not been loaded yet
    if( this.state.environment == null )
      // Return an empty view. Once the credentials are loaded, updateEnvironment will be called and it will cause re-render
      return <View />
    else
      // Credentials are available, proceed to render UI
      return <View style={styles.container}>
        <Router createReducer={ reducerCreate } getSceneStyle={ getSceneStyle } wrapBy={ RelayRenderer( ) }>
          <Scene key="tabbar" component={ NavigationDrawer }  queries={ ViewerQuery } initial={ true }>
            { routes( MenuButton ) }
          </Scene>
        </Router>
      </View>
  }
}

ApplicationMain.childContextTypes = {
  environment: Relay.PropTypes.Environment
}

export default ApplicationMain
