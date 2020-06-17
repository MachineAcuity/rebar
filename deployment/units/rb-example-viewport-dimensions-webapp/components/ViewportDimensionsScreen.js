"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardHeader = _interopRequireDefault(require("@material-ui/core/CardHeader"));

var _styles = require("@material-ui/core/styles");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _ResponsiveContentArea = _interopRequireDefault(require("../../rb-appbase-webapp/components/ResponsiveContentArea"));
var _ViewportContext = _interopRequireDefault(require("../../rb-appbase-webapp/components/ViewportContext"));var _ViewportDimensionsScreen_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const styles = {
  card: {
    minWidth: 275 } };



class ViewportDimensionsScreen extends _react.default.Component


{
  render() {
    const { classes } = this.props;

    return /*#__PURE__*/(
      _react.default.createElement(_ResponsiveContentArea.default, null, /*#__PURE__*/
      _react.default.createElement(_ViewportContext.default.Consumer, null,
      ({ totalWidth, totalHeight }) => {
        const data = [
        { name: 'totalWidth', value: totalWidth },
        { name: 'totalHeight', value: totalHeight }];


        return /*#__PURE__*/(
          _react.default.createElement(_Card.default, { className: classes.card }, /*#__PURE__*/
          _react.default.createElement(_CardHeader.default, { title: "Viewport Dimensions" }), /*#__PURE__*/
          _react.default.createElement(_Table.default, null, /*#__PURE__*/
          _react.default.createElement(_TableHead.default, null, /*#__PURE__*/
          _react.default.createElement(_TableRow.default, null, /*#__PURE__*/
          _react.default.createElement(_TableCell.default, null, "Property"), /*#__PURE__*/
          _react.default.createElement(_TableCell.default, { align: "right" }, "Value"))), /*#__PURE__*/


          _react.default.createElement(_TableBody.default, null,
          data.map(n => {
            return /*#__PURE__*/(
              _react.default.createElement(_TableRow.default, { key: n.name }, /*#__PURE__*/
              _react.default.createElement(_TableCell.default, null, n.name), /*#__PURE__*/
              _react.default.createElement(_TableCell.default, { align: "right" }, n.value)));


          }))), /*#__PURE__*/


          _react.default.createElement(_CardContent.default, null)));


      })));



  }}var _default =


(0, _reactRelay.createFragmentContainer)(
(0, _styles.withStyles)(styles)(ViewportDimensionsScreen),
{
  Viewer: _ViewportDimensionsScreen_Viewer !== void 0 ? _ViewportDimensionsScreen_Viewer : _ViewportDimensionsScreen_Viewer = require("./__generated__/ViewportDimensionsScreen_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=ViewportDimensionsScreen.js.map