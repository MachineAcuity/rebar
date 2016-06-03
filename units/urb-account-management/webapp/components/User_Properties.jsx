/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import { RequiresAuthenticationNotice } from './RequiresAuthentication.js';

import Viewer_updateMutation from '../../relay/Viewer_updateMutation';


class User_Properties extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  constructor( props )
  {
    super( props );

    this.state = {
      User_ProfilePhoto: this.props.Viewer.User_ProfilePhoto,
    };
  }

  _handle_onChange_User_ProfilePhoto = ( event, index, value ) =>
  {
    this.setState( {
      User_ProfilePhoto: value
    } );
  };

  _handleUpdate = ( ) =>
  {
    this.context.relay.commitUpdate(
      new Viewer_updateMutation( {
        Viewer:                 this.props.Viewer,
        User_DisplayName:       this.refs.User_DisplayName.getValue( ),
        User_ProfilePhoto:      this.state.User_ProfilePhoto,
        User_Email:             this.refs.User_Email.getValue( ),
        User_PhoneNumberMobile: this.refs.User_PhoneNumberMobile.getValue( ),
        User_Locale:            this.refs.User_Locale.getValue( ),
      } )
    );
  };

  render( )
  {
    if( this.props.Viewer.User_IsAnonymous )
      return <RequiresAuthenticationNotice />; // Anonymous users do not get to have a profile
    else
      return (
        <Card>
          <CardHeader
            title="User profile"
          />
          <CardText>
            <TextField
              value={ this.props.Viewer.User_AccountName }
              floatingLabelText="Account Name (read only)"
              fullWidth={ true }
            />
            <TextField
              ref="User_DisplayName"
              defaultValue={ this.props.Viewer.User_DisplayName }
              floatingLabelText="Display Name"
              fullWidth={ true }
            />
            <TextField
              ref="User_Email"
              defaultValue={ this.props.Viewer.User_Email }
              floatingLabelText="Email"
              fullWidth={ true }
            />
            <TextField
              ref="User_PhoneNumberMobile"
              defaultValue={ this.props.Viewer.User_PhoneNumberMobile }
              floatingLabelText="Mobile Phone #"
              fullWidth={ true }
            />
            <SelectField
              value={ this.state.User_ProfilePhoto }
              floatingLabelText="Choose profile photo"
              onChange={ this._handle_onChange_User_ProfilePhoto }
              fullWidth={ true }
            >
              <MenuItem value={ "/profile_photos/griz.jpg" }   primaryText="Griz"/>
              <MenuItem value={ "/profile_photos/grumpy.jpg" } primaryText="Grumpy"/>
              <MenuItem value={ "/profile_photos/ice.jpg" }    primaryText="Ice"/>
              <MenuItem value={ "/profile_photos/jack.jpg" }   primaryText="Jack"/>
              <MenuItem value={ "/profile_photos/jill.jpg" }   primaryText="Jill"/>
              <MenuItem value={ "/profile_photos/panda.jpg" }  primaryText="Panda"/>
            </SelectField>
            <img src={ this.state.User_ProfilePhoto }/>
            <TextField
              ref="User_Locale"
              defaultValue={ this.props.Viewer.User_Locale }
              floatingLabelText="Locale"
              fullWidth={ true }
            />
            <div>
              <RaisedButton
                label="Update"
                secondary={true}
                onTouchTap={ ( ) => this._handleUpdate( ) }
              />
            </div>
          </CardText>
        </Card>
      );
  }
}

export default Relay.createContainer( User_Properties, {
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer{
        User_IsAnonymous,
        User_AccountName,
        User_DisplayName,
        User_ProfilePhoto,
        User_Email,
        User_PhoneNumberMobile,
        User_Locale,
        ${Viewer_updateMutation.getFragment('Viewer')},
      }
    `,
  }
} );
