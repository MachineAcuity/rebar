"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.StructuredLoggerWriter = void 0;

var _fs = _interopRequireDefault(require("fs"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class StructuredLoggerWriter {





  constructor(on) {
    this.on = on;
    this.arrLog = [];
    this.fun = {};
  }

  spawn() {
    return new StructuredLogger(this);
  }

  write() {
    _fs.default.writeFileSync('units/rb-log-viewer-tools/log/log.json', JSON.stringify(this.arrLog, null, 2));
  }}exports.StructuredLoggerWriter = StructuredLoggerWriter;


class StructuredLogger {








  constructor(structuredLoggerWriter) {
    this.structuredLoggerWriter = structuredLoggerWriter;
    this.on = structuredLoggerWriter.on;
    this.fun = structuredLoggerWriter.fun;

    this.arrParamsRoot = [];
    this.parent = null;
    this.children = {};
  }

  update(arrParamsSuffix, payload) {
    const logger = this.get(arrParamsSuffix);

    this.structuredLoggerWriter.arrLog.push({
      arrParams: logger.arrParamsRoot,
      payload });

  }

  get(arrParamsSuffix) {
    return this.getExecutor(arrParamsSuffix, 0);
  }

  getExecutor(arrParamsSuffix, ixParams) {
    if (arrParamsSuffix.length === ixParams) {
      return this;
    }

    const key = arrParamsSuffix[ixParams];
    let logger = this.children[key];
    if (!logger) {
      logger = this.children[key] = new StructuredLogger(this.structuredLoggerWriter);

      logger.arrParamsRoot = this.arrParamsRoot.concat([key]);
      logger.parent = this;
    }

    return logger.getExecutor(arrParamsSuffix, ixParams + 1);
  }

  spawn(arrParamsSuffix) {
    const logger = new StructuredLogger(this.structuredLoggerWriter);

    logger.arrParamsRoot = this.arrParamsRoot.concat(arrParamsSuffix);
    logger.parent = this;

    return logger;
  }}exports.default = StructuredLogger;
//# sourceMappingURL=StructuredLogger.js.map