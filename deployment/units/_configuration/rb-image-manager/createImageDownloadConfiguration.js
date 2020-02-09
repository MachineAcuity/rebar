"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = createImageDownloadConfiguration;

var _ImageDownloadConfiguration = _interopRequireDefault(require("../../rb-image-manager-server/ImageDownloadConfiguration"));

var _ImageDownloadConfiguration_rb_account_management = _interopRequireDefault(require("../../rb-account-management-server/extenders/rb-image-manager-server/ImageDownloadConfiguration_rb_account_management"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function createImageDownloadConfiguration(
arrImageDownloadConfiguration)
{
  arrImageDownloadConfiguration.push(new _ImageDownloadConfiguration_rb_account_management.default());
}
//# sourceMappingURL=createImageDownloadConfiguration.js.map