// @flow

import fsWithCallbacks from 'fs'

import chalk from 'chalk'
import NestedError from 'nested-error-stacks'

const fs = fsWithCallbacks.promises

//

export default (async function ensureFileContent(
  fileName: string,
  currentFileContent: ?string,
  newFileContent: string,
  logToConsole: boolean,
) {
  // If the current file content is not provided, get it
  if (currentFileContent == null) {
    try {
      currentFileContent = (await fs.readFile(fileName)).toString()
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw new NestedError('rb-base-server ensureFileContent: Failed', err)
      }
    }
  }

  if (currentFileContent !== newFileContent) {
    if (logToConsole) console.log(chalk.white.bgGreen('[written]') + ' ' + fileName)
    await fs.writeFile(fileName, newFileContent, 'utf8')
  } else {
    if (logToConsole) console.log(chalk.white.bgBlackBright('[skipped]') + ' ' + fileName)
  }
})
