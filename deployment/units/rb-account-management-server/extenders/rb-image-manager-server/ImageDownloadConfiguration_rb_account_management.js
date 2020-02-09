"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));

var _nestedErrorStacks = _interopRequireDefault(require("nested-error-stacks"));

var _ImageDownloadConfiguration = _interopRequireDefault(require("../../../rb-image-manager-server/ImageDownloadConfiguration"));
var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

const fs = _fs.default.promises;

// Read environment
require('dotenv').config();

//

const envRebarDataFilesLocation = process.env.REBAR_DATA_FILES_LOCATION;
if (envRebarDataFilesLocation == null || typeof envRebarDataFilesLocation !== 'string')
throw new Error(
'Error: Machine Acuity unit requires environment variable REBAR_DATA_FILES_LOCATION to be set');


const designerFilesLocation = _path.default.resolve(envRebarDataFilesLocation, 'user');

//

const noProfilePicFileName = _path.default.resolve(
'units/rb-account-management-server/assets/user_photo_unavailable.png');


//

class ImageDownloadConfiguration_rb_account_management extends _ImageDownloadConfiguration.default {
  isProperConfiguration(req) {
    if (req.query && req.query.isUserProfilePhoto === 'true') return true;else
    return false;
  }

  async verifyUserPermissions(objectManager, req) {}

  async getLocalFileName_async(objectManager, req) {
    const viewerUserIDAsString = objectManager.getViewerUserId().toString();

    let localImageFileName = _path.default.resolve(
    designerFilesLocation,
    viewerUserIDAsString.substring(0, 2),
    viewerUserIDAsString,
    'profile',
    'photo.jpg');


    let localImageFileExists = false;
    try {
      const stats = await fs.stat(localImageFileName);
      if (stats.isFile()) {
        localImageFileExists = true;
      }
    } catch (err) {
      // If file not found it is OK - otherwise throw exception
      if (err.code !== 'ENOENT')
      throw new _nestedErrorStacks.default(
      'rb-account-management-server/ImageDownloadConfiguration_rb_account_management: Failed',
      err);

    }

    // Proviode stand-in for profile picture
    if (!localImageFileExists) {
      localImageFileName = noProfilePicFileName;
    }

    return localImageFileName;
  }}exports.default = ImageDownloadConfiguration_rb_account_management;
//# sourceMappingURL=ImageDownloadConfiguration_rb_account_management.js.map