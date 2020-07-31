// @flow

import { fromGlobalId } from 'graphql-relay'
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql'

import NodeInterface from '../NodeInterface'
import ObjectManager from '../../../rb-base-server/ObjectManager'

import ViewerType from './ViewerType'

//

function resolveNodeField(source, args, context, { rootValue: ec }) {
  const objectManager: ObjectManager = ec.om()
  // the node field will receive a globally
  // unique id, and here we convert that back
  // to the local type and id
  const { id, type } = fromGlobalId(args.id)

  // map the local type and id into the
  // actual data for the record
  if (type === 'Viewer') return objectManager.getOneObject_async('User', { id: id })
  else return objectManager.getOneObject_async(type, { id: id })
}

//

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: {
      type: NodeInterface,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: resolveNodeField,
    },
    Viewer: {
      type: ViewerType,
      resolve: (parent, args, context, { rootValue: ec }) => {
        const objectManager: ObjectManager = ec.om()
        return objectManager.getOneObject_async('User', { id: objectManager.getViewerUserId() })
      },
    },
  }),
})
