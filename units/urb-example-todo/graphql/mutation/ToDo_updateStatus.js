/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";

import ToDoType from '../type/ToDoType';
import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_updateStatus',
  inputFields: {
    ToDo_Complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    ToDo: {
      type: ToDoType,
      resolve: ( {local_id}, { ...args }, context, { rootValue: objectManager } ) => objectManager.getOneById( 'ToDo', local_id ),
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, context, { rootValue: objectManager } ) => objectManager.getOneById( 'User', objectManager.getViewerUserId( ) )
    },
  },
  mutateAndGetPayload: ( { id, ToDo_Complete }, context, { rootValue: objectManager } ) => {
    var local_id = fromGlobalId(id).id;
    return objectManager.update( 'ToDo', {
      id: local_id,
      ToDo_Complete
    } )
    .then( ( ) => ( {local_id} ) )
    ;
  },
} );
