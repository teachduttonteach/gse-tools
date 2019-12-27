/// <reference types="google-apps-script" />
import { MapGS } from "./MapGS";
/**
 * The cell range type for us in setting values
 */
declare type CellRange = {
    /**
     * The starting row
     */
    startRow: number;
    /**
     * The starting column
     */
    startCol: number;
    /**
     * The number of rows (default: 1)
     */
    numRows?: number;
    /**
     * The number of columns (default: 1)
     */
    numCols?: number;
    /**
     * The value of the cells
     */
    value: string;
};
/**
 * Class to access methods and properties of individual Sheets of Google Spreadsheets
 */
export declare class SheetGS {
    private _sheet;
    private _data;
    private _textFinder;
    private _lastRow;
    private _lastCol;
    private _mapData;
    /**
     * Builds the SheetGS object
     *
     * @param sheetObject the Google Apps Script Sheet object
     */
    constructor(sheetObject: GoogleAppsScript.Spreadsheet.Sheet);
    /**
     * Resets the data object when Sheet data changes
     *
     * @returns {SheetGS} the object for chaining
     */
    resetData(): SheetGS;
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Sheet object
     */
    getObject(): GoogleAppsScript.Spreadsheet.Sheet;
    /**
     * Gets the value of the cell
     *
     * @param {number} row the row of the value, indexed at 1
     * @param {number} col the column of the value, indexed at 1
     */
    getValue(row: number, col: number): string;
    /**
     * Gets the values of the cells
     *
     * @param {number} row the row of the value, indexed at 1
     * @param {number} col the column of the value, indexed at 1
     * @param {number} numRows the number of rows to get
     * @param {number} numCols the number of columns to get
     */
    getValues(row: number, col: number, numRows: number, numCols: number): Array<Array<string>>;
    /**
     * Gets the values of the cells
     *
     * @param {number} row the row of the value, indexed at 1
     * @param {number} col the column of the value, indexed at 1
     * @param {number} numRows the number of rows to get
     * @param {number} numCols the number of columns to get
     *
     * @returns {MapGS<string, MapGS<string, string>>} a map object of rows with maps of columns
     */
    getMapValues(row: number, col: number, numRows: number, numCols: number): MapGS<string, MapGS<string, string>>;
    /**
    * Gets an entire column from the sheet
    *
    * @param {number} numColumn number of the column
    * @return {Array<string>} the column
    */
    getColumn(numColumn: number): Array<string>;
    /**
    * Gets an entire column from the sheet
    *
    * @param {number} numColumn number of the column
    * @return {MapGS<string, string>} the row names with column values
    */
    getMapColumn(numColumn: number): MapGS<string, string>;
    /**
     * Converts linebreaks in the string to an array
     * @param {number} row the row of the cell to convert
     * @param {number} column the column of the cell to convert
     *
     * @returns {SheetGS} the sheet for chaining
     */
    convertLinebreaksToList(row: number, column: number): Array<string>;
    /**
     * Sets the value of the cell
     *
     * @param value the value to set
     * @param row the row of the cell
     * @param col the column of the cell
     *
     * @returns {SheetGS} the sheet for chaining
     */
    setValue(value: string, row: number, col: number, reset?: boolean): SheetGS;
    setMapValue(value: string, row: string, column: string, reset?: boolean): SheetGS;
    /**
     * Set the values of cells for a range
     *
     * @param firstParam the value, as a string or array; OR an object containing the following parameters: startRow, startCol, numRows, numCols, and value
     * @param startRow the beginning row to place this value or set of values
     * @param startCol the beginning column to place this value or set of values
     * @param numRows the number of rows to place this value or set of values
     * @param numCols the number of columns to place this value or set of values
     *
     * @returns {SheetGS} the object for chaining
     */
    setValues(firstParam: string | Array<string> | Array<Array<string>> | CellRange, startRow?: number, startCol?: number, numRows?: number, numCols?: number): SheetGS;
    setMapValues(value: string, rowValue: string, columnName: string, secondColumnName?: string, secondColumnValue?: string): SheetGS;
    /**
 * Get the data from the Sheet as an object with rows (or columns) as the keys and columns (or rows) as the values
 *
 * @param rowFirst if true, rows will be the keys and columns will be in the values along with the value found at that cell
 *
 * @returns the data object
 */
    getMapData(rowFirst?: boolean): MapGS<string, MapGS<string, string>>;
    clear(row: number, col: number, numRows: number, numCols: number): void;
    getRecordsMatchingColumnValue(matchColumnName: string, matchColumnValue: string, returnColumnNames: Array<string>): Array<Array<string>>;
    getMapRecordsMatchingColumnValue(matchColumnName: string, matchColumnValue: string, returnColumnNames: Array<string>): MapGS<string, MapGS<string, string>>;
    /**
     * Skips blank rows at the beginning (or a specified location) in a sheet
     *
     * @param startRow the first row to look at for a blank row
     * @param col the column to check for blanks
     *
     * @returns {number} the first row that isn't blank
     */
    skipBlankRows(startRow?: number, col?: number): number;
    /**
     * Deletes a row in a Sheet
     *
     * @param row the row number to delete
     *
     * @returns {SheetGS} the object for chaining
     */
    deleteRow(row: number): SheetGS;
    /**
     * Deletes a column in a Sheet
     *
     * @param col the column number to delete
     *
     * @returns {SheetGS} the object for chaining
     */
    deleteCol(col: number): SheetGS;
    /**
     * Inserts a column into the Sheet
     *
     * @param col the column number to insert before
     *
     * @returns {SheetGS} the object for chaining
     */
    insertCol(col: number): SheetGS;
    /**
     * Finds text in the sheet and returns the Range found for the nth (default first) instance
     *
     * @param findText the text to find
     *
     * @returns {GoogleAppsScript.Spreadsheet.Range} the Range found
     */
    getCellFromFind(findText: string, findNumber?: number): GoogleAppsScript.Spreadsheet.Range;
    /**
     * Finds text in the sheet and returns the row found for the nth (default first) instance
     *
     * @param findText the text to find
     *
     * @returns {number} the row found
     */
    getRowFromFind(findText: string, findNumber?: number): number;
    getRow(rowNumber: number): Array<string>;
    getMapRow(rowNumber: number): MapGS<string, string>;
    /**
     * Finds text in the sheet and returns the column found for the nth (default first) instance
     *
     * @param findText the text to find
     *
     * @returns {number} the column found
     */
    getColumnFromFind(findText: string, findNumber?: number): number;
    /**
     * Gets the last row of the Sheet
     *
     * @returns {number} the row
     */
    getLastRow(): number;
    /**
     * Gets the last column of the Sheet
     *
     * @returns {number} the column
     */
    getLastColumn(): number;
    /**
     * Changes the color of a selected cell while an operation is occurring
     *
     * @param working set true if the operation is occurring, false when it is done
     * @param cell the cell reference as an array
     * @param color the color to set the cell
     *
     * @returns {SheetGS} the object for chaining
     */
    changeWorkingStatus(working: boolean, cell?: Array<number>, color?: string): SheetGS;
    /**
     * Sets the background of the given cell to a color
     *
     * @param row the row of the cell
     * @param col the column of the cell
     * @param color the color to set the background of the cell
     *
     * @returns {SheetGS} the object for chaining
     */
    setBackground(row: number, col: number, color: string): SheetGS;
    /**
     * Adds a value for the specified column and row beginning, and inserts a column if it doesn't exist
     *
     * @param columnHeader the column name to match
     * @param {Array<string>} rowHeaders the beginning of the row to match
     * @param cellValue the value to put in
     *
     * @returns {SheetGS} the object for chaining
     */
    addValueForSpecifiedColumn(columnHeader: string, rowHeaders: Array<string> | string, cellValue: string): SheetGS;
}
export {};
