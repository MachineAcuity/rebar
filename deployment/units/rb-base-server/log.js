"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = log;

var _winston = _interopRequireDefault(require("winston"));

var _defaultPersister = _interopRequireDefault(require("../_configuration/rb-base-server/graphql/defaultPersister"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

// Read environment
require('dotenv').config();

//

// Set up transports
const transports = [];

// If persister specified logger, use it
const defaultPersisterLogger = _defaultPersister.default.createLogger();
if (defaultPersisterLogger) {
  transports.push(defaultPersisterLogger);
}

// Create winston
const logger = _winston.default.createLogger({ transports });

//

function log(level, message, details) {
  logger.log({ level, message, details });
}
//# sourceMappingURL=log.js.map