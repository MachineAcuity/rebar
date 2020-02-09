"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _styles = require("@material-ui/core/styles");
var _react = _interopRequireDefault(require("react"));
var _reactEventListener = _interopRequireDefault(require("react-event-listener"));

var _SiteConfigurationContext = _interopRequireDefault(require("./SiteConfigurationContext"));
var _ViewportContext = _interopRequireDefault(require("./ViewportContext"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class AppWrapperBase extends _react.default.Component






{
  constructor(props, context) {
    super(props, context);this.



















    handle_onResize = () => {
      const totalWidth = window.innerWidth;
      const totalHeight = window.innerHeight;

      this.setState({ totalWidth, totalHeight });
    };this.state = { totalWidth: 100, totalHeight: 100 };}componentDidCatch(err, err_info) {if (window && window.__rebar_error_handler__) {window.__rebar_error_handler__({ err, err_info });}}componentDidMount() {this.handle_onResize(); // Will populate the data structures for dimensions with current values
  } // This should be overridden in AppDrawer
  createMUITheme() {return null;}render() {
    const { totalWidth, totalHeight } = this.state;

    return (
      _react.default.createElement(_reactEventListener.default, { target: "window", onResize: this.handle_onResize },
      _react.default.createElement(_styles.ThemeProvider, { theme: this.createMUITheme() },
      _react.default.createElement(_ViewportContext.default.Provider, { value: { totalWidth, totalHeight } },
      _react.default.createElement(_SiteConfigurationContext.default.Provider, {
        value: this.props.siteConfiguration },

      this.props.children)))));





  }}exports.default = AppWrapperBase;
//# sourceMappingURL=AppWrapperBase.js.map