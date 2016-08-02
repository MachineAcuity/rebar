/* @flow weak */

export default function( )
{
  if( typeof( window ) == 'undefined' || typeof( window.isomorphicVars ) == 'undefined' )
  {
    // Running on server.
    return {
      PUBLIC_URL: process.env.PUBLIC_URL,
      // Modify the code below to set the variables >>>
      OBJECT_PERSISTENCE: process.env.OBJECT_PERSISTENCE,
      // <<< Modify the code above to set the variables
    }
  }
  else
    return window.isomorphicVars;
}
