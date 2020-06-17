"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _react = _interopRequireDefault(require("react"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    overflow: 'scroll',
    overflowScrolling: 'touch',
    [theme.breakpoints.down('sm')]: {
      padding: 0 },

    [theme.breakpoints.between('sm', 'lg')]: {
      padding: theme.spacing(1) },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2) },

    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen }),

    textAlign: 'center',
    width: '100%',
    height: '100%' },

  content: {
    flex: '1 1 100%',
    margin: '0 auto',
    maxWidth: 1200,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing(3),
    textAlign: 'left' } });



class ResponsiveContentArea extends _react.default.Component


{
  render() {
    const { classes } = this.props;

    return /*#__PURE__*/(
      _react.default.createElement("main", { className: classes.container }, /*#__PURE__*/
      _react.default.createElement("div", { className: classes.content }, this.props.children)));


  }}var _default =


(0, _styles.withStyles)(styles)(ResponsiveContentArea);exports.default = _default;
//# sourceMappingURL=ResponsiveContentArea.js.map