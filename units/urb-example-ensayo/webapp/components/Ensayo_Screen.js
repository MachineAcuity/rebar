/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader} from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import Ensayo_addMutation from '../../relay/Ensayo_addMutation';

import Ensayo_Properties from './Ensayo_Properties';


class Ensayo_Screen extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  _handle_updateHandler_Ensayo = ( Ensayo_properties ) =>
  {
    this.context.relay.commitUpdate(
      new Ensayo_addMutation( { ...Ensayo_properties, Viewer: this.props.Viewer } )
    );
  };

  _handle_onTouchTap_Add = ( ) =>
  {
    this.refs.Ensayo_Properties._handle_Open( );
  };

  render( )
  {
    return (
      <Card initiallyExpanded={true}>

        <CardHeader initiallyExpanded={true} title="Ensayo" subtitle="This means Essay in Spanish" />

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

        <Ensayo_Properties
          ref="Ensayo_Properties"
          Ensayo_Content={ "" }
          Ensayo_Title={ "" }
          Ensayo_Description={ "" }
          updateHandler={ this._handle_updateHandler_Ensayo }
        />

      </Card>
    );
  }
}

export default Relay.createContainer( Ensayo_Screen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${Ensayo_addMutation.getFragment('Viewer')},
      }
    `,
  },
});
