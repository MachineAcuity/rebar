"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _react = _interopRequireDefault(require("react"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class NavMenuItemWithIcon extends _react.default.Component



{
  render() {
    return /*#__PURE__*/(
      _react.default.createElement(_ListItem.default, { button: true, onClick: this.props.onClick }, /*#__PURE__*/
      _react.default.createElement(_ListItemIcon.default, null, this.props.icon), /*#__PURE__*/
      _react.default.createElement(_ListItemText.default, { primary: this.props.label })));


  }}var _default =


NavMenuItemWithIcon;exports.default = _default;
//# sourceMappingURL=NavMenuItemWithIcon.js.map