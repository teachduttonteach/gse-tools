import { SpreadsheetGS } from './sheets/SpreadsheetGS';
import { DriveGS } from './drive/DriveGS';

/**
 * Class to hold the Data Sheet interface
 *
 * ```javascript
 * 
 * ```
 */
export class DataSheet {
/**
 * Gets the data sheet for the current script. Uses the script ID to name
 *  the data sheet if it has not been created already.
 *
 * @param {string} nameOrId the name of the Spreadsheet to use; if 'id', then
 *  this function will use the script ID for the name of the sheet; otherwise
 *  will use 'gse-tools Settings' as the name of the sheet
 * @param {string} sheetName if only one sheet is desired, specify it here
 * @return {SpreadsheetGS} the data sheet
 */
  getDataSheet(nameOrId: string = DATA_SHEET_NAME, sheetName?: string): SpreadsheetGS | undefined {
    let file = new DriveGS().getFileByName(nameOrId);
    if (file === undefined) {
      file = new DriveGS().getFileById(nameOrId);
      if (file === undefined) {
        return undefined;
      }
    }
    return new SpreadsheetGS(file.getId(), sheetName);
  }
  
}

