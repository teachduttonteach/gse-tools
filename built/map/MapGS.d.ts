/**
 * A reworking of the Map data type for ES3. Since there is no Iterator type
 *  for ES3, MapGS can be accessed as a Collection as well, using the
 *  hasNext(), next() and reset() methods. You can also use entries() to get
 *  an Array of key/value pairs.
 * Because keys do not have to be unique, if you are using a Map that may have
 *  more than one value per key, make sure to use the getAll() / deleteAll()
 *  methods instead of get() / delete() which assume one value per key.
 */
export declare class MapGS<A, B> {
    private _keys;
    private _values;
    private _counter;
    size: number;
    /**
     *
     * @param {Array<A, B>} args an Array of key/value pairs
     */
    constructor(args?: Array<[A, B]>);
    /**
     * Get the entries as a list.
     *
     * @return {Array<A, B>} a list of key/value pairs
     */
    entries(): Array<[A, B]>;
    /**
     * Convert the object to a string.
     *
     * @return {string} a list of key/value pairs
     */
    toString(): string;
    /**
     * Clears (resets) the map.
     *
     * @return {MapGS<A, B>} the object for chaining
     */
    clear(): MapGS<A, B>;
    /**
     * Deletes an entry in the Map
     *
     * @param {A} key the key of the entry to delete
     * @return {MapGS<A, B> | null} the object for chaining or null if the key
     *  was not found
     */
    delete(key: A): MapGS<A, B> | null;
    /**
     * Deletes all entries in the Map associated with the key
     *
     * @param {A} key the key of the entry to delete
     * @return {MapGS<A, B> | null} the object for chaining or null if the key
     *  was not found
     */
    deleteAll(key: A): MapGS<A, B> | null;
    /**
     * Determine whether the Map has the specified key
     *
     * @param {A} key the key to find in the map
     * @return {boolean} if the key is present
     */
    has(key: A): boolean;
    /**
     * Get the specified key's location in the map
     *
     * @param {A} key the key to get
     * @return {number | null} the number entry of the key, or null if it
     *  wasn't found
     */
    _getMember(key: A): number | null;
    /**
     * Gets the value for the specified key
     *
     * @param {A} key the key to retrieve
     * @return {B | null} the value, or null if the key was not found
     */
    get(key: A): B | null;
    /**
     * Gets all of the values for the specified key
     *
     * @param {A} key the key to find
     * @return {Array<B>} the Array of all values that match the key, or null
     *  if the key was not found
     */
    getAll(key: A): Array<B> | null;
    /**
     * Gets all of the key locations for the specified key
     *
     * @param {A} key the key to find
     * @return {Array<number>} the Array of all locations that match the key,
     *  or null if the key was not found
     */
    _getAllMembers(key: A): Array<number> | null;
    /**
     * Get the Array of keys from the Map
     *
     * @param {boolean} unique if true, only return one value per key
     * @return {Array<A>} the array of keys
     */
    keys(unique?: boolean): Array<A>;
    /**
     * Gets the Array of values from the Map
     *
     * @return {Array<B>} the array of values
     */
    values(): Array<B>;
    /**
     * Add a key / value pair to the map
     *
     * @param {A} key the key
     * @param {B} value the value
     * @return {MapGS<A, B>} the object for chaining
     */
    set(key: A, value: B): MapGS<A, B>;
    /** Collection methods */
    /**
     * Resets the collection iterator
     */
    reset(): void;
    /**
     * Checks to see if there is a next key in the collection
     *
     * @return {boolean} true if there is another value
     */
    hasNext(): boolean;
    /**
     * Returns the next key in the collection
     *
     * @return {A} the value
     */
    next(): A;
}
