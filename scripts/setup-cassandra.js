import process from 'process'

import { connectAndLoadSchemas } from '../graphql/ExpressCassandra'
import _schemas_system from '../graphql/model/_schemas'
import _schemas from '../configuration/graphql/_schemas'

console.log( 'Initializing schema' )
connectAndLoadSchemas( true )
