// @flow

import defaultPersister from '../../../_configuration/rb-base-server/graphql/defaultPersister'

defaultPersister.addTableSchema('UserPermissionForObject', {
  fields: {
    id: 'uuid',
    UserPermissionForObject_artifact_id: 'uuid',
    UserPermissionForObject_user_id: 'uuid',

    UserPermissionForObject_ObjectType: 'text',
    UserPermissionForObject_object_id: 'uuid',

    UserPermissionForObject_PermitRead: 'boolean',
    UserPermissionForObject_PermitInsert: 'boolean',
    UserPermissionForObject_PermitUpdate: 'boolean',
    UserPermissionForObject_PermitDelete: 'boolean',

    UserPermissionForObject_created_by: 'uuid',
    UserPermissionForObject_created_on: 'timestamp',
    UserPermissionForObject_modified_by: 'uuid',
    UserPermissionForObject_modified_on: 'timestamp',
  },

  key: [
    [
      'UserPermissionForObject_artifact_id',
      'UserPermissionForObject_user_id',
      'UserPermissionForObject_ObjectType',
    ],
    'id',
  ],

  materialized_views: {
    UserPermissionForObject_by_Artifact_id: {
      select: [ '*' ],
      key: [
        [ 'UserPermissionForObject_artifact_id', 'UserPermissionForObject_ObjectType' ],
        'UserPermissionForObject_user_id',
        'id',
      ],
    },
  },
})

export default true
