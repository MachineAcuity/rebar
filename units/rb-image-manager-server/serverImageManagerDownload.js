// @flow

import express from 'express'

import createImageDownloadConfiguration from '../_configuration/rb-image-manager/createImageDownloadConfiguration'
import log from '../rb-base-server/log'
import { getObjectManager } from '../rb-base-server/ObjectManager'
import {
  getUserAndSessionIDByUserToken1_async,
  verifyUserToken2,
} from '../rb-appbase-server/checkCredentials'

import ImageDownloadConfiguration from './ImageDownloadConfiguration'

//

// Create image upload configuration

const arrImageDownloadConfiguration: Array<ImageDownloadConfiguration> = []
createImageDownloadConfiguration(arrImageDownloadConfiguration)

function findImageDownloadConfiguration(req: Object) {
  for (let imageDownloadConfiguration of arrImageDownloadConfiguration) {
    if (imageDownloadConfiguration.isProperConfiguration(req)) {
      return imageDownloadConfiguration
    }
  }

  throw new Error(
    'rb-image-manager-server/serverImageManagerDownload: Could not find appropriate configuration',
  )
}

//

const serverImageManagerDownload = express()

// Route for image downloiads
serverImageManagerDownload.get('/download', async (req, res) => {
  try {
    // Get configuration
    const imageDownloadConfiguration = findImageDownloadConfiguration(req)

    // Create object manager
    const objectManager = await getObjectManager(req, res)

    // Verify credentials
    const UserAndSession = await getUserAndSessionIDByUserToken1_async(objectManager, req, true)
    if (!UserAndSession) throw new Error('Invalid user by UserToken1')

    const a_User = UserAndSession.User

    const verificationIssue = verifyUserToken2(a_User, req, 'query')
    if (verificationIssue) throw new Error('Invalid user by UserToken2')

    // Verify user permissions
    imageDownloadConfiguration.verifyUserPermissions(objectManager, req)

    // Get local file name
    const localImageFileName = await imageDownloadConfiguration.getLocalFileName_async(
      objectManager,
      req,
    )

    res.sendFile(localImageFileName)
  } catch (err) {
    const message = 'rb-image-manager-server/serverImageManagerDownload: Failed'
    log('error', message, { err, req })
    res.status(500).send(JSON.stringify({ error: message }))
  }
})

export default serverImageManagerDownload
