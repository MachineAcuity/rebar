import React from 'react'
import Relay from 'react-relay';
import {PropTypes} from "react"
import {StyleSheet, View, Text} from "react-native"
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
  },
  greeting: {
    height: 44,
    marginLeft: 15,
    alignSelf: 'stretch',
    fontSize: 20,
    justifyContent: 'center',
    color: '#000000',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  button: {
    height: 44,
    marginLeft: 15,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  }
} )

class DrawerView extends React.Component
{
  openRoute = ( route, options ) =>
  {
    this.context.drawer.close( )

    Actions[ route ]( options )
  }

  render( )
  {
    return (
      <View style={[styles.container, this.props.sceneStyle ]}>
        <Text style={ styles.greeting }>
          Hello
          { ' ' + ( this.props.Viewer.User_IsAnonymous ? 'Stranger' : this.props.Viewer.User_DisplayName ) }
        </Text>
        <Button containerStyle={ styles.button } onPress={ ( ) => this.openRoute( 'home_login' ) }>Login</Button>
        <Button containerStyle={ styles.button } onPress={ ( ) => this.openRoute( 'home_ToDo' ) }>To Do</Button>
      </View>
    )
  }
}

DrawerView.contextTypes = {
  drawer: React.PropTypes.object,
}

DrawerView.propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
}

export default Relay.createContainer( DrawerView, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        User_DisplayName
      }
    `,
  },
} )
