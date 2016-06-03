/* @flow weak */
'use strict';

import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class StatusButton extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    onPress: PropTypes.func.isRequired,
    style: Text.propTypes.style,
  };
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[
          styles.baseButton,
          this.props.active && styles.activeButton,
        ]}
        underlayColor="transparent">
        <Text style={[this.props.style, styles.buttonText]}>
          {this.props.children}
        </Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  activeButton: {
    borderColor: 'rgba(175, 47, 47, 0.2)',
    borderRadius: 6,
  },
  baseButton: {
    borderColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    top: 1,
  },
  buttonText: {
    fontSize: 16,
  },
});
