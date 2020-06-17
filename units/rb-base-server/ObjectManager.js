// @flow

import DataLoader from 'dataloader'
import { cursorForObjectInConnection } from 'graphql-relay'
import NestedError from 'nested-error-stacks'

import UserToken2Anonymous from '../_configuration/rb-base-server/UserToken2Anonymous'
import defaultPersister from '../_configuration/rb-base-server/graphql/defaultPersister'
import getNewUser from '../_configuration/rb-base-server/graphql/model/getNewUser'
import { getSiteInformation } from '../_configuration/rb-base-server/siteSettings'
import type { SiteInformation } from '../rb-appbase-server/types/SiteInformation.types'
import User from '../rb-appbase-server/graphql/model/User'

import log from './log'

// Anonymous user
const User_0 = new User(
  Object.assign(getNewUser(defaultPersister.uuidNull()), {
    id: defaultPersister.uuidNull(),
    UserToken2: UserToken2Anonymous,
    User_DisplayName: 'Anonymous',
  }),
)

export { User_0 }

// Type of entity definition
type EntityDefinition = {
  EntityName: string,
  EntityType: Function,
  fieldsWithSuffix: { [string]: boolean },
  Persister: Object,
  TriggersForAdd: Array<Function>,
  TriggersForUpdate: Array<Function>,
  TriggersForRemove: Array<Function>,
  TriggersForUpdateShouldRetrieveCurrentRecord: boolean,
  UserPermissionsForObject: {
    use: boolean,
    defaultOnAdd?: {
      read: boolean,
      insert: boolean,
      update: boolean,
      delete: boolean,
    },
  },
}

// Static set of entity definitions
const entityDefinitions: {
  [string]: EntityDefinition,
} = {}

// Static array of object managers
const setPersisters = new Set()

// Value for a change indicating that the record is deleted
const deletedRecord = {
  deleted: true,
}

/**
 * Class for loading and storing objects
 * @class ObjectManager
 */
export default class ObjectManager {
  loadersSingle: Object
  loadersMultiple: Object
  Viewer_User_id: string
  changes: Object
  request: ?Object
  response: ?Object
  siteInformation: SiteInformation

  /**
   * Creates a new instance of Object Manager
   * @memberOf ObjectManager
   */
  constructor() {
    // Loaders for a single record, by entity name
    this.loadersSingle = {}

    // Loaders for a multiple record lists, by entity name
    this.loadersMultiple = {}

    // Changes made to records, by entity name
    this.changes = {}

    // UserID for the viewer. Could be unset if ObjectManager is used by system
    this.Viewer_User_id = 'Object Manager: viewer user id has not been set'

    // Request and response objects, if available
    this.request = null
    this.response = null

    // Setting site information mostly to satify flow;
    // also, in order to be able to better detect errors when not set
    this.siteInformation = {
      artifact_id: 'Object Manager: artifact_id has not been set',
      filesDirectory: '',
      latestPublishedDirectory: '',
      inEditingMode: false,
      isMaDesignerDisabled: false,
      siteConfiguration: {},
      siteDirectory: '',
    }
  }

  /**
   * Registers an entity with Object Manager. This is to be used exclusively from
   * the model definition unit/unit-name/graphql/mode/EntityName.js
   * @memberOf ObjectManager
   */
  static registerEntity(
    entityName: string,
    EntityType: Function,
    options: {
      persister?: Object,
      UserPermissionsForObject?: {
        use: boolean,
        defaultOnAdd?: {
          read: boolean,
          insert: boolean,
          update: boolean,
          delete: boolean,
        },
      },
    },
  ): void {
    if (entityName in entityDefinitions) throw new Error('Entity already registered: ' + entityName)

    // In order to be able to access the name as a static property of the type
    EntityType.entityName = entityName

    // Determine persister - default, or otherwise
    let { persister } = options
    if (persister == null) persister = defaultPersister

    // A set would retain only one copy of a persister
    setPersisters.add(persister)

    const entityDefinition = {
      EntityName: entityName,
      EntityType,
      fieldsWithSuffix: {},
      Persister: persister,
      TriggersForAdd: [],
      TriggersForUpdate: [],
      TriggersForRemove: [],
      TriggersForUpdateShouldRetrieveCurrentRecord: false,
      UserPermissionsForObject:
        options.UserPermissionsForObject != null
          ? options.UserPermissionsForObject
          : { use: false },
    }

    // Determine supported fields by fields with suffix
    // For the User-related tables, there is no automatic support:
    // User_id and artifact_id have to be explicitly specified
    const supportedSuffixes =
      entityName === 'User' || entityName === 'UserAccount' || entityName === 'UserSession'
        ? [ '_created_by', '_created_on', '_modified_on', '_modified_by' ]
        : [
            '_artifact_id',
            '_user_id',
            '_created_by',
            '_created_on',
            '_modified_on',
            '_modified_by',
          ]

    // Create sample entity and go through the fields looking for special fields
    const example = new EntityType({})
    for (let suffix of supportedSuffixes) {
      const fieldName = entityDefinition.EntityName + suffix

      // Does the object type have it?
      if (example.hasOwnProperty(fieldName)) {
        entityDefinition.fieldsWithSuffix[suffix] = true
      }
    }

    entityDefinitions[entityName] = entityDefinition
  }

  /**
   * Registers a trigger for when an entity is added
   * @memberOf ObjectManager
   */
  static RegisterTriggerForAdd(entityName: string, handler: Function): void {
    entityDefinitions[entityName].TriggersForAdd.push(handler)
  }

  static RegisterTriggerForUpdate(
    entityName: string,
    handler: Function,
    shouldRetrieveCurrentRecord: boolean,
  ): void {
    entityDefinitions[entityName].TriggersForUpdate.push(handler)

    if (shouldRetrieveCurrentRecord)
      entityDefinitions[entityName].TriggersForUpdateShouldRetrieveCurrentRecord = true
  }

  static RegisterTriggerForAddAndUpdate(entityName: string, handler: Function): void {
    ObjectManager.RegisterTriggerForAdd(entityName, handler)
    ObjectManager.RegisterTriggerForUpdate(entityName, handler, false)
  }

  static RegisterTriggerForRemove(entityName: string, handler: any) {
    entityDefinitions[entityName].TriggersForRemove.push(handler)
  }

  // Apply artifact_id, User_id security
  addUserIdAndOrSiteIdToFilterOrFields(entityDefinition: EntityDefinition, filterOrFields: Object) {
    for (let suffix of [ '_artifact_id', '_user_id' ]) {
      // Does the object type have it?
      if (entityDefinition.fieldsWithSuffix[suffix]) {
        const fieldName = entityDefinition.EntityName + suffix

        const doNotAddFieldName = 'do_not_add_' + fieldName
        const hasDoNotAdd = filterOrFields.hasOwnProperty(doNotAddFieldName)

        // Is the filter/fields collection missing it, and are we not prevented from adding it?
        if (!filterOrFields.hasOwnProperty(fieldName) && !hasDoNotAdd) {
          if (suffix === '_artifact_id') {
            filterOrFields[fieldName] = this.siteInformation.artifact_id
          } else if (this.Viewer_User_id !== 'Object Manager: viewer user id has not been set') {
            filterOrFields[fieldName] = this.Viewer_User_id
          }
        }

        if (hasDoNotAdd) {
          delete filterOrFields[doNotAddFieldName]
        }
      }
    }
  }

  // Update created and modified fields
  updatedCreatedAndModifiedFields(
    entityDefinition: EntityDefinition,
    fields: Object,
    isCreating: boolean,
  ) {
    const dtNow = new Date()

    for (let suffix of isCreating
      ? [ '_created_by', '_created_on', '_modified_on', '_modified_by' ]
      : [ '_modified_on', '_modified_by' ]) {
      // Does the object type have it?
      if (entityDefinition.fieldsWithSuffix[suffix]) {
        const fieldName = entityDefinition.EntityName + suffix

        // Assign the modified/created field
        fields[fieldName] =
          suffix === '_modified_by' || suffix === '_created_by'
            ? this.Viewer_User_id !== 'Object Manager: viewer user id has not been set'
              ? this.Viewer_User_id
              : '00000000-0000-0000-0000-000000000000'
            : dtNow
      }
    }
  }

  setViewerUserId(Viewer_User_id: string): void {
    this.Viewer_User_id = Viewer_User_id
  }

  setRequest(req: any, res: any): void {
    this.request = req
    this.response = res
  }

  setSiteInformation(siteInformation: Object): void {
    this.siteInformation = siteInformation
  }

  getLoadersSingle(entityName: string) {
    const foundLoaders = this.loadersSingle[entityName]

    if (foundLoaders != null) {
      return foundLoaders
    } else {
      this.loadersSingle[entityName] = {}
      return this.loadersSingle[entityName]
    }
  }

  getLoadersMultiple(entityName: string) {
    const foundLoaders = this.loadersMultiple[entityName]

    if (foundLoaders != null) {
      return foundLoaders
    } else {
      this.loadersMultiple[entityName] = {}
      return this.loadersMultiple[entityName]
    }
  }

  clearLoadersMultiple(entityName: string) {
    this.loadersMultiple[entityName] = {}
  }

  recordChange(entityName: string, fields: Object, isDeletion: boolean) {
    let records = this.changes[entityName]
    if (records == null) records = this.changes[entityName] = {}

    const id = fields.id

    records[id] = isDeletion ? deletedRecord : fields
  }

  getViewerUserId(): string {
    if (this.Viewer_User_id === 'Object Manager: viewer user id has not been set')
      throw new Error('Object Manager: viewer user id has not been set')

    return this.Viewer_User_id
  }

  getRequest(): any {
    if (this.request == null) throw new Error('Object Manager: request has not been set')

    return this.request
  }

  getLoader(entityName: string, fieldName: string, multipleResults: boolean) {
    if (!(entityName in entityDefinitions))
      throw new Error('Can not find entity type named ' + entityName)

    const entityDefinition = entityDefinitions[entityName]
    const entityType = entityDefinition.EntityType

    let loadersList = multipleResults
      ? this.getLoadersMultiple(entityName)
      : this.getLoadersSingle(entityName)

    let loader = loadersList[fieldName]
    if (loader == null) {
      if (multipleResults)
        loader = new DataLoader((filter) => {
          try {
            return entityDefinition.Persister.getObjectList(entityName, entityType, filter)
          } catch (err) {
            log(
              'error',
              'rb-base-server ObjectManager getLoader: Could not load multiple results',
              {
                fieldName,
                entityName,
                err,
              },
            )
            throw new NestedError('getLoader failed', err)
          }
        })
      else
        loader = new DataLoader((filter) => {
          try {
            return entityDefinition.Persister.getOneObject(entityName, entityType, filter)
          } catch (err) {
            log('error', 'rb-base-server ObjectManager getLoader: Could not load single result', {
              fieldName,
              entityName,
              err,
            })
            throw new NestedError('getLoader failed', err)
          }
        })

      loadersList[fieldName] = loader
    }

    return loader
  }

  async getOneObject_async(entityName: string, query: Object): Promise<Object | null> {
    const entityDefinition = entityDefinitions[entityName]
    if (entityDefinition == null) throw new Error('Cound not find entity: ' + entityName)

    // Special hack for anonymous users
    if (entityName === 'User')
      if (defaultPersister.uuidEquals(defaultPersister.uuidNull(), query.id)) return User_0

    // Apply artifact_id, User_id security
    this.addUserIdAndOrSiteIdToFilterOrFields(entityDefinition, query)

    // Verify user object permission, if applies
    let bSuppressPermissionChecks = false
    if (query._SuppressPermissionChecks) {
      bSuppressPermissionChecks = true
      query = Object.assign({}, query)
      delete query._SuppressPermissionChecks
    }
    if (entityDefinition.UserPermissionsForObject.use && !bSuppressPermissionChecks) {
      const permission = await this.getOneObject_async('UserPermissionForObject', {
        UserPermissionForObject_ObjectType: entityName,
        UserPermissionForObject_object_id: query.id,
      })

      // If object is not found, or read permission not found, bail out
      if (permission == null || !permission.UserPermissionForObject_PermitRead) return null
    }

    // For all non-user, non 0 ids, load from data loader per protocol
    const loaderIdentifier = Object.keys(query).sort().join(',')
    const loader = this.getLoader(entityName, loaderIdentifier, false)

    let result = await loader.load(query)

    const changes = this.changes[entityName]
    if (changes && result) {
      const change = changes[result.id]

      if (change != null) {
        // Object is not found, return null if deleted
        if (change === deletedRecord) {
          result = null
        } else {
          // Add or update
          Object.assign(result, change)
        }
      }
    }

    return result
  }

  async getObjectList_async(entityName: string, query: Object) {
    const entityDefinition = entityDefinitions[entityName]
    if (entityDefinition == null) throw new Error('Cound not find entity: ' + entityName)

    // Apply artifact_id, User_id security
    this.addUserIdAndOrSiteIdToFilterOrFields(entityDefinition, query)

    // Add user object permissions to query, if they apply
    let bSuppressPermissionChecks = false
    if (query._SuppressPermissionChecks) {
      bSuppressPermissionChecks = true
      query = Object.assign({}, query)
      delete query._SuppressPermissionChecks
    }
    if (entityDefinition.UserPermissionsForObject.use && !bSuppressPermissionChecks) {
      const arrPermissions = await this.getObjectList_async('UserPermissionForObject', {
        UserPermissionForObject_ObjectType: entityName,
      })

      // Determine ID values that are permitted for user
      const arrIDValues = []
      for (let permission of arrPermissions)
        if (permission.UserPermissionForObject_PermitRead) {
          arrIDValues.push(permission.UserPermissionForObject_object_id)
        }

      // If there are no permissions, there is no reason to query further
      if (arrIDValues.length === 0) return []

      // Set an in condition - detrimental to performance yet quick and dirty way to ensure
      // that only permitted IDs can be accessed
      query.id = { $in: arrIDValues }
    }

    const loaderIdentifier = Object.keys(query).sort().join(',')
    const loader = this.getLoader(entityName, loaderIdentifier, true)

    const arrResults = await loader.load(query)

    const changes = this.changes[entityName]

    if (changes) {
      for (let ix = 0; ix < arrResults.length; ix++) {
        const change = changes[arrResults[ix].id]
        if (change != null) {
          if (change === deletedRecord)
            // Reduce ix in order not to skip over a record
            arrResults.splice(ix--, 1)
          else
            // Add or update
            Object.assign(arrResults[ix], change)
        }
      }
    }

    return arrResults
  }

  invalidateLoaderCache(entityName: string, fields: any) {
    // At this moment there is no obvious way of knowing what to clear from lists, so delete them all
    this.clearLoadersMultiple(entityName)

    const loadersSingle = this.getLoadersSingle(entityName)
    for (let loaderFieldName in loadersSingle) {
      if (loaderFieldName === 'id') loadersSingle[loaderFieldName].clear(fields.id)
      else delete loadersSingle[loaderFieldName]
    }
  }

  executeTriggers(arrTriggers: Array<Function>, fields: Object, oldFields: ?Object) {
    const arrPromises = []
    for (let trigger of arrTriggers) {
      arrPromises.push(trigger(this, fields, oldFields))
    }

    return Promise.all(arrPromises)
  }

  assignPrimaryKey(entityName: string, fields: any) {
    const entityDefinition = entityDefinitions[entityName]

    if (entityDefinition == null) throw new Error('Cound not find entity: ' + entityName)

    // Generate primary key, overwrite if already present
    fields.id = entityDefinition.Persister.uuidRandom()
  }

  async add(entityName: string, fields: Object): any {
    const entityDefinition = entityDefinitions[entityName]
    if (entityDefinition == null) throw new Error('Cound not find entity: ' + entityName)

    // Apply artifact_id, User_id security
    this.addUserIdAndOrSiteIdToFilterOrFields(entityDefinition, fields)

    // Update created and modified fields
    this.updatedCreatedAndModifiedFields(entityDefinition, fields, true)

    // Generate primary key, if not already present
    if (!fields.id) fields.id = entityDefinition.Persister.uuidRandom()

    // If this is a user ID
    if (entityName === 'User') this.setViewerUserId(fields.id.toString())

    this.recordChange(entityName, fields, false)

    try {
      await this.executeTriggers(entityDefinition.TriggersForAdd, fields)

      await entityDefinition.Persister.add(entityName, fields, entityDefinition.EntityType)

      if (entityDefinition.UserPermissionsForObject.use) {
        const permissions = entityDefinition.UserPermissionsForObject.defaultOnAdd
          ? entityDefinition.UserPermissionsForObject.defaultOnAdd
          : {
              read: true,
              insert: true,
              update: true,
              delete: true,
            }

        const a_UserPermissionForObject = {
          UserPermissionForObject_ObjectType: entityName,
          UserPermissionForObject_object_id: fields.id,
          UserPermissionForObject_PermitRead: permissions.read,
          UserPermissionForObject_PermitUpdate: permissions.update,
          UserPermissionForObject_PermitDelete: permissions.delete,
        }

        await this.add('UserPermissionForObject', a_UserPermissionForObject)
      }
    } catch (err) {
      log('error', 'rb-base-server ObjectManager add: failed', {
        fields,
        entityName,
        err,
      })
      throw new NestedError('Add failed', err)
    }

    this.invalidateLoaderCache(entityName, fields)

    return fields.id
  }

  async update(entityName: string, fields: Object): Promise<void> {
    const entityDefinition = entityDefinitions[entityName]
    if (entityDefinition == null) throw new Error('Cound not find entity: ' + entityName)

    let executionStep = ''
    try {
      executionStep = 'Apply artifact_id, User_id security'
      this.addUserIdAndOrSiteIdToFilterOrFields(entityDefinition, fields)

      executionStep = 'Verify user object permission, if applies'
      if (entityDefinition.UserPermissionsForObject.use) {
        const permission = await this.getOneObject_async('UserPermissionForObject', {
          UserPermissionForObject_ObjectType: entityName,
          UserPermissionForObject_object_id: fields.id,
        })

        // If object is not found, or read permission not found, bail out
        if (permission == null || !permission.UserPermissionForObject_PermitUpdate) return
      }

      executionStep = 'Update created and modified fields'
      this.updatedCreatedAndModifiedFields(entityDefinition, fields, false)

      executionStep = 'Retrieve the current values, if triggers will be used'
      let oldFields = null
      if (entityDefinition.TriggersForUpdateShouldRetrieveCurrentRecord) {
        oldFields = await this.getOneObject_async(entityName, {
          id: fields.id,
        })
      }

      executionStep = 'Record change'
      this.recordChange(entityName, fields, false)

      executionStep = 'Execute triggers'
      await this.executeTriggers(entityDefinition.TriggersForUpdate, fields, oldFields)

      executionStep = 'Execute persister update'
      await entityDefinition.Persister.update(entityName, fields)
    } catch (err) {
      log('error', 'rb-base-server ObjectManager update: failed', {
        entityName,
        err,
        executionStep,
        fields,
      })
      throw new NestedError('Update failed', err)
    }

    this.invalidateLoaderCache(entityName, fields)
  }

  async remove(entityName: string, fields: Object) {
    const entityDefinition = entityDefinitions[entityName]
    if (entityDefinition == null) throw new Error('Cound not find entity: ' + entityName)

    try {
      // Apply artifact_id, User_id security
      this.addUserIdAndOrSiteIdToFilterOrFields(entityDefinition, fields)

      // Verify user object permission, if applies
      if (entityDefinition.UserPermissionsForObject.use) {
        const permission = await this.getOneObject_async('UserPermissionForObject', {
          UserPermissionForObject_ObjectType: entityName,
          UserPermissionForObject_object_id: fields.id,
        })

        // If object is not found, or read permission not found, bail out
        if (permission == null || !permission.UserPermissionForObject_PermitDelete) return
      }

      this.recordChange(entityName, fields, true)

      await this.executeTriggers(entityDefinition.TriggersForRemove, fields)

      await entityDefinition.Persister.remove(entityName, fields)
    } catch (err) {
      log('error', 'rb-base-server ObjectManager remove: failed', {
        fields,
        entityName,
      })
      throw new NestedError('Remove failed', err)
    }

    this.invalidateLoaderCache(entityName, fields)
  }

  uuidFromString(entityName: string, id: string) {
    try {
      const entityDefinition = entityDefinitions[entityName]

      return entityDefinition.Persister.uuidFromString(id)
    } catch (err) {
      throw new NestedError('uuidFromString for entity [' + entityName + '] and id = ' + id, err)
    }
  }

  uuidToString(entityName: string, id: Object) {
    const entityDefinition = entityDefinitions[entityName]

    return entityDefinition.Persister.uuidToString(id)
  }

  cursorForObjectInConnection(entityName: string, arr: Array<Object>, obj: Object) {
    try {
      const entityDefinition = entityDefinitions[entityName]

      if (arr.length > 0) {
        // IDs can be both strings and Uuid. Check that first, and convert to String
        const obj_id = entityDefinition.Persister.uuidToString(obj.id)

        // Make sure that the object and its instance can be compared with ===
        // assumed that the object has id field which is unique
        for (let ix = 0; ix < arr.length; ix++) {
          const arr_element_id = entityDefinition.Persister.uuidToString(arr[ix].id)
          if (arr_element_id === obj_id) {
            arr[ix] = obj
            break
          }
        }
      } else {
        return null
      }

      let cursor = cursorForObjectInConnection(arr, obj)
      if (cursor == null) {
        throw new Error('Cursor is null')
      }
      return cursor
    } catch (err) {
      const errMessage =
        'rb-base-server ObjectManager cursorForObjectInConnection: Failed to create cursor'
      log('error', errMessage, { arr, entityName, obj, err })
      throw new Error(errMessage)
    }
  }

  static initializePersisters(runAsPartOfSetupDatabase: boolean, cb: Function): void {
    for (let persister of setPersisters)
      persister.initialize(runAsPartOfSetupDatabase, () => {
        cb()
      })
  }
}

// Register the user
ObjectManager.registerEntity('User', User, {})

// Get an Object Manager with site information
export async function getObjectManager(req: Object, res: Object): Promise<ObjectManager> {
  // Set site information
  const siteInformation = await getSiteInformation(req, res) // Create individual object manager for each request
  const objectManager = new ObjectManager() // Set request and response

  objectManager.setRequest(req, res) // Place designer configuration into object manager
  objectManager.setSiteInformation(siteInformation)
  return objectManager
}
