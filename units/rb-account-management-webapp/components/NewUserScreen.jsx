// @flow

import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconAccount from 'mdi-material-ui/Account'
import React from 'react'
import CompositeCardHeader, {
  cardHeaderContentStyles,
} from '../../rb-appbase-webapp/components/CompositeCardHeader'
import ResponsiveContentArea from '../../rb-appbase-webapp/components/ResponsiveContentArea'
import NewUserSecretInput from './NewUserSecretInput'

//

export function validateEmail(accountIdentifier: string) {
  // eslint-disable-next-line no-control-regex
  const reEmail = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
  return reEmail.test(accountIdentifier)
}

//

const styles = {
  card: {
    minWidth: 350,
    maxWidth: 1200,
  },
  ...cardHeaderContentStyles,
  userName: {
    borderWidth: 1,
    borderColor: '#c0c0c0',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
  },
}

//

class NewUserScreen extends React.Component<
  {
    classes: Object,
  },
  {
    currentOperation: 'prompt' | 'creating' | 'success' | 'failure',
    executionStatus: string,
    UserAccount_Identifier: string,
    UserAccount_IdentifierValidity: boolean,
    User_Secret: string,
  },
> {
  constructor(props: Object, context: Object) {
    super(props, context)

    this.state = {
      currentOperation: 'prompt',
      executionStatus: '',
      UserAccount_Identifier: '',
      UserAccount_IdentifierValidity: false,
      User_Secret: '',
    }
  }

  _handle_onClick_Create = async () => {
    const { UserAccount_Identifier, User_Secret } = this.state

    this.setState({
      currentOperation: 'creating',
      User_Secret: '', // In order to prevent the password from being accessed later
    })

    try {
      const loc = window.location
      const host = loc.protocol + '//' + loc.hostname + ':' + loc.port

      const response = await fetch(host + '/auth/createuser', {
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
        // In case of success, notify user
        this.setState({ currentOperation: 'success' })
      } else {
        // In case of error, tell user what the error is
        this.setState({
          currentOperation: 'failure',
          executionStatus: responseData.error,
        })
      }
    } catch (err) {
      // In case response could not be received properly, tell the user
      // In case of error, tell user what the error is
      this.setState({
        currentOperation: 'failure',
        executionStatus:
          'Did not receive proper response from server. Please try again. Message:' + err.message,
      })
    }
  }

  _handle_onClick_CancelCreation = () => {
    this.setState({
      currentOperation: 'failure',
      executionStatus: 'User creation has been canceled',
    })
  }

  _handle_onClick_TryAgain = () => {
    this.setState({
      currentOperation: 'prompt',
      executionStatus: '',
    })
  }

  _handle_onClick_Continue = () => {
    window.location.replace('/')
  }

  renderCreating() {
    const { classes } = this.props
    const { UserAccount_Identifier } = this.state

    return (
      <div>
        <CompositeCardHeader
          icon={<IconAccount />}
          subTitle="Creating, please wait"
          title="New User"
        />

        <Card className={classes.card}>
          <CardContent>
            <br />
            <Alert variant="outlined" severity="info">
              Creating user
              <span className={classes.userName}>{UserAccount_Identifier}</span>
              , please wait ...
            </Alert>
            <br />
            <br />
            <LinearProgress mode="query" />
          </CardContent>
          <CardActions>
            <Button onClick={this._handle_onClick_CancelCreation}>Cancel</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

  renderSuccess() {
    const { classes } = this.props
    const { UserAccount_Identifier } = this.state

    return (
      <div>
        <CompositeCardHeader icon={<IconAccount />} subTitle="Created" title="New User" />

        <Card className={classes.card}>
          <CardContent>
            <br />
            <Alert variant="outlined" severity="success">
              Created user
              <span className={classes.userName}>{UserAccount_Identifier}</span>
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
    const { UserAccount_Identifier, executionStatus } = this.state

    return (
      <div>
        <CompositeCardHeader
          icon={<IconAccount htmlColor="#ff0000" />}
          subTitle="Failed"
          title="New User"
        />

        <Card className={classes.card}>
          <CardContent>
            <br />
            <Alert variant="outlined" severity="error">
              Failed creating user
              <span className={classes.userName}>{UserAccount_Identifier}</span>
              because {executionStatus}.
            </Alert>
          </CardContent>
          <CardActions>
            <Button onClick={this._handle_onClick_TryAgain}>Try Again</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

  _handle_onChange_Identifier = (event) => {
    const UserAccount_Identifier = event.target.value
    const UserAccount_IdentifierValidity = validateEmail(UserAccount_Identifier)

    this.setState({ UserAccount_Identifier, UserAccount_IdentifierValidity })
  }

  _handle_onUpdateSecret = (secret) => {
    this.setState({ User_Secret: secret })
  }

  renderPrompt() {
    const { classes } = this.props
    const { UserAccount_Identifier, UserAccount_IdentifierValidity, User_Secret } = this.state

    // User account identifier must be valid and secret must be present
    const createDisabled = !UserAccount_IdentifierValidity || User_Secret === ''

    return (
      <div>
        <CompositeCardHeader icon={<IconAccount />} subTitle="Create new user" title="New User" />

        <Card className={classes.card}>
          <CardContent>
            <TextField
              autoComplete="username"
              fullWidth={true}
              label="E-Mail Address"
              margin="normal"
              value={UserAccount_Identifier}
              variant="outlined"
              onChange={this._handle_onChange_Identifier}
            />

            <br />
            <br />

            <NewUserSecretInput onUpdateSecret={this._handle_onUpdateSecret} />
          </CardContent>
          <CardActions>
            <Button disabled={createDisabled} onClick={this._handle_onClick_Create}>
              Create
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }

  render() {
    const { currentOperation } = this.state

    return (
      <ResponsiveContentArea>
        {currentOperation === 'prompt' && this.renderPrompt()}
        {currentOperation === 'creating' && this.renderCreating()}
        {currentOperation === 'success' && this.renderSuccess()}
        {currentOperation === 'failure' && this.renderFailure()}
      </ResponsiveContentArea>
    )
  }
}

export default withStyles(styles)(NewUserScreen)
