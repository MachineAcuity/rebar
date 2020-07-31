// @flow

import { mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLString, GraphQLNonNull } from 'graphql'

import EnsayosConnection from '../type/EnsayosConnection'
import ObjectManager from '../../../rb-base-server/ObjectManager'
import ViewerType from '../../../../units/rb-appbase-server/graphql/type/ViewerType'

//

export default mutationWithClientMutationId({
  name: 'EnsayoAdd',

  inputFields: {
    Ensayo_Title: { type: new GraphQLNonNull(GraphQLString) },
    Ensayo_Description: { type: new GraphQLNonNull(GraphQLString) },
    Ensayo_Content: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    EnsayosEdge: {
      type: EnsayosConnection.edgeType,
      resolve: async ({ local_id }, { ...args }, context, { rootValue: ec }) => {
        const objectManager: ObjectManager = ec.om()
        const an_Object = await objectManager.getOneObject_async('Ensayo', {
          id: local_id,
        })

        const arr = await objectManager.getObjectList_async('Ensayo', {})

        return {
          cursor: objectManager.cursorForObjectInConnection('Ensayo', arr, an_Object),
          node: an_Object,
        }
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

  mutateAndGetPayload: async (
    { Ensayo_Title, Ensayo_Description, Ensayo_Content },
    context,
    { rootValue: ec },
  ) => {
    const objectManager: ObjectManager = ec.om()
    const local_id = await objectManager.add('Ensayo', {
      Ensayo_Title,
      Ensayo_Description,
      Ensayo_Content,
    })
    return { local_id }
  },
})
