"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));
var _express = _interopRequireDefault(require("express"));
var _expressGraphql = require("express-graphql");

var _delayPromise = _interopRequireDefault(require("../rb-base-universal/delayPromise"));
var _ExecutionContext = _interopRequireDefault(require("../rb-base-server/ExecutionContext"));
var _log = _interopRequireDefault(require("../rb-base-server/log"));
var _requestLoggers = require("../_configuration/rb-base-server/requestLoggers");
var _logServerRequest = _interopRequireDefault(require("../rb-base-server/logServerRequest"));
var _ObjectManager = require("../rb-base-server/ObjectManager");

var _checkCredentials = require("./checkCredentials");
var _schema = _interopRequireDefault(require("./graphql/schema"));


require("../_configuration/rb-base-server/graphql/_schemas");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Schema for GraphQL server
// Guarantee that all object registrations and schema definitions are executed
// Create router for GraphQL
const serverGraphQL = (0, _express.default)();

// Set up parser
serverGraphQL.use(_bodyParser.default.json());

// Set up logging
serverGraphQL.use((req, res, next) => (0, _logServerRequest.default)(req, res, next, _requestLoggers.requestLoggerGraphQL));

//

function graphQLError(message) {
  return JSON.stringify({
    errors: [
    {
      message,
      locations: [
      {
        line: 888,
        column: 777 }],


      stack: 'No stack information available',
      path: ['node'] }],


    data: null });

}

//

async function root(req, res, next) {
  let objectManager;
  try {
    for (let ixTry = 1;; ixTry++) {
      objectManager = await (0, _ObjectManager.getObjectManager)(req, res);

      const UserAndSession = await (0, _checkCredentials.getUserAndSessionIDByUserToken1_async)(objectManager, req, true);
      if (!UserAndSession) {
        res.
        status(500).
        send(graphQLError('GraphQL server was given a session, but the session is invalid'));
        return;
      }

      const a_User = UserAndSession.User;
      const a_UserSession = UserAndSession.UserSession;

      res.injectedByRebarFrameworks = { userSession: a_UserSession };

      // Verify user
      const verificationResult = (0, _checkCredentials.verifyUserToken2)(a_User, req, 'headers');

      // If UserToken2 was provided, but verification fails, wait

      if (
      ixTry <= 5 &&
      verificationResult &&
      verificationResult.issue === 'Authentication token expected' &&
      verificationResult.UserToken2FromRequest)
      {
        // Wait for the user to 'appear' in the database as eventual consistency kicks in
        await (0, _delayPromise.default)(100 * ixTry);
        console.log('XXX user not eventually consistently found');
      } else if (verificationResult) {
        (0, _log.default)('warn', 'rb-appbase-server serverGraphQL root: Checking credentials failed', {
          ixTry,
          verificationResult,
          req,
          res,
          UserSession_id: UserAndSession.UserSession ? UserAndSession.UserSession.id : 'no session' });


        // Expire cookie. This is the only way to 'delete' a cookie
        res.cookie('UserToken1', '', { httpOnly: true, expires: new Date(1) });
        res.status(403).send('{ "error": "Authentication Failed" }');

        return;
      } else {
        // verificationResult is null which means verification succeeded, proceed to
        // server GraphQL
        break;
      }
    }

    const ec = _ExecutionContext.default.createRoot({ objectManager });

    (0, _expressGraphql.graphqlHTTP)(() => {
      return {
        schema: _schema.default,
        rootValue: ec,
        pretty: true,
        graphiql: false };

    })(req, res, next);
  } catch (err) {
    (0, _log.default)('error', 'rb-appbase-server serverGraphQL root: Failed ', {
      err,
      req,
      objectManager });

    res.status(500).send(graphQLError('An error has occurred while running GraphQL query'));
  }
}
serverGraphQL.use('/', root);var _default =

serverGraphQL;exports.default = _default;
//# sourceMappingURL=serverGraphQL.js.map