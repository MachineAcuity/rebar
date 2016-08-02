/* @flow weak */

import { fromGlobalId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";

import ViewerType from "./ViewerType";
import NodeInterface from "../NodeInterface";

function resolveNodeField( source, args, context, { rootValue: objectManager } )
{
  // the node field will receive a globally
  // unique id, and here we convert that back
  // to the local type and id
  const { id, type } = fromGlobalId(args.id);

  // map the local type and id into the
  // actual data for the record
  if( type === 'Viewer' )
    return objectManager.getOneById( 'User', id );
  else
    return objectManager.getOneById( type, id );
}

export default new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    node: {
      type: NodeInterface,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: resolveNodeField
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, context, { rootValue: objectManager } ) => objectManager.getOneById( 'User', objectManager.getViewerUserId( ) )
    },
  })
});
