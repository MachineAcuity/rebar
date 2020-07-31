// @flow

import fsWithCallbacks from 'fs'
import ObjectManager from './ObjectManager'
import { matchObject } from '../rb-base-universal/template'

const fs = fsWithCallbacks.promises

// Read environment
require('dotenv').config()

//

const envRebarDataFilesLocation = process.env.REBAR_DATA_FILES_LOCATION
if (envRebarDataFilesLocation == null || typeof envRebarDataFilesLocation !== 'string')
  throw new Error(
    'Error: Machine Acuity unit requires environment variable REBAR_DATA_FILES_LOCATION to be set',
  )

//

// Each log record will have unique ID, time sequential, starting with 0 - is an index in array

// Each log object (unique EC) will have unique ID, will be recorded in the log record

// Each log record will have a payload

// Each log record will have a path

type LogItem = {
  logItemID: number,
  arrPath: Array<string>,
  payload: Object,
  state: Object,
}

export default class ExecutionContext {
  root: {
    ec: ExecutionContext,
    arrLogItems: Array<LogItem>,
    nUniqueIDCounter: number,
    objectManager: ObjectManager | null,
  }

  arrExecutionPath: Array<string>
  bLog: boolean

  static createRoot(params: { objectManager?: ObjectManager, bLog?: boolean }) {
    const ec = new ExecutionContext()

    ec.root = {
      ec,
      arrLogItems: [],
      nUniqueIDCounter: 0,
      objectManager: params.objectManager ? params.objectManager : null,
    }
    ec.arrExecutionPath = []
    ec.bLog = params.bLog !== undefined ? params.bLog : false

    return ec
  }

  spawn(params: { arrPath: Array<string> }) {}

  addLog(log: { arrPath?: Array<string>, payload?: Object, state?: Object }) {}

  om(): ObjectManager {
    if (!this.root.objectManager) {
      throw new Error('rb-base-server/ec : ObjectManager not set')
    }

    return this.root.objectManager
  }
}
