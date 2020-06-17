// @flow

import fsWithCallbacks from 'fs'
import path from 'path'

import NestedError from 'nested-error-stacks'

import ensureFileContent from './ensureFileContent'

const fs = fsWithCallbacks.promises

/**
 * Manages writing of multiple files
 * @class MasterWriter
 */
export default class MasterWriter {
  basePath: string
  logToConsole: boolean
  directories: Map<string, boolean>
  // $FlowIgnore
  arrPromises: Array<Promise>

  constructor(basePath: string, logToConsole: boolean) {
    this.basePath = basePath
    this.logToConsole = logToConsole

    this.directories = new Map()
    this.arrPromises = []
  }

  async ensureRelativePathExistsHelper(filePath: string) {
    if (!this.directories.has(filePath)) {
      try {
        await fs.mkdir(path.resolve(this.basePath, filePath))
      } catch (err) {
        if (err.code !== 'EEXIST') {
          throw new NestedError(
            'rb-base-server MasterWriter ensureRelativePathExistsHelper: Failed',
            err,
          )
        }
      }

      this.directories.set(filePath, true)
    }
  }

  async ensureRelativePathExists(destinationRelative: string) {
    const arrPath = destinationRelative.split('/')

    for (let pathAccumulated = '', ix = 0; ix < arrPath.length; ix++) {
      await this.ensureRelativePathExistsHelper(pathAccumulated)
      pathAccumulated += arrPath[ix] + '/'
    }
  }

  async copyFile(sourceAbsolute: string, destinationRelative: string) {
    await this.ensureRelativePathExists(destinationRelative)

    this.arrPromises.push(fs.copyFile(sourceAbsolute, this.basePath + '/' + destinationRelative))
  }

  async writeFile(destinationRelative: string, fileContent: string) {
    await this.ensureRelativePathExists(destinationRelative)

    this.arrPromises.push(
      ensureFileContent(
        this.basePath + '/' + destinationRelative,
        null,
        fileContent,
        this.logToConsole,
      ),
    )
  }

  async executeQueue() {
    await Promise.all(this.arrPromises)
    this.arrPromises = []
  }
}
