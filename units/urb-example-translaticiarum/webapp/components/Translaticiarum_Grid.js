/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Dimensions from 'react-dimensions'
import Relay from 'react-relay';

import {Card, CardActions, CardHeader} from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { dateLocalToUTC, dateUTCToLocal, dateFormat } from '../../../../webapp/scripts/DateTimeHelpers'

import Translaticiarum_addMutation from '../../relay/Translaticiarum_addMutation';
import Translaticiarum_deleteMutation from '../../relay/Translaticiarum_deleteMutation';
import Translaticiarum_updateMutation from '../../relay/Translaticiarum_updateMutation';

import Translaticiarum_Icon from './Translaticiarum_Icon';
import Translaticiarum_Properties from './Translaticiarum_Properties';

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

//@Dimensions( )
class Translaticiarum_Grid extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  constructor( props )
  {
    super( props );

    const Date_Start = new Date( );
    Date_Start.setHours( 0 );
    Date_Start.setMinutes( 0 );
    Date_Start.setSeconds( 0 );
    Date_Start.setMilliseconds( 0 );

    this.state = {
      Date_Start: Date_Start,
    };
  }

  _handle_onChange_Date_Start = ( event, value ) =>
  {
    this.setState( {
      Date_Start: value
    } );
  };

  _handle_updateHandler_Translaticiarum_Add = ( Translaticiarum_properties ) =>
  {
    this.context.relay.commitUpdate(
      new Translaticiarum_addMutation( { ...Translaticiarum_properties, Viewer: this.props.Viewer } )
    );
  };

  _handle_onTouchTap_Add = ( ) =>
  {
    this.refs.Translaticiarum_Properties._handle_Open( );
  };

  getTranslaticiarumByDateAndType( transliticiarumDays : Array<Date> )
  {
    const dayCount = transliticiarumDays.length - 1; // First element is null

    // Array with the dates
    const results = { };
    for( let ixDay = 1; ixDay <= dayCount; ixDay++ )
    {
      results[ transliticiarumDays[ ixDay ].getTime( ) ] = { };
    }

    this.props.Viewer.Translaticiarums.edges.map( ( edge ) => {

      const Translaticiarum_Date_Epoch = new Date( edge.node.Translaticiarum_Date ).getTime( );

      const resultsForDay = results[ Translaticiarum_Date_Epoch ];
      if( resultsForDay != null )
      {
        const type = edge.node.Translaticiarum_Type;
        let arrTranslaticiarum = resultsForDay[ type ];
        if( arrTranslaticiarum == null )
          arrTranslaticiarum = resultsForDay[ type ] = [ ];

        arrTranslaticiarum.push( edge.node )
      }

    } );

    return results;
  }

  renderCell( TranslaticiarumByDateAndType, translaticiarumType, transliticiarumDay )
  {
    let cell;

    // Type 0 does not exist, this indicates that a row should be dates
    if( translaticiarumType == 0 )
    {
      // Blank cell top left
      if( transliticiarumDay == null )
        cell = "";
      else
      {
        // Will display day of week
        cell = dayOfWeek[ dateUTCToLocal( transliticiarumDay ).getUTCDay( ) ];
      }
    }
    else
    {
      // On the left, the types of translaticiarums
      if( transliticiarumDay == null )
        cell =Translaticiarum_Icon( translaticiarumType );
      else
      {
        cell = "-";
        const TranslaticiarumByType = TranslaticiarumByDateAndType[ transliticiarumDay.getTime( ) ];
        if( TranslaticiarumByType != null )
        {
          const arrTranslaticiarum = TranslaticiarumByType[ translaticiarumType ];
          if( arrTranslaticiarum != null )
          {
            cell = "";
            for( let a_Translaticiarum of arrTranslaticiarum )
              cell += dateFormat( dateUTCToLocal( new Date( a_Translaticiarum.Translaticiarum_Time ) ), "h:mmtt" );
            //cell = "X";
          }
        }
      }
    }

    return(
      <td style={ { width: 100 } }key={ transliticiarumDay }>{ cell }</td>
    );
  }

  render( )
  {
    let translaticiarumTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const firstDayEpoch = dateLocalToUTC( this.state.Date_Start ).getTime( );

    // Depending on width, determine the number of days shows. Each day is 100 pixels
    let numberOfDays = Math.floor( ( this.props.containerWidth - 120 ) / 100 );
    if( numberOfDays < 1 ) numberOfDays = 1;
    else if( numberOfDays > 7 ) numberOfDays = 7;

    let transliticiarumDays : Array<Date> = [ ];
    for( let day = 0; day < numberOfDays; day++ )
      transliticiarumDays[ day + 1] = new Date( firstDayEpoch + day * 24*60*60*1000 );

    const TranslaticiarumByDateAndType = this.getTranslaticiarumByDateAndType( transliticiarumDays );

    return (
      <Card initiallyExpanded={true}>

        <CardHeader initiallyExpanded={true} title="Translaticiarum" subtitle="This means routine in Latin" />

        <div style={ {float: 'right', marginTop: -58, marginRight: 20 } }>
          <FloatingActionButton
            secondary={true}
            linkButton={true}
            mini={true}
            actAsExpander={true}
            onTouchTap={ this._handle_onTouchTap_Add }
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>

        <table>
          <tbody>
            { translaticiarumTypes.map( ( translaticiarumType ) =>
              <tr key={ translaticiarumType }>
                { transliticiarumDays.map( ( transliticiarumDay ) =>
                  this.renderCell( TranslaticiarumByDateAndType, translaticiarumType, transliticiarumDay )
                ) }
              </tr>
            ) }
          </tbody>
        </table>

        <CardActions initiallyExpanded={true}>
          <DatePicker
            hintText="Date Start"
            value={ this.state.Date_Start }
            onChange={ this._handle_onChange_Date_Start }
          />
        </CardActions>

        <Translaticiarum_Properties
          ref="Translaticiarum_Properties"
          Translaticiarum_Type={ 1 }
          Translaticiarum_Date={ new Date( ).toJSON( ) }
          Translaticiarum_Time={ new Date( ).toJSON( ) }
          updateHandler={ this._handle_updateHandler_Translaticiarum_Add }
        />

      </Card>
    );
  }
}

export default Relay.createContainer( Dimensions( )( Translaticiarum_Grid ), {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Translaticiarums(first: 2147483647) {
          edges {
            node {
              id,
              Translaticiarum_Date,
              Translaticiarum_Time,
              Translaticiarum_Type,
              ${Translaticiarum_deleteMutation.getFragment('Translaticiarum')},
              ${Translaticiarum_updateMutation.getFragment('Translaticiarum')},
            },
          },
        },
        ${Translaticiarum_addMutation.getFragment('Viewer')},
        ${Translaticiarum_deleteMutation.getFragment('Viewer')},
      }
    `,
  },
});
