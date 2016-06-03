/* @flow weak */

import Helmet from 'react-helmet';
import IsomorphicRouter from 'isomorphic-relay-router';
import log from '../server/log.js';
import MobileDetect from 'mobile-detect'
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import RelayLocalSchema from 'relay-local-schema';
import { match } from 'react-router';

import { getUserByCookie, serveAuthenticationFailed } from '../server/credentials_check.js';
import isomorphicVars from '../configuration/webapp/scripts/isomorphicVars';
import ObjectManager from '../graphql/ObjectManager';
import routes from '../configuration/webapp/routes';
import schema from '../graphql/schema'; // Schema for GraphQL server

// Read environment
require( 'dotenv' ).load( );

// Load up isomorphic vars here, for server rendering
const isoVars = JSON.stringify( isomorphicVars( ) );

const httpError500FileName = path.resolve( __dirname, '../configuration/server/httpError/500.html' )

export function serveFailure( type, res, message, err )
{
  log.log( type, 'Server error: ' + message, err );

  res.status( 500 ).sendFile( httpError500FileName );
}

const httpError404FileName = path.resolve( __dirname, '../configuration/server/httpError/404.html' )

export default ( req, res, next, assetsPath ) =>
{
  match( { routes, location: req.originalUrl }, ( error, redirectLocation, renderProps ) => {
    if( error )
      next(error);
    else if( redirectLocation )
      res.redirect( 302, redirectLocation.pathname + redirectLocation.search );
    else if( renderProps )
      reunderOnServerCorrectRequest( req, res, next, assetsPath, renderProps );
    else
        res.status( 404 ).sendFile( httpError404FileName );
  } );
};

function reunderOnServerCorrectRequest( req, res, next, assetsPath, renderProps )
{
  // create individual object manager for each request
  const objectManager = new ObjectManager( );

  getUserByCookie( objectManager, req, res )
  .then( ( ) => {
    try
    {

      const networkLayer = new RelayLocalSchema.NetworkLayer( {
        schema,
        rootValue: objectManager,
        onError: ( errors, request ) => serveFailure( 'error', res, 'local network layer GraphQL failure', { errors, request } )
      } );

      function render( { data, props } )
      {
        try
        {
          // Setting up static, global navigator object to pass user agent to material-ui. Since the function is synchronous,
          // it is OK to do so.
          global.navigator = { userAgent: req.headers[ 'user-agent' ] }

          // Also, set width to emulate phone, tablet or desktop
          const md = new MobileDetect( req.headers[ 'user-agent' ] )

          let innerWidth
          if( md.phone( ) )
            innerWidth = 700 // Will qualify as SMALL
          else if( md.tablet( ) )
            innerWidth = 900 // Will qualify as MEDIUM
          else
            innerWidth = 1100 // Will qualify as LARGE

          global.window = { innerWidth: innerWidth }

          // Also set global location for the leftNav
          global.location = { pathname: req.originalUrl };

          // Get the react output HTML
          const reactOutput = ReactDOMServer.renderToString( IsomorphicRouter.render(props) );
          const helmet = Helmet.rewind( );

          res.render( path.resolve( __dirname, 'renderOnServer.ejs' ), {
              preloadedData: JSON.stringify(data).replace(/\//g, '\\/'),
              assetsPath: assetsPath,
              reactOutput,
              title: helmet.title,
              meta: helmet.meta,
              link: helmet.link,
              isomorphicVars: isoVars,
              NODE_ENV: process.env.NODE_ENV,
          } );
        }
        catch( err )
        {
          serveFailure( 'error', res, 'renderOnServer render funcion failed', err )
        }
      }

      IsomorphicRouter.prepareData( renderProps, networkLayer ).then( render, next );
    }
    catch( err )
    {
      serveFailure( 'error', res, 'renderOnServer failed', err )
    }
  } )
  .catch( ( error ) => serveAuthenticationFailed( res, error ) )
  ; // then
}
