"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

require("isomorphic-fetch");
var _nestedErrorStacks = _interopRequireDefault(require("nested-error-stacks"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class FetcherBase {





  constructor(url, UserToken1, UserToken2) {
    this.url = url;
    this.UserToken1 = UserToken1;
    this.UserToken2 = UserToken2;
  }

  async fetch(operation, variables) {
    const request = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        UserToken2: this.UserToken2 },

      body: JSON.stringify({ query: operation.text, variables }) };


    try {
      if (this.UserToken1) {
        // $FlowIgnore we can add the cookie, will be used on server
        request.headers.UserToken1 = this.UserToken1;
      }

      const response = await fetch(this.url, request);

      return response.json();
    } catch (err) {
      throw new _nestedErrorStacks.default(
      'FetcherBase failed UserToken1=' + (
      this.UserToken1 ? this.UserToken1 : '<null>') +
      ' UserToken2=' +
      this.UserToken2 +
      ' request=' +
      JSON.stringify(request) +
      ' with' +
      err.message,
      err);

    }
  }}exports.default = FetcherBase;
//# sourceMappingURL=fetcherBase.js.map