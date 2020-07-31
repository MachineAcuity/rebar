"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphqlRelay = require("graphql-relay");
var _graphql = require("graphql");

var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));
var _ToDoListUpdateMarkAll = _interopRequireDefault(require("../helper/ToDoListUpdateMarkAll"));
var _ToDoType = _interopRequireDefault(require("../type/ToDoType"));
var _ViewerType = _interopRequireDefault(require("../../../../units/rb-appbase-server/graphql/type/ViewerType"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //  weak

//
var _default =
(0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'ToDoListUpdateMarkAll',

  inputFields: {
    ToDo_Complete: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean) } },


  outputFields: {
    changedToDos: {
      type: new _graphql.GraphQLList(_ToDoType.default),
      resolve: ({ arr_local_ids_Changed_ToDos }, args, context, { rootValue: ec }) => {
        const objectManager = ec.om();
        return arr_local_ids_Changed_ToDos.map((local_id) =>
        objectManager.getOneObject_async('ToDo', { id: local_id }));

      } },


    Viewer: {
      type: _ViewerType.default,
      resolve: (parent, args, context, { rootValue: ec }) => {
        const objectManager = ec.om();
        return objectManager.getOneObject_async('User', {
          id: objectManager.getViewerUserId() });

      } } },



  mutateAndGetPayload: async ({ ToDo_Complete }, context, { rootValue: ec }) => {
    const objectManager = ec.om();
    const arr_local_ids_Changed_ToDos = await (0, _ToDoListUpdateMarkAll.default)(objectManager, ToDo_Complete);

    return { arr_local_ids_Changed_ToDos };
  } });exports.default = _default;
//# sourceMappingURL=ToDoListUpdateMarkAll.js.map