"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = defaultrequestLoggerPublic;

var _debug = require("../_configuration/debug");
var _template = require("../rb-base-universal/template");
var _log = _interopRequireDefault(require("../rb-base-server/log"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //  weak

function defaultrequestLoggerPublic({ req, clientIP, userSession }) {
  let logLevel = null;

  // IDEA [Code Quality] Audit errors for Public and decide which ones to log. For instasnce, 401 is a bad idea.
  // // If there is an error, log it as an error
  // if( requestAndResponse.response.indexOf( '"errors": [' ) > 0 )
  //   logLevel = 'error'
  // Otherwise, if it is a trace, log it as info
  //else
  if ((0, _template.matchObject)({ req, clientIP, userSession }, _debug.debugWriteToLogServerRequestPublic)) {
    logLevel = 'info';
  }

  if (logLevel) {
    (0, _log.default)(logLevel, 'rb-base-server public request', {
      req,
      clientIP,
      userSession });

  }
}
//# sourceMappingURL=defaultRequestLoggerPublic.js.map