"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = createImageUploadConfiguration;

var _ImageUploadConfiguration = _interopRequireDefault(require("../../rb-image-manager-server/ImageUploadConfiguration"));

var _ImageUploadConfiguration_rb_account_management = _interopRequireDefault(require("../../rb-account-management-server/extenders/rb-image-manager-server/ImageUploadConfiguration_rb_account_management"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function createImageUploadConfiguration(
arrImageUploadConfiguration)
{
  arrImageUploadConfiguration.push(new _ImageUploadConfiguration_rb_account_management.default());
}
//# sourceMappingURL=createImageUploadConfiguration.js.map