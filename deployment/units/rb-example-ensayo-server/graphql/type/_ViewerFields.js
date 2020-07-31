"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphql = require("graphql");
var _graphqlRelay = require("graphql-relay");

var _EnsayosConnection = _interopRequireDefault(require("./EnsayosConnection"));
var _EnsayoType = _interopRequireDefault(require("./EnsayoType"));
var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //  weak

//
var _default =
{
  Ensayos: {
    type: _EnsayosConnection.default.connectionType,

    args: { ..._graphqlRelay.connectionArgs },

    resolve: async (obj, { ...args }, context, { rootValue: ec }) => {
      const objectManager = ec.om();
      const arr = await objectManager.getObjectList_async('Ensayo', {});

      return (0, _graphqlRelay.connectionFromArray)(arr, args);
    } },


  Ensayo: {
    type: _EnsayoType.default,

    args: { ...{ id: { type: _graphql.GraphQLID } } },

    resolve: (parent, { id }, context, { rootValue: ec }) => {
      const objectManager = ec.om();
      return objectManager.getOneObject_async('Ensayo', { id: (0, _graphqlRelay.fromGlobalId)(id).id });
    } } };exports.default = _default;
//# sourceMappingURL=_ViewerFields.js.map