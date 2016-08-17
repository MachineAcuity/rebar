/* @flow weak */

import winston from 'winston'

let uuidSeed = 1

export default class PersisterMemory
{
  constructor( )
  {
    this.stores = { }
  }

  getStore( entityName: string )
  {
    if( entityName in this.stores )
      return this.stores[ entityName ]
    else
      return ( this.stores[ entityName ] = [ ] )
  }

  findIndexes( entityName: string, fieldName: string, value: any )
  {
    const store = this.getStore( entityName )
    const arr_Indexes = [ ]

    store.map( ( objectInStore, index ) => {
      if( objectInStore[ fieldName ] == value )
        arr_Indexes.push( index )
    } )

    return arr_Indexes
  }

  findObjects( entityName: string, fieldName: string, value: any )
  {
    const store = this.getStore( entityName )
    const arr_Objects = [ ]

    store.map( ( objectInStore ) => {
      if( objectInStore[ fieldName ] == value )
        arr_Objects.push( objectInStore )
    } )

    return arr_Objects
  }

  get( entityName: string, ObjectType: any, fieldName: string, values : Array<any> )
  {
    const arr_Objects = values.map( value => this.findObjects( entityName, fieldName, value )[ 0 ] )
    return Promise.resolve( arr_Objects )
  }

  getList( entityName: string, ObjectType: any, fieldName: string, values : Array<any> )
  {
    const arr_arr_Objects = values.map( value => this.findObjects( entityName, fieldName, value ) )
    return Promise.resolve( arr_arr_Objects )
  }

  add( entityName: string, fields: any, ObjectType: any )
  {
    const store = this.getStore( entityName )
    const newObject = new ObjectType( fields )

    store.push( newObject )

    return Promise.resolve( )
  }

  update( entityName: string, fields: any )
  {
    const an_Object = this.findObjects( entityName, 'id', fields.id )[ 0 ]

    for( let fieldName in fields )
      an_Object[ fieldName ] = fields[ fieldName ]

    return Promise.resolve( )
  }

  remove( entityName: string, fields: any )
  {
    const store = this.getStore( entityName )

    const indexToDelete = this.findIndexes( entityName, 'id', fields.id )
    store.splice( indexToDelete, 1 )

    return Promise.resolve( )
  }

  createLogger( )
  {
    return new (winston.transports.Console)( )
  }

  uuidFromString( str: string ): string
  {
    return str
  }

  uuidRandom( ): string
  {
    let tail = "000000000" + ( uuidSeed++ )
    tail = tail.substr( tail.length - 9  )
    const newUUID = '00000000-0000-0000-0000-' + tail // Just use srings

    return newUUID
  }

  uuidToString( id: any )
  {
    // ids are always strings anyway
    return id
  }

  uuidEquals( id1: any, id2: any ): boolean
  {
    return id1 == id2
  }

  addTableSchema( tableName: string, tableSchema: object ): void
  {
    // Nothing to do
  }
}
