// @flow

import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import routeAfterLogin from '../../_configuration/rb-account-management-webapp/routeAfterLogin'

//

const styles = (theme) => ({
  dialogPaper: {
    minWidth: 320,
  },
  grow: {
    flex: '1 1 auto',
  },
  userName: {
    borderWidth: 1,
    borderColor: '#c0c0c0',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
  },
})

//

class LoginDialog extends React.Component<
  {
    open: boolean,
    handlerClose: Function,
    handlerNewUser: Function,
    classes: Object,
  },
  {
    currentOperation: 'challenge' | 'in progress' | 'failure',
    errorMessage: string,
    UserAccount_Identifier: string,
    User_Secret: string,
  },
> {
  constructor(props: Object, context: Object) {
    super(props, context)

    this.state = {
      currentOperation: 'challenge',
      errorMessage: '',
      UserAccount_Identifier: '',
      User_Secret: '',
    }
  }

  _handle_Close = () => {
    this.props.handlerClose()
  }

  _handle_onClick_LogIn = async () => {
    const { UserAccount_Identifier, User_Secret } = this.state

    this.setState({
      currentOperation: 'in progress',
      User_Secret: '', // In order to prevent the password from being accessed later
    })

    try {
      const loc = window.location
      const host = loc.protocol + '//' + loc.hostname + ':' + loc.port

      const response = await fetch(host + '/auth/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserAccount_Identifier: UserAccount_Identifier,
          User_Secret: User_Secret,
        }),
      })

      const responseData = await response.json()

      if (responseData.success) {
        // In case of success, realod the application from server
        window.location.replace(
          window.location.pathname === '/' ? routeAfterLogin : window.location.pathname,
        )
      } else {
        // In case of error, tell user what the error is
        this.setState({
          currentOperation: 'failure',
          errorMessage: responseData.error,
        }) // ZZZ Does server really send the reason for the failed login?
      }
    } catch (err) {
      // In case response could not be received properly, tell the user
      // In case of error, tell user what the error is
      this.setState({
        currentOperation: 'failure',
        errorMessage:
          'Did not receive proper response from server. Please try again later. Error:' +
          err.message,
      })
    }
  }

  _handle_onCLick_NewUser = () => {
    this.props.handlerNewUser()
  }

  _handle_onCLick_CancelLogIn = () => {
    this.setState({
      currentOperation: 'failure',
      errorMessage: 'Log in has been canceled',
    })
  }

  _handle_onClick_TryAgain = () => {
    this.setState({
      currentOperation: 'challenge',
      errorMessage: '',
    })
  }

  renderChallenge() {
    const { classes, open } = this.props
    const { UserAccount_Identifier, User_Secret } = this.state

    return (
      <Dialog classes={{ paper: classes.dialogPaper }} open={open} onClose={this._handle_Close}>
        <DialogTitle>Log In</DialogTitle>

        <DialogContent>
          <TextField
            autoComplete="username"
            fullWidth={true}
            label="E-Mail Address"
            margin="normal"
            value={UserAccount_Identifier}
            variant="outlined"
            onChange={(event) => this.setState({ UserAccount_Identifier: event.target.value })}
          />
          <TextField
            autoComplete="current-password"
            fullWidth={true}
            label="Password"
            margin="normal"
            type="password"
            value={User_Secret}
            variant="outlined"
            onChange={(event) => this.setState({ User_Secret: event.target.value })}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this._handle_onClick_LogIn()
                ev.preventDefault()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this._handle_onCLick_NewUser}>
            New User
          </Button>
          <div className={classes.grow} />
          <Button onClick={this._handle_Close}>Cancel</Button>
          <Button color="primary" onClick={this._handle_onClick_LogIn}>
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderInProgress() {
    const { classes, open } = this.props
    const { UserAccount_Identifier } = this.state

    return (
      <Dialog classes={{ paper: classes.dialogPaper }} open={open} onClose={this._handle_Close}>
        <DialogTitle>Logging in</DialogTitle>

        <DialogContent>
          <br />
          <Alert variant="outlined" severity="info">
            Logging in as
            <span className={classes.userName}>{UserAccount_Identifier}</span>
            Please wait ...
          </Alert>
          <br />
          <br />
          <LinearProgress mode="query" />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this._handle_onCLick_CancelLogIn}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderFailure() {
    const { classes, open } = this.props
    const { UserAccount_Identifier, errorMessage } = this.state

    return (
      <Dialog classes={{ paper: classes.dialogPaper }} open={open} onClose={this._handle_Close}>
        <DialogTitle>Log In Failed</DialogTitle>

        <DialogContent>
          <br />
          <Alert variant="outlined" severity="error">
            Failed loggin in as
            <span className={classes.userName}>{UserAccount_Identifier}</span> because:{' '}
            {errorMessage}!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={this._handle_onClick_TryAgain}>Try Again</Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    const { currentOperation } = this.state

    return (
      <div>
        {currentOperation === 'challenge' && this.renderChallenge()}
        {currentOperation === 'in progress' && this.renderInProgress()}
        {currentOperation === 'failure' && this.renderFailure()}
      </div>
    )
  }
}

export default withStyles(styles)(LoginDialog)
