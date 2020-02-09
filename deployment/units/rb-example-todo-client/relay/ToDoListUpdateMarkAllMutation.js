"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _reactRelay = require("react-relay");
var _relayRuntime = require("relay-runtime");var _ToDoListUpdateMarkAllMutation;

const mutation = _ToDoListUpdateMarkAllMutation !== void 0 ? _ToDoListUpdateMarkAllMutation : _ToDoListUpdateMarkAllMutation = require("./__generated__/ToDoListUpdateMarkAllMutation.graphql");























function commit(environment, user, ToDos, ToDo_Complete, status) {
  return (0, _reactRelay.commitMutation)(environment, {
    mutation,
    variables: {
      input: { ToDo_Complete },
      status },


    updater(store) {
      const userProxy = store.get(user.id);
      const connection = _relayRuntime.ConnectionHandler.getConnection(userProxy, 'ToDoList_ToDos', { status });
      const ToDosEdges = store.
      getRootField('ToDoListUpdateMarkAll').
      getLinkedRecord('Viewer').
      getLinkedRecord('ToDos', { status }).
      getLinkedRecords('edges');
      connection.setLinkedRecords(ToDosEdges, 'edges');
    },

    optimisticUpdater(store) {
      const userProxy = store.get(user.id);
      const connection = _relayRuntime.ConnectionHandler.getConnection(userProxy, 'ToDoList_ToDos', { status });

      if (ToDo_Complete && status === 'active' || !ToDo_Complete && status === 'completed') {
        connection.setLinkedRecords([], 'edges');
      }
    },

    optimisticResponse() {
      const payload = {
        Viewer: {
          id: user.id,
          ToDo_CompletedCount: 0 },

        changedToDos: null };


      if (ToDos && ToDos.edges) {
        payload.changedToDos = ToDos.edges.
        filter(({ node }) => node.ToDo_Complete !== ToDo_Complete).
        map(({ node }) => ({ id: node.id, ToDo_Complete }));
      }

      if (ToDo_Complete) {
        if (user.ToDo_TotalCount != null) {
          payload.Viewer.ToDo_CompletedCount = user.ToDo_TotalCount;
        }
      } else {
        payload.Viewer.ToDo_CompletedCount = 0;
      }

      return {
        ToDoListUpdateMarkAll: payload };

    } });

}var _default =

{ commit };exports.default = _default;
//# sourceMappingURL=ToDoListUpdateMarkAllMutation.js.map