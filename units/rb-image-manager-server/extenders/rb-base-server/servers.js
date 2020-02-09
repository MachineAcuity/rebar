// @flow

import serverImageManagerDownload from '../../serverImageManagerDownload'
import serverImageManagerUpload from '../../serverImageManagerUpload'

export default function servers(router: Object, firstPathElementIsArtifactName: boolean) {
  const firstPathElement = firstPathElementIsArtifactName ? '/:artifact_name' : ''

  router.use(firstPathElement + '/rb-image-manager', serverImageManagerDownload)
  router.use(firstPathElement + '/rb-image-manager', serverImageManagerUpload)
}
