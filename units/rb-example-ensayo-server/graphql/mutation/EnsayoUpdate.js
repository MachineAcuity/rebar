// @flow weak

import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql'

import EnsayoType from '../type/EnsayoType'
import ObjectManager from '../../../rb-base-server/ObjectManager'

//

export default mutationWithClientMutationId({
  name: 'EnsayoUpdate',

  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    Ensayo_Title: { type: new GraphQLNonNull(GraphQLString) },
    Ensayo_Description: { type: new GraphQLNonNull(GraphQLString) },
    Ensayo_Content: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    Ensayo: {
      type: EnsayoType,
      resolve: ({ local_id }, { ...args }, context, { rootValue: ec }) => {
        const objectManager: ObjectManager = ec.om()
        return objectManager.getOneObject_async('Ensayo', { id: local_id })
      },
    },
  },

  mutateAndGetPayload: async (
    { id, Ensayo_Title, Ensayo_Description, Ensayo_Content },
    context,
    { rootValue: ec },
  ) => {
    const objectManager: ObjectManager = ec.om()
    const local_id = fromGlobalId(id).id

    await objectManager.update('Ensayo', {
      id: local_id,
      Ensayo_Title,
      Ensayo_Description,
      Ensayo_Content,
    })

    return { local_id }
  },
})
