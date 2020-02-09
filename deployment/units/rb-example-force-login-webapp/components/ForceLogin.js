"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardHeader = _interopRequireDefault(require("@material-ui/core/CardHeader"));

var _styles = require("@material-ui/core/styles");

var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _RequiresAuthentication = _interopRequireDefault(require("../../rb-account-management-webapp/components/RequiresAuthentication"));
var _ResponsiveContentArea = _interopRequireDefault(require("../../rb-appbase-webapp/components/ResponsiveContentArea"));var _ForceLogin_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const styles = theme => ({
  card: {
    minWidth: 275 } });



class ForceLogin extends _react.default.Component {
  render() {
    const { classes, Viewer } = this.props;

    if (Viewer.User_IsAnonymous) return _react.default.createElement(_RequiresAuthentication.default, null);
    // Anonymous users do not get to have a profile
    else
      return (
        _react.default.createElement(_ResponsiveContentArea.default, null,
        _react.default.createElement(_Card.default, { className: classes.card },
        _react.default.createElement(_CardHeader.default, {
          title: "Only Authorized",
          subheader: "Only users who log in see this." }),

        _react.default.createElement(_CardContent.default, null,
        _react.default.createElement(_Typography.default, { paragraph: true }, "Content seen by authorized users")))));






  }}var _default =


(0, _reactRelay.createFragmentContainer)((0, _styles.withStyles)(styles)(ForceLogin), {
  Viewer: _ForceLogin_Viewer !== void 0 ? _ForceLogin_Viewer : _ForceLogin_Viewer = require("./__generated__/ForceLogin_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=ForceLogin.js.map