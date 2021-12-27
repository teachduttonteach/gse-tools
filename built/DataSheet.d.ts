import { SpreadsheetGS } from './sheets/SpreadsheetGS';
/**
 * Class to hold the Data Sheet interface
 *
 * ```javascript
 *
 * ```
 */
export declare class DataSheet {
    /**
     * Gets the data sheet for the current script. Uses the script ID to name
     *  the data sheet if it has not been created already.
     *
     * @param {string} name the name of the Spreadsheet to use; if 'id', then
     *  this function will use the script ID for the name of the sheet; otherwise
     *  will use 'gse-tools Settings' as the name of the sheet
     * @param {string} sheetName if only one sheet is desired, specify it here
     * @return {SpreadsheetGS} the data sheet
     */
    getDataSheet(name?: string, sheetName?: string): SpreadsheetGS;
}
