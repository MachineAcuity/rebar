/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';


import {
  Icon_AmericanExpress,
  Icon_CreditCardOutline,
  Icon_DinersClub,
  Icon_Discover,
  Icon_JCB,
  Icon_MasterCard,
  Icon_Visa,
  getCreditCardIconByName
} from 'material-ui-credit-card-icons';


class MUI_Icons_CreditCards extends React.Component
{
  constructor(props)
  {
    super( props );
    this.state = {
      value: 'CreditCardOutline'
    };
  }

  handleChange = ( event, index, value ) => this.setState( {value} );

  render( )
  {
    return (
      <div>
        <Card>
          <List>
            <ListItem key="0" primaryText="Icon_AmericanExpress" leftIcon={<Icon_AmericanExpress />} />
            <Divider inset={true} />
            <ListItem key="1" primaryText="Icon_CreditCardOutline" leftIcon={<Icon_CreditCardOutline />} />
            <Divider inset={true} />
            <ListItem key="2" primaryText="Icon_DinersClub" leftIcon={<Icon_DinersClub />} />
            <Divider inset={true} />
            <ListItem key="3" primaryText="Icon_Discover" leftIcon={<Icon_Discover />} />
            <Divider inset={true} />
            <ListItem key="4" primaryText="Icon_JCB" leftIcon={<Icon_JCB />} />
            <Divider inset={true} />
            <ListItem key="5" primaryText="Icon_MasterCard" leftIcon={<Icon_MasterCard />} />
            <Divider inset={true} />
            <ListItem key="6" primaryText="Icon_Visa" leftIcon={<Icon_Visa />} />
          </List>
        </Card>
        <br />
        <Card>
          <div>
            <IconButton>
              { getCreditCardIconByName( this.state.value ) }
            </IconButton>
            <SelectField value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={'AmericanExpress'} primaryText="AmericanExpress"/>
              <MenuItem value={'CreditCardOutline'} primaryText="CreditCardOutline"/>
              <MenuItem value={'DinersClub'} primaryText="DinersClub"/>
              <MenuItem value={'Discover'} primaryText="Discover"/>
              <MenuItem value={'MasterCard'} primaryText="MasterCard"/>
              <MenuItem value={'Visa'} primaryText="Visa"/>
            </SelectField>
          </div>
        </Card>
      </div>
    )
  }
}

export default Relay.createContainer( MUI_Icons_CreditCards, {
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
} );
