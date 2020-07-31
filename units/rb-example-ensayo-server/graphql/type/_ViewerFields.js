// @flow weak

import { GraphQLID } from 'graphql'
import { fromGlobalId, connectionArgs, connectionFromArray } from 'graphql-relay'

import EnsayosConnection from './EnsayosConnection'
import EnsayoType from './EnsayoType'
import ObjectManager from '../../../rb-base-server/ObjectManager'

//

export default {
  Ensayos: {
    type: EnsayosConnection.connectionType,

    args: { ...connectionArgs },

    resolve: async (obj, { ...args }, context, { rootValue: ec }) => {
      const objectManager: ObjectManager = ec.om()
      const arr = await objectManager.getObjectList_async('Ensayo', {})

      return connectionFromArray(arr, args)
    },
  },

  Ensayo: {
    type: EnsayoType,

    args: { ...{ id: { type: GraphQLID } } },

    resolve: (parent, { id }, context, { rootValue: ec }) => {
      const objectManager: ObjectManager = ec.om()
      return objectManager.getOneObject_async('Ensayo', { id: fromGlobalId(id).id })
    },
  },
}
