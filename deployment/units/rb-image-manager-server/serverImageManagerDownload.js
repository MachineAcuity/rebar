"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _createImageDownloadConfiguration = _interopRequireDefault(require("../_configuration/rb-image-manager/createImageDownloadConfiguration"));
var _log = _interopRequireDefault(require("../rb-base-server/log"));
var _ObjectManager = require("../rb-base-server/ObjectManager");
var _checkCredentials = require("../rb-appbase-server/checkCredentials");




var _ImageDownloadConfiguration = _interopRequireDefault(require("./ImageDownloadConfiguration"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

// Create image upload configuration

const arrImageDownloadConfiguration = [];
(0, _createImageDownloadConfiguration.default)(arrImageDownloadConfiguration);

function findImageDownloadConfiguration(req) {
  for (let imageDownloadConfiguration of arrImageDownloadConfiguration) {
    if (imageDownloadConfiguration.isProperConfiguration(req)) {
      return imageDownloadConfiguration;
    }
  }

  throw new Error(
  'rb-image-manager-server/serverImageManagerDownload: Could not find appropriate configuration');

}

//

const serverImageManagerDownload = (0, _express.default)();

// Route for image downloiads
serverImageManagerDownload.get('/download', async (req, res) => {
  try {
    // Get configuration
    const imageDownloadConfiguration = findImageDownloadConfiguration(req);

    // Create object manager
    const objectManager = await (0, _ObjectManager.getObjectManager)(req, res);

    // Verify credentials
    const UserAndSession = await (0, _checkCredentials.getUserAndSessionIDByUserToken1_async)(objectManager, req, true);
    if (!UserAndSession) throw new Error('Invalid user by UserToken1');

    const a_User = UserAndSession.User;

    const verificationIssue = (0, _checkCredentials.verifyUserToken2)(a_User, req, 'query');
    if (verificationIssue) throw new Error('Invalid user by UserToken2');

    // Verify user permissions
    imageDownloadConfiguration.verifyUserPermissions(objectManager, req);

    // Get local file name
    const localImageFileName = await imageDownloadConfiguration.getLocalFileName_async(
    objectManager,
    req);


    res.sendFile(localImageFileName);
  } catch (err) {
    const message = 'rb-image-manager-server/serverImageManagerDownload: Failed';
    (0, _log.default)('error', message, { err, req });
    res.status(500).send(JSON.stringify({ error: message }));
  }
});var _default =

serverImageManagerDownload;exports.default = _default;
//# sourceMappingURL=serverImageManagerDownload.js.map