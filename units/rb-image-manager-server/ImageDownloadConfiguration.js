// @flow

import ObjectManager from '../rb-base-server/ObjectManager'

//

export default class ImageDownloadConfiguration {
  /** Detemines whether this configuration applies to the provided request */
  isProperConfiguration(req: Object): boolean {
    throw new Error('not implemented')
  }

  /** Verify that the currently logged in user has permissions to download */
  async verifyUserPermissions(objectManager: ObjectManager, req: Object) {
    throw new Error('not implemented')
  }

  /** Determines the local file name to be served*/
  async getLocalFileName_async(objectManager: ObjectManager, req: Object): Promise<string> {
    throw new Error('not implemented')
  }
}
