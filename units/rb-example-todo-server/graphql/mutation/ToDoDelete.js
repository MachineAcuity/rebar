// @flow weak

import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLID, GraphQLNonNull } from 'graphql'

import ObjectManager from '../../../rb-base-server/ObjectManager'
import ViewerType from '../../../../units/rb-appbase-server/graphql/type/ViewerType'

//

export default mutationWithClientMutationId({
  name: 'ToDoDelete',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },

  outputFields: {
    deletedId: {
      type: GraphQLID,
      resolve: ({ id }) => id,
    },

    Viewer: {
      type: ViewerType,
      resolve: (parent, args, context, { rootValue: ec }) => {
        const objectManager: ObjectManager = ec.om()
        return objectManager.getOneObject_async('User', {
          id: objectManager.getViewerUserId(),
        })
      },
    },
  },

  mutateAndGetPayload: async ({ id }, context, { rootValue: ec }) => {
    const objectManager: ObjectManager = ec.om()
    const local_id = fromGlobalId(id).id

    await objectManager.remove('ToDo', { id: local_id })

    return { id }
  },
})
