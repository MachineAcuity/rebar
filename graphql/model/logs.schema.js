/* @flow */

import { addTableSchema } from '../ExpressCassandra'

addTableSchema( 'logs', {
  fields: {
      key: 'text',
      date: 'timestamp',
      level: 'text',
      message: 'text',
      meta: 'text',
  },
  key: [ 'key', 'date' ],
} )

export default true
