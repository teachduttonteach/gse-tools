import { areDatesEqual } from "../utils/Utilities";

export class MapGS<A, B> {
    private _keys: Array<A> = [];
    private _values: Array<B> = [];
    private _counter: number = 0;

    constructor(args?: Array<[A, B]>) {
        if (args != null) {
            for (let i = 0; i < args.length; i++) {
                this.set(args[i][0], args[i][1]);
            }
        }
    }

    get(key: A): B | null {
        for (let k = 0; k < this._keys.length; k++) {
            let currentKey = this._keys[k];
            if ((key instanceof Date) && (currentKey instanceof Date)) {
                if (areDatesEqual(key, currentKey)) return this._values[k];
            }
            else if (key == currentKey) return this._values[k]; 
        }
        return null;
    }

    getAll(key: A): Array<B> | null {
        let returnValues: Array<B> = [];
        for (let k = 0; k < this._keys.length; k++) {
            let currentKey = this._keys[k];
            if ((key instanceof Date) && (currentKey instanceof Date)) {
                if (areDatesEqual(key, currentKey)) returnValues.push(this._values[k]);
            }
            else if (key == currentKey) returnValues.push(this._values[k]); 
        }
        return returnValues;
    }

    keys(unique: boolean = false): Array<A> {
        if (unique) {
            let returnValues: Array<A> = [];
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

    values(): Array<B> {
        return this._values;
    }

    set(key: A, value: B): MapGS<A, B> {
        this._keys.push(key);
        this._values.push(value);
        return this;
    }

    reset(): void {
        this._counter = 0;
    }

    hasNext(): boolean {
        return this._counter < this._keys.length;
    }

    next(): A {
        return this._keys[this._counter++];
    }
}