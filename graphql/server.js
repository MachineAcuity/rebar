/* @flow weak */

import express from 'express'
import graphQLHTTP from 'express-graphql'
import ObjectManager from '../graphql/ObjectManager'

import { connectAndLoadSchemas } from '../units/urb-persister-cassandra/graphql/ExpressCassandra'
import _schemas_system from './model/_schemas'
import _schemas from '../configuration/graphql/_schemas'

import { getUserByCookie, verifyUserAuthToken, serveAuthenticationFailed } from '../server/credentials_check.js'
import schema from './schema' // Schema for GraphQL server


// Prepare express-cassandra
connectAndLoadSchemas( )

let router = express( )

router.use( '/', ( req, res, next ) =>
{
  // create individual object manager for each request
  const objectManager = new ObjectManager( )

  getUserByCookie( objectManager, req, res )
  .then( ( a_User ) => verifyUserAuthToken( a_User, req, res ) )
  .then( () => {
    graphQLHTTP( () => {
      return( {
        schema: schema,
        rootValue: objectManager,
        pretty: true,
        graphiql: true,
      } )
    } )( req, res, next )
  } )
  .catch( ( error ) => serveAuthenticationFailed( res, error ) )
} ) // router.use

export default router
