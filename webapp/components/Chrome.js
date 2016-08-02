/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';
import withWidth, {LARGE, MEDIUM}  from '../scripts/withWidth';

import AppNavDrawer from './AppNavDrawer';
import ChromeHelmet from '../../configuration/webapp/components/ChromeHelmet';
import ChromeRightIcon from '../../configuration/webapp/components/ChromeRightIcon';
import Footer from '../../configuration/webapp/components/Footer';
import { MainScreenTitle } from '../../configuration/webapp/components/ChromeSettings';
import muiTheme from '../../configuration/webapp/muiTheme.js';


class Chrome extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      navDrawerOpen: false,
    };

    this.muiTheme = getMuiTheme(
      muiTheme,
      { userAgent: navigator.userAgent }
    )
  }

  getChildContext( )
  {
    return ( {
      muiTheme: this.muiTheme
    } );
  }

  _handle_onTouchTap_NavigationToggle = ( ) =>
  {
    this._handle_RequestChangeNavDrawer( ! this.state.navDrawerOpen );
  };

  _handle_RequestChangeNavDrawer = (open) => {
    this.setState( {
      navDrawerOpen: open,
    } );
  };

  _handle_onChangeList_AppNavDrawer = (event, value) => {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  };


  getStyles()
  {
    const styles = {
      appBar: {
        position: 'fixed',
        zIndex: this.muiTheme.zIndex.appBar + 1,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
    };

    if ( this.props.width === MEDIUM || this.props.width === LARGE )
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);

    return styles;
  }

  render( )
  {
    const styles = this.getStyles( )

    let {
      navDrawerOpen,
    } = this.state

    const {
      prepareStyles,
    } = this.muiTheme

    let docked = false
    let showMenuIconButton = true

    if( this.props.width === LARGE )
    {
      docked = true
      navDrawerOpen = true
      showMenuIconButton = false

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      }
      styles.appBar.paddingLeft = 276
      styles.root.paddingLeft = 256
    }

    return (
      <div>
        <ChromeHelmet />
        <AppBar
          onLeftIconButtonTouchTap={ this._handle_onTouchTap_NavigationToggle }
          title={ MainScreenTitle }
          zDepth={0}
          iconElementRight={ <ChromeRightIcon Viewer={this.props.Viewer} /> }
          style={styles.appBar}
          showMenuIconButton={showMenuIconButton}
        />
        <div style={prepareStyles(styles.root)}>
          <div style={prepareStyles(styles.content)}>
            { this.props.children }
          </div>
        </div>
        <AppNavDrawer
          Viewer={ this.props.Viewer }
          style={styles.navDrawer}
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this._handle_RequestChangeNavDrawer}
          onChangeList={ this._handle_onChangeList_AppNavDrawer }
          open={navDrawerOpen}
        />
        <Footer
          Viewer={ this.props.Viewer }
          width={ this.props.width }
        />
      </div>
    )
  }
}

//

Chrome.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Chrome.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

//

// It is important to retrieve UserToken2, since it is used in client.js
export default Relay.createContainer( withWidth( )( Chrome ), {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        UserToken2,
        ${ ChromeRightIcon.getFragment( 'Viewer' ) },
        ${ AppNavDrawer.getFragment( 'Viewer' ) },
        ${ Footer.getFragment( 'Viewer' ) },
      }
    `,
  },
});
