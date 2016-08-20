/* @flow weak */

import CassandraDriver from 'cassandra-driver'
import ExpressCassandra from 'express-cassandra'

import CassandraOptions from './CassandraOptions'
import WinstonCassandra from './WinstonCassandra'


const Uuid = CassandraDriver.types.Uuid

const ExpressCassandraClient = ExpressCassandra.createClient( {
  clientOptions: CassandraOptions, // Options are pre-set in a separate part of the application, they are correct
  ormOptions: {
    defaultReplicationStrategy : {
      class: 'SimpleStrategy',
      replication_factor: 1
    },
    migration: 'safe',
    createKeyspace: true
  }
} )

export default class PersisterCassandra
{
  constructor( )
  {
    this.tableSchemas = new Map( )
    this.canAddMoreTableSchemas = true

  }

  getOneObject( entityName: string, ObjectType: any, filters: Array<any> ): Promise
  {
    const resultPromises = [ ]

    for( let filter of filters )
      resultPromises.push(
        new Promise( ( resolve, reject ) =>
        {
          this.updateUuidsInFields( entityName, filter )
          ExpressCassandraClient.instance[ entityName ].findOne( filter, { raw: true }, (err, entity ) => {
            if( err )
              reject( err )
            else
            {
              if( entity != null )
                resolve( new ObjectType( entity ) )
              else
                resolve( null )
            }
          } )
        } )
      )

    return Promise.all( resultPromises )
  }

  getObjectList( entityName: string, ObjectType: any, filters: Array<any> ): Promise
  {
    const resultPromises = [ ]

    for( let filter of filters )
      resultPromises.push(
        new Promise( ( resolve, reject ) =>
        {
          this.updateUuidsInFields( entityName, filter )
          ExpressCassandraClient.instance[ entityName ].find( filter, { raw: true }, (err, arrEntities ) => {
            if( err )
              reject( err )
            else
            {
              const arrRetObj = [ ]
              for( let entity of arrEntities )
                arrRetObj.push( new ObjectType( entity ) )
              resolve( arrRetObj )
            }
          } )
        } )
      )

    return Promise.all( resultPromises )
  }

  updateUuidsInFields( entityName: string, fields: any )
  {
    const schemaFields = ExpressCassandraClient.instance[ entityName ]._properties.schema.fields
    for( let fieldName in fields )
    {
      const fieldType = schemaFields[ fieldName ]
      if( fieldType === 'uuid' )
      {
        const fieldValue = fields[ fieldName ]
        if( ! ( fieldValue instanceof Uuid ) )
          fields[ fieldName ] = Uuid.fromString( fieldValue )
      }
    }
  }

  add( entityName: string, fields: any )
  {
    this.updateUuidsInFields( entityName, fields )

    return new Promise( ( resolve, reject ) =>
    {
      const entity = new ExpressCassandraClient.instance[ entityName ]( fields )
      entity.save( ( err ) =>
      {
        if( err )
          reject( err )
        else
          resolve( )
      } )
    } )
  }

  update( entityName: string, fields: any )
  {
    // TODO x2000 Optimize this with update, possibly. Maybe it's not so bad to read first after all
    return this.add( entityName, fields )
  }

  remove( entityName: string, fields: any )
  {
    this.updateUuidsInFields( entityName, fields )

    return new Promise( ( resolve, reject ) =>
    {
      ExpressCassandraClient.instance[ entityName ].delete( fields , ( err ) =>
      {
        if( err )
          reject( err )
        else
          resolve( )
      } )
    } )
  }

  createLogger( )
  {
    return new WinstonCassandra( CassandraOptions )
  }

  uuidFromString( str: string )
  {
    return Uuid.fromString( str )
  }

  uuidRandom( )
  {
    return Uuid.random( )
  }

  uuidToString( id: any ): string
  {
    if( id instanceof Uuid )
      id = id.toString( )

    return id
  }

  uuidEquals( id1: any, id2: any ): boolean
  {
    return id1.equals( id2 )
  }

  addTableSchema( tableName: string, tableSchema: object ): void
  {
    if( ! this.canAddMoreTableSchemas )
    {
      console.error( "Attempting to add table schemas after express-cassandra client connect." )
      process.exit( 1 )
    }
    this.tableSchemas[ tableName ] = tableSchema
  }

  initialize( runAsPartOfSetupDatabase: boolean ): void
  {
    console.log( 'Initializing Cassandra persister' )

    // All table schemas should have been added by now.
    this.canAddMoreTableSchemas = false

    ExpressCassandraClient.connect( ( err ) =>
    {
      if( err )
        console.log( err.message )
      else
      {
        // TODO x7000 the code below replaces the Array.from function, which does not seem to be working
        //loadATableSchema( Array.from( this.tableSchemas ), runAsPartOfSetupDatabase )

        const tableSchemasAsArray = [ ]
        for( let tableName in this.tableSchemas )
          tableSchemasAsArray.push( [ tableName, this.tableSchemas[ tableName ] ] )
        this.loadATableSchema( tableSchemasAsArray, runAsPartOfSetupDatabase )

        this.tableSchemas = null // Free up the memory that is not needed any more
      }
    } )
  }

  loadATableSchema( tableSchemasAsArray, runAsPartOfSetupDatabase: boolean ): void
  {
    if( tableSchemasAsArray.length > 0 )
    {
      const tableName = tableSchemasAsArray[ 0 ][ 0 ]
      const tableSchema = tableSchemasAsArray[ 0 ][ 1 ]

      tableSchemasAsArray.splice( 0, 1 )

      ExpressCassandraClient.loadSchema(
        tableName,
        tableSchema,
        ( err ) =>
        {
          if( err )
          {
            console.error( err.message )
            process.exit( 1 )
          }
          else
          {
            if( runAsPartOfSetupDatabase )
              console.log( "Table ready: " + ExpressCassandraClient.modelInstance[ tableName ]._properties.name )

            this.loadATableSchema( tableSchemasAsArray, runAsPartOfSetupDatabase ) // Load the next table
          }
        }
      )
    }
    else if( runAsPartOfSetupDatabase )
    {
      console.log( "Success" )
      process.exit( )
    }
  }
}
