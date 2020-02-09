"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



var _express = _interopRequireDefault(require("express"));

var _serverNightlyMaintenanceExtenders = _interopRequireDefault(require("../_configuration/rb-base-server/serverNightlyMaintenanceExtenders"));
var _log = _interopRequireDefault(require("../rb-base-server/log"));
var _ObjectManager = _interopRequireWildcard(require("../rb-base-server/ObjectManager"));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // curl http://localhost:28603/serverNightlyMaintenance/start?secret=7IG5NRoy7JIQM96MtE8115VRNQgX8qpfs0uRh5IaMPSCjqj8XC2MKW2kS0fbNZxI02rkaDtqYCarczVcGH20WtKzUVm2Z9jromJw9QhmUSi4PGx92LikqN

// Read environment
require('dotenv').config();

//

const serverNightlyMaintenance = _serverNightlyMaintenanceExtenders.default ? (0, _express.default)() : null;

//

async function nightlyMaintenance_async(req, objectManager) {
  const executionStatus = { step: 'initialize' };

  try {
    if (!_serverNightlyMaintenanceExtenders.default) throw new Error();

    (0, _log.default)('info', 'rb-base-server serverNightlyMaintenance: start', { req });

    await (0, _serverNightlyMaintenanceExtenders.default)(objectManager, executionStatus);

    (0, _log.default)('info', 'rb-base-server serverNightlyMaintenance: finished successfully', { req });
  } catch (err) {
    (0, _log.default)('error', 'rb-base-server serverNightlyMaintenance execution: Failed', {
      err,
      executionStatus,
      req });

  }
}

//

async function nightlyMaintenance(req, res) {
  try {
    //  Check password
    if (req.query.secret !== process.env.REBAR_INTERNAL_CALL_SECRET) {
      throw new Error('Please provide secret');
    }

    const objectManager = await (0, _ObjectManager.getObjectManager)(req, res);

    if (!objectManager.siteInformation) {
      throw new Error('Site information not found');
    }

    // Notice that we will not wait for this to finish
    nightlyMaintenance_async(req, objectManager);

    res.json({ success: true });
  } catch (err) {
    (0, _log.default)('error', 'rb-base-server serverNightlyMaintenance launch: Failed', {
      err,
      req });

    res.status(500).json({
      error: 'Could not execute serverNightlyMaintenance',
      success: false });

  }
}

if (serverNightlyMaintenance) {
  serverNightlyMaintenance.get('/start', nightlyMaintenance);
}var _default =

serverNightlyMaintenance;exports.default = _default;
//# sourceMappingURL=serverNightlyMaintenance.js.map