/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import ToDoType from '../type/ToDoType';

export default mutationWithClientMutationId( {
  name: 'ToDo_updateRename',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
    ToDo_Text: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    ToDo: {
      type: ToDoType,
      resolve: ( {local_id}, { ...args }, context, { rootValue: objectManager } ) => objectManager.getOneById( 'ToDo', local_id )
    }
  },
  mutateAndGetPayload: ( {id, ToDo_Text}, context, { rootValue: objectManager } ) => {
    var local_id = fromGlobalId(id).id;
    return objectManager.update( 'ToDo', {
      id: local_id,
      ToDo_Text
    } )
    .then( ( ) => ( {local_id} ) )
    ;
  },
} );
