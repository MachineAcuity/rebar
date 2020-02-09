"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _express = _interopRequireDefault(require("express"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _createImageUploadConfiguration = _interopRequireDefault(require("../_configuration/rb-image-manager/createImageUploadConfiguration"));
var _log = _interopRequireDefault(require("../rb-base-server/log"));
var _ObjectManager = require("../rb-base-server/ObjectManager");
var _checkCredentials = require("../rb-appbase-server/checkCredentials");




var _ImageUploadConfiguration = _interopRequireDefault(require("./ImageUploadConfiguration"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

// Create image upload configuration

const arrImageUploadConfiguration = [];
(0, _createImageUploadConfiguration.default)(arrImageUploadConfiguration);

function findImageUploadConfiguration(req) {
  for (let imageUploadConfiguration of arrImageUploadConfiguration) {
    if (imageUploadConfiguration.isProperConfiguration(req)) {
      return imageUploadConfiguration;
    }
  }

  throw new Error(
  'rb-image-manager-server/serverImageManagerUpload: Could not find appropriate configuration');

}

//

const serverImageManagerUpload = (0, _express.default)();

serverImageManagerUpload.use(
(0, _expressFileupload.default)({
  limits: { fileSize: 10 * 1024 * 1024 } }));



// Route for image uploads
serverImageManagerUpload.post('/upload', async (req, res) => {
  try {
    // Get configuration
    const imageUploadConfiguration = findImageUploadConfiguration(req);

    // Create object manager
    const objectManager = await (0, _ObjectManager.getObjectManager)(req, res);

    // Verify credentials
    const UserAndSession = await (0, _checkCredentials.getUserAndSessionIDByUserToken1_async)(objectManager, req, true);
    if (!UserAndSession) throw new Error('Invalid user by UserToken1');

    const a_User = UserAndSession.User;

    const verificationIssue = (0, _checkCredentials.verifyUserToken2)(a_User, req, 'headers');
    if (verificationIssue) throw new Error('Invalid user by UserToken2');

    // Verify user permissions
    imageUploadConfiguration.verifyUserPermissions(objectManager, req);

    // Response is always JSON
    res.set('Content-Type', 'application/json');

    if (!req.files) {
      const error = 'rb-image-manager-server/serverImageManagerUpload: [files] not found in request';
      (0, _log.default)('error', error, { req });
      res.status(417).send(JSON.stringify({ error }));
      return;
    }

    const {
      localImageFileName,
      returnedImageFileName } =
    await imageUploadConfiguration.generateFileNames_async(objectManager, req);

    const uploadedFile = req.files.uploadedFile;
    uploadedFile.mv(localImageFileName, async err => {
      if (err) {
        const message =
        'rb-image-manager-server/serverImageManagerUpload: Failed when uploading file';
        (0, _log.default)('error', message, { req });
        res.status(500).send(JSON.stringify({ error: message }));
        return;
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




        res.send(JSON.stringify({ fileName: returnedImageFileName }));
      }
    });
  } catch (err) {
    const message = 'rb-image-manager-server/serverImageManagerUpload: Failed with exception';
    (0, _log.default)('error', message, { err, req });
    res.status(500).send(JSON.stringify({ error: message }));
  }
});var _default =

serverImageManagerUpload;exports.default = _default;
//# sourceMappingURL=serverImageManagerUpload.js.map