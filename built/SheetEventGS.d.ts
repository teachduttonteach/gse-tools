/// <reference types="google-apps-script" />
import { SheetGS } from "./SheetGS";
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
    constructor(event: GoogleAppsScript.Events.SheetsOnEdit);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Event object
     */
    getObject(): GoogleAppsScript.Events.SheetsOnEdit;
    getSheetName(): string;
    getSheet(): SheetGS;
    getRow(): number;
    getColumn(): number;
    /**
     * Check to see if the cell is in the specified trigger range
     *
     * @returns true or false
     */
    checkCell(): boolean;
    /**
     * Gets the value from the underlying sheet
     *
     * @param row the row of the cell
     * @param col the column of the cell
     *
     * @returns the value of the cell
     */
    getValue(row: number, col: number): string;
    /**
   * Adds sheet to the trigger
   *
   * @param name
   */
    addSheetName(name: string): SheetEventGS;
    addTriggerColumnRange(min?: number, max?: number): SheetEventGS;
    addTriggerRowRange(min?: number, max?: number): SheetEventGS;
    addTriggerRange(forRow: boolean, min: any, max: any): SheetEventGS;
}
