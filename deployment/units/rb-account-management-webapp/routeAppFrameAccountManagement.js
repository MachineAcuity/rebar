"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Route = _interopRequireDefault(require("found/lib/Route"));
var _reactCodeSplitting = _interopRequireDefault(require("react-code-splitting"));
var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");var _routeAppFrameAccountManagement_UserProfileScreen_Query;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const ChangeSecretScreen = (props) =>
_react.default.createElement(_reactCodeSplitting.default, { load: Promise.resolve().then(() => _interopRequireWildcard(require('./components/ChangeSecretScreen'))), componentProps: props });


const UserProfileScreen = (props) =>
_react.default.createElement(_reactCodeSplitting.default, { load: Promise.resolve().then(() => _interopRequireWildcard(require('./components/UserProfileScreen'))), componentProps: props });


const LogoutScreen = (props) =>
_react.default.createElement(_reactCodeSplitting.default, { load: Promise.resolve().then(() => _interopRequireWildcard(require('./components/LogoutScreen'))), componentProps: props });


const NewUserScreen = (props) =>
_react.default.createElement(_reactCodeSplitting.default, { load: Promise.resolve().then(() => _interopRequireWildcard(require('./components/NewUserScreen'))), componentProps: props });var _default =



_react.default.createElement(_Route.default, { key: "user", path: "user" },
_react.default.createElement(_Route.default, { path: "new", Component: NewUserScreen }),

_react.default.createElement(_Route.default, {
  key: "profile",
  path: "profile",
  Component: UserProfileScreen,
  query: _routeAppFrameAccountManagement_UserProfileScreen_Query !== void 0 ? _routeAppFrameAccountManagement_UserProfileScreen_Query : _routeAppFrameAccountManagement_UserProfileScreen_Query = require("./__generated__/routeAppFrameAccountManagement_UserProfileScreen_Query.graphql") }),








_react.default.createElement(_Route.default, { path: "change-secret", Component: ChangeSecretScreen }),

_react.default.createElement(_Route.default, { path: "logout", Component: LogoutScreen }));exports.default = _default;
//# sourceMappingURL=routeAppFrameAccountManagement.js.map