/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader, CardText} from 'material-ui/Card';

class MUI_Home extends React.Component
{
  render( )
  {
    return (
      <Card>
        <CardHeader
          title="Icons"
          subtitle="How to generate all icons"
        />
        <CardText>
          If all icons need to be generated, then comment out the line
          <pre>
            if( key > 50 ) return;
          </pre>
          in scripts/build-mui-icon-list.js and run
          <pre>
            npm run build-mui-icon-list
          </pre>
        </CardText>
      </Card>
    )
  }
}

export default Relay.createContainer( MUI_Home, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
} );
