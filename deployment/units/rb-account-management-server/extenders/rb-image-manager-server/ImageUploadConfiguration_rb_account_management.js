"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _ensurePathExists = _interopRequireDefault(require("../../../rb-base-server/ensurePathExists"));
var _ImageUploadConfiguration = _interopRequireDefault(require("../../../rb-image-manager-server/ImageUploadConfiguration"));
var _ObjectManager = _interopRequireDefault(require("../../../rb-base-server/ObjectManager"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

// Read environment
require('dotenv').config();

//

const envRebarDataFilesLocation = process.env.REBAR_DATA_FILES_LOCATION;
if (envRebarDataFilesLocation == null || typeof envRebarDataFilesLocation !== 'string')
throw new Error(
'Error: Machine Acuity unit requires environment variable REBAR_DATA_FILES_LOCATION to be set');


const userFileLocation = _path.default.resolve(envRebarDataFilesLocation, 'user');

//

class ImageUploadConfiguration_rb_account_management extends _ImageUploadConfiguration.default {
  isProperConfiguration(req) {
    if (req.body && req.body.isUserProfilePhoto === 'true') return true;else
    return false;
  }

  async verifyUserPermissions(objectManager, req) {}

  async generateFileNames_async(
  objectManager,
  req)
  {
    const viewerUserIDAsString = objectManager.getViewerUserId().toString();

    // Create directory
    const usersDirectory = _path.default.resolve(userFileLocation);
    const userGroupDirectory = _path.default.resolve(usersDirectory, viewerUserIDAsString.substring(0, 2));
    const userDirectory = _path.default.resolve(userGroupDirectory, viewerUserIDAsString);
    const profileDirectory = _path.default.resolve(userDirectory, 'profile');

    await (0, _ensurePathExists.default)(usersDirectory);
    await (0, _ensurePathExists.default)(userGroupDirectory);
    await (0, _ensurePathExists.default)(userDirectory);
    await (0, _ensurePathExists.default)(profileDirectory);

    const localImageFileName = _path.default.resolve(profileDirectory, 'photo.jpg');
    const returnedImageFileName = 'n/a';

    return { localImageFileName, returnedImageFileName };
  }}exports.default = ImageUploadConfiguration_rb_account_management;
//# sourceMappingURL=ImageUploadConfiguration_rb_account_management.js.map