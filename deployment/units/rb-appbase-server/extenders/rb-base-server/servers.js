"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = servers;

var _serverAuth = _interopRequireDefault(require("../../serverAuth"));
var _serverClientError = _interopRequireDefault(require("../../serverClientError"));
var _serverGraphQL = _interopRequireDefault(require("../../serverGraphQL"));
var _serverWebApp = _interopRequireDefault(require("../../serverWebApp"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function servers(router, firstPathElementIsArtifactName) {
  const firstPathElement = firstPathElementIsArtifactName ? '/:artifact_name' : '';

  router.use(firstPathElement + '/auth', _serverAuth.default);
  router.use(firstPathElement + '/client-error', _serverClientError.default);
  router.use(firstPathElement + '/graphql', _serverGraphQL.default);
  router.use(_serverWebApp.default);
}
//# sourceMappingURL=servers.js.map