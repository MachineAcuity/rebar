"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));
var _express = _interopRequireDefault(require("express"));

var _log = _interopRequireDefault(require("../rb-base-server/log"));
var _ObjectManager = require("../rb-base-server/ObjectManager");

var _checkCredentials = require("./checkCredentials");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// Read environment
require('dotenv').config();

//

const serverClientError = (0, _express.default)();

serverClientError.use(_bodyParser.default.json());

//

async function report(req, res) {
  let step = 'initialize';

  try {
    const objectManager = await (0, _ObjectManager.getObjectManager)(req, res);

    if (!objectManager.siteInformation) {
      throw new Error('Site information not found');
    }

    await (0, _checkCredentials.getUserAndSessionIDByUserToken1_async)(objectManager, req, true);

    // Indicate to not include body, since it is meaningless for www errors
    req.body.__DO_NOT_INCLUDE__ = true;

    // Generate random ticket
    const issue_id = (Math.random().toString(36).substring(2, 5) +
    '-' +
    Math.random().toString(36).substring(2, 5) +
    '-' +
    Math.random().toString(36).substring(2, 5)).
    toUpperCase().
    replace('O', '0').
    replace('I', '1');

    if (req.body.err.message) {
      (0, _log.default)('error', 'WWW', {
        err: req.body.err,
        err_info: req.body.err_info,
        objectManager,
        req,
        issue_id });

    }

    res.json({ success: true, issue_id });
  } catch (err) {
    (0, _log.default)('error', 'rb-appbase-server serverClientError report: Failed', {
      step,
      err,
      body: req.body });

    res.status(500).send(
    JSON.stringify({
      error: 'Could not record error from client' }));


  }
}

serverClientError.post('/report', report);var _default =

serverClientError;exports.default = _default;
//# sourceMappingURL=serverClientError.js.map