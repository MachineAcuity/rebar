/* @flow weak */

import DataLoader from 'dataloader'
import { cursorForObjectInConnection } from 'graphql-relay'

import AnonymousUserToken2 from '../configuration/server/AnonymousUserToken2'
import defaultPersister from '../configuration/graphql/defaultPersister'
import log from '../server/log'
import User from '../configuration/graphql/model/User'

import _schemas_system from './model/_schemas'
import _schemas from '../configuration/graphql/_schemas'

_schemas_system;
_schemas;

// Anonymous user
const User_0 = new User( {
  id: defaultPersister.uuidFromString( '00000000-0000-0000-0000-000000000000' ),
  User_AccountName: '',
  User_AccountPassword: '',
  User_DisplayName: 'Anonymous',
  "User_ProfilePhoto": '',
  User_Email: '',
  User_PhoneNumberMobile: '',
  User_Locale: '',
  UserToken2: AnonymousUserToken2
} )

// Static set of entity definitions
const entityDefinitions = { }

// Static array of object managers
const setPersisters = new Set( )

export default class ObjectManager
{
  Viewer_User_id: string

  constructor( )
  {
    this.loadersSingle = { }
    this.loadersMultiple = { }
    this.Viewer_User_id = null
  }

  static registerEntity( entityName: string, EntityType : any, persister: any ): void
  {
    if( entityName in entityDefinitions )
      throw new Error( "Entity already registered: " + entityName )

    // In order to be able to access the name as a static property of the type
    EntityType.entityName = entityName

    // Determine persister - default, or otherwise
    if( persister == null )
      persister = defaultPersister

    // A set would retain only one copy of a persister
    setPersisters.add( persister )

    entityDefinitions[ entityName ] = {
      EntityName: entityName,
      EntityType: EntityType,
      Persister: persister,
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

    const entityDefinition = entityDefinitions[ entityName ]
    const entityType = entityDefinition.EntityType

    let loadersList = multipleResults ? this.getLoadersMultiple( entityName ) : this.getLoadersSingle( entityName )
    let loader = loadersList[ fieldName ]
    if( loader == null )
    {
      if( multipleResults )
        loader = new DataLoader( filter => entityDefinition.Persister.getObjectList( entityName, entityType, filter ) )
      else
        loader = new DataLoader( filter => entityDefinition.Persister.getOneObject( entityName, entityType, filter ) )

      loadersList[ fieldName ] = loader
    }

    return loader
  }

  getOneObject( entityName: string, filter: object )
  {
    // TODO x2000 Provide try catch with logging here!
    // Special hack for anonymous users
    if( entityName == 'User' )
      if( filter.id == '00000000-0000-0000-0000-000000000000' )
        return Promise.resolve( User_0 )

    // For all non-user, non 0 ids, load from data loader per protocol
    const loaderIdentifier = Object.keys( filter ).sort( ).join( ',' )
    const loader = this.getLoader( entityName, loaderIdentifier, false )

    return loader.load( filter )
  }

  // TODO x1000 this should be replaced with getOneObject calls
  getOneById( entityName: string, id: any )
  {
    return this.getOneObject( entityName, { id: id } )
  }

  // TODO x1000 this should be replaced with getObjectList calls
  getListBy( entityName: string, fieldName: string, value: string )
  {
    const filter = { }
    filter[ fieldName ] = value
    return this.getObjectList( entityName, filter )
  }

  getObjectList( entityName: string, filter: object )
  {
    // TODO x2000 Provide try catch with logging here!
    const loaderIdentifier = Object.keys( filter ).sort( ).join( ',' )
    const loader = this.getLoader( entityName, loaderIdentifier, true )

    return loader.load( filter )
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
    fields.id = entityDefinition.Persister.uuidRandom( )

    // If this is a user ID
    if( entityName == 'User' )
      this.setViewerUserId( fields.id.toString( ) )

    return this.executeTriggers( entityDefinition.TriggersForAdd, fields )
    .then( ( ) => entityDefinition.Persister.add( entityName, fields, entityDefinition.EntityType ) )
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
    .then( entityDefinition.Persister.update( entityName, fields ) )
    .then( ( ) => {
      this.invalidateLoaderCache( entityName, fields )
    } )
  }

  remove( entityName: string, fields: any )
  {
    const entityDefinition = entityDefinitions[ entityName ]

    return this.executeTriggers( entityDefinition.TriggersForRemove, fields )
    .then( entityDefinition.Persister.remove( entityName, fields ) )
    .then( ( ) => {
      this.invalidateLoaderCache( entityName, fields )
    } )
  }

  cursorForObjectInConnection( entityName: string, arr, obj )
  {
    const entityDefinition = entityDefinitions[ entityName ]

    // IDs can be both strings and Uuid. Check that first, and convert to String
    const obj_id = entityDefinition.Persister.uuidToString( obj.id )

    // Make sure that the object and its instance can be compared with ===
    // assumed that the object has id field which is unique
    for( let ix = 0 ; ix < arr.length ; ix++ )
    {
      const arr_element_id = entityDefinition.Persister.uuidToString( arr[ ix ].id )

      if( arr_element_id == obj_id )
      {
        arr[ ix ] = obj
        break
      }
    }

    let cursor = cursorForObjectInConnection( arr, obj )
    if( cursor == null )
    {
      log.log(
        'error',
        'Could not create cursor for object in connection for ' + entityName,
        {
          obj,
          arr
        }
      )
    }

    return cursor
  }

  static initializePersisters( runAsPartOfSetupDatabase: boolean ): void
  {
    for( let persister of setPersisters )
      persister.initialize( runAsPartOfSetupDatabase )
  }
}

ObjectManager.registerEntity( 'User', User )
