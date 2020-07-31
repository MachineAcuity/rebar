"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphqlRelay = require("graphql-relay");
var _graphql = require("graphql");

var _EnsayoType = _interopRequireDefault(require("../type/EnsayoType"));
var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //  weak

//
var _default =
(0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'EnsayoUpdate',

  inputFields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    Ensayo_Title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    Ensayo_Description: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    Ensayo_Content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) } },


  outputFields: {
    Ensayo: {
      type: _EnsayoType.default,
      resolve: ({ local_id }, { ...args }, context, { rootValue: ec }) => {
        const objectManager = ec.om();
        return objectManager.getOneObject_async('Ensayo', { id: local_id });
      } } },



  mutateAndGetPayload: async (
  { id, Ensayo_Title, Ensayo_Description, Ensayo_Content },
  context,
  { rootValue: ec }) =>
  {
    const objectManager = ec.om();
    const local_id = (0, _graphqlRelay.fromGlobalId)(id).id;

    await objectManager.update('Ensayo', {
      id: local_id,
      Ensayo_Title,
      Ensayo_Description,
      Ensayo_Content });


    return { local_id };
  } });exports.default = _default;
//# sourceMappingURL=EnsayoUpdate.js.map