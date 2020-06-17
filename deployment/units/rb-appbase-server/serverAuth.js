"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _express = _interopRequireDefault(require("express"));
var _jwtSimple = _interopRequireDefault(require("jwt-simple"));

var _delayPromise = _interopRequireDefault(require("../rb-base-universal/delayPromise"));
var _getNewUser = _interopRequireDefault(require("../_configuration/rb-base-server/graphql/model/getNewUser"));
var _log = _interopRequireDefault(require("../rb-base-server/log"));
var _onCreateUser = _interopRequireDefault(require("../_configuration/rb-appbase-server/onCreateUser"));
var _validation = require("../rb-base-universal/validation");
var _requestLoggers = require("../_configuration/rb-base-server/requestLoggers");
var _logServerRequest = _interopRequireDefault(require("../rb-base-server/logServerRequest"));
var _ObjectManager = require("../rb-base-server/ObjectManager");

var _checkCredentials = require("./checkCredentials");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// Read environment
require('dotenv').config();

const envJWTSecret = process.env.JWT_SECRET;
if (envJWTSecret == null || typeof envJWTSecret !== 'string')
throw new Error(
'Error: rb-appbase-server/serverAuth requires the environment variable JWT_SECRET to be set');


//

const serverAuth = (0, _express.default)();

serverAuth.use(_bodyParser.default.json());
serverAuth.use((req, res, next) => (0, _logServerRequest.default)(req, res, next, _requestLoggers.requestLoggerAuth));

// IDEA [Code Quality] When logging in as a different user, logout of the old session should be performed first so that the session is deleted.

//

async function login(req, res) {
  let step = 'initialize';

  try {
    // $FlowIgnore yes, the Object Manager will have all the fields
    const objectManager = await (0, _ObjectManager.getObjectManager)(req, res);

    if (!objectManager.siteInformation) {
      throw new Error('Site information not found');
    }

    const UserAccount_Identifier = req.body.UserAccount_Identifier.toLowerCase();
    const User_Secret = req.body.User_Secret;

    await (0, _delayPromise.default)(1000); // Wait for a second to hamper a possible potential brute force attack

    step = 'Find user';

    const arr_UserAccount = await objectManager.getObjectList_async('UserAccount', {
      UserAccount_artifact_id: objectManager.siteInformation.artifact_id,
      UserAccount_Identifier,
      UserAccount_Type: 'sec' });


    if (arr_UserAccount.length === 0) {
      res.status(401).json({ error: 'User account not found' });
      return;
    }

    // Use first user found, there should be only one anyway
    const a_UserAccount = arr_UserAccount[0];

    step = 'Check password';
    if (
    !(await new Promise((resolve) =>
    _bcryptjs.default.compare(User_Secret, a_UserAccount.UserAccount_Secret, (err, passwordMatch) =>
    resolve(passwordMatch)))))


    {
      res.status(401).json({ error: 'Incorrect password' });
      return;
    }

    // ObjectManager will try to set the create_by and modified_by fields. In order to do this it needs
    // the viewer user id to be set
    objectManager.setViewerUserId(a_UserAccount.UserAccount_User_id);

    step = 'Create user session object';
    const a_UserSession = {
      UserSession_artifact_id: objectManager.siteInformation.artifact_id, // Get previously assigned primary key
      UserSession_User_id: a_UserAccount.UserAccount_User_id,
      UserSession_Start: new Date(),
      UserSession_Expired: false,
      UserSession_IsAnonymous: false };


    // Add session to database
    await objectManager.add('UserSession', a_UserSession);
    res.injectedByRebarFrameworks = { userSession: a_UserSession };

    step = 'Create JWT token';
    const UserToken1 = _jwtSimple.default.encode(
    // $FlowIgnore - id will be filled in by ObjectManager.add
    { session_id: a_UserSession.id },
    envJWTSecret);


    res.cookie('UserToken1', UserToken1, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000 });


    step = 'Create user token 2';
    const a_User = await objectManager.getOneObject_async('User', {
      User_artifact_id: objectManager.siteInformation.artifact_id,
      id: a_UserAccount.UserAccount_User_id });

    const { UserToken2 } = a_User;

    step = 'Respond with success';
    res.json({ success: true, UserToken2 });
  } catch (err) {
    (0, _log.default)('error', 'rb-appbase-server serverAuth login: Failed', { step, err });
    res.status(500).send(
    JSON.stringify({
      error: 'An error has occurred while attempting login' }));


  }
}
serverAuth.post('/login', login);

async function createuser(req, res) {
  let step = 'initialize';

  try {
    const objectManager = await (0, _ObjectManager.getObjectManager)(req, res);

    if (!objectManager.siteInformation) {
      throw new Error('Site information not found');
    }

    step = 'Get user account';
    const UserAccount_Identifier = req.body.UserAccount_Identifier.toLowerCase();
    const User_Secret = req.body.User_Secret;

    if (UserAccount_Identifier === '' || User_Secret === '') {
      throw new Error('Attempted log in with empty account identifier or password');
    }

    const arr_UserAccount = await objectManager.getObjectList_async('UserAccount', {
      UserAccount_artifact_id: objectManager.siteInformation.artifact_id,
      UserAccount_Identifier });


    if (arr_UserAccount.length > 0) {
      res.status(500).send(
      JSON.stringify({
        error: 'User account already exists' }));


    }

    step = 'Create user account secret';
    const UserAccount_Secret = await new Promise((resolve) =>
    _bcryptjs.default.hash(User_Secret, 8, (err, hash) => resolve(hash)));


    // If account name looks like email address, use it as email
    const accountNameIsValidEmail = (0, _validation.validateEmail)(UserAccount_Identifier);
    const User_PrimaryEmail = accountNameIsValidEmail ? UserAccount_Identifier : '';

    step = 'Create the new user object';
    const a_User = Object.assign((0, _getNewUser.default)(objectManager.siteInformation.artifact_id), {
      User_artifact_id: objectManager.siteInformation.artifact_id,
      UserToken2:
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2),
      User_DisplayName: UserAccount_Identifier,
      User_PrimaryEmail: User_PrimaryEmail });

    objectManager.assignPrimaryKey('User', a_User);
    objectManager.setViewerUserId(a_User.id);

    step = 'Create the user session object';
    const a_UserSession = {
      UserSession_artifact_id: objectManager.siteInformation.artifact_id,
      // Get previously assigned primary key
      UserSession_User_id: a_User.id,
      UserSession_Start: new Date(),
      UserSession_Expired: false,
      UserSession_IsAnonymous: false };


    step = 'Create the user account object';
    const a_UserAccount = {
      UserAccount_artifact_id: objectManager.siteInformation.artifact_id,
      // Get previously assigned primary key
      UserAccount_User_id: a_User.id,
      UserAccount_Identifier,
      UserAccount_Secret,
      UserAccount_Type: 'sec' };


    step = 'Add user session and account to database';
    await Promise.all([
    objectManager.add('User', a_User),
    objectManager.add('UserSession', a_UserSession),
    objectManager.add('UserAccount', a_UserAccount),
    ...(0, _onCreateUser.default)(a_User.id, objectManager)]);


    res.injectedByRebarFrameworks = { userSession: a_UserSession };

    step = 'Create a JWT token';
    const UserToken1 = _jwtSimple.default.encode(
    // $FlowIgnore - id will be filled in by ObjectManager.add
    { session_id: a_UserSession.id },
    envJWTSecret);


    step = 'Set user token 1 cookie';
    res.cookie('UserToken1', UserToken1, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000 });


    step = 'Respond with success';
    res.json({ success: true });
  } catch (err) {
    (0, _log.default)('error', 'rb-appbase-server serverAuth create user: Failed', {
      step,
      err });

    res.status(500).send(
    JSON.stringify({
      error: 'An error has occurred while attempting to create new user' }));


  }
}
serverAuth.post('/createuser', createuser);

async function changeSecret(req, res) {
  let step = 'initialize';

  try {
    const objectManager = await (0, _ObjectManager.getObjectManager)(req, res);

    step = 'Verify that caller is a correctly logged in user';
    await (0, _checkCredentials.getUserAndSessionIDByUserToken1_async)(objectManager, req, false);

    step = 'Locate user account';
    // user id and artifact id will be picked up from object manager
    const arr_UserAccount = await objectManager.getObjectList_async('UserAccount', {
      UserAccount_Type: 'sec' });


    if (arr_UserAccount.length === 0) {
      res.status(401).json({ error: 'User account not found' });
      return;
    }

    // Use first user found, there should be only one anyway
    const a_UserAccount = arr_UserAccount[0];

    step = 'Verify the current user secret';
    const { User_CurrentSecret } = req.body;
    if (
    !(await new Promise((resolve) =>
    _bcryptjs.default.compare(
    User_CurrentSecret,
    a_UserAccount.UserAccount_Secret,
    (err, passwordMatch) => resolve(passwordMatch)))))


    {
      res.status(401).json({ error: 'Incorrect current password' });
      return;
    }

    step = 'Hash the new user secret';
    const { User_NewSecret } = req.body;
    const UserAccount_Secret = await new Promise((resolve) =>
    _bcryptjs.default.hash(User_NewSecret, 8, (err, hash) => resolve(hash)));


    step = 'Write new secret hash to db';
    a_UserAccount.UserAccount_Secret = UserAccount_Secret;
    await objectManager.update('UserAccount', a_UserAccount);

    res.json({ success: true });
  } catch (err) {
    (0, _log.default)('error', 'rb-appbase-server serverAuth change-secret: Failed', {
      err,
      step });

    res.status(500).send(
    JSON.stringify({
      error: 'An error has occurred while attempting to change password' }));


  }
}
serverAuth.post('/change-secret', changeSecret);

async function logout(req, res) {
  try {
    const objectManager = await (0, _ObjectManager.getObjectManager)(req, res);

    // Notice that get user and session will return null if user is not found, hence the next line would
    // fail. This is OK because we have a catch in the end.
    const userSession = (await (0, _checkCredentials.getUserAndSessionIDByUserToken1_async)(objectManager, req, false)).
    UserSession;

    await objectManager.remove('UserSession', {
      id: userSession.id });


    res.cookie('UserToken1', '', { httpOnly: true, expires: new Date(1) });
    res.json({ success: true });
  } catch (err) {
    (0, _log.default)('error', 'rb-appbase-server serverAuth logout: Failed', { err });
    res.status(500).send(
    JSON.stringify({
      error: 'An error has occurred while attempting to log out' }));


  }
}
serverAuth.post('/logout', logout);var _default =

serverAuth;exports.default = _default;
//# sourceMappingURL=serverAuth.js.map