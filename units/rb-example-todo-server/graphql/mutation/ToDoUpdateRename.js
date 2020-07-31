// @flow weak

import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql'

import ObjectManager from '../../../rb-base-server/ObjectManager'
import ToDoType from '../type/ToDoType'

//

export default mutationWithClientMutationId({
  name: 'ToDoUpdateRename',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    ToDo_Text: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    ToDo: {
      type: ToDoType,
      resolve: ({ local_id }, { ...args }, context, { rootValue: ec }) => {
        const objectManager: ObjectManager = ec.om()
        return objectManager.getOneObject_async('ToDo', { id: local_id })
      },
    },
  },

  mutateAndGetPayload: async ({ id, ToDo_Text }, context, { rootValue: ec }) => {
    const objectManager: ObjectManager = ec.om()
    const local_id = fromGlobalId(id).id

    await objectManager.update('ToDo', {
      id: local_id,
      ToDo_Text,
    })

    return { local_id }
  },
})
