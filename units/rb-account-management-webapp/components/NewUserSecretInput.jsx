// @flow

import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React from 'react'

import {
  uniqueLettersAwardUntilRepetitions,
  userSecretStrengthGood,
  userSecretStrengthFair,
  variationAwardCoefficient,
} from '../../_configuration/rb-account-management-webapp/userIDAndSecret'

//

function scoreSecret(
  secret: string,
  uniqueLettersAwardUntilRepetitions: number,
  variationAwardCoefficient: number,
) {
  let score = 0
  if (!secret) return 0

  // Award every unique letter until 5 repetitions
  let letters: Object = {}
  for (let i = 0; i < secret.length; i++) {
    letters[secret[i]] = (letters[secret[i]] || 0) + 1
    score += uniqueLettersAwardUntilRepetitions / letters[secret[i]]
  }

  // Bonus points for mixing it up
  let variations = {
    digits: /\d/.test(secret),
    lower: /[a-z]/.test(secret),
    upper: /[A-Z]/.test(secret),
    nonWords: /\W/.test(secret),
  }

  let variationCount = 0
  for (let check in variations) variationCount += variations[check] === true ? 1 : 0

  score += (variationCount - 1) * variationAwardCoefficient

  return score
}

//

const styles = {
  strengthColorPrimary: {
    backgroundColor: '#a0a0a0',
  },

  strengthBarColorPrimary_poor: {
    backgroundColor: '#a00000',
  },
  strengthBarColorPrimary_fair: {
    backgroundColor: '#0000a0',
  },
  strengthBarColorPrimary_good: {
    backgroundColor: '#00a000',
  },
}

//

class NewUserSecretInput extends React.Component<
  { classes: typeof styles, onUpdateSecret: string => void },
  {
    userSecret: string,
    userSecretConfirm: string,
    userSecretPrompt: string,
    userSecretStrength: number,
    userSecretQuality: 'poor' | 'fair' | 'good',
  },
> {
  constructor(props: any, context: any) {
    super(props, context)

    this.state = {
      userSecret: '',
      userSecretConfirm: '',
      userSecretPrompt: '',
      userSecretStrength: 0,
      userSecretQuality: 'poor',
    }
  }

  updateErrorAndValue(userSecret: string, userSecretConfirm: string) {
    // Collect errors
    let userSecretPrompt = ''

    // If secrets match ....
    const bPasswordsMatch = userSecret === userSecretConfirm
    let determinedValue = bPasswordsMatch ? userSecret : ''
    if (!bPasswordsMatch) {
      userSecretPrompt = 'Passwords do not match'
    }

    // Determine secret complexity
    const userSecretStrength = scoreSecret(
      userSecret,
      uniqueLettersAwardUntilRepetitions,
      variationAwardCoefficient,
    )

    // Determine secret quality
    const userSecretQuality =
      userSecretStrength >= userSecretStrengthGood
        ? 'good'
        : userSecretStrength >= userSecretStrengthFair ? 'fair' : 'poor'

    if (userSecretPrompt === '') {
      userSecretPrompt = 'Password strength: ' + userSecretQuality
    }

    // If quality is not gooe enough, clear
    if (userSecretQuality === 'poor') {
      determinedValue = ''
    }

    this.props.onUpdateSecret(determinedValue)

    this.setState({ userSecretPrompt, userSecretQuality, userSecretStrength })
  }

  _handle_onChange_Secret = (event) => {
    const userSecret = event.target.value

    this.setState({ userSecret })

    this.updateErrorAndValue(userSecret, this.state.userSecretConfirm)
  }

  _handle_onChange_SecretConfirm = (event) => {
    const userSecretConfirm = event.target.value

    this.setState({ userSecretConfirm })

    this.updateErrorAndValue(this.state.userSecret, userSecretConfirm)
  }

  render() {
    const { classes } = this.props
    const {
      userSecret,
      userSecretConfirm,
      userSecretPrompt,
      userSecretQuality,
      userSecretStrength,
    } = this.state

    return (
      <div>
        <TextField
          autoComplete="new-password"
          fullWidth={true}
          label="Password"
          margin="normal"
          type="password"
          value={userSecret}
          variant="outlined"
          onChange={this._handle_onChange_Secret}
        />

        <TextField
          autoComplete="new-password"
          fullWidth={true}
          label="Confirm password"
          margin="normal"
          type="password"
          value={userSecretConfirm}
          variant="outlined"
          onChange={this._handle_onChange_SecretConfirm}
        />

        <Typography variant="subtitle1" gutterBottom>
          <br />
          {userSecretPrompt}
        </Typography>

        <LinearProgress
          classes={{
            colorPrimary: classes.strengthColorPrimary,
            barColorPrimary: classes['strengthBarColorPrimary_' + userSecretQuality],
          }}
          value={50 * userSecretStrength / userSecretStrengthGood}
          variant="determinate"
        />
      </div>
    )
  }
}

export default withStyles(styles)(NewUserSecretInput)
