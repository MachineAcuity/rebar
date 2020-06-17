// @flow weak

// Function to log requests
export default function logServerRequest(req, res, next, loggingFunction) {
  const oldWriteRes = res.write
  const oldEndRes = res.end

  const chunksRes = []

  res.write = function(chunk) {
    chunksRes.push(Buffer.from(chunk))
    oldWriteRes.apply(res, arguments)
  }

  res.end = function(chunk) {
    if (chunk) chunksRes.push(Buffer.from(chunk))

    // Determine client ID - either placed in the headers by Nginx, or the IP the request is coming from
    const clientIP = req.headers['x-real-ip'] || req.connection.remoteAddress

    let userSession
    if (res.injectedByRebarFrameworks && res.injectedByRebarFrameworks.userSession)
      userSession = res.injectedByRebarFrameworks.userSession
    else userSession = 'not determined'

    loggingFunction({ req, clientIP, userSession })

    oldEndRes.apply(res, arguments)
  }

  next()
}
