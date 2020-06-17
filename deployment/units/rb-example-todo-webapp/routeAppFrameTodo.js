"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Route = _interopRequireDefault(require("found/Route"));
var _reactCodeSplitting = _interopRequireDefault(require("react-code-splitting"));
var _reactRelay = require("react-relay");
var _react = _interopRequireDefault(require("react"));var _routeAppFrameTodo_ToDoList_Query, _routeAppFrameTodo_ToDoScreen_Query;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const ToDoList = props => /*#__PURE__*/_react.default.createElement(_reactCodeSplitting.default, { load: Promise.resolve().then(() => _interopRequireWildcard(require('./components/ToDoList'))), componentProps: props });

const ToDoScreen = (props) => /*#__PURE__*/
_react.default.createElement(_reactCodeSplitting.default, { load: Promise.resolve().then(() => _interopRequireWildcard(require('./components/ToDoScreen'))), componentProps: props });


const ToDoListQuery = _routeAppFrameTodo_ToDoList_Query !== void 0 ? _routeAppFrameTodo_ToDoList_Query : _routeAppFrameTodo_ToDoList_Query = require("./__generated__/routeAppFrameTodo_ToDoList_Query.graphql");var _default = /*#__PURE__*/








_react.default.createElement(_Route.default, {
  key: "todo",
  path: "todo",
  Component: ToDoScreen,
  query: _routeAppFrameTodo_ToDoScreen_Query !== void 0 ? _routeAppFrameTodo_ToDoScreen_Query : _routeAppFrameTodo_ToDoScreen_Query = require("./__generated__/routeAppFrameTodo_ToDoScreen_Query.graphql") }, /*#__PURE__*/







_react.default.createElement(_Route.default, {
  Component: ToDoList,
  query: ToDoListQuery,
  prepareVariables: params => ({ ...params, status: 'any' }) }), /*#__PURE__*/

_react.default.createElement(_Route.default, { path: ":status", Component: ToDoList, query: ToDoListQuery }));exports.default = _default;
//# sourceMappingURL=routeAppFrameTodo.js.map