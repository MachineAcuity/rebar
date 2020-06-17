"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = defaultrequestLoggerAuth;

var _debug = require("../_configuration/debug");
var _log = _interopRequireDefault(require("../rb-base-server/log"));
var _template = require("../rb-base-universal/template");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //  weak

function defaultrequestLoggerAuth({ req, clientIP, userSession }) {
  let logLevel = null;

  // IDEA [Code Quality] Audit errors for Auth and decide which ones to log. For instasnce, 401 is a bad idea.
  // // If there is an error, log it as an error
  // if( requestAndResponse.response.indexOf( '"errors": [' ) > 0 )
  //   logLevel = 'error'
  // Otherwise, if it is a trace, log it as info
  //else
  if ((0, _template.matchObject)({ req, clientIP, userSession }, _debug.debugWriteToLogServerRequestAuth)) {
    logLevel = 'info';
  }

  if (logLevel) {
    (0, _log.default)(logLevel, 'rb-appbase-server auth request', {
      req,
      clientIP,
      userSession });

  }
}
//# sourceMappingURL=defaultRequestLoggerAuth.js.map