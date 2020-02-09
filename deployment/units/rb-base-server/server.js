"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));
var _compression = _interopRequireDefault(require("compression"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _artifactSettings = require("../_configuration/rb-base-server/artifactSettings");
var _package = require("../../package.json");
var _servers = _interopRequireDefault(require("../_configuration/rb-base-server/servers"));

var _log = _interopRequireDefault(require("./log"));
var _ObjectCache = require("./ObjectCache");
var _ObjectManager = _interopRequireDefault(require("./ObjectManager"));
var _serverHealthz = _interopRequireDefault(require("./serverHealthz"));
var _serverNightlyMaintenance = _interopRequireDefault(require("./serverNightlyMaintenance"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

// Read environment
require('dotenv').config();

const port = process.env.PORT;
if (port == null || typeof port !== 'string')
throw new Error('rb-base-server/server.js requires the environment variable PORT to be set');

const host = process.env.HOST;
if (host == null || typeof host !== 'string')
throw new Error('rb-base-server/server.js requires the environment variable HOST to be set');

const accessControlAllowedOriginsAsString = process.env.ACCESS_CONTROL_ALLOWED_ORIGINS;
if (
accessControlAllowedOriginsAsString == null ||
typeof accessControlAllowedOriginsAsString !== 'string')

throw new Error(
'rb-base-server/server.js requires the environment variable ACCESS_CONTROL_ALLOWED_ORIGINS to be set');

let accessControlAllowedOrigins = [];
try {
  accessControlAllowedOrigins = JSON.parse(accessControlAllowedOriginsAsString);
  if (!Array.isArray(accessControlAllowedOrigins)) throw new Error();
} catch (ex) {
  throw new Error(
  'rb-base-server/server.js requires the environment variable ACCESS_CONTROL_ALLOWED_ORIGINS to be array of strings');

}

//

// Global eror handling
process.on('uncaughtException', function (err) {
  try {
    try {
      console.error(err.message);
      console.error(err.stack);
    } catch (ignoreErr) {}

    (0, _log.default)('error', 'rb-base-server server: uncaughtException', { err });
  } catch (globalErr) {
    try {
      console.error(globalErr.message);
      console.error(globalErr.stack);
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
});

// Log startup information
(0, _log.default)('info', 'rb-base-server start', {
  name: _package.name,
  version: _package.version,
  NODE_ENV: process.env.NODE_ENV,
  accessControlAllowedOrigins });


// Get object cache ready
(0, _ObjectCache.initializeObjectCache)();

// Main router
const server = (0, _express.default)();

// Set up access control
server.use(function (req, res, next) {
  // Find out what the origin is, could be string or undefined
  const origin = req.get('origin');

  // Allow requests with no origin (like mobile apps or curl requests)
  // For requests with origin, verify that is is allowed
  if (origin && accessControlAllowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  }

  // Pass to next layer of middleware
  next();
}); // Configure main router

server.set('trust proxy', 'loopback');
server.set('x-powered-by', false);
server.use((0, _compression.default)());
server.use((0, _cookieParser.default)()); // GraphQL server requires this

const firstPathElement = _artifactSettings.firstPathElementIsArtifactName ? '/:artifact_name' : '';

// Health server
server.use(firstPathElement + '/healthz', _serverHealthz.default);

// Nightly maintenance server, if defined
if (_serverNightlyMaintenance.default) {
  server.use(firstPathElement + '/serverNightlyMaintenance', _serverNightlyMaintenance.default);
}

// Static public files server. Serve both using first path elements, and as in root. The reason
// is that between gantry, and actual deployment, assets requested by client.js and loaded by
// webpack, both paths could be used
const staticServer = _express.default.static(
_path.default.resolve(__dirname + '/../_configuration/rb-base-server/public_files/'),
{
  maxAge:
  1 *
  // day
  86400 });


server.use('/', staticServer);
if (firstPathElement !== '') {
  server.use(firstPathElement + '/', staticServer);
}

// Initialize server extenders
(0, _servers.default)(server, _artifactSettings.firstPathElementIsArtifactName);

_ObjectManager.default.initializePersisters(false, () => {
  // Serve - work differently in development and production. In production only the
  // specified host serves
  if (process.env.NODE_ENV === 'production') {
    // Production - serve as told
    server.listen(port, host);
  } else {
    // Development server - localhost. Always run on localhost
    startDevelopmentServer(port, '127.0.0.1');
    // Development server - on a specific IP, if different from localhost
    if (host !== '127.0.0.1') startDevelopmentServer(port, host);
  }
});

function startDevelopmentServer(port, host) {
  const localIPDevelopmentServer = (0, _express.default)();
  localIPDevelopmentServer.use(server);
  localIPDevelopmentServer.listen(port, host);
}
//# sourceMappingURL=server.js.map