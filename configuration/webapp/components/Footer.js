/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react'
import Relay from 'react-relay'

import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors';
import {LARGE}  from '../../../webapp/scripts/withWidth';

import FullWidthSection from '../../../webapp/components/FullWidthSection'


const styles = {
  footer: {
    backgroundColor: grey900,
    textAlign: 'center',
    paddingRight: 24
  },
  a: {
    color: darkWhite,
  },
  p: {
    margin: '0 auto',
    padding: 0,
    color: lightWhite,
    maxWidth: 356,
  },
}


class Footer extends React.Component
{
  render( )
  {
    if( this.props.width == LARGE )
      styles.footer.paddingLeft = 256 + 24
    else
      styles.footer.paddingLeft = 24

    return (
      <FullWidthSection style={ styles.footer }>
        <p style={ styles.p }>
          {'Hand crafted with love by the engineers at '}
          <a style={ styles.a } href="http://codefoundries.com">
            Code Foundries
          </a>
          {' and our awesome '}
          <a
            style={ styles.a }
            href="https://github.com/codefoundries/UniversalRelayBoilerplate/graphs/contributors"
          >
            contributors
          </a>.
          {' Universal Relay Boilerplate is '}
          <a style={ styles.a } href="https://github.com/codefoundries/UniversalRelayBoilerplate">
            available on github
          </a>.
        </p>
      </FullWidthSection>
    )
  }
}

export default Relay.createContainer( Footer, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
} )
