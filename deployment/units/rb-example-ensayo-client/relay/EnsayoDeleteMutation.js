"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _reactRelay = require("react-relay");
var _relayRuntime = require("relay-runtime");var _EnsayoDeleteMutation;

const mutation = _EnsayoDeleteMutation !== void 0 ? _EnsayoDeleteMutation : _EnsayoDeleteMutation = require("./__generated__/EnsayoDeleteMutation.graphql");







function sharedUpdater(store, user, deletedId) {
  const userProxy = store.get(user.id);

  const connection = _relayRuntime.ConnectionHandler.getConnection(userProxy, 'EnsayoList_Ensayos');
  if (connection) {
    _relayRuntime.ConnectionHandler.deleteNode(connection, deletedId);
  }
}

function commit(environment, user, aEnsayo) {
  return (0, _reactRelay.commitMutation)(environment, {
    mutation,
    variables: {
      input: { id: aEnsayo.id } },


    updater(store) {
      const payload = store.getRootField('EnsayoDelete');
      sharedUpdater(store, user, payload.getValue('deletedId'));
    },

    optimisticUpdater(store) {
      sharedUpdater(store, user, aEnsayo.id);
    } });

}var _default =

{ commit };exports.default = _default;
//# sourceMappingURL=EnsayoDeleteMutation.js.map