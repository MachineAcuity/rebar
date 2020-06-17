// @flow

import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql'
import { connectionArgs, connectionFromArray, fromGlobalId, globalIdField } from 'graphql-relay'

import defaultPersister from '../../../_configuration/rb-base-server/graphql/defaultPersister'
import NodeInterface from '../NodeInterface'
import _ViewerFields from '../../../_configuration/rb-base-server/graphql/_ViewerFields'
import User from '../model/User'

import UserPermissionForObjectsConnection from './UserPermissionForObjectsConnection'
import UserPermissionForObjectType from './UserPermissionForObjectType'
import UserQuotaForObjectsConnection from './UserQuotaForObjectsConnection'
import UserQuotaForObjectType from './UserQuotaForObjectType'

export default new GraphQLObjectType({
  name: 'Viewer',
  interfaces: [ NodeInterface ],
  isTypeOf: (object) => object instanceof User,
  fields: {
    id: globalIdField('Viewer'),
    User_IsAnonymous: {
      type: GraphQLBoolean,
      resolve: (obj) => defaultPersister.uuidEquals(obj.id, defaultPersister.uuidNull()),
    },
    UserToken2: { type: GraphQLString, resolve: (obj) => obj.UserToken2 },
    User_DisplayName: {
      type: GraphQLString,
      resolve: (obj) => obj.User_DisplayName,
    },
    User_PrimaryEmail: {
      type: GraphQLString,
      resolve: (obj) => obj.User_PrimaryEmail,
    },
    User_PrimaryPhone: {
      type: GraphQLString,
      resolve: (obj) => obj.User_PrimaryPhone,
    },

    UserPermissionForObjects: {
      type: UserPermissionForObjectsConnection.connectionType,

      args: {
        ...connectionArgs,
        UserPermissionForObject_ObjectType: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },

      resolve: async (obj, { ...args }, context, { rootValue: objectManager }) => {
        const { UserPermissionForObject_ObjectType } = args
        const arr = await objectManager.getObjectList_async('UserPermissionForObject', {
          UserPermissionForObject_ObjectType,
        })
        return connectionFromArray(arr, args)
      },
    },

    UserPermissionForObject: {
      type: UserPermissionForObjectType,

      args: { ...{ id: { type: GraphQLID } } },

      resolve: async (parent, { id }, context, { rootValue: objectManager }) => {
        const local_id = objectManager.uuidFromString(
          'UserPermissionForObject',
          fromGlobalId(id).id,
        )

        // IDEA [Project E] Materialized view UserPermissionForObject_by_ID does not exist
        return await objectManager.getOneObject_async('UserPermissionForObject', {
          id: local_id,
          _materialized_view: 'UserPermissionForObject_by_ID',
        })
      },
    },

    UserQuotaForObjects: {
      type: UserQuotaForObjectsConnection.connectionType,

      args: { ...connectionArgs },

      resolve: async (obj, { ...args }, context, { rootValue: objectManager }) => {
        const arr = await objectManager.getObjectList_async('UserQuotaForObject', {})
        return connectionFromArray(arr, args)
      },
    },

    UserQuotaForObject: {
      type: UserQuotaForObjectType,

      args: { ...{ id: { type: GraphQLID } } },

      resolve: async (parent, { id }, context, { rootValue: objectManager }) => {
        const local_id = objectManager.uuidFromString('UserQuotaForObject', fromGlobalId(id).id)

        return await objectManager.getOneObject_async('UserQuotaForObject', {
          id: local_id,

          // IDEA [Project E] Materialized view UserQuotaForObject_by_ID does not exist
          _materialized_view: 'UserQuotaForObject_by_ID',
        })
      },
    },

    ..._ViewerFields,
  },
})
