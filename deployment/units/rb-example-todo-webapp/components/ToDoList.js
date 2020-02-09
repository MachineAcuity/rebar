"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _FormGroup = _interopRequireDefault(require("@material-ui/core/FormGroup"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _styles = require("@material-ui/core/styles");

var _found = require("found");
var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));

var _ToDoListUpdateMarkAllMutation = _interopRequireDefault(require("../../rb-example-todo-client/relay/ToDoListUpdateMarkAllMutation"));

var _ToDoItem = _interopRequireDefault(require("./ToDoItem"));var _ToDoList_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const styles = theme => ({});

class ToDoList extends _react.default.Component








{constructor(...args) {var _temp;return _temp = super(...args), this.
    _handle_onClick_MarkAll = (event, checked) => {
      const { match, relay, Viewer } = this.props;
      const { status } = match.params;
      const ToDo_Complete = checked;

      _ToDoListUpdateMarkAllMutation.default.commit(
      relay.environment,
      Viewer,
      Viewer.ToDos,
      ToDo_Complete,
      status);

    }, this.

    _handle_onChange = (event, tabsValue) => {
      const { router } = this.props;

      const url =
      tabsValue === 2 ?
      '/todo/completed' :
      tabsValue === 1 ? '/todo/active' : '/todo';

      router.push(url);
    }, _temp;}

  renderTabs() {
    const { match } = this.props;
    const { status } = match.params;

    const tabsValue = status === 'active' ? 1 : status === 'completed' ? 2 : 0;

    return (
      _react.default.createElement(_AppBar.default, { position: "static" },
      _react.default.createElement(_Tabs.default, { value: tabsValue, onChange: this._handle_onChange },
      _react.default.createElement(_Tab.default, { label: "All" }),
      _react.default.createElement(_Tab.default, { label: "Active" }),
      _react.default.createElement(_Tab.default, { label: "Completed" }))));



  }

  render() {
    const { Viewer } = this.props;
    const { ToDos, ToDo_TotalCount, ToDo_CompletedCount } = Viewer;

    if (!ToDo_TotalCount) {
      return null;
    }

    return (
      _react.default.createElement("div", null,
      this.renderTabs(),
      _react.default.createElement(_FormGroup.default, { row: true },
      _react.default.createElement(_FormControlLabel.default, {
        control:
        _react.default.createElement(_Checkbox.default, {
          checked: ToDo_TotalCount === ToDo_CompletedCount,
          onChange: this._handle_onClick_MarkAll }),


        label: "Mark all as complete" })),


      _react.default.createElement(_List.default, null,
      ToDos.edges.map(({ node }) =>
      _react.default.createElement(_ToDoItem.default, { key: node.id, Viewer: Viewer, ToDo: node })))));




  }}var _default =


(0, _reactRelay.createFragmentContainer)(
(0, _styles.withStyles)(styles)((0, _found.withRouter)(ToDoList)),
{
  Viewer: _ToDoList_Viewer !== void 0 ? _ToDoList_Viewer : _ToDoList_Viewer = require("./__generated__/ToDoList_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=ToDoList.js.map