"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphql = require("graphql");






var _graphqlRelay = require("graphql-relay");

var _defaultPersister = _interopRequireDefault(require("../../../_configuration/rb-base-server/graphql/defaultPersister"));
var _NodeInterface = _interopRequireDefault(require("../NodeInterface"));
var _ViewerFields2 = _interopRequireDefault(require("../../../_configuration/rb-base-server/graphql/_ViewerFields"));
var _User = _interopRequireDefault(require("../model/User"));

var _UserPermissionForObjectsConnection = _interopRequireDefault(require("./UserPermissionForObjectsConnection"));
var _UserPermissionForObjectType = _interopRequireDefault(require("./UserPermissionForObjectType"));
var _UserQuotaForObjectsConnection = _interopRequireDefault(require("./UserQuotaForObjectsConnection"));
var _UserQuotaForObjectType = _interopRequireDefault(require("./UserQuotaForObjectType"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

new _graphql.GraphQLObjectType({
  name: 'Viewer',
  interfaces: [_NodeInterface.default],
  isTypeOf: object => object instanceof _User.default,
  fields: {
    id: (0, _graphqlRelay.globalIdField)('Viewer'),
    User_IsAnonymous: {
      type: _graphql.GraphQLBoolean,
      resolve: obj => _defaultPersister.default.uuidEquals(obj.id, _defaultPersister.default.uuidNull()) },

    UserToken2: { type: _graphql.GraphQLString, resolve: obj => obj.UserToken2 },
    User_DisplayName: {
      type: _graphql.GraphQLString,
      resolve: obj => obj.User_DisplayName },

    User_PrimaryEmail: {
      type: _graphql.GraphQLString,
      resolve: obj => obj.User_PrimaryEmail },

    User_PrimaryPhone: {
      type: _graphql.GraphQLString,
      resolve: obj => obj.User_PrimaryPhone },


    UserPermissionForObjects: {
      type: _UserPermissionForObjectsConnection.default.connectionType,

      args: {
        ..._graphqlRelay.connectionArgs,
        UserPermissionForObject_ObjectType: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) } },



      resolve: async (obj, { ...args }, context, { rootValue: objectManager }) => {
        const { UserPermissionForObject_ObjectType } = args;
        const arr = await objectManager.getObjectList_async('UserPermissionForObject', {
          UserPermissionForObject_ObjectType });

        return (0, _graphqlRelay.connectionFromArray)(arr, args);
      } },


    UserPermissionForObject: {
      type: _UserPermissionForObjectType.default,

      args: { ...{ id: { type: _graphql.GraphQLID } } },

      resolve: async (parent, { id }, context, { rootValue: objectManager }) => {
        const local_id = objectManager.uuidFromString(
        'UserPermissionForObject',
        (0, _graphqlRelay.fromGlobalId)(id).id);


        // IDEA [Project E] Materialized view UserPermissionForObject_by_ID does not exist
        return await objectManager.getOneObject_async('UserPermissionForObject', {
          id: local_id,
          _materialized_view: 'UserPermissionForObject_by_ID' });

      } },


    UserQuotaForObjects: {
      type: _UserQuotaForObjectsConnection.default.connectionType,

      args: { ..._graphqlRelay.connectionArgs },

      resolve: async (obj, { ...args }, context, { rootValue: objectManager }) => {
        const arr = await objectManager.getObjectList_async('UserQuotaForObject', {});
        return (0, _graphqlRelay.connectionFromArray)(arr, args);
      } },


    UserQuotaForObject: {
      type: _UserQuotaForObjectType.default,

      args: { ...{ id: { type: _graphql.GraphQLID } } },

      resolve: async (parent, { id }, context, { rootValue: objectManager }) => {
        const local_id = objectManager.uuidFromString('UserQuotaForObject', (0, _graphqlRelay.fromGlobalId)(id).id);

        return await objectManager.getOneObject_async('UserQuotaForObject', {
          id: local_id,

          // IDEA [Project E] Materialized view UserQuotaForObject_by_ID does not exist
          _materialized_view: 'UserQuotaForObject_by_ID' });

      } },


    ..._ViewerFields2.default } });exports.default = _default;
//# sourceMappingURL=ViewerType.js.map