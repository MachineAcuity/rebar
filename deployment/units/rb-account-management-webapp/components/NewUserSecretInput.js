"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _LinearProgress = _interopRequireDefault(require("@material-ui/core/LinearProgress"));
var _styles = require("@material-ui/core/styles");
var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _react = _interopRequireDefault(require("react"));

var _userIDAndSecret = require("../../_configuration/rb-account-management-webapp/userIDAndSecret");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}






//

function scoreSecret(
secret,
uniqueLettersAwardUntilRepetitions,
variationAwardCoefficient)
{
  let score = 0;
  if (!secret) return 0;

  // Award every unique letter until 5 repetitions
  let letters = {};
  for (let i = 0; i < secret.length; i++) {
    letters[secret[i]] = (letters[secret[i]] || 0) + 1;
    score += uniqueLettersAwardUntilRepetitions / letters[secret[i]];
  }

  // Bonus points for mixing it up
  let variations = {
    digits: /\d/.test(secret),
    lower: /[a-z]/.test(secret),
    upper: /[A-Z]/.test(secret),
    nonWords: /\W/.test(secret) };


  let variationCount = 0;
  for (let check in variations) variationCount += variations[check] === true ? 1 : 0;

  score += (variationCount - 1) * variationAwardCoefficient;

  return score;
}

//

const styles = {
  strengthColorPrimary: {
    backgroundColor: '#a0a0a0' },


  strengthBarColorPrimary_poor: {
    backgroundColor: '#a00000' },

  strengthBarColorPrimary_fair: {
    backgroundColor: '#0000a0' },

  strengthBarColorPrimary_good: {
    backgroundColor: '#00a000' } };



//

class NewUserSecretInput extends _react.default.Component








{
  constructor(props, context) {
    super(props, context);this.
















































    _handle_onChange_Secret = event => {
      const userSecret = event.target.value;

      this.setState({ userSecret });

      this.updateErrorAndValue(userSecret, this.state.userSecretConfirm);
    };this.

    _handle_onChange_SecretConfirm = event => {
      const userSecretConfirm = event.target.value;

      this.setState({ userSecretConfirm });

      this.updateErrorAndValue(this.state.userSecret, userSecretConfirm);
    };this.state = { userSecret: '', userSecretConfirm: '', userSecretPrompt: '', userSecretStrength: 0, userSecretQuality: 'poor' };}updateErrorAndValue(userSecret, userSecretConfirm) {// Collect errors
    let userSecretPrompt = ''; // If secrets match ....
    const bPasswordsMatch = userSecret === userSecretConfirm;let determinedValue = bPasswordsMatch ? userSecret : '';if (!bPasswordsMatch) {userSecretPrompt = 'Passwords do not match';} // Determine secret complexity
    const userSecretStrength = scoreSecret(userSecret, _userIDAndSecret.uniqueLettersAwardUntilRepetitions, _userIDAndSecret.variationAwardCoefficient); // Determine secret quality
    const userSecretQuality = userSecretStrength >= _userIDAndSecret.userSecretStrengthGood ? 'good' : userSecretStrength >= _userIDAndSecret.userSecretStrengthFair ? 'fair' : 'poor';if (userSecretPrompt === '') {userSecretPrompt = 'Password strength: ' + userSecretQuality;} // If quality is not gooe enough, clear
    if (userSecretQuality === 'poor') {determinedValue = '';}this.props.onUpdateSecret(determinedValue);this.setState({ userSecretPrompt, userSecretQuality, userSecretStrength });}render() {const { classes } = this.props;const { userSecret,
      userSecretConfirm,
      userSecretPrompt,
      userSecretQuality,
      userSecretStrength } =
    this.state;

    return (
      _react.default.createElement("div", null,
      _react.default.createElement(_TextField.default, {
        autoComplete: "new-password",
        fullWidth: true,
        label: "Password",
        margin: "normal",
        type: "password",
        value: userSecret,
        variant: "outlined",
        onChange: this._handle_onChange_Secret }),


      _react.default.createElement(_TextField.default, {
        autoComplete: "new-password",
        fullWidth: true,
        label: "Confirm password",
        margin: "normal",
        type: "password",
        value: userSecretConfirm,
        variant: "outlined",
        onChange: this._handle_onChange_SecretConfirm }),


      _react.default.createElement(_Typography.default, { variant: "subtitle1", gutterBottom: true },
      _react.default.createElement("br", null),
      userSecretPrompt),


      _react.default.createElement(_LinearProgress.default, {
        classes: {
          colorPrimary: classes.strengthColorPrimary,
          barColorPrimary: classes['strengthBarColorPrimary_' + userSecretQuality] },

        value: 50 * userSecretStrength / _userIDAndSecret.userSecretStrengthGood,
        variant: "determinate" })));



  }}var _default =


(0, _styles.withStyles)(styles)(NewUserSecretInput);exports.default = _default;
//# sourceMappingURL=NewUserSecretInput.js.map