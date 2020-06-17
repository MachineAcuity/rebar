"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Alert = _interopRequireDefault(require("@material-ui/lab/Alert"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Card = _interopRequireDefault(require("@material-ui/core/Card"));
var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));
var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));
var _LinearProgress = _interopRequireDefault(require("@material-ui/core/LinearProgress"));
var _styles = require("@material-ui/core/styles");
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _Logout = _interopRequireDefault(require("mdi-material-ui/Logout"));
var _react = _interopRequireDefault(require("react"));

var _CompositeCardHeader = _interopRequireWildcard(require("../../rb-appbase-webapp/components/CompositeCardHeader"));


var _ResponsiveContentArea = _interopRequireDefault(require("../../rb-appbase-webapp/components/ResponsiveContentArea"));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

const styles = theme => ({
  card: {
    minWidth: 350,
    maxWidth: 1200 },

  ..._CompositeCardHeader.cardHeaderContentStyles });


//

class LogoutScreen extends _react.default.Component







{
  constructor(props, context) {
    super(props, context);this.







    _handle_onClick_Logout = async () => {
      this.setState({ currentOperation: 'logging out' });

      try {
        const loc = window.location;
        const host = loc.protocol + '//' + loc.hostname + ':' + loc.port;

        const response = await fetch(host + '/auth/logout', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json' },

          body: '{}' });


        const responseData = await response.json();

        if (responseData.success) {
          // In case of success, notify user
          this.setState({ currentOperation: 'success' });
        } else {
          // In case of error, tell user what the error is
          this.setState({
            currentOperation: 'failure',
            errorMessage: responseData.error });

        }
      } catch (err) {
        // In case response could not be received properly, tell the user
        // In case of error, tell user what the error is
        this.setState({
          currentOperation: 'failure',
          errorMessage:
          'Did not receive proper response from server. Please try again. Message:' + err.message });

      }
    };this.

    _handle_onClick_CancelLogout = () => {
      this.setState({
        currentOperation: 'failure',
        errorMessage: 'User log out has been canceled' });

    };this.

    _handle_onClick_TryAgain = () => {
      this.setState({
        currentOperation: 'confirm',
        errorMessage: '' });

    };this.

    _handle_onClick_Continue = () => {
      window.location.replace('/');
    };this.state = { currentOperation: 'confirm', errorMessage: '' };}

  renderCreating() {
    const { classes } = this.props;

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_CompositeCardHeader.default, { icon: /*#__PURE__*/_react.default.createElement(_Logout.default, null), subTitle: "", title: "Log Out" }), /*#__PURE__*/

      _react.default.createElement(_Card.default, { className: classes.card }, /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement(_Alert.default, { variant: "outlined", severity: "info" }, "Logging out. Please wait ..."), /*#__PURE__*/


      _react.default.createElement(_CardContent.default, null, /*#__PURE__*/
      _react.default.createElement("br", null), " ", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement(_LinearProgress.default, { mode: "query" })), /*#__PURE__*/

      _react.default.createElement(_CardActions.default, null, /*#__PURE__*/
      _react.default.createElement(_Button.default, { onClick: this._handle_onClick_CancelLogout }, "Cancel")))));




  }

  renderSuccess() {
    const { classes } = this.props;

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_CompositeCardHeader.default, { icon: /*#__PURE__*/_react.default.createElement(_Logout.default, null), subTitle: "", title: "Log Out" }), /*#__PURE__*/

      _react.default.createElement(_Card.default, { className: classes.card }, /*#__PURE__*/
      _react.default.createElement(_CardContent.default, null, /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement(_Alert.default, { variant: "outlined", severity: "success" }, "You have been logged out.",
      ' ')), /*#__PURE__*/


      _react.default.createElement(_CardActions.default, null, /*#__PURE__*/
      _react.default.createElement(_Button.default, { onClick: this._handle_onClick_Continue }, "Continue")))));




  }

  renderFailure() {
    const { classes } = this.props;
    const { errorMessage } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_CompositeCardHeader.default, { icon: /*#__PURE__*/_react.default.createElement(_Logout.default, null), subTitle: "", title: "Log Out" }), /*#__PURE__*/

      _react.default.createElement(_Card.default, { className: classes.card }, /*#__PURE__*/
      _react.default.createElement(_CardContent.default, null, /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement(_Alert.default, { variant: "outlined", severity: "error" }, "Failed logging out because: ",
      errorMessage, "!")), /*#__PURE__*/


      _react.default.createElement(_CardActions.default, null, /*#__PURE__*/
      _react.default.createElement(_Button.default, { onClick: this._handle_onClick_TryAgain }, "Try Again")))));




  }

  renderPrompt() {
    const { classes } = this.props;

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_CompositeCardHeader.default, { icon: /*#__PURE__*/_react.default.createElement(_Logout.default, null), subTitle: "", title: "Log Out" }), /*#__PURE__*/

      _react.default.createElement(_Card.default, { className: classes.card }, /*#__PURE__*/
      _react.default.createElement(_CardContent.default, null, /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement(_Typography.default, { component: "h6" }, "You are currently logged in. Are you sure you want to log out?")), /*#__PURE__*/



      _react.default.createElement(_CardActions.default, null, /*#__PURE__*/
      _react.default.createElement(_Button.default, { onClick: this._handle_onClick_Logout }, "Yes, Log Out")))));




  }

  render() {
    const { currentOperation } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement(_ResponsiveContentArea.default, null,
      currentOperation === 'confirm' && this.renderPrompt(),
      currentOperation === 'logging out' && this.renderCreating(),
      currentOperation === 'success' && this.renderSuccess(),
      currentOperation === 'failure' && this.renderFailure()));


  }}var _default =


(0, _styles.withStyles)(styles)(LogoutScreen);exports.default = _default;
//# sourceMappingURL=LogoutScreen.js.map