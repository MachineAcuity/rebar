"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.cardHeaderContentStyles = void 0;

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("@material-ui/core/styles");

var React = _interopRequireWildcard(require("react"));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function () {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

const styles = {
  cardContentRoot: {
    marginTop: 24,
    padding: 0 },

  cardHeaderRoot: {
    display: 'flex',
    marginLeft: 48,
    marginTop: -16,
    marginRight: 16,
    marginBottom: -16,
    maxWidth: 1200 - 64,
    position: 'relative',
    zIndex: 800 },

  cardHeaderIcon: {
    alignItems: 'center',
    //background: 'linear-gradient(20deg, #ffa000, #ffbe4d)',
    background: 'linear-gradient(60deg, #105cac, #003c78)',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    boxShadow:
    '0 12px 20px -10px rgba(0, 60, 120, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 152, 128, 0.2)',
    color: '#ffffff',
    display: 'grid',
    justifyItems: 'center',
    padding: 16,
    width: 72 },

  cardHeaderSeparator: {
    backgroundColor: 'rgb(0, 0, 0, 0)',
    width: 1 },

  cardHeaderInformation: {
    background: 'linear-gradient(60deg, #003c78, #1e64b4)',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    boxShadow:
    '0 12px 20px -10px rgba(0, 60, 120, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 152, 128, 0.2)',
    color: '#ffffff',
    flex: 1,
    padding: 16 },

  cardHeaderSubHeader: {
    color: '#c0c0c0' },

  cardHeaderTitle: {
    color: '#ffffff' } };



//

const cardHeaderContentStyles = {
  cardHeaderLink: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'inline',
    fontSize: '1rem',
    outline: 0,
    margin: 0,
    padding: 0,
    textDecoration: 'underline',
    '&:hover': {
      backgroundColor: '#000000',
      textDecoration: 'none' },

    '&:focus': {
      backgroundColor: '#ffffff',
      color: '#000000',
      textDecoration: 'none' } },


  cardHeaderLinkBack: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#c0c0c0',
    cursor: 'pointer',
    display: 'inline',
    fontSize: '1rem',
    outline: 0,
    margin: 0,
    padding: 0,
    textDecoration: 'underline',
    '&:hover': {
      backgroundColor: '#000000',
      textDecoration: 'none' },

    '&:focus': {
      backgroundColor: '#ffffff',
      color: '#000000',
      textDecoration: 'none' } },


  cardHeaderStrong: {
    color: '#ffffff',
    fontWeight: 'bold' } };



//
exports.cardHeaderContentStyles = cardHeaderContentStyles;
class CompositeCardHeader extends React.Component




{
  render() {
    const { classes, icon, subTitle, title } = this.props;

    return /*#__PURE__*/(
      React.createElement("div", { className: classes.cardHeaderRoot }, /*#__PURE__*/
      React.createElement("div", { className: classes.cardHeaderIcon }, icon), /*#__PURE__*/
      React.createElement("div", { className: classes.cardHeaderSeparator }), /*#__PURE__*/
      React.createElement("div", { className: classes.cardHeaderInformation }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement(_Typography.default, { className: classes.cardHeaderTitle, component: "div", variant: "h6" },
      title)), /*#__PURE__*/


      React.createElement("div", null, /*#__PURE__*/
      React.createElement(_Typography.default, { className: classes.cardHeaderSubHeader, component: "div", variant: "subtitle1" },
      subTitle)))));





  }}var _default =


(0, _styles.withStyles)(styles)(CompositeCardHeader);exports.default = _default;
//# sourceMappingURL=CompositeCardHeader.js.map