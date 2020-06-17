// @flow

import os from 'os'

export default function() {
  const interfaces = os.networkInterfaces()

  for (let k in interfaces) {
    // $FlowIgnore it will be there
    for (let k2 in interfaces[k]) {
      // $FlowIgnore it will be there
      const address = interfaces[k][k2]
      if (address.family === 'IPv4' && !address.internal) return address.address
    }
  }
}
