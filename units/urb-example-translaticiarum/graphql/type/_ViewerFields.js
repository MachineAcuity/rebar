/* @flow weak */

import { connectionArgs, connectionFromArray } from "graphql-relay";

import TranslaticiarumsConnection from "./TranslaticiarumsConnection";


export default {
  Translaticiarums: {
    type: TranslaticiarumsConnection.connectionType,
    args: { ...connectionArgs },
    resolve: ( obj, { ...args }, context, { rootValue: objectManager } ) => objectManager.getListBy( 'Translaticiarum', 'Translaticiarum_User_id', objectManager.getViewerUserId( ) ).then( ( arr ) => connectionFromArray( arr, args ) )
  },
}
