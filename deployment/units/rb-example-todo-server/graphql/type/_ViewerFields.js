"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphql = require("graphql");
var _graphqlRelay = require("graphql-relay");

var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));
var _ToDosConnection = _interopRequireDefault(require("./ToDosConnection"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //  weak

//
var _default =
{
  ToDos: {
    type: _ToDosConnection.default.connectionType,

    args: {
      status: {
        type: _graphql.GraphQLString,
        defaultValue: 'any' },

      ..._graphqlRelay.connectionArgs },


    resolve: async (obj, { status, ...args }, context, { rootValue: ec }) => {
      const objectManager = ec.om();
      const arr = await objectManager.getObjectList_async('ToDo', {});

      return (0, _graphqlRelay.connectionFromArray)(
      arr.filter(
      a_ToDo => status === 'any' || a_ToDo.ToDo_Complete === (status === 'completed')),

      args);

    } },


  ToDo_TotalCount: {
    type: _graphql.GraphQLInt,

    resolve: async (obj, { ...args }, context, { rootValue: ec }) => {
      const objectManager = ec.om();
      const arr = await objectManager.getObjectList_async('ToDo', {});

      return arr.length;
    } },


  ToDo_CompletedCount: {
    type: _graphql.GraphQLInt,

    resolve: async (obj, { ...args }, context, { rootValue: ec }) => {
      const objectManager = ec.om();
      const arr = await objectManager.getObjectList_async('ToDo', {});

      return arr.filter(a_ToDo => a_ToDo.ToDo_Complete).length;
    } } };exports.default = _default;
//# sourceMappingURL=_ViewerFields.js.map