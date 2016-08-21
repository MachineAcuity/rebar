/* @flow */


// Uncomment the import section for the persister you need as default


// import PersisterCassandra from '../../units/urb-persister-cassandra/graphql/PersisterCassandra'
// const defaultPersister = new PersisterCassandra( )


// import PersisterDynamoDB from '../../units/urb-persister-dynamodb/graphql/PersisterDynamoDB'
// const defaultPersister = new PersisterDynamoDB( )


import PersisterMemory from '../../units/urb-persister-memory/graphql/PersisterMemory'
const defaultPersister = new PersisterMemory( )


// And export the default
export default defaultPersister
