/* @flow weak */

import winston from 'winston'

import defaultPersister from '../configuration/graphql/defaultPersister'


// The log is always handled by the default persister
const log = new (winston.Logger)( { transports: [ defaultPersister.createLogger( ) ] } )

export default log
