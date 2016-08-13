/* @flow weak */
'use strict';

import Relay from 'react-relay';
import StatusButton from './StatusButton';
import ToDoList from './ToDoList';
import ToDoListFooter from './ToDoListFooter';
import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';




class ToDoScreen extends React.Component
{
  constructor(props, context)
  {
    super(props, context);
  }

  _handleStatusChange = ( status ) =>
  {
    this.props.relay.setVariables( { status } )
  };

  render()
  {
    return (
      <View style={styles.container}>
          <View style={styles.actionList}>
          <StatusButton
            active={this.props.relay.variables.status === 'any'}
            onPress={ ( ) => this._handleStatusChange( 'any' ) }>
            All
          </StatusButton>
          <StatusButton
            active={this.props.relay.variables.status === 'active'}
            onPress={ ( ) => this._handleStatusChange( 'active' ) }>
            Active
          </StatusButton>
          <StatusButton
            active={this.props.relay.variables.status === 'completed'}
            onPress={ ( ) => this._handleStatusChange( 'completed' ) }>
            Completed
          </StatusButton>
        </View>
        <ToDoList
          status={this.props.relay.variables.status}
          style={styles.list}
          Viewer={this.props.Viewer}
        />
        <ToDoListFooter
          status={this.props.relay.variables.status}
          style={styles.footer}
          Viewer={this.props.Viewer}
        />
      </View>
    );
  }
}

export default Relay.createContainer(ToDoScreen, {
  initialVariables: {
    status: 'any',
  },
  fragments: {
    Viewer: variables => Relay.QL`
      fragment on Viewer {
        ToDo_TotalCount
        ${ToDoList.getFragment('Viewer', {status: variables.status})}
        ${ToDoListFooter.getFragment('Viewer', {status: variables.status})}
      }
    `,
  },
});

const styles = StyleSheet.create({
  actionList: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    //paddingTop: Platform.OS === 'android' ? undefined : 20,
    paddingTop: 84 // TODO x3000 Read nav bar height from context
  },
  footer: {
    height: 10,
    paddingHorizontal: 15,
  },
  list: {
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {
      height: -2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
});
