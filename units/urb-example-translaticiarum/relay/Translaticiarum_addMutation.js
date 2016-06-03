/* @flow weak */

import Relay from 'react-relay';

export default class Translaticiarum_addMutation extends Relay.Mutation {
  static fragments = {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{Translaticiarum_add}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on Translaticiarum_addPayload {
        TranslaticiarumsEdge,
        Viewer {
          Translaticiarums,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'Translaticiarums',
      edgeName: 'TranslaticiarumsEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables() {
    return {
      Translaticiarum_Type: this.props.Translaticiarum_Type,
      Translaticiarum_Date: this.props.Translaticiarum_Date,
      Translaticiarum_Time: this.props.Translaticiarum_Time,
    };
  }
  getOptimisticResponse() {
    return {
      TranslaticiarumsEdge: {
        node: {
          Translaticiarum_Type: this.props.Translaticiarum_Type,
          Translaticiarum_Date: this.props.Translaticiarum_Date,
          Translaticiarum_Time: this.props.Translaticiarum_Time,
        },
      },
      Viewer: {
        id: this.props.Viewer.id,
      },
    };
  }
}
