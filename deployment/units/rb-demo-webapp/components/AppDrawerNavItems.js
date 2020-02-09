"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _styles = require("@material-ui/core/styles");

var _Inbox = _interopRequireDefault(require("mdi-material-ui/Inbox"));
var _Pencil = _interopRequireDefault(require("mdi-material-ui/Pencil"));
var _Contacts = _interopRequireDefault(require("mdi-material-ui/Contacts"));
var _MoveResize = _interopRequireDefault(require("mdi-material-ui/MoveResize"));
var _Lock = _interopRequireDefault(require("mdi-material-ui/Lock"));
var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _AppDrawerAccountItem = _interopRequireDefault(require("../../rb-account-management-webapp/components/AppDrawerAccountItem"));
var _NavMenuItemWithIcon = _interopRequireDefault(require("../../rb-appdrawer-webapp/components/NavMenuItemWithIcon"));var _AppDrawerNavItems_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

const styles = theme => ({
  container: {
    flex: 'initial',
    width: 250 },

  formControl: {
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1) },

  list: {
    flex: 'initial',
    width: 250 } });



//

class AppDrawerNavItems extends _react.default.Component




{
  render() {
    const { classes, Viewer, onClick } = this.props;

    return (
      _react.default.createElement("div", { className: classes.container },
      _react.default.createElement(_AppDrawerAccountItem.default, {
        key: "account",
        Viewer: Viewer,
        onClick: this.props.onClick }),

      _react.default.createElement(_List.default, { className: classes.list },
      _react.default.createElement(_NavMenuItemWithIcon.default, {
        icon: _react.default.createElement(_Inbox.default, null),
        label: "To Dos",
        onClick: () => onClick('/todo/') }),

      _react.default.createElement(_NavMenuItemWithIcon.default, {
        icon: _react.default.createElement(_Pencil.default, null),
        label: "Ensayo Edit",
        onClick: () => onClick('/ensayo/in-place-edit/') }),

      _react.default.createElement(_NavMenuItemWithIcon.default, {
        icon: _react.default.createElement(_Contacts.default, null),
        label: "Ensayo Public",
        onClick: () => onClick('/ensayo/') }),

      _react.default.createElement(_Divider.default, null),
      _react.default.createElement(_NavMenuItemWithIcon.default, {
        icon: _react.default.createElement(_MoveResize.default, null),
        label: "Viewport Dimensions",
        onClick: () => onClick('/viewport-dimensions/') }),

      _react.default.createElement(_NavMenuItemWithIcon.default, {
        icon: _react.default.createElement(_Lock.default, null),
        label: "Force Login",
        onClick: () => onClick('/force-login/') }))));




  }}


//export default withStyles(styles)(AppDrawerNavItems)
var _default =
(0, _reactRelay.createFragmentContainer)((0, _styles.withStyles)(styles)(AppDrawerNavItems), {
  Viewer: _AppDrawerNavItems_Viewer !== void 0 ? _AppDrawerNavItems_Viewer : _AppDrawerNavItems_Viewer = require("./__generated__/AppDrawerNavItems_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=AppDrawerNavItems.js.map