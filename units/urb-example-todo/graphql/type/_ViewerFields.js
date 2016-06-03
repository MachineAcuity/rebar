/* @flow weak */

import { GraphQLInt, GraphQLString } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";

import ToDosConnection from "./ToDosConnection";


export default {
  ToDos: {
    type: ToDosConnection.connectionType,
    args: {
      status: {
        type: GraphQLString,
        defaultValue: 'any',
      },
      ...connectionArgs,
    },
    resolve: ( obj, { status, ...args }, context, { rootValue: objectManager } ) => {
      return objectManager.getListBy( 'ToDo', 'ToDo_User_id', objectManager.getViewerUserId( ) )
      .then( ( arr ) => connectionFromArray( arr.filter( a_ToDo => status === 'any' || ( a_ToDo.ToDo_Complete === ( status === 'completed' ) ) ), args ) )
    }
  },
  ToDo_TotalCount: {
    type: GraphQLInt,
    resolve: ( obj, { ...args }, context, { rootValue: objectManager } ) => objectManager.getListBy( 'ToDo', 'ToDo_User_id', objectManager.getViewerUserId( ) ).then( ( arr ) => arr.length )
  },
  ToDo_CompletedCount: {
    type: GraphQLInt,
    resolve: ( obj, { ...args }, context, { rootValue: objectManager } ) => objectManager.getListBy( 'ToDo', 'ToDo_User_id', objectManager.getViewerUserId( ) ).then( ( arr ) => arr.filter( a_ToDo => a_ToDo.ToDo_Complete ).length )
  },
}
