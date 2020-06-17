"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap' } });



class ToDo_Properties extends _react.default.Component









{
  constructor(props, context) {
    super(props, context);this.








    _handle_Close = () => {
      this.props.handlerClose();
    };this.

    _handle_OK = () => {
      this.props.handlerUpdate({ ToDo_Text: this.state.ToDo_Text });

      this.props.handlerClose();
    };const { ToDo_Text } = this.props;this.state = { ToDo_Text };}

  render() {
    const { ToDo_Text } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_Dialog.default, { open: this.props.open, onClose: this._handle_Close }, /*#__PURE__*/
      _react.default.createElement(_DialogTitle.default, null, "ToDo"), /*#__PURE__*/
      _react.default.createElement(_DialogContent.default, null, /*#__PURE__*/
      _react.default.createElement(_TextField.default, {
        label: "To Do",
        fullWidth: true,
        value: ToDo_Text,
        onChange: event => this.setState({ ToDo_Text: event.target.value }) })), /*#__PURE__*/


      _react.default.createElement(_DialogActions.default, null, /*#__PURE__*/
      _react.default.createElement(_Button.default, { onClick: this._handle_Close }, "Cancel"), /*#__PURE__*/
      _react.default.createElement(_Button.default, { onClick: this._handle_OK, color: "primary" }, "OK")))));






  }}var _default =


(0, _styles.withStyles)(styles)(ToDo_Properties);exports.default = _default;
//# sourceMappingURL=ToDoProperties.js.map