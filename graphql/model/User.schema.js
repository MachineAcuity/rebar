/* @flow */

import defaultPersister from '../../configuration/graphql/defaultPersister'

defaultPersister.addTableSchema( 'User', {
  fields: {
      id: 'uuid',
      User_AccountName: 'text',
      User_AccountPassword: 'text',
      User_DisplayName: 'text',
      User_ProfilePhoto: 'text',
      User_Email: 'text',
      User_PhoneNumberMobile: 'text',
      User_Locale: 'text',
      UserToken2: 'text',
  },
  key: [ 'id' ],
  indexes: [ 'User_AccountName' ]
} )

export default true
