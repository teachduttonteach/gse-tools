import { MapGS } from "../map/MapGS";
export declare class Test {
    _mode: string;
    _fn: string;
    _toPrint: string;
    _recipient: string;
    constructor(mode?: string, recipient?: string);
    private _print;
    private _combinations;
    testFunction(functionToCall: CallableFunction, functionArguments: Array<any>): void;
    testEachArgumentOfMethod(objectToTest: any, objectArguments: MapGS<string, Array<string>>, methodToCall: CallableFunction, methodArguments: Array<any>): void;
    finish(): void;
}
