// @flow

/** GraphQL class for representing a User record. */
export default class User {
  id: string

  /** Artifact to which the user belongs. */
  User_artifact_id: string

  /** Unique, randomly generated user token used for authentication. */
  UserToken2: string

  /** Name of the user as displayed in UI. */
  User_DisplayName: string
  /** Description of the user - short bio for an actual user, description
   * of group, etc.. */
  User_Description: string
  User_PrimaryEmail: string
  User_PrimaryPhone: string
  User_PrimaryLatitude: number
  User_PrimaryLongitude: number

  /** Indicates if the user is a group. */
  User_IsGroup: boolean

  /** Indicates that the group is a team group (i.e.
   * contains all users and groups for the team) */
  User_IsTeamGroup: boolean

  User_created_by: string
  User_created_on: Date
  User_modified_by: string
  User_modified_on: Date

  constructor(fields: {
    id: string,
    User_artifact_id: string,
    UserToken2: string,

    User_DisplayName: string,
    User_Description: string,
    User_PrimaryEmail: string,
    User_PrimaryPhone: string,
    User_PrimaryLatitude: number,
    User_PrimaryLongitude: number,

    User_IsGroup: boolean,
    User_IsTeamGroup: boolean,

    User_created_by: string,
    User_created_on: Date,
    User_modified_by: string,
    User_modified_on: Date,
  }) {
    this.id = fields.id
    this.User_artifact_id = fields.User_artifact_id
    this.UserToken2 = fields.UserToken2

    this.User_DisplayName = fields.User_DisplayName
    this.User_Description = fields.User_Description
    this.User_PrimaryEmail = fields.User_PrimaryEmail
    this.User_PrimaryPhone = fields.User_PrimaryPhone
    this.User_PrimaryLatitude = fields.User_PrimaryLatitude
    this.User_PrimaryLongitude = fields.User_PrimaryLongitude

    this.User_IsGroup = fields.User_IsGroup
    this.User_IsTeamGroup = fields.User_IsTeamGroup

    this.User_created_by = fields.User_created_by
    this.User_created_on = fields.User_created_on
    this.User_modified_on = fields.User_modified_on
    this.User_modified_by = fields.User_modified_by
  }
}
