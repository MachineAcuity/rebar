// @flow

import 'isomorphic-fetch'
import NestedError from 'nested-error-stacks'

export default class FetcherBase {
  url: string
  UserToken1: ?string
  UserToken2: string
  payloads: Array<any>

  constructor(url: string, UserToken1: ?string, UserToken2: string) {
    this.url = url
    this.UserToken1 = UserToken1
    this.UserToken2 = UserToken2
  }

  async fetch(operation: { text: string }, variables: any) {
    const request = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        UserToken2: this.UserToken2,
      },
      body: JSON.stringify({ query: operation.text, variables }),
    }

    try {
      if (this.UserToken1) {
        // $FlowIgnore we can add the cookie, will be used on server
        request.headers.UserToken1 = this.UserToken1
      }

      const response = await fetch(this.url, request)

      return response.json()
    } catch (err) {
      throw new NestedError(
        'FetcherBase failed UserToken1=' +
          (this.UserToken1 ? this.UserToken1 : '<null>') +
          ' UserToken2=' +
          this.UserToken2 +
          ' request=' +
          JSON.stringify(request) +
          ' with' +
          err.message,
        err,
      )
    }
  }
}
