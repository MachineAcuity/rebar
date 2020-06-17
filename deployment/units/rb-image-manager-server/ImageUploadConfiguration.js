"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _ObjectManager = _interopRequireDefault(require("../rb-base-server/ObjectManager"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

/**
 * Base class for image upload configuration
 */
class ImageUploadConfiguration {
  /** Detemines whether this configuration applies to the provided request */
  isProperConfiguration(req) {
    throw new Error('not implemented');
  }

  /** Verify that the currently logged in user has permissions to upload */
  async verifyUserPermissions(objectManager, req) {
    throw new Error('not implemented');
  }

  /** Generates local, and returned, file name for the upload */
  async generateFileNames_async(
  objectManager,
  req)
  {
    throw new Error('not implemented');
  }}exports.default = ImageUploadConfiguration;
//# sourceMappingURL=ImageUploadConfiguration.js.map