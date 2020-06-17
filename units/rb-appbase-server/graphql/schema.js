// @flow

import { GraphQLSchema } from 'graphql'

import QueryType from './type/QueryType'
import { maskErrors } from './graphQLError'
import MutationType from './type/MutationType'

// export the entire compiled schema which specifies
// how to query and mutate all of our types
const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})

maskErrors(schema)

export default schema
