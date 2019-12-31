import {SpreadsheetGS} from "../sheets/SpreadsheetGS"

export function getDataSheet() {
    let _sheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
    let _sheetList: GoogleAppsScript.Drive.FileIterator = DriveApp.getFilesByName(ScriptApp.getScriptId());
    if ((_sheetList == null) || (!_sheetList.hasNext())) _sheet = SpreadsheetApp.create(ScriptApp.getScriptId());
    else _sheet = SpreadsheetApp.open(_sheetList.next());
    return new SpreadsheetGS(_sheet);
  };
  
  