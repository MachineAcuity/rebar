/* @flow weak */

import bcrypt from 'bcrypt';
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import ViewerType from '../../../../graphql/type/ViewerType';

import delayPromise from '../../../../scripts/delayPromise';


export default mutationWithClientMutationId( {
  name: 'Viewer_updatePassword',
  inputFields: {
    id:                           { type: new GraphQLNonNull( GraphQLID ) },
    User_AccountPassword_Current: { type: new GraphQLNonNull( GraphQLString ) },
    User_AccountPassword:         { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, context, { rootValue: objectManager } ) => objectManager.getOneById( 'User', objectManager.getViewerUserId( ) )
    },
    ErrorMessage: {
      type: GraphQLString,
      resolve: ( parent ) => parent.ErrorMessage,
    }
  },
  mutateAndGetPayload: ( { id, User_AccountPassword_Current, User_AccountPassword }, context, { rootValue: objectManager } ) =>
  {
    let local_id = fromGlobalId( id ).id;
    let ErrorMessage = ""; // No error if empty

    return delayPromise( 1000 ) // Wait for a second to slow down a possible potential force attack
    .then( ( ) => objectManager.getOneById( 'User', local_id ) )
    .then( ( a_User ) =>
      new Promise( (resolve) =>
        bcrypt.compare( User_AccountPassword_Current, a_User.User_AccountPassword, ( err, User_AccountPasswordIsCorrect ) =>
        {
          if( User_AccountPasswordIsCorrect )
          {
            resolve(
              new Promise( ( resolve ) => {
                bcrypt.hash( User_AccountPassword, 8, ( err, User_AccountPassword ) => resolve( User_AccountPassword ) );
              } )
              .then( ( User_AccountPassword ) => objectManager.update( 'User', {
                id: local_id,
                User_AccountPassword,
              } ) )
            );
          }
          else
          {
            ErrorMessage = "Incorrect current password";
            resolve( );
          }
        } )
      )
    )
    .then( ( ) => {
      return { ErrorMessage };
    } )
  },
} );
