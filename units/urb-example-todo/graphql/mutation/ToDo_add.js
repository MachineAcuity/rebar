/* @flow weak */

import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql";

import { cursorForObjectInConnectionWithUuidComparison } from '../../../../graphql/mutation_helper';

import ToDosConnection from '../type/ToDosConnection';
import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'ToDo_add',
  inputFields: {
    ToDo_Text: { type: new GraphQLNonNull( GraphQLString ) }
  },
  outputFields: {
    ToDosEdge: {
      type: ToDosConnection.edgeType,
      resolve: ( {local_id}, { ...args }, context, { rootValue: objectManager } ) =>
      {
        let an_Object;
        return objectManager.getOneById( 'ToDo', local_id )
        .then( ( retrieved_Object ) => {
          an_Object = retrieved_Object;
        } )
        .then( ( ) => objectManager.getListBy( 'ToDo', 'ToDo_User_id', objectManager.getViewerUserId( ) ) )
        .then( ( arr ) => ( {
          cursor: cursorForObjectInConnectionWithUuidComparison( arr, an_Object ),
          node: an_Object,
        } ) )
        ;
      }
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, context, { rootValue: objectManager } ) => objectManager.getOneById( 'User', objectManager.getViewerUserId( ) )
    },
  },
  mutateAndGetPayload: ( {ToDo_Text}, context, { rootValue: objectManager } ) =>
    objectManager.add( 'ToDo', {
      ToDo_User_id: objectManager.getViewerUserId( ),
      ToDo_Text,
      ToDo_Complete: false
    } )
    .then( ( local_id ) => ( {local_id} ) )
} );
