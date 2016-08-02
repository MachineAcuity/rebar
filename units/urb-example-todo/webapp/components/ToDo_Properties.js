/* @flow weak */

import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class ToDo_Properties extends React.Component
{
  constructor( props : any )
  {
    super( props );

    this.state = {
      Dialog_IsOpen: false,
    };
  }

  _handle_Open( )
  {
    this.setState( {
      Dialog_IsOpen: true
    } );
  }

  _handle_onTouchTap_Close = ( ) =>
  {
    this.setState( {
      Dialog_IsOpen: false
    } );
  };

  _handle_onTouchTap_OK = ( ) =>
  {
    this.props.updateHandler( {
      ToDo_Text: this.refs.ToDo_Text.getValue( ),
    } );

    this.setState( {
      Dialog_IsOpen: false
    } );
  };

  render( )
  {
    return(
      <div>
        <Dialog
          open={ this.state.Dialog_IsOpen }
          title="ToDo"
          actions={ [
            <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_Close } />,
            <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_OK } />,
          ] }
        >
          <TextField
            ref="ToDo_Text"
            defaultValue={ this.props.ToDo_Text }
            floatingLabelText="To Do"
            fullWidth={ true }
          />
        </Dialog>
      </div>
    );
  }
}
