// @flow

import defaultPersister from '../../../_configuration/rb-base-server/graphql/defaultPersister'

defaultPersister.addTableSchema('User', {
  fields: {
    id: 'uuid',
    User_artifact_id: 'uuid',
    UserToken2: 'text',

    User_DisplayName: 'text',
    User_Description: 'text',
    User_PrimaryEmail: 'text',
    User_PrimaryPhone: 'text',
    User_PrimaryLatitude: 'double',
    User_PrimaryLongitude: 'double',

    User_IsGroup: 'boolean',
    User_IsTeamGroup: 'boolean',

    User_created_by: 'uuid',
    User_created_on: 'timestamp',
    User_modified_by: 'uuid',
    User_modified_on: 'timestamp',
  },
  key: [ 'id' ],
})

export default true
