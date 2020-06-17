// @flow

import fs from 'fs'
import path from 'path'

import bodyParser from 'body-parser'
import express from 'express'
import expressSession from 'express-session'
import jwt from 'jwt-simple'
import fetch from 'node-fetch'
import passport from 'passport'
import passportFacebook from 'passport-facebook'
import passportGoogle from 'passport-google-oauth20'
import passportTwitter from 'passport-twitter'

import authPassportConfiguration from '../_configuration/rb-appbase-universal/authPassportConfiguration'
import getNewUser from '../_configuration/rb-base-server/graphql/model/getNewUser'
import ensurePathExists from '../rb-base-server/ensurePathExists'
import log from '../rb-base-server/log'
import onCreateUser from '../_configuration/rb-appbase-server/onCreateUser'
import { requestLoggerAuth } from '../_configuration/rb-base-server/requestLoggers'
import logServerRequest from '../rb-base-server/logServerRequest'
import { getObjectManager } from '../rb-base-server/ObjectManager'

// Read environment
require('dotenv').config()

const envJWTSecret = process.env.JWT_SECRET
if (envJWTSecret == null || typeof envJWTSecret !== 'string')
  throw new Error(
    'Error: rb-appbase-server/serverAuthPassport requires the environment variable JWT_SECRET to be set',
  )

const envAccessControlAllowedOrigins = process.env.ACCESS_CONTROL_ALLOWED_ORIGINS
if (envAccessControlAllowedOrigins == null || typeof envAccessControlAllowedOrigins !== 'string')
  throw new Error(
    'Error: rb-appbase-server/serverAuthPassport requires the environment variable ACCESS_CONTROL_ALLOWED_ORIGINS to be set',
  )

const publicUrl =
  process.env.NODE_ENV === 'production'
    ? // In production, use the public URL as the creator intended
      JSON.parse(envAccessControlAllowedOrigins)[0]
    : // When running in development locally use localhost. This allows to
      // properly work with the likes of facebook without changing the settings in the app
      // dashboard every time the IP changes
      'http://localhost:28603' // IDEA [Code Quality] Use port setting here

const envRebarDataFilesLocation = process.env.REBAR_DATA_FILES_LOCATION
if (envRebarDataFilesLocation == null || typeof envRebarDataFilesLocation !== 'string')
  throw new Error(
    'Error: Machine Acuity unit requires environment variable REBAR_DATA_FILES_LOCATION to be set',
  )

const userFileLocation = path.resolve(envRebarDataFilesLocation, 'user')

//

const serverAuthPassport = express()

serverAuthPassport.use(bodyParser.json())
serverAuthPassport.use((req, res, next) => logServerRequest(req, res, next, requestLoggerAuth))

//

function passportReturn(profileData, cb) {
  return cb(null, profileData)
}

async function uponAuthenticationSuccess(req, res) {
  let step = 'initialize'

  try {
    const profile = req.user

    // $FlowIgnore yes, the Object Manager will have all the fields
    const objectManager = await getObjectManager(req, res)

    if (!objectManager.siteInformation) {
      throw new Error('Site information not found')
    }

    step = 'Check if third party account already exists'
    const UserAccount_Identifier = req.user.id

    let a_UserAccount = await objectManager.getOneObject_async('UserAccount', {
      UserAccount_Identifier,
    })
    let a_UserSession = null

    if (a_UserAccount != null) {
      step = 'Get user for passport identity that has been found'

      // ObjectManager will try to set the create_by and modified_by fields. In order to do this it needs
      // the viewer user id to be set
      objectManager.setViewerUserId(a_UserAccount.UserAccount_User_id)

      step = 'Create user session object'
      a_UserSession = {
        UserSession_artifact_id: objectManager.siteInformation.artifact_id, // Get previously assigned primary key
        UserSession_User_id: a_UserAccount.UserAccount_User_id,
        UserSession_Start: new Date(),
        UserSession_Expired: false,
        UserSession_IsAnonymous: false,
      }

      await objectManager.add('UserSession', a_UserSession)
    } else {
      step = 'Create the a new user object'
      const a_User = Object.assign(getNewUser(objectManager.siteInformation.artifact_id), {
        User_artifact_id: objectManager.siteInformation.artifact_id,
        UserToken2:
          Math.random().toString(36).substring(2) +
          Math.random().toString(36).substring(2) +
          Math.random().toString(36).substring(2) +
          Math.random().toString(36).substring(2),
        User_DisplayName: profile.displayName,
        User_PrimaryEmail: profile.email ? profile.email : '',
      })

      objectManager.assignPrimaryKey('User', a_User)
      objectManager.setViewerUserId(a_User.id)

      step = 'Create the user session object'
      a_UserSession = {
        UserSession_artifact_id: objectManager.siteInformation.artifact_id,
        // Get previously assigned primary key
        UserSession_User_id: a_User.id,
        UserSession_Start: new Date(),
        UserSession_Expired: false,
        UserSession_IsAnonymous: false,
      }

      step = 'Create the user account object'
      a_UserAccount = {
        UserAccount_artifact_id: objectManager.siteInformation.artifact_id,
        // Get previously assigned primary key
        UserAccount_User_id: a_User.id,
        UserAccount_Identifier,
        UserAccount_Secret: '',
        UserAccount_Type: 'pasp',
      }

      step = 'Add user session and account to database'
      await Promise.all([
        objectManager.add('User', a_User),
        objectManager.add('UserSession', a_UserSession),
        objectManager.add('UserAccount', a_UserAccount),
        ...onCreateUser(a_User.id, objectManager),
      ])

      step = 'Download profile image'
      if (profile.profilePhotoUrl) {
        const viewerUserIDAsString = objectManager.getViewerUserId().toString()

        // Create directory
        const usersDirectory = path.resolve(userFileLocation)
        const userGroupDirectory = path.resolve(
          usersDirectory,
          viewerUserIDAsString.substring(0, 2),
        )
        const userDirectory = path.resolve(userGroupDirectory, viewerUserIDAsString)
        const profileDirectory = path.resolve(userDirectory, 'profile')

        await ensurePathExists(usersDirectory)
        await ensurePathExists(userGroupDirectory)
        await ensurePathExists(userDirectory)
        await ensurePathExists(profileDirectory)

        const localImageFileName = path.resolve(profileDirectory, 'photo.jpg')

        const fetchedFile = await fetch(profile.profilePhotoUrl)
        const localFileStream = fs.createWriteStream(localImageFileName)
        fetchedFile.body.pipe(localFileStream)
      }
    }

    step = 'Check if user exists or has been created'
    if (a_UserSession != null) {
      res.injectedByRebarFrameworks = { userSession: a_UserSession }

      step = 'Create JWT token'
      const UserToken1 = jwt.encode(
        // $FlowIgnore - id will be filled in by ObjectManager.add
        { session_id: a_UserSession.id },
        envJWTSecret,
      )

      res.cookie('UserToken1', UserToken1, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      // step = 'Create user token 2'
      // const a_User = await objectManager.getOneObject_async('User', {
      //   User_artifact_id: objectManager.siteInformation.artifact_id,
      //   id: a_UserAccount.UserAccount_User_id,
      // })
      // const { UserToken2 } = a_User

      step = 'Respond with success'
      res.redirect('/')
    } else {
      res.redirect('/error_login')
    }
  } catch (err) {
    log(
      'error',
      'rb-appbase-server serverAuthPassport authenticating through third party: Failed',
      {
        step,
        err,
      },
    )
    res.status(500).send(
      JSON.stringify({
        error: 'An error has occurred while authenticating through third party',
      }),
    )
  }
}

// Passport sessions will not be used, so both serialize and deserialize do nothing
passport.serializeUser(function(user, cb) {
  cb(null, user)
})

passport.deserializeUser(function(obj, cb) {
  cb(null, obj)
})

// Now initialize it and use it on router
serverAuthPassport.use(passport.initialize())

// IDEA [Project E] Are there any security/scalability/web farm issues with using user session?
// Session is only required by twitter strategy
if (authPassportConfiguration.twitter && !authPassportConfiguration.twitter.disabled)
  serverAuthPassport.use(
    expressSession({
      secret: process.env.SESSION_SECRET,
    }),
  )

if ('facebook' in authPassportConfiguration) {
  // Facebook strategy for web
  passport.use(
    new passportFacebook.Strategy(
      {
        clientID: process.env.AUTH_FACEBOOK_APP_ID,
        clientSecret: process.env.AUTH_FACEBOOK_APP_SECRET,
        callbackURL: publicUrl + '/auth/facebook/return',
        profileFields: [ 'id', 'displayName', 'picture.type(large)', 'email' ],
      },
      (accessToken, refreshToken, profile, cb) => {
        // Locate profile photo URL
        let profilePhotoUrl = null
        if (profile.photos && profile.photos[0] && profile.photos[0].value) {
          profilePhotoUrl = profile.photos[0].value
        }

        return passportReturn(
          {
            displayName: profile.displayName,
            email: profile.email,
            id: 'facebook-,-' + profile.id,
            profilePhotoUrl,
          },
          cb,
        )
      },
    ),
  )

  serverAuthPassport.get('/facebook', passport.authenticate('facebook'))
  serverAuthPassport.get(
    '/facebook/return',
    passport.authenticate('facebook', {
      failureRedirect: '/login',
    }),
    uponAuthenticationSuccess,
  )
}

if (authPassportConfiguration.google && !authPassportConfiguration.google.disabled) {
  passport.use(
    new passportGoogle.Strategy(
      {
        clientID: process.env.AUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
        callbackURL: publicUrl + '/auth/google/return',
      },
      (accessToken, refreshToken, profile, cb) => {
        // Locate profile photo URL
        let profilePhotoUrl = null
        if (profile.photos && profile.photos[0] && profile.photos[0].value) {
          profilePhotoUrl = profile.photos[0].value
        }

        return passportReturn(
          {
            id: 'google-,-' + profile.id,
            displayName: profile.displayName,
            email: null,
            profilePhotoUrl,
          },
          cb,
        )
      },
    ),
  )

  serverAuthPassport.get(
    '/google',
    passport.authenticate('google', {
      scope: [ 'profile' ],
    }),
  )
  serverAuthPassport.get(
    '/google/return',
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    uponAuthenticationSuccess,
  )
}

if (authPassportConfiguration.twitter && !authPassportConfiguration.twitter.disabled) {
  passport.use(
    new passportTwitter.Strategy(
      {
        consumerKey: process.env.AUTH_TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.AUTH_TWITTER_CONSUMER_SECRET,
        callbackURL: publicUrl + '/auth/twitter/return',
      },
      (accessToken, refreshToken, profile, cb) =>
        passportReturn(
          {
            id: 'twitter-,-' + profile.id,
            displayName: profile.displayName,
          },
          cb,
        ),
    ),
  )

  serverAuthPassport.get(
    '/twitter',
    passport.authenticate('twitter', {
      scope: [ 'profile' ],
    }),
  )
  serverAuthPassport.get(
    '/twitter/return',
    passport.authenticate('twitter', {
      failureRedirect: '/login',
    }),
    uponAuthenticationSuccess,
  )
}

export default serverAuthPassport
