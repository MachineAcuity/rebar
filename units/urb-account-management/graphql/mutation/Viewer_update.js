/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Viewer_update',
  inputFields: {
    id:                      { type: new GraphQLNonNull( GraphQLID ) },
    User_DisplayName:        { type: new GraphQLNonNull( GraphQLString ) },
    User_ProfilePhoto:       { type: new GraphQLNonNull( GraphQLString ) },
    User_Email:              { type: new GraphQLNonNull( GraphQLString ) },
    User_PhoneNumberMobile:  { type: new GraphQLNonNull( GraphQLString ) },
    User_Locale:             { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, context, { rootValue: objectManager } ) => objectManager.getOneById( 'User', objectManager.getViewerUserId( ) )
    },
  },
  mutateAndGetPayload: ( {
    id,
    User_DisplayName,
    User_ProfilePhoto,
    User_Email,
    User_PhoneNumberMobile,
    User_Locale,
  }, context, { rootValue: objectManager } ) => {
    var local_id = fromGlobalId( id ).id;
    return objectManager.update( 'User', {
      id: local_id,
      User_DisplayName,
      User_ProfilePhoto,
      User_PhoneNumberMobile,
      User_Email,
      User_Locale,
    } )
    .then( ( ) => {
      return {local_id};
    } )
    ;
  },
} );
