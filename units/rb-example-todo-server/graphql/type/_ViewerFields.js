// @flow weak

import { GraphQLInt, GraphQLString } from 'graphql'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

import ObjectManager from '../../../rb-base-server/ObjectManager'
import ToDosConnection from './ToDosConnection'

//

export default {
  ToDos: {
    type: ToDosConnection.connectionType,

    args: {
      status: {
        type: GraphQLString,
        defaultValue: 'any',
      },
      ...connectionArgs,
    },

    resolve: async (obj, { status, ...args }, context, { rootValue: ec }) => {
      const objectManager: ObjectManager = ec.om()
      const arr = await objectManager.getObjectList_async('ToDo', {})

      return connectionFromArray(
        arr.filter(
          (a_ToDo) => status === 'any' || a_ToDo.ToDo_Complete === (status === 'completed'),
        ),
        args,
      )
    },
  },

  ToDo_TotalCount: {
    type: GraphQLInt,

    resolve: async (obj, { ...args }, context, { rootValue: ec }) => {
      const objectManager: ObjectManager = ec.om()
      const arr = await objectManager.getObjectList_async('ToDo', {})

      return arr.length
    },
  },

  ToDo_CompletedCount: {
    type: GraphQLInt,

    resolve: async (obj, { ...args }, context, { rootValue: ec }) => {
      const objectManager: ObjectManager = ec.om()
      const arr = await objectManager.getObjectList_async('ToDo', {})

      return arr.filter((a_ToDo) => a_ToDo.ToDo_Complete).length
    },
  },
}
