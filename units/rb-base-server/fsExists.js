// @flow

import fsWithCallbacks from 'fs'

import NestedError from 'nested-error-stacks'

const fs = fsWithCallbacks.promises

//

export default (async function fsExists(path: string) {
  try {
    await fs.access(path)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') return false
    else {
      throw new NestedError('rb-base-server fsExists: Failed', err)
    }
  }
})
