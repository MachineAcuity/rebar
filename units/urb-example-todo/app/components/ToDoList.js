/* @flow weak */
'use strict';

import ToDo_addMutation from '../../relay/ToDo_addMutation';
import ToDo_list_updateMarkAllMutation from '../../relay/ToDo_list_updateMarkAllMutation';
import Relay from 'react-relay';
import ToDo_deleteMutation from '../../relay/ToDo_deleteMutation';
//import Swipeout from 'react-native-swipeout';
import ToDo from './ToDo';
import TodoTextInput from './ToDoTextInput';
import React, {
  PropTypes,
} from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const _ToDosDataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.__dataID__ !== r2.__dataID__,
});

class ToDoList extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  static propTypes = {
    status: PropTypes.oneOf(['active', 'any', 'completed']).isRequired,
    style: View.propTypes.style,
  };
  constructor(props, context) {
    super(props, context);
    const {edges} = props.Viewer.ToDos;
    this.state = {
      initialListSize: edges.length,
      listScrollEnabled: true,
      ToDosDataSource: _ToDosDataSource.cloneWithRows(edges),
    };
    this._handleMarkAllPress = this._handleMarkAllPress.bind(this);
    this._handleSwipeInactive = this._handleSwipeInactive.bind(this);
    this._handleTextInputSave = this._handleTextInputSave.bind(this);
    this._handleTodoDestroy = this._handleTodoDestroy.bind(this);
    this.renderTodoEdge = this.renderTodoEdge.bind(this);
  }
  _handleMarkAllPress() {
    const numTodos = this.props.Viewer.ToDo_TotalCount;
    const numCompletedTodos = this.props.Viewer.ToDo_CompletedCount;
    const ToDo_Complete = numTodos !== numCompletedTodos;
    this.context.relay.commitUpdate(
      new ToDo_list_updateMarkAllMutation({
        ToDo_Complete,
        ToDos: this.props.Viewer.ToDos,
        Viewer: this.props.Viewer,
      })
    );
  }
  _handleSwipeInactive(swipeInactive) {
    this.setState({listScrollEnabled: swipeInactive});
  }
  _handleTextInputSave(ToDo_Text) {
    this.context.relay.commitUpdate(
      new ToDo_addMutation({ToDo_Text, Viewer: this.props.Viewer})
    );
  }
  _handleTodoDestroy(ToDo) {
    this.context.relay.commitUpdate(
      new ToDo_deleteMutation({
        ToDo,
        Viewer: this.props.Viewer,
      })
    );
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.Viewer.ToDos.edges !== nextProps.Viewer.ToDos.edges) {
      this.setState({
        ToDosDataSource:
          _ToDosDataSource.cloneWithRows(nextProps.Viewer.ToDos.edges),
      });
    }
  }
  renderTodoEdge(todoEdge) {
    const destroyHandler = this._handleTodoDestroy.bind(null, todoEdge.node);
    return (
      <ToDo
        onDestroy={destroyHandler}
        style={styles.ToDo}
        ToDo={todoEdge.node}
        Viewer={this.props.Viewer}
      />
    );
  }
  /*
  // Upgrade to react-native-swipeout that supports React Native 0.26
  // https://github.com/codefoundries/UniversalRelayBoilerplate/issues/34
  renderTodoEdge(todoEdge) {
    const destroyHandler = this._handleTodoDestroy.bind(null, todoEdge.node);
    return (
      <Swipeout
        key={todoEdge.node.id}
        right={[{
          text: 'Delete',
          type: 'delete',
          onPress: destroyHandler,
        }]}
        scroll={this._handleSwipeInactive}>
        <ToDo
          onDestroy={destroyHandler}
          style={styles.ToDo}
          ToDo={todoEdge.node}
          Viewer={this.props.Viewer}
        />
      </Swipeout>
    );
  }
  */
  renderSeparator(sectionId, rowId) {
    return <View key={`sep_${sectionId}_${rowId}`} style={styles.separator} />;
  }
  render() {
    const numTodos = this.props.Viewer.ToDo_TotalCount;
    const numCompletedTodos = this.props.Viewer.ToDo_CompletedCount;
    return (
      <View style={[this.props.style, styles.container]}>
        <View style={styles.addTodoContainer}>
          <TouchableHighlight
            onPress={this._handleMarkAllPress}
            style={styles.markAllButtonContainer}
            underlayColor="transparent">
            <Text
              style={[
                styles.markAllButton,
                numTodos !== numCompletedTodos && styles.markAllButtonDisabled,
              ]}>
              {'\u276F'}
            </Text>
          </TouchableHighlight>
          <TodoTextInput
            clearButtonMode="while-editing"
            onSave={this._handleTextInputSave}
            placeholder="What needs to be done?"
            style={styles.input}
          />
        </View>
        <ListView
          dataSource={this.state.ToDosDataSource}
          initialListSize={this.state.initialListSize}
          renderRow={this.renderTodoEdge}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

export default Relay.createContainer(ToDoList, {
  initialVariables: {
    status: 'any',
    limit: 2147483647,
  },

  prepareVariables( { status } )
  {
    var nextStatus;
    if (status === 'active' || status === 'completed') {
      nextStatus = status;
    } else {
      // This matches the Backbone example, which displays all ToDos on an
      // invalid route.
      nextStatus = 'any';
    }
    return {
      status: nextStatus,
      limit: 2147483647,  // GraphQLInt
    };
  },

  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_CompletedCount
        ToDos(status: $status, first: $limit) {
          edges {
            node {
              id
              ${ToDo_deleteMutation.getFragment('ToDo')}
              ${ToDo.getFragment('ToDo')}
            }
          }
          ${ToDo_list_updateMarkAllMutation.getFragment('ToDos')}
        }
        ToDo_TotalCount
        ${ToDo_addMutation.getFragment('Viewer')}
        ${ToDo_list_updateMarkAllMutation.getFragment('Viewer')}
        ${ToDo_deleteMutation.getFragment('Viewer')}
        ${ToDo.getFragment('Viewer')}
      }
    `,
  },
});

const styles = StyleSheet.create({
  addTodoContainer: {
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    height: 58,
    paddingHorizontal: 8,
    paddingVertical: 9,
  },
  container: {
    backgroundColor: 'white',
  },
  input: {
    bottom: 0,
    // FIXME: TextInput doesn't honor `fontWeight` or `fontStyle`
    //        https://github.com/facebook/react-native/issues/2140
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '300',
    // fontFamily: Platform.OS === 'android' ? 'sans-serif-regular' : undefined,
    left: Platform.OS === 'android' ? 61 : 65,
    position: 'absolute',
    right: 15,
    top: 0,
  },
  markAllButton: {
    color: '#737373',
    fontSize: 22,
  },
  markAllButtonContainer: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    transform: [{rotate: '90deg'}],
    width: 44,
  },
  markAllButtonDisabled: {
    color: '#e6e6e6',
  },
  separator: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
  },
  ToDo: {
    backgroundColor: 'white',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 8,
  },
});
