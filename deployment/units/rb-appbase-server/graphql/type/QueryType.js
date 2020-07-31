"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphqlRelay = require("graphql-relay");
var _graphql = require("graphql");

var _NodeInterface = _interopRequireDefault(require("../NodeInterface"));
var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));

var _ViewerType = _interopRequireDefault(require("./ViewerType"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

function resolveNodeField(source, args, context, { rootValue: ec }) {
  const objectManager = ec.om();
  // the node field will receive a globally
  // unique id, and here we convert that back
  // to the local type and id
  const { id, type } = (0, _graphqlRelay.fromGlobalId)(args.id);

  // map the local type and id into the
  // actual data for the record
  if (type === 'Viewer') return objectManager.getOneObject_async('User', { id: id });else
  return objectManager.getOneObject_async(type, { id: id });
}

//
var _default =
new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: {
      type: _NodeInterface.default,
      args: {
        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) } },

      resolve: resolveNodeField },

    Viewer: {
      type: _ViewerType.default,
      resolve: (parent, args, context, { rootValue: ec }) => {
        const objectManager = ec.om();
        return objectManager.getOneObject_async('User', { id: objectManager.getViewerUserId() });
      } } }) });exports.default = _default;
//# sourceMappingURL=QueryType.js.map