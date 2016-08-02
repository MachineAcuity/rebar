/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import {ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

import { dateFromUTCString, dateUTCToLocal } from '../../../../webapp/scripts/DateTimeHelpers'

import Translaticiarum_deleteMutation from '../../relay/Translaticiarum_deleteMutation';
import Translaticiarum_updateMutation from '../../relay/Translaticiarum_updateMutation';

import Translaticiarum_Icon from './Translaticiarum_Icon';
import Translaticiarum_Properties from './Translaticiarum_Properties';


class Translaticiarum_Item extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  _handle_updateHandler_Translaticiarum_Properties = ( Translaticiarum_properties ) =>
  {
    this.context.relay.commitUpdate(
      new Translaticiarum_updateMutation( { Translaticiarum: this.props.Translaticiarum, ...Translaticiarum_properties } )
    );
  };

  _Translaticiarum_delete( )
  {
    this.context.relay.commitUpdate(
      new Translaticiarum_deleteMutation( { Translaticiarum: this.props.Translaticiarum, Viewer: this.props.Viewer } )
    );
  }

  _handle_onItemTouchTap = ( e, item ) =>
  {
    switch( item.ref )
    {
      case 'edit':
        this.refs.Translaticiarum_Properties._handle_Open( );
        break;
      case 'delete':
        this._Translaticiarum_delete( );
        break;
      default:
        break;
    }
  };

  render( )
  {
    const theDate = dateFromUTCString( this.props.Translaticiarum.Translaticiarum_Date );
    const theTime = dateFromUTCString( this.props.Translaticiarum.Translaticiarum_Time );

    const theDateTime = dateUTCToLocal( new Date( theDate.getTime( ) + theTime.getTime( ) ) );

    const rightIconMenu = (
      <IconMenu
        iconButtonElement={ <IconButton><NavigationMoreVert /></IconButton> }
        onItemTouchTap={ this._handle_onItemTouchTap }
      >
        <MenuItem ref="edit" index={0}>Edit</MenuItem>
        <MenuItem ref="delete" index={1}>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <div>
        <ListItem
          leftIcon={ Translaticiarum_Icon( this.props.Translaticiarum.Translaticiarum_Type ) }
          primaryText={ theDateTime.toString( ) }
          rightIconButton={ rightIconMenu }
        />
        <Translaticiarum_Properties
          ref="Translaticiarum_Properties"
          Translaticiarum_Type={ this.props.Translaticiarum.Translaticiarum_Type }
          Translaticiarum_Date={ this.props.Translaticiarum.Translaticiarum_Date }
          Translaticiarum_Time={ this.props.Translaticiarum.Translaticiarum_Time }
          updateHandler={ this._handle_updateHandler_Translaticiarum_Properties }
        />
      </div>
    );
  }
}

export default Relay.createContainer( Translaticiarum_Item, {
  fragments: {
    Translaticiarum: () => Relay.QL`
      fragment on Translaticiarum {
        id,
        Translaticiarum_Date,
        Translaticiarum_Time,
        Translaticiarum_Type,
        ${Translaticiarum_deleteMutation.getFragment('Translaticiarum')},
        ${Translaticiarum_updateMutation.getFragment('Translaticiarum')},
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${Translaticiarum_deleteMutation.getFragment('Viewer')},
      }
    `,
  },
} );
