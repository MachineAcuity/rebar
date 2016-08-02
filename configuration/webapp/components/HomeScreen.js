/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader, CardText} from 'material-ui/Card';

import {version} from '../../package'
import isomorphicVars from '../scripts/isomorphicVars';

class HomeScreen extends React.Component
{
  render( )
  {
    var isoVars = isomorphicVars( );

    return ( <div>
      <Card>
        <CardHeader
          title="Universal Relay Boilerplate"
          subtitle={ "Version " + version }
        />
        <CardText>
          The purpose of this project is:
          <ul>
            <li>To serve as a starting point for projects involving react/relay, materual-ui and Cassandra.</li>
            <li>To host examples of using those technologies together.</li>
            <li>To implement some common functionality like user authentication using react/relay while storing user accounts in Cassandra.</li>
          </ul>
          <a href="http://codefoundries.com/products/UniversalRelayBoilerplate.html">PROJECT HOME</a>
          <br/>
        </CardText>
      </Card>
      { isoVars.OBJECT_PERSISTENCE == 'memory' &&
        <div>
          <br/>
          <Card>
            <CardHeader
              title="Using in-memory persistence"
              subtitle="Data loss warning"
            />
            <CardText>
              The application is currently running with in-memory persistence. All data entered into the application, including any user accounts created, will be lost once the application is shut down or restarted.
            </CardText>
          </Card>
        </div>
      }
      <br/>
      <Card>
        <CardHeader
          title="Isomorphic Variables"
          subtitle="Available both for client and server rendering"
        />
        <CardText>
          <p>OBJECT_PERSISTENCE: { isoVars.OBJECT_PERSISTENCE }</p>
        </CardText>
      </Card>
      <br/>
      <Card>
        <CardHeader
          title="GraphiQL"
          subtitle="Explore the GraphQL server"
        />
        <CardText>
          Please notice that the links below will work only when you set the <b>USER_TOKEN_2_BYPASS_IP</b> to be your browser's IP address. All other IPs will not be able to authenticate for security reasons. Use that option with caution. It is best if it is set to 127.0.0.1 as by default.
          <br/>
          All links open in a new window.
          <br/>
          <a href="/graphql" target="_blank">GraphiQL browser</a>
          <br/>
          <a href="/graphql?query=query%20ViewerQueries%20%7B%0A%20%20Viewer%20%7B%0A%20%20id%0A%20%20User_DisplayName%0A%20%20User_ProfilePhoto%0A%20%20User_Email%0A%20%20User_Locale%0A%20%20%7D%0A%7D%0A" target="_blank">Simple query requesting some of the viewer object type fields</a>
          <br/>
          <a href="/graphql?query=query%20ViewerQueries%20%7B%0A%20%20Viewer%20%7B%0A%20%20%20%20id%0A%20%20%20%20Ensayos(first%3A%202147483647)%20%7B%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20Ensayo_Title%0A%20%20%20%20%20%20%20%20%20%20Ensayo_Description%0A%20%20%20%20%20%20%20%20%20%20Ensayo_Content%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" target="_blank">Titles of the essays available in the system</a>
          <br/>
          <a href="/graphql?query=query%20IntrospectionQuery%20%7B%0A%20%20__schema%20%7B%0A%20%20%20%20queryType%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20mutationType%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20types%20%7B%0A%20%20%20%20%20%20...FullType%0A%20%20%20%20%7D%0A%20%20%20%20directives%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20args%20%7B%0A%20%20%20%20%20%20%20%20...InputValue%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20onOperation%0A%20%20%20%20%20%20onFragment%0A%20%20%20%20%20%20onField%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20FullType%20on%20__Type%20%7B%0A%20%20kind%0A%20%20name%0A%20%20description%0A%20%20fields%20%7B%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20args%20%7B%0A%20%20%20%20%20%20...InputValue%0A%20%20%20%20%7D%0A%20%20%20%20type%20%7B%0A%20%20%20%20%20%20...TypeRef%0A%20%20%20%20%7D%0A%20%20%20%20isDeprecated%0A%20%20%20%20deprecationReason%0A%20%20%7D%0A%20%20inputFields%20%7B%0A%20%20%20%20...InputValue%0A%20%20%7D%0A%20%20interfaces%20%7B%0A%20%20%20%20...TypeRef%0A%20%20%7D%0A%20%20enumValues%20%7B%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20isDeprecated%0A%20%20%20%20deprecationReason%0A%20%20%7D%0A%20%20possibleTypes%20%7B%0A%20%20%20%20...TypeRef%0A%20%20%7D%0A%7D%0A%0Afragment%20InputValue%20on%20__InputValue%20%7B%0A%20%20name%0A%20%20description%0A%20%20type%20%7B%0A%20%20%20%20...TypeRef%0A%20%20%7D%0A%20%20defaultValue%0A%7D%0A%0Afragment%20TypeRef%20on%20__Type%20%7B%0A%20%20kind%0A%20%20name%0A%20%20ofType%20%7B%0A%20%20%20%20kind%0A%20%20%20%20name%0A%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20kind%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" target="_blank">Self-introspection query</a>
        </CardText>
      </Card>
    </div> );
  }
}

export default Relay.createContainer( HomeScreen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous
      }
    `,
  },
});
