export declare class MapGS<A, B> {
    private _keys;
    private _values;
    private _counter;
    constructor(args?: Array<[A, B]>);
    get(key: A): B | null;
    getKeys(): Array<A>;
    getValues(): Array<B>;
    set(key: A, value: B): MapGS<A, B>;
    reset(): void;
    hasNext(): boolean;
    next(): A;
}
