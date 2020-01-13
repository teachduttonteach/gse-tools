import { areDatesEqual } from '../utils/Utilities';
/**
 * A reworking of the Map data type for ES3. Since there is no Iterator type
 *  for ES3, MapGS can be accessed as a Collection as well, using the
 *  hasNext(), next() and reset() methods. You can also use entries() to get
 *  an Array of key/value pairs.
 * Because keys do not have to be unique, if you are using a Map that may have
 *  more than one value per key, make sure to use the getAll() / deleteAll()
 *  methods instead of get() / delete() which assume one value per key.
 */
export class MapGS {
    /**
     *
     * @param {Array<A, B>} args an Array of key/value pairs
     */
    constructor(args) {
        this._keys = [];
        this._values = [];
        this._counter = 0;
        this.size = 0;
        if (args != null) {
            for (let i = 0; i < args.length; i++) {
                this.set(args[i][0], args[i][1]);
            }
        }
    }
    /**
     * Get the entries as a list.
     *
     * @return {Array<A, B>} a list of key/value pairs
     */
    entries() {
        const retEntries = [];
        for (let k = 0; k < this.size; k++) {
            retEntries.push([this._keys[k], this._values[k]]);
        }
        return retEntries;
    }
    /**
     * Convert the object to a string.
     *
     * @return {string} a list of key/value pairs
     */
    toString() {
        let toReturn = '';
        for (let k = 0; k < this.size; k++) {
            toReturn += this._keys[k] + '=' + this._values[k] + ',';
        }
        return toReturn.substring(0, toReturn.length - 1);
    }
    /**
     * Clears (resets) the map.
     *
     * @return {MapGS<A, B>} the object for chaining
     */
    clear() {
        this._keys = [];
        this._values = [];
        this._counter = 0;
        this.size = 0;
        return this;
    }
    /**
     * Deletes an entry in the Map
     *
     * @param {A} key the key of the entry to delete
     * @return {MapGS<A, B> | null} the object for chaining or null if the key
     *  was not found
     */
    delete(key) {
        const keyNum = this._getMember(key);
        if (keyNum == null)
            return null;
        this._keys.splice(keyNum, 1);
        this._values.splice(keyNum, 1);
        this.size--;
        return this;
    }
    /**
     * Deletes all entries in the Map associated with the key
     *
     * @param {A} key the key of the entry to delete
     * @return {MapGS<A, B> | null} the object for chaining or null if the key
     *  was not found
     */
    deleteAll(key) {
        const membersToDelete = this._getAllMembers(key);
        if (membersToDelete == null)
            return null;
        for (let k = 0; k < membersToDelete.length; k++) {
            this._keys.splice(membersToDelete[k], 1);
            this._values.splice(membersToDelete[k], 1);
            this.size--;
        }
        return this;
    }
    /**
     * Determine whether the Map has the specified key
     *
     * @param {A} key the key to find in the map
     * @return {boolean} if the key is present
     */
    has(key) {
        const keyNum = this._getMember(key);
        if (keyNum == null)
            return false;
        return true;
    }
    /**
     * Get the specified key's location in the map
     *
     * @param {A} key the key to get
     * @return {number | null} the number entry of the key, or null if it
     *  wasn't found
     */
    _getMember(key) {
        for (let k = 0; k < this.size; k++) {
            const currentKey = this._keys[k];
            if (key instanceof Date && currentKey instanceof Date) {
                if (areDatesEqual(key, currentKey))
                    return k;
            }
            else if (key == currentKey)
                return k;
        }
        return null;
    }
    /**
     * Gets the value for the specified key
     *
     * @param {A} key the key to retrieve
     * @return {B | null} the value, or null if the key was not found
     */
    get(key) {
        const keyNum = this._getMember(key);
        if (keyNum == null)
            return null;
        return this._values[keyNum];
    }
    /**
     * Gets all of the values for the specified key
     *
     * @param {A} key the key to find
     * @return {Array<B>} the Array of all values that match the key, or null
     *  if the key was not found
     */
    getAll(key) {
        const returnValues = [];
        const returnMembers = this._getAllMembers(key);
        if (returnMembers == null)
            return null;
        for (let k = 0; k < returnMembers.length; k++) {
            returnValues.push(this._values[returnMembers[k]]);
        }
        if (returnValues.length == 0)
            return null;
        return returnValues;
    }
    /**
     * Gets all of the key locations for the specified key
     *
     * @param {A} key the key to find
     * @return {Array<number>} the Array of all locations that match the key,
     *  or null if the key was not found
     */
    _getAllMembers(key) {
        const returnValues = [];
        for (let k = 0; k < this.size; k++) {
            const currentKey = this._keys[k];
            if (key instanceof Date && currentKey instanceof Date) {
                if (areDatesEqual(key, currentKey)) {
                    returnValues.push(k);
                }
            }
            else if (key == currentKey)
                returnValues.push(k);
        }
        if (returnValues.length == 0)
            return null;
        return returnValues;
    }
    /**
     * Get the Array of keys from the Map
     *
     * @param {boolean} unique if true, only return one value per key
     * @return {Array<A>} the array of keys
     */
    keys(unique = false) {
        if (unique) {
            const returnValues = [];
            for (const key of this._keys) {
                let found = false;
                for (const returnValue of returnValues) {
                    if (key == returnValue)
                        found = true;
                }
                if (found == false)
                    returnValues.push(key);
            }
            return returnValues;
        }
        return this._keys;
    }
    /**
     * Gets the Array of values from the Map
     *
     * @return {Array<B>} the array of values
     */
    values() {
        return this._values;
    }
    /**
     * Add a key / value pair to the map
     *
     * @param {A} key the key
     * @param {B} value the value
     * @return {MapGS<A, B>} the object for chaining
     */
    set(key, value) {
        this._keys.push(key);
        this._values.push(value);
        this.size++;
        return this;
    }
    /** Collection methods */
    /**
     * Resets the collection iterator
     */
    reset() {
        this._counter = 0;
    }
    /**
     * Checks to see if there is a next key in the collection
     *
     * @return {boolean} true if there is another value
     */
    hasNext() {
        return this._counter < this.size;
    }
    /**
     * Returns the next key in the collection
     *
     * @return {A} the value
     */
    next() {
        return this._keys[this._counter++];
    }
}
