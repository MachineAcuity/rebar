// @flow

import bodyParser from 'body-parser'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import delayPromise from '../rb-base-universal/delayPromise'
import ExecutionContext from '../rb-base-server/ExecutionContext'
import log from '../rb-base-server/log'
import { requestLoggerGraphQL } from '../_configuration/rb-base-server/requestLoggers'
import logServerRequest from '../rb-base-server/logServerRequest'
import { getObjectManager } from '../rb-base-server/ObjectManager'

import { getUserAndSessionIDByUserToken1_async, verifyUserToken2 } from './checkCredentials'
import schema from './graphql/schema' // Schema for GraphQL server

// Guarantee that all object registrations and schema definitions are executed
import '../_configuration/rb-base-server/graphql/_schemas'

// Create router for GraphQL
const serverGraphQL = express()

// Set up parser
serverGraphQL.use(bodyParser.json())

// Set up logging
serverGraphQL.use((req, res, next) => logServerRequest(req, res, next, requestLoggerGraphQL))

//

function graphQLError(message) {
  return JSON.stringify({
    errors: [
      {
        message,
        locations: [
          {
            line: 888,
            column: 777,
          },
        ],
        stack: 'No stack information available',
        path: [ 'node' ],
      },
    ],
    data: null,
  })
}

//

async function root(req, res, next) {
  let objectManager
  try {
    for (let ixTry = 1; ; ixTry++) {
      objectManager = await getObjectManager(req, res)

      const UserAndSession = await getUserAndSessionIDByUserToken1_async(objectManager, req, true)
      if (!UserAndSession) {
        res
          .status(500)
          .send(graphQLError('GraphQL server was given a session, but the session is invalid'))
        return
      }

      const a_User = UserAndSession.User
      const a_UserSession = UserAndSession.UserSession

      res.injectedByRebarFrameworks = { userSession: a_UserSession }

      // Verify user
      const verificationResult = verifyUserToken2(a_User, req, 'headers')

      // If UserToken2 was provided, but verification fails, wait

      if (
        ixTry <= 5 &&
        verificationResult &&
        verificationResult.issue === 'Authentication token expected' &&
        verificationResult.UserToken2FromRequest
      ) {
        // Wait for the user to 'appear' in the database as eventual consistency kicks in
        await delayPromise(100 * ixTry)
        console.log('XXX user not eventually consistently found')
      } else if (verificationResult) {
        log('warn', 'rb-appbase-server serverGraphQL root: Checking credentials failed', {
          ixTry,
          verificationResult,
          req,
          res,
          UserSession_id: UserAndSession.UserSession ? UserAndSession.UserSession.id : 'no session',
        })

        // Expire cookie. This is the only way to 'delete' a cookie
        res.cookie('UserToken1', '', { httpOnly: true, expires: new Date(1) })
        res.status(403).send('{ "error": "Authentication Failed" }')

        return
      } else {
        // verificationResult is null which means verification succeeded, proceed to
        // server GraphQL
        break
      }
    }

    const ec = ExecutionContext.createRoot({ objectManager })

    graphqlHTTP(() => {
      return {
        schema: schema,
        rootValue: ec,
        pretty: true,
        graphiql: false,
      }
    })(req, res, next)
  } catch (err) {
    log('error', 'rb-appbase-server serverGraphQL root: Failed ', {
      err,
      req,
      objectManager,
    })
    res.status(500).send(graphQLError('An error has occurred while running GraphQL query'))
  }
}
serverGraphQL.use('/', root)

export default serverGraphQL
