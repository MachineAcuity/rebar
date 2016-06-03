/* @flow weak */

import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLBoolean, GraphQLList, GraphQLNonNull } from "graphql";

import ToDo_list_updateMarkAll from '../helper/ToDo_list_updateMarkAll';
import ToDoType from '../type/ToDoType';
import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_list_updateMarkAll',
  inputFields: {
    ToDo_Complete: { type: new GraphQLNonNull( GraphQLBoolean ) },
  },
  outputFields: {
    changedToDos: {
      type: new GraphQLList(ToDoType),
      resolve: ( {arr_local_ids_Changed_ToDos}, args, context, { rootValue: objectManager } ) => arr_local_ids_Changed_ToDos.map( local_id => objectManager.getOneById( 'ToDo', local_id ) ),
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, context, { rootValue: objectManager } ) => objectManager.getOneById( 'User', objectManager.getViewerUserId( ) )
    },
  },
  mutateAndGetPayload: ( {ToDo_Complete}, context, { rootValue: objectManager } ) =>
  {
    return ToDo_list_updateMarkAll( objectManager, ToDo_Complete )
    .then( ( arr_local_ids_Changed_ToDos ) => ( {arr_local_ids_Changed_ToDos} ) )
    ;
  }
} );
