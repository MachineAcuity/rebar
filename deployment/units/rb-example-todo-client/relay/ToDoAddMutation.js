"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _reactRelay = require("react-relay");







var _relayRuntime = require("relay-runtime");var _ToDoAddMutation;

const mutation = _ToDoAddMutation !== void 0 ? _ToDoAddMutation : _ToDoAddMutation = require("./__generated__/ToDoAddMutation.graphql");



















function sharedUpdater(
store,
user,
ToDosEdge)
{
  const userProxy = store.get(user.id);
  ['any', 'active'].forEach(status => {
    const connection = _relayRuntime.ConnectionHandler.getConnection(
    userProxy,
    'ToDoList_ToDos',
    { status });

    if (connection) {
      _relayRuntime.ConnectionHandler.insertEdgeAfter(connection, ToDosEdge);
    }
  });
}

let nextClientMutationId = 0;

function commit(
environment,
user,
ToDo_Text)
{
  const clientMutationId = nextClientMutationId++;

  return (0, _reactRelay.commitMutation)(environment, {
    mutation,
    variables: {
      input: { ToDo_Text, clientMutationId: `${clientMutationId}` } },


    updater(store) {
      const payload = store.getRootField('ToDoAdd');
      sharedUpdater(store, user, payload.getLinkedRecord('ToDosEdge'));
    },

    optimisticUpdater(store) {
      const id = `client:ToDoAdd:ToDo:${clientMutationId}`;
      const aToDo = store.create(id, 'ToDo');
      aToDo.setValue(ToDo_Text, 'ToDo_Text');
      aToDo.setValue(id, 'id');

      const ToDosEdge = store.create(
      `client:ToDoAdd:ToDosEdge:${clientMutationId}`,
      'ToDosEdge');

      ToDosEdge.setLinkedRecord(aToDo, 'node');

      sharedUpdater(store, user, ToDosEdge);

      const userProxy = store.get(user.id);
      const ToDo_TotalCount = userProxy.getValue('ToDo_TotalCount');
      if (ToDo_TotalCount != null) {
        userProxy.setValue(ToDo_TotalCount + 1, 'ToDo_TotalCount');
      }
    } });

}var _default =

{ commit };exports.default = _default;
//# sourceMappingURL=ToDoAddMutation.js.map