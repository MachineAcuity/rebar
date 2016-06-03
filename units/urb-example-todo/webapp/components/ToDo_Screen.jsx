/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import ToDo_addMutation from '../../relay/ToDo_addMutation';

class ToDo_Screen extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  constructor( props )
  {
     super( props );

     this.state = {
       ToDo_Text_New: '',
     };
   }


  _handle_onKeyDown_AddToDo = ( e ) =>
  {
    if( e.keyCode === 13 )
    {
      this.context.relay.commitUpdate(
        new ToDo_addMutation( {
          ToDo_Text: this.state.ToDo_Text_New,
          Viewer: this.props.Viewer
        } )
      );

      this.setState( {
        ToDo_Text_New: '',
      } );
    }
  };

  _handle_OnChange = ( event ) =>
  {
    this.setState( {
      ToDo_Text_New: event.target.value,
    } );
  };

  render( )
  {
    return (
      <Card>

        <CardHeader title="TO DOs" subtitle="List of TO DOs for user" />

        { this.props.children }

        <div style={ { marginLeft: 4, marginRight: 4 } }>
          <TextField
            floatingLabelText="What needs to be done?"
            value={ this.state.ToDo_Text_New }
            fullWidth={ true }
            onKeyDown={ this._handle_onKeyDown_AddToDo }
            onChange={ this._handle_OnChange }
          />
        </div>

      </Card>
    );
  }
}

export default Relay.createContainer( ToDo_Screen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_TotalCount,
        ${ToDo_addMutation.getFragment('Viewer')},
      }
    `,
  },
});
