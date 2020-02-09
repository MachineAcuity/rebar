"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _found = require("found");
var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));
var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));
var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));
var _styles = require("@material-ui/core/styles");
var _Account = _interopRequireDefault(require("mdi-material-ui/Account"));
var _AccountOutline = _interopRequireDefault(require("mdi-material-ui/AccountOutline"));
var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _RequiresAuthentication = require("./RequiresAuthentication");



var _LoginDialog = _interopRequireDefault(require("./LoginDialog"));var _NavBarAccountButton_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

const styles = {};

//

class NavBarAccountButton extends _react.default.Component










{
  constructor(props, context) {
    super(props, context);this.

















    _handle_onClick_Login = () => {
      this.setState({ loginDialogIsOpen: true, userMenuIsOpen: false });
    };this.

    _handle_onClick_Profile = () => {
      this.setState({ userMenuIsOpen: false });

      this.props.router.push('/user/profile');
    };this.

    _handle_Login_Close = () => {
      this.setState({ loginDialogIsOpen: false });
    };this.

    _handle_onClick_UserMenu = event => {
      this.setState({ userMenuIsOpen: true, anchorEl: event.currentTarget });
    };this.

    _handle_UserMenu_Close = () => {
      this.setState({ userMenuIsOpen: false });
    };this.

    _handle_onClick_Logout = () => {
      this.setState({ userMenuIsOpen: false });
      this.props.router.push('/user/logout');
    };this.

    _handle_Login_NewUser = () => {
      this.setState({ loginDialogIsOpen: false });

      this.props.router.push('/user/new');
    };this.state = { anchorEl: undefined, loginDialogIsOpen: false, userMenuIsOpen: false };} // Handle popping open the login dialog if authentication is required
  componentDidMount() {(0, _RequiresAuthentication.registerAuthenticationRequiredCallback)(this._handle_onClick_Login);}componentWillUnmount() {(0, _RequiresAuthentication.unregisterAuthenticationRequiredCallback)();}
  render() {
    const { Viewer } = this.props;
    const { User_IsAnonymous, User_DisplayName } = Viewer;
    const { loginDialogIsOpen, userMenuIsOpen } = this.state;

    return (
      _react.default.createElement("div", null,
      _react.default.createElement(_IconButton.default, {
        "aria-haspopup": "true",
        component: "div",
        onClick: User_IsAnonymous ? this._handle_onClick_Login : this._handle_onClick_UserMenu,
        color: "inherit" },

      User_IsAnonymous ? _react.default.createElement(_AccountOutline.default, null) : _react.default.createElement(_Account.default, null)),


      _react.default.createElement(_LoginDialog.default, {
        open: loginDialogIsOpen,
        handlerClose: this._handle_Login_Close,
        handlerNewUser: this._handle_Login_NewUser }),


      _react.default.createElement(_Menu.default, {
        id: "lock-menu",
        anchorEl: this.state.anchorEl,
        open: userMenuIsOpen,
        onClose: this._handle_UserMenu_Close },

      _react.default.createElement(_MenuItem.default, { component: "div", key: "profile", onClick: this._handle_onClick_Profile },
      User_DisplayName),

      _react.default.createElement(_MenuItem.default, { component: "div", key: "login", onClick: this._handle_onClick_Login }, "Change user"),


      _react.default.createElement(_MenuItem.default, { component: "div", key: "logout", onClick: this._handle_onClick_Logout }, "Log out"))));





  }}var _default =


(0, _reactRelay.createFragmentContainer)((0, _styles.withStyles)(styles)((0, _found.withRouter)(NavBarAccountButton)), {
  Viewer: _NavBarAccountButton_Viewer !== void 0 ? _NavBarAccountButton_Viewer : _NavBarAccountButton_Viewer = require("./__generated__/NavBarAccountButton_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=NavBarAccountButton.js.map