"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemSecondaryAction = _interopRequireDefault(require("@material-ui/core/ListItemSecondaryAction"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _DotsVertical = _interopRequireDefault(require("mdi-material-ui/DotsVertical"));
var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _ToDoUpdateStatusMutation = _interopRequireDefault(require("../../rb-example-todo-client/relay/ToDoUpdateStatusMutation"));
var _ToDoDeleteMutation = _interopRequireDefault(require("../../rb-example-todo-client/relay/ToDoDeleteMutation"));
var _ToDoUpdateRenameMutation = _interopRequireDefault(require("../../rb-example-todo-client/relay/ToDoUpdateRenameMutation"));

var _ToDoProperties = _interopRequireDefault(require("./ToDoProperties"));var _ToDoItem_Viewer, _ToDoItem_ToDo;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class ToDoItem extends _react.default.Component










{
  constructor(props, context) {
    super(props, context);this.








    _handle_onClickCheckbox = (event, ToDo_Complete) => {
      const { relay, Viewer, ToDo } = this.props;

      _ToDoUpdateStatusMutation.default.commit(
      relay.environment,
      Viewer,
      ToDo,
      ToDo_Complete);

    };this.

    _handle_Update_Properties = ToDo_properties => {
      const { relay, ToDo } = this.props;

      _ToDoUpdateRenameMutation.default.commit(
      relay.environment,
      ToDo,
      ToDo_properties.ToDo_Text);

    };this.

    _handle_Close_Properties = () => {
      this.setState({ propertiesIsOpen: false });
    };this.

    handleClickListItem = event => {
      this.setState({ menuIsOpen: true, anchorEl: event.currentTarget });
    };this.

    _handle_Menu_onClick_Edit = event => {
      this.setState({ menuIsOpen: false, propertiesIsOpen: true });
    };this.

    _handle_Menu_onClick_Delete = event => {
      this.setState({ menuIsOpen: false });

      const { relay, Viewer, ToDo } = this.props;

      _ToDoDeleteMutation.default.commit(relay.environment, Viewer, ToDo);
    };this.

    handleRequestClose = () => {
      this.setState({ menuIsOpen: false });
    };this.state = { anchorEl: undefined, menuIsOpen: false, propertiesIsOpen: false };}

  render() {
    const { ToDo_Complete, ToDo_Text } = this.props.ToDo;

    return (
      _react.default.createElement("div", null,
      _react.default.createElement(_ListItem.default, {
        button: true,
        "aria-haspopup": "true",
        "aria-controls": "lock-menu",
        onClick: event => this._handle_onClickCheckbox(event, !ToDo_Complete) },

      _react.default.createElement(_Checkbox.default, { checked: ToDo_Complete }),
      _react.default.createElement(_ListItemText.default, { primary: ToDo_Text }),
      _react.default.createElement(_ListItemSecondaryAction.default, null,
      _react.default.createElement(_IconButton.default, { onClick: this.handleClickListItem },
      _react.default.createElement(_DotsVertical.default, null)))),



      _react.default.createElement(_Menu.default, {
        id: "lock-menu",
        anchorEl: this.state.anchorEl,
        open: this.state.menuIsOpen,
        onClose: this.handleRequestClose },

      _react.default.createElement(_MenuItem.default, {
        key: "edit",
        onClick: event => this._handle_Menu_onClick_Edit(event) }, "Edit"),



      _react.default.createElement(_MenuItem.default, {
        key: "delete",
        onClick: event => this._handle_Menu_onClick_Delete(event) }, "Delete")),




      _react.default.createElement(_ToDoProperties.default, {
        ToDo_Text: ToDo_Text,
        handlerUpdate: this._handle_Update_Properties,
        handlerClose: this._handle_Close_Properties,
        open: this.state.propertiesIsOpen })));



  }}var _default =


(0, _reactRelay.createFragmentContainer)(ToDoItem, {
  Viewer: _ToDoItem_Viewer !== void 0 ? _ToDoItem_Viewer : _ToDoItem_Viewer = require("./__generated__/ToDoItem_Viewer.graphql"),




  ToDo: _ToDoItem_ToDo !== void 0 ? _ToDoItem_ToDo : _ToDoItem_ToDo = require("./__generated__/ToDoItem_ToDo.graphql") });exports.default = _default;
//# sourceMappingURL=ToDoItem.js.map