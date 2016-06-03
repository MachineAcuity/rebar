// Originally from
// https://github.com/eyaleizenberg/react-native-floating-label-text-input/blob/master/index.js
// It has been copied and modified because at the time of writing it would not work with React 15
// Also, as such, there are some problems with integrating it, requiring changes in the code.

'use strict';

import React from 'react'
import { StyleSheet, Text, View, TextInput, Animated } from 'react-native'

var FloatingLabel = React.createClass({
  getInitialState: function() {
    var initialPadding = 9;
    var initialOpacity = 0;

    if (this.props.visible) {
      initialPadding = 5
      initialOpacity = 1
    }

    return {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity)
    };
  },

  componentWillReceiveProps: function(newProps) {
    Animated.timing(this.state.paddingAnim, {
      toValue: newProps.visible ? 5 : 9,
      duration: 230
    }).start();

    return Animated.timing(this.state.opacityAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: 230
    }).start();
  },

  render: function() {
    return(
      <Animated.View style={[styles.floatingLabel, {paddingTop: this.state.paddingAnim, opacity: this.state.opacityAnim}]}>
        {this.props.children}
      </Animated.View>
    );
  }
});

var TextFieldHolder = React.createClass({
  getInitialState: function() {
    return {
      marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
    };
  },

  componentWillReceiveProps: function(newProps) {
    return Animated.timing(this.state.marginAnim, {
      toValue: newProps.withValue ? 10 : 0,
      duration: 230
    }).start();
  },

  render: function() {
    return(
      <Animated.View style={{marginTop: this.state.marginAnim}}>
        {this.props.children}
      </Animated.View>
    );
  }
});

var FloatLabelTextField = React.createClass({
  getInitialState: function() {
    return {
      focussed: false,
      text: this.props.value
    };
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.hasOwnProperty('value') && newProps.value !== this.state.text) {
      this.setState({ text: newProps.value })
    }
  },

  withBorder: function() {
    if (!this.props.noBorder) {
      return styles.withBorder;
    };
  },

  render: function() {
    return(
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.paddingView}></View>
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={this.state.text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>{this.placeholderValue()}</Text>
            </FloatingLabel>
            <TextFieldHolder withValue={this.state.text}>
              <TextInput
                placeholder={this.props.placeholder}
                style={[styles.valueText]}
                defaultValue={this.props.defaultValue}
                value={this.state.text}
                maxLength={this.props.maxLength}
                selectionColor={this.props.selectionColor}
                onFocus={this.setFocus}
                onBlur={this.unsetFocus}
                onChangeText={this.setText}
                secureTextEntry={this.props.secureTextEntry}
                keyboardType={this.props.keyboardType}
                autoCapitalize={this.props.autoCapitalize}
                autoCorrect={this.props.autoCorrect}
              />
            </TextFieldHolder>
          </View>
        </View>
      </View>
    );
  },
  setFocus: function() {
    this.setState({
      focussed: true
    });
    try {
      return this.props.onFocus();
    } catch (_error) {}
  },

  unsetFocus: function() {
    this.setState({
      focussed: false
    });
    try {
      return this.props.onBlur();
    } catch (_error) {}
  },

  labelStyle: function() {
    if (this.state.focussed) {
      return styles.focussed;
    }
  },

  placeholderValue: function() {
    if (this.state.text) {
      return this.props.placeholder;
    }
  },

  setText: function(value) {
    this.setState({
      text: value
    });
    try {
      return this.props.onChangeTextValue(value);
    } catch (_error) {}
  },

  withMargin: function() {
    if (this.state.text) {
      return styles.withMargin;
    }
  }
});

var styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 45,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  paddingView: {
    width: 15
  },
  floatingLabel: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  fieldLabel: {
    height: 10,
    fontSize: 9,
    color: '#B1B1B1'
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  withBorder: {
    borderBottomWidth: 1 / 2,
    borderColor: '#C8C7CC',
  },
  valueText: {
    height: 20,
    fontSize: 16,
    color: '#111111'
  },
  withMargin: {
    marginTop: 10
  },
  focussed: {
    color: "#1482fe"
  }
});

module.exports = FloatLabelTextField
