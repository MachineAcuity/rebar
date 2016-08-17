/* @flow */

import defaultPersister from '../../../../configuration/graphql/defaultPersister'


defaultPersister.addTableSchema( 'PrimeNumber', {
  fields: {
      id: 'uuid',
      PrimeNumber_NumericValue: 'int',
      PrimeNumber_TextValue: 'text',
  },
  key: [ 'id' ],
} )

export default true
