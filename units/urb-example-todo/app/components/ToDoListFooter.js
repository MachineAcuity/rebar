/* @flow weak */
'use strict';

import Relay from 'react-relay';
import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class ToDoListFooter extends React.Component {
  static propTypes = {
    status: PropTypes.oneOf(['active', 'any', 'completed']).isRequired,
    style: View.propTypes.style,
  };
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var numCompletedTodos = this.props.Viewer.ToDo_CompletedCount;
    var numRemainingTodos = this.props.Viewer.ToDo_TotalCount - numCompletedTodos;
    return (
      <View style={[this.props.style, styles.container]}>
        <Text>
          <Text style={styles.strong}>
            {numRemainingTodos}
          </Text> item{numRemainingTodos === 1 ? '' : 's'} left
        </Text>
      </View>
    );
  }
}

export default Relay.createContainer(ToDoListFooter, {
  initialVariables: {
    status: 'any',
  },
  prepareVariables(prevVars) {
    return {
      ...prevVars,
      limit: 2147483647,  // GraphQLInt
    };
  },
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_CompletedCount,
        ToDo_TotalCount
      }
    `,
  },
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },
  strong: {
    fontWeight: 'bold',
  },
});
