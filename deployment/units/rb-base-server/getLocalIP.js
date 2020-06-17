"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;

var _os = _interopRequireDefault(require("os"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function _default() {
  const interfaces = _os.default.networkInterfaces();

  for (let k in interfaces) {
    // $FlowIgnore it will be there
    for (let k2 in interfaces[k]) {
      // $FlowIgnore it will be there
      const address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) return address.address;
    }
  }
}
//# sourceMappingURL=getLocalIP.js.map