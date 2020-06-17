// @flow

import ObjectManager from '../../../../units/rb-base-server/ObjectManager'

// Class used by GraphQL Server
export default class UserPermissionForObject {
  id: string
  UserPermissionForObject_artifact_id: string
  UserPermissionForObject_user_id: string

  UserPermissionForObject_ObjectType: string
  UserPermissionForObject_object_id: string

  UserPermissionForObject_PermitRead: boolean
  UserPermissionForObject_PermitInsert: boolean
  UserPermissionForObject_PermitUpdate: boolean
  UserPermissionForObject_PermitDelete: boolean

  UserPermissionForObject_created_by: string
  UserPermissionForObject_created_on: Date
  UserPermissionForObject_modified_by: string
  UserPermissionForObject_modified_on: Date

  constructor(fields: {
    id: string,
    UserPermissionForObject_artifact_id: string,
    UserPermissionForObject_user_id: string,

    UserPermissionForObject_ObjectType: string,
    UserPermissionForObject_object_id: string,

    UserPermissionForObject_PermitRead: boolean,
    UserPermissionForObject_PermitInsert: boolean,
    UserPermissionForObject_PermitUpdate: boolean,
    UserPermissionForObject_PermitDelete: boolean,

    UserPermissionForObject_created_by: string,
    UserPermissionForObject_created_on: Date,
    UserPermissionForObject_modified_by: string,
    UserPermissionForObject_modified_on: Date,
  }) {
    this.id = fields.id
    this.UserPermissionForObject_artifact_id = fields.UserPermissionForObject_artifact_id
    this.UserPermissionForObject_user_id = fields.UserPermissionForObject_user_id

    this.UserPermissionForObject_ObjectType = fields.UserPermissionForObject_ObjectType
    this.UserPermissionForObject_object_id = fields.UserPermissionForObject_object_id

    this.UserPermissionForObject_PermitRead = fields.UserPermissionForObject_PermitRead
    this.UserPermissionForObject_PermitInsert = fields.UserPermissionForObject_PermitInsert
    this.UserPermissionForObject_PermitUpdate = fields.UserPermissionForObject_PermitUpdate
    this.UserPermissionForObject_PermitDelete = fields.UserPermissionForObject_PermitDelete

    this.UserPermissionForObject_created_by = fields.UserPermissionForObject_created_by
    this.UserPermissionForObject_created_on = fields.UserPermissionForObject_created_on
    this.UserPermissionForObject_modified_on = fields.UserPermissionForObject_modified_on
    this.UserPermissionForObject_modified_by = fields.UserPermissionForObject_modified_by
  }
}

ObjectManager.registerEntity('UserPermissionForObject', UserPermissionForObject, {})
