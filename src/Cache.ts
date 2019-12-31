export function setCache(key: string, value: any): void {
    let t_cache = CacheService.getScriptCache();
    if (t_cache == null) throw new Error("Could not create CacheService in GroupCreator.displayGroupSet()");
  
    t_cache.put(key, JSON.stringify(value));
  }
  
  export function getCache<T>(key: string): T {
    let t_cache = CacheService.getScriptCache();
    if (t_cache == null) throw new Error("Could not create CacheService in acceptGroups()");
  
    let cachedInfo = t_cache.get(key);
    if (cachedInfo == null) throw new Error("Could not find CachedInfo for minimum group set in acceptGroups()");
  
    return JSON.parse(cachedInfo);
  }
  
  