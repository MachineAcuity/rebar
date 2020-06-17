// @flow

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

import ResponsiveContentArea from '../../rb-appbase-webapp/components/ResponsiveContentArea'
import SiteConfigurationContext from '../../rb-appbase-webapp/components/SiteConfigurationContext'

const styles = {
  card: {
    minWidth: 275,
  },
}

class HomePageScreen extends React.Component<{
  classes: Object,
  Viewer: Object,
}> {
  render() {
    const { classes } = this.props

    return (
      <SiteConfigurationContext.Consumer>
        {(siteConfiguration) => {
          const data = [
            {
              name: 'Rebar Version',
              value: siteConfiguration.webapp.rebarDemo.version,
            },
            {
              name: 'Server OS',
              value: siteConfiguration.webapp.rebarDemo.OSType,
            },
            {
              name: 'Server Host Name',
              value: siteConfiguration.webapp.rebarDemo.OSHostName,
            },
            {
              name: 'Server Free Memory',
              value: siteConfiguration.webapp.rebarDemo.OSFreeMem,
            },
            {
              name: 'Google Maps API Key',
              value: siteConfiguration.webapp.api.googleMapsJavascriptAPI,
            },
          ]

          return (
            <ResponsiveContentArea>
              <Card className={classes.card}>
                <CardHeader title="Rebar Demo" />
                <CardContent>
                  <Typography component="p">
                    The <a href="https://github.com/MachineAcuity/rebar">Rebar</a> is and open
                    source project representing basic foundation of the solutions we provide. It
                    fully utilizes the react stack, and Node.js and Cassandra on the back end. It
                    can be used both as boilerplate, as well as an educational tool with multiple
                    examples available. Basic user account management including account creation,
                    password strength indicator and user profile is also included. The boilerplate
                    is optimized for supportability and update-ability. It allows us to update the
                    multiple projects based on the boilerplate with minimum effort, providing new
                    features, improvements and bug fixes. This is achieved through the following two
                    approaches:
                    <br />
                    <br />
                  </Typography>
                  <Typography component="ul">
                    <li>
                      <b>Configurability</b> - All the configuration files, which include settings,
                      CQL, JSON, snippets of JavaScript and JSX are separated from the common code.
                    </li>
                    <li>
                      <b>Modularity</b> - The applications built upon the boilerplate are separated
                      into semi-independent units, which contain the necessary front-end, back end,
                      relay, CQL, etc. code. The parameters and settings for those units are stored
                      in the configuration folder for eacy updating.
                    </li>
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <Card className={classes.card}>
                <CardHeader title="Site Configuration" />
                <CardContent>
                  <Typography component="p">
                    These settings are derived from{' '}
                    <b>_configuration/rb-base-server/siteSettings.js</b>.
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Property</TableCell>
                        <TableCell align="right">Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((n) => {
                        return (
                          <TableRow key={n.name}>
                            <TableCell>{n.name}</TableCell>
                            <TableCell align="right">{n.value}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </ResponsiveContentArea>
          )
        }}
      </SiteConfigurationContext.Consumer>
    )
  }
}

export default createFragmentContainer(withStyles(styles)(HomePageScreen), {
  Viewer: graphql`
    fragment HomePageScreen_Viewer on Viewer {
      id
    }
  `,
})
