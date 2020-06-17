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
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _react = _interopRequireDefault(require("react"));
var _reactRelay = require("react-relay");

var _ResponsiveContentArea = _interopRequireDefault(require("../../rb-appbase-webapp/components/ResponsiveContentArea"));
var _SiteConfigurationContext = _interopRequireDefault(require("../../rb-appbase-webapp/components/SiteConfigurationContext"));var _HomePageScreen_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const styles = {
  card: {
    minWidth: 275 } };



class HomePageScreen extends _react.default.Component


{
  render() {
    const { classes } = this.props;

    return /*#__PURE__*/(
      _react.default.createElement(_SiteConfigurationContext.default.Consumer, null,
      siteConfiguration => {
        const data = [
        {
          name: 'Rebar Version',
          value: siteConfiguration.webapp.rebarDemo.version },

        {
          name: 'Server OS',
          value: siteConfiguration.webapp.rebarDemo.OSType },

        {
          name: 'Server Host Name',
          value: siteConfiguration.webapp.rebarDemo.OSHostName },

        {
          name: 'Server Free Memory',
          value: siteConfiguration.webapp.rebarDemo.OSFreeMem },

        {
          name: 'Google Maps API Key',
          value: siteConfiguration.webapp.api.googleMapsJavascriptAPI }];



        return /*#__PURE__*/(
          _react.default.createElement(_ResponsiveContentArea.default, null, /*#__PURE__*/
          _react.default.createElement(_Card.default, { className: classes.card }, /*#__PURE__*/
          _react.default.createElement(_CardHeader.default, { title: "Rebar Demo" }), /*#__PURE__*/
          _react.default.createElement(_CardContent.default, null, /*#__PURE__*/
          _react.default.createElement(_Typography.default, { component: "p" }, "The ", /*#__PURE__*/
          _react.default.createElement("a", { href: "https://github.com/MachineAcuity/rebar" }, "Rebar"), " is and open source project representing basic foundation of the solutions we provide. It fully utilizes the react stack, and Node.js and Cassandra on the back end. It can be used both as boilerplate, as well as an educational tool with multiple examples available. Basic user account management including account creation, password strength indicator and user profile is also included. The boilerplate is optimized for supportability and update-ability. It allows us to update the multiple projects based on the boilerplate with minimum effort, providing new features, improvements and bug fixes. This is achieved through the following two approaches:", /*#__PURE__*/









          _react.default.createElement("br", null), /*#__PURE__*/
          _react.default.createElement("br", null)), /*#__PURE__*/

          _react.default.createElement(_Typography.default, { component: "ul" }, /*#__PURE__*/
          _react.default.createElement("li", null, /*#__PURE__*/
          _react.default.createElement("b", null, "Configurability"), " - All the configuration files, which include settings, CQL, JSON, snippets of JavaScript and JSX are separated from the common code."), /*#__PURE__*/


          _react.default.createElement("li", null, /*#__PURE__*/
          _react.default.createElement("b", null, "Modularity"), " - The applications built upon the boilerplate are separated into semi-independent units, which contain the necessary front-end, back end, relay, CQL, etc. code. The parameters and settings for those units are stored in the configuration folder for eacy updating.")))), /*#__PURE__*/







          _react.default.createElement("br", null), /*#__PURE__*/
          _react.default.createElement(_Card.default, { className: classes.card }, /*#__PURE__*/
          _react.default.createElement(_CardHeader.default, { title: "Site Configuration" }), /*#__PURE__*/
          _react.default.createElement(_CardContent.default, null, /*#__PURE__*/
          _react.default.createElement(_Typography.default, { component: "p" }, "These settings are derived from",
          ' ', /*#__PURE__*/
          _react.default.createElement("b", null, "_configuration/rb-base-server/siteSettings.js"), "."), /*#__PURE__*/

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


          })))))));






      }));


  }}var _default =


(0, _reactRelay.createFragmentContainer)((0, _styles.withStyles)(styles)(HomePageScreen), {
  Viewer: _HomePageScreen_Viewer !== void 0 ? _HomePageScreen_Viewer : _HomePageScreen_Viewer = require("./__generated__/HomePageScreen_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=HomePageScreen.js.map