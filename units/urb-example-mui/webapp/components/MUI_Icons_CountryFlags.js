/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import {
  Icon_Flag_AU,
  Icon_Flag_BG,
  Icon_Flag_BR,
  Icon_Flag_CA,
  Icon_Flag_CN,
  Icon_Flag_DE,
  Icon_Flag_FR,
  Icon_Flag_IN,
  Icon_Flag_RU,
  Icon_Flag_US
} from 'material-ui-country-flags';

class MUI_Icons_CountryFlags extends React.Component
{
  render( )
  {
    return (
      <div>
        <Card>
          <List>
            <ListItem key="AU" primaryText="Icon_Flag_AU" leftIcon={<Icon_Flag_AU />} />
            <Divider inset={true} />
            <ListItem key="BG" primaryText="Icon_Flag_BG" leftIcon={<Icon_Flag_BG />} />
            <Divider inset={true} />
            <ListItem key="BR" primaryText="Icon_Flag_BR" leftIcon={<Icon_Flag_BR />} />
            <Divider inset={true} />
            <ListItem key="CA" primaryText="Icon_Flag_CA" leftIcon={<Icon_Flag_CA />} />
            <Divider inset={true} />
            <ListItem key="CN" primaryText="Icon_Flag_CN" leftIcon={<Icon_Flag_CN />} />
            <Divider inset={true} />
            <ListItem key="DE" primaryText="Icon_Flag_DE" leftIcon={<Icon_Flag_DE />} />
            <Divider inset={true} />
            <ListItem key="FR" primaryText="Icon_Flag_FR" leftIcon={<Icon_Flag_FR />} />
            <Divider inset={true} />
            <ListItem key="IN" primaryText="Icon_Flag_IN" leftIcon={<Icon_Flag_IN />} />
            <Divider inset={true} />
            <ListItem key="RU" primaryText="Icon_Flag_RU" leftIcon={<Icon_Flag_RU />} />
            <Divider inset={true} />
            <ListItem key="US" primaryText="Icon_Flag_US" leftIcon={<Icon_Flag_US />} />
          </List>
        </Card>
      </div>
    )
  }
}

export default Relay.createContainer( MUI_Icons_CountryFlags, {
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
} );
