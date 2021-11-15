import { MapGS } from '../map/MapGS';
import { DocsGS } from '../docs/DocsGS';
import { DriveGS } from '../drive/DriveGS';

export class Test {
  _mode: 'email' | 'doc' | 'log';
  _fn: string;
  _toPrint: string;
  _recipient: string;
  _clearDoc: boolean;

  constructor(
    mode: 'email' | 'doc' | 'log' = 'log',
    recipient: string | boolean = 'john.dutton@campusinternationalschool.org',
  ) {
    if (mode.toLowerCase() == 'email') {
      this._mode = 'email';
      if (typeof recipient === 'string') this._recipient = recipient;
    } else if (mode.toLowerCase() == 'doc') {
      this._mode = 'doc';
      if (typeof recipient === 'boolean') this._clearDoc = recipient;
      else this._clearDoc = false;
    } else this._mode = 'log';
    this._fn = '';
    this._toPrint = '';
  }

  private _print(fn: string, conditions: string, resultsOfTest: string) {
    if (this._fn != fn) {
      this._fn = fn;
      this._toPrint += '*** Function: ' + this._fn + ' ***\n\n';
    }
    this._toPrint += '*** Conditions for ' + fn + ' (' + conditions + '): ' + resultsOfTest + ' ***\n\n';
  }

  private _combinations(objectArguments: MapGS<string, Array<string>>): Array<MapGS<string, string>> {
    let combinationArray: Array<MapGS<string, string>> = [];
    let argumentArray: number[] = [];
    let totalCombinations: number = 1;

    let keys = objectArguments.keys();
    let values = objectArguments.values();

    for (let i = 0; i < keys.length; i++) {
      let vals: number = values[i].length;
      argumentArray.push(vals);
      totalCombinations *= vals;
    }

    for (let i = 0; i < totalCombinations; i++) {
      let theseCombinations: MapGS<string, string> = new MapGS<string, string>();
      let divisor = totalCombinations;
      for (let a = 0; a < argumentArray.length; a++) {
        divisor /= argumentArray[a];
        theseCombinations.set(keys[a], values[a][Math.floor(i / divisor) % argumentArray[a]]);
      }
      combinationArray.push(theseCombinations);
    }

    return combinationArray;
  }

  testFunction(functionToCall: CallableFunction, functionArguments: Array<any>) {
    let results: string = '';
    try {
      results = functionToCall(...functionArguments);
      if (typeof results === 'object') results = JSON.stringify(results);
    } catch (e) {
      this._print(functionToCall.name, functionArguments.toString(), 'Failed with ' + e);
    }

    this._print(functionToCall.name, functionArguments.toString(), results);
  }

  testEquals(testName: string, functionResult: any, desiredResult: any, parameters: string = '') {
    this._print(testName, parameters, functionResult == desiredResult ? 'Yes' : 'No');
  }

  testObject(objectToTest: any) {
    if (typeof objectToTest.getObject() === 'object') {
      this._print(objectToTest.constructor.name, '', 'Has object');
    } else {
      this._print(objectToTest.constructor.name, '', 'Does not have object');
    }
  }

  private _executeTestMethod(methodToCall: CallableFunction, methodArguments: Array<any>, methodName: string) {
    let results: string = '';
    try {
      results = methodToCall(...methodArguments);
      if (typeof results === 'object') results = JSON.stringify(results);
    } catch (e) {
      this._print(methodName, methodArguments.toString(), 'Failed with ' + e);
    }

    this._print(methodName, methodArguments.toString(), results);
  }

  private _executeTestMethodWithCall(
    methodToCall: CallableFunction,
    methodArguments: Array<any>,
    methodName: string,
    callMethod: string,
    onFirst: boolean = false,
  ) {
    let results: string = '';
    try {
      if (onFirst) results = methodToCall(...methodArguments)[0][callMethod]();
      else results = methodToCall(...methodArguments)[callMethod]();
      if (typeof results === 'object') results = JSON.stringify(results);
    } catch (e) {
      this._print(methodName, methodArguments.toString(), 'Failed with ' + e);
    }

    this._print(methodName, methodArguments.toString(), results);
  }

  testMethod(methodToCall: CallableFunction, methodArguments: Array<any> = [], methodName: string) {
    if (methodArguments[0] instanceof Array) {
      for (const argumentSet of methodArguments) {
        this._executeTestMethod(methodToCall, argumentSet, methodName);
      }
    } else {
      this._executeTestMethod(methodToCall, methodArguments, methodName);
    }
  }

  testMethodThenCall(
    methodToCall: CallableFunction,
    methodArguments: Array<any> = [],
    callMethod: string,
    methodName: string,
    onFirst: boolean = false,
  ) {
    if (methodArguments[0] instanceof Array) {
      for (const argumentSet of methodArguments) {
        this._executeTestMethodWithCall(methodToCall, argumentSet, methodName, callMethod, onFirst);
      }
    } else {
      this._executeTestMethodWithCall(methodToCall, methodArguments, methodName, callMethod, onFirst);
    }
  }

  testEachArgumentOfMethod(
    objectArguments: MapGS<string, Array<string>>,
    methodToCall: CallableFunction,
    methodArguments: Array<any>,
    methodName: string,
  ) {
    let objectToTest: { [index: string]: any } = {};
    for (let i = 0; i < methodArguments.length; i++) {
      if (methodArguments[i] == 'objectToTest') methodArguments[i] = objectToTest;
    }

    const combinationArray = this._combinations(objectArguments);

    for (const combo of combinationArray) {
      let nameValPairs: string = '';
      for (const name of combo.keys()) {
        const val = combo.get(name);
        objectToTest[name] = val;

        if (val != undefined) {
          if (typeof val === 'object') {
            nameValPairs += name + "='" + JSON.stringify(val) + "', ";
          } else {
            nameValPairs += name + "='" + val.toString() + "', ";
          }
        }
      }

      let results: string = '';
      try {
        results = methodToCall(...methodArguments);
        if (typeof results === 'object') results = JSON.stringify(results);
      } catch (e) {
        this._print(methodName, nameValPairs, 'Failed with ' + e);
        return;
      }
      this._print(methodName, nameValPairs, results);
    }
  }

  finish() {
    if (this._mode == 'log') console.log(this._toPrint);
    else if (this._mode == 'email') MailApp.sendEmail(this._recipient, 'Testing gse-tools', this._toPrint);
    else {
      const testDocId = new DriveGS()
        .getOrCreateFileByName('Testing gse-tools ' + new Date().toLocaleDateString())
        .getId();
      let doc = new DocsGS(testDocId);
      if (this._clearDoc) doc.clearBody();
      doc.addText(this._toPrint);
    }
  }
}
