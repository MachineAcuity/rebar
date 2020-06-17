"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Alert = _interopRequireDefault(require("@material-ui/lab/Alert"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));
var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));
var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));
var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));
var _LinearProgress = _interopRequireDefault(require("@material-ui/core/LinearProgress"));
var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _styles = require("@material-ui/core/styles");
var _react = _interopRequireDefault(require("react"));

var _authPassportConfiguration = _interopRequireDefault(require("../../_configuration/rb-appbase-universal/authPassportConfiguration"));
var _routeAfterLogin = _interopRequireDefault(require("../../_configuration/rb-account-management-webapp/routeAfterLogin"));

var _LoginDialogThirdPartyLoginButton = _interopRequireDefault(require("./LoginDialogThirdPartyLoginButton"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

const arrAuthPassportConfigurationEntries = Object.entries(_authPassportConfiguration.default);

//

const styles = theme => ({
  dialogPaper: {
    minWidth: 320 },

  grow: {
    flex: '1 1 auto' },

  userName: {
    borderWidth: 1,
    borderColor: '#c0c0c0',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10 },

  thirdPartyButtonsContainer: {
    alignItems: 'justify',
    display: 'grid',
    gridGap: 16,
    gridTemplateColumns: 'auto auto',
    justifyItems: 'center',
    padding: 16 } });



//

class LoginDialog extends _react.default.Component












{
  constructor(props, context) {
    super(props, context);this.









    _handle_Close = () => {
      this.props.handlerClose();
    };this.

    _handle_onClick_LogIn = async () => {
      const { UserAccount_Identifier, User_Secret } = this.state;

      this.setState({
        currentOperation: 'in progress',
        User_Secret: '' // In order to prevent the password from being accessed later
      });

      try {
        const loc = window.location;
        const host = loc.protocol + '//' + loc.hostname + ':' + loc.port;

        const response = await fetch(host + '/auth/login', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json' },

          body: JSON.stringify({
            UserAccount_Identifier: UserAccount_Identifier,
            User_Secret: User_Secret }) });



        const responseData = await response.json();

        if (responseData.success) {
          // In case of success, realod the application from server
          window.location.replace(
          window.location.pathname === '/' ? _routeAfterLogin.default : window.location.pathname);

        } else {
          // In case of error, tell user what the error is
          this.setState({
            currentOperation: 'failure',
            errorMessage: responseData.error });
          // ZZZ Does server really send the reason for the failed login?
        }
      } catch (err) {
        // In case response could not be received properly, tell the user
        // In case of error, tell user what the error is
        this.setState({
          currentOperation: 'failure',
          errorMessage:
          'Did not receive proper response from server. Please try again later. Error:' +
          err.message });

      }
    };this.

    _handle_onCLick_NewUser = () => {
      this.props.handlerNewUser();
    };this.

    _handle_onCLick_CancelLogIn = () => {
      this.setState({
        currentOperation: 'failure',
        errorMessage: 'Log in has been canceled' });

    };this.

    _handle_onClick_TryAgain = () => {
      this.setState({
        currentOperation: 'challenge',
        errorMessage: '' });

    };this.state = { currentOperation: 'challenge', errorMessage: '', UserAccount_Identifier: '', User_Secret: '' };}

  renderThirdPartyLogin(party) {}

  renderChallenge() {
    const { classes, open } = this.props;
    const { UserAccount_Identifier, User_Secret } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement(_Dialog.default, {
        classes: { paper: classes.dialogPaper },
        open: open,
        scroll: "body",
        onClose: this._handle_Close }, /*#__PURE__*/

      _react.default.createElement(_DialogTitle.default, null, "Log In"), /*#__PURE__*/

      _react.default.createElement(_Divider.default, null), /*#__PURE__*/
      _react.default.createElement(_DialogContent.default, null, /*#__PURE__*/
      _react.default.createElement(_Typography.default, { variant: "subtitle1", gutterBottom: true }, "Using user name and password:"), /*#__PURE__*/


      _react.default.createElement(_TextField.default, {
        autoComplete: "username",
        fullWidth: true,
        label: "E-Mail Address",
        margin: "normal",
        value: UserAccount_Identifier,
        variant: "outlined",
        onChange: event => this.setState({ UserAccount_Identifier: event.target.value }) }), /*#__PURE__*/

      _react.default.createElement(_TextField.default, {
        autoComplete: "current-password",
        fullWidth: true,
        label: "Password",
        margin: "normal",
        type: "password",
        value: User_Secret,
        variant: "outlined",
        onChange: event => this.setState({ User_Secret: event.target.value }),
        onKeyPress: ev => {
          if (ev.key === 'Enter') {
            this._handle_onClick_LogIn();
            ev.preventDefault();
          }
        } })), /*#__PURE__*/



      _react.default.createElement(_DialogActions.default, null, /*#__PURE__*/
      _react.default.createElement(_Button.default, { color: "primary", onClick: this._handle_onCLick_NewUser }, "New User"), /*#__PURE__*/


      _react.default.createElement("div", { className: classes.grow }), /*#__PURE__*/
      _react.default.createElement(_Button.default, { onClick: this._handle_Close }, "Cancel"), /*#__PURE__*/
      _react.default.createElement(_Button.default, { color: "primary", onClick: this._handle_onClick_LogIn }, "Log In")),




      arrAuthPassportConfigurationEntries.length > 0 && /*#__PURE__*/
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement(_Divider.default, null), /*#__PURE__*/
      _react.default.createElement(_DialogContent.default, null, /*#__PURE__*/
      _react.default.createElement(_Typography.default, { variant: "subtitle1", gutterBottom: true }, "Using a third party:"), /*#__PURE__*/


      _react.default.createElement("div", { className: classes.thirdPartyButtonsContainer },
      arrAuthPassportConfigurationEntries.map(([party, partyDetails]) => /*#__PURE__*/
      _react.default.createElement(_LoginDialogThirdPartyLoginButton.default, { key: party, party: party })))))));







  }

  renderInProgress() {
    const { classes, open } = this.props;
    const { UserAccount_Identifier } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement(_Dialog.default, { classes: { paper: classes.dialogPaper }, open: open, onClose: this._handle_Close }, /*#__PURE__*/
      _react.default.createElement(_DialogTitle.default, null, "Logging in"), /*#__PURE__*/

      _react.default.createElement(_DialogContent.default, null, /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement(_Alert.default, { variant: "outlined", severity: "info" }, "Logging in as", /*#__PURE__*/

      _react.default.createElement("span", { className: classes.userName }, UserAccount_Identifier), "Please wait ..."), /*#__PURE__*/


      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement(_LinearProgress.default, { mode: "query" })), /*#__PURE__*/

      _react.default.createElement(_DialogActions.default, null, /*#__PURE__*/
      _react.default.createElement(_Button.default, { color: "primary", onClick: this._handle_onCLick_CancelLogIn }, "Cancel"))));





  }

  renderFailure() {
    const { classes, open } = this.props;
    const { UserAccount_Identifier, errorMessage } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement(_Dialog.default, { classes: { paper: classes.dialogPaper }, open: open, onClose: this._handle_Close }, /*#__PURE__*/
      _react.default.createElement(_DialogTitle.default, null, "Log In Failed"), /*#__PURE__*/

      _react.default.createElement(_DialogContent.default, null, /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement(_Alert.default, { variant: "outlined", severity: "error" }, "Failed loggin in as", /*#__PURE__*/

      _react.default.createElement("span", { className: classes.userName }, UserAccount_Identifier), " because:", ' ',
      errorMessage, "!")), /*#__PURE__*/


      _react.default.createElement(_DialogActions.default, null, /*#__PURE__*/
      _react.default.createElement(_Button.default, { onClick: this._handle_onClick_TryAgain }, "Try Again"))));



  }

  render() {
    const { currentOperation } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement("div", null,
      currentOperation === 'challenge' && this.renderChallenge(),
      currentOperation === 'in progress' && this.renderInProgress(),
      currentOperation === 'failure' && this.renderFailure()));


  }}var _default =


(0, _styles.withStyles)(styles)(LoginDialog);exports.default = _default;
//# sourceMappingURL=LoginDialog.js.map