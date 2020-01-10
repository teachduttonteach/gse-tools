/// <reference types="google-apps-script" />
import { UiGS } from '../UiGS';
import { SheetGS } from './SheetGS';
import { MapGS } from '../map/MapGS';
/**
 * Gets the data from a Google Sheet and provides an interface to it in an
 *  efficient way.
 *
 */
export declare class SpreadsheetGS extends UiGS {
    private _spreadsheet;
    private _sheets;
    _ui: GoogleAppsScript.Base.Ui;
    /**
     *
     * @param {GoogleAppsScript.Spreadsheet.Spreadsheet | string | any | undefined} id the id of the Google Sheet to use
     */
    constructor(id?: GoogleAppsScript.Spreadsheet.Spreadsheet | string | any);
    /**
     * Activate the UI for the spreadsheet
     *
     * @return {SpreadsheetGS} the object for chaining
     */
    activateUi(): SpreadsheetGS;
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Spreadsheet.Spreadsheet} the Spreadsheet object
     */
    getObject(): GoogleAppsScript.Spreadsheet.Spreadsheet;
    /**
     * Get the data from the Spreadsheet as an object with rows (or columns) as
     *  the keys and columns (or rows) as the values
     *
     * @param {string} sheetName the sheet name
     * @param {boolean} rowFirst if true, rows will be the keys and columns
     *  will be in the values along with the value found at that cell
     *
     * @return {MapGS<string | Date, MapGS<string | Date, string | Date>>} the
     *  data object
     */
    getMapData(sheetName: string, rowFirst?: boolean): MapGS<string | Date, MapGS<string | Date, string | Date>>;
    /**
     * Gets the named sheet or creates it if it doesn't exist
     *
     * @param {string} sheetName the name of the sheet
     *
     * @return {SheetGS} the specified sheet
     */
    getOrCreateSheet(sheetName: string): SheetGS;
    /**
     * Create a new sheet in the Spreadsheet
     *
     * @param {string} sheetName the name of the sheet to create
     *
     * @return {SheetGS} the new sheet
     */
    createSheet(sheetName: string): SheetGS;
    /**
     * Checks to see if the Spreadsheet has a named sheet
     *
     * @param {string} sheetName the sheet name requested
     *
     * @return {boolean} true if it has the named sheet
     */
    hasSheet(sheetName: string): boolean;
    /**
     * Gets the named sheet
     *
     * @param {string} sheetName the name of the sheet to get
     *
     * @return {SheetGS} the requested sheet
     */
    getSheet(sheetName: string): SheetGS;
    /**
     * Adds a trigger for this Spreadsheet
     *
     * @param {GoogleAppsScript.Script.EventType} triggerType the type of
     *  trigger to add, from Script.EventType
     * @param {string} sheetName the name of the sheet
     * @param {string} functionName the name of the function to call
     *
     * @return {SpreadsheetGS} the Spreadsheet object for chaining
     */
    addTrigger(triggerType: GoogleAppsScript.Script.EventType, sheetName: string, functionName: string): SpreadsheetGS;
}
