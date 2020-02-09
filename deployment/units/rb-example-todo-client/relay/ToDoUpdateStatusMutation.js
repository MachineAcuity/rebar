"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _reactRelay = require("react-relay");
var _relayRuntime = require("relay-runtime");var _ToDoUpdateStatusMutation;

const mutation = _ToDoUpdateStatusMutation !== void 0 ? _ToDoUpdateStatusMutation : _ToDoUpdateStatusMutation = require("./__generated__/ToDoUpdateStatusMutation.graphql");














function sharedUpdater(store, user, proxyToDo) {
  // In principle this could add to the active connection, but such an
  // interaction is not possible from the front end.
  const userProxy = store.get(user.id);
  const status = proxyToDo.getValue('ToDo_Complete') ? 'active' : 'completed';
  const connection = _relayRuntime.ConnectionHandler.getConnection(userProxy, 'ToDoList_ToDos', { status });
  if (connection) {
    _relayRuntime.ConnectionHandler.deleteNode(connection, proxyToDo.getValue('id'));
  }
}

function commit(environment, user, aToDo, ToDo_Complete) {
  return (0, _reactRelay.commitMutation)(environment, {
    mutation,
    variables: {
      input: { id: aToDo.id, ToDo_Complete } },


    updater(store) {
      const payload = store.getRootField('ToDoUpdateStatus');
      sharedUpdater(store, user, payload.getLinkedRecord('ToDo'));
    },

    optimisticUpdater(store) {
      const proxyToDo = store.get(aToDo.id);
      proxyToDo.setValue(ToDo_Complete, 'complete');
      sharedUpdater(store, user, proxyToDo);

      const userProxy = store.get(user.id);
      const ToDo_CompletedCount = userProxy.getValue('ToDo_CompletedCount');
      if (ToDo_CompletedCount != null) {
        userProxy.setValue(ToDo_CompletedCount + (ToDo_Complete ? 1 : -1), 'ToDo_CompletedCount');
      }
    } });

}var _default =

{ commit };exports.default = _default;
//# sourceMappingURL=ToDoUpdateStatusMutation.js.map