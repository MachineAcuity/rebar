"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _reactRelay = require("react-relay");
var _relayRuntime = require("relay-runtime");var _EnsayoAddMutation;

const mutation = _EnsayoAddMutation !== void 0 ? _EnsayoAddMutation : _EnsayoAddMutation = require("./__generated__/EnsayoAddMutation.graphql");


















function sharedUpdater(store, user, EnsayosEdge) {
  const userProxy = store.get(user.id);

  const connection = _relayRuntime.ConnectionHandler.getConnection(
  userProxy,
  'EnsayoList_Ensayos');

  if (connection) {
    _relayRuntime.ConnectionHandler.insertEdgeAfter(connection, EnsayosEdge);
  }
}

let nextClientMutationId = 0;

function commit(
environment,
user,
Ensayo_Title,
Ensayo_Description,
Ensayo_Content)
{
  const clientMutationId = nextClientMutationId++;

  return (0, _reactRelay.commitMutation)(environment, {
    mutation,
    variables: {
      input: {
        Ensayo_Title,
        Ensayo_Description,
        Ensayo_Content,
        clientMutationId: `${clientMutationId}` } },



    updater(store) {
      const payload = store.getRootField('EnsayoAdd');
      sharedUpdater(store, user, payload.getLinkedRecord('EnsayosEdge'));
    },

    optimisticUpdater(store) {
      const id = `client:EnsayoAdd:Ensayo:${clientMutationId}`;
      const aEnsayo = store.create(id, 'Ensayo');
      aEnsayo.setValue(Ensayo_Title, 'Ensayo_Title');
      aEnsayo.setValue(Ensayo_Description, 'Ensayo_Description');
      aEnsayo.setValue(Ensayo_Content, 'Ensayo_Content');
      aEnsayo.setValue(id, 'id');

      const EnsayosEdge = store.create(
      `client:EnsayoAdd:EnsayosEdge:${clientMutationId}`,
      'EnsayosEdge');

      EnsayosEdge.setLinkedRecord(aEnsayo, 'node');

      sharedUpdater(store, user, EnsayosEdge);
    } });

}var _default =

{ commit };exports.default = _default;
//# sourceMappingURL=EnsayoAddMutation.js.map