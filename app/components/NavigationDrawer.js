import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer } from 'react-native-router-flux';

import DrawerView from './DrawerView';

class NavigationDrawer extends React.Component
{
  render( )
  {
    const children = this.props.navigationState.children;
    return (
      <Drawer
        ref="navigation"
        type="displace"
        content={<DrawerView />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = {
  navigationState: PropTypes.object,
}

export default NavigationDrawer
