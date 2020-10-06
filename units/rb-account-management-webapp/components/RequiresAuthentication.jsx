// @flow

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import IconShieldKeyOutline from 'mdi-material-ui/ShieldKeyOutline'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import PageHeader, { cardHeaderContentStyles } from '../../rb-appbase-webapp/components/PageHeader'
import ResponsiveContentArea from '../../rb-appbase-webapp/components/ResponsiveContentArea'

const doNothing = () => {}

let authenticationRequiredCallback: Function = doNothing

export function registerAuthenticationRequiredCallback(cb: Function) {
  authenticationRequiredCallback = cb
}

export function unregisterAuthenticationRequiredCallback() {
  authenticationRequiredCallback = doNothing
}

//

const styles = (theme) => ({
  card: {
    minWidth: 350,
    maxWidth: 1200,
  },
  ...cardHeaderContentStyles,
})

//

class RequiresAuthenticationNotice extends React.Component<{
  classes: Object,
}> {
  componentDidMount() {
    authenticationRequiredCallback()
  }

  render() {
    const { classes } = this.props

    return (
      <ResponsiveContentArea>
        <PageHeader icon={<IconShieldKeyOutline />} subTitle="" title="Please log in" />

        <Card className={classes.card}>
          <CardContent>
            <Typography paragraph>
              <br />
              Accessing this area of the application requires you to be logged in.
              <br />
              <br />
              Please use the left menu (burger icon on the top left to open, if closed) and choose{' '}
              <strong>LOG IN</strong> to proceed.
            </Typography>
          </CardContent>
        </Card>
      </ResponsiveContentArea>
    )
  }
}

export default withStyles(styles)(RequiresAuthenticationNotice)
