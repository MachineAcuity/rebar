/* @flow weak */

import {GraphQLSchema} from "graphql"

// graphql types
import QueryType from "./type/QueryType"
import MutationType from "./type/MutationType"


// export the entire compiled schema which specifies
// how to query and mutate all of our types
export default new GraphQLSchema( {
  query: QueryType,
  mutation: MutationType
} )
