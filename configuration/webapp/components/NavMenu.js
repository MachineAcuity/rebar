/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react'
import Relay from 'react-relay'

import {List, ListItem, MakeSelectable} from 'material-ui/List';

const SelectableList = MakeSelectable(List);

class NavMenu extends React.Component
{
  render( )
  {
    let nestedItems_Misc = [
      <ListItem primaryText="Home" value="/" />,
      <ListItem primaryText="Compendium" value="/compendiums" />,
    ];
    if( ! this.props.Viewer.User_IsAnonymous )
    {
      nestedItems_Misc.push( <ListItem primaryText="User Profile" value="/User" /> )
      nestedItems_Misc.push( <ListItem primaryText="Force Login" value="/ForceLogin" /> )
    }

    return (
      <SelectableList
        value={ this.props.value }
        onChange={ this.props.onChange }
      >
        <ListItem
          primaryText="To Do"
          primaryTogglesNestedList={true}
          nestedItems={ [
            <ListItem primaryText="All" value="/ToDos" />,
            <ListItem primaryText="Active" value="/ToDos/active" />,
            <ListItem primaryText="Completed" value="/ToDos/completed" />,
          ] }
        />
        <ListItem
          primaryText="Ensayo"
          primaryTogglesNestedList={true}
          nestedItems={ [
            <ListItem primaryText="Edit" value="/Ensayos" />,
            <ListItem primaryText="Public View" value="/Ensayo_PublicListing" />,
          ] }
        />
        <ListItem
          primaryText="Translaticiarum"
          primaryTogglesNestedList={true}
          nestedItems={ [
            <ListItem primaryText="View and Edit" value="/Translaticiarums" />,
            <ListItem primaryText="Grid View" value="/TranslaticiarumsGrid" />,
          ] }
        />
        <ListItem
          primaryText="Misc"
          primaryTogglesNestedList={true}
          nestedItems={ nestedItems_Misc }
        />
        <ListItem
          primaryText="Material-UI"
          primaryTogglesNestedList={true}
          nestedItems={ [
            <ListItem primaryText="Home" value="/mui" />,
            <ListItem primaryText="Library Icons" value="/mui/icons" />,
            <ListItem primaryText="Country Flags" value="/mui/icons_country_flags" />,
            <ListItem primaryText="Credit Cards" value="/mui/icons_credit_cards" />,
          ] }
        />
      </SelectableList>
    )
  }
}

export default Relay.createContainer( NavMenu, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
} )
