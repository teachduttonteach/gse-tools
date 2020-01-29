import { Test } from '../test/Test';
import { SpreadsheetGS } from './SpreadsheetGS';
import { SheetEventGS } from './SheetEventGS';
import { GroupCreator } from './GroupCreator';

function testEvent(event: SheetEventGS) {
    const thisActiveSheet = event.getActiveSheet();
    if (thisActiveSheet !== undefined) {
        console.log("Sheet Name: " + thisActiveSheet.getObject().getName());
        console.log("Sheet Name: " + event.getSheetName());

        const thisSheet = event.getSheet();
        if (thisSheet !== undefined) console.log("Sheet Name: " + 
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

function onEdit1(e: GoogleAppsScript.Events.SheetsOnEdit) {
    console.log("In function onEdit1");
    testEvent(new SheetEventGS(e));
} 

function onChange1(e: GoogleAppsScript.Events.SheetsOnChange) {
    console.log("In function onChange1");
    testEvent(new SheetEventGS(e));
}

function onSubmit1(e: GoogleAppsScript.Events.SheetsOnFormSubmit) {
    console.log("In function onSubmit1");
    testEvent(new SheetEventGS(e));
}

function onEdit(e: GoogleAppsScript.Events.SheetsOnEdit) {
    console.log("In function onEdit");
    testEvent(new SheetEventGS(e));
}

function onChange(e: GoogleAppsScript.Events.SheetsOnChange) {
    console.log("In function onChange");
    testEvent(new SheetEventGS(e));
}

function onSubmit(e: GoogleAppsScript.Events.SheetsOnFormSubmit) {
    console.log("In function onSubmit");
    testEvent(new SheetEventGS(e));
}

function onOpen(e: GoogleAppsScript.Events.SheetsOnOpen) {
    console.log("In function onOpen");
    testEvent(new SheetEventGS(e));
}

function onOpen1(e: GoogleAppsScript.Events.SheetsOnOpen) {
    console.log("In function onOpen1");
    testEvent(new SheetEventGS(e));
}

function test() {
    //@ts-ignore
    const testSuite = new gsetoolstest.Test();

    const testSpreadsheet = 
        new SpreadsheetGS("1NpeyOdQV69nvY2WmZIFio3glHCeqTfxxtarLIFaVRyk");
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

    //testSpreadsheet.createSheet(new Date().toTimeString());

    //testSpreadsheet.getOrCreateSheet(new Date().toUTCString());

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
        testSheetRight.getRecordsMatchingColumnValue("Date", thisDate, ["First Name"]));
    Logger.log("Finding names for " + thisDate.toUTCString() + ": " + 
    testSheetRight.getRecordsMatchingColumnValue("Period", "1", ["Last Name"]));
    //Logger.log("Finding names for " + thisDate.toUTCString() + ": " + testSheetRight.getRecordsMatchingColumnValue("ASDF", "ASDF", ["ASDF"]));
    //@ts-ignore
    Logger.log("Finding names for " + thisDate.toUTCString() + ": " + testSheetRight.getRecordsMatchingColumnValue("Date", thisDate, "ASDF"));
    Logger.log("Find cell for Bob: " + testSheetRight.getCellFromFind("Bob"));
    Logger.log("Find cell for ASDF: " + testSheetRight.getCellFromFind("ASDF"));
    Logger.log("Find column for Jasmine: " + testSheetRight.getColumnFromFind("Jasmine"));
    //Logger.log("Find column for '': " + testSheetRight.getColumnFromFind(""));
    Logger.log("Find row for 4: " + testSheetRight.getRowFromFind("4"));
    //@ts-ignore
    Logger.log("Find row for 4: " + testSheetRight.getRowFromFind(4));

    // Maps
    Logger.log("Column 1 as map: " + testSheetRight.getColumnAsMap(1).values());
    Logger.log("Column 2 as map: " + testSheetRight.getColumnAsMap(2).values());
    //@ts-ignore
    //Logger.log("Column A as map: " + testSheetRight.getColumnAsMap("A").values());
    //Logger.log("Column -1 as map: " + testSheetRight.getColumnAsMap(-1).values());

    Logger.log("Finding names for " + thisDate.toUTCString() + ": " + 
    testSheetRight.getRecordsMatchingColumnValueAsMap("Date", thisDate, ["First Name"]).values());
    Logger.log("Finding names for " + thisDate.toUTCString() + ": " + 
    testSheetRight.getRecordsMatchingColumnValueAsMap("Period", "1", ["Last Name"]).values());
    //Logger.log("Finding names for " + thisDate.toUTCString() + ": " + testSheetRight.getRecordsMatchingColumnValueAsMap("ASDF", "ASDF", ["ASDF"]).keys());
    //@ts-ignore
    Logger.log("Finding names for " + thisDate.toUTCString() + ": " + testSheetRight.getRecordsMatchingColumnValueAsMap("Date", thisDate, "ASDF").values());

    // Maps
    Logger.log("Row 1 as map: " + testSheetRight.getRowAsMap(1).values());
    Logger.log("Row 2 as map: " + testSheetRight.getRowAsMap(2).values());
    //@ts-ignore
    //Logger.log("Row A as map: " + testSheetRight.getRowAsMap("A").values());
    //Logger.log("Row -1 as map: " + testSheetRight.getRowAsMap(-1).values());
    
    Logger.log("Get value of 1, 1, 8, 1:" + testSheetRight.getValuesAsMap(1, 1, 8, 1).keys());
    Logger.log("Get value of 2, 2, -1, 1:" + testSheetRight.getValuesAsMap(2, 2, -1, 1).keys());
    //Logger.log("Get value of 2, 100, 100, 1:" + testSheetRight.getValuesAsMap(2, 100, 100, 1).keys());
    //@ts-ignore
    Logger.log("Get value of 2, 'A', 'A', 2:" + testSheetRight.getValuesAsMap(2, 'A', 'A', 2).keys());

    testSheetRight.changeWorkingStatus(true, [2, 2]);

    Logger.log("Converting linebreaks: " + testSheetRight.convertLinebreaksToList(2, 8));
    Logger.log("Converting linebreaks: " + testSheetRight.convertLinebreaksToList(1, 8));
    Logger.log("Converting linebreaks: " + testSheetRight.convertLinebreaksToList(3, 8));

    testSheetRight.changeWorkingStatus(false, [2, 2]);

    const testSheetSecond = testSpreadsheet.getSheet("Second");
    testSheetSecond.clear(1,1,1,10);

    testSheetSecond.insertCol(3);
    testSheetSecond.deleteCol(5);

    const testSheetThird = testSpreadsheet.getSheet("Third");
    Logger.log("START\n\n")
    //testSheetThird.setValueAsMap("One OneA and H", "H", ["One", "OneA"]);
    testSheetThird.setValueWithLists("One 1/22 and C", "C", ["One", thisDate]);
    //testSheetThird.setValueAsMap("Two and A", "A", "Two");
    testSheetThird.setValueWithLists("1/22 and I", "I", thisDate);
    testSheetThird.setValueWithLists("Four and 1/22", thisDate, "Four");
    //testSheetSecond.setValue()

    
    Logger.log("Skip blank rows: " + testSheetThird.skipBlankRows(1));
    testSheetThird.deleteRow(11);
    testSheetThird.resetData();
    testSheetThird.setValue("New Val 55", 5, 5);
    testSheetThird.setValues("BLAH", 10, 8, 2, 2);

    testSheetThird.setValueWithMatchingColumns("Test Val 3DE", "Three", [{name: "Title", value: "D"}, {name: "One", value: "E"}], true);

    testSheetThird.setValueWithMatchingRows("Test Val IOneOneA", "I", [{name: "Title", value: "One"}, {name: "A", value: "OneA"}], true);

    
    let testGroupCreator = new GroupCreator({className: "Physics", 
        numGroups: 5, 
        spreadsheetId: "1NpeyOdQV69nvY2WmZIFio3glHCeqTfxxtarLIFaVRyk", 
        sheetName: "Student Groups"});
    testGroupCreator.calculateGroups();
    // TODO: attach test script to test this
    //testGroupCreator.displayGroupSet();
    // TODO: Fix this
    //Logger.log(testGroupCreator.getStudents());
    
}