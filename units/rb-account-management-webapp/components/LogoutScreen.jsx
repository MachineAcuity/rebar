// @flow

import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconLogout from 'mdi-material-ui/Logout'
import React from 'react'

import CompositeCardHeader, {
  cardHeaderContentStyles,
} from '../../rb-appbase-webapp/components/CompositeCardHeader'
import ResponsiveContentArea from '../../rb-appbase-webapp/components/ResponsiveContentArea'

//

const styles = (theme) => ({
  card: {
    minWidth: 350,
    maxWidth: 1200,
  },
  ...cardHeaderContentStyles,
})

//

class LogoutScreen extends React.Component<
  {
    classes: Object,
  },
  {
    currentOperation: 'confirm' | 'logging out' | 'success' | 'failure',
    errorMessage: string,
  },
> {
  constructor(props: Object, context: Object) {
    super(props, context)

    this.state = {
      currentOperation: 'confirm',
      errorMessage: '',
    }
  }

  _handle_onClick_Logout = async () => {
    this.setState({ currentOperation: 'logging out' })

    try {
      const loc = window.location
      const host = loc.protocol + '//' + loc.hostname + ':' + loc.port

      const response = await fetch(host + '/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '{}',
      })

      const responseData = await response.json()

      if (responseData.success) {
        // In case of success, notify user
        this.setState({ currentOperation: 'success' })
      } else {
        // In case of error, tell user what the error is
        this.setState({
          currentOperation: 'failure',
          errorMessage: responseData.error,
        })
      }
    } catch (err) {
      // In case response could not be received properly, tell the user
      // In case of error, tell user what the error is
      this.setState({
        currentOperation: 'failure',
        errorMessage:
          'Did not receive proper response from server. Please try again. Message:' + err.message,
      })
    }
  }

  _handle_onClick_CancelLogout = () => {
    this.setState({
      currentOperation: 'failure',
      errorMessage: 'User log out has been canceled',
    })
  }

  _handle_onClick_TryAgain = () => {
    this.setState({
      currentOperation: 'confirm',
      errorMessage: '',
    })
  }

  _handle_onClick_Continue = () => {
    window.location.replace('/')
  }

  renderCreating() {
    const { classes } = this.props

    return (
      <div>
        <CompositeCardHeader icon={<IconLogout />} subTitle="" title="Log Out" />

        <Card className={classes.card}>
          <br />
          <Alert variant="outlined" severity="info">
            Logging out. Please wait ...
          </Alert>
          <CardContent>
            <br /> <br />
            <LinearProgress mode="query" />
          </CardContent>
          <CardActions>
            <Button onClick={this._handle_onClick_CancelLogout}>Cancel</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

  renderSuccess() {
    const { classes } = this.props

    return (
      <div>
        <CompositeCardHeader icon={<IconLogout />} subTitle="" title="Log Out" />

        <Card className={classes.card}>
          <CardContent>
            <br />
            <Alert variant="outlined" severity="success">
              You have been logged out.{' '}
            </Alert>
          </CardContent>
          <CardActions>
            <Button onClick={this._handle_onClick_Continue}>Continue</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

  renderFailure() {
    const { classes } = this.props
    const { errorMessage } = this.state

    return (
      <div>
        <CompositeCardHeader icon={<IconLogout />} subTitle="" title="Log Out" />

        <Card className={classes.card}>
          <CardContent>
            <br />
            <Alert variant="outlined" severity="error">
              Failed logging out because: {errorMessage}!
            </Alert>
          </CardContent>
          <CardActions>
            <Button onClick={this._handle_onClick_TryAgain}>Try Again</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

  renderPrompt() {
    const { classes } = this.props

    return (
      <div>
        <CompositeCardHeader icon={<IconLogout />} subTitle="" title="Log Out" />

        <Card className={classes.card}>
          <CardContent>
            <br />
            <Typography component="h6">
              You are currently logged in. Are you sure you want to log out?
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={this._handle_onClick_Logout}>Yes, Log Out</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

  render() {
    const { currentOperation } = this.state

    return (
      <ResponsiveContentArea>
        {currentOperation === 'confirm' && this.renderPrompt()}
        {currentOperation === 'logging out' && this.renderCreating()}
        {currentOperation === 'success' && this.renderSuccess()}
        {currentOperation === 'failure' && this.renderFailure()}
      </ResponsiveContentArea>
    )
  }
}

export default withStyles(styles)(LogoutScreen)
