"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Drawer = _interopRequireDefault(require("@material-ui/core/Drawer"));

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _styles = require("@material-ui/core/styles");

var _found = require("found");
var _Menu = _interopRequireDefault(require("mdi-material-ui/Menu"));
var _react = _interopRequireDefault(require("react"));
var _reactHelmet = require("react-helmet");
var _reactRelay = require("react-relay");

var _AppDrawerNavItems = _interopRequireDefault(require("../../_configuration/rb-appdrawer-webapp/AppDrawerNavItems"));
var _NavBarDefaultTitle = _interopRequireDefault(require("../../_configuration/rb-appdrawer-webapp/NavBarDefaultTitle"));

var _AppFrameContext = _interopRequireDefault(require("./AppFrameContext"));var _AppFrame_Viewer;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const drawerWidth = 240;

const styles = theme => ({
  '@global': {
    html: {
      boxSizing: 'border-box' },

    '*, *:before, *:after': {
      boxSizing: 'inherit' },

    body: {
      margin: 0,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale' // Antialiasing.
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      width: 'auto' } },


  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden' },

  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%' },

  menuButton: {
    position: 'absolute',
    zIndex: 1199, // Drawer is 1200
    [theme.breakpoints.down('sm')]: {
      marginLeft: 4,
      marginTop: 4 },

    [theme.breakpoints.between('sm', 'lg')]: {
      marginLeft: 8,
      marginTop: 8 },

    [theme.breakpoints.up('lg')]: {
      marginLeft: 12,
      marginTop: 12 } },


  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth } });



const titlePrefix = process.env.NODE_ENV === 'production' ? '' : '<DEV> ';

class AppFrame extends _react.default.Component





{
  constructor(props, context) {
    super(props, context);this.







    _handle_Drawer_Open = () => {
      this.setState({ drawerIsOpen: true });
    };this.

    _handle_Drawer_Close = () => {
      this.setState({ drawerIsOpen: false });
    };this.

    _handle_GoTo = to => {
      this.setState({ drawerIsOpen: false });

      this.props.router.push(to);
    };this.

    setTitle = title => {
      this.setState({ title: titlePrefix + title });
    };this.

    clearTitle = () => {
      this.setState({ title: titlePrefix + _NavBarDefaultTitle.default });
    };this.state = { drawerIsOpen: false, title: titlePrefix + _NavBarDefaultTitle.default };}

  render() {
    const { setTitle, clearTitle } = this;
    const { children, classes, Viewer } = this.props;
    const { drawerIsOpen, title } = this.state;

    return (
      _react.default.createElement("div", { className: classes.root },
      _react.default.createElement(_reactHelmet.Helmet, null,
      _react.default.createElement("title", null, title)),


      _react.default.createElement("div", { className: classes.appFrame },
      _react.default.createElement(_Fab.default, {
        "aria-label": "open drawer",
        className: classes.menuButton,
        color: "primary",
        size: "small",
        onClick: this._handle_Drawer_Open },

      _react.default.createElement(_Menu.default, null)),


      _react.default.createElement(_Drawer.default, { open: drawerIsOpen, onClose: this._handle_Drawer_Close },
      _react.default.createElement(_AppDrawerNavItems.default, { Viewer: Viewer, onClick: this._handle_GoTo })),


      _react.default.createElement(_AppFrameContext.default.Provider, { value: { setTitle, clearTitle } },
      children))));




  }}var _default =


(0, _reactRelay.createFragmentContainer)((0, _styles.withStyles)(styles)((0, _found.withRouter)(AppFrame)), {
  Viewer: _AppFrame_Viewer !== void 0 ? _AppFrame_Viewer : _AppFrame_Viewer = require("./__generated__/AppFrame_Viewer.graphql") });exports.default = _default;
//# sourceMappingURL=AppFrame.js.map