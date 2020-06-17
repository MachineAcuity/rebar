"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));
var _cassandraDriver = _interopRequireDefault(require("cassandra-driver"));
var _jsonStringifySafe = _interopRequireDefault(require("json-stringify-safe"));
var _winstonTransport = _interopRequireDefault(require("winston-transport"));

var _debug = require("../../_configuration/debug");
var _getLocalIP = _interopRequireDefault(require("../../rb-base-server/getLocalIP"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

// Read environment
require('dotenv').config();

//

const process_pid = process.pid;
const local_ip = (0, _getLocalIP.default)();

//

const Uuid = _cassandraDriver.default.types.Uuid;

//

function stringifyIfRequired(obj) {
  if (typeof obj === 'string') return obj;else
  return (0, _jsonStringifySafe.default)(obj);
}

function createCopyWithNonNull(obj) {
  const res = {};

  for (let key in obj) {
    const value = obj[key];

    if (value) res[key] = value;
  }

  return res;
}

//

class WinstonTransportCassandra extends _winstonTransport.default {



  constructor(options) {
    super(options);

    if (!options.keyspace) {
      throw new Error(
      'rb-persister-cassandra WinstonTransportCassandra: options.keyspace is missing');

    }

    this.client = new _cassandraDriver.default.Client(options);
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const { level, message, details } = info;

    const self = this;
    return self._insertLog(level, message, details, function (err) {
      callback(err, !err);
    });
  }

  _insertLog(level, message, detailsSupplied, callback) {
    // Create shallow copy of details
    const detailsPrep = Object.assign({}, detailsSupplied);

    let issue_id = null;
    let err_message = null;
    let err_stack = null;
    let err_info = null;
    let req_headers = null;
    let req_cookies = null;
    let req_ip = null;
    let req_body = null;
    let user_id = null;
    let site_id = null;

    // Retrieve issue_id
    if (detailsPrep.issue_id) {
      issue_id = stringifyIfRequired(detailsPrep.issue_id);
      delete detailsPrep.issue_id;
    }

    // Retrieve error message, if available
    try {
      if (detailsPrep.err) {
        const { message, stack } = detailsPrep.err;

        if (message && stack) {
          err_message = stringifyIfRequired(message);
          err_stack = stringifyIfRequired(stack);
        } else {
          err_message = stringifyIfRequired(detailsPrep.err);
        }

        delete detailsPrep.err;
      }
    } catch (ignoreErr) {
      console.error(ignoreErr);
    }

    // Retrieve err_info
    if (detailsPrep.err_info) {
      err_info = stringifyIfRequired(detailsPrep.err_info);
      delete detailsPrep.err_info;
    }

    // Retrieve request
    try {
      if (detailsPrep.req) {
        const req = detailsPrep.req;
        delete detailsPrep.req;

        req_headers = stringifyIfRequired(req.headers);
        req_cookies = stringifyIfRequired(req.cookies);
        if (req.body && req.body.__DO_NOT_INCLUDE__ !== true) {
          req_body = stringifyIfRequired(req.body);
        }
        req_ip = stringifyIfRequired(req.headers['x-real-ip'] || req.connection.remoteAddress);
      }
    } catch (ignoreErr) {
      console.error(ignoreErr);
    }

    // Remove res. At a later point it might be interesting to retrieve data from res but at this
    // point it is not used
    delete detailsPrep.res;

    // Retrieve details from ObjectManager
    try {
      // Retrieve user_id, site_id
      if (detailsPrep.objectManager) {
        const objectManager = { detailsPrep };
        // Delete object first so that we do not fail json.stringify later
        delete detailsPrep.objectManager;

        // Get user_id
        try {
          user_id = objectManager.Viewer_User_id;
          if (!user_id instanceof Uuid) user_id = Uuid.fromString(user_id);
        } catch (ignoreErr) {
          user_id = null;
        }

        // Get site_id
        try {
          site_id = objectManager.siteInformation.artifact_id;
          if (!site_id instanceof Uuid) site_id = Uuid.fromString(site_id);
        } catch (ignoreErr) {
          site_id = null;
        }
      }

      // If artifact_id is provided, and site_id is not determined, use it
      if (!site_id && detailsPrep.artifact_id) {
        try {
          site_id = detailsPrep.artifact_id;
          if (!site_id instanceof Uuid) site_id = Uuid.fromString(site_id);
          delete detailsPrep.artifact_id;
        } catch (ignoreErr) {
          site_id = null;
        }
      }
    } catch (ignoreErr) {
      console.error(ignoreErr);
    }

    // Stringify trimmed down details
    const detailsRemaining = stringifyIfRequired(detailsPrep);
    const details = detailsRemaining === '{}' ? null : detailsRemaining;

    const event = {
      date: new Date().toISOString().slice(0, 10),
      datetime: new Date(),
      level,
      message,
      details,
      issue_id,
      local_ip,
      port: process.env.PORT,
      host: process.env.HOST,
      process_pid,
      err_message,
      err_stack,
      err_info,
      req_headers,
      req_cookies,
      req_ip,
      req_body,
      user_id,
      site_id };


    // Print to console, if so specified
    if (_debug.debugWriteToConsoleLog) {
      const eventForConsole = createCopyWithNonNull(event);

      const { err_message, err_stack, message } = eventForConsole;
      delete eventForConsole.err_message;
      delete eventForConsole.err_stack;
      delete eventForConsole.message;

      if (level === 'error') {
        if (err_message) console.error(_chalk.default.black.bgYellowBright(err_message));
        if (message) console.error(_chalk.default.redBright.bgBlack(message));
        if (details) console.error(_chalk.default.gray.bgBlack(details));
        if (err_stack) console.error(err_stack);
      } else {
        if (err_message) console.log(_chalk.default.black.bgBlueBright(err_message));
        if (message) console.log(_chalk.default.blueBright.bgBlack(message));
        if (details) console.error(_chalk.default.gray.bgBlack(details));
        if (err_stack) console.log(err_stack);
      }
    }

    try {
      // Execute as a prepared query as it would be executed multiple times
      return this.client.execute(
      `INSERT INTO logs (
          date,
          datetime,
          level,
          message,
          details,
          issue_id,
          local_ip,
          port,
          host,
          process_pid,
          err_message,
          err_stack,
          err_info,
          req_headers,
          req_cookies,
          req_ip,
          req_body,
          user_id,
          site_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      USING TTL 7776000`, // 90 * 86400 = 90 days
      [
      event.date,
      event.datetime,
      event.level,
      event.message,
      event.details,
      event.issue_id,
      event.local_ip,
      event.port,
      event.host,
      event.process_pid,
      event.err_message,
      event.err_stack,
      event.err_info,
      event.req_headers,
      event.req_cookies,
      event.req_ip,
      event.req_body,
      event.user_id,
      event.site_id],

      { prepare: true, consistency: _cassandraDriver.default.types.consistencies.one },
      callback);

    } catch (writeErr) {
      console.error('Failed to write to log because ' + writeErr.message + '\n' + writeErr.stack);
    }
  }}exports.default = WinstonTransportCassandra;
//# sourceMappingURL=WinstonTransportCassandra.js.map