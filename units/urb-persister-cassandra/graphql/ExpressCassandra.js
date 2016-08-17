/* @flow weak */

import ExpressCassandra from 'express-cassandra'
import process from 'process'

import CassandraOptions from './CassandraOptions'


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

let tableSchemas = new Map( )
let canAddMoreTableSchemas = true

export function addTableSchema( tableName: string, tableSchema: object ): void
{
  if( ! canAddMoreTableSchemas )
  {
    console.error( "Attempting to add table schemas after express-cassandra client connect." )
    process.exit( 1 )
  }
  tableSchemas[ tableName ] = tableSchema
}

function loadATableSchema( tableSchemasAsArray, runAsPartOfSetupCassandra: boolean ): void
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
          if( runAsPartOfSetupCassandra )
            console.log( "Table ready: " + ExpressCassandraClient.modelInstance[ tableName ]._properties.name )

          loadATableSchema( tableSchemasAsArray, runAsPartOfSetupCassandra ) // Load the next table
        }
      }
    )
  }
  else if( runAsPartOfSetupCassandra )
  {
    console.log( "Success" )
    process.exit( )
  }
}

export function connectAndLoadSchemas( runAsPartOfSetupCassandra: boolean ): void
{
  // All table schemas should have been added by now.
  canAddMoreTableSchemas = false

  ExpressCassandraClient.connect( ( err ) =>
  {
    if( err )
      console.log( err.message )
    else
    {
      // TODO x7000 the code below replaces the Array.from function, which does not seem to be working
      //loadATableSchema( Array.from( tableSchemas ), runAsPartOfSetupCassandra )

      const tableSchemasAsArray = [ ]
      for( let tableName in tableSchemas )
        tableSchemasAsArray.push( [ tableName, tableSchemas[ tableName ] ] )
      loadATableSchema( tableSchemasAsArray, runAsPartOfSetupCassandra )

      tableSchemas = null // Free up the memory that is not needed any more
    }
  } )
}

export default ExpressCassandraClient
