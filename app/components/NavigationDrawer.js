import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Drawer from 'react-native-drawer';
import { DefaultRenderer } from 'react-native-router-flux';

import DrawerView from '../../configuration/app/components/DrawerView';

class NavigationDrawer extends React.Component
{
  render( )
  {
    const children = this.props.navigationState.children;
    return (
      <Drawer
        ref="navigation"
        type="displace"
        content={ <DrawerView Viewer={this.props.Viewer} /> }
        tapToClose
        openDrawerOffset={ 0.2 }
        panCloseMask={ 0.2 }
        negotiatePan
        tweenHandler={ ( ratio ) => ( {
          main: { opacity: Math.max( 0.54, 1 - ratio ) },
        } ) }
      >
        <DefaultRenderer
          navigationState={ children[ 0 ] }
          onNavigate={ this.props.onNavigate }
        />
      </Drawer>
    );
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
