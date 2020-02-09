// @flow

import express from 'express'
import expressFileUpload from 'express-fileupload'

import createImageUploadConfiguration from '../_configuration/rb-image-manager/createImageUploadConfiguration'
import log from '../rb-base-server/log'
import { getObjectManager } from '../rb-base-server/ObjectManager'
import {
  getUserAndSessionIDByUserToken1_async,
  verifyUserToken2,
} from '../rb-appbase-server/checkCredentials'

import ImageUploadConfiguration from './ImageUploadConfiguration'

//

// Create image upload configuration

const arrImageUploadConfiguration: Array<ImageUploadConfiguration> = []
createImageUploadConfiguration(arrImageUploadConfiguration)

function findImageUploadConfiguration(req: Object) {
  for (let imageUploadConfiguration of arrImageUploadConfiguration) {
    if (imageUploadConfiguration.isProperConfiguration(req)) {
      return imageUploadConfiguration
    }
  }

  throw new Error(
    'rb-image-manager-server/serverImageManagerUpload: Could not find appropriate configuration',
  )
}

//

const serverImageManagerUpload = express()

serverImageManagerUpload.use(
  expressFileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  }),
)

// Route for image uploads
serverImageManagerUpload.post('/upload', async (req, res) => {
  try {
    // Get configuration
    const imageUploadConfiguration = findImageUploadConfiguration(req)

    // Create object manager
    const objectManager = await getObjectManager(req, res)

    // Verify credentials
    const UserAndSession = await getUserAndSessionIDByUserToken1_async(objectManager, req, true)
    if (!UserAndSession) throw new Error('Invalid user by UserToken1')

    const a_User = UserAndSession.User

    const verificationIssue = verifyUserToken2(a_User, req, 'headers')
    if (verificationIssue) throw new Error('Invalid user by UserToken2')

    // Verify user permissions
    imageUploadConfiguration.verifyUserPermissions(objectManager, req)

    // Response is always JSON
    res.set('Content-Type', 'application/json')

    if (!req.files) {
      const error = 'rb-image-manager-server/serverImageManagerUpload: [files] not found in request'
      log('error', error, { req })
      res.status(417).send(JSON.stringify({ error }))
      return
    }

    const {
      localImageFileName,
      returnedImageFileName,
    } = await imageUploadConfiguration.generateFileNames_async(objectManager, req)

    const uploadedFile = req.files.uploadedFile
    uploadedFile.mv(localImageFileName, async (err) => {
      if (err) {
        const message =
          'rb-image-manager-server/serverImageManagerUpload: Failed when uploading file'
        log('error', message, { req })
        res.status(500).send(JSON.stringify({ error: message }))
        return
      } else {
        /*
        const sharpImage = sharp(uploadedFile.data)
        const imageMetadata = await sharpImage.metadata()

        const width = imageMetadata.width
        const height = imageMetadata.height

        const RBImage_id = await objectManager.add('RBImage', {
          RBImage_Width: width,
          RBImage_Height: height,
          RBImage_TimeStamp: new Date(),
          RBImage_User_id: User_id,
          RBImage_IsInUse: false,
          RBImage_Storage: 100000, // File systems
        })

        await objectManager.add('RBImageCopy', {
          id: RBImageCopy_id,
          RBImageCopy_RBImage_id: RBImage_id,
          RBImageCopy_Width: width,
          RBImageCopy_Height: height,
          RBImageCopy_ResizeMode: 100000, // Some mode
        })

        const RBImageGlobalId = toGlobalId('RBImage', RBImage_id)
        */
        res.send(JSON.stringify({ fileName: returnedImageFileName }))
      }
    })
  } catch (err) {
    const message = 'rb-image-manager-server/serverImageManagerUpload: Failed with exception'
    log('error', message, { err, req })
    res.status(500).send(JSON.stringify({ error: message }))
  }
})

export default serverImageManagerUpload
