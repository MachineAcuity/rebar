// @flow

import path from 'path'

import ensurePathExists from '../../../rb-base-server/ensurePathExists'
import ImageUploadConfiguration from '../../../rb-image-manager-server/ImageUploadConfiguration'
import ObjectManager from '../../../rb-base-server/ObjectManager'

//

// Read environment
require('dotenv').config()

//

const envRebarDataFilesLocation = process.env.REBAR_DATA_FILES_LOCATION
if (envRebarDataFilesLocation == null || typeof envRebarDataFilesLocation !== 'string')
  throw new Error(
    'Error: Machine Acuity unit requires environment variable REBAR_DATA_FILES_LOCATION to be set',
  )

const userFileLocation = path.resolve(envRebarDataFilesLocation, 'user')

//

export default class ImageUploadConfiguration_rb_account_management extends ImageUploadConfiguration {
  isProperConfiguration(req: Object): boolean {
    if (req.body && req.body.isUserProfilePhoto === 'true') return true
    else return false
  }

  async verifyUserPermissions(objectManager: ObjectManager, req: Object) {}

  async generateFileNames_async(
    objectManager: ObjectManager,
    req: Object,
  ): Promise<{ localImageFileName: string, returnedImageFileName: string }> {
    const viewerUserIDAsString = objectManager.getViewerUserId().toString()

    // Create directory
    const usersDirectory = path.resolve(userFileLocation)
    const userGroupDirectory = path.resolve(usersDirectory, viewerUserIDAsString.substring(0, 2))
    const userDirectory = path.resolve(userGroupDirectory, viewerUserIDAsString)
    const profileDirectory = path.resolve(userDirectory, 'profile')

    await ensurePathExists(usersDirectory)
    await ensurePathExists(userGroupDirectory)
    await ensurePathExists(userDirectory)
    await ensurePathExists(profileDirectory)

    const localImageFileName = path.resolve(profileDirectory, 'photo.jpg')
    const returnedImageFileName = 'n/a'

    return { localImageFileName, returnedImageFileName }
  }
}
