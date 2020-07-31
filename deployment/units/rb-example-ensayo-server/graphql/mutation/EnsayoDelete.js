"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphqlRelay = require("graphql-relay");
var _graphql = require("graphql");

var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));
var _ViewerType = _interopRequireDefault(require("../../../../units/rb-appbase-server/graphql/type/ViewerType"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //  weak

//
var _default =
(0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'EnsayoDelete',

  inputFields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) } },


  outputFields: {
    deletedId: {
      type: _graphql.GraphQLID,
      resolve: ({ id }) => id },


    Viewer: {
      type: _ViewerType.default,
      resolve: (parent, args, context, { rootValue: ec }) => {
        const objectManager = ec.om();
        return objectManager.getOneObject_async('User', {
          id: objectManager.getViewerUserId() });

      } } },



  mutateAndGetPayload: async ({ id }, context, { rootValue: ec }) => {
    const objectManager = ec.om();
    const local_id = (0, _graphqlRelay.fromGlobalId)(id).id;

    await objectManager.remove('Ensayo', { id: local_id });

    return { id };
  } });exports.default = _default;
//# sourceMappingURL=EnsayoDelete.js.map