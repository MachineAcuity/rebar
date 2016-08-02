/* @flow weak */

import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, match, Router } from 'react-router';
import Relay from 'react-relay';

import isomorphicVars from '../configuration/webapp/scripts/isomorphicVars';
import routes from '../configuration/webapp/routes';

import './styles/main.css';


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin( );

const isoVars = isomorphicVars( );

// Retrieve prepared data
const data = JSON.parse( document.getElementById( 'preloadedData' ).textContent );

// Retrieve the auth token. We know it will be on viewer, but we do not know which fragment.
// Go through them all.
// It is important that UserToken2 is requested in Chrome.jsx
let UserToken2 = "";
for( let fragment of data )
{
  const authTokenInThisFragment = fragment.response.Viewer.UserToken2;
  if( authTokenInThisFragment != null )
  {
    UserToken2 = authTokenInThisFragment;
    break;
  }
}

if( UserToken2.length == 0 )
  alert( 'Authentication token retrieval failed' );


// Where is the GraphQL server?
const graphQLServerURL = isoVars.PUBLIC_URL + '/graphql';

// Create Relay environment
// Ensure that on the client Relay is passing the HttpOnly cookie with auth, and the user auth token
const environment = new Relay.Environment( );
environment.injectNetworkLayer( new Relay.DefaultNetworkLayer(
  graphQLServerURL,
  {
    credentials: 'same-origin',
    headers: {
      UserToken2: UserToken2,
    },
  }
) );
IsomorphicRelay.injectPreparedData(environment, data);

const rootElement = document.getElementById('root');

match( { routes, history: browserHistory }, ( error, redirectLocation, renderProps ) => {
  IsomorphicRouter.prepareInitialRender( environment, renderProps ).then( props => {
    ReactDOM.render( <Router {...props} />, rootElement );
  } );
} );
