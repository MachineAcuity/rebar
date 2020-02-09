// @flow

import serverAuth from '../../serverAuth'
import serverClientError from '../../serverClientError'
import serverGraphql from '../../serverGraphQL'
import serverWebApp from '../../serverWebApp'

export default function servers(router: Object, firstPathElementIsArtifactName: boolean) {
  const firstPathElement = firstPathElementIsArtifactName ? '/:artifact_name' : ''

  router.use(firstPathElement + '/auth', serverAuth)
  router.use(firstPathElement + '/client-error', serverClientError)
  router.use(firstPathElement + '/graphql', serverGraphql)
  router.use(serverWebApp)
}
