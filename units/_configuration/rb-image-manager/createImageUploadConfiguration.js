// @flow

import ImageUploadConfiguration from '../../rb-image-manager-server/ImageUploadConfiguration'

import ImageUploadConfiguration_rb_account_management from '../../rb-account-management-server/extenders/rb-image-manager-server/ImageUploadConfiguration_rb_account_management'

export default function createImageUploadConfiguration(
  arrImageUploadConfiguration: Array<ImageUploadConfiguration>,
) {
  arrImageUploadConfiguration.push(new ImageUploadConfiguration_rb_account_management())
}
