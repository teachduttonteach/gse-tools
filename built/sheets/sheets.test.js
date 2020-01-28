import { SpreadsheetGS } from './SpreadsheetGS';
import { SheetEventGS } from './SheetEventGS';
function testEvent(event) {
    const thisActiveSheet = event.getActiveSheet();
    if (thisActiveSheet !== undefined) {
        console.log("Sheet Name: " + thisActiveSheet.getObject().getName());
        console.log("Sheet Name: " + event.getSheetName());
        const thisSheet = event.getSheet();
        if (thisSheet !== undefined)
            console.log("Sheet Name: " +
                thisSheet.getObject().getName());
    }
    const thisEditedValue = event.getEditedValue();
    if (thisEditedValue !== undefined) {
        console.log("Edited value: " + thisEditedValue);
        console.log("Current column: " + event.getColumn());
        console.log("Current row: " + event.getRow());
    }
    const thisValue = event.getValue(1, 1);
    if (thisValue !== undefined) {
        console.log("Value: " + thisValue);
    }
    /*
    event.checkCell
    event.addTriggerSheetName
    event.addTriggerRowRange
    event.addTriggerColumnRange
    event.addTriggerRange
*/
}
function onEdit1(e) {
    console.log("In function onEdit1");
    testEvent(new SheetEventGS(e));
}
function onChange1(e) {
    console.log("In function onChange1");
    testEvent(new SheetEventGS(e));
}
function onSubmit1(e) {
    console.log("In function onSubmit1");
    testEvent(new SheetEventGS(e));
}
function onEdit(e) {
    console.log("In function onEdit");
    testEvent(new SheetEventGS(e));
}
function onChange(e) {
    console.log("In function onChange");
    testEvent(new SheetEventGS(e));
}
function onSubmit(e) {
    console.log("In function onSubmit");
    testEvent(new SheetEventGS(e));
}
function onOpen(e) {
    console.log("In function onOpen");
    testEvent(new SheetEventGS(e));
}
function onOpen1(e) {
    console.log("In function onOpen1");
    testEvent(new SheetEventGS(e));
}
function test() {
    //@ts-ignore
    const testSuite = new gsetoolstest.Test();
    const testSpreadsheet = new SpreadsheetGS("1NpeyOdQV69nvY2WmZIFio3glHCeqTfxxtarLIFaVRyk");
    //Exists
    Logger.log("HasSheet: " + testSpreadsheet.hasSheet("First"));
    //Doesn't exist
    Logger.log("Doesn't have sheet: " + testSpreadsheet.hasSheet("Garbage"));
    // Exists
    let testMap = testSpreadsheet.getDataAsMap("First");
    Logger.log("First sheet keys: " + testMap.keys());
    // Doesn't exist
    testMap = testSpreadsheet.getDataAsMap("Garbage");
    Logger.log("First sheet keys: " + testMap.keys());
    testSpreadsheet.createSheet(new Date().toTimeString());
    testSpreadsheet.getOrCreateSheet(new Date().toUTCString());
    /*
    testSpreadsheet.deleteTriggers();
    testSpreadsheet.addTrigger("Edit", "onEdit1");
    testSpreadsheet.addTrigger("Edit");
    testSpreadsheet.addTrigger("Change", "onChange1");
    testSpreadsheet.addTrigger("Change");
    testSpreadsheet.addTrigger("Submit", "onSubmit1");
    testSpreadsheet.addTrigger("Submit");
    testSpreadsheet.addTrigger("Open", "onOpen1");
    testSpreadsheet.addTrigger("Open");
*/
    //const testSheetWrong = testSpreadsheet.getSheet("blah");
    const testSheetRight = testSpreadsheet.getSheet("First");
    //Logger.log("Wrong: " + testSheetWrong.getLastColumn());
    Logger.log("Last Column: " + testSheetRight.getLastColumn() + ", Row: " + testSheetRight.getLastRow());
    //Logger.log("Date value of non-date: " + testSheetRight.getDateValue(1, 1));
    Logger.log("Date value of date: " + testSheetRight.getDateValue(2, 2));
    Logger.log("Should be column 3: " + testSheetRight.getColumn(3));
    //Logger.log("Should be column 100: " + testSheetRight.getColumn(100));
    //Logger.log("Should be column -1: " + testSheetRight.getColumn(-1));
    //@ts-ignore
    //Logger.log("Should be column 'A': " + testSheetRight.getColumn('A'));
    Logger.log("Should be row 3: " + testSheetRight.getRow(3));
    //Logger.log("Should be row 100: " + testSheetRight.getRow(100));
    //Logger.log("Should be row -1: " + testSheetRight.getRow(-1));
    //@ts-ignore
    //Logger.log("Should be row 'A': " + testSheetRight.getRow('A'));
    Logger.log("Get value of 1, 1:" + testSheetRight.getValue(1, 1));
    //Logger.log("Get value of 2, -1:" + testSheetRight.getValue(2, -1));
    //Logger.log("Get value of 2, 100:" + testSheetRight.getValue(2, 100));
    //@ts-ignore
    //Logger.log("Get value of 2, 'A':" + testSheetRight.getValue(2, 'A'));
    Logger.log("Get value of 1, 1, 10, 1:" + testSheetRight.getValues(1, 1, 10, 1));
    //Logger.log("Get value of 2, -1, -1, 1:" + testSheetRight.getValues(2, -1, -1, 1));
    //Logger.log("Get value of 2, 100, 100, 1:" + testSheetRight.getValues(2, 100, 100, 1));
    //@ts-ignore
    //Logger.log("Get value of 2, 'A', 'A', 2:" + testSheetRight.getValues(2, 'A', 'A', 2));
    // Finds
    let thisDate = new Date();
    thisDate.setMonth(0, 22);
    Logger.log("Finding names for " + thisDate.toUTCString() + ": " +
        testSheetRight.getRecordsMatchingColumnValue("Date", thisDate, ["Full Name"]));
    Logger.log("Find cell for Bob: " + testSheetRight.getCellFromFind("Bob"));
    Logger.log("Find column for Jasmine: " + testSheetRight.getColumnFromFind("Jasmine"));
    Logger.log("Find row for 4: " + testSheetRight.getRowFromFind("4"));
    // Maps
    /*
      testSheet.getColumnAsMap
      testSheet.getDataAsMap
      testSheet.getRecordsMatchingColumnValueAsMap
      testSheet.getRowAsMap
      testSheet.getValuesAsMap
  
      testSheet.addValueForSpecifiedColumn
      testSheet.areValuesEqualAsMap
      testSheet.areSheetValuesEqual
      testSheet.changeWorkingStatus
      testSheet.clear
      testSheet.convertLinebreaksToList
      testSheet.deleteCol
      testSheet.deleteRow
      testSheet.insertCol
      testSheet.resetData
      testSheet.setBackground
      testSheet.setValueAsMap
      testSheet.setValuesAsMap
      testSheet.setValue
      testSheet.setValues
      testSheet.skipBlankRows
  */
    /*
    let testGroupCreator = new GroupCreator();
    testGroupCreator.addStudent
    testGroupCreator.calculateGroups
    testGroupCreator.calculateScore
    testGroupCreator.displayGroupSet
    testGroupCreator.getStudents
    */
}
