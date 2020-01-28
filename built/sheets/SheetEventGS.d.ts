/// <reference types="google-apps-script" />
import { SpreadsheetGS } from './SpreadsheetGS';
import { SheetGS } from './SheetGS';
/**
 * Class to process Spreadsheet events (like onEdit, onChange)
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} event the underlying
 *  event object
 */
export declare function newSheetEvent(event: GoogleAppsScript.Events.SheetsOnEdit | GoogleAppsScript.Events.SheetsOnChange | GoogleAppsScript.Events.SheetsOnFormSubmit | GoogleAppsScript.Events.SheetsOnOpen): SheetEventGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {GoogleAppsScript.Events.SheetsOnEdit |
  GoogleAppsScript.Events.SheetsOnChange |
  GoogleAppsScript.Events.SheetsOnFormSubmit |
  GoogleAppsScript.Events.SheetsOnOpen} the Event object
 */
export declare function getSheetEventObject(obj: SheetEventGS): GoogleAppsScript.Events.SheetsOnEdit | GoogleAppsScript.Events.SheetsOnChange | GoogleAppsScript.Events.SheetsOnFormSubmit | GoogleAppsScript.Events.SheetsOnOpen;
/**
 * Gets the active spreadsheet

 * @param {SheetEventGS} obj the SheetEvent object
 *
 * @return {SpreadsheetGS} the spreadsheet, or undefined if the event does not
 *  refer to a spreadsheet
 */
export declare function getSheetEventActiveSheet(obj: SheetEventGS): SpreadsheetGS | undefined;
/**
 * Gets the current sheet name
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {string | undefined} the sheet name, or undefined if the event
 *  does not refer to a sheet
 */
export declare function getSheetEventSheetName(obj: SheetEventGS): string | undefined;
/**
 * Get the current sheet
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {SheetGS | undefined} the current sheet, or undefined if the event
 *  does not have an associated sheet
 */
export declare function getSheetEventSheet(obj: SheetEventGS): SheetGS | undefined;
/**
 * Get the current row
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {number | undefined} the current row, or undefined if the event has
 *  no sheet
 */
export declare function getSheetEventRow(obj: SheetEventGS): number | undefined;
/**
 * Get the current column
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {number | undefined} the current column, or undefined if the event
 *  has no sheet
 */
export declare function getSheetEventColumn(obj: SheetEventGS): number | undefined;
/**
 * Get the value that has been edited
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {string | Date | undefined} the value, or undefined if the event
 *  has no value
 */
export declare function getSheetEventEditedValue(obj: SheetEventGS): string | Date | undefined;
/**
 * Check to see if the cell is in the specified trigger range
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {boolean | undefined} true if the cell is in the trigger range, or
 *  undefined if the event has no sheet
 */
export declare function checkSheetEventCell(obj: SheetEventGS): boolean | undefined;
/**
 * Gets the value from the underlying sheet
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} row the row of the cell
 * @param {number} col the column of the cell
 *
 * @return {string | undefined} the value of the cell, or undefined if the
 *  event has no sheet
 */
export declare function getSheetEventValue(obj: SheetEventGS, row: number, col: number): string | undefined;
/**
 * Adds sheet to the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {string} name the name of the sheet
 * @return {SheetEventGS | undefined} the object for chaining, or undefined if
 *  the event has no sheet
 */
export declare function addSheetEventTriggerSheetName(obj: SheetEventGS, name: string): SheetEventGS | undefined;
/**
 * Adds a column range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} min the first column
 * @param {number} max the last column
 * @return {SheetEventGS | undefined} the object for chaining, or undefined if
 *  the event has no sheet
 */
export declare function addSheetEventTriggerColumnRange(obj: SheetEventGS, min?: number, max?: number): SheetEventGS | undefined;
/**
 * Adds a row range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} min the first row
 * @param {number} max the last row
 * @return {SheetEventGS | undefined} the object for chaining, or undefined if
 *  the event has no sheet
 */
export declare function addSheetEventTriggerRowRange(obj: SheetEventGS, min?: number, max?: number): SheetEventGS | undefined;
/**
 * Adds a range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {boolean} forRow true if the range is for rows
 * @param {number | Array<number>} min the minimum row/column, or list of
 *  rows or columns
 * @param {number | Array<number>} max the maximum row/column, or list of
 *  rows or columns
 * @return {SheetEventGS | undefined} the object for chaining, or undefined if
 *  the event has no sheet
 */
export declare function addSheetEventTriggerRange(obj: SheetEventGS, forRow: boolean, min: number | Array<number>, max: number | Array<number>): SheetEventGS | undefined;
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
     * @param {GoogleAppsScript.Events.SheetsOnEdit |
     * GoogleAppsScript.Events.SheetsOnChange |
     * GoogleAppsScript.Events.SheetsOnFormSubmit |
     * GoogleAppsScript.Events.SheetsOnOpen} event the underlying
     *  event object
     */
    constructor(event: GoogleAppsScript.Events.SheetsOnEdit | GoogleAppsScript.Events.SheetsOnChange | GoogleAppsScript.Events.SheetsOnFormSubmit | GoogleAppsScript.Events.SheetsOnOpen);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Events.SheetsOnEdit |
      GoogleAppsScript.Events.SheetsOnChange |
      GoogleAppsScript.Events.SheetsOnFormSubmit |
      GoogleAppsScript.Events.SheetsOnOpen} the Event object
     */
    getObject(): GoogleAppsScript.Events.SheetsOnEdit | GoogleAppsScript.Events.SheetsOnChange | GoogleAppsScript.Events.SheetsOnFormSubmit | GoogleAppsScript.Events.SheetsOnOpen;
    /**
     * Gets the active spreadsheet
     *
     * @return {SpreadsheetGS | undefined} the spreadsheet, or undefined if the
     *  event is not associated with a spreadsheet
     */
    getActiveSheet(): SpreadsheetGS | undefined;
    /**
     * Gets the current sheet name
     *
     * @return {string | undefined} the sheet name, or undefined if the event
     *  is not associated with a sheet
     */
    getSheetName(): string | undefined;
    /**
     * Get the current sheet
     *
     * @return {SheetGS | undefined} the current sheet, or undefined if the
     *  event is not associated with a sheet
     */
    getSheet(): SheetGS | undefined;
    /**
     * Get the current row
     *
     * @return {number | undefined} the current row, or undefined if the event
     *  has no row
     */
    getRow(): number | undefined;
    /**
     * Get the current column
     *
     * @return {number | undefined} the current column, or undefined if the
     *    event has no column
     */
    getColumn(): number | undefined;
    /**
     * Get the value that has been edited
     *
     * @return {string | Date | undefined} the value, or undefined if the
     *  event has no value
     */
    getEditedValue(): string | Date | undefined;
    /**
     * Check to see if the cell is in the specified trigger range
     *
     * @return {boolean | undefined} true if the cell is in the trigger range,
     *  undefined if the event has no associated sheet
     */
    checkCell(): boolean | undefined;
    /**
     * Gets the value from the underlying sheet
     *
     * @param {number} row the row of the cell
     * @param {number} col the column of the cell
     *
     * @return {string | undefined} the value of the cell, or undefined if the
     *  event does not refer to a cell
     */
    getValue(row: number, col: number): string | undefined;
    /**
     * Adds sheet to the trigger
     *
     * @param {string} name the name of the sheet
     * @return {SheetEventGS | undefined} the object for chaining, or undefined
     *  if the event does not have an associated sheet
     */
    addTriggerSheetName(name: string): SheetEventGS | undefined;
    /**
     * Adds a column range for the trigger
     *
     * @param {number} min the first column
     * @param {number} max the last column
     * @return {SheetEventGS | undefined} the object for chaining, or undefined
     *  if there is no associated range
     */
    addTriggerColumnRange(min?: number, max?: number): SheetEventGS | undefined;
    /**
     * Adds a row range for the trigger
     *
     * @param {number} min the first row
     * @param {number} max the last row
     * @return {SheetEventGS | undefined} the object for chaining, or undefined
     *  if there is no associated range
     */
    addTriggerRowRange(min?: number, max?: number): SheetEventGS | undefined;
    /**
     * Adds a range for the trigger
     *
     * @param {boolean} forRow true if the range is for rows
     * @param {number | Array<number>} min the minimum row/column, or list of
     *  rows or columns
     * @param {number | Array<number>} max the maximum row/column, or list of
     *  rows or columns
     * @return {SheetEventGS | undefined} the object for chaining, or undefined
     *  if there is no associated range
     */
    addTriggerRange(forRow: boolean, min: number | Array<number>, max: number | Array<number>): SheetEventGS | undefined;
}
