"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

/** GraphQL class for representing a User record. */
class User {


  /** Artifact to which the user belongs. */


  /** Unique, randomly generated user token used for authentication. */


  /** Name of the user as displayed in UI. */

  /** Description of the user - short bio for an actual user, description
                                               * of group, etc.. */






  /** Indicates if the user is a group. */


  /** Indicates that the group is a team group (i.e.
                                            * contains all users and groups for the team) */







  constructor(fields)


















  {
    this.id = fields.id;
    this.User_artifact_id = fields.User_artifact_id;
    this.UserToken2 = fields.UserToken2;

    this.User_DisplayName = fields.User_DisplayName;
    this.User_Description = fields.User_Description;
    this.User_PrimaryEmail = fields.User_PrimaryEmail;
    this.User_PrimaryPhone = fields.User_PrimaryPhone;
    this.User_PrimaryLatitude = fields.User_PrimaryLatitude;
    this.User_PrimaryLongitude = fields.User_PrimaryLongitude;

    this.User_IsGroup = fields.User_IsGroup;
    this.User_IsTeamGroup = fields.User_IsTeamGroup;

    this.User_created_by = fields.User_created_by;
    this.User_created_on = fields.User_created_on;
    this.User_modified_on = fields.User_modified_on;
    this.User_modified_by = fields.User_modified_by;
  }}exports.default = User;
//# sourceMappingURL=User.js.map