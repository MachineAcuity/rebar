/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {List} from 'material-ui/List';

import Translaticiarum_Item from './Translaticiarum_Item';

class Translaticiarum_List extends React.Component
{
  renderTranslaticiarums( )
  {
    return this.props.Viewer.Translaticiarums.edges.map(edge =>
      <Translaticiarum_Item
        key={edge.node.id}
        Translaticiarum={edge.node}
        Viewer={this.props.Viewer}
      />
    );
  }

  render( )
  {
    return (
      <div>
        <List>
          { this.renderTranslaticiarums( ) }
        </List>
      </div>
    );
  }
}

export default Relay.createContainer( Translaticiarum_List, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Translaticiarums(first: 2147483647) {
          edges {
            node {
              id,
              ${Translaticiarum_Item.getFragment('Translaticiarum')},
            },
          },
        },
        ${Translaticiarum_Item.getFragment('Viewer')},
      }
    `,
  },
});
