// @flow weak

import { debugWriteToLogServerRequestWebApp } from '../_configuration/debug'
import log from '../rb-base-server/log'
import { matchObject } from '../rb-base-universal/template'

export default function defaultrequestLoggerWebApp({ req, clientIP, userSession }) {
  let logLevel = null

  // IDEA [Code Quality] Audit errors for WebApp and decide which ones to log. For instasnce, 401 is a bad idea.
  // // If there is an error, log it as an error
  // if( requestAndResponse.response.indexOf( '"errors": [' ) > 0 )
  //   logLevel = 'error'
  // Otherwise, if it is a trace, log it as info
  //else
  if (matchObject({ req, clientIP, userSession }, debugWriteToLogServerRequestWebApp)) {
    logLevel = 'info'
  }

  if (logLevel) {
    log(logLevel, 'rb-appbase-server render on server request', {
      req,
      clientIP,
      userSession,
    })
  }
}
