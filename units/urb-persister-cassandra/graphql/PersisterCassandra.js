/* @flow weak */

import { runQuery, runQueryOneResult, runQueryNoResult, Uuid } from './CassandraClient'
import CassandraOptions from './CassandraOptions'
import ExpressCassandraClient, { addTableSchema } from './ExpressCassandra'
import WinstonCassandra from './WinstonCassandra'


export default class PersisterCassandra
{
  get( entityName: string, ObjectType: any, fieldName: string, values: Array<any> )
  {
    let cqlText = 'SELECT * FROM "' + entityName + '" WHERE "' + fieldName + '" = ?'
    let resultPromises = [ ]

    for( let value of values )
      resultPromises.push( runQueryOneResult( ObjectType, cqlText, [ value ] ) )

    return Promise.all( resultPromises )
  }

  getList( entityName: string, ObjectType: any, fieldName: string, values: Array<any> )
  {
    let cqlText = 'SELECT * FROM "' + entityName + '" WHERE "' + fieldName + '" = ?'
    let resultPromises = [ ]

    for( let value of values )
      resultPromises.push( runQuery( ObjectType, cqlText, [ value ] ) )

    return Promise.all( resultPromises )
  }

  updateUuidsInFields( entityName: string, fields: any )
  {
    const schemaFields = ExpressCassandraClient.instance[ entityName ]._properties.schema.fields
    for( let fieldName in schemaFields )
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
    let cqlText = 'UPDATE "' + entityName + '" SET '
    let cqlParams = [ ]

    let followingItem = false

    for( let fieldName in fields )
      if( fieldName != 'id' ) // Do not update id
      {
        if( followingItem )
          cqlText += ', '
        else
          followingItem = true

        cqlText += '"' + fieldName + '" = ?'
        cqlParams.push( fields[ fieldName ] )
      }

    cqlText += ' WHERE id = ?'
    cqlParams.push( fields.id )

    return runQueryNoResult( cqlText, cqlParams )
  }

  remove( entityName: string, fields: any )
  {
    const cqlText = 'DELETE FROM "' + entityName + '" WHERE id = ?'
    const cqlParams = [ fields.id ]

    return runQueryNoResult( cqlText, cqlParams )
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

  uuidToString( id: any )
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
    addTableSchema( tableName, tableSchema )
  }
}
