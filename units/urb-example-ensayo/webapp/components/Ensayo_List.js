/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {List} from 'material-ui/List';

import Ensayo_Item from './Ensayo_Item';

class Ensayo_List extends React.Component
{
  renderEnsayos( )
  {
    return this.props.Viewer.Ensayos.edges.map(edge =>
      <Ensayo_Item
        key={edge.node.id}
        Ensayo={edge.node}
        Viewer={this.props.Viewer}
      />
    );
  }

  render( )
  {
    return (
      <div>
        <List>
          { this.renderEnsayos( ) }
        </List>
      </div>
    );
  }
}

export default Relay.createContainer( Ensayo_List, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Ensayos(first: 2147483647) {
          edges {
            node {
              id,
              ${Ensayo_Item.getFragment('Ensayo')},
            },
          },
        },
        ${Ensayo_Item.getFragment('Viewer')},
      }
    `,
  },
});
