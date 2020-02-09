"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _found = require("found");
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Card = _interopRequireDefault(require("@material-ui/core/Card"));
var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));
var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));
var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));
var _styles = require("@material-ui/core/styles");
var _AccountSettings = _interopRequireDefault(require("mdi-material-ui/AccountSettings"));
var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _CompositeCardHeader = _interopRequireWildcard(require("../../rb-appbase-webapp/components/CompositeCardHeader"));


var _ImageManagerUploader = _interopRequireDefault(require("../../rb-image-manager-webapp/components/ImageManagerUploader"));
var _UserUpdateMutation = _interopRequireDefault(require("../../rb-account-management-client/relay/UserUpdateMutation"));
var _RequiresAuthentication = _interopRequireDefault(require("../../rb-account-management-webapp/components/RequiresAuthentication"));
var _ResponsiveContentArea = _interopRequireDefault(require("../../rb-appbase-webapp/components/ResponsiveContentArea"));var _UserProfileScreen_Viewer;function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

const styles = {
  card: {
    minWidth: 350,
    maxWidth: 1200 },

  ..._CompositeCardHeader.cardHeaderContentStyles };


//

class UserProfileScreen extends _react.default.Component

















{
  constructor(props, context) {
    super(props, context);_initialiseProps.call(this);

    const { User_DisplayName, User_PrimaryEmail, User_PrimaryPhone } = props.Viewer;

    const imageURL = 'Place original image url? How do we know if there is a photo?';

    this.state = { imageURL, User_DisplayName, User_PrimaryEmail, User_PrimaryPhone };
  }



































  render() {
    const { classes, Viewer } = this.props;

    if (Viewer.User_IsAnonymous) return _react.default.createElement(_RequiresAuthentication.default, null);

    const { imageURL, User_DisplayName, User_PrimaryEmail, User_PrimaryPhone } = this.state;

    return (
      _react.default.createElement(_ResponsiveContentArea.default, null,
      _react.default.createElement(_CompositeCardHeader.default, {
        icon: _react.default.createElement(_AccountSettings.default, { htmlColor: "#003c78" }),
        subTitle: "Profile & settings",
        title: "User" }),


      _react.default.createElement(_Card.default, { className: classes.card },
      _react.default.createElement(_CardContent.default, null,
      _react.default.createElement(_ImageManagerUploader.default, {
        label: "Profile photo",
        parameters: { isUserProfilePhoto: 'true' },
        value: imageURL,
        onChange: value => {
          this.setState({ imageURL: value });
        } }),


      _react.default.createElement(_TextField.default, {
        autoComplete: "name",
        fullWidth: true,
        label: "Display Name",
        margin: "normal",
        value: User_DisplayName,
        variant: "outlined",
        onChange: this._handle_onChange_DisplayName }),


      _react.default.createElement(_TextField.default, {
        autoComplete: "email",
        fullWidth: true,
        label: "Contact email (not account identifier)",
        margin: "normal",
        value: User_PrimaryEmail,
        variant: "outlined",
        onChange: this._handle_onChange_PrimaryEmail }),


      _react.default.createElement(_TextField.default, {
        autoComplete: "tel",
        fullWidth: true,
        label: "Contact phone",
        margin: "normal",
        value: User_PrimaryPhone,
        variant: "outlined",
        onChange: this._handle_onChange_PrimaryPhone })),



      _react.default.createElement(_CardActions.default, null,
      _react.default.createElement(_Button.default, { onClick: this._handle_onClick_Update }, "Update"),
      _react.default.createElement(_Button.default, { onClick: this._handle_onClick_ChangePassword }, "Change password")))));




  }}var _initialiseProps = function () {this._handle_onChange_DisplayName = event => {const User_DisplayName = event.target.value;this.setState({ User_DisplayName });};this._handle_onChange_PrimaryEmail = event => {const User_PrimaryEmail = event.target.value;this.setState({ User_PrimaryEmail });};this._handle_onChange_PrimaryPhone = event => {const User_PrimaryPhone = event.target.value;this.setState({ User_PrimaryPhone });};this._handle_onClick_ChangePassword = () => {this.props.router.push('/user/change-secret');};this._handle_onClick_Update = () => {const { User_DisplayName, User_PrimaryEmail, User_PrimaryPhone } = this.state;const { relay } = this.props;_UserUpdateMutation.default.commit(relay.environment, User_DisplayName, User_PrimaryEmail, User_PrimaryPhone);};};var _default =


(0, _reactRelay.createFragmentContainer)((0, _styles.withStyles)(styles)((0, _found.withRouter)(UserProfileScreen)), {
  Viewer: _UserProfileScreen_Viewer !== void 0 ? _UserProfileScreen_Viewer : _UserProfileScreen_Viewer = require("./__generated__/UserProfileScreen_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=UserProfileScreen.js.map