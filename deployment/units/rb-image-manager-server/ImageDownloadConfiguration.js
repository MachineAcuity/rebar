"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _ObjectManager = _interopRequireDefault(require("../rb-base-server/ObjectManager"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

class ImageDownloadConfiguration {
  /** Detemines whether this configuration applies to the provided request */
  isProperConfiguration(req) {
    throw new Error('not implemented');
  }

  /** Verify that the currently logged in user has permissions to download */
  async verifyUserPermissions(objectManager, req) {
    throw new Error('not implemented');
  }

  /** Determines the local file name to be served*/
  async getLocalFileName_async(objectManager, req) {
    throw new Error('not implemented');
  }}exports.default = ImageDownloadConfiguration;
//# sourceMappingURL=ImageDownloadConfiguration.js.map