// @flow

import UserUpdate from '../../../rb-account-management-server/graphql/mutation/UserUpdate'
import EnsayoAdd from '../../../rb-example-ensayo-server/graphql/mutation/EnsayoAdd'
import EnsayoDelete from '../../../rb-example-ensayo-server/graphql/mutation/EnsayoDelete'
import EnsayoUpdate from '../../../rb-example-ensayo-server/graphql/mutation/EnsayoUpdate'
import ToDoAdd from '../../../rb-example-todo-server/graphql/mutation/ToDoAdd'
import ToDoDelete from '../../../rb-example-todo-server/graphql/mutation/ToDoDelete'
import ToDoListUpdateMarkAll from '../../../rb-example-todo-server/graphql/mutation/ToDoListUpdateMarkAll'
import ToDoUpdateRename from '../../../rb-example-todo-server/graphql/mutation/ToDoUpdateRename'
import ToDoUpdateStatus from '../../../rb-example-todo-server/graphql/mutation/ToDoUpdateStatus'

export default {
  UserUpdate,
  EnsayoAdd,
  EnsayoDelete,
  EnsayoUpdate,
  ToDoAdd,
  ToDoDelete,
  ToDoListUpdateMarkAll,
  ToDoUpdateRename,
  ToDoUpdateStatus,
}
