/* @flow weak */

import Relay from 'react-relay';

export default class ToDo_list_updateMarkAllMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Mark edges and ToDo_TotalCount optional
    ToDos: () => Relay.QL`
      fragment on ToDosConnection {
        edges {
          node {
            ToDo_Complete,
            id,
          },
        },
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        ToDo_TotalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_list_updateMarkAll}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_list_updateMarkAllPayload {
        Viewer {
          ToDo_CompletedCount,
          ToDos,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        Viewer: this.props.Viewer.id,
      },
    }];
  }
  getVariables() {
    return {
      ToDo_Complete: this.props.ToDo_Complete,
    };
  }
  getOptimisticResponse() {
    var ViewerPayload = {id: this.props.Viewer.id};
    if (this.props.ToDos && this.props.ToDos.edges) {
      ViewerPayload.ToDos = {
        edges: this.props.ToDos.edges
          .filter(edge => edge.node.ToDo_Complete !== this.props.ToDo_Complete)
          .map(edge => ({
            node: {
              ToDo_Complete: this.props.ToDo_Complete,
              id: edge.node.id,
            },
          }))
      };
    }
    if (this.props.Viewer.ToDo_TotalCount != null) {
      ViewerPayload.ToDo_CompletedCount = this.props.ToDo_Complete ?
        this.props.Viewer.ToDo_TotalCount :
        0;
    }
    return {
      Viewer: ViewerPayload,
    };
  }
}
