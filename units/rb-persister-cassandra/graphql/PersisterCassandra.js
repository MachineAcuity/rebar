// @flow

import CassandraDriver from 'cassandra-driver'
import ExpressCassandra from 'express-cassandra'

import CassandraOptions from './CassandraOptions'
import WinstonTransportCassandra from './WinstonTransportCassandra'

const Uuid = CassandraDriver.types.Uuid
const Uuid_Null_String = '00000000-0000-0000-0000-000000000000'
const Uuid_Null = Uuid.fromString(Uuid_Null_String)

export const ExpressCassandraClient = ExpressCassandra.createClient({
  clientOptions: CassandraOptions, // Options are pre-set in a separate part of the application, they are correct
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: CassandraOptions.contactPoints.length > 1 ? 2 : 1,
    },
    migration: 'alter',
    disableTTYConfirmation: true,
    createKeyspace: true,
  },
})

export default class PersisterCassandra {
  tableSchemas: ?Map<string, Object>

  constructor() {
    this.tableSchemas = new Map()
  }

  getOneObject(entityName: string, ObjectType: any, filters: Array<any>): Promise<any> {
    const resultPromises = []

    for (let filter of filters) {
      // Configure our default options
      let options: Object = {
        raw: true,
        allow_filtering: true,
      }

      // In order to use materialized view, we need to pass it to the opions
      if (filter.hasOwnProperty('_materialized_view')) {
        // Set option to use materialized view
        options.materialized_view = filter._materialized_view

        // Remove _materialized_view from filter
        filter = Object.assign({}, filter)
        delete filter._materialized_view
      }

      resultPromises.push(
        new Promise((resolve, reject) => {
          try {
            this.updateUuidsInFields(entityName, filter)

            ExpressCassandraClient.instance[entityName].findOne(filter, options, (err, entity) => {
              if (err) {
                reject(
                  'getOneObject findOne failed: ' +
                    JSON.stringify({
                      entityName,
                      filter,
                      message: err.message,
                    }),
                )
              } else {
                if (entity != null) resolve(new ObjectType(entity))
                else resolve(null)
              }
            })
          } catch (err) {
            reject(
              'getOneObject failed: ' +
                JSON.stringify({
                  entityName,
                  filter,
                  message: err.message,
                  stack: err.stack,
                }),
            )
          }
        }),
      )
    }

    return Promise.all(resultPromises)
  }

  getObjectList(entityName: string, ObjectType: any, filters: Array<any>): Promise<Array<any>> {
    const resultPromises = []

    for (let filter of filters) {
      // Configure our default options
      let options: Object = {
        raw: true,
        allow_filtering: true,
      }

      // In order to use materialized view, we need to pass it to the opions
      if (filter.hasOwnProperty('_materialized_view')) {
        // Set option to use materialized view
        options.materialized_view = filter._materialized_view

        // Remove _materialized_view from filter
        filter = Object.assign({}, filter)
        delete filter._materialized_view
      }

      resultPromises.push(
        new Promise((resolve, reject) => {
          try {
            this.updateUuidsInFields(entityName, filter)

            ExpressCassandraClient.instance[
              entityName
            ].find(filter, options, (err, arrEntities) => {
              if (err) {
                reject(
                  'getObjectList find failed: ' +
                    JSON.stringify({
                      entityName,
                      filter,
                      message: err.message,
                    }),
                )
              } else {
                const arrRetObj = []
                for (let entity of arrEntities) arrRetObj.push(new ObjectType(entity))
                resolve(arrRetObj)
              }
            })
          } catch (err) {
            reject(
              'getObjectList failed: ' +
                JSON.stringify({
                  entityName,
                  filter,
                  message: err.message,
                  stack: err.stack,
                }),
            )
          }
        }),
      )
    }

    return Promise.all(resultPromises)
  }

  updateUuidsInFields(entityName: string, fields: any) {
    const schemaFields = ExpressCassandraClient.instance[entityName]._properties.schema.fields

    for (let fieldName in fields) {
      const fieldValue = fields[fieldName]

      // $in should only be used with UUID, no strings will be allowed
      if (fieldValue && fieldValue.$in) continue

      const fieldType = schemaFields[fieldName]

      if (fieldType === 'uuid') {
        if (!(fieldValue instanceof Uuid)) {
          fields[fieldName] = Uuid.fromString(fieldValue)
        }
      }
    }
  }

  add(entityName: string, fields: any): Promise<any> {
    this.updateUuidsInFields(entityName, fields)

    const options = {}

    // In order to set TTL, we need to pass it to the opions
    if (fields.hasOwnProperty('_ttl')) {
      // Set option to use ttl
      options.ttl = fields._ttl

      // Remove ttl from filter
      fields = Object.assign({}, fields)
      delete fields._ttl
    }

    return new Promise((resolve, reject) => {
      const entity = new ExpressCassandraClient.instance[entityName](fields)
      entity.save(options, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  update(entityName: string, fields: any): Promise<null> {
    // [2 Crossroads][Server] Optimize this with update, possibly. Maybe it's not so bad to read first after all
    return this.add(entityName, fields)
  }

  remove(entityName: string, fields: any): Promise<any> {
    this.updateUuidsInFields(entityName, fields)

    return new Promise((resolve, reject) => {
      ExpressCassandraClient.instance[entityName].delete(fields, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  createLogger() {
    return new WinstonTransportCassandra(CassandraOptions)
  }

  uuidFromString(str: string) {
    return Uuid.fromString(str)
  }

  uuidRandom() {
    return Uuid.random()
  }

  uuidNull() {
    return Uuid_Null
  }

  uuidNullAsString() {
    return Uuid_Null_String
  }

  uuidToString(id: any): string {
    if (id instanceof Uuid) id = id.toString()

    return id
  }

  uuidEquals(id1: any, id2: any): boolean {
    return id1.equals(id2)
  }

  addTableSchema(tableName: string, tableSchema: Object): void {
    if (this.tableSchemas) this.tableSchemas.set(tableName, tableSchema)
    else {
      console.error(
        'Error: Attempting to add table schemas after express-cassandra client connect.',
      )
      process.exit(1)
    }
  }

  confirmHealth(): Promise<any> {
    return new Promise((resolve, reject) => {
      ExpressCassandraClient.modelInstance.User.get_cql_client((err, client) => {
        if (err) reject(err)
        else
          client.execute('select release_version from system.local;', (err, result) => {
            if (err) reject(err)
            else resolve()
          })
      })
    })
  }

  initialize(runAsPartOfSetupDatabase: boolean, cb: Function): void {
    // All table schemas should have been added by now.
    const enrolledTables = this.tableSchemas
    this.tableSchemas = null // Free up the memory that is not needed any more and indicate that we can not add any more

    const arrSchemas = []
    // $FlowIgnore enrolledTables should be populated here
    for (let tableName of enrolledTables.keys()) {
      // $FlowIgnore enrolledTables should be populated here
      arrSchemas.push([ tableName, enrolledTables.get(tableName) ])
    }
    this.loadOneTableSchemaFromArray(arrSchemas, runAsPartOfSetupDatabase, cb)
  }

  loadOneTableSchemaFromArray(
    arrSchemas: Array<any>,
    runAsPartOfSetupDatabase: boolean,
    cb: Function,
  ): void {
    if (arrSchemas.length > 0) {
      const tableName = arrSchemas[0][0]
      const tableSchema = arrSchemas[0][1]
      arrSchemas.splice(0, 1)

      if (runAsPartOfSetupDatabase) {
        console.log(' Prepare table ' + tableName + '.')
      }
      ExpressCassandraClient.loadSchema(tableName, tableSchema).syncDB((err) => {
        // When used with scylla, this always happens. Just ignore the message
        if (err && err.message.startsWith('Given Schema does not match existing DB Table')) {
          err = null
        }

        if (err) {
          console.log(
            'Error:  Initializing Cassandra persister - error while creating ' + tableName + '!',
          )
          console.error(err.message)
          process.exit(1)
        } else {
          if (runAsPartOfSetupDatabase)
            console.log(
              ' Table ' +
                ExpressCassandraClient.modelInstance[tableName]._properties.name +
                ' ready.',
            )
          this.loadOneTableSchemaFromArray(arrSchemas, runAsPartOfSetupDatabase, cb)
          // Load the next table
          return
        }
      })
    } else {
      cb()
    }
  }
}
