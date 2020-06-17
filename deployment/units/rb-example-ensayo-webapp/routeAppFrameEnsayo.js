"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Route = _interopRequireDefault(require("found/Route"));
var _reactCodeSplitting = _interopRequireDefault(require("react-code-splitting"));
var _reactRelay = require("react-relay");
var _react = _interopRequireDefault(require("react"));var _routeAppFrameEnsayo_EnsayoPublicList_Query, _routeAppFrameEnsayo_EnsayoPublicItem_Query, _routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query, _routeAppFrameEnsayo_EnsayoInPaceEditList_Query;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const EnsayoInPaceEditList = (props) => /*#__PURE__*/
_react.default.createElement(_reactCodeSplitting.default, { load: Promise.resolve().then(() => _interopRequireWildcard(require('./components/EnsayoInPaceEditList'))), componentProps: props });

const EnsayoInPaceEditScreen = (props) => /*#__PURE__*/
_react.default.createElement(_reactCodeSplitting.default, { load: Promise.resolve().then(() => _interopRequireWildcard(require('./components/EnsayoInPaceEditScreen'))), componentProps: props });

const EnsayoPublicList = (props) => /*#__PURE__*/
_react.default.createElement(_reactCodeSplitting.default, { load: Promise.resolve().then(() => _interopRequireWildcard(require('./components/EnsayoPublicList'))), componentProps: props });

const EnsayoPublicItem = (props) => /*#__PURE__*/
_react.default.createElement(_reactCodeSplitting.default, { load: Promise.resolve().then(() => _interopRequireWildcard(require('./components/EnsayoPublicItem'))), componentProps: props });var _default = /*#__PURE__*/



_react.default.createElement(_Route.default, { key: "ensayo", path: "ensayo" }, /*#__PURE__*/
_react.default.createElement(_Route.default, {
  path: "/",
  Component: EnsayoPublicList,
  query: _routeAppFrameEnsayo_EnsayoPublicList_Query !== void 0 ? _routeAppFrameEnsayo_EnsayoPublicList_Query : _routeAppFrameEnsayo_EnsayoPublicList_Query = require("./__generated__/routeAppFrameEnsayo_EnsayoPublicList_Query.graphql") }), /*#__PURE__*/







_react.default.createElement(_Route.default, { path: "item" }, /*#__PURE__*/
_react.default.createElement(_Route.default, {
  path: ":id",
  Component: EnsayoPublicItem,
  query: _routeAppFrameEnsayo_EnsayoPublicItem_Query !== void 0 ? _routeAppFrameEnsayo_EnsayoPublicItem_Query : _routeAppFrameEnsayo_EnsayoPublicItem_Query = require("./__generated__/routeAppFrameEnsayo_EnsayoPublicItem_Query.graphql") })), /*#__PURE__*/








_react.default.createElement(_Route.default, {
  path: "in-place-edit",
  Component: EnsayoInPaceEditScreen,
  query: _routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query !== void 0 ? _routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query : _routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query = require("./__generated__/routeAppFrameEnsayo_EnsayoInPaceEditScreen_Query.graphql") }, /*#__PURE__*/







_react.default.createElement(_Route.default, {
  Component: EnsayoInPaceEditList,
  query: _routeAppFrameEnsayo_EnsayoInPaceEditList_Query !== void 0 ? _routeAppFrameEnsayo_EnsayoInPaceEditList_Query : _routeAppFrameEnsayo_EnsayoInPaceEditList_Query = require("./__generated__/routeAppFrameEnsayo_EnsayoInPaceEditList_Query.graphql") })));exports.default = _default;
//# sourceMappingURL=routeAppFrameEnsayo.js.map