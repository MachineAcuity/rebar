/* @flow weak */

import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import Drawer from 'react-native-drawer'
import { DefaultRenderer } from 'react-native-router-flux'

import DrawerView from '../../configuration/app/components/DrawerView'
import { openDrawerOffset, panCloseMask, opacityBase } from '../../configuration/app/components/NavigationDrawerSettings'

class NavigationDrawer extends React.Component
{
  render( )
  {
    const children = this.props.navigationState.children
    return (
      <Drawer
        ref="navigation"
        type="displace"
        content={ <DrawerView Viewer={this.props.Viewer} /> }
        tapToClose
        openDrawerOffset={ openDrawerOffset }
        panCloseMask={ panCloseMask}
        negotiatePan
        tweenHandler={ ( ratio ) => ( {
          main: { opacity: Math.max( opacityBase, 1 - ratio ) },
        } ) }
      >
        <DefaultRenderer
          navigationState={ children[ 0 ] }
          onNavigate={ this.props.onNavigate }
        />
      </Drawer>
    )
  }
}

NavigationDrawer.propTypes = {
  navigationState: PropTypes.object,
  onNavigate: PropTypes.func
}

export default Relay.createContainer( NavigationDrawer,
{
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer {
        ${ DrawerView.getFragment( 'Viewer' ) }
      }
    `,
  },
} )
