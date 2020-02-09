"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateEmail = validateEmail;exports.default = void 0;

var _Alert = _interopRequireDefault(require("@material-ui/lab/Alert"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Card = _interopRequireDefault(require("@material-ui/core/Card"));
var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));
var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));
var _LinearProgress = _interopRequireDefault(require("@material-ui/core/LinearProgress"));
var _styles = require("@material-ui/core/styles");
var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));
var _Account = _interopRequireDefault(require("mdi-material-ui/Account"));
var _react = _interopRequireDefault(require("react"));
var _CompositeCardHeader = _interopRequireWildcard(require("../../rb-appbase-webapp/components/CompositeCardHeader"));


var _ResponsiveContentArea = _interopRequireDefault(require("../../rb-appbase-webapp/components/ResponsiveContentArea"));
var _NewUserSecretInput = _interopRequireDefault(require("./NewUserSecretInput"));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

function validateEmail(accountIdentifier) {
  // eslint-disable-next-line no-control-regex
  const reEmail = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
  return reEmail.test(accountIdentifier);
}

//

const styles = {
  card: {
    minWidth: 350,
    maxWidth: 1200 },

  ..._CompositeCardHeader.cardHeaderContentStyles,
  userName: {
    borderWidth: 1,
    borderColor: '#c0c0c0',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10 } };



//

class NewUserScreen extends _react.default.Component










{
  constructor(props, context) {
    super(props, context);this.










    _handle_onClick_Create = async () => {
      const { UserAccount_Identifier, User_Secret } = this.state;

      this.setState({
        currentOperation: 'creating',
        User_Secret: '' // In order to prevent the password from being accessed later
      });

      try {
        const loc = window.location;
        const host = loc.protocol + '//' + loc.hostname + ':' + loc.port;

        const response = await fetch(host + '/auth/createuser', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json' },

          body: JSON.stringify({
            UserAccount_Identifier: UserAccount_Identifier,
            User_Secret: User_Secret }) });



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

    _handle_onClick_CancelCreation = () => {
      this.setState({
        currentOperation: 'failure',
        executionStatus: 'User creation has been canceled' });

    };this.

    _handle_onClick_TryAgain = () => {
      this.setState({
        currentOperation: 'prompt',
        executionStatus: '' });

    };this.

    _handle_onClick_Continue = () => {
      window.location.replace('/');
    };this.


























































































    _handle_onChange_Identifier = event => {
      const UserAccount_Identifier = event.target.value;
      const UserAccount_IdentifierValidity = validateEmail(UserAccount_Identifier);

      this.setState({ UserAccount_Identifier, UserAccount_IdentifierValidity });
    };this.

    _handle_onUpdateSecret = secret => {
      this.setState({ User_Secret: secret });
    };this.state = { currentOperation: 'prompt', executionStatus: '', UserAccount_Identifier: '', UserAccount_IdentifierValidity: false, User_Secret: '' };}renderCreating() {const { classes } = this.props;const { UserAccount_Identifier } = this.state;return _react.default.createElement("div", null, _react.default.createElement(_CompositeCardHeader.default, { icon: _react.default.createElement(_Account.default, { htmlColor: "#003c78" }), subTitle: "Creating, please wait", title: "New User" }), _react.default.createElement(_Card.default, { className: classes.card }, _react.default.createElement(_CardContent.default, null, _react.default.createElement("br", null), _react.default.createElement(_Alert.default, { variant: "outlined", severity: "info" }, "Creating user", _react.default.createElement("span", { className: classes.userName }, UserAccount_Identifier), ", please wait ..."), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement(_LinearProgress.default, { mode: "query" })), _react.default.createElement(_CardActions.default, null, _react.default.createElement(_Button.default, { onClick: this._handle_onClick_CancelCreation }, "Cancel"))));}renderSuccess() {const { classes } = this.props;const { UserAccount_Identifier } = this.state;return _react.default.createElement("div", null, _react.default.createElement(_CompositeCardHeader.default, { icon: _react.default.createElement(_Account.default, { htmlColor: "#003c78" }), subTitle: "Created", title: "New User" }), _react.default.createElement(_Card.default, { className: classes.card }, _react.default.createElement(_CardContent.default, null, _react.default.createElement("br", null), _react.default.createElement(_Alert.default, { variant: "outlined", severity: "success" }, "Created user", _react.default.createElement("span", { className: classes.userName }, UserAccount_Identifier))), _react.default.createElement(_CardActions.default, null, _react.default.createElement(_Button.default, { onClick: this._handle_onClick_Continue }, "Continue"))));}renderFailure() {const { classes } = this.props;const { UserAccount_Identifier, executionStatus } = this.state;return _react.default.createElement("div", null, _react.default.createElement(_CompositeCardHeader.default, { icon: _react.default.createElement(_Account.default, { htmlColor: "#ff0000" }), subTitle: "Failed", title: "New User" }), _react.default.createElement(_Card.default, { className: classes.card }, _react.default.createElement(_CardContent.default, null, _react.default.createElement("br", null), _react.default.createElement(_Alert.default, { variant: "outlined", severity: "error" }, "Failed creating user", _react.default.createElement("span", { className: classes.userName }, UserAccount_Identifier), "because ", executionStatus, ".")), _react.default.createElement(_CardActions.default, null, _react.default.createElement(_Button.default, { onClick: this._handle_onClick_TryAgain }, "Try Again"))));}

  renderPrompt() {
    const { classes } = this.props;
    const { UserAccount_Identifier, UserAccount_IdentifierValidity, User_Secret } = this.state;

    // User account identifier must be valid and secret must be present
    const createDisabled = !UserAccount_IdentifierValidity || User_Secret === '';

    return (
      _react.default.createElement("div", null,
      _react.default.createElement(_CompositeCardHeader.default, {
        icon: _react.default.createElement(_Account.default, { htmlColor: "#003c78" }),
        subTitle: "Create new user",
        title: "New User" }),


      _react.default.createElement(_Card.default, { className: classes.card },
      _react.default.createElement(_CardContent.default, null,
      _react.default.createElement(_TextField.default, {
        autoComplete: "username",
        fullWidth: true,
        label: "E-Mail Address",
        margin: "normal",
        value: UserAccount_Identifier,
        variant: "outlined",
        onChange: this._handle_onChange_Identifier }),


      _react.default.createElement("br", null),
      _react.default.createElement("br", null),

      _react.default.createElement(_NewUserSecretInput.default, { onUpdateSecret: this._handle_onUpdateSecret })),

      _react.default.createElement(_CardActions.default, null,
      _react.default.createElement(_Button.default, { disabled: createDisabled, onClick: this._handle_onClick_Create }, "Create")))));






  }

  render() {
    const { currentOperation } = this.state;

    return (
      _react.default.createElement(_ResponsiveContentArea.default, null,
      currentOperation === 'prompt' && this.renderPrompt(),
      currentOperation === 'creating' && this.renderCreating(),
      currentOperation === 'success' && this.renderSuccess(),
      currentOperation === 'failure' && this.renderFailure()));


  }}var _default =


(0, _styles.withStyles)(styles)(NewUserScreen);exports.default = _default;
//# sourceMappingURL=NewUserScreen.js.map