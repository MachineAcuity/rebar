// @flow

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

import {
  registerAuthenticationRequiredCallback,
  unregisterAuthenticationRequiredCallback,
} from './RequiresAuthentication'
import LoginDialog from './LoginDialog'

//

const styles = (theme) => ({
  formControl: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  loginButtonContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
})

//

class AppDrawerAccountItem extends React.Component<
  { classes: Object, Viewer: Object, relay: Object, onClick: Function },
  {
    loginDialogIsOpen: boolean,
  },
> {
  constructor(props: Object, context: Object) {
    super(props, context)

    this.state = {
      loginDialogIsOpen: false,
    }
  }

  // Handle popping open the login dialog if authentication is required
  componentDidMount() {
    registerAuthenticationRequiredCallback(() => this.setState({ loginDialogIsOpen: true }))
  }

  componentWillUnmount() {
    unregisterAuthenticationRequiredCallback()
  }

  _handle_onClick_Login = () => {
    this.setState({ loginDialogIsOpen: true })
  }

  _handle_onChange_Account = (event) => {
    const operation = event.target.value

    if (operation === 'profile') {
      this.props.onClick('/user/profile')
    } else if (operation === 'login') {
      this.setState({ loginDialogIsOpen: true })
    } else if (operation === 'logout') {
      this.props.onClick('/user/logout')
    }
  }

  _handle_Login_Close = () => {
    this.setState({ loginDialogIsOpen: false })
  }

  _handle_Login_NewUser = () => {
    this.setState({ loginDialogIsOpen: false })

    this.props.onClick('/user/new')
  }

  render() {
    const { classes, Viewer } = this.props
    const { User_IsAnonymous, User_DisplayName } = Viewer
    const { loginDialogIsOpen } = this.state

    return (
      <div key="appdrawer-account">
        {User_IsAnonymous && (
          <div className={classes.loginButtonContainer}>
            <Button
              color="primary"
              fullWidth={true}
              key="account-button"
              variant="contained"
              onClick={this._handle_onClick_Login}
            >
              Log In
            </Button>
          </div>
        )}

        {!User_IsAnonymous && (
          <FormControl
            fullWidth={true}
            key="account-list"
            variant="filled"
            className={classes.formControl}
          >
            <InputLabel htmlFor="user-account-select">Current User</InputLabel>
            <Select
              id="user-account-select"
              input={<FilledInput name="account" />}
              value="userdisplayname"
              variant="filled"
              onChange={this._handle_onChange_Account}
            >
              <MenuItem component="div" key="userdisplayname" value="userdisplayname">
                <em>{User_DisplayName}</em>
              </MenuItem>
              <MenuItem component="div" key="profile" value="profile">
                Edit Profile
              </MenuItem>
              <Divider />
              <MenuItem component="div" key="login" value="login">
                Change user
              </MenuItem>
              <MenuItem component="div" key="logout" value="logout">
                Log out
              </MenuItem>
            </Select>
          </FormControl>
        )}

        <LoginDialog
          open={loginDialogIsOpen}
          handlerClose={this._handle_Login_Close}
          handlerNewUser={this._handle_Login_NewUser}
        />
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(styles)(AppDrawerAccountItem), {
  Viewer: graphql`
    fragment AppDrawerAccountItem_Viewer on Viewer {
      User_IsAnonymous
      User_DisplayName
    }
  `,
})
