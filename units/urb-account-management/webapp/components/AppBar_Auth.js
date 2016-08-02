/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconSocialPerson from 'material-ui/svg-icons/social/person';
import IconSocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import LinearProgress from 'material-ui/LinearProgress';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import {white} from 'material-ui/styles/colors';
import { registerAuthenticationRequiredCallback } from './RequiresAuthentication.js';

import {
  AccountNameLengthMin,
  AccountPasswordLengthMin,
  AccountPasswordStrengthMin,
  AccountPasswordStrengthGood,
  AccountNameAlias,
  AccountNameAdditionalValidation,
} from '../../../../configuration/units/urb-account-management/accountNameAndPasswordRequirements';
import {ExtensionsForLogIn, ExtensionsForCreateUser} from '../../../../configuration/units/urb-account-management/webapp/components/AccountManagementExtensions'
import { postXHR } from '../../../../webapp/scripts/XHR';
import scorePassword from '../../../../configuration/units/urb-account-management/scripts/scorePassword';

const styles = {
  popover: {
    padding: 10,
  },
};

function isAccountNameAcceptable( AccountName )
{
  if( AccountName.length <  AccountNameLengthMin )
    return false

  return AccountNameAdditionalValidation( AccountName )
}

class AppBar_Auth extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      User_AccountName: '',
      User_AccountPassword: '',
      Account_information_Supplied: false,
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: false,
      Dialog_CreateUser_IsOpen : false,
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: false,
      Dialog_LogOutConfirmation_IsOpen : false,
      Dialog_LogOutInProgress_IsOpen: false,
      Dialog_LogOutFailed_IsOpen: false,
      Popover_AuthorizedUser_IsOpen : false,
    };
  }



  // Handle popping open the login dialog if authentication is required
  componentWillMount( )
  {
    registerAuthenticationRequiredCallback( this._callback_OpenAuthenticationChallenge );
  }

  componentWillUnmount( )
  {
    registerAuthenticationRequiredCallback( null );
  }

  _callback_OpenAuthenticationChallenge = ( ) =>
  {
    this.setState( {
      User_AccountName: '',
      User_AccountPassword: '',
      Account_information_Supplied: false,
      Dialog_AuthenticationChallenge_IsOpen: true,
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: false,
      Dialog_CreateUser_IsOpen : false,
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: false,
      Dialog_LogOutConfirmation_IsOpen : false,
      Dialog_LogOutInProgress_IsOpen: false,
      Dialog_LogOutFailed_IsOpen: false,
      Popover_AuthorizedUser_IsOpen : false,
    } );
  };




  //

  _handle_Authentication_Response_Success( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "Login failed" );
    } catch( err ) { this._handle_Authentication_Response_Failure( "1" ); return; }

    location.replace( location.href );
  }

  _handle_Authentication_Response_Failure( response : string )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: true,
      Dialog_AuthenticationFailed_Message: message,
    } );
  }



  //

  _handle_CreateUser_Response_Success( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "New User Creation failed" );
    } catch( err ) { this._handle_CreateUser_Response_Failure( "1" ); return; }

    location.replace( location.href );
  }

  _handle_CreateUser_Response_Failure( response : string )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: true,
      Dialog_CreateUserFailed_Message: message,
    } );
  }



  //

  _handle_LogOutConfirmation_Response_Success( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "Log Out failed" );
    } catch( err ) { this._handle_LogOutConfirmation_Response_Failure( "1" ); return; }

    location.replace( location.href );
  }

  _handle_LogOutConfirmation_Response_Failure( response )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_LogOutInProgress_IsOpen: false,
      Dialog_LogOutFailed_IsOpen: true,
      Dialog_LogOutFailed_Message: message,
    } );
  }



  //








  //

  Dialog_AuthenticationChallenge( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationChallenge_IsOpen }
        title="Log In"
        actions={ [
          <FlatButton key="CreateUser" label="Create User" secondary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_CreateUser } />,
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_Cancel } />,
          <FlatButton key="LogIn" label="Log In" primary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_LogIn } disabled={ ! this.state.Account_information_Supplied } />,
        ] }
      >
        <TextField
          floatingLabelText={ AccountNameAlias }
          fullWidth={ true }
          value={ this.state.User_AccountName }
          onKeyDown={ this._handle_onKeyDown_AuthenticationChallenge_User_AccountName }
          onChange={ this._handle_onChange_AuthenticationChallenge_User_AccountName }
        />
        <TextField
          type="password"
          floatingLabelText="Password"
          fullWidth={ true }
          value={ this.state.User_AccountPassword }
          onKeyDown={ this._handle_onKeyDown_AuthenticationChallenge_User_AccountPassword }
          onChange={ this._handle_onChange_AuthenticationChallenge_User_AccountPassword }
          ref="User_AccountPassword"
        />
        <ExtensionsForLogIn/>
      </Dialog>
    );
  }

  Dialog_AuthenticationChallenge_Open = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: true
    } );
  };

  _handle_onChange_AuthenticationChallenge_User_AccountName = ( event ) =>
  {
    this.setState( { User_AccountName: event.target.value } );
    this._handle_onChange_AuthenticationChallenge_User_AccountName_or_Password( event.target.value, this.state.User_AccountPassword );
  };

  _handle_onKeyDown_AuthenticationChallenge_User_AccountName = ( e ) =>
  {
    if( e.keyCode === 13 )
      this.refs.User_AccountPassword.focus( );
  };

  _handle_onChange_AuthenticationChallenge_User_AccountPassword = ( event ) =>
  {
    this.setState( { User_AccountPassword: event.target.value } );
    this._handle_onChange_AuthenticationChallenge_User_AccountName_or_Password( this.state.User_AccountName, event.target.value );
  };

  _handle_onKeyDown_AuthenticationChallenge_User_AccountPassword = ( e ) =>
  {
    if( e.keyCode === 13 )
      this._handle_onTouchTap_AuthenticationChallenge_LogIn( );
  };

  _handle_onChange_AuthenticationChallenge_User_AccountName_or_Password = ( AccountName, AccountPassword ) =>
  {
    this.setState( { Account_information_Supplied: isAccountNameAcceptable( AccountName ) && AccountPassword.length >= AccountPasswordLengthMin } );
  };

  _handle_onTouchTap_AuthenticationChallenge_LogIn = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_AuthenticationInProgress_IsOpen: true,
    } );

    var loc = window.location;
    var host = loc.protocol + "//" + loc.hostname + ":" + loc.port;

    postXHR(
      host + '/auth/login',
      {
        User_AccountName: this.state.User_AccountName,
        User_AccountPassword: this.state.User_AccountPassword,
      },
      ( response ) => this._handle_Authentication_Response_Success( response ),
      ( response ) => this._handle_Authentication_Response_Failure( response )
    );

    this.setState( { User_AccountPassword: '' } );
  };

  _handle_onTouchTap_AuthenticationChallenge_CreateUser = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_CreateUser_IsOpen: true,
      Dialog_CreateUser_AccountPasswordStrength: 0,
      User_AccountPassword: '',
    } );
  };

  _handle_onTouchTap_AuthenticationChallenge_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false
    } );
  };



  //

  Dialog_AuthenticationInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationInProgress_IsOpen }
        title="Logging In ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_AuthenticationInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  _handle_onTouchTap_AuthenticationInProgress_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationInProgress_IsOpen: false
    } );
  };



  //

  Dialog_AuthenticationFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationFailed_IsOpen }
        title="Login failed"
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_LogInFailure_OK } />,
        ] }
      >
        { this.state.Dialog_AuthenticationFailed_Message }
      </Dialog>
    );
  }

  _handle_onTouchTap_LogInFailure_OK = ( ) =>
  {
    this.setState( {
      Dialog_AuthenticationFailed_IsOpen: false
    } );
  };




  //

  Dialog_CreateUser( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUser_IsOpen }
        title="Sign Up"
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_CreateUser_Cancel } />,
          <FlatButton key="Create" label="Create" primary={true}
            onTouchTap={ this._handle_onTouchTap_CreateUser_Create }
            disabled={
              this.state.Dialog_CreateUser_AccountPasswordStrength < AccountPasswordStrengthMin
              || ( ! isAccountNameAcceptable( this.state.User_AccountName ) )
            }
          />,
        ] }
      >
        <TextField
          floatingLabelText={ AccountNameAlias }
          fullWidth={ true }
          value={ this.state.User_AccountName }
          onKeyDown={ this._handle_onKeyDown_CreateUser_User_AccountName }
          onChange={ this._handle_onChange_CreateUser_User_AccountName }
        />
        <TextField
          type="password"
          floatingLabelText="Password"
          fullWidth={ true }
          value={ this.state.User_AccountPassword }
          onKeyDown={ this._handle_onKeyDown_CreateUser_User_AccountPassword }
          onChange={ this._handle_onChange_CreateUser_User_AccountPassword }
          ref="User_AccountPassword"
        />
        <br/><br/>Password strength
        <LinearProgress
          mode="determinate"
          value={ this.state.Dialog_CreateUser_AccountPasswordStrength }
          color={
            this.state.Dialog_CreateUser_AccountPasswordStrength < AccountPasswordStrengthMin ?
              "#ff0000"
              : ( this.state.Dialog_CreateUser_AccountPasswordStrength < AccountPasswordStrengthGood ?
                "#c0c000"
                : "#00d000" )
          }
        />
        <ExtensionsForCreateUser/>
      </Dialog>
    );
  }

  _handle_onChange_CreateUser_User_AccountName = ( event ) =>
  {
    this.setState( { User_AccountName: event.target.value } );
    this._handle_onChange_CreateUser_User_AccountName_or_Password( event.target.value, this.state.User_AccountPassword );
  };

  _handle_onKeyDown_CreateUser_User_AccountName = ( e ) =>
  {
    if( e.keyCode === 13 )
      this.refs.User_AccountPassword.focus( );
  };

  _handle_onChange_CreateUser_User_AccountPassword = ( event ) =>
  {
    this.setState( { User_AccountPassword: event.target.value } );
    this._handle_onChange_CreateUser_User_AccountName_or_Password( this.state.User_AccountName, event.target.value );
  };

  _handle_onKeyDown_CreateUser_User_AccountPassword = ( e ) =>
  {
    if( e.keyCode === 13 )
      this._handle_onTouchTap_CreateUser_Create( );
  };

  _handle_onChange_CreateUser_User_AccountName_or_Password = ( AccountName, AccountPassword ) =>
  {
    const passwordScore = scorePassword( AccountPassword );
    this.setState( {
      Account_information_Supplied: isAccountNameAcceptable( AccountName ) && AccountPassword.length >= AccountPasswordLengthMin,
      Dialog_CreateUser_AccountPasswordStrength: passwordScore,
    } );
  };

  _handle_onTouchTap_CreateUser_Create = ( ) =>
  {
    this.setState( {
      Dialog_CreateUser_IsOpen: false,
      Dialog_CreateUserInProgress_IsOpen: true,
    } );

    var loc = window.location;
    var host = loc.protocol + "//" + loc.hostname + ":" + loc.port;

    postXHR(
      host + '/auth/createuser',
      {
        User_AccountName: this.state.User_AccountName,
        User_AccountPassword: this.state.User_AccountPassword,
      },
      ( response ) => this._handle_CreateUser_Response_Success( response ),
      ( response ) => this._handle_CreateUser_Response_Failure( response )
    );
  };

  _handle_onTouchTap_CreateUser_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_CreateUser_IsOpen: false
    } );
  };



  //

  Dialog_CreateUserInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUserInProgress_IsOpen }
        title="Creating user ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_CreateUserInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  _handle_onTouchTap_CreateUserInProgress_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_CreateUserInProgress_IsOpen: false
    } );
  };




  //

  Dialog_CreateUserFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUserFailed_IsOpen }
        title="Creating user failed"
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_CreateUserFailed_OK } />,
        ] }
      >
        { this.state.Dialog_CreateUserFailed_Message }
      </Dialog>
    );
  }

  _handle_onTouchTap_CreateUserFailed_OK = ( ) =>
  {
    this.setState( {
      Dialog_CreateUserFailed_IsOpen: false
    } );
  };



  //

  Dialog_LogOutConfirmation( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutConfirmation_IsOpen }
        title="Log Out"
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_LogOutConfirmation_Cancel } />,
          <FlatButton key="LogOut" label="Log Out" primary={true} onTouchTap={ this._handle_onTouchTap_LogOutConfirmation_LogOut } />,
        ] }
      >
      <List>
        <Subheader>You are currently logged in as</Subheader>
        <ListItem
          primaryText={ this.props.Viewer.User_DisplayName }
          leftAvatar={<Avatar src={ this.props.Viewer.User_ProfilePhoto } />}
        />
      </List>
      <List>
        <Subheader>Are you sure you want to log out?</Subheader>
      </List>
      </Dialog>
    );
  }

  _handle_onTouchTap_LogOutConfirmation_LogOut = ( ) =>
  {
    this.setState( {
      Dialog_LogOutConfirmation_IsOpen: false,
      Dialog_LogOutInProgress_IsOpen: true,
    } );

    var loc = window.location;
    var host = loc.protocol + "//" + loc.hostname + ":" + loc.port;

    postXHR(
      host + '/auth/logout',
      { },
      ( response ) => this._handle_LogOutConfirmation_Response_Success( response ),
      ( response ) => this._handle_LogOutConfirmation_Response_Failure( response )
    );
  };

  _handle_onTouchTap_LogOutConfirmation_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_LogOutConfirmation_IsOpen: false
    } );
  };



  //

  Dialog_LogOutInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutInProgress_IsOpen }
        title="Logging out ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_LogOutInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  _handle_onTouchTap_LogOutInProgress_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_LogOutInProgress_IsOpen: false
    } );
  };




  //

  Dialog_LogOutFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutFailed_IsOpen }
        title="Log out failed."
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_LogOutFailed_OK } />,
        ] }
      >
        <List>
          <Subheader>You are still logged in as</Subheader>
          <ListItem
            primaryText={ this.props.Viewer.User_DisplayName }
            leftAvatar={<Avatar src={ this.props.Viewer.User_ProfilePhoto } />}
          />
        </List>
        <List>
          <Subheader>{ this.state.Dialog_LogOutFailed_Message }</Subheader>
        </List>
      </Dialog>
    );
  }

  _handle_onTouchTap_LogOutFailed_OK = ( ) =>
  {
    this.setState( {
      Dialog_LogOutFailed_IsOpen: false
    } );
  };



  //

  Popover_AuthorizedUser( )
  {
    return (
      <Popover
        open={this.state.Popover_AuthorizedUser_IsOpen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this._handle_Popover_AuthorizedUser_Close}
      >
        <div style={styles.popover}>
          <List>
            <Subheader>Logged In as</Subheader>
            <ListItem
              primaryText={ this.props.Viewer.User_DisplayName }
              leftAvatar={<Avatar src={ this.props.Viewer.User_ProfilePhoto } />}
            />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Profile" onTouchTap={ this._handle_Popover_AuthorizedUser_Profile } />
            <ListItem primaryText="Change Password" onTouchTap={ this._handle_Popover_AuthorizedUser_ChangePassword } />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Log in as a different user" onTouchTap={ this._handle_Popover_AuthorizedUser_LogInAsADifferentUser } />
            <ListItem primaryText="Log out" onTouchTap={ this._handle_Popover_AuthorizedUser_LogOut } />
          </List>
        </div>
      </Popover>
    );
  }

  _handle_Popover_AuthorizedUser_Profile = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.context.router.push( '/User' );
  };

  _handle_Popover_AuthorizedUser_ChangePassword = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.context.router.push( '/User/UpdatePassword' );
  };

  _handle_Popover_AuthorizedUser_LogInAsADifferentUser = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.Dialog_AuthenticationChallenge_Open( );
  };

  _handle_Popover_AuthorizedUser_LogOut = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
      Dialog_LogOutConfirmation_IsOpen: true
    } );
  };

  _handle_Popover_AuthorizedUser_Close = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
  };



  //

  render( )
  {
    if( this.props.Viewer.User_IsAnonymous )
      return(
        <IconButton key='login' tooltip="Log In" onTouchTap={ this.Dialog_AuthenticationChallenge_Open }>
          <IconSocialPersonOutline color={ white } />
          { this.Dialog_AuthenticationChallenge( ) }
          { this.Dialog_AuthenticationInProgress( ) }
          { this.Dialog_AuthenticationFailed( ) }
          { this.Dialog_CreateUser( ) }
          { this.Dialog_CreateUserInProgress( ) }
          { this.Dialog_CreateUserFailed( ) }
        </IconButton>
      );
    else
      // User has already logged in
      return(
        <IconButton key='authenticated' tooltip="User menu" onTouchTap={ this._handle_AuthorizedUserIcon_TouchTap }>
          <IconSocialPerson color={ white } />
          { this.Popover_AuthorizedUser( ) }
          { this.Dialog_AuthenticationChallenge( ) }
          { this.Dialog_AuthenticationInProgress( ) }
          { this.Dialog_AuthenticationFailed( ) }
          { this.Dialog_CreateUser( ) }
          { this.Dialog_CreateUserInProgress( ) }
          { this.Dialog_CreateUserFailed( ) }
          { this.Dialog_LogOutConfirmation( ) }
          { this.Dialog_LogOutInProgress( ) }
          { this.Dialog_LogOutFailed( ) }
        </IconButton>
      );
  }

  _handle_AuthorizedUserIcon_TouchTap = ( event ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: true,
      anchorEl: event.currentTarget,
    } );
  };
}

AppBar_Auth.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default Relay.createContainer( AppBar_Auth, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        User_DisplayName,
        User_ProfilePhoto,
      }
    `,
  },
});
