/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

import {
  AccountPasswordStrengthMin,
  AccountPasswordStrengthGood,
} from '../../../../configuration/units/urb-account-management/accountNameAndPasswordRequirements';
import { RequiresAuthenticationNotice } from './RequiresAuthentication.js';
import scorePassword from '../../../../configuration/units/urb-account-management/scripts/scorePassword';
import Viewer_updatePasswordMutation from '../../relay/Viewer_updatePasswordMutation';


class User_Properties extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  constructor( props )
  {
    super( props );

    this.state = {
      User_AccountPassword_Current: "",
      User_AccountPassword_CurrentError: "",
      User_AccountPassword: "",
      User_AccountPasswordError: "Enter password",
      User_AccountPasswordConfirmation: "",
      User_AccountPasswordConfirmationError: "Confirm password",
      User_AccountPasswordStrength: 0,
      SnackbarOpen: false,
      SnackbarMessage: "",
    };
  }

  _handle_Close_Snackbar = () =>
  {
    this.setState( { SnackbarOpen: false } );
  };

  _handle_onChange_User_AccountPassword_Current = ( event ) =>
  {
    this.setState( { User_AccountPassword_Current: event.target.value } );

    this.validateInputs( event.target.value, this.state.User_AccountPassword, this.state.User_AccountPasswordConfirmation );
  };

  _handle_onChange_User_AccountPassword = ( event ) =>
  {
    const passwordScore = scorePassword( event.target.value );

    this.setState( {
      User_AccountPassword: event.target.value,
      User_AccountPasswordStrength: passwordScore,
    } );

    this.validateInputs( this.state.User_AccountPassword_Current, event.target.value, this.state.User_AccountPasswordConfirmation );
  };

  _handle_onChange_User_AccountPasswordConfirmation = ( event ) =>
  {
    this.setState( { User_AccountPasswordConfirmation: event.target.value } );

    this.validateInputs( this.state.User_AccountPassword_Current, this.state.User_AccountPassword, event.target.value );
  };

  validateInputs( currentPassword, password, passwordConfirmation)
  {
    this.setState( { User_AccountPassword_CurrentError:
      currentPassword == "" ?
        "Enter current password"
        : ""
    } );

    this.setState( { User_AccountPasswordError:
      password == "" ?
        "Password can not be empty"
        : ""
    } );

    this.setState( { User_AccountPasswordConfirmationError:
      password != passwordConfirmation ?
        "Passwords do not match"
        : ""
    } );

    // Close snackbar since user is obviously typing
    this.setState( { SnackbarOpen: false } );
  }

  _handleUpdate = ( ) =>
  {
    var onFailure = () => {
      this.setState( {
        SnackbarOpen: true,
        SnackbarMessage: "Failed to update password",
        User_AccountPassword_Current: "",
        User_AccountPassword_CurrentError: "",
        User_AccountPassword: "",
        User_AccountPasswordError: "Enter password",
        User_AccountPasswordConfirmation: "",
        User_AccountPasswordConfirmationError: "Confirm password",
        User_AccountPasswordStrength: 0,
      } );
    };

    var onSuccess = (response) =>
    {
      const ErrorMessage = response.Viewer_updatePassword.ErrorMessage;

      this.setState( {
        SnackbarOpen: true,
        SnackbarMessage: ErrorMessage.length > 0 ? "Failed to update password: " + ErrorMessage : "Password updated successfully",
        User_AccountPassword_Current: "",
        User_AccountPassword_CurrentError: "",
        User_AccountPassword: "",
        User_AccountPasswordError: "Enter password",
        User_AccountPasswordConfirmation: "",
        User_AccountPasswordConfirmationError: "Confirm password",
        User_AccountPasswordStrength: 0,
      } );
    };

    this.context.relay.commitUpdate(
      new Viewer_updatePasswordMutation( {
        Viewer:                       this.props.Viewer,
        User_AccountPassword_Current: this.state.User_AccountPassword_Current,
        User_AccountPassword:         this.state.User_AccountPassword,
      } ),
      {onSuccess, onFailure}
    );
  };

  render( )
  {
    if( this.props.Viewer.User_IsAnonymous )
      return <RequiresAuthenticationNotice />; // Anonymous users do not get to have a password
    else
      return (
        <Card>
          <CardHeader
            title="User password"
          />
          <CardText>
            <TextField
              ref="User_AccountPassword_Current"
              type="password"
              floatingLabelText="Current Password"
              value={ this.state.User_AccountPassword_Current }
              errorText={ this.state.User_AccountPassword_CurrentError }
              onChange={ this._handle_onChange_User_AccountPassword_Current }
              fullWidth={ true }
            />
            <TextField
              ref="User_AccountPassword"
              type="password"
              floatingLabelText="New Password"
              value={ this.state.User_AccountPassword }
              errorText={ this.state.User_AccountPasswordError }
              onChange={ this._handle_onChange_User_AccountPassword }
              fullWidth={ true }
            />
            <TextField
              ref="User_AccountPasswordConfirmation"
              type="password"
              floatingLabelText="Confirm New Password"
              value={ this.state.User_AccountPasswordConfirmation }
              errorText={ this.state.User_AccountPasswordConfirmationError }
              onChange={ this._handle_onChange_User_AccountPasswordConfirmation }
              fullWidth={ true }
            />
            <br/><br/>Password strength
            <LinearProgress
              mode="determinate"
              value={ this.state.User_AccountPasswordStrength }
              color={ this.state.User_AccountPasswordStrength < AccountPasswordStrengthMin ?
                "#ff0000"
                : ( this.state.User_AccountPasswordStrength < AccountPasswordStrengthGood ?
                  "#c0c000"
                  : "#00d000" )
              }
            />
            <br/>
            <div>
              <RaisedButton
                label="Update"
                secondary={true}
                disabled={
                  this.state.User_AccountPassword_CurrentError != ""
                  ||
                  this.state.User_AccountPasswordError != ""
                  ||
                  this.state.User_AccountPasswordConfirmationError != ""
                }
                onTouchTap={ ( ) => this._handleUpdate( ) }
              />
            </div>
          </CardText>
          <Snackbar
            open={ this.state.SnackbarOpen }
            message={ this.state.SnackbarMessage }
            autoHideDuration={ 15000 }
            onRequestClose={ this._handle_Close_Snackbar }
          />
        </Card>
      );
  }
}

export default Relay.createContainer( User_Properties, {
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer{
        User_IsAnonymous,
        ${Viewer_updatePasswordMutation.getFragment('Viewer')},
      }
    `,
  }
} );
