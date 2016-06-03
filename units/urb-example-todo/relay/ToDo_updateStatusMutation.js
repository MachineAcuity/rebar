/* @flow weak */

import Relay from 'react-relay';

export default class ToDo_updateStatusMutation extends Relay.Mutation {
  static fragments = {
    ToDo: () => Relay.QL`
      fragment on ToDo {
        id,
      }
    `,
    // TODO: Mark ToDo_CompletedCount optional
    Viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        ToDo_CompletedCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_updateStatus}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_updateStatusPayload {
        ToDo {
          ToDo_Complete,
        },
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
        ToDo: this.props.ToDo.id,
        Viewer: this.props.Viewer.id,
      },
    }];
  }
  getVariables() {
    return {
      ToDo_Complete: this.props.ToDo_Complete,
      id: this.props.ToDo.id,
    };
  }
  getOptimisticResponse() {
    var ViewerPayload = {id: this.props.Viewer.id};
    if (this.props.Viewer.ToDo_CompletedCount != null) {
      ViewerPayload.ToDo_CompletedCount = this.props.ToDo_Complete ?
        this.props.Viewer.ToDo_CompletedCount + 1 :
        this.props.Viewer.ToDo_CompletedCount - 1;
    }
    return {
      ToDo: {
        ToDo_Complete: this.props.ToDo_Complete,
        id: this.props.ToDo.id,
      },
      Viewer: ViewerPayload,
    };
  }
}
