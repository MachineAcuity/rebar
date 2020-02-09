// @flow

import ImageDownloadConfiguration from '../../rb-image-manager-server/ImageDownloadConfiguration'

import ImageDownloadConfiguration_rb_account_management from '../../rb-account-management-server/extenders/rb-image-manager-server/ImageDownloadConfiguration_rb_account_management'

export default function createImageDownloadConfiguration(
  arrImageDownloadConfiguration: Array<ImageDownloadConfiguration>,
) {
  arrImageDownloadConfiguration.push(new ImageDownloadConfiguration_rb_account_management())
}
