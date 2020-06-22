import {areDatesEqual, throwError, ErrorType} from '../utils/Utilities';

export interface Key<A, B> {
  key: A;
  errorType: ErrorType;
  description: string;
  default: B | undefined;
}

export function Key<A, B>(k: A, e: ErrorType, desc: string, def?: B): Key<A, B> {
  return {
    key: k,
    errorType: e,
    description: desc,
    default: def
  };
}

export class Row {
  private _row: MapGS<string | Date, string | Date>;
  constructor(r: MapGS<string | Date, string | Date>) {
    this._row = r;
  }

}

/**
 * A reworking of the Map data type for ES3. Since there is no Iterator type
 *  for ES3, MapGS can be accessed as a Collection as well, using the
 *  hasNext(), next() and reset() methods. You can also use entries() to get
 *  an Array of key/value pairs.
 * Because keys do not have to be unique, if you are using a Map that may have
 *  more than one value per key, make sure to use the getAll() / deleteAll()
 *  methods instead of get() / delete() which assume one value per key.
 */
export class MapGS<A, B> {
  private _keys: Array<A> = [];
  private _values: Array<B> = [];
  private _counter: number = 0;
  public size: number = 0;

  
  /**
   *
   * @param {Array<A, B>} args an Array of key/value pairs
   */
  constructor(args?: Array<[A, B]>) {
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
  entries(): Array<[A, B]> {
    const retEntries: Array<[A, B]> = [];
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
  toString(): string {
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
  clear(): MapGS<A, B> {
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
  delete(key: A): MapGS<A, B> | null {
    const keyNum = this._getMember(key);
    if (keyNum == null) return null;
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
  deleteAll(key: A): MapGS<A, B> | null {
    const membersToDelete = this._getAllMembers(key);
    if (membersToDelete == null) return null;
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
  has(key: A): boolean {
    const keyNum = this._getMember(key);
    if (keyNum == null) return false;
    return true;
  }

  /**
   * Get the specified key's location in the map
   *
   * @param {A} key the key to get
   * @return {number | null} the number entry of the key, or null if it
   *  wasn't found
   */
  _getMember(key: A): number | null {
    for (let k = 0; k < this.size; k++) {
      const currentKey = this._keys[k];
      if (key instanceof Date && currentKey instanceof Date) {
        if (areDatesEqual(key, currentKey)) return k;
      } else if (key == currentKey) return k;
    }
    return null;
  }

  /**
   * Gets the value for the specified key
   *
   * @param {A} key the key to retrieve
   * @return {B | null} the value, or null if the key was not found
   */
  get(args: Key<A, B>): B | undefined {
    const keyNum = this._getMember(args.key);
    if (keyNum == null) {
      if (args.default) return args.default; 
      throwError(args.errorType, args.description);
    } else return this._values[keyNum];
  }

  private getString(args: Key<A, B>): string {
    return String(this.get(args));
  }

  getStringOrError(key: A, e: string, def?: B): string {
    return this.getString(Key(key, ErrorType.ERROR, e, def));
  }

  getWithError(key: A, e: string, def?: B): B | undefined {
    return this.get(Key(key, ErrorType.ERROR, e, def));
  }

  getStringOrWarning(key: A, w: string, def?: B): string {
    return this.getString(Key(key, ErrorType.WARNING, w, def));
  }

  getWithWarning(key: A, w: string, def?: B): B | undefined {
    return this.get(Key(key, ErrorType.WARNING, w, def));
  }

  getStringOrLog(key: A, w: string, def?: B): string {
    return this.getString(Key(key, ErrorType.LOG, w, def));
  }

  getWithLog(key: A, e: string, def?: B): B | undefined {
    return this.get(Key(key, ErrorType.LOG, e, def));
  }

  getStringOrNone(key: A, def?: B): string {
    return this.getString(Key(key, ErrorType.NONE, "", def));
  }

  getWithNone(key: A, def?: B): B | undefined {
    return this.get(Key(key, ErrorType.NONE, "", def));
  }

  /**
   * Gets the item number for the specified key
   *
   * @param {A} key the key to retrieve
   * @return {number | null} the value, or null if the key was not found
   */
  getNum(key: A): number | null {
    return this._getMember(key);
  }

  /**
   * Gets all of the values for the specified key
   *
   * @param {A} key the key to find
   * @return {Array<B>} the Array of all values that match the key, or null
   *  if the key was not found
   */
  getAll(key: A): Array<B> | null {
    const returnValues: Array<B> = [];
    const returnMembers = this._getAllMembers(key);
    if (returnMembers == null) return null;
    for (let k = 0; k < returnMembers.length; k++) {
      returnValues.push(this._values[returnMembers[k]]);
    }
    if (returnValues.length == 0) return null;
    return returnValues;
  }

  /**
   * Gets all of the key locations for the specified key
   *
   * @param {A} key the key to find
   * @return {Array<number>} the Array of all locations that match the key,
   *  or null if the key was not found
   */
  _getAllMembers(key: A): Array<number> | null {
    const returnValues: Array<number> = [];
    for (let k = 0; k < this.size; k++) {
      const currentKey = this._keys[k];
      if (key instanceof Date && currentKey instanceof Date) {
        if (areDatesEqual(key, currentKey)) {
          returnValues.push(k);
        }
      } else if (key == currentKey) returnValues.push(k);
    }
    if (returnValues.length == 0) return null;
    return returnValues;
  }

  /**
   * Get the Array of keys from the Map
   *
   * @param {boolean} unique if true, only return one value per key
   * @return {Array<A>} the array of keys
   */
  keys(unique: boolean = false): Array<A> {
    if (unique) {
      const returnValues: Array<A> = [];
      for (const key of this._keys) {
        let found: boolean = false;
        for (const returnValue of returnValues) {
          if (key == returnValue) found = true;
        }
        if (found == false) returnValues.push(key);
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
  values(): Array<B> {
    return this._values;
  }

  /**
   * Add a key / value pair to the map
   *
   * @param {A} key the key
   * @param {B} value the value
   * @return {MapGS<A, B>} the object for chaining
   */
  set(key: A, value: B): MapGS<A, B> {
    this._keys.push(key);
    this._values.push(value);
    this.size++;
    return this;
  }

  /** Collection methods */

  /**
   * Resets the collection iterator
   */
  reset(): void {
    this._counter = 0;
  }

  /**
   * Checks to see if there is a next key in the collection
   *
   * @return {boolean} true if there is another value
   */
  hasNext(): boolean {
    return this._counter < this.size;
  }

  /**
   * Returns the next key in the collection
   *
   * @return {A} the value
   */
  next(): A {
    return this._keys[this._counter++];
  }
}
