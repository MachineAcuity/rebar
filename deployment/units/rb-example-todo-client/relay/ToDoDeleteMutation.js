"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _reactRelay = require("react-relay");
var _relayRuntime = require("relay-runtime");var _ToDoDeleteMutation;

const mutation = _ToDoDeleteMutation !== void 0 ? _ToDoDeleteMutation : _ToDoDeleteMutation = require("./__generated__/ToDoDeleteMutation.graphql");











function sharedUpdater(store, user, deletedId) {
  const userProxy = store.get(user.id);
  ['any', 'active', 'completed'].forEach(status => {
    const connection = _relayRuntime.ConnectionHandler.getConnection(userProxy, 'ToDoList_ToDos', { status });
    if (connection) {
      _relayRuntime.ConnectionHandler.deleteNode(connection, deletedId);
    }
  });
}

function commit(environment, user, aToDo) {
  return (0, _reactRelay.commitMutation)(environment, {
    mutation,
    variables: {
      input: { id: aToDo.id } },


    updater(store) {
      const payload = store.getRootField('ToDoDelete');
      sharedUpdater(store, user, payload.getValue('deletedId'));
    },

    optimisticUpdater(store) {
      sharedUpdater(store, user, aToDo.id);

      const userProxy = store.get(user.id);
      const ToDo_TotalCount = userProxy.getValue('ToDo_TotalCount');
      if (ToDo_TotalCount != null) {
        userProxy.setValue(ToDo_TotalCount - 1, 'ToDo_TotalCount');
      }
      const ToDo_CompletedCount = userProxy.getValue('ToDo_CompletedCount');
      if (ToDo_CompletedCount != null) {
        if (aToDo.ToDo_Complete != null) {
          if (aToDo.ToDo_Complete) {
            userProxy.setValue(ToDo_CompletedCount - 1, 'ToDo_CompletedCount');
          }
        } else if (ToDo_TotalCount != null) {
          // Note this is the old ToDo_TotalCount.
          if (ToDo_TotalCount - 1 < ToDo_CompletedCount) {
            userProxy.setValue(ToDo_TotalCount - 1, 'ToDo_CompletedCount');
          }
        }
      }
    } });

}var _default =

{ commit };exports.default = _default;
//# sourceMappingURL=ToDoDeleteMutation.js.map