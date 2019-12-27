/// <reference types="google-apps-script" />
import { UiGS } from "./UiGS";
import { SheetGS } from "./SheetGS";
import { MapGS } from "./MapGS";
/**
 * Gets the data from a Google Sheet and provides an interface to it in an efficient way.
 *
 */
export declare class SpreadsheetGS extends UiGS {
    private _spreadsheet;
    private _sheets;
    _ui: GoogleAppsScript.Base.Ui;
    /**
     *
     * @param id the id of the Google Sheet to use
     */
    constructor();
    constructor(id: GoogleAppsScript.Spreadsheet.Spreadsheet);
    constructor(id: string);
    activateUi(): SpreadsheetGS;
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Spreadsheet object
     */
    getObject(): GoogleAppsScript.Spreadsheet.Spreadsheet;
    /**
     * Get the data from the Spreadsheet as an object with rows (or columns) as the keys and columns (or rows) as the values
     *
     * @param sheetName the sheet name
     * @param rowFirst if true, rows will be the keys and columns will be in the values along with the value found at that cell
     *
     * @returns the data object
     */
    getMapData(sheetName: string, rowFirst?: boolean): MapGS<string, MapGS<string, string>>;
    /**
     * Gets the named sheet or creates it if it doesn't exist
     *
     * @param sheetName the name of the sheet
     *
     * @returns the specified sheet
     */
    getOrCreateSheet(sheetName: string): SheetGS;
    /**
     * Create a new sheet in the Spreadsheet
     *
     * @param sheetName the name of the sheet to create
     *
     * @returns the new sheet
     */
    createSheet(sheetName: string): SheetGS;
    /**
     * Checks to see if the Spreadsheet has a named sheet
     *
     * @param sheetName the sheet name requested
     *
     * @returns true if it has the named sheet
     */
    hasSheet(sheetName: string): boolean;
    /**
     * Gets the named sheet
     *
     * @param sheetName the name of the sheet to get
     *
     * @returns the requested sheet
     */
    getSheet(sheetName: string): SheetGS;
    /**
     * Adds a trigger for this Spreadsheet
     *
     * @param triggerType the type of trigger to add, from Script.EventType
     * @param sheetName the name of the sheet
     * @param functionName the name of the function to call
     *
     * @returns the Spreadsheet object for chaining
     */
    addTrigger(triggerType: GoogleAppsScript.Script.EventType, sheetName: string, functionName: string): SpreadsheetGS;
}
