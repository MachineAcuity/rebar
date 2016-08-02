/* @flow weak */

import DataLoader from 'dataloader'

import AnonymousUserToken2 from '../configuration/server/AnonymousUserToken2'
import ObjectPersisterCassandra from './ObjectPersisterCassandra.js'
import ObjectPersisterMemory from './ObjectPersisterMemory.js'
import User from '../configuration/graphql/model/User'
import { Uuid } from './CassandraClient.js'


// Read environment
require( 'dotenv' ).load( )


// Anonymous user
const User_0 = new User( {
  id: Uuid.fromString( '00000000-0000-0000-0000-000000000000' ),
  User_AccountName: '',
  User_AccountPassword: '',
  User_DisplayName: 'Anonymous',
  "User_ProfilePhoto": '',
  User_Email: '',
  User_PhoneNumberMobile: '',
  User_Locale: '',
  UserToken2: AnonymousUserToken2
} )

// Set persistence
const ObjectPersister = (process.env.OBJECT_PERSISTENCE == 'memory') ? ObjectPersisterMemory : ObjectPersisterCassandra

// Static set of entity definitions
const entityDefinitions = { }

export default class ObjectManager
{
  Viewer_User_id: string

  constructor( )
  {
    this.loadersSingle = { }
    this.loadersMultiple = { }
    this.Viewer_User_id = null
  }

  static registerEntity( entityName: string, EntityType : any )
  {
    if( entityName in entityDefinitions )
      throw new Error( "Entity already registered: " + entityName )

    // In order to be able to access the name as a static property of the type
    EntityType.entityName = entityName

    entityDefinitions[ entityName ] = {
      EntityName: entityName,
      EntityType: EntityType,
      TriggersForAdd: [ ],
      TriggersForUpdate: [ ],
      TriggersForRemove: [ ]
    }
  }

  static RegisterTriggerForAdd( entityName: string, handler: any )
  {
    entityDefinitions[ entityName ].TriggersForAdd.push( handler )
  }

  static RegisterTriggerForUpdate( entityName: string, handler: any )
  {
    entityDefinitions[ entityName ].TriggersForUpdate.push( handler )
  }

  static RegisterTriggerForAddAndUpdate( entityName: string, handler: any )
  {
    ObjectManager.RegisterTriggerForAdd( entityName, handler )
    ObjectManager.RegisterTriggerForUpdate( entityName, handler )
  }

  static RegisterTriggerForRemove( entityName: string, handler: any )
  {
    entityDefinitions[ entityName ].TriggersForRemove.push( handler )
  }

  setViewerUserId( Viewer_User_id: string )
  {
    this.Viewer_User_id = Viewer_User_id
  }

  getLoadersSingle( entityName : string )
  {
    const foundLoaders = this.loadersSingle[ entityName ]
    if( foundLoaders != null )
      return foundLoaders
    else
      return this.loadersSingle[ entityName ] = { }
  }

  getLoadersMultiple( entityName : string )
  {
    const foundLoaders = this.loadersMultiple[ entityName ]
    if( foundLoaders != null )
      return foundLoaders
    else
      return this.loadersMultiple[ entityName ] = { }
  }

  clearLoadersMultiple( entityName : string )
  {
    this.loadersMultiple[ entityName ] = { }
  }

  getViewerUserId( )
  {
    if( this.Viewer_User_id == null )
      throw new Error( "Object Manager: viewer user id has not been set" )

    return this.Viewer_User_id
  }

  getLoader( entityName: string, fieldName: string, multipleResults: boolean )
  {
    if( ! ( entityName in entityDefinitions ) )
      throw new Error( "Can not find entity type named " + entityName )

    const EntityType = entityDefinitions[ entityName ].EntityType

    let loadersList = multipleResults ? this.getLoadersMultiple( entityName ) : this.getLoadersSingle( entityName )
    let loader = loadersList[ fieldName ]
    if( loader == null )
    {
      if( multipleResults )
        loader = new DataLoader( values => ObjectPersister.ObjectPersister_getList( entityName, EntityType, fieldName, values ) )
      else
        loader = new DataLoader( values => ObjectPersister.ObjectPersister_get( entityName, EntityType, fieldName, values ) )

      loadersList[ fieldName ] = loader
    }

    return loader
  }

  getOneById( entityName: string, id: Uuid )
  {
    // Special hack for anonymous users
    if( entityName == 'User' && id == '00000000-0000-0000-0000-000000000000' )
      return Promise.resolve( User_0 )
    // For all non-user, non 0 ids, load from data loader
    else
    {
      const loader = this.getLoader( entityName, 'id', false )

      if( id instanceof Uuid )
        id = id.toString( )

      return loader.load( id )
    }
  }

  getListBy( entityName: string, fieldName: string, value: string )
  {
    const loader = this.getLoader( entityName, fieldName, true )

    return loader.load( value )
  }

  invalidateLoaderCache( entityName: string, fields: any )
  {
    // At this moment there is no obvious way of knowing what to clear from lists, so delete them all
    this.clearLoadersMultiple( entityName )

    const loadersSingle = this.getLoadersSingle( entityName )
    for( let loaderFieldName in loadersSingle )
    {
      if( loaderFieldName === 'id' )
        loadersSingle[ loaderFieldName ].clear( fields.id )
      else
        delete loadersSingle[ loaderFieldName ]
    }
  }

  executeTriggers( arrTriggers, fields )
  {
    const arrPromises = [ ]
    for( let trigger of arrTriggers )
    {
      arrPromises.push( trigger( this, fields ) )
    }

    return Promise.all( arrPromises )
  }

  add( entityName: string, fields: any )
  {
    const entityDefinition = entityDefinitions[ entityName ]

    if( entityDefinition == null ) console.log( 'Cound not find entity'+ entityName )

    // Generate primary key
    fields.id = Uuid.random( )

    // If this is a user ID
    if( entityName == 'User' )
      this.setViewerUserId( fields.id.toString( ) )

    return this.executeTriggers( entityDefinition.TriggersForAdd, fields )
    .then( ( ) => ObjectPersister.ObjectPersister_add( entityName, fields, entityDefinition.EntityType ) )
    .then( ( ) => {
      this.invalidateLoaderCache( entityName, fields )
      return fields.id
    } )
  }

  update( entityName: string, fields: any )
  {
    const entityDefinition = entityDefinitions[ entityName ]

    if( entityDefinition == null ) console.log( 'Cound not find entity'+ entityName )

    return this.executeTriggers( entityDefinition.TriggersForUpdate, fields )
    .then( ObjectPersister.ObjectPersister_update( entityName, fields ) )
    .then( ( ) => {
      this.invalidateLoaderCache( entityName, fields )
    } )

  }

  remove( entityName: string, fields: any )
  {
    const entityDefinition = entityDefinitions[ entityName ]

    return this.executeTriggers( entityDefinition.TriggersForRemove, fields )
    .then( ObjectPersister.ObjectPersister_remove( entityName, fields ) )
    .then( ( ) => {
      this.invalidateLoaderCache( entityName, fields )
    } )

  }
}

ObjectManager.registerEntity( 'User', User )
