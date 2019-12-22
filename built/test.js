"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpreadsheetGS_1 = require("./SpreadsheetGS");
var Picker_1 = require("./Picker");
function testPicker() {
    var p = new Picker_1.Picker();
    p.show("Stuff", "Dialog");
}
function Test(name, result) {
    Logger.log(name + "\t=\t" + result);
}
function testSheets() {
    var ss = new SpreadsheetGS_1.SpreadsheetGS();
    var s = ss.getSheet("1KDKs64gkb3gUSQbMdflrtzWdbQpBWZOHSZBcmYVVICI");
    Test("Get Value", s.getValue(1, 1));
    Test("Get Column", s.getColumn(2)[0]);
    Test("Set Value", s.setValue("8", 1, 1).getValue(1, 1));
    Test("Set Values", s.setValues("Test", 1, 7, 1, 2).getValue(1, 7));
    Test("Delete Row", s.deleteRow(12).getValue(12, 1));
    Test("Delete Col", s.deleteCol(8).getValue(1, 7));
}
function testSpreadsheets() {
    var ss = new SpreadsheetGS_1.SpreadsheetGS();
    Logger.log(ss.getDataAsObject("Picker"));
}
