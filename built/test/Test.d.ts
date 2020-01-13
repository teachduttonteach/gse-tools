import { MapGS } from '../map/MapGS';
export declare class Test {
    _mode: string;
    _fn: string;
    _toPrint: string;
    _recipient: string;
    _clearDoc: boolean;
    constructor(mode?: string, recipient?: string | boolean);
    private _print;
    private _combinations;
    testFunction(functionToCall: CallableFunction, functionArguments: Array<any>): void;
    testEquals(testName: string, functionResult: any, desiredResult: any, parameters?: string): void;
    testObject(objectToTest: any): void;
    private _executeTestMethod;
    private _executeTestMethodWithCall;
    testMethod(methodToCall: CallableFunction, methodArguments: any[] | undefined, methodName: string): void;
    testMethodThenCall(methodToCall: CallableFunction, methodArguments: any[] | undefined, callMethod: string, methodName: string, onFirst?: boolean): void;
    testEachArgumentOfMethod(objectArguments: MapGS<string, Array<string>>, methodToCall: CallableFunction, methodArguments: Array<any>, methodName: string): void;
    finish(): void;
}
