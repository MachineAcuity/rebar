/* @flow weak */

import React from 'react';

import DatePicker from 'material-ui/DatePicker/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker/TimePicker';

import { dateFromUTCString, dateUTCToLocal, dateLocalToUTC } from '../../../../webapp/scripts/DateTimeHelpers'

export default class Translaticiarum_Properties extends React.Component
{
  constructor( props : any )
  {
    super( props );

    this.state = {
      Dialog_IsOpen: false,
      Translaticiarum_Date: dateUTCToLocal( dateFromUTCString( props.Translaticiarum_Date ) ),
      Translaticiarum_Time: dateUTCToLocal( dateFromUTCString( props.Translaticiarum_Time ) ),
    };
  }

  _handle_Open( )
  {
    this.setState( {
      Dialog_IsOpen: true
    } );
  }

  _handle_onChange_Translaticiarum_Date = ( event, value ) =>
  {
    this.setState( {
      Translaticiarum_Date: value
    } );
  };

  _handle_onChange_Translaticiarum_Time = ( event, value ) =>
  {
    this.setState( {
      Translaticiarum_Time: value
    } );
  };

  _handle_onTouchTap_Close = ( ) =>
  {
    this.setState( {
      Dialog_IsOpen: false
    } );
  };

  _handle_onTouchTap_OK = ( ) =>
  {
    let theTime = this.state.Translaticiarum_Time;
    theTime.setYear( 1970 );
    theTime.setMonth( 0 );
    theTime.setDate( 1 );
    theTime.setSeconds( 0 );
    theTime.setMilliseconds( 0 );

    this.props.updateHandler( {
      Translaticiarum_Type: this.refs.Translaticiarum_Type.getValue( ),
      Translaticiarum_Date: dateLocalToUTC( this.state.Translaticiarum_Date ).toJSON( ),
      Translaticiarum_Time: dateLocalToUTC( theTime ).toJSON( ),
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
          title="Translaticiarum"
          actions={ [
            <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_Close } />,
            <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_OK } />,
          ] }
        >
          <TextField
            ref="Translaticiarum_Type"
            defaultValue={ this.props.Translaticiarum_Type }
            floatingLabelText="Type"
            fullWidth={ true }
          />
          <DatePicker
            hintText="Date"
            value={ this.state.Translaticiarum_Date }
            onChange={ this._handle_onChange_Translaticiarum_Date }
          />
          <TimePicker
            hintText="Time"
            defaultTime={ this.state.Translaticiarum_Time }
            onChange={ this._handle_onChange_Translaticiarum_Time }
          />
        </Dialog>
      </div>
    );
  }
}
