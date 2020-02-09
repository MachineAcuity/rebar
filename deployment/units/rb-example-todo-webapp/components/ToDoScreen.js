"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardHeader = _interopRequireDefault(require("@material-ui/core/CardHeader"));

var _styles = require("@material-ui/core/styles");

var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _ResponsiveContentArea = _interopRequireDefault(require("../../rb-appbase-webapp/components/ResponsiveContentArea"));
var _ToDoAddMutation = _interopRequireDefault(require("../../rb-example-todo-client/relay/ToDoAddMutation"));var _ToDoScreen_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const styles = theme => ({
  card: {
    minWidth: 275 } });



class ToDoScreen extends _react.default.Component









{
  constructor(props, context) {
    super(props, context);this.






    _handle_onKeyDown_AddToDo = e => {
      if (e.keyCode === 13) {
        const { relay, Viewer } = this.props;

        _ToDoAddMutation.default.commit(
        relay.environment,
        Viewer,
        this.state.ToDo_Text_New);


        this.setState({
          ToDo_Text_New: '' });

      }
    };this.

    _handle_OnChange = event => {
      this.setState({
        ToDo_Text_New: event.target.value });

    };this.state = { ToDo_Text_New: '' };}

  render() {
    const { classes } = this.props;

    return (
      _react.default.createElement(_ResponsiveContentArea.default, null,
      _react.default.createElement(_Card.default, { className: classes.card },
      _react.default.createElement(_CardHeader.default, { title: "TO DOs", subheader: "List of TO DOs for user" }),
      this.props.children,
      _react.default.createElement("div", { style: { marginLeft: 4, marginRight: 4 } }),
      _react.default.createElement(_TextField.default, {
        label: "What needs to be done?",
        value: this.state.ToDo_Text_New,
        fullWidth: true,
        onKeyDown: this._handle_onKeyDown_AddToDo,
        onChange: this._handle_OnChange }))));




  }}var _default =


(0, _reactRelay.createFragmentContainer)((0, _styles.withStyles)(styles)(ToDoScreen), {
  Viewer: _ToDoScreen_Viewer !== void 0 ? _ToDoScreen_Viewer : _ToDoScreen_Viewer = require("./__generated__/ToDoScreen_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=ToDoScreen.js.map