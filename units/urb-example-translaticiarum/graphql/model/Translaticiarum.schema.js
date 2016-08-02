/* @flow */

import { addTableSchema } from '../../../../graphql/ExpressCassandra'

addTableSchema( 'Translaticiarum', {
  fields: {
      id: 'uuid',
      Translaticiarum_User_id: 'uuid',
      Translaticiarum_Date: 'timestamp',
      Translaticiarum_Time: 'timestamp',
      Translaticiarum_Type: 'int',
  },
  key: [ 'id' ],
  indexes: [ 'Translaticiarum_User_id' ]
} )

export default true
