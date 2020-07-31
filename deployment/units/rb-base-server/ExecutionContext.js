"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));
var _ObjectManager = _interopRequireDefault(require("./ObjectManager"));
var _template = require("../rb-base-universal/template");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const fs = _fs.default.promises;

// Read environment
require('dotenv').config();

//

const envRebarDataFilesLocation = process.env.REBAR_DATA_FILES_LOCATION;
if (envRebarDataFilesLocation == null || typeof envRebarDataFilesLocation !== 'string')
throw new Error(
'Error: Machine Acuity unit requires environment variable REBAR_DATA_FILES_LOCATION to be set');


//

// Each log record will have unique ID, time sequential, starting with 0 - is an index in array

// Each log object (unique EC) will have unique ID, will be recorded in the log record

// Each log record will have a payload

// Each log record will have a path








class ExecutionContext {










  static createRoot(params) {
    const ec = new ExecutionContext();

    ec.root = {
      ec,
      arrLogItems: [],
      nUniqueIDCounter: 0,
      objectManager: params.objectManager ? params.objectManager : null };

    ec.arrExecutionPath = [];
    ec.bLog = params.bLog !== undefined ? params.bLog : false;

    return ec;
  }

  spawn(params) {}

  addLog(log) {}

  om() {
    if (!this.root.objectManager) {
      throw new Error('rb-base-server/ec : ObjectManager not set');
    }

    return this.root.objectManager;
  }}exports.default = ExecutionContext;
//# sourceMappingURL=ExecutionContext.js.map