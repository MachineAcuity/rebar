"use strict";


require("babel-polyfill");

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));

var _getGraphQLServerURL = _interopRequireDefault(require("../_configuration/rb-appbase-webapp/getGraphQLServerURL"));
var _AppWrapper = _interopRequireDefault(require("../_configuration/rb-appbase-webapp/AppWrapper"));

var _fetcherClient = _interopRequireDefault(require("./fetcherClient"));
var _router = require("./router");
var _userToken = require("./scripts/userToken2");

var _BrowserProtocol = _interopRequireDefault(require("farce/BrowserProtocol"));
var _createInitialFarceRouter = _interopRequireDefault(require("found/createInitialFarceRouter"));
var _createRender = _interopRequireDefault(require("found/createRender"));


require("../_configuration/rb-appbase-webapp/global.css");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // In order to use ES7 async/await
// Include global CSS used in all units. Will not be chunked
// Handler for error reporting
async function rebarErrorHandler(err, err_info) {
  try {
    // Do not report errors that do not carry meaningful information
    if (typeof err === 'string') {
      if (err.trimLeft() === '') return;
    } else {
      if (err.message == null) {
        return;
      }

      if (typeof err.message === 'string' && err.message.trimLeft() === '') {
        return;
      }

      // if (
      //   typeof err.message === 'string' &&
      //   err.message.startsWith(
      //     'An error was thrown inside one of your components, but React does not know what it was.',
      //   )
      // )
      //   return
    }

    // Determine the host server
    const loc = window.location;
    const host = loc.protocol + '//' + loc.hostname + ':' + loc.port;

    // Pakcage up error details
    const body = JSON.stringify({
      UserToken2: (0, _userToken.getUserToken2)(),
      err: { message: err.message, stack: err.stack },
      err_info });


    // Send away
    const response = await fetch(host + '/client-error/report', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json' },

      body });


    // Inform user of the result
    const responseAsObject = await response.json();
    if (responseAsObject.success) {
      alert(
      'An error has occurred. Use the following identifier when reporting to support:\n' +
      responseAsObject.issue_id);

    } else {
      alert('An error has occurred. Attempt to assign an identifier has failed.');
    }
  } catch (err) {
    alert('An error has occurred. We were not able to assign an identifier to it.\nReason:' + err);
  }
}

// Load up react, relay and set up error handling

const render = (0, _createRender.default)({});
(async () => {
  const { relayPayloads, siteConfiguration, UserToken1 } = window.__rebar_properties__;

  // It is critical that the app frame has UserToken2 retrieved. In the case of a rendering error like
  // 404 relaypayloads will be empty
  if (relayPayloads.length > 0) {
    (0, _userToken.setUserToken2)(relayPayloads[0].data.Viewer.UserToken2);
  }

  // eslint-disable-next-line no-underscore-dangle
  const fetcher = new _fetcherClient.default(
  (0, _getGraphQLServerURL.default)(),
  relayPayloads,
  UserToken1,
  (0, _userToken.getUserToken2)());

  const resolver = (0, _router.createResolver)(fetcher);

  const Router = await (0, _createInitialFarceRouter.default)({
    historyProtocol: new _BrowserProtocol.default(),
    historyMiddlewares: _router.historyMiddlewares,
    routeConfig: (0, _router.routeConfig)(siteConfiguration),
    resolver,
    render });


  const contentComponent = /*#__PURE__*/
  _react.default.createElement(_AppWrapper.default, { siteConfiguration: siteConfiguration, url: document.location.href }, /*#__PURE__*/
  _react.default.createElement(Router, { resolver: resolver }));


  _reactDom.default.hydrate(
  contentComponent,
  // $FlowIgnore
  document.getElementById('root'),
  () => {
    // IDEA [Code Quality] Research if removal of styles if necessary
    // Previous version of react required removing of JSS styles but the new one seems to handle
    // them OK.
    // // We don't need the static css any more once we have launched our application.
    // const ssStyles = document.getElementById( 'server-side-styles' )
    // ssStyles.parentNode.removeChild( ssStyles )
  });


  window.__rebar_error_handler__ = rebarErrorHandler;
})();
//# sourceMappingURL=client.js.map