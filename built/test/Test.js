import { MapGS } from "../map/MapGS";
import { DocsGS } from "../docs/DocsGS";
import { DriveGS } from "../drive/DriveGS";
export class Test {
    constructor(mode = "log", recipient = "john.dutton@campusinternationalschool.org") {
        if (mode.toLowerCase() == "email")
            this._mode = "email";
        else if (mode.toLowerCase() == "doc")
            this._mode = "doc";
        else
            this._mode = "log";
        this._fn = "";
        this._toPrint = "";
        this._recipient = recipient;
    }
    _print(fn, conditions, resultsOfTest) {
        if (this._fn != fn) {
            this._fn = fn;
            this._toPrint = "Function: " + this._fn + "\n";
        }
        this._toPrint += "Conditions (" + conditions + "): " + resultsOfTest + "\n";
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
        let results = "";
        try {
            results = functionToCall(...functionArguments);
        }
        catch (e) {
            this._print(functionToCall.name, functionArguments.toString(), "Failed with " + results);
            throw e;
        }
        this._print(functionToCall.name, functionArguments.toString(), results);
    }
    testEachArgumentOfMethod(objectToTest, objectArguments, methodToCall, methodArguments) {
        for (let i = 0; i < methodArguments.length; i++) {
            if (methodArguments[i] == "objectToTest")
                methodArguments[i] = objectToTest;
        }
        const combinationArray = this._combinations(objectArguments);
        for (const combo of combinationArray) {
            let nameValPairs = "";
            for (const name of combo.keys()) {
                const val = combo.get(name);
                objectToTest[name] = val;
                nameValPairs += name + "='" + val + "', ";
            }
            let results = "";
            try {
                results = methodToCall(...methodArguments);
            }
            catch (e) {
                this._print(methodToCall.toString(), nameValPairs, "Failed with " + results);
                throw e;
            }
            this._print(methodToCall.toString(), nameValPairs, results);
        }
    }
    finish() {
        if (this._mode == "log")
            Logger.log(this._toPrint);
        else if (this._mode == "email")
            MailApp.sendEmail(this._recipient, "Testing gse-tools", this._toPrint);
        else {
            let doc = new DocsGS(new DriveGS().getOrCreateFileByName("Testing gse-tools " + new Date().toLocaleDateString()).getId());
            doc.addText(this._toPrint, "N");
        }
    }
}
