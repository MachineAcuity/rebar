// @flow weak

import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from 'graphql'

import ObjectManager from '../../../rb-base-server/ObjectManager'
import ToDoType from '../type/ToDoType'
import ViewerType from '../../../../units/rb-appbase-server/graphql/type/ViewerType'

//

export default mutationWithClientMutationId({
  name: 'ToDoUpdateStatus',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    ToDo_Complete: { type: new GraphQLNonNull(GraphQLBoolean) },
  },

  outputFields: {
    ToDo: {
      type: ToDoType,
      resolve: ({ local_id }, { ...args }, context, { rootValue: ec }) => {
        const objectManager: ObjectManager = ec.om()
        return objectManager.getOneObject_async('ToDo', { id: local_id })
      },
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

  mutateAndGetPayload: async ({ id, ToDo_Complete }, context, { rootValue: ec }) => {
    const objectManager: ObjectManager = ec.om()
    const local_id = fromGlobalId(id).id

    await objectManager.update('ToDo', {
      id: local_id,
      ToDo_Complete,
    })

    return { local_id }
  },
})
