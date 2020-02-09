"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = servers;

var _serverImageManagerDownload = _interopRequireDefault(require("../../serverImageManagerDownload"));
var _serverImageManagerUpload = _interopRequireDefault(require("../../serverImageManagerUpload"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function servers(router, firstPathElementIsArtifactName) {
  const firstPathElement = firstPathElementIsArtifactName ? '/:artifact_name' : '';

  router.use(firstPathElement + '/rb-image-manager', _serverImageManagerDownload.default);
  router.use(firstPathElement + '/rb-image-manager', _serverImageManagerUpload.default);
}
//# sourceMappingURL=servers.js.map