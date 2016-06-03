/* @flow weak */

import Relay from 'react-relay';

export default class Viewer_updatePasswordMutation extends Relay.Mutation
{
  static fragments = {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation( ) {
    return Relay.QL`mutation{Viewer_updatePassword}`;
  }
  getFatQuery( ) {
    return Relay.QL`
      fragment on Viewer_updatePasswordPayload {
        Viewer {
          id
        }
      }
    `;
  }
  getConfigs( ) {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on Viewer_updatePasswordPayload {
          ErrorMessage
        }
      `],
    }];
  }
  getVariables( ) {
    return {
      id:                           this.props.Viewer.id,
      User_AccountPassword_Current: this.props.User_AccountPassword_Current,
      User_AccountPassword:         this.props.User_AccountPassword,
    };
  }
  getOptimisticResponse( ) {
    return {
      Viewer: {
        id:                this.props.Viewer.id,
      },
    };
  }
}
