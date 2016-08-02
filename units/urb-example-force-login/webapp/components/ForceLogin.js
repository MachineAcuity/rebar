/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader, CardText} from 'material-ui/Card';

import { RequiresAuthenticationNotice } from '../../../../units/urb-account-management/webapp/components/RequiresAuthentication.js';


class ForceLogin extends React.Component
{
  render( )
  {
    if( this.props.Viewer.User_IsAnonymous )
      return <RequiresAuthenticationNotice />; // Anonymous users do not get to have a profile
    else
      return (
        <Card>
          <CardHeader
            title="Only Authorized"
            subtitle="Only users who log in see this."
          />
          <CardText>
            Content seen by authorized users
          </CardText>
        </Card>
      )
    }
}

export default Relay.createContainer( ForceLogin, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
} );
