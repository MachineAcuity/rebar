/* @flow weak */

import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class Ensayo_Properties extends React.Component
{
  constructor( props : any )
  {
    super( props );

    this.state = {
      Dialog_IsOpen: false,
    };
  }

  _handle_Open = ( ) =>
  {
    this.setState( {
      Dialog_IsOpen: true
    } );
  };

  _handle_onTouchTap_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_IsOpen: false
    } );
  };

  _handle_onTouchTap_OK = ( ) =>
  {
    this.props.updateHandler( {
      Ensayo_Content: this.refs.Ensayo_Content.getValue( ),
      Ensayo_Title: this.refs.Ensayo_Title.getValue( ),
      Ensayo_Description: this.refs.Ensayo_Description.getValue( ),
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
          title="Ensayo"
          actions={ [
            <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_Cancel } />,
            <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_OK } />,
          ] }
        >
          <TextField
            ref="Ensayo_Title"
            defaultValue={ this.props.Ensayo_Title }
            floatingLabelText="Title"
            fullWidth={ true }
          />
          <TextField
            ref="Ensayo_Description"
            defaultValue={ this.props.Ensayo_Description }
            floatingLabelText="Description"
            fullWidth={ true }
          />
          <TextField
            ref="Ensayo_Content"
            defaultValue={ this.props.Ensayo_Content }
            floatingLabelText="Content"
            fullWidth={ true }
          />
        </Dialog>
      </div>
    );
  }
}

Ensayo_Properties.propTypes = {
  Ensayo_Title: React.PropTypes.string.isRequired,
  Ensayo_Description: React.PropTypes.string.isRequired,
  Ensayo_Content: React.PropTypes.string.isRequired,
  updateHandler: React.PropTypes.func.isRequired,
};
