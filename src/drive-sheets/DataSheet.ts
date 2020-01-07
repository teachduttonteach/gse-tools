import {SpreadsheetGS} from '../sheets/SpreadsheetGS';

/**
 * Gets the data sheet for the current script. Uses the script ID to name
 *  the data sheet if it has not been created already. 
 */
export function getDataSheet() {
  let _sheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  const _sheetList: GoogleAppsScript.Drive.FileIterator = 
    DriveApp.getFilesByName(ScriptApp.getScriptId());
  if ((_sheetList == null) || (!_sheetList.hasNext())) _sheet = 
    SpreadsheetApp.create(ScriptApp.getScriptId());
  else _sheet = SpreadsheetApp.open(_sheetList.next());
  return new SpreadsheetGS(_sheet);
};