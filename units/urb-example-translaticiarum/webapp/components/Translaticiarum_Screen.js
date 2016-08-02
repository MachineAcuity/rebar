/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader} from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import Translaticiarum_addMutation from '../../relay/Translaticiarum_addMutation';

import Translaticiarum_Properties from './Translaticiarum_Properties';


class Translaticiarum_Screen extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
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

  render( )
  {
    const today = new Date( );

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

        { this.props.children }

        <Translaticiarum_Properties
          ref="Translaticiarum_Properties"
          Translaticiarum_Type={ 1 }
          Translaticiarum_Date={ new Date( Date.UTC( today.getFullYear( ), today.getMonth( ), today.getDate( ), 0, 0, 0 ) ).toJSON( ) }
          Translaticiarum_Time={ new Date( Date.UTC( 1970, 0, 1, 12, 0, 0 ) ).toJSON( ) }
          updateHandler={ this._handle_updateHandler_Translaticiarum_Add }
        />

      </Card>
    );
  }
}

export default Relay.createContainer( Translaticiarum_Screen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${Translaticiarum_addMutation.getFragment('Viewer')},
      }
    `,
  },
});
