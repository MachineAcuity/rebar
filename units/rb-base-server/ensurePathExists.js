// @flow

import fsWithCallbacks from 'fs'

import NestedError from 'nested-error-stacks'

const fs = fsWithCallbacks.promises

//

export default (async function ensurePathExists(filePath: string) {
  try {
    await fs.mkdir(filePath)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw new NestedError('rb-base-server ensurePathExists: Failed', err)
    }
  }
})
