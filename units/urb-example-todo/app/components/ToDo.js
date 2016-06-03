/* @flow weak */
'use strict';

import ToDo_updateStatusMutation from '../../relay/ToDo_updateStatusMutation';
import ToDo_updateRenameMutation from '../../relay/ToDo_updateRenameMutation';
import Relay from 'react-relay';
import TodoTextInput from './ToDoTextInput';
import React, {
  PropTypes,
} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

class ToDo extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  static propTypes = {
    onDestroy: PropTypes.func.isRequired,
    style: View.propTypes.style,
  };
  state = {
    isEditing: false,
  };
  constructor(props, context) {
    super(props, context);
    this._handleCompletePress = this._handleCompletePress.bind(this);
    this._handleLabelPress = this._handleLabelPress.bind(this);
    this._handleTextInputCancel = this._handleTextInputCancel.bind(this);
    this._handleTextInputDelete = this._handleTextInputDelete.bind(this);
    this._handleTextInputSave = this._handleTextInputSave.bind(this);
    this._setEditMode = this._setEditMode.bind(this);
  }
  _handleCompletePress() {
    var ToDo_Complete = !this.props.ToDo.ToDo_Complete;
    this.context.relay.commitUpdate(
      new ToDo_updateStatusMutation({
        ToDo_Complete,
        ToDo: this.props.ToDo,
        Viewer: this.props.Viewer,
      })
    );
  }
  _handleLabelPress() {
    this._setEditMode(true);
  }
  _handleTextInputCancel() {
    this._setEditMode(false);
  }
  _handleTextInputDelete() {
    this._setEditMode(false);
    this.props.onDestroy();
  }
  _handleTextInputSave(ToDo_Text) {
    this._setEditMode(false);
    this.context.relay.commitUpdate(
      new ToDo_updateRenameMutation({ToDo: this.props.ToDo, ToDo_Text})
    );
  }
  _setEditMode(shouldEdit) {
    this.setState({isEditing: shouldEdit});
  }
  renderCompleteCheckbox() {
    const imageModule = this.props.ToDo.ToDo_Complete ?
      require('../images/todo_checkbox-active.png') :
      require('../images/todo_checkbox.png');
    return (
      <TouchableHighlight
        onPress={this._handleCompletePress}
        style={styles.checkbox}
        underlayColor="transparent">
        <Image source={imageModule} />
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View style={[this.props.style, styles.container]}>
        {this.renderCompleteCheckbox()}
        {this.state.isEditing ?
          <TodoTextInput
            autoFocus={true}
            commitOnBlur={true}
            initialValue={this.props.ToDo.ToDo_Text}
            onCancel={this._handleTextInputCancel}
            onDelete={this._handleTextInputDelete}
            onSave={this._handleTextInputSave}
            style={[styles.labelText, styles.inputText, styles.input]}
          /> :
          <TouchableHighlight
            activeOpacity={1}
            onPress={this._handleLabelPress}
            style={styles.label}
            underlayColor="transparent">
            <Text
              numberOfLines={1}
              style={styles.labelText}>
              {this.props.ToDo.ToDo_Text}
            </Text>
          </TouchableHighlight>
        }
      </View>
    );
  }
}

export default Relay.createContainer(ToDo, {
  fragments: {
    ToDo: () => Relay.QL`
      fragment on ToDo {
        ToDo_Complete
        id
        ToDo_Text
        ${ToDo_updateStatusMutation.getFragment('ToDo')}
        ${ToDo_updateRenameMutation.getFragment('ToDo')}
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${ToDo_updateStatusMutation.getFragment('Viewer')}
      }
    `,
  },
});

const styles = StyleSheet.create({
  checkbox: {
    width: 40,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 58,
  },
  input: {
    flex: 1,
  },
  inputText: {
    marginHorizontal: Platform.OS === 'android' ? 11 : 15,
  },
  label: {
    borderBottomColor: Platform.OS === 'android' ? 'transparent' : undefined,
    borderBottomWidth: Platform.OS === 'android' ? 1 : undefined,
    flex: 1,
  },
  labelText: {
    color: 'rgb(77, 77, 77)',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-regular' : undefined,
    fontSize: 24,
    fontWeight: '300',
    marginHorizontal: 15,
    textAlign: 'left',
  },
});
