"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Alert = _interopRequireDefault(require("@material-ui/lab/Alert"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Card = _interopRequireDefault(require("@material-ui/core/Card"));
var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));
var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));
var _LinearProgress = _interopRequireDefault(require("@material-ui/core/LinearProgress"));
var _styles = require("@material-ui/core/styles");
var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));
var _LockReset = _interopRequireDefault(require("mdi-material-ui/LockReset"));
var _react = _interopRequireDefault(require("react"));

var _CompositeCardHeader = _interopRequireWildcard(require("../../rb-appbase-webapp/components/CompositeCardHeader"));


var _ResponsiveContentArea = _interopRequireDefault(require("../../rb-appbase-webapp/components/ResponsiveContentArea"));

var _NewUserSecretInput = _interopRequireDefault(require("./NewUserSecretInput"));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

const styles = {
  card: {
    minWidth: 350,
    maxWidth: 1200 },

  ..._CompositeCardHeader.cardHeaderContentStyles };


//

class ChangeSecretScreen extends _react.default.Component









{
  constructor(props, context) {
    super(props, context);this.









    _handle_onClick_Change = async () => {
      const { User_CurrentSecret, User_NewSecret } = this.state;

      this.setState({
        currentOperation: 'changing' });


      try {
        const loc = window.location;
        const host = loc.protocol + '//' + loc.hostname + ':' + loc.port;

        const response = await fetch(host + '/auth/change-secret', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json' },

          body: JSON.stringify({
            User_CurrentSecret,
            User_NewSecret }) });



        const responseData = await response.json();

        if (responseData.success) {
          // In case of success, notify user
          this.setState({ currentOperation: 'success' });
        } else {
          // In case of error, tell user what the error is
          this.setState({
            currentOperation: 'failure',
            executionStatus: responseData.error });

        }
      } catch (err) {
        // In case response could not be received properly, tell the user
        // In case of error, tell user what the error is
        this.setState({
          currentOperation: 'failure',
          executionStatus:
          'Did not receive proper response from server. Please try again. Message:' + err.message });

      }
    };this.

    _handle_onClick_CancelChange = () => {
      this.setState({
        currentOperation: 'failure',
        executionStatus: 'User creation has been canceled' });

    };this.

    _handle_onClick_TryAgain = () => {
      this.setState({
        User_CurrentSecret: '',
        currentOperation: 'prompt',
        executionStatus: '' });

    };this.

    _handle_onClick_Continue = () => {
      window.location.replace('/user/profile');
    };this.











































































    _handle_onChange_Identifier = event => {
      const User_CurrentSecret = event.target.value;

      this.setState({ User_CurrentSecret });
    };this.

    _handle_onUpdateSecret = secret => {
      this.setState({ User_NewSecret: secret });
    };this.state = { currentOperation: 'prompt', executionStatus: '', User_CurrentSecret: '', User_NewSecret: '' };}renderChanging() {const { classes } = this.props;return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_CompositeCardHeader.default, { icon: /*#__PURE__*/_react.default.createElement(_LockReset.default, null), subTitle: "", title: "Updating password" }), /*#__PURE__*/_react.default.createElement(_Card.default, { className: classes.card, raised: true }, /*#__PURE__*/_react.default.createElement(_CardContent.default, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_Alert.default, { variant: "outlined", severity: "info" }, "Updating password. Please wait ..."), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_LinearProgress.default, { mode: "query" })), /*#__PURE__*/_react.default.createElement(_CardActions.default, null, /*#__PURE__*/_react.default.createElement(_Button.default, { onClick: this._handle_onClick_CancelChange }, "Cancel"))));}renderSuccess() {const { classes } = this.props;return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_CompositeCardHeader.default, { icon: /*#__PURE__*/_react.default.createElement(_LockReset.default, null), subTitle: "", title: "Password changed" }), /*#__PURE__*/_react.default.createElement(_Card.default, { className: classes.card }, /*#__PURE__*/_react.default.createElement(_CardContent.default, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_Alert.default, { variant: "outlined", severity: "success" }, "Password successfully changed.")), /*#__PURE__*/_react.default.createElement(_CardActions.default, null, /*#__PURE__*/_react.default.createElement(_Button.default, { onClick: this._handle_onClick_Continue }, "Continue"))));}renderFailure() {const { classes } = this.props;const { executionStatus } = this.state;return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_CompositeCardHeader.default, { icon: /*#__PURE__*/_react.default.createElement(_LockReset.default, null), subTitle: "", title: "Failed to update password" }), /*#__PURE__*/_react.default.createElement(_Card.default, { className: classes.card }, /*#__PURE__*/_react.default.createElement(_CardContent.default, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_Alert.default, { variant: "outlined", severity: "error" }, "Updating password failed because ", executionStatus, ".")), /*#__PURE__*/_react.default.createElement(_CardActions.default, null, /*#__PURE__*/_react.default.createElement(_Button.default, { onClick: this._handle_onClick_TryAgain }, "Try Again"))));}

  renderPrompt() {
    const { classes } = this.props;
    const { User_CurrentSecret, User_NewSecret } = this.state;

    // User account identifier must be valid and secret must be present
    const createDisabled = User_CurrentSecret.length < 5 || User_NewSecret === '';

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_CompositeCardHeader.default, { icon: /*#__PURE__*/_react.default.createElement(_LockReset.default, null), subTitle: "", title: "Change password" }), /*#__PURE__*/

      _react.default.createElement(_Card.default, { className: classes.card }, /*#__PURE__*/
      _react.default.createElement(_CardContent.default, null, /*#__PURE__*/
      _react.default.createElement(_TextField.default, {
        autoComplete: "password",
        fullWidth: true,
        label: "Current (old) password",
        margin: "normal",
        type: "password",
        value: User_CurrentSecret,
        variant: "outlined",
        onChange: this._handle_onChange_Identifier }), /*#__PURE__*/


      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/

      _react.default.createElement(_NewUserSecretInput.default, { onUpdateSecret: this._handle_onUpdateSecret })), /*#__PURE__*/

      _react.default.createElement(_CardActions.default, null, /*#__PURE__*/
      _react.default.createElement(_Button.default, { disabled: createDisabled, onClick: this._handle_onClick_Change }, "Change")))));






  }

  render() {
    const { currentOperation } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement(_ResponsiveContentArea.default, null,
      currentOperation === 'prompt' && this.renderPrompt(),
      currentOperation === 'changing' && this.renderChanging(),
      currentOperation === 'success' && this.renderSuccess(),
      currentOperation === 'failure' && this.renderFailure()));


  }}var _default =


(0, _styles.withStyles)(styles)(ChangeSecretScreen);exports.default = _default;
//# sourceMappingURL=ChangeSecretScreen.js.map