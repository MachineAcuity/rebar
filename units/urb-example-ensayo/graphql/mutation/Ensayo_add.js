/* @flow weak */

import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql";

import { cursorForObjectInConnectionWithUuidComparison } from '../../../../graphql/mutation_helper';

import EnsayosConnection from '../type/EnsayosConnection';
import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Ensayo_add',
  inputFields: {
    Ensayo_Content:     { type: new GraphQLNonNull( GraphQLString ) },
    Ensayo_Title:       { type: new GraphQLNonNull( GraphQLString ) },
    Ensayo_Description: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    EnsayosEdge: {
      type: EnsayosConnection.edgeType,
      resolve: ( {local_id}, { ...args }, context, { rootValue: objectManager } ) =>
      {
        let an_Object;
        return objectManager.getOneById( 'Ensayo', local_id )
        .then( ( retrieved_Object ) => {
          an_Object = retrieved_Object;
        } )
        .then( ( ) => objectManager.getListBy( 'Ensayo', 'Ensayo_User_id', objectManager.getViewerUserId( ) ) )
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
  mutateAndGetPayload: ( { Ensayo_Content, Ensayo_Title, Ensayo_Description }, context, { rootValue: objectManager } ) =>
    objectManager.add( 'Ensayo', {
      Ensayo_User_id: objectManager.getViewerUserId( ),
      Ensayo_Content,
      Ensayo_Title,
      Ensayo_Description,
    } )
    .then( ( local_id ) => ( {local_id} ) )
} );
