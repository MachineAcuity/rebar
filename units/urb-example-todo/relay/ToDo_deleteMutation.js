/* @flow weak */

import Relay from 'react-relay';

export default class ToDo_deleteMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Mark ToDo_Complete as optional
    ToDo: () => Relay.QL`
      fragment on ToDo {
        ToDo_Complete,
        id,
      }
    `,
    // TODO: Mark ToDo_CompletedCount and ToDo_TotalCount as optional
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_CompletedCount,
        id,
        ToDo_TotalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_delete}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_deletePayload {
        deletedToDoId,
        Viewer {
          ToDo_CompletedCount,
          ToDo_TotalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'ToDos',
      deletedIDFieldName: 'deletedToDoId',
    }];
  }
  getVariables() {
    return {
      id: this.props.ToDo.id,
    };
  }
  getOptimisticResponse() {
    var ViewerPayload = {id: this.props.Viewer.id};
    if (this.props.Viewer.ToDo_CompletedCount != null) {
      ViewerPayload.ToDo_CompletedCount = this.props.ToDo.ToDo_Complete === true ?
        this.props.Viewer.ToDo_CompletedCount - 1 :
        this.props.Viewer.ToDo_CompletedCount;
    }
    if (this.props.Viewer.ToDo_TotalCount != null) {
      ViewerPayload.ToDo_TotalCount = this.props.Viewer.ToDo_TotalCount - 1;
    }
    return {
      deletedToDoId: this.props.ToDo.id,
      Viewer: ViewerPayload,
    };
  }
}
