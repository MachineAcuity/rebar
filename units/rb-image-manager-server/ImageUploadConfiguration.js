// @flow

import ObjectManager from '../rb-base-server/ObjectManager'

//

export default class ImageUploadConfiguration {
  /** Detemines whether this configuration applies to the provided request */
  isProperConfiguration(req: Object): boolean {
    throw new Error('not implemented')
  }

  /** Verify that the currently logged in user has permissions to upload */
  async verifyUserPermissions(objectManager: ObjectManager, req: Object) {
    throw new Error('not implemented')
  }

  /** Generates local, and returned, file name for the upload */
  async generateFileNames_async(
    objectManager: ObjectManager,
    req: Object,
  ): Promise<{ localImageFileName: string, returnedImageFileName: string }> {
    throw new Error('not implemented')
  }
}
