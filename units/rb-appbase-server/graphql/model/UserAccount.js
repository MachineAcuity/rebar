// @flow

import ObjectManager from '../../../../units/rb-base-server/ObjectManager'

// Class used by GraphQL Server
export default class UserAccount {
  id: string
  UserAccount_artifact_id: string
  UserAccount_User_id: string
  UserAccount_Identifier: string
  UserAccount_Secret: string
  UserAccount_Type: 'sec' | 'pasp' // Secret / Passport
  UserAccount_created_by: string
  UserAccount_created_on: Date
  UserAccount_modified_by: string
  UserAccount_modified_on: Date

  constructor(fields: {
    id: string,
    UserAccount_artifact_id: string,
    UserAccount_User_id: string,
    UserAccount_Identifier: string,
    UserAccount_Secret: string,
    UserAccount_Type: 'sec' | 'pasp',
    UserAccount_created_by: string,
    UserAccount_created_on: Date,
    UserAccount_modified_by: string,
    UserAccount_modified_on: Date,
  }) {
    this.id = fields.id
    this.UserAccount_artifact_id = fields.UserAccount_artifact_id
    this.UserAccount_User_id = fields.UserAccount_User_id
    this.UserAccount_Identifier = fields.UserAccount_Identifier
    this.UserAccount_Secret = fields.UserAccount_Secret
    this.UserAccount_Type = fields.UserAccount_Type
    this.UserAccount_created_by = fields.UserAccount_created_by
    this.UserAccount_created_on = fields.UserAccount_created_on
    this.UserAccount_modified_on = fields.UserAccount_modified_on
    this.UserAccount_modified_by = fields.UserAccount_modified_by
  }
}

ObjectManager.registerEntity('UserAccount', UserAccount, {})
