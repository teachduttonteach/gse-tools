import { MapGS } from '../map/MapGS';
import { DocsGS } from '../docs/DocsGS';
import { DriveGS } from '../drive/DriveGS';
export class Test {
    constructor(mode = 'log', recipient = 'john.dutton@campusinternationalschool.org') {
        Logger.log("MODE = " + mode);
        if (mode.toLowerCase() == 'email') {
            this._mode = 'email';
            if (typeof recipient === "string")
                this._recipient = recipient;
        }
        else if (mode.toLowerCase() == 'doc') {
            Logger.log("Doc format");
            this._mode = 'doc';
            if (typeof recipient === "boolean")
                this._clearDoc = recipient;
            else
                this._clearDoc = false;
        }
        else
            this._mode = 'log';
        this._fn = '';
        this._toPrint = '';
    }
    _print(fn, conditions, resultsOfTest) {
        if (this._fn != fn) {
            this._fn = fn;
            this._toPrint += '*** Function: ' + this._fn + ' ***\n\n';
        }
        this._toPrint += '*** Conditions for ' + fn + ' (' + conditions + '): ' + resultsOfTest + ' ***\n\n';
    }
    _combinations(objectArguments) {
        let combinationArray = [];
        let argumentArray = [];
        let totalCombinations = 1;
        let keys = objectArguments.keys();
        let values = objectArguments.values();
        for (let i = 0; i < keys.length; i++) {
            let vals = values[i].length;
            argumentArray.push(vals);
            totalCombinations *= vals;
        }
        for (let i = 0; i < totalCombinations; i++) {
            let theseCombinations = new MapGS();
            let divisor = totalCombinations;
            for (let a = 0; a < argumentArray.length; a++) {
                divisor /= argumentArray[a];
                theseCombinations.set(keys[a], values[a][Math.floor(i / divisor) % argumentArray[a]]);
            }
            combinationArray.push(theseCombinations);
        }
        return combinationArray;
    }
    testFunction(functionToCall, functionArguments) {
        let results = '';
        try {
            results = functionToCall(...functionArguments);
            if (typeof results === "object")
                results = JSON.stringify(results);
        }
        catch (e) {
            this._print(functionToCall.name, functionArguments.toString(), 'Failed with ' + e);
        }
        this._print(functionToCall.name, functionArguments.toString(), results);
    }
    testEquals(testName, functionResult, desiredResult, parameters = "") {
        this._print(testName, parameters, functionResult == desiredResult ? "Yes" : "No");
    }
    testObject(objectToTest) {
        if (typeof objectToTest.getObject() === "object") {
            this._print(objectToTest.constructor.name, "", "Has object");
        }
        else {
            this._print(objectToTest.constructor.name, "", "Does not have object");
        }
    }
    _executeTestMethod(methodToCall, methodArguments, methodName) {
        let results = '';
        try {
            results = methodToCall(...methodArguments);
            if (typeof results === "object")
                results = JSON.stringify(results);
        }
        catch (e) {
            this._print(methodName, methodArguments.toString(), 'Failed with ' + e);
        }
        this._print(methodName, methodArguments.toString(), results);
    }
    _executeTestMethodWithCall(methodToCall, methodArguments, methodName, callMethod, onFirst = false) {
        let results = '';
        try {
            if (onFirst)
                results = methodToCall(...methodArguments)[0][callMethod]();
            else
                results = methodToCall(...methodArguments)[callMethod]();
            if (typeof results === "object")
                results = JSON.stringify(results);
        }
        catch (e) {
            this._print(methodName, methodArguments.toString(), 'Failed with ' + e);
        }
        this._print(methodName, methodArguments.toString(), results);
    }
    testMethod(methodToCall, methodArguments = [], methodName) {
        if (methodArguments[0] instanceof Array) {
            for (const argumentSet of methodArguments) {
                this._executeTestMethod(methodToCall, argumentSet, methodName);
            }
        }
        else {
            this._executeTestMethod(methodToCall, methodArguments, methodName);
        }
    }
    testMethodThenCall(methodToCall, methodArguments = [], callMethod, methodName, onFirst = false) {
        if (methodArguments[0] instanceof Array) {
            for (const argumentSet of methodArguments) {
                this._executeTestMethodWithCall(methodToCall, argumentSet, methodName, callMethod, onFirst);
            }
        }
        else {
            this._executeTestMethodWithCall(methodToCall, methodArguments, methodName, callMethod, onFirst);
        }
    }
    testEachArgumentOfMethod(objectArguments, methodToCall, methodArguments, methodName) {
        let objectToTest = {};
        for (let i = 0; i < methodArguments.length; i++) {
            if (methodArguments[i] == 'objectToTest')
                methodArguments[i] = objectToTest;
        }
        const combinationArray = this._combinations(objectArguments);
        for (const combo of combinationArray) {
            let nameValPairs = '';
            for (const name of combo.keys()) {
                const val = combo.get(name);
                objectToTest[name] = val;
                if (val != undefined) {
                    if (typeof val === "object") {
                        nameValPairs += name + "='" + JSON.stringify(val) + "', ";
                    }
                    else {
                        nameValPairs += name + "='" + val.toString() + "', ";
                    }
                }
            }
            let results = '';
            try {
                results = methodToCall(...methodArguments);
                if (typeof results === "object")
                    results = JSON.stringify(results);
            }
            catch (e) {
                this._print(methodName, nameValPairs, 'Failed with ' + e);
                return;
            }
            this._print(methodName, nameValPairs, results);
        }
    }
    finish() {
        if (this._mode == 'log')
            Logger.log(this._toPrint);
        else if (this._mode == 'email')
            MailApp.sendEmail(this._recipient, 'Testing gse-tools', this._toPrint);
        else {
            const testDocId = new DriveGS().getOrCreateFileByName('Testing gse-tools ' + new Date().toLocaleDateString()).getId();
            let doc = new DocsGS(testDocId);
            if (this._clearDoc)
                doc.clearBody();
            doc.addText(this._toPrint);
        }
    }
}
