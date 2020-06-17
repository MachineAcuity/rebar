// @flow

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import IconClose from 'mdi-material-ui/Close'
import React from 'react'

import authPassportConfiguration from '../../_configuration/rb-appbase-universal/authPassportConfiguration'

import IconLogoFacebook from './IconLogoFacebook'
import IconLogoGoogle from './IconLogoGoogle'
import IconLogoLinkedIn from './IconLogoLinkedIn'
import IconLogoMicrosoft from './IconLogoMicrosoft'
import IconLogoTwitter from './IconLogoTwitter'

//

class LoginDialogThirdPartyLoginButton extends React.Component<
  { party: string },
  { disabled: boolean, snackbar: boolean },
> {
  constructor(props: Object, context: Object) {
    super(props, context)

    let disabled = false
    const provider = authPassportConfiguration[props.party]
    if (provider.disabled && !provider.disabled.disabledMessageText) {
      disabled = true
    }

    this.state = { disabled, snackbar: false }
  }

  _handle_onClick_Provider = (event) => {
    const { party } = this.props

    const provider = authPassportConfiguration[party]
    if (provider.disabled && provider.disabled.disabledMessageText) {
      this.setState({
        disabled: true,
        snackbar: true,
      })

      event.preventDefault()
    }
  }

  _handle_onClose_Snackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({
      snackbar: false,
    })
  }

  render() {
    const { party } = this.props
    const { disabled, snackbar } = this.state

    const provider: Object = authPassportConfiguration[party]

    return (
      <div>
        <Button
          color="primary"
          disabled={disabled}
          href={'/auth/' + party}
          key={party}
          startIcon={
            party === 'facebook' ? (
              <IconLogoFacebook />
            ) : party === 'google' ? (
              <IconLogoGoogle />
            ) : party === 'linkedin' ? (
              <IconLogoLinkedIn />
            ) : party === 'microsoft' ? (
              <IconLogoMicrosoft />
            ) : (
              <IconLogoTwitter />
            )
          }
          onClick={this._handle_onClick_Provider}
        >
          {party}
        </Button>

        {provider.disabled && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={snackbar}
            onClose={this._handle_onClose_Snackbar}
            message={provider.disabled.disabledMessageText}
            action={
              <React.Fragment>
                <Button color="secondary" size="small" onClick={this._handle_onClose_Snackbar}>
                  Acknowledge
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={this._handle_onClose_Snackbar}
                >
                  <IconClose fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        )}
      </div>
    )
  }
}

export default LoginDialogThirdPartyLoginButton
