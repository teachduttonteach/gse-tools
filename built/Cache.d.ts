/**
 * Set a CacheService key and value
 *
 * @param {string} key the key in the cache to set
 * @param {T} value the value in the cache to set
 */
export declare function setCache<T>(key: string, value: T): void;
/**
 * Gets the CacheService value from the key
 *
 * @param {string} key the key to retrieve
 * @return {T} the value
 */
export declare function getCache<T>(key: string): T;
