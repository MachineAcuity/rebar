"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphqlRelay = require("graphql-relay");
var _graphql = require("graphql");

var _NodeInterface = _interopRequireDefault(require("../../../../units/rb-appbase-server/graphql/NodeInterface"));
var _UserPermissionForObject = _interopRequireDefault(require("../model/UserPermissionForObject"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

new _graphql.GraphQLObjectType({
  name: 'UserPermissionForObject',
  interfaces: [_NodeInterface.default],
  isTypeOf: object => object instanceof _UserPermissionForObject.default,
  fields: {
    id: (0, _graphqlRelay.globalIdField)('UserPermissionForObject'),
    UserPermissionForObject_ObjectType: {
      type: _graphql.GraphQLString,
      resolve: obj => obj.UserPermissionForObject_ObjectType },

    UserPermissionForObject_object_id: {
      type: _graphql.GraphQLString,
      resolve: obj => obj.UserPermissionForObject_object_id },

    UserPermissionForObject_PermitRead: {
      type: _graphql.GraphQLBoolean,
      resolve: obj => obj.UserPermissionForObject_PermitRead },

    UserPermissionForObject_PermitInsert: {
      type: _graphql.GraphQLBoolean,
      resolve: obj => obj.UserPermissionForObject_PermitInsert },

    UserPermissionForObject_PermitUpdate: {
      type: _graphql.GraphQLBoolean,
      resolve: obj => obj.UserPermissionForObject_PermitUpdate },

    UserPermissionForObject_PermitDelete: {
      type: _graphql.GraphQLBoolean,
      resolve: obj => obj.UserPermissionForObject_PermitDelete } } });exports.default = _default;
//# sourceMappingURL=UserPermissionForObjectType.js.map