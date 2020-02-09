// @flow

import fsWithCallbacks from 'fs'
import path from 'path'

import NestedError from 'nested-error-stacks'

import ImageDownloadConfiguration from '../../../rb-image-manager-server/ImageDownloadConfiguration'
import ObjectManager from '../../../rb-base-server/ObjectManager'

//

const fs = fsWithCallbacks.promises

// Read environment
require('dotenv').config()

//

const envRebarDataFilesLocation = process.env.REBAR_DATA_FILES_LOCATION
if (envRebarDataFilesLocation == null || typeof envRebarDataFilesLocation !== 'string')
  throw new Error(
    'Error: Machine Acuity unit requires environment variable REBAR_DATA_FILES_LOCATION to be set',
  )

const designerFilesLocation = path.resolve(envRebarDataFilesLocation, 'user')

//

const noProfilePicFileName = path.resolve(
  'units/rb-account-management-server/assets/user_photo_unavailable.png',
)

//

export default class ImageDownloadConfiguration_rb_account_management extends ImageDownloadConfiguration {
  isProperConfiguration(req: Object): boolean {
    if (req.query && req.query.isUserProfilePhoto === 'true') return true
    else return false
  }

  async verifyUserPermissions(objectManager: ObjectManager, req: Object) {}

  async getLocalFileName_async(objectManager: ObjectManager, req: Object): Promise<string> {
    const viewerUserIDAsString = objectManager.getViewerUserId().toString()

    let localImageFileName = path.resolve(
      designerFilesLocation,
      viewerUserIDAsString.substring(0, 2),
      viewerUserIDAsString,
      'profile',
      'photo.jpg',
    )

    let localImageFileExists = false
    try {
      const stats = await fs.stat(localImageFileName)
      if (stats.isFile()) {
        localImageFileExists = true
      }
    } catch (err) {
      // If file not found it is OK - otherwise throw exception
      if (err.code !== 'ENOENT')
        throw new NestedError(
          'rb-account-management-server/ImageDownloadConfiguration_rb_account_management: Failed',
          err,
        )
    }

    // Proviode stand-in for profile picture
    if (!localImageFileExists) {
      localImageFileName = noProfilePicFileName
    }

    return localImageFileName
  }
}
