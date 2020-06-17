// @flow

import winston from 'winston'

import defaultPersister from '../_configuration/rb-base-server/graphql/defaultPersister'

//

// Read environment
require('dotenv').config()

//

// Set up transports
const transports = []

// If persister specified logger, use it
const defaultPersisterLogger = defaultPersister.createLogger()
if (defaultPersisterLogger) {
  transports.push(defaultPersisterLogger)
}

// Create winston
const logger = winston.createLogger({ transports })

//

export default function log(level: 'error' | 'warn' | 'info', message: string, details: Object) {
  logger.log({ level, message, details })
}
