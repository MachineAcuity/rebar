import React from 'react'
import {PropTypes} from "react"
import {StyleSheet, Text, View} from "react-native"
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#303030',
  },
  button: {
    height: 44,
    marginLeft: 15,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomColor: '#606060',
    borderBottomWidth: 1,
  }
} )

class DrawerView extends React.Component
{
  openRoute = ( route ) =>
  {
    const drawer = this.context.drawer

    drawer.close( )

    Actions[ route ]( )
  }

  render( )
  {
    return (
      <View style={[styles.container, this.props.sceneStyle ]}>
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

export default DrawerView
