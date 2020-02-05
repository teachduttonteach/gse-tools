/// <reference types="google-apps-script" />
import { MapGS } from '../map/MapGS';
import { CellRange } from './CellRange';
/**
 * Class to access methods and properties of individual
 * Sheets of Google Spreadsheets
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheetObject
 * the Google Apps Script Sheet object
 * @return {SheetGS} the Sheet object
 */
export declare function newSheet(sheetObject: GoogleAppsScript.Spreadsheet.Sheet): SheetGS;
/**
 * Resets the data object to sync with changes to the underlying Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @return {SheetGS} the object for chaining
 */
export declare function resetSheetData(obj: SheetGS): SheetGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SheetGS} obj the Sheet object
 * @return {GoogleAppsScript.Spreadsheet.Sheet} the Sheet object
 */
export declare function getSheetObject(obj: SheetGS): GoogleAppsScript.Spreadsheet.Sheet;
/**
 * Gets the string value of the cell
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row of the value, indexed at 1
 * @param {number} col the column of the value, indexed at 1
 * @return {string | Date} the value requested
 */
export declare function getSheetValue(obj: SheetGS, row: number, col: number): string | Date;
/**
 * Gets the Date value of the cell
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row of the value, indexed at 1
 * @param {number} col the column of the value, indexed at 1
 * @return {Date} the date value requested
 */
export declare function getSheetDateValue(obj: SheetGS, row: number, col: number): Date | null;
/**
 * Gets the values of the requested cells as an array of arrays
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row of the value, indexed at 1
 * @param {number} col the column of the value, indexed at 1
 * @param {number} numRows the number of rows to get
 * @param {number} numCols the number of columns to get
 * @return {Array<Array<string | Date>>} the array of arrays of strings
 *  or Dates
 */
export declare function getSheetValues(obj: SheetGS, row: number, col: number, numRows: number, numCols: number): Array<Array<string | Date>>;
/**
 * Gets the values of the cells as a Map of rows (as string or Date) to
 *  columns (string or Date) to values (as string or Date)
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row of the value, indexed at 1
 * @param {number} col the column of the value, indexed at 1
 * @param {number} numRows the number of rows to get
 * @param {number} numCols the number of columns to get
 *
 * @return {MapGS<string | Date, MapGS<string | Date, string | Date>>}
 *  a map object of rows with maps of columns
 */
export declare function getSheetValuesAsMap(obj: SheetGS, row: number, col: number, numRows: number, numCols: number): MapGS<string | Date, MapGS<string | Date, string | Date>>;
/**
 * Gets an entire column from the sheet as an array
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} numColumn number of the column
 * @return {Array<string | Date>} the column as an array
 */
export declare function getSheetColumn(obj: SheetGS, numColumn: number): Array<string | Date>;
/**
 * Gets an entire column from the sheet as a Map of column names to values
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} numColumn number of the column
 * @return {MapGS<string | Date, string | Date>}
 *   the row names with column values
 */
export declare function getSheetColumnAsMap(obj: SheetGS, numColumn: number): MapGS<string | Date, string | Date>;
/**
 * Converts linebreaks in the string to an array
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row of the cell to convert
 * @param {number} column the column of the cell to convert
 *
 * @return {string[]} the array of strings
 */
export declare function convertSheetLinebreaksToList(obj: SheetGS, row: number, column: number): string[];
/**
 * Sets the value of the cell in the sheet according to the row and column
 *  numbers
 *
 * @param {SheetGS} obj the Sheet object
 * @param {string | Date} value the value to set
 * @param {number} row the row of the cell
 * @param {number} col the column of the cell
 * @param {boolean} reset whether or not to reset the underlying data
 *  object to the actual Sheet data
 *
 * @return {SheetGS} the sheet for chaining
 */
export declare function setSheetValue(obj: SheetGS, value: string | Date, row: number, col: number, reset?: boolean): SheetGS;
/**
 * Sets the value of a cell in the sheet according to the name of the row
 *  and the name of the column
 *
 * @param {SheetGS} obj the Sheet object
 * @param {string | Date} value the value to change the cell to
 * @param {string | Date} row the name of the row
 * @param {string | Date} column the name of the column
 * @param {boolean} reset whether or not to reset the underlying data
 *  object to the actual Sheet data
 *
 * @return {SheetGS} the sheet for chaining
 */
export declare function setSheetValueAsMap(obj: SheetGS, value: string | Date, row: string | Date, column: string | Date, reset?: boolean): SheetGS;
/**
 * Set the values of cells for a range
 *
 * @param {SheetGS} obj the Sheet object
 * @param {string | Date | Array<string | Date> | Array<Array<string | Date>>
 *  | CellRange} firstParam the value, as a string or array;
 *  OR an object containing the following parameters: startRow, startCol,
 *  numRows, numCols, and value
 * @param {number} startRow the beginning row to place this value
 * or set of values, indexed at 1
 * @param {number} startCol the beginning column to place this value
 * or set of values, indexed at 1
 * @param {number} numRows the number of rows to place this value
 * or set of values
 * @param {number} numCols the number of columns to place this value
 * or set of values
 *
 * @return {SheetGS} the object for chaining
 */
export declare function setSheetValues(obj: SheetGS, firstParam: string | Date | Array<string | Date> | Array<Array<string | Date>> | CellRange, startRow?: number, startCol?: number, numRows?: number, numCols?: number): SheetGS;
/**
 * Checks to see if the values are Dates and if they are equal; if not,
 *  checks to see if their string values are equal
 *
 * @param {SheetGS} obj the Sheet object
 * @param {Date | string} value the value to check against
 * @param {[number, number]} cell the cell in the Sheet to check
 * @param {string} level the date level to check against
 *
 * @return {boolean} whether or not they are equal
 */
export declare function areSheetValuesEqual(obj: SheetGS, value: Date | string, cell: [number, number], level?: string): boolean;
/**
 * Checks to see if the values are Dates and if they are equal; if not,
 *  checks to see if their string values are equal
 *
 * @param {SheetGS} obj the Sheet object
 * @param {Date | string} value1 the first value to check against
 * @param {Date | string} value2 the second value to check against
 * @param {string} level the date level to check against
 *
 * @return {boolean} whether or not they are equal
 */
export declare function areSheetValuesEqualAsMap(obj: SheetGS, value1: Date | string | null, value2: Date | string, level?: string): boolean;
/**
 * Get the data from the Sheet as an object with rows (or columns) as the
 *  keys and columns (or rows) as the values
 *
 * @param {SheetGS} obj the Sheet object
 * @param {boolean} rowFirst if true, rows will be the keys and columns will
 *  be in the values along with the value found at that cell
 *
 * @return {MapGS<string | Date, MapGS<string | Date, string | Date>>}
 *  the data object
 */
export declare function getSheetDataAsMap(obj: SheetGS, rowFirst?: boolean): MapGS<string | Date, MapGS<string | Date, string | Date>>;
/**
 * Clears data from the underlying Sheet object
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the starting row to clear, indexed at 1
 * @param {number} col the starting column to clear, indexed at 1
 * @param {number} numRows the number of rows to clear
 * @param {number} numCols the number of columns to clear
 * @return {SheetGS} the object for chaining
 */
export declare function clearSheet(obj: SheetGS, row: number, col: number, numRows?: number, numCols?: number): SheetGS;
/**
 * Get list of requested column values in the Sheet matching a particular
 *  column name/value pair; useful in cases where the column name/value
 *  pair applies to a set of data and you want to pull out the entire set
 *  of data from the sheet irrespective of row
 *
 * @param {SheetGS} obj the Sheet object
 * @param {string | Date} matchColumnName the name of the column to match
 * @param {string | Date} matchColumnValue the value of the column to match
 * @param {Array<string | Date>} returnColumnNames the column names to
 *  return in the list
 * @param {boolean} sorted whether or not to return a sorted list
 *
 * @return {Array<Array<string | Date>>} a list of lists: rows, then all of
 *  the requested column values, not indexed by row
 */
export declare function getRecordsMatchingColumnValue(obj: SheetGS, matchColumnName: string | Date, matchColumnValue: string | Date, returnColumnNames: Array<string | Date>, sorted?: boolean): Array<Array<string | Date>>;
/**
 * Get map of requested column values in the Sheet matching a particular
 *  column name/value pair; useful in cases where the column name/value
 *  pair applies to a set of data and you want to pull out the entire set
 *  of data from the sheet irrespective of row
 *
 * @param {SheetGS} obj the Sheet object
 * @param {string | Date} matchColumnName the column name to match
 * @param {string | Date} matchColumnValue the column value to match
 * @param {Array<string | Date>} returnColumnNames the column names to
 *  return in the map
 *
 * @return {MapGS<string | Date, MapGS<string | Date, string | Date>>}
 *  a map of the row names to the column names to the cell values for the
 *  requested columns
 */
export declare function getRecordsMatchingColumnValueAsMap(obj: SheetGS, matchColumnName: string | Date, matchColumnValue: string | Date, returnColumnNames: Array<string | Date>): MapGS<string | Date, MapGS<string | Date, string | Date>>;
/**
 * Skips blank rows at the beginning (or a specified location) in a sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} startRow the first row to look at for a blank row
 * @param {number} col the column to check for blanks
 *
 * @return {number} the first row that isn't blank
 */
export declare function skipBlankRows(obj: SheetGS, startRow?: number, col?: number): number;
/**
 * Deletes a row in a Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row number to delete
 *
 * @return {SheetGS} the object for chaining
 */
export declare function deleteRow(obj: SheetGS, row: number): SheetGS;
/**
 * Deletes a column in a Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} col the column number to delete
 *
 * @return {SheetGS} the object for chaining
 */
export declare function deleteCol(obj: SheetGS, col: number): SheetGS;
/**
 * Inserts a column into the Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} col the column number to insert before
 *
 * @return {SheetGS} the object for chaining
 */
export declare function insertCol(obj: SheetGS, col: number): SheetGS;
/**
 * Finds text in the sheet and returns the Range found for the nth
 *  (default first) instance
 *
 * @param {SheetGS} obj the Sheet object
 * @param {string} findText the text to find
 * @param {number} findNumber the instance to find
 *
 * @return {GoogleAppsScript.Spreadsheet.Range | false} the Range found or
 *  false if the desired text is not found
 */
export declare function getCellFromFind(obj: SheetGS, findText: string, findNumber?: number): GoogleAppsScript.Spreadsheet.Range | false;
/**
 * Finds text in the sheet and returns the row found for the nth
 *  (default first) instance
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} findText the text to find
 * @param {number} findNumber the number of the instance to find
 *
 * @return {number} the row found
 */
export declare function getRowFromFind(obj: SheetGS, findText: string, findNumber?: number): number;
/**
 * Gets the specified row as an array of strings or Dates
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} rowNumber the row number to get
 * @return {Array<string | Date>} the list of values in the row
 */
export declare function getRow(obj: SheetGS, rowNumber: number): Array<string | Date>;
/**
 * Gets the specified row as a map of strings or Dates
 * @param {SheetGS} obj the Sheet object
 * @param {number} rowNumber the row number to get
 * @return {MapGS<string | Date, string | Date>} the map of values for the
 *  row
 */
export declare function getRowAsMap(obj: SheetGS, rowNumber: number): MapGS<string | Date, string | Date>;
/**
 * Finds text in the sheet and returns the column found for the nth
 *  (default first) instance
 *
 * @param {SheetGS} obj the Sheet object
 * @param {string} findText the text to find
 * @param {number} findNumber the number of the instance to find
 *
 * @return {number} the column found
 */
export declare function getColumnFromFind(obj: SheetGS, findText: string, findNumber?: number): number;
/**
 * Gets the last row of the Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @return {number} the row
 */
export declare function getLastRow(obj: SheetGS): number;
/**
 * Gets the last column of the Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @return {number} the column
 */
export declare function getLastColumn(obj: SheetGS): number;
/**
 * Changes the color of a selected cell while an operation is occurring
 *
 * @param {SheetGS} obj the Sheet object
 * @param {boolean} working set true if the operation is occurring, false
 *  when it is done
 * @param {[number, number]} cell the cell reference as an array
 * @param {string} color the color to set the cell
 *
 * @return {SheetGS} the object for chaining
 */
export declare function changeWorkingStatus(obj: SheetGS, working: boolean, cell?: [number, number], color?: string): SheetGS;
/**
 * Sets the background of the given cell to a color
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row of the cell
 * @param {number} col the column of the cell
 * @param {string} color the color to set the background of the cell
 *
 * @return {SheetGS} the object for chaining
 */
export declare function setSheetBackground(obj: SheetGS, row: number, col: number, color: string): SheetGS;
/**
 * Sets the designated value at the specified column if all of the passed
 *  columnsToMatch names and values match for a row
 *
 * @param {string | Date} value the new value at the found location
 * @param {string | Date | number} column the column to place the value
 * @param {Array<{name: string | Date, value: string | Date}>} columnsToMatch the
 *  other columns to match in the row where the new value will go
 * @param {boolean} reset whether or not to reset the data in the object
 * @return {SheetGS | null} object for chaining, or null if could not find
 *  matching columns
 */
export declare function setValueWithMatchingColumns(obj: SheetGS, value: string | Date, column: string | Date | number, columnsToMatch: Array<{
    name: string | Date;
    value: string | Date;
}>, reset?: boolean): SheetGS | null;
/**
 * Sets the designated value at the specified row if all of the passed
 *  rowsToMatch names and values match for a column
 *
 * @param {string | Date} value the new value at the found location
 * @param {string | Date | number} row the row to place the value
 * @param {Array<{name: string | Date, value: string | Date}>} rowsToMatch the
 *  other rows to match in the column where the new value will go
 * @param {boolean} reset whether or not to reset the data in the object
 * @return {SheetGS | null} object for chaining, or null if could not find
 *  matching rows
 */
export declare function setValueWithMatchingRows(obj: SheetGS, value: string | Date, row: string | Date | number, rowsToMatch: Array<{
    name: string | Date;
    value: string | Date;
}>, reset?: boolean): SheetGS | null;
/**
 * Class to access methods and properties of individual
 * Sheets of Google Spreadsheets
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
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheetObject
     * the Google Apps Script Sheet object
     */
    constructor(sheetObject: GoogleAppsScript.Spreadsheet.Sheet);
    /**
     * Resets the data object to sync with changes to the underlying Sheet
     *
     * @return {SheetGS} the object for chaining
     */
    resetData(): SheetGS;
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Spreadsheet.Sheet} the Sheet object
     */
    getObject(): GoogleAppsScript.Spreadsheet.Sheet;
    /**
     * Gets the string value of the cell
     *
     * @param {number} row the row of the value, indexed at 1
     * @param {number} col the column of the value, indexed at 1
     * @return {string} the value requested
     */
    getValue(row: number, col: number): string | Date;
    /**
     * Gets the Date value of the cell
     *
     * @param {number} row the row of the value, indexed at 1
     * @param {number} col the column of the value, indexed at 1
     * @return {Date} the date value requested
     */
    getDateValue(row: number, col: number): Date | null;
    /**
     * Gets the values of the requested cells as an array of arrays
     *
     * @param {number} row the row of the value, indexed at 1
     * @param {number} col the column of the value, indexed at 1
     * @param {number} numRows the number of rows to get
     * @param {number} numCols the number of columns to get
     * @return {Array<Array<string | Date>>} the array of arrays of strings
     *  or Dates
     */
    getValues(row: number, col: number, numRows: number, numCols: number): Array<Array<string | Date>>;
    /**
     * Gets the values of the cells as a Map of rows (as string or Date) to
     *  columns (string or Date) to values (as string or Date)
     *
     * @param {number} row the row of the value, indexed at 1
     * @param {number} col the column of the value, indexed at 1
     * @param {number} numRows the number of rows to get, or -1 for all rows
     * @param {number} numCols the number of columns to get, or -1 for all
     *  columns
     *
     * @return {MapGS<string | Date, MapGS<string | Date, string | Date>>}
     *  a map object of rows with maps of columns
     */
    getValuesAsMap(row: number, col: number, numRows: number, numCols: number): MapGS<string | Date, MapGS<string | Date, string | Date>>;
    /**
     * Gets an entire column from the sheet as an array
     *
     * @param {number} colNumber number of the column
     * @return {Array<string | Date>} the column as an array
     */
    getColumn(colNumber: number): Array<string | Date>;
    /**
     * Gets an entire column from the sheet as a Map of column names to values
     *
     * @param {number} numColumn number of the column
     * @return {MapGS<string | Date, string | Date>}
     *   the row names with column values
     */
    getColumnAsMap(numColumn: number): MapGS<string | Date, string | Date>;
    /**
     * Converts linebreaks in the string to an array
     * @param {number} row the row of the cell to convert
     * @param {number} column the column of the cell to convert
     *
     * @return {string[]} the array of strings
     */
    convertLinebreaksToList(row: number, column: number): string[];
    /**
     * Sets the value of the cell in the sheet according to the row and column
     *  numbers
     *
     * @param {string | Date} value the value to set
     * @param {number} row the row of the cell
     * @param {number} col the column of the cell
     * @param {boolean} reset whether or not to reset the underlying data
     *  object to the actual Sheet data
     *
     * @return {SheetGS} the sheet for chaining
     */
    setValue(value: string | Date, row: number, col: number, reset?: boolean): SheetGS;
    /**
     * Sets the value of a cell in the sheet according to the name of the row
     *  and the name of the column
     *
     * @param {string | Date} value the value to change the cell to
     * @param {string | Date} row the name of the row
     * @param {string | Date} column the name of the column
     * @param {boolean} reset whether or not to reset the underlying data
     *  object to the actual Sheet data
     *
     * @return {SheetGS} the sheet for chaining
     */
    setValueWithLists(value: string | Date, row: string | Date | Array<string | Date>, column: string | Date | Array<string | Date>, reset?: boolean): SheetGS;
    /**
     * Check the row to see if the values are equal
     *
     * @param {Array<string | Date>} rowArray
     * @param {number} rowNumber
     * @return {boolean} whether or not the values are equal
     */
    private _checkRow;
    /**
     * Check the column to see if the values are equal
     *
     * @param {Array<string | Date>} colArray
     * @param {number} colNumber
     * @return {boolean} whether or not the values are equal
     */
    private _checkCol;
    /**
     * Set the values of cells for a range
     *
     * @param {string | Date | Array<string | Date> | Array<Array<string | Date>> | CellRange} firstParam the value, as a string or array;
     *  OR an object containing the following parameters: startRow, startCol,
     *  numRows, numCols, and value
     * @param {number} startRow the beginning row to place this value
     * or set of values, indexed at 1
     * @param {number} startCol the beginning column to place this value
     * or set of values, indexed at 1
     * @param {number} numRows the number of rows to place this value
     * or set of values
     * @param {number} numCols the number of columns to place this value
     * or set of values
     *
     * @return {SheetGS} the object for chaining
     */
    setValues(firstParam: string | Date | Array<string | Date> | Array<Array<string | Date>> | CellRange, startRow?: number, startCol?: number, numRows?: number, numCols?: number): SheetGS;
    /**
     * Checks to see if the values are Dates and if they are equal; if not,
     *  checks to see if their string values are equal
     *
     * @param {Date | string} value the value to check against
     * @param {[number, number]} cell the cell in the Sheet to check
     * @param {string} level the date level to check against
     *
     * @return {boolean} whether or not they are equal
     */
    areSheetValuesEqual(value: Date | string, cell: [number, number], level?: string): boolean;
    /**
     * Checks to see if the values are Dates and if they are equal; if not,
     *  checks to see if their string values are equal
     *
     * @param {Date | string | null} value1 the first value to check against
     * @param {Date | string} value2 the second value to check against
     * @param {string} level the date level to check against
     *
     * @return {boolean} whether or not they are equal
     */
    areValuesEqualAsMap(value1: Date | string | null, value2: Date | string, level?: string): boolean;
    /**
     * Sets the designated value at the specified column if all of the passed
     *  columnsToMatch names and values match for a row
     *
     * @param {string | Date} value the new value at the found location
     * @param {string | Date | number} column the column to place the value
     * @param {Array<{name: string | Date, value: string | Date}>} columnsToMatch the
     *  other columns to match in the row where the new value will go
     * @param {boolean} reset whether or not to reset the data in the object
     * @return {SheetGS | null} object for chaining, or null if could not find
     *  matching columns
     */
    setValueWithMatchingColumns(value: string | Date, column: string | Date | number, columnsToMatch: Array<{
        name: string | Date;
        value: string | Date;
    }>, reset?: boolean): SheetGS | null;
    /**
     * Sets the designated value at the specified row if all of the passed
     *  rowsToMatch names and values match for a column
     *
     * @param {string | Date} value the new value at the found location
     * @param {string | Date | number} row the row to place the value
     * @param {Array<{name: string | Date, value: string | Date}>} rowsToMatch the other
     *  rows to match in the column where the new value will go
     * @param {boolean} reset whether or not to reset the data in the object
     * @return {SheetGS | null} object for chaining, or null if could not find
     *  matching rows
     */
    setValueWithMatchingRows(value: string | Date, row: string | Date | number, rowsToMatch: Array<{
        name: string | Date;
        value: string | Date;
    }>, reset?: boolean): SheetGS | null;
    /**
     * Get the data from the Sheet as an object with rows (or columns) as the
     *  keys and columns (or rows) as the values
     *
     * @param {boolean} rowFirst if true, rows will be the keys and columns will
     *  be in the values along with the value found at that cell
     *
     * @return {MapGS<string | Date, MapGS<string | Date, string | Date>>}
     *  the data object
     */
    getDataAsMap(rowFirst?: boolean): MapGS<string | Date, MapGS<string | Date, string | Date>>;
    /**
     * Clears data from the underlying Sheet object
     *
     * @param {number} row the starting row to clear, indexed at 1
     * @param {number} col the starting column to clear, indexed at 1
     * @param {number} numRows the number of rows to clear
     * @param {number} numCols the number of columns to clear
     * @return {SheetGS} the object for chaining
     */
    clear(row: number, col: number, numRows?: number, numCols?: number): SheetGS;
    /**
     * Get list of requested column values in the Sheet matching a particular
     *  column name/value pair; useful in cases where the column name/value
     *  pair applies to a set of data and you want to pull out the entire set
     *  of data from the sheet irrespective of row
     *
     * @param {string | Date} matchColumnName the name of the column to match
     * @param {string | Date} matchColumnValue the value of the column to match
     * @param {Array<string | Date>} returnColumnNames the column names to
     *  return in the list
     * @param {boolean} sorted whether or not to return a sorted list
     *
     * @return {Array<Array<string | Date>>} a list of lists: rows, then all of
     *  the requested column values, not indexed by row
     */
    getRecordsMatchingColumnValue(matchColumnName: string | Date, matchColumnValue: string | Date, returnColumnNames: Array<string | Date>, sorted?: boolean): Array<Array<string | Date>>;
    /**
     * Get map of requested column values in the Sheet matching a particular
     *  column name/value pair; useful in cases where the column name/value
     *  pair applies to a set of data and you want to pull out the entire set
     *  of data from the sheet irrespective of row
     *
     * @param {string | Date} matchColumnName the column name to match
     * @param {string | Date} matchColumnValue the column value to match
     * @param {Array<string | Date>} returnColumnNames the column names to
     *  return in the map
     *
     * @return {MapGS<string | Date, MapGS<string | Date, string | Date>>}
     *  a map of the row names to the column names to the cell values for the
     *  requested columns
     */
    getRecordsMatchingColumnValueAsMap(matchColumnName: string | Date, matchColumnValue: string | Date, returnColumnNames: Array<string | Date>): MapGS<string | Date, MapGS<string | Date, string | Date>>;
    /**
     * Skips blank rows at the beginning (or a specified location) in a sheet
     *
     * @param {number} startRow the first row to look at for a blank row
     * @param {number} col the column to check for blanks
     *
     * @return {number} the first row that isn't blank
     */
    skipBlankRows(startRow?: number, col?: number): number;
    /**
     * Deletes a row in a Sheet
     *
     * @param {number} row the row number to delete
     *
     * @return {SheetGS} the object for chaining
     */
    deleteRow(row: number): SheetGS;
    /**
     * Deletes a column in a Sheet
     *
     * @param {number} col the column number to delete
     *
     * @return {SheetGS} the object for chaining
     */
    deleteCol(col: number): SheetGS;
    /**
     * Inserts a column into the Sheet
     *
     * @param {number} col the column number to insert before
     *
     * @return {SheetGS} the object for chaining
     */
    insertCol(col: number): SheetGS;
    /**
     * Finds text in the sheet and returns the Range found for the nth
     *  (default first) instance
     *
     * @param {string} findText the text to find
     * @param {number} findNumber the instance to find
     *
     * @return {GoogleAppsScript.Spreadsheet.Range | false} the Range found
     */
    getCellFromFind(findText: string, findNumber?: number): GoogleAppsScript.Spreadsheet.Range | false;
    /**
     * Finds text in the sheet and returns the row found for the nth
     *  (default first) instance
     *
     * @param {number} findText the text to find
     * @param {number} findNumber the number of the instance to find
     *
     * @return {number} the row found, or -1 if not found
     */
    getRowFromFind(findText: string, findNumber?: number): number;
    /**
     * Gets the specified row as an array of strings or Dates
     *
     * @param {number} rowNumber the row number to get, indexed at 1
     * @return {Array<string | Date>} the list of values in the row
     */
    getRow(rowNumber: number): Array<string | Date>;
    /**
     * Gets the specified row as a map of strings or Dates
     * @param {number} rowNumber the row number to get
     * @return {MapGS<string | Date, string | Date>} the map of values for the
     *  row
     */
    getRowAsMap(rowNumber: number): MapGS<string | Date, string | Date>;
    /**
     * Finds text in the sheet and returns the column found for the nth
     *  (default first) instance
     *
     * @param {string} findText the text to find
     * @param {number} findNumber the number of the instance to find
     *
     * @return {number} the column found
     */
    getColumnFromFind(findText: string, findNumber?: number): number;
    /**
     * Gets the last row of the Sheet
     *
     * @return {number} the row
     */
    getLastRow(): number;
    /**
     * Gets the last column of the Sheet
     *
     * @return {number} the column
     */
    getLastColumn(): number;
    /**
     * Changes the color of a selected cell while an operation is occurring
     *
     * @param {boolean} working set true if the operation is occurring, false
     *  when it is done
     * @param {[number, number]} cell the cell reference as an array
     * @param {string} color the color to set the cell
     *
     * @return {SheetGS} the object for chaining
     */
    changeWorkingStatus(working: boolean, cell?: [number, number], color?: string): SheetGS;
    /**
     * Sets the background of the given cell to a color
     *
     * @param {number} row the row of the cell
     * @param {number} col the column of the cell
     * @param {string} color the color to set the background of the cell
     *
     * @return {SheetGS} the object for chaining
     */
    setBackground(row: number, col: number, color: string): SheetGS;
}
