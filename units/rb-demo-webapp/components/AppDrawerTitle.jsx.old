// @flow

import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import React from 'react'

const styles = {
  title: {
    marginLeft: 8,
    marginTop: 8,
  },
}

class AppDrawerTitle extends React.Component<{
  classes: Object,
  handle_GoTo: Function,
}> {
  _handle_GoToHome = () => {
    this.props.handle_GoTo('/')
  }
  render() {
    const { classes } = this.props

    return (
      <div onClick={this._handle_GoToHome}>
        <Typography
          className={classes.title}
          variant="subtitle1"
          gutterBottom
          color="inherit"
        >
          Machine Acuity's Rebar
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(AppDrawerTitle)
