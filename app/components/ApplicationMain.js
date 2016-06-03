import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Scene, Reducer, Router, Modal } from 'react-native-router-flux'

import NavigationDrawer from './NavigationDrawer'
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

function getSceneStyle ( props )
{
  return {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#0000ff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  }
}

class MenuButton extends React.Component {
  render = ( props ) => {
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


export default class ApplicationMain extends React.Component
{
  render( )
  {
    return <View style={styles.container}>
      <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Scene key="modal" component={Modal} >
            <Scene key="tabbar" component={NavigationDrawer} initial={true}>
              { routes( MenuButton ) }
            </Scene>
        </Scene>
      </Router>
    </View>
  }
}
