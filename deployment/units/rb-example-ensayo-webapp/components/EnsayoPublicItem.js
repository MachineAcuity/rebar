"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardHeader = _interopRequireDefault(require("@material-ui/core/CardHeader"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));
var _htmlToReact = require("html-to-react");
var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _ResponsiveContentArea = _interopRequireDefault(require("../../rb-appbase-webapp/components/ResponsiveContentArea"));var _EnsayoPublicItem_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class EnsayoPublicItem extends _react.default.Component {
  render() {
    const { Viewer } = this.props;
    // In a fairly barbaric way, limit the length of headings so that they are not considered spam
    let contentH1 = Viewer.Ensayo.Ensayo_Title.substring(0, 100);
    let contentH2 = Viewer.Ensayo.Ensayo_Description.substring(0, 100);

    return /*#__PURE__*/(
      _react.default.createElement(_ResponsiveContentArea.default, null, /*#__PURE__*/
      _react.default.createElement(_reactHelmet.default, {
        title: Viewer.Ensayo.Ensayo_Title,
        meta: [
        { name: 'description', content: Viewer.Ensayo.Ensayo_Description }] }), /*#__PURE__*/


      _react.default.createElement(_Card.default, null, /*#__PURE__*/
      _react.default.createElement(_CardHeader.default, {
        title: /*#__PURE__*/_react.default.createElement("h1", null, contentH1),
        subheader: /*#__PURE__*/_react.default.createElement("h2", null, contentH2) }), /*#__PURE__*/

      _react.default.createElement(_CardContent.default, null,
      new _htmlToReact.Parser().parse(Viewer.Ensayo.Ensayo_Content)))));




  }}var _default =


(0, _reactRelay.createFragmentContainer)(EnsayoPublicItem, {
  Viewer: _EnsayoPublicItem_Viewer !== void 0 ? _EnsayoPublicItem_Viewer : _EnsayoPublicItem_Viewer = require("./__generated__/EnsayoPublicItem_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=EnsayoPublicItem.js.map