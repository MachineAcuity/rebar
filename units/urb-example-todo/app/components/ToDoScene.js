'use strict';

import ToDoScreen from './ToDoScreen';
import ToDoScreenRoute from './ToDoRoute';
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RootContainer } from 'react-relay';

const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
} )



export default class ToDoScene extends React.Component
{
  render( ) : void
  {
    return(
      <View style={[styles.container, this.props.style]}>
        <RootContainer
          Component={ToDoScreen}
          route={new ToDoScreenRoute({status: 'any'})}
        />
      </View>
    )
  }
}
