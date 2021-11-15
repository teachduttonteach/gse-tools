/**
 * Set a CacheService key and value
 *
 * @param {string} key the key in the cache to set
 * @param {T} value the value in the cache to set
 */
export function setCache<T>(key: string, value: T): void {
  const thisCache = CacheService.getScriptCache();
  if (thisCache == null) {
    throw new Error('Could not create CacheService in ' + 'GroupCreator.displayGroupSet()');
  }

  thisCache.put(key, JSON.stringify(value));
}

/**
 * Gets the CacheService value from the key
 *
 * @param {string} key the key to retrieve
 * @return {T} the value
 */
export function getCache<T>(key: string): T {
  const thisCache = CacheService.getScriptCache();
  if (thisCache == null) {
    throw new Error('Could not create CacheService in acceptGroups()');
  }

  const cachedInfo = thisCache.get(key);
  if (cachedInfo == null) {
    throw new Error('Could not find CachedInfo for minimum group set in ' + 'acceptGroups()');
  }

  return JSON.parse(cachedInfo);
}
