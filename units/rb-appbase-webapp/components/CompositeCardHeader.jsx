// @flow

import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'

import * as React from 'react'

//

const styles = {
  cardContentRoot: {
    marginTop: 24,
    padding: 0,
  },
  cardHeaderRoot: {
    display: 'flex',
    marginLeft: 48,
    marginTop: -16,
    marginRight: 16,
    marginBottom: -16,
    maxWidth: 1200 - 64,
    position: 'relative',
    zIndex: 800,
  },
  cardHeaderIcon: {
    alignItems: 'center',
    //background: 'linear-gradient(20deg, #ffa000, #ffbe4d)',
    background: 'linear-gradient(60deg, #105cac, #003c78)',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    boxShadow:
      '0 12px 20px -10px rgba(0, 60, 120, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 152, 128, 0.2)',
    color: '#ffffff',
    display: 'grid',
    justifyItems: 'center',
    padding: 16,
    width: 72,
  },
  cardHeaderSeparator: {
    backgroundColor: 'rgb(0, 0, 0, 0)',
    width: 1,
  },
  cardHeaderInformation: {
    background: 'linear-gradient(60deg, #003c78, #1e64b4)',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    boxShadow:
      '0 12px 20px -10px rgba(0, 60, 120, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 152, 128, 0.2)',
    color: '#ffffff',
    flex: 1,
    padding: 16,
  },
  cardHeaderSubHeader: {
    color: '#c0c0c0',
  },
  cardHeaderTitle: {
    color: '#ffffff',
  },
}

//

export const cardHeaderContentStyles = {
  cardHeaderLink: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'inline',
    fontSize: '1rem',
    outline: 0,
    margin: 0,
    padding: 0,
    textDecoration: 'underline',
    '&:hover': {
      backgroundColor: '#000000',
      textDecoration: 'none',
    },
    '&:focus': {
      backgroundColor: '#ffffff',
      color: '#000000',
      textDecoration: 'none',
    },
  },
  cardHeaderLinkBack: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#c0c0c0',
    cursor: 'pointer',
    display: 'inline',
    fontSize: '1rem',
    outline: 0,
    margin: 0,
    padding: 0,
    textDecoration: 'underline',
    '&:hover': {
      backgroundColor: '#000000',
      textDecoration: 'none',
    },
    '&:focus': {
      backgroundColor: '#ffffff',
      color: '#000000',
      textDecoration: 'none',
    },
  },
  cardHeaderStrong: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
}

//

class CompositeCardHeader extends React.Component<{
  classes: Object,
  icon?: React.Node,
  subTitle: string | typeof React.Fragment,
  title: string | typeof React.Fragment,
}> {
  render() {
    const { classes, icon, subTitle, title } = this.props

    return (
      <div className={classes.cardHeaderRoot}>
        <div className={classes.cardHeaderIcon}>{icon}</div>
        <div className={classes.cardHeaderSeparator} />
        <div className={classes.cardHeaderInformation}>
          <div>
            <Typography className={classes.cardHeaderTitle} component="div" variant="h6">
              {title}
            </Typography>
          </div>
          <div>
            <Typography className={classes.cardHeaderSubHeader} component="div" variant="subtitle1">
              {subTitle}
            </Typography>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(CompositeCardHeader)
