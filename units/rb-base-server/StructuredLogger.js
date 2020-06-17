// @flow

import fs from 'fs'

export class StructuredLoggerWriter {
  on: boolean
  fun: Object

  arrLog: Array<{ arrParams: Array<any>, payload: any }>

  constructor(on: boolean) {
    this.on = on
    this.arrLog = []
    this.fun = {}
  }

  spawn() {
    return new StructuredLogger(this)
  }

  write() {
    fs.writeFileSync('units/rb-log-viewer-tools/log/log.json', JSON.stringify(this.arrLog, null, 2))
  }
}

export default class StructuredLogger {
  on: boolean
  fun: Object

  arrParamsRoot: Array<any>
  structuredLoggerWriter: StructuredLoggerWriter
  parent: StructuredLogger | null
  children: { [any]: StructuredLogger }

  constructor(structuredLoggerWriter: StructuredLoggerWriter) {
    this.structuredLoggerWriter = structuredLoggerWriter
    this.on = structuredLoggerWriter.on
    this.fun = structuredLoggerWriter.fun

    this.arrParamsRoot = []
    this.parent = null
    this.children = {}
  }

  update(arrParamsSuffix: Array<any>, payload: Object) {
    const logger = this.get(arrParamsSuffix)

    this.structuredLoggerWriter.arrLog.push({
      arrParams: logger.arrParamsRoot,
      payload,
    })
  }

  get(arrParamsSuffix: Array<any>) {
    return this.getExecutor(arrParamsSuffix, 0)
  }

  getExecutor(arrParamsSuffix: Array<any>, ixParams: number) {
    if (arrParamsSuffix.length === ixParams) {
      return this
    }

    const key = arrParamsSuffix[ixParams]
    let logger = this.children[key]
    if (!logger) {
      logger = this.children[key] = new StructuredLogger(this.structuredLoggerWriter)

      logger.arrParamsRoot = this.arrParamsRoot.concat([ key ])
      logger.parent = this
    }

    return logger.getExecutor(arrParamsSuffix, ixParams + 1)
  }

  spawn(arrParamsSuffix: Array<any>) {
    const logger = new StructuredLogger(this.structuredLoggerWriter)

    logger.arrParamsRoot = this.arrParamsRoot.concat(arrParamsSuffix)
    logger.parent = this

    return logger
  }
}
