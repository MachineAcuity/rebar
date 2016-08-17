/* @flow weak */

import {GraphQLID, GraphQLNonNull, GraphQLInterfaceType} from "graphql"


export default new GraphQLInterfaceType( {
  name: "Node",
  description: "An object with a globally unique id.",
  fields: ( ) => ( {
    id: {
       type: new GraphQLNonNull(GraphQLID),
       description: "The globally unique id of the object.",
    }
  } )
} )
