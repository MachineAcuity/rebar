"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

let ndtStamp = 0;
let ndtStampHalf = 0;

/**
                       * Tool for generating usage-frequency time stamps.
                       */
class TimeStamp {
  /**
                  * Updates the time stamp generator with the current time.
                  */
  static update() {
    ndtStamp = new Date().getTime();
    ndtStampHalf = ndtStamp / 2;
  }

  /**
     * Generates a new time stamp (given the old time stamp, if available).
     * For existing objects old time stamp must be provided in order to be
     * able to use generated time stamp for usage frequency management.
     */
  static generate(ndtOldTimeStamp) {
    return ndtOldTimeStamp == null ? ndtStampHalf : (ndtOldTimeStamp + ndtStamp) / 2;
  }

  /**
     * Last generated current time timestamp
     */
  static lastNdtCurrentTime() {
    return ndtStamp;
  }}exports.default = TimeStamp;
//# sourceMappingURL=TimeStamp.js.map