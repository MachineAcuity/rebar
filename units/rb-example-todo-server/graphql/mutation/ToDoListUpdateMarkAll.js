// @flow weak

import { mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql'

import ObjectManager from '../../../rb-base-server/ObjectManager'
import ToDoListUpdateMarkAll from '../helper/ToDoListUpdateMarkAll'
import ToDoType from '../type/ToDoType'
import ViewerType from '../../../../units/rb-appbase-server/graphql/type/ViewerType'

//

export default mutationWithClientMutationId({
  name: 'ToDoListUpdateMarkAll',

  inputFields: {
    ToDo_Complete: { type: new GraphQLNonNull(GraphQLBoolean) },
  },

  outputFields: {
    changedToDos: {
      type: new GraphQLList(ToDoType),
      resolve: ({ arr_local_ids_Changed_ToDos }, args, context, { rootValue: ec }) => {
        const objectManager: ObjectManager = ec.om()
        return arr_local_ids_Changed_ToDos.map((local_id) =>
          objectManager.getOneObject_async('ToDo', { id: local_id }),
        )
      },
    },

    Viewer: {
      type: ViewerType,
      resolve: (parent, args, context, { rootValue: ec }) => {
        const objectManager: ObjectManager = ec.om()
        return objectManager.getOneObject_async('User', {
          id: objectManager.getViewerUserId(),
        })
      },
    },
  },

  mutateAndGetPayload: async ({ ToDo_Complete }, context, { rootValue: ec }) => {
    const objectManager: ObjectManager = ec.om()
    const arr_local_ids_Changed_ToDos = await ToDoListUpdateMarkAll(objectManager, ToDo_Complete)

    return { arr_local_ids_Changed_ToDos }
  },
})
