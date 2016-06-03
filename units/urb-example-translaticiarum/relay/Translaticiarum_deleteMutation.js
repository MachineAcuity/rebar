/* @flow weak */

import Relay from 'react-relay';

export default class Translaticiarum_deleteMutation extends Relay.Mutation {
  static fragments = {
    Translaticiarum: () => Relay.QL`
      fragment on Translaticiarum {
        id,
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{Translaticiarum_delete}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on Translaticiarum_deletePayload {
        deletedTranslaticiarumId,
        Viewer {
          id
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'Translaticiarums',
      deletedIDFieldName: 'deletedTranslaticiarumId',
    }];
  }
  getVariables() {
    return {
      id: this.props.Translaticiarum.id,
    };
  }
  getOptimisticResponse() {
    return {
      deletedTranslaticiarumId: this.props.Translaticiarum.id,
    };
  }
}
