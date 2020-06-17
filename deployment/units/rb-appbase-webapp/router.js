"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.createResolver = createResolver;exports.routeConfig = routeConfig;exports.historyMiddlewares = void 0;

var _foundRelay = require("found-relay");
var _relayRuntime = require("relay-runtime");

var _createRoutes = _interopRequireDefault(require("../_configuration/rb-appbase-webapp/createRoutes"));

var _queryMiddleware = _interopRequireDefault(require("farce/queryMiddleware"));
var _makeRouteConfig = _interopRequireDefault(require("found/makeRouteConfig"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const historyMiddlewares = [_queryMiddleware.default];exports.historyMiddlewares = historyMiddlewares;

function createResolver(fetcher) {
  const environment = new _relayRuntime.Environment({
    network: _relayRuntime.Network.create((...args) => fetcher.fetch(...args)),
    store: new _relayRuntime.Store(new _relayRuntime.RecordSource()) });


  return new _foundRelay.Resolver(environment);
}

function routeConfig(siteConfiguration) {
  return (0, _makeRouteConfig.default)((0, _createRoutes.default)(siteConfiguration));
}
//# sourceMappingURL=router.js.map