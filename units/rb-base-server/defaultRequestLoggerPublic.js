// @flow weak

import { debugWriteToLogServerRequestPublic } from '../_configuration/debug'
import { matchObject } from '../rb-base-universal/template'
import log from '../rb-base-server/log'

export default function defaultrequestLoggerPublic({ req, clientIP, userSession }) {
  let logLevel = null

  // IDEA [Code Quality] Audit errors for Public and decide which ones to log. For instasnce, 401 is a bad idea.
  // // If there is an error, log it as an error
  // if( requestAndResponse.response.indexOf( '"errors": [' ) > 0 )
  //   logLevel = 'error'
  // Otherwise, if it is a trace, log it as info
  //else
  if (matchObject({ req, clientIP, userSession }, debugWriteToLogServerRequestPublic)) {
    logLevel = 'info'
  }

  if (logLevel) {
    log(logLevel, 'rb-base-server public request', {
      req,
      clientIP,
      userSession,
    })
  }
}
