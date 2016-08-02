/* @flow weak */

import express from 'express';

import {version} from '../configuration/package'
import renderOnServer from './renderOnServer'

let assetsPath;
if( process.env.NODE_ENV == 'production' )
  assetsPath = `/assets/${version}`;
else
  assetsPath = `http://localhost:8080/${version}`;

let app = express();

// Serve HTML
app.get( '/*', ( req, res, next ) => {
    renderOnServer( req, res, next, assetsPath );
} );

export default app;
