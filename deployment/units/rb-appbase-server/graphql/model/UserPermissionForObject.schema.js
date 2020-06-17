"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _defaultPersister = _interopRequireDefault(require("../../../_configuration/rb-base-server/graphql/defaultPersister"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_defaultPersister.default.addTableSchema('UserPermissionForObject', {
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
    UserPermissionForObject_modified_on: 'timestamp' },


  key: [
  [
  'UserPermissionForObject_artifact_id',
  'UserPermissionForObject_user_id',
  'UserPermissionForObject_ObjectType'],

  'id'],


  materialized_views: {
    UserPermissionForObject_by_Artifact_id: {
      select: ['*'],
      key: [
      ['UserPermissionForObject_artifact_id', 'UserPermissionForObject_ObjectType'],
      'UserPermissionForObject_user_id',
      'id'] } } });var _default =





true;exports.default = _default;
//# sourceMappingURL=UserPermissionForObject.schema.js.map