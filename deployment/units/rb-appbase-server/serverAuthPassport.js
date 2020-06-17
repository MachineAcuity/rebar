"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));
var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _jwtSimple = _interopRequireDefault(require("jwt-simple"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _passport = _interopRequireDefault(require("passport"));
var _passportFacebook = _interopRequireDefault(require("passport-facebook"));
var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth20"));
var _passportTwitter = _interopRequireDefault(require("passport-twitter"));

var _authPassportConfiguration = _interopRequireDefault(require("../_configuration/rb-appbase-universal/authPassportConfiguration"));
var _getNewUser = _interopRequireDefault(require("../_configuration/rb-base-server/graphql/model/getNewUser"));
var _ensurePathExists = _interopRequireDefault(require("../rb-base-server/ensurePathExists"));
var _log = _interopRequireDefault(require("../rb-base-server/log"));
var _onCreateUser = _interopRequireDefault(require("../_configuration/rb-appbase-server/onCreateUser"));
var _requestLoggers = require("../_configuration/rb-base-server/requestLoggers");
var _logServerRequest = _interopRequireDefault(require("../rb-base-server/logServerRequest"));
var _ObjectManager = require("../rb-base-server/ObjectManager");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// Read environment
require('dotenv').config();

const envJWTSecret = process.env.JWT_SECRET;
if (envJWTSecret == null || typeof envJWTSecret !== 'string')
throw new Error(
'Error: rb-appbase-server/serverAuthPassport requires the environment variable JWT_SECRET to be set');


const envAccessControlAllowedOrigins = process.env.ACCESS_CONTROL_ALLOWED_ORIGINS;
if (envAccessControlAllowedOrigins == null || typeof envAccessControlAllowedOrigins !== 'string')
throw new Error(
'Error: rb-appbase-server/serverAuthPassport requires the environment variable ACCESS_CONTROL_ALLOWED_ORIGINS to be set');


const publicUrl =
process.env.NODE_ENV === 'production' ?
// In production, use the public URL as the creator intended
JSON.parse(envAccessControlAllowedOrigins)[0] :
// When running in development locally use localhost. This allows to
// properly work with the likes of facebook without changing the settings in the app
// dashboard every time the IP changes
'http://localhost:28603'; // IDEA [Code Quality] Use port setting here

const envRebarDataFilesLocation = process.env.REBAR_DATA_FILES_LOCATION;
if (envRebarDataFilesLocation == null || typeof envRebarDataFilesLocation !== 'string')
throw new Error(
'Error: Machine Acuity unit requires environment variable REBAR_DATA_FILES_LOCATION to be set');


const userFileLocation = _path.default.resolve(envRebarDataFilesLocation, 'user');

//

const serverAuthPassport = (0, _express.default)();

serverAuthPassport.use(_bodyParser.default.json());
serverAuthPassport.use((req, res, next) => (0, _logServerRequest.default)(req, res, next, _requestLoggers.requestLoggerAuth));

//

function passportReturn(profileData, cb) {
  return cb(null, profileData);
}

async function uponAuthenticationSuccess(req, res) {
  let step = 'initialize';

  try {
    const profile = req.user;

    // $FlowIgnore yes, the Object Manager will have all the fields
    const objectManager = await (0, _ObjectManager.getObjectManager)(req, res);

    if (!objectManager.siteInformation) {
      throw new Error('Site information not found');
    }

    step = 'Check if third party account already exists';
    const UserAccount_Identifier = req.user.id;

    let a_UserAccount = await objectManager.getOneObject_async('UserAccount', {
      UserAccount_Identifier });

    let a_UserSession = null;

    if (a_UserAccount != null) {
      step = 'Get user for passport identity that has been found';

      // ObjectManager will try to set the create_by and modified_by fields. In order to do this it needs
      // the viewer user id to be set
      objectManager.setViewerUserId(a_UserAccount.UserAccount_User_id);

      step = 'Create user session object';
      a_UserSession = {
        UserSession_artifact_id: objectManager.siteInformation.artifact_id, // Get previously assigned primary key
        UserSession_User_id: a_UserAccount.UserAccount_User_id,
        UserSession_Start: new Date(),
        UserSession_Expired: false,
        UserSession_IsAnonymous: false };


      await objectManager.add('UserSession', a_UserSession);
    } else {
      step = 'Create the a new user object';
      const a_User = Object.assign((0, _getNewUser.default)(objectManager.siteInformation.artifact_id), {
        User_artifact_id: objectManager.siteInformation.artifact_id,
        UserToken2:
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2),
        User_DisplayName: profile.displayName,
        User_PrimaryEmail: profile.email ? profile.email : '' });


      objectManager.assignPrimaryKey('User', a_User);
      objectManager.setViewerUserId(a_User.id);

      step = 'Create the user session object';
      a_UserSession = {
        UserSession_artifact_id: objectManager.siteInformation.artifact_id,
        // Get previously assigned primary key
        UserSession_User_id: a_User.id,
        UserSession_Start: new Date(),
        UserSession_Expired: false,
        UserSession_IsAnonymous: false };


      step = 'Create the user account object';
      a_UserAccount = {
        UserAccount_artifact_id: objectManager.siteInformation.artifact_id,
        // Get previously assigned primary key
        UserAccount_User_id: a_User.id,
        UserAccount_Identifier,
        UserAccount_Secret: '',
        UserAccount_Type: 'pasp' };


      step = 'Add user session and account to database';
      await Promise.all([
      objectManager.add('User', a_User),
      objectManager.add('UserSession', a_UserSession),
      objectManager.add('UserAccount', a_UserAccount),
      ...(0, _onCreateUser.default)(a_User.id, objectManager)]);


      step = 'Download profile image';
      if (profile.profilePhotoUrl) {
        const viewerUserIDAsString = objectManager.getViewerUserId().toString();

        // Create directory
        const usersDirectory = _path.default.resolve(userFileLocation);
        const userGroupDirectory = _path.default.resolve(
        usersDirectory,
        viewerUserIDAsString.substring(0, 2));

        const userDirectory = _path.default.resolve(userGroupDirectory, viewerUserIDAsString);
        const profileDirectory = _path.default.resolve(userDirectory, 'profile');

        await (0, _ensurePathExists.default)(usersDirectory);
        await (0, _ensurePathExists.default)(userGroupDirectory);
        await (0, _ensurePathExists.default)(userDirectory);
        await (0, _ensurePathExists.default)(profileDirectory);

        const localImageFileName = _path.default.resolve(profileDirectory, 'photo.jpg');

        const fetchedFile = await (0, _nodeFetch.default)(profile.profilePhotoUrl);
        const localFileStream = _fs.default.createWriteStream(localImageFileName);
        fetchedFile.body.pipe(localFileStream);
      }
    }

    step = 'Check if user exists or has been created';
    if (a_UserSession != null) {
      res.injectedByRebarFrameworks = { userSession: a_UserSession };

      step = 'Create JWT token';
      const UserToken1 = _jwtSimple.default.encode(
      // $FlowIgnore - id will be filled in by ObjectManager.add
      { session_id: a_UserSession.id },
      envJWTSecret);


      res.cookie('UserToken1', UserToken1, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000 });


      // step = 'Create user token 2'
      // const a_User = await objectManager.getOneObject_async('User', {
      //   User_artifact_id: objectManager.siteInformation.artifact_id,
      //   id: a_UserAccount.UserAccount_User_id,
      // })
      // const { UserToken2 } = a_User

      step = 'Respond with success';
      res.redirect('/');
    } else {
      res.redirect('/error_login');
    }
  } catch (err) {
    (0, _log.default)(
    'error',
    'rb-appbase-server serverAuthPassport authenticating through third party: Failed',
    {
      step,
      err });


    res.status(500).send(
    JSON.stringify({
      error: 'An error has occurred while authenticating through third party' }));


  }
}

// Passport sessions will not be used, so both serialize and deserialize do nothing
_passport.default.serializeUser(function (user, cb) {
  cb(null, user);
});

_passport.default.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Now initialize it and use it on router
serverAuthPassport.use(_passport.default.initialize());

// IDEA [Project E] Are there any security/scalability/web farm issues with using user session?
// Session is only required by twitter strategy
if (_authPassportConfiguration.default.twitter && !_authPassportConfiguration.default.twitter.disabled)
serverAuthPassport.use(
(0, _expressSession.default)({
  secret: process.env.SESSION_SECRET }));



if ('facebook' in _authPassportConfiguration.default) {
  // Facebook strategy for web
  _passport.default.use(
  new _passportFacebook.default.Strategy(
  {
    clientID: process.env.AUTH_FACEBOOK_APP_ID,
    clientSecret: process.env.AUTH_FACEBOOK_APP_SECRET,
    callbackURL: publicUrl + '/auth/facebook/return',
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email'] },

  (accessToken, refreshToken, profile, cb) => {
    // Locate profile photo URL
    let profilePhotoUrl = null;
    if (profile.photos && profile.photos[0] && profile.photos[0].value) {
      profilePhotoUrl = profile.photos[0].value;
    }

    return passportReturn(
    {
      displayName: profile.displayName,
      email: profile.email,
      id: 'facebook-,-' + profile.id,
      profilePhotoUrl },

    cb);

  }));



  serverAuthPassport.get('/facebook', _passport.default.authenticate('facebook'));
  serverAuthPassport.get(
  '/facebook/return',
  _passport.default.authenticate('facebook', {
    failureRedirect: '/login' }),

  uponAuthenticationSuccess);

}

if (_authPassportConfiguration.default.google && !_authPassportConfiguration.default.google.disabled) {
  _passport.default.use(
  new _passportGoogleOauth.default.Strategy(
  {
    clientID: process.env.AUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    callbackURL: publicUrl + '/auth/google/return' },

  (accessToken, refreshToken, profile, cb) => {
    // Locate profile photo URL
    let profilePhotoUrl = null;
    if (profile.photos && profile.photos[0] && profile.photos[0].value) {
      profilePhotoUrl = profile.photos[0].value;
    }

    return passportReturn(
    {
      id: 'google-,-' + profile.id,
      displayName: profile.displayName,
      email: null,
      profilePhotoUrl },

    cb);

  }));



  serverAuthPassport.get(
  '/google',
  _passport.default.authenticate('google', {
    scope: ['profile'] }));


  serverAuthPassport.get(
  '/google/return',
  _passport.default.authenticate('google', {
    failureRedirect: '/login' }),

  uponAuthenticationSuccess);

}

if (_authPassportConfiguration.default.twitter && !_authPassportConfiguration.default.twitter.disabled) {
  _passport.default.use(
  new _passportTwitter.default.Strategy(
  {
    consumerKey: process.env.AUTH_TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.AUTH_TWITTER_CONSUMER_SECRET,
    callbackURL: publicUrl + '/auth/twitter/return' },

  (accessToken, refreshToken, profile, cb) =>
  passportReturn(
  {
    id: 'twitter-,-' + profile.id,
    displayName: profile.displayName },

  cb)));




  serverAuthPassport.get(
  '/twitter',
  _passport.default.authenticate('twitter', {
    scope: ['profile'] }));


  serverAuthPassport.get(
  '/twitter/return',
  _passport.default.authenticate('twitter', {
    failureRedirect: '/login' }),

  uponAuthenticationSuccess);

}var _default =

serverAuthPassport;exports.default = _default;
//# sourceMappingURL=serverAuthPassport.js.map