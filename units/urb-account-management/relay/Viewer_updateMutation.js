/* @flow weak */

import Relay from 'react-relay';

export default class Viewer_updateMutation extends Relay.Mutation
{
  static fragments = {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation( ) {
    return Relay.QL`mutation{Viewer_update}`;
  }
  getFatQuery( ) {
    return Relay.QL`
      fragment on Viewer_updatePayload {
        Viewer {
          User_DisplayName,
          User_ProfilePhoto,
          User_Email,
          User_PhoneNumberMobile,
          User_Locale,
        }
      }
    `;
  }
  getConfigs( ) {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        Viewer: this.props.Viewer.id,
      },
    }];
  }
  getVariables( ) {
    return {
      id:                      this.props.Viewer.id,
      User_DisplayName:        this.props.User_DisplayName,
      User_ProfilePhoto:       this.props.User_ProfilePhoto,
      User_Email:              this.props.User_Email,
      User_PhoneNumberMobile: this.props.User_PhoneNumberMobile,
      User_Locale:             this.props.User_Locale,
    };
  }
  getOptimisticResponse( ) {
    return {
      Viewer: {
        id:                     this.props.Viewer.id,
        User_DisplayName:       this.props.User_DisplayName,
        User_ProfilePhoto:      this.props.User_ProfilePhoto,
        User_Email:             this.props.User_Email,
        User_PhoneNumberMobile: this.props.User_PhoneNumberMobile,
        User_Locale:            this.props.User_Locale,
      },
    };
  }
}
