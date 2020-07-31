"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _graphqlRelay = require("graphql-relay");
var _graphql = require("graphql");

var _EnsayosConnection = _interopRequireDefault(require("../type/EnsayosConnection"));
var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));
var _ViewerType = _interopRequireDefault(require("../../../../units/rb-appbase-server/graphql/type/ViewerType"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//
var _default =
(0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'EnsayoAdd',

  inputFields: {
    Ensayo_Title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    Ensayo_Description: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    Ensayo_Content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) } },


  outputFields: {
    EnsayosEdge: {
      type: _EnsayosConnection.default.edgeType,
      resolve: async ({ local_id }, { ...args }, context, { rootValue: ec }) => {
        const objectManager = ec.om();
        const an_Object = await objectManager.getOneObject_async('Ensayo', {
          id: local_id });


        const arr = await objectManager.getObjectList_async('Ensayo', {});

        return {
          cursor: objectManager.cursorForObjectInConnection('Ensayo', arr, an_Object),
          node: an_Object };

      } },


    Viewer: {
      type: _ViewerType.default,
      resolve: (parent, args, context, { rootValue: ec }) => {
        const objectManager = ec.om();
        return objectManager.getOneObject_async('User', {
          id: objectManager.getViewerUserId() });

      } } },



  mutateAndGetPayload: async (
  { Ensayo_Title, Ensayo_Description, Ensayo_Content },
  context,
  { rootValue: ec }) =>
  {
    const objectManager = ec.om();
    const local_id = await objectManager.add('Ensayo', {
      Ensayo_Title,
      Ensayo_Description,
      Ensayo_Content });

    return { local_id };
  } });exports.default = _default;
//# sourceMappingURL=EnsayoAdd.js.map