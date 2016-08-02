/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader, CardText} from 'material-ui/Card';


class Ensayo_PublicListing extends React.Component
{
  _handle_onClick( id )
  {
    this.context.router.push( '/Ensayo_PublicListing/' + id );
  }

  renderEnsayos( )
  {
    return this.props.Viewer.Ensayos.edges.map(edge =>
      <Card key={ edge.node.id }>
        <CardHeader
          title={ edge.node.Ensayo_Title }
          subtitle={ edge.node.Ensayo_Description }
        />
        <CardText
          onClick={ ( ) => this._handle_onClick( edge.node.id ) }
        >
          { edge.node.Ensayo_Content }
        </CardText>
      </Card>
    );
  }

  render( )
  {
    return (
      <div>
        { this.renderEnsayos( ) }
      </div>
    );
  }
}

Ensayo_PublicListing.contextTypes = {
  router: React.PropTypes.object.isRequired,
};


export default Relay.createContainer( Ensayo_PublicListing, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Ensayos(first: 2147483647) {
          edges {
            node {
              id,
              Ensayo_Title,
              Ensayo_Description,
              Ensayo_Content,
            },
          },
        },
      }
    `,
  },
});
