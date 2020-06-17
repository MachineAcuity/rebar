"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));
var _Snackbar = _interopRequireDefault(require("@material-ui/core/Snackbar"));
var _Close = _interopRequireDefault(require("mdi-material-ui/Close"));
var _react = _interopRequireDefault(require("react"));

var _authPassportConfiguration = _interopRequireDefault(require("../../_configuration/rb-appbase-universal/authPassportConfiguration"));

var _IconLogoFacebook = _interopRequireDefault(require("./IconLogoFacebook"));
var _IconLogoGoogle = _interopRequireDefault(require("./IconLogoGoogle"));
var _IconLogoLinkedIn = _interopRequireDefault(require("./IconLogoLinkedIn"));
var _IconLogoMicrosoft = _interopRequireDefault(require("./IconLogoMicrosoft"));
var _IconLogoTwitter = _interopRequireDefault(require("./IconLogoTwitter"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

class LoginDialogThirdPartyLoginButton extends _react.default.Component


{
  constructor(props, context) {
    super(props, context);_initialiseProps.call(this);

    let disabled = false;
    const provider = _authPassportConfiguration.default[props.party];
    if (provider.disabled && !provider.disabled.disabledMessageText) {
      disabled = true;
    }

    this.state = { disabled, snackbar: false };
  }

























  render() {
    const { party } = this.props;
    const { disabled, snackbar } = this.state;

    const provider = _authPassportConfiguration.default[party];

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_Button.default, {
        color: "primary",
        disabled: disabled,
        href: '/auth/' + party,
        key: party,
        startIcon:
        party === 'facebook' ? /*#__PURE__*/
        _react.default.createElement(_IconLogoFacebook.default, null) :
        party === 'google' ? /*#__PURE__*/
        _react.default.createElement(_IconLogoGoogle.default, null) :
        party === 'linkedin' ? /*#__PURE__*/
        _react.default.createElement(_IconLogoLinkedIn.default, null) :
        party === 'microsoft' ? /*#__PURE__*/
        _react.default.createElement(_IconLogoMicrosoft.default, null) : /*#__PURE__*/

        _react.default.createElement(_IconLogoTwitter.default, null),


        onClick: this._handle_onClick_Provider },

      party),


      provider.disabled && /*#__PURE__*/
      _react.default.createElement(_Snackbar.default, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left' },

        open: snackbar,
        onClose: this._handle_onClose_Snackbar,
        message: provider.disabled.disabledMessageText,
        action: /*#__PURE__*/
        _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
        _react.default.createElement(_Button.default, { color: "secondary", size: "small", onClick: this._handle_onClose_Snackbar }, "Acknowledge"), /*#__PURE__*/


        _react.default.createElement(_IconButton.default, {
          size: "small",
          "aria-label": "close",
          color: "inherit",
          onClick: this._handle_onClose_Snackbar }, /*#__PURE__*/

        _react.default.createElement(_Close.default, { fontSize: "small" }))) })));







  }}var _initialiseProps = function () {this._handle_onClick_Provider = event => {const { party } = this.props;const provider = _authPassportConfiguration.default[party];if (provider.disabled && provider.disabled.disabledMessageText) {this.setState({ disabled: true, snackbar: true });event.preventDefault();}};this._handle_onClose_Snackbar = (event, reason) => {if (reason === 'clickaway') {return;}this.setState({ snackbar: false });};};var _default =


LoginDialogThirdPartyLoginButton;exports.default = _default;
//# sourceMappingURL=LoginDialogThirdPartyLoginButton.js.map