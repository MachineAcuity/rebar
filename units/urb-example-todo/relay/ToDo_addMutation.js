/* @flow weak */

import Relay from 'react-relay';

export default class ToDo_addMutation extends Relay.Mutation {
  static fragments = {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        ToDo_TotalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_add}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_addPayload {
        ToDosEdge,
        Viewer {
          ToDos,
          ToDo_TotalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'ToDos',
      edgeName: 'ToDosEdge',
      rangeBehaviors: {
        '': 'append',
        'status(any)': 'append',
        'status(active)': 'append',
        'status(completed)': null,
      },
    }];
  }
  getVariables() {
    return {
      ToDo_Text: this.props.ToDo_Text,
    };
  }
  getOptimisticResponse() {
    return {
      // FIXME: ToDo_TotalCount gets updated optimistically, but this edge does not
      // get added until the server responds
      ToDosEdge: {
        node: {
          ToDo_Complete: false,
          ToDo_Text: this.props.ToDo_Text,
        },
      },
      Viewer: {
        id: this.props.Viewer.id,
        ToDo_TotalCount: this.props.Viewer.ToDo_TotalCount + 1,
      },
    };
  }
}
