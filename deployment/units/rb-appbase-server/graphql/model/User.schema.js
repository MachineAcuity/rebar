"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _defaultPersister = _interopRequireDefault(require("../../../_configuration/rb-base-server/graphql/defaultPersister"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_defaultPersister.default.addTableSchema('User', {
  fields: {
    id: 'uuid',
    User_artifact_id: 'uuid',
    UserToken2: 'text',

    User_DisplayName: 'text',
    User_Description: 'text',
    User_PrimaryEmail: 'text',
    User_PrimaryPhone: 'text',
    User_PrimaryLatitude: 'double',
    User_PrimaryLongitude: 'double',

    User_IsGroup: 'boolean',
    User_IsTeamGroup: 'boolean',

    User_created_by: 'uuid',
    User_created_on: 'timestamp',
    User_modified_by: 'uuid',
    User_modified_on: 'timestamp' },

  key: ['id'] });var _default =


true;exports.default = _default;
//# sourceMappingURL=User.schema.js.map