/// <reference types="google-apps-script" />
import { SpreadsheetGS } from './SpreadsheetGS';
import { SheetGS } from './SheetGS';
/**
 * Class to process Spreadsheet events (like onEdit, onChange)
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} event the underlying
 *  event object
 */
export declare function newSheetEvent(event: GoogleAppsScript.Events.SheetsOnEdit): SheetEventGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {GoogleAppsScript.Events.SheetsOnEdit} the Event object
 */
export declare function getSheetEventObject(obj: SheetEventGS): GoogleAppsScript.Events.SheetsOnEdit;
/**
 * Gets the active spreadsheet

 * @param {SheetEventGS} obj the SheetEvent object
 *
 * @return {SpreadsheetGS} the spreadsheet
 */
export declare function getSheetEventActiveSheet(obj: SheetEventGS): SpreadsheetGS;
/**
 * Gets the current sheet name
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {string} the sheet name
 */
export declare function getSheetEventSheetName(obj: SheetEventGS): string;
/**
 * Get the current sheet
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {SheetGS} the current sheet
 */
export declare function getSheetEventSheet(obj: SheetEventGS): SheetGS;
/**
 * Get the current row
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {number} the current row
 */
export declare function getSheetEventRow(obj: SheetEventGS): number;
/**
 * Get the current column
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {number} the current column
 */
export declare function getSheetEventColumn(obj: SheetEventGS): number;
/**
 * Get the value that has been edited
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {string | Date} the value
 */
export declare function getSheetEventEditedValue(obj: SheetEventGS): string | Date;
/**
 * Check to see if the cell is in the specified trigger range
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {boolean} true if the cell is in the trigger range
 */
export declare function checkSheetEventCell(obj: SheetEventGS): boolean;
/**
 * Gets the value from the underlying sheet
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} row the row of the cell
 * @param {number} col the column of the cell
 *
 * @return {string} the value of the cell
 */
export declare function getSheetEventValue(obj: SheetEventGS, row: number, col: number): string;
/**
 * Adds sheet to the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {string} name the name of the sheet
 * @return {SheetEventGS} the object for chaining
 */
export declare function addSheetEventTriggerSheetName(obj: SheetEventGS, name: string): SheetEventGS;
/**
 * Adds a column range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} min the first column
 * @param {number} max the last column
 * @return {SheetEventGS} the object for chaining
 */
export declare function addSheetEventTriggerColumnRange(obj: SheetEventGS, min?: number, max?: number): SheetEventGS;
/**
 * Adds a row range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} min the first row
 * @param {number} max the last row
 * @return {SheetEventGS} the object for chaining
 */
export declare function addSheetEventTriggerRowRange(obj: SheetEventGS, min?: number, max?: number): SheetEventGS;
/**
 * Adds a range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {boolean} forRow true if the range is for rows
 * @param {number | Array<number>} min the minimum row/column, or list of
 *  rows or columns
 * @param {number | Array<number>} max the maximum row/column, or list of
 *  rows or columns
 * @return {SheetEventGS} the object for chaining
 */
export declare function addSheetEventTriggerRange(obj: SheetEventGS, forRow: boolean, min: number | Array<number>, max: number | Array<number>): SheetEventGS;
/**
 * Class to process Spreadsheet events (like onEdit, onChange)
 *
 */
export declare class SheetEventGS {
    private event;
    private _sheet;
    private _sheetName;
    private _row;
    private _column;
    private _value;
    private _triggerRanges;
    private _triggerSheet;
    private _event;
    private _activeSheet;
    /**
     *
     * @param {GoogleAppsScript.Events.SheetsOnEdit} event the underlying
     *  event object
     */
    constructor(event: GoogleAppsScript.Events.SheetsOnEdit);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Events.SheetsOnEdit} the Event object
     */
    getObject(): GoogleAppsScript.Events.SheetsOnEdit;
    /**
     * Gets the active spreadsheet
     *
     * @return {SpreadsheetGS} the spreadsheet
     */
    getActiveSheet(): SpreadsheetGS;
    /**
     * Gets the current sheet name
     *
     * @return {string} the sheet name
     */
    getSheetName(): string;
    /**
     * Get the current sheet
     *
     * @return {SheetGS} the current sheet
     */
    getSheet(): SheetGS;
    /**
     * Get the current row
     *
     * @return {number} the current row
     */
    getRow(): number;
    /**
     * Get the current column
     *
     * @return {number} the current column
     */
    getColumn(): number;
    /**
     * Get the value that has been edited
     *
     * @return {string | Date} the value
     */
    getEditedValue(): string | Date;
    /**
     * Check to see if the cell is in the specified trigger range
     *
     * @return {boolean} true if the cell is in the trigger range
     */
    checkCell(): boolean;
    /**
     * Gets the value from the underlying sheet
     *
     * @param {number} row the row of the cell
     * @param {number} col the column of the cell
     *
     * @return {string} the value of the cell
     */
    getValue(row: number, col: number): string;
    /**
     * Adds sheet to the trigger
     *
     * @param {string} name the name of the sheet
     * @return {SheetEventGS} the object for chaining
     */
    addTriggerSheetName(name: string): SheetEventGS;
    /**
     * Adds a column range for the trigger
     *
     * @param {number} min the first column
     * @param {number} max the last column
     * @return {SheetEventGS} the object for chaining
     */
    addTriggerColumnRange(min?: number, max?: number): SheetEventGS;
    /**
     * Adds a row range for the trigger
     *
     * @param {number} min the first row
     * @param {number} max the last row
     * @return {SheetEventGS} the object for chaining
     */
    addTriggerRowRange(min?: number, max?: number): SheetEventGS;
    /**
     * Adds a range for the trigger
     *
     * @param {boolean} forRow true if the range is for rows
     * @param {number | Array<number>} min the minimum row/column, or list of
     *  rows or columns
     * @param {number | Array<number>} max the maximum row/column, or list of
     *  rows or columns
     * @return {SheetEventGS} the object for chaining
     */
    addTriggerRange(forRow: boolean, min: number | Array<number>, max: number | Array<number>): SheetEventGS;
}
