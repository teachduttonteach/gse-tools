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
            if (key == this._keys[k]) return this._values[k]; 
        }
        return null;
    }

    getKeys(): Array<A> {
        return this._keys;
    }

    getValues(): Array<B> {
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