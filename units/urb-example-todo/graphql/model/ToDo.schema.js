/* @flow */

import { addTableSchema } from '../../../../graphql/ExpressCassandra'


addTableSchema( 'ToDo', {
  fields: {
      id: 'uuid',
      ToDo_User_id: 'uuid',
      ToDo_Text: 'text',
      ToDo_Complete: 'boolean',
  },
  key: [ 'id' ],
  indexes: [ 'ToDo_User_id' ]
} )

export default true
