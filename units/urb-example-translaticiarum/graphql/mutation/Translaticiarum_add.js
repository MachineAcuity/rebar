/* @flow weak */

import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLInt, GraphQLNonNull } from "graphql";

import GraphQLDateTime from "../../../../graphql/type/GraphQLDateTime";

import { cursorForObjectInConnectionWithUuidComparison } from '../../../../graphql/mutation_helper';

import TranslaticiarumsConnection from '../type/TranslaticiarumsConnection';
import ViewerType from '../../../../graphql/type/ViewerType';

export default mutationWithClientMutationId( {
  name: 'Translaticiarum_add',
  inputFields: {
    Translaticiarum_Type: { type: new GraphQLNonNull( GraphQLInt ) },
    Translaticiarum_Date: { type: new GraphQLNonNull( GraphQLDateTime ) },
    Translaticiarum_Time: { type: new GraphQLNonNull( GraphQLDateTime ) },
  },
  outputFields: {
    TranslaticiarumsEdge: {
      type: TranslaticiarumsConnection.edgeType,
      resolve: ( {local_id}, { ...args }, context, { rootValue: objectManager } ) =>
      {
        let an_Object;
        return objectManager.getOneById( 'Translaticiarum', local_id )
        .then( ( retrieved_Object ) => {
          an_Object = retrieved_Object;
        } )
        .then( ( ) => objectManager.getListBy( 'Translaticiarum', 'Translaticiarum_User_id', objectManager.getViewerUserId( ) ) )
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
  mutateAndGetPayload: ( { Translaticiarum_Type, Translaticiarum_Date, Translaticiarum_Time }, context, { rootValue: objectManager } ) =>
    objectManager.add( 'Translaticiarum', {
      Translaticiarum_User_id: objectManager.getViewerUserId( ),
      Translaticiarum_Type,
      Translaticiarum_Date,
      Translaticiarum_Time,
    } )
    .then( ( local_id ) => ( {local_id} ) )
} );
