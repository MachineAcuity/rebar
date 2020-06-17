"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _react = _interopRequireDefault(require("react"));
var _reactRte = _interopRequireDefault(require("react-rte"));

var _styles = require("@material-ui/core/styles");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap' },

  richTextContainer: {
    width: '100%',
    height: 300,
    display: 'inline-block',
    position: 'relative' } });



class EnsayoInPlaceEditProperties extends _react.default.Component













{
  constructor(props, context) {
    super(props, context);this.










    _handle_OnChange_RTE_Ensayo_Content = value => {
      this.setState({
        Ensayo_Content_RTE: value });

    };this.

    _handle_Close = () => {
      this.props.handlerClose();
    };this.

    _handle_OK = () => {
      const { handlerClose, handlerUpdate } = this.props;

      handlerUpdate({
        Ensayo_Title: this.state.Ensayo_Title,
        Ensayo_Description: this.state.Ensayo_Description,
        Ensayo_Content: this.state.Ensayo_Content_RTE.toString('html') });


      handlerClose();
    };const { Ensayo_Title, Ensayo_Description, Ensayo_Content } = this.props;this.state = { Ensayo_Title, Ensayo_Description, Ensayo_Content_RTE: _reactRte.default.createValueFromString(Ensayo_Content, 'html') };}

  render() {
    const { classes } = this.props;
    const { Ensayo_Title, Ensayo_Description } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_Dialog.default, { open: true, onClose: this._handle_Close }, /*#__PURE__*/
      _react.default.createElement(_DialogTitle.default, null, "Ensayo"), /*#__PURE__*/

      _react.default.createElement(_DialogContent.default, null, /*#__PURE__*/
      _react.default.createElement(_TextField.default, {
        label: "Title",
        fullWidth: true,
        value: Ensayo_Title,
        onChange: event => this.setState({ Ensayo_Title: event.target.value }) }), /*#__PURE__*/

      _react.default.createElement(_TextField.default, {
        label: "Description",
        fullWidth: true,
        value: Ensayo_Description,
        onChange: event => this.setState({ Ensayo_Description: event.target.value }) }), /*#__PURE__*/

      _react.default.createElement("div", { className: classes.richTextContainer },
      _reactRte.default == null ? /*#__PURE__*/
      _react.default.createElement("div", null) : /*#__PURE__*/

      _react.default.createElement(_reactRte.default, {
        value: this.state.Ensayo_Content_RTE,
        onChange: this._handle_OnChange_RTE_Ensayo_Content }))), /*#__PURE__*/





      _react.default.createElement(_DialogActions.default, null, /*#__PURE__*/
      _react.default.createElement(_Button.default, { onClick: this._handle_Close }, "Cancel"), /*#__PURE__*/
      _react.default.createElement(_Button.default, { onClick: this._handle_OK, color: "primary" }, "OK")))));






  }}var _default =


(0, _styles.withStyles)(styles)(EnsayoInPlaceEditProperties);exports.default = _default;
//# sourceMappingURL=EnsayoInPlaceEditProperties.js.map