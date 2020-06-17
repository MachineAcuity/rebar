"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _nestedErrorStacks = _interopRequireDefault(require("nested-error-stacks"));

var _CacheableCategoryDefinitions = _interopRequireDefault(require("../_configuration/rb-base-server/CacheableCategoryDefinitions"));
var _debug = require("../_configuration/debug");

var _log = _interopRequireDefault(require("./log"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


//

const expirationCheckInterval = 5000;
let expirationIntervalTimer = null;

const MapCachesByCategory = new Map();

//

async function executeDiscard(
cacheKey,
discardFunction,
objectPromise)
{
  try {
    await discardFunction(objectPromise);
  } catch (err) {
    const message = 'rb-base-server ObjectCache executeDiscard: failed';
    (0, _log.default)('error', message, { cacheKey, err });
    throw new _nestedErrorStacks.default(message, err);
  }
}

async function cleanupCategory(cachedEntriesForCategory) {
  const { definition, entries } = cachedEntriesForCategory;

  // If the number if cached elements does not exceed max, no cleanup is necessary
  if (entries.size <= definition.countMax) return;

  // Collect all the tics times
  const arrCreatedTime = [];
  for (let cachedEntry of entries.values()) {
    arrCreatedTime.push(cachedEntry.createdTimeMs);
  }

  // Descending sort - newest entries come first
  arrCreatedTime.sort((a, b) => b - a);

  // Remove all entries that are older than cutoff time
  const cutOffTimeMs = arrCreatedTime[definition.countMax - 1];
  for (let [cacheKey, cachedEntry] of entries.entries()) {
    if (cachedEntry.createdTimeMs < cutOffTimeMs) {
      // Discard if necessary. Do not wait.
      const discardFunction = definition.onDiscard;
      if (discardFunction) {
        const objectPromise = cachedEntry.objectPromise;
        executeDiscard(cacheKey, discardFunction, await objectPromise);
      }

      // Remove from map of cached objects
      entries.delete(cacheKey);
    }
  }
}

async function removeExpired() {
  if (_debug.debugWriteToConsoleObjectCacheActivity) logEntries('removeExpired - before');

  let bPerishableItemsLeft = false;

  const timeMsNow = new Date().getTime();

  for (let cachedEntriesForCategory of MapCachesByCategory.values()) {
    const { definition, entries } = cachedEntriesForCategory;

    // If there is no expiration for the category, skip
    if (!definition.expirationDurationMs) continue;

    const discardFunction = definition.onDiscard;

    // Delete expired entries
    for (let [cacheKey, cachedEntry] of entries.entries()) {
      // $FlowIgnore expiresAtMs will be present
      if (cachedEntry.expiresAtMs < timeMsNow) {
        // Discard if necessary. Do not wait.
        if (discardFunction) {
          const objectPromise = cachedEntry.objectPromise;
          executeDiscard(cacheKey, discardFunction, await objectPromise);
        }

        // Remove from map of cached objects
        entries.delete(cacheKey);
      } else bPerishableItemsLeft = true;
    }
  }

  // If there are no more perishable items, simply remove the timer
  if (!bPerishableItemsLeft) {
    clearInterval(expirationIntervalTimer);
    expirationIntervalTimer = null;
  }

  if (_debug.debugWriteToConsoleObjectCacheActivity) logEntries('removeExpired - after');
}

async function getCachedEntryFromCache(
categoryName,
cacheKey)
{
  const cachedEntriesForCategory = MapCachesByCategory.get(categoryName);
  if (cachedEntriesForCategory == null)
  throw new Error('getCachedEntryFromCache: can not find cacheable category ' + categoryName);

  const { definition, entries } = cachedEntriesForCategory;
  const cachedEntry = entries.get(cacheKey);

  // Entry is not present in cache ?
  if (cachedEntry == null) return null;

  const timeMsNow = new Date().getTime();

  // Entry is in the cache
  // If the entry already has expiration, increase it since it is used
  if (cachedEntry.expiresAtMs) {
    const cachedEntriesForCategory = MapCachesByCategory.get(categoryName);

    // $FlowIgnore our code is written in a way that definition would be present
    const { definition } = cachedEntriesForCategory;

    cachedEntry.expiresAtMs = timeMsNow + definition.expirationDurationMs;
  }

  if (cachedEntry.validByTimeMs >= timeMsNow) {
    return cachedEntry;
  }

  // Run the function to verify the validity of the cached entry, or wait for
  // a validity verification function that's already running
  let isValid = false;
  if (cachedEntry.validityVerificationPromise == null) {
    try {
      cachedEntry.validityVerificationPromise = definition.validityVerifier(cacheKey, cachedEntry);
      isValid = await cachedEntry.validityVerificationPromise;
    } catch (err) {
      // Indicate that the entry is invalid
      cachedEntry.validityVerificationPromise = Promise.resolve(false);

      // Record the problem and throw exception further
      const message =
      'rb-base-server ObjectCache getCachedEntryFromCache: validityVerificationPromise failed';
      (0, _log.default)('error', message, { categoryName, cacheKey, err });
      throw new _nestedErrorStacks.default(message, err);
    }
  }

  cachedEntry.validityVerificationPromise = null;
  if (isValid) {
    cachedEntry.validByTimeMs = timeMsNow + definition.validityDurationMs;
    return cachedEntry;
  } else {
    // Entry is present in cache, but is invalid. Delete
    entries.delete(cacheKey);
    return new Promise(() => null);
  }
}

function logEntries(title) {
  const timeMsNow = new Date().getTime();
  const values = [];

  for (let cachedEntriesForCategory of MapCachesByCategory.values()) {
    const { definition, entries } = cachedEntriesForCategory;

    // Delete expired entries
    for (let [cacheKey, cachedEntry] of entries.entries()) {
      const display = {
        name: definition.name,
        key: cacheKey,
        validBy: cachedEntry.validByTimeMs,
        validByLeft: cachedEntry.validByTimeMs - timeMsNow,
        expires: 0,
        expiresLeft: 0 };


      if (cachedEntry.expiresAtMs) {
        display.expires = cachedEntry.expiresAtMs;
        display.expiresLeft = cachedEntry.expiresAtMs - timeMsNow;
      }

      values.push(display);
    }
  }

  console.log('XXX ' + title + ' @ ' + timeMsNow);
  console.table(values);
}

/**
   * Class encapsulating static members for managing object cahce
   */
class ObjectCache {
  /** Retrieve existing cached object or create a new one, given category and key */
  static async getOrCreateObjectFromCahce_async(
  categoryName,
  cacheKey,
  creationFunction)
  {
    const currentCachedEntry = await getCachedEntryFromCache(categoryName, cacheKey);

    // If it is already present in cache, return
    if (currentCachedEntry) {
      return await currentCachedEntry.objectPromise;
    }

    // Not present in cache - create
    let newObjectPromise;
    try {
      newObjectPromise = creationFunction();
    } catch (err) {
      const message =
      'rb-base-server ObjectCache getOrCreateObjectFromCahce: creationFunction failed';
      (0, _log.default)('error', message, { cacheKey, err });
      throw new _nestedErrorStacks.default(message, err);
    }

    // Add the promise to the cache now, so that other requests to the cache
    // for the same entry use the promise and do not kick off a second
    // creation function
    ObjectCache.addObjectToCache_async(categoryName, cacheKey, newObjectPromise);

    if (_debug.debugWriteToConsoleObjectCacheActivity) logEntries('getOrCreateObjectFromCahce');

    try {
      return await newObjectPromise;
    } catch (err) {
      const message =
      'rb-base-server ObjectCache getOrCreateObjectFromCahce: await creationFunction failed';
      (0, _log.default)('error', message, { categoryName, cacheKey, err });

      const cachedEntriesForCategory = MapCachesByCategory.get(categoryName);

      // $FlowIgnore it is guaranteed that the category exists
      const { entries } = cachedEntriesForCategory;
      entries.delete(cacheKey);

      throw new _nestedErrorStacks.default(message, err);
    }
  }

  /** Adds an object to cache by category and cache key. */
  static async addObjectToCache_async(
  categoryName,
  cacheKey,
  objectPromise)
  {
    const cachedEntriesForCategory = MapCachesByCategory.get(categoryName);
    if (cachedEntriesForCategory == null)
    throw new Error('addObjectToCache: can not find cacheable category ' + categoryName);

    const { definition, entries } = cachedEntriesForCategory;

    const timeMsNow = new Date().getTime();

    const cachedEntry = {
      createdTimeMs: timeMsNow,
      validByTimeMs: timeMsNow + definition.validityDurationMs,
      objectPromise,
      validityVerificationPromise: null,
      creationPromise: null };


    if (definition.expirationDurationMs) {
      // Only start timer when first object with expiration is added. No reason to run it before
      // that.
      if (expirationIntervalTimer == null) {
        expirationIntervalTimer = setInterval(removeExpired, expirationCheckInterval);
      }

      cachedEntry.expiresAtMs = timeMsNow + definition.expirationDurationMs;
    }

    entries.set(cacheKey, cachedEntry);

    await cleanupCategory(cachedEntriesForCategory);

    if (_debug.debugWriteToConsoleObjectCacheActivity) logEntries('addObjectToCache key=' + cacheKey);
  }

  static initializeObjectCache() {
    for (let definition of _CacheableCategoryDefinitions.default) {
      MapCachesByCategory.set(definition.name, {
        definition,
        entries: new Map() });

    }
  }

  static async getObjectFromCache_async(categoryName, cacheKey) {
    const cachedEntry = await getCachedEntryFromCache(categoryName, cacheKey);

    if (cachedEntry) {
      return await cachedEntry.objectPromise;
    } else {
      return null;
    }
  }}exports.default = ObjectCache;
//# sourceMappingURL=ObjectCache.js.map