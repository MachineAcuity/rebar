"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphqlRelay = require("graphql-relay");
var _graphql = require("graphql");

var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));
var _ToDosConnection = _interopRequireDefault(require("../type/ToDosConnection"));
var _ViewerType = _interopRequireDefault(require("../../../../units/rb-appbase-server/graphql/type/ViewerType"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //  weak

//
var _default =
(0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'ToDoAdd',

  inputFields: {
    ToDo_Text: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) } },


  outputFields: {
    ToDosEdge: {
      type: _ToDosConnection.default.edgeType,
      resolve: async ({ local_id }, { ...args }, context, { rootValue: ec }) => {
        const objectManager = ec.om();
        const an_Object = await objectManager.getOneObject_async('ToDo', {
          id: local_id });


        const arr = await objectManager.getObjectList_async('ToDo', {});

        return {
          cursor: objectManager.cursorForObjectInConnection('ToDo', arr, an_Object),
          node: an_Object };

      } },


    Viewer: {
      type: _ViewerType.default,
      resolve: (parent, args, context, { rootValue: ec }) => {
        const objectManager = ec.om();
        return objectManager.getOneObject_async('User', {
          id: objectManager.getViewerUserId() });

      } } },



  mutateAndGetPayload: async ({ ToDo_Text }, context, { rootValue: ec }) => {
    const objectManager = ec.om();
    const local_id = await objectManager.add('ToDo', {
      ToDo_Text,
      ToDo_Complete: false });

    return { local_id };
  } });exports.default = _default;
//# sourceMappingURL=ToDoAdd.js.map