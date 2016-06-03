/* @flow weak */

import jwt from 'jwt-simple'
import path from 'path';

import log from './log.js'


// Read environment
require( 'dotenv' ).load( )

export function getUserByCookie( objectManager, req)
{
  let user_id = '00000000-0000-0000-0000-000000000000' // Anonymous, unless cookie is passed

  try
  {
    if( req.cookies.user_token_1 )
      if( req.cookies.user_token_1.length > 10 )
      {
        var decoded = jwt.decode( req.cookies.user_token_1, process.env.JWT_SECRET )
        user_id = decoded.user_id
      }
  }
  catch( err )
  {
    return Promise.reject( "Could not read auth cookie. " + err )
  }

  return objectManager.getOneById( 'User', user_id )
  .then( ( a_User ) => {
    if( a_User )
    {
      objectManager.setViewerUserId( user_id )
      return a_User
    }
    else
      return Promise.reject( "User not found" )
  } )

}

export function verifyUserAuthToken( a_User, req )
{
  if ( ! a_User )
    return Promise.reject( "User not found" )
  else
  {
    const request_User_Token2 = req.get( 'user_token_2' )
    if( request_User_Token2 == a_User.User_Token2 || process.env.USER_TOKEN_2_BYPASS_IP == req.ip )
      return Promise.resolve( a_User.id )
    else
    {
      return Promise.reject( "Authentication token expected: " + a_User.User_Token2 + ", provided:" + request_User_Token2 )
    }
  }
}

const httpError403FileName = path.resolve( __dirname, '../configuration/server/httpError/403.html' )

export function serveAuthenticationFailed( res, message )
{
  log.log( 'warn', 'Checking credentials failed: ' + message )

  res.cookie( 'user_token_1', '', { httpOnly: true, expires: new Date( 1 ) } ) // Expire cookie. Only way to 'delete'
  res.status( 403 ).sendFile( httpError403FileName )
}
