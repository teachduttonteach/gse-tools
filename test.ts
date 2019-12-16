function testPicker() {
  var p = new Picker();
  p.show();
}

function Test(name, result) {
  Logger.log(name + "\t=\t" + result);
}

function testSheets() {
  var ss = new SpreadsheetGS();
  let s = ss.getSheet("1KDKs64gkb3gUSQbMdflrtzWdbQpBWZOHSZBcmYVVICI");
  Test("Get Value", s.getValue(1,1));
  Test("Get Column", s.getColumn(2));
  Test("Set Value", s.setValue(1,1,8));
  Test("Set Values", s.setValues(1,7,1,2,"Test"));
  Test("Delete Row", s.deleteRow(12));
  Test("Delete Col", s.deleteCol(8));
}

function testSpreadsheets() {
  var ss = new SpreadsheetGS();
  Logger.log(ss.getDataAsObject());
}