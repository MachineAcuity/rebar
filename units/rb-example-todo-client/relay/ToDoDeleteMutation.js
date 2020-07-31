// @flow weak

import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'

const mutation = graphql`
  mutation ToDoDeleteMutation($input: ToDoDeleteInput!) {
    ToDoDelete(input: $input) {
      Viewer {
        ToDo_TotalCount
        ToDo_CompletedCount
      }
      deletedId
    }
  }
`

function sharedUpdater(store, user, deletedId) {
  const userProxy = store.get(user.id)
  ;[ 'any', 'active', 'completed' ].forEach((status) => {
    const connection = ConnectionHandler.getConnection(userProxy, 'ToDoList_ToDos', { status })
    if (connection) {
      ConnectionHandler.deleteNode(connection, deletedId)
    }
  })
}

function commit(environment, user, aToDo) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { id: aToDo.id },
    },

    updater(store) {
      const payload = store.getRootField('ToDoDelete')
      sharedUpdater(store, user, payload.getValue('deletedId'))
    },

    optimisticUpdater(store) {
      sharedUpdater(store, user, aToDo.id)

      const userProxy = store.get(user.id)
      const ToDo_TotalCount = userProxy.getValue('ToDo_TotalCount')
      if (ToDo_TotalCount != null) {
        userProxy.setValue(ToDo_TotalCount - 1, 'ToDo_TotalCount')
      }
      const ToDo_CompletedCount = userProxy.getValue('ToDo_CompletedCount')
      if (ToDo_CompletedCount != null) {
        if (aToDo.ToDo_Complete != null) {
          if (aToDo.ToDo_Complete) {
            userProxy.setValue(ToDo_CompletedCount - 1, 'ToDo_CompletedCount')
          }
        } else if (ToDo_TotalCount != null) {
          // Note this is the old ToDo_TotalCount.
          if (ToDo_TotalCount - 1 < ToDo_CompletedCount) {
            userProxy.setValue(ToDo_TotalCount - 1, 'ToDo_CompletedCount')
          }
        }
      }
    },
  })
}

export default { commit }
