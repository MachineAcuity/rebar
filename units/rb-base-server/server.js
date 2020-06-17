// @flow

import path from 'path'

import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import { firstPathElementIsArtifactName } from '../_configuration/rb-base-server/artifactSettings'
import { name, version } from '../../package.json'
import servers from '../_configuration/rb-base-server/servers'

import log from './log'
import ObjectCache from './ObjectCache'
import ObjectManager from './ObjectManager'
import serverHealthz from './serverHealthz'
import serverNightlyMaintenance from './serverNightlyMaintenance'

//

// Read environment
require('dotenv').config()

const port = process.env.PORT
if (port == null || typeof port !== 'string')
  throw new Error('rb-base-server/server.js requires the environment variable PORT to be set')

const host = process.env.HOST
if (host == null || typeof host !== 'string')
  throw new Error('rb-base-server/server.js requires the environment variable HOST to be set')

const accessControlAllowedOriginsAsString = process.env.ACCESS_CONTROL_ALLOWED_ORIGINS
if (
  accessControlAllowedOriginsAsString == null ||
  typeof accessControlAllowedOriginsAsString !== 'string'
)
  throw new Error(
    'rb-base-server/server.js requires the environment variable ACCESS_CONTROL_ALLOWED_ORIGINS to be set',
  )
let accessControlAllowedOrigins = []
try {
  accessControlAllowedOrigins = JSON.parse(accessControlAllowedOriginsAsString)
  if (!Array.isArray(accessControlAllowedOrigins)) throw new Error()
} catch (ex) {
  throw new Error(
    'rb-base-server/server.js requires the environment variable ACCESS_CONTROL_ALLOWED_ORIGINS to be array of strings',
  )
}

//

// Global eror handling
process.on('uncaughtException', function(err) {
  try {
    try {
      console.error(err.message)
      console.error(err.stack)
    } catch (ignoreErr) {}

    log('error', 'rb-base-server server: uncaughtException', { err })
  } catch (globalErr) {
    try {
      console.error(globalErr.message)
      console.error(globalErr.stack)
    } catch (ignoreErr) {}
  }
  // Handle your errors here

  // global.__current__ is added via middleware
  // Be aware that this is a bad practice,
  // global.__current__ being a global, can change
  // without advice, so you might end responding with
  // serverError() to a different request than the one
  // that originated the error if this one happened async
  //  global.__current__.res.serverError()
})

// Log startup information
log('info', 'rb-base-server start', {
  name,
  version,
  NODE_ENV: process.env.NODE_ENV,
  accessControlAllowedOrigins,
})

// Get object cache ready
ObjectCache.initializeObjectCache()

// Main router
const server = express()

// Set up access control
server.use(function(req, res, next) {
  // Find out what the origin is, could be string or undefined
  const origin = req.get('origin')

  // Allow requests with no origin (like mobile apps or curl requests)
  // For requests with origin, verify that is is allowed
  if (origin && accessControlAllowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
  }

  // Pass to next layer of middleware
  next()
}) // Configure main router

server.set('trust proxy', 'loopback')
server.set('x-powered-by', false)
server.use(compression())
server.use(cookieParser()) // GraphQL server requires this

const firstPathElement = firstPathElementIsArtifactName ? '/:artifact_name' : ''

// Health server
server.use(firstPathElement + '/healthz', serverHealthz)

// Nightly maintenance server, if defined
if (serverNightlyMaintenance) {
  server.use(firstPathElement + '/serverNightlyMaintenance', serverNightlyMaintenance)
}

// Static public files server. Serve both using first path elements, and as in root. The reason
// is that between gantry, and actual deployment, assets requested by client.js and loaded by
// webpack, both paths could be used
const staticServer = express.static(
  path.resolve(__dirname + '/../_configuration/rb-base-server/public_files/'),
  {
    maxAge:
      1 *
      // day
      86400,
  },
)
server.use('/', staticServer)
if (firstPathElement !== '') {
  server.use(firstPathElement + '/', staticServer)
}

// Initialize server extenders
servers(server, firstPathElementIsArtifactName)

ObjectManager.initializePersisters(false, () => {
  // Serve - work differently in development and production. In production only the
  // specified host serves
  if (process.env.NODE_ENV === 'production') {
    // Production - serve as told
    server.listen(port, host)
  } else {
    // Development server - localhost. Always run on localhost
    startDevelopmentServer(port, '127.0.0.1')
    // Development server - on a specific IP, if different from localhost
    if (host !== '127.0.0.1') startDevelopmentServer(port, host)
  }
})

function startDevelopmentServer(port, host) {
  const localIPDevelopmentServer = express()
  localIPDevelopmentServer.use(server)
  localIPDevelopmentServer.listen(port, host)
}
