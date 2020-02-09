"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _EnsayoInPlaceEditItem = _interopRequireDefault(require("./EnsayoInPlaceEditItem"));var _EnsayoInPaceEditList_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class EnsayoInPaceEditList extends _react.default.Component





{
  render() {
    const { Viewer } = this.props;
    const { Ensayos } = Viewer;

    return (
      _react.default.createElement("div", null,
      _react.default.createElement(_List.default, null,
      Ensayos.edges.map(({ node }) =>
      _react.default.createElement(_EnsayoInPlaceEditItem.default, {
        key: node.id,
        Viewer: Viewer,
        Ensayo: node })))));





  }}var _default =


(0, _reactRelay.createFragmentContainer)(EnsayoInPaceEditList, {
  Viewer: _EnsayoInPaceEditList_Viewer !== void 0 ? _EnsayoInPaceEditList_Viewer : _EnsayoInPaceEditList_Viewer = require("./__generated__/EnsayoInPaceEditList_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=EnsayoInPaceEditList.js.map