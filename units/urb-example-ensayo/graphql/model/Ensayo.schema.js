/* @flow */

import defaultPersister from '../../../../configuration/graphql/defaultPersister'

defaultPersister.addTableSchema( 'Ensayo', {
  fields: {
      id: 'uuid',
      Ensayo_User_id: 'uuid',
      Ensayo_Content: 'text',
      Ensayo_Description: 'text',
      Ensayo_Title: 'text',
  },
  key: [ 'id' ],
  indexes: [ 'Ensayo_User_id' ]
} )

export default true
