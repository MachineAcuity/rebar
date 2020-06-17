// @flow weak

import { debugWriteToLogServerRequestGraphQL } from '../_configuration/debug'
import log from '../rb-base-server/log'
import { matchObject } from '../rb-base-universal/template'

export default function defaultRequestLoggerGraphQL({ req, clientIP, userSession }) {
  let logLevel = null

  // IDEA [Code Quality] Audit errors for Auth and decide which ones to log. For instasnce, 401 is a bad idea.
  // // If there is an error, log it as an error
  // if( requestAndResponse.response.indexOf( '"errors": [' ) > 0 )
  //   logLevel = 'error'
  // Otherwise, if it is a trace, log it as info
  //else
  if (matchObject({ req, clientIP, userSession }, debugWriteToLogServerRequestGraphQL)) {
    logLevel = 'info'
  }

  if (logLevel) {
    log(logLevel, 'rb-appbase-server GraphQL request', {
      req,
      clientIP,
      userSession,
    })
  }
}
