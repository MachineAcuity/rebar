import process from 'process'

import schema from '../graphql/schema' // Schema for GraphQL server
import ObjectManager from '../graphql/ObjectManager'

console.log( 'Initializing schema' )
ObjectManager.initializePersisters( true )
