/* @flow weak */

import Relay from 'react-relay';

export default class Translaticiarum_updateMutation extends Relay.Mutation {
  static fragments = {
    Translaticiarum: () => Relay.QL`
      fragment on Translaticiarum {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{Translaticiarum_update}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on Translaticiarum_updatePayload {
        Translaticiarum {
          Translaticiarum_Type,
          Translaticiarum_Date,
          Translaticiarum_Time,
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        Translaticiarum: this.props.Translaticiarum.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.Translaticiarum.id,
      Translaticiarum_Type: this.props.Translaticiarum_Type,
      Translaticiarum_Date: this.props.Translaticiarum_Date,
      Translaticiarum_Time: this.props.Translaticiarum_Time,
    };
  }
  getOptimisticResponse() {
    return {
      Translaticiarum: {
        id: this.props.Translaticiarum.id,
        Translaticiarum_Type: this.props.Translaticiarum_Type,
        Translaticiarum_Date: this.props.Translaticiarum_Date,
        Translaticiarum_Time: this.props.Translaticiarum_Time,
      },
    };
  }
}
