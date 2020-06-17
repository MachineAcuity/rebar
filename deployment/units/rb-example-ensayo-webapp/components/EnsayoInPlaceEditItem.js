"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _EnsayoDeleteMutation = _interopRequireDefault(require("../../rb-example-ensayo-client/relay/EnsayoDeleteMutation"));
var _EnsayoUpdateMutation = _interopRequireDefault(require("../../rb-example-ensayo-client/relay/EnsayoUpdateMutation"));

var _EnsayoInPlaceEditProperties = _interopRequireDefault(require("./EnsayoInPlaceEditProperties"));var _EnsayoInPlaceEditItem_Viewer, _EnsayoInPlaceEditItem_Ensayo;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class EnsayoInPlaceEditItem extends _react.default.Component










{
  constructor(props, context) {
    super(props, context);this.








    _handle_Update_Properties = EnsayoInPlaceEditProperties => {
      const { Ensayo_Title, Ensayo_Description, Ensayo_Content } = EnsayoInPlaceEditProperties;
      const { relay, Ensayo } = this.props;

      _EnsayoUpdateMutation.default.commit(
      relay.environment,
      Ensayo,
      Ensayo_Title,
      Ensayo_Description,
      Ensayo_Content);

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

      const { relay, Viewer, Ensayo } = this.props;

      _EnsayoDeleteMutation.default.commit(relay.environment, Viewer, Ensayo);
    };this.

    handleRequestClose = () => {
      this.setState({ menuIsOpen: false });
    };this.state = { anchorEl: undefined, menuIsOpen: false, propertiesIsOpen: false };}

  render() {
    const { Ensayo_Title, Ensayo_Description, Ensayo_Content } = this.props.Ensayo;
    const { propertiesIsOpen } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_ListItem.default, {
        button: true,
        "aria-haspopup": "true",
        "aria-controls": "lock-menu",
        onClick: this.handleClickListItem }, /*#__PURE__*/

      _react.default.createElement(_ListItemText.default, { primary: Ensayo_Title, secondary: Ensayo_Description })), /*#__PURE__*/

      _react.default.createElement(_Menu.default, {
        id: "lock-menu",
        anchorEl: this.state.anchorEl,
        open: this.state.menuIsOpen,
        onClose: this.handleRequestClose }, /*#__PURE__*/

      _react.default.createElement(_MenuItem.default, { key: "edit", onClick: event => this._handle_Menu_onClick_Edit(event) }, "Edit"), /*#__PURE__*/


      _react.default.createElement(_MenuItem.default, { key: "delete", onClick: event => this._handle_Menu_onClick_Delete(event) }, "Delete")),



      propertiesIsOpen && /*#__PURE__*/
      _react.default.createElement(_EnsayoInPlaceEditProperties.default, {
        Ensayo_Title: Ensayo_Title,
        Ensayo_Description: Ensayo_Description,
        Ensayo_Content: Ensayo_Content,
        handlerUpdate: this._handle_Update_Properties,
        handlerClose: this._handle_Close_Properties })));




  }}var _default =


(0, _reactRelay.createFragmentContainer)(EnsayoInPlaceEditItem, {
  Viewer: _EnsayoInPlaceEditItem_Viewer !== void 0 ? _EnsayoInPlaceEditItem_Viewer : _EnsayoInPlaceEditItem_Viewer = require("./__generated__/EnsayoInPlaceEditItem_Viewer.graphql"),




  Ensayo: _EnsayoInPlaceEditItem_Ensayo !== void 0 ? _EnsayoInPlaceEditItem_Ensayo : _EnsayoInPlaceEditItem_Ensayo = require("./__generated__/EnsayoInPlaceEditItem_Ensayo.graphql") });exports.default = _default;
//# sourceMappingURL=EnsayoInPlaceEditItem.js.map