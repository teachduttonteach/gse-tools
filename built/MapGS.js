export class MapGS {
    constructor(args) {
        this._keys = [];
        this._values = [];
        this._counter = 0;
        if (args != null) {
            for (let i = 0; i < args.length; i++) {
                this.set(args[i][0], args[i][1]);
            }
        }
    }
    get(key) {
        for (let k = 0; k < this._keys.length; k++) {
            if (key == this._keys[k])
                return this._values[k];
        }
        return null;
    }
    getKeys() {
        return this._keys;
    }
    getValues() {
        return this._values;
    }
    set(key, value) {
        this._keys.push(key);
        this._values.push(value);
        return this;
    }
    reset() {
        this._counter = 0;
    }
    hasNext() {
        return this._counter < this._keys.length;
    }
    next() {
        return this._keys[this._counter++];
    }
}
