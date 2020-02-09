"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));
var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));
var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));
var _FilledInput = _interopRequireDefault(require("@material-ui/core/FilledInput"));
var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));
var _Select = _interopRequireDefault(require("@material-ui/core/Select"));
var _styles = require("@material-ui/core/styles");
var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _RequiresAuthentication = require("./RequiresAuthentication");



var _LoginDialog = _interopRequireDefault(require("./LoginDialog"));var _AppDrawerAccountItem_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

const styles = theme => ({
  formControl: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1) },

  loginButtonContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1) } });



//

class AppDrawerAccountItem extends _react.default.Component




{
  constructor(props, context) {
    super(props, context);this.















    _handle_onClick_Login = () => {
      this.setState({ loginDialogIsOpen: true });
    };this.

    _handle_onChange_Account = event => {
      const operation = event.target.value;

      if (operation === 'profile') {
        this.props.onClick('/user/profile');
      } else if (operation === 'login') {
        this.setState({ loginDialogIsOpen: true });
      } else if (operation === 'logout') {
        this.props.onClick('/user/logout');
      }
    };this.

    _handle_Login_Close = () => {
      this.setState({ loginDialogIsOpen: false });
    };this.

    _handle_Login_NewUser = () => {
      this.setState({ loginDialogIsOpen: false });

      this.props.onClick('/user/new');
    };this.state = { loginDialogIsOpen: false };} // Handle popping open the login dialog if authentication is required
  componentDidMount() {(0, _RequiresAuthentication.registerAuthenticationRequiredCallback)(() => this.setState({ loginDialogIsOpen: true }));}componentWillUnmount() {(0, _RequiresAuthentication.unregisterAuthenticationRequiredCallback)();}
  render() {
    const { classes, Viewer } = this.props;
    const { User_IsAnonymous, User_DisplayName } = Viewer;
    const { loginDialogIsOpen } = this.state;

    return (
      _react.default.createElement("div", { key: "appdrawer-account" },
      User_IsAnonymous &&
      _react.default.createElement("div", { className: classes.loginButtonContainer },
      _react.default.createElement(_Button.default, {
        color: "primary",
        fullWidth: true,
        key: "account-button",
        variant: "contained",
        onClick: this._handle_onClick_Login }, "Log In")),






      !User_IsAnonymous &&
      _react.default.createElement(_FormControl.default, {
        fullWidth: true,
        key: "account-list",
        variant: "filled",
        className: classes.formControl },

      _react.default.createElement(_InputLabel.default, { htmlFor: "user-account-select" }, "Current User"),
      _react.default.createElement(_Select.default, {
        id: "user-account-select",
        input: _react.default.createElement(_FilledInput.default, { name: "account" }),
        value: "userdisplayname",
        variant: "filled",
        onChange: this._handle_onChange_Account },

      _react.default.createElement(_MenuItem.default, { component: "div", key: "userdisplayname", value: "userdisplayname" },
      _react.default.createElement("em", null, User_DisplayName)),

      _react.default.createElement(_MenuItem.default, { component: "div", key: "profile", value: "profile" }, "Edit Profile"),


      _react.default.createElement(_Divider.default, null),
      _react.default.createElement(_MenuItem.default, { component: "div", key: "login", value: "login" }, "Change user"),


      _react.default.createElement(_MenuItem.default, { component: "div", key: "logout", value: "logout" }, "Log out"))),






      _react.default.createElement(_LoginDialog.default, {
        open: loginDialogIsOpen,
        handlerClose: this._handle_Login_Close,
        handlerNewUser: this._handle_Login_NewUser })));



  }}var _default =


(0, _reactRelay.createFragmentContainer)((0, _styles.withStyles)(styles)(AppDrawerAccountItem), {
  Viewer: _AppDrawerAccountItem_Viewer !== void 0 ? _AppDrawerAccountItem_Viewer : _AppDrawerAccountItem_Viewer = require("./__generated__/AppDrawerAccountItem_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=AppDrawerAccountItem.js.map