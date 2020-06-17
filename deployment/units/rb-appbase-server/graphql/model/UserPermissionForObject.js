"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _ObjectManager = _interopRequireDefault(require("../../../../units/rb-base-server/ObjectManager"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// Class used by GraphQL Server
class UserPermissionForObject {

















  constructor(fields)
















  {
    this.id = fields.id;
    this.UserPermissionForObject_artifact_id = fields.UserPermissionForObject_artifact_id;
    this.UserPermissionForObject_user_id = fields.UserPermissionForObject_user_id;

    this.UserPermissionForObject_ObjectType = fields.UserPermissionForObject_ObjectType;
    this.UserPermissionForObject_object_id = fields.UserPermissionForObject_object_id;

    this.UserPermissionForObject_PermitRead = fields.UserPermissionForObject_PermitRead;
    this.UserPermissionForObject_PermitInsert = fields.UserPermissionForObject_PermitInsert;
    this.UserPermissionForObject_PermitUpdate = fields.UserPermissionForObject_PermitUpdate;
    this.UserPermissionForObject_PermitDelete = fields.UserPermissionForObject_PermitDelete;

    this.UserPermissionForObject_created_by = fields.UserPermissionForObject_created_by;
    this.UserPermissionForObject_created_on = fields.UserPermissionForObject_created_on;
    this.UserPermissionForObject_modified_on = fields.UserPermissionForObject_modified_on;
    this.UserPermissionForObject_modified_by = fields.UserPermissionForObject_modified_by;
  }}exports.default = UserPermissionForObject;


_ObjectManager.default.registerEntity('UserPermissionForObject', UserPermissionForObject, {});
//# sourceMappingURL=UserPermissionForObject.js.map