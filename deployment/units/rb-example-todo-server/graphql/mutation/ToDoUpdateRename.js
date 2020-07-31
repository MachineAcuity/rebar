"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphqlRelay = require("graphql-relay");
var _graphql = require("graphql");

var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));
var _ToDoType = _interopRequireDefault(require("../type/ToDoType"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //  weak

//
var _default =
(0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'ToDoUpdateRename',

  inputFields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    ToDo_Text: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) } },


  outputFields: {
    ToDo: {
      type: _ToDoType.default,
      resolve: ({ local_id }, { ...args }, context, { rootValue: ec }) => {
        const objectManager = ec.om();
        return objectManager.getOneObject_async('ToDo', { id: local_id });
      } } },



  mutateAndGetPayload: async ({ id, ToDo_Text }, context, { rootValue: ec }) => {
    const objectManager = ec.om();
    const local_id = (0, _graphqlRelay.fromGlobalId)(id).id;

    await objectManager.update('ToDo', {
      id: local_id,
      ToDo_Text });


    return { local_id };
  } });exports.default = _default;
//# sourceMappingURL=ToDoUpdateRename.js.map