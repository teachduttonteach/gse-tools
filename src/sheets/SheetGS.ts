import { MapGS } from '../map/MapGS';
import { areDatesEqual } from '../utils/Utilities';
import { CellRange } from './CellRange';

/**
 * Class to access methods and properties of individual
 * Sheets of Google Spreadsheets
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheetObject
 * the Google Apps Script Sheet object
 * @return {SheetGS} the Sheet object
 */
export function newSheet(sheetObject: GoogleAppsScript.Spreadsheet.Sheet): SheetGS {
  return new SheetGS(sheetObject);
}

/**
 * Resets the data object to sync with changes to the underlying Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @return {SheetGS} the object for chaining
 */
export function resetSheetData(obj: SheetGS): SheetGS {
  return obj.resetData();
}

/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SheetGS} obj the Sheet object
 * @return {GoogleAppsScript.Spreadsheet.Sheet} the Sheet object
 */
export function getSheetObject(obj: SheetGS): GoogleAppsScript.Spreadsheet.Sheet {
  return obj.getObject();
}

/**
 * Gets the string value of the cell
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row of the value, indexed at 1
 * @param {number} col the column of the value, indexed at 1
 * @return {string | Date} the value requested
 */
export function getSheetValue(obj: SheetGS, row: number, col: number): 
  string | Date {
  return obj.getValue(row, col);
}

/**
 * Gets the Date value of the cell
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row of the value, indexed at 1
 * @param {number} col the column of the value, indexed at 1
 * @return {Date} the date value requested
 */
export function getSheetDateValue(obj: SheetGS, row: number, col: number): 
  Date | null {
  return obj.getDateValue(row, col);
}

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
export function getSheetValues(
  obj: SheetGS,
  row: number,
  col: number,
  numRows: number,
  numCols: number,
): Array<Array<string | Date>> {
  return obj.getValues(row, col, numRows, numCols);
}

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
export function getSheetValuesAsMap(
  obj: SheetGS,
  row: number,
  col: number,
  numRows: number,
  numCols: number,
): MapGS<string | Date, MapGS<string | Date, string | Date>> {
  return obj.getValuesAsMap(row, col, numRows, numCols);
}

/**
 * Gets an entire column from the sheet as an array
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} numColumn number of the column
 * @return {Array<string | Date>} the column as an array
 */
export function getSheetColumn(obj: SheetGS, numColumn: number): Array<string | Date> {
  return obj.getColumn(numColumn);
}

/**
 * Gets an entire column from the sheet as a Map of column names to values
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} numColumn number of the column
 * @return {MapGS<string | Date, string | Date>}
 *   the row names with column values
 */
export function getSheetColumnAsMap(obj: SheetGS, numColumn: number): MapGS<string | Date, string | Date> {
  return obj.getColumnAsMap(numColumn);
}

/**
 * Converts linebreaks in the string to an array
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row of the cell to convert
 * @param {number} column the column of the cell to convert
 *
 * @return {string[]} the array of strings
 */
export function convertSheetLinebreaksToList(obj: SheetGS, row: number, column: number): string[] {
  return obj.convertLinebreaksToList(row, column);
}

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
export function setSheetValue(
  obj: SheetGS,
  value: string | Date,
  row: number,
  col: number,
  reset: boolean = true,
): SheetGS {
  return obj.setValue(value, row, col, reset);
}

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
export function setSheetValueAsMap(
  obj: SheetGS,
  value: string | Date,
  row: string | Date,
  column: string | Date,
  reset: boolean = true,
): SheetGS {
  return obj.setValueWithLists(value, row, column, reset);
}

/**
 * Set the values of cells for a range
 *
 * @param {SheetGS} obj the Sheet object
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
export function setSheetValues(
  obj: SheetGS,
  firstParam: string | Date | Array<string | Date> | Array<Array<string | Date>> | CellRange,
  startRow: number = 1,
  startCol: number = 1,
  numRows: number = 1,
  numCols: number = 1,
): SheetGS {
  return obj.setValues(firstParam, startRow, startCol, numRows, numCols);
}

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
export function areSheetValuesEqual(
  obj: SheetGS,
  value: Date | string,
  cell: [number, number],
  level: string = 'YEAR',
): boolean {
  return obj.areSheetValuesEqual(value, cell, level);
}

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
export function areSheetValuesEqualAsMap(
  obj: SheetGS,
  value1: Date | string | null,
  value2: Date | string,
  level: string = 'YEAR',
): boolean {
  return obj.areValuesEqualAsMap(value1, value2, level);
}

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
export function getSheetDataAsMap(
  obj: SheetGS,
  rowFirst: boolean = true,
): MapGS<string | Date, MapGS<string | Date, string | Date>> {
  return obj.getDataAsMap(rowFirst);
}

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
export function clearSheet(obj: SheetGS, row: number, col: number, numRows: number = 1, numCols: number = 1): SheetGS {
  return obj.clear(row, col, numRows, numCols);
}

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
 * @return {Array<Array<string | Date} a list of lists: rows, then all of
 *  the requested column values, not indexed by row
 */
export function getRecordsMatchingColumnValue(
  obj: SheetGS,
  matchColumnName: string | Date,
  matchColumnValue: string | Date,
  returnColumnNames: Array<string | Date>,
  sorted: boolean = false,
): Array<Array<string | Date>> {
  return obj.getRecordsMatchingColumnValue(matchColumnName, matchColumnValue, returnColumnNames, sorted);
}

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
export function getRecordsMatchingColumnValueAsMap(
  obj: SheetGS,
  matchColumnName: string | Date,
  matchColumnValue: string | Date,
  returnColumnNames: Array<string | Date>,
): MapGS<string | Date, MapGS<string | Date, string | Date>> {
  return obj.getRecordsMatchingColumnValueAsMap(matchColumnName, matchColumnValue, returnColumnNames);
}

/**
 * Skips blank rows at the beginning (or a specified location) in a sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} startRow the first row to look at for a blank row
 * @param {number} col the column to check for blanks
 *
 * @return {number} the first row that isn't blank
 */
export function skipBlankRows(obj: SheetGS, startRow: number = 1, col: number = 1): number {
  return obj.skipBlankRows(startRow, col);
}

/**
 * Deletes a row in a Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} row the row number to delete
 *
 * @return {SheetGS} the object for chaining
 */
export function deleteRow(obj: SheetGS, row: number): SheetGS {
  return obj.deleteRow(row);
}

/**
 * Deletes a column in a Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} col the column number to delete
 *
 * @return {SheetGS} the object for chaining
 */
export function deleteCol(obj: SheetGS, col: number): SheetGS {
  return obj.deleteCol(col);
}

/**
 * Inserts a column into the Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} col the column number to insert before
 *
 * @return {SheetGS} the object for chaining
 */
export function insertCol(obj: SheetGS, col: number): SheetGS {
  return obj.insertCol(col);
}

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
export function getCellFromFind(
  obj: SheetGS,
  findText: string,
  findNumber: number = 1,
): GoogleAppsScript.Spreadsheet.Range | false {
  return obj.getCellFromFind(findText, findNumber);
}

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
export function getRowFromFind(obj: SheetGS, findText: string, findNumber: number = 1): number {
  return obj.getRowFromFind(findText, findNumber);
}

/**
 * Gets the specified row as an array of strings or Dates
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} rowNumber the row number to get
 * @return {Array<string | Date>} the list of values in the row
 */
export function getRow(obj: SheetGS, rowNumber: number): Array<string | Date> {
  return obj.getRow(rowNumber);
}

/**
 * Gets the specified row as a map of strings or Dates
 * @param {SheetGS} obj the Sheet object
 * @param {number} rowNumber the row number to get
 * @return {MapGS<string | Date, string | Date>} the map of values for the
 *  row
 */
export function getRowAsMap(obj: SheetGS, rowNumber: number): MapGS<string | Date, string | Date> {
  return obj.getRowAsMap(rowNumber);
}

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
export function getColumnFromFind(obj: SheetGS, findText: string, findNumber: number = 1): number {
  return obj.getColumnFromFind(findText, findNumber);
}

/**
 * Gets the last row of the Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @return {number} the row
 */
export function getLastRow(obj: SheetGS): number {
  return obj.getLastRow();
}

/**
 * Gets the last column of the Sheet
 *
 * @param {SheetGS} obj the Sheet object
 * @return {number} the column
 */
export function getLastColumn(obj: SheetGS): number {
  return obj.getLastColumn();
}

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
export function changeWorkingStatus(
  obj: SheetGS,
  working: boolean,
  cell: [number, number] = [1, 1],
  color: string = '#DD0000',
): SheetGS {
  return obj.changeWorkingStatus(working, cell, color);
}

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
export function setSheetBackground(obj: SheetGS, row: number, col: number, color: string): SheetGS {
  return obj.setBackground(row, col, color);
}

/**
 * Sets the designated value at the specified column if all of the passed
 *  columnsToMatch names and values match for a row
 * 
 * @param {string | Date} value the new value at the found location
 * @param {string | Date | number} column the column to place the value
 * @param {Array<{name: string | Date, value: string | Date}>} columnsToMatch 
 *  the other columns to match in the row where the new value will go 
 * @param {boolean} reset whether or not to reset the data in the object
 * @return {SheetGS | null} object for chaining, or null if could not find 
 *  matching columns 
 */
export function setValueWithMatchingColumns(
  obj: SheetGS,
  value: string | Date,
  column: string | Date | number,
  columnsToMatch: Array<{name: string | Date, value: string | Date}>,
  reset: boolean = true
): SheetGS | null {
  return obj.setValueWithMatchingColumns(value, column, columnsToMatch, reset);
}

/**
 * Sets the designated value at the specified row if all of the passed
 *  rowsToMatch names and values match for a column
 * 
 * @param {string | Date} value the new value at the found location
 * @param {string | Date | number} row the row to place the value
 * @param {Array<{name: string | Date, value: string | Date}>} rowsToMatch 
 *  the other rows to match in the column where the new value will go 
 * @param {boolean} reset whether or not to reset the data in the object
 * @return {SheetGS | null} object for chaining, or null if could not find 
 *  matching rows 
 */
export function setValueWithMatchingRows(
  obj: SheetGS,
  value: string | Date,
  row: string | Date | number,
  rowsToMatch: Array<{name: string | Date, value: string | Date}>,
  reset: boolean = true
): SheetGS | null {
  return obj.setValueWithMatchingRows(value, row, rowsToMatch, reset);
}

/**
 * Class to access methods and properties of individual
 * Sheets of Google Spreadsheets
 */
export class SheetGS {
  private _sheet: GoogleAppsScript.Spreadsheet.Sheet;
  private _data: Array<Array<string | Date>>;
  private _textFinder: MapGS<string, GoogleAppsScript.Spreadsheet.TextFinder>;
  private _lastRow: number;
  private _lastCol: number;
  private _mapData: MapGS<string | Date, MapGS<string | Date, string | Date>>;

  /**
   * Builds the SheetGS object
   *
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheetObject
   * the Google Apps Script Sheet object
   */
  constructor(sheetObject: GoogleAppsScript.Spreadsheet.Sheet) {
    this._sheet = sheetObject;
    this._lastRow = this._sheet.getLastRow();
    this._lastCol = this._sheet.getLastColumn();
    this._data =
      this._lastRow && this._lastCol ? this._sheet.getRange(1, 1, this._lastRow, this._lastCol).getValues() : [];
    for (let r = 0; r < this._data.length; r++) {
      for (let c = 0; c < this._data[r].length; c++) {
        if ( Object.prototype.toString.call(this._data[r][c]) === "[object Date]" ) {
          this._data[r][c] = new Date(this._data[r][c]);
        }
      }
    }
    this._textFinder = new MapGS();
  }

  /**
   * Resets the data object to sync with changes to the underlying Sheet
   *
   * @return {SheetGS} the object for chaining
   */
  resetData(): SheetGS {
    this._lastRow = this._sheet.getLastRow();
    this._lastCol = this._sheet.getLastColumn();
    this._data = this._sheet.getRange(1, 1, this._lastRow, this._lastCol).getValues();
    this._textFinder = new MapGS();
    return this;
  }

  /**
   * Gets the underlying Google Apps Script object for direct access
   *
   * @return {GoogleAppsScript.Spreadsheet.Sheet} the Sheet object
   */
  getObject(): GoogleAppsScript.Spreadsheet.Sheet {
    return this._sheet;
  }

  /**
   * Gets the string value of the cell
   *
   * @param {number} row the row of the value, indexed at 1
   * @param {number} col the column of the value, indexed at 1
   * @return {string} the value requested
   */
  getValue(row: number, col: number): string | Date {
    if ((typeof row !== "number") || (typeof col !== "number")) throw new
      Error("Row and column values (" + row + ", " + col + ") must be " +
      "numbers in SheetGS.getValue()");

    if ((row < 1) || (col < 1)) throw new Error("Row and column numbers (" +
      row + "," + col + ") must be greater than 0 in SheetGS.getValue()");

    return this._data[row - 1][col - 1];
  }

  /**
   * Gets the Date value of the cell
   *
   * @param {number} row the row of the value, indexed at 1
   * @param {number} col the column of the value, indexed at 1
   * @return {Date} the date value requested
   */
  getDateValue(row: number, col: number): Date | null {
    Logger.log("Getting date value from " + row + " and " + col + " = " + this._data[row - 1][col - 1]);
    const dateValue = this._data[row - 1][col - 1];
    if (dateValue instanceof Date) return dateValue;
    return null;
  }

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
  getValues(row: number, col: number, numRows: number, numCols: number): Array<Array<string | Date>> {
    const returnValue: Array<Array<string | Date>> = [];

    if ((typeof row !== "number") || (typeof col !== "number") || 
      (typeof numRows !== "number") || (typeof numCols !== "number")) {
      throw new Error(
        'Row, column, number of rows and columns (' + 
          [row, col, numRows, numCols].join(',') + ') must all be numbers ' + 
          'in SheetGS.getValues()',
      );
    }

    if (row < 1 || col < 1 || numRows < 1 || numCols < 1) {
      throw new Error(
        'Row, column, number of rows and columns (' + 
          [row, col, numRows, numCols].join(',') + ') must all be greater ' + 
          'than or equal to 1 in SheetGS.getValues()',
      );
    }

    for (let r = row; r < row + numRows; r++) {
      const columnsValues: Array<string | Date> = [];
      for (let c = col; c < col + numCols; c++) {
        let thisValue = this._data[r - 1][c - 1];
        if (thisValue === undefined) throw new Error("Could not find value" +
          " at (" + [r - 1, c - 1].join(",") + ") in SheetGS.getValues()"); 
        columnsValues.push(thisValue);
      }
      returnValue.push(columnsValues);
    }
    return returnValue;
  }

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
  getValuesAsMap(
    row: number,
    col: number,
    numRows: number,
    numCols: number,
  ): MapGS<string | Date, MapGS<string | Date, string | Date>> {
    const _return: MapGS<string | Date, MapGS<string | Date, string | Date>> = new MapGS();

    if (numRows == -1) numRows = this._lastRow - row;
    if (numCols == -1) numCols = this._lastCol - col;

    if (row < 1 || col < 1 || numRows < 1 || numCols < 1) {
      throw new Error(
        'Row, column, number of rows and columns must all be greater ' + 
        'than or equal to 1 in SheetGS.getMapValues()',
      );
    }
    if (((row + numRows) > this._lastRow) || ((col + numCols) > this._lastCol)) {
      throw new Error('Rows and columns requested must not exceed size ' +
        'of sheet in SheetGS.getValuesAsMap()');
    }

    for (let r = row; r < row + numRows; r++) {
      const _columns: MapGS<string | Date, string | Date> = new MapGS();
      for (let c = col; c < col + numCols; c++) {
        _columns.set(this._data[0][c - 1], this._data[r - 1][c - 1]);
      }
      _return.set(this._data[r - 1][0], _columns);
    }
    return _return;
  }

  /**
   * Gets an entire column from the sheet as an array
   *
   * @param {number} colNumber number of the column
   * @return {Array<string | Date>} the column as an array
   */
  getColumn(colNumber: number): Array<string | Date> {
    if (typeof colNumber !== "number") throw new Error("Column '" + colNumber + 
      "' must be a number in SheetGS.getColumn()");

    if (colNumber < 1) throw new Error("Column '" + colNumber + "' must be " + 
      "greater than 0 in SheetGS.getColumn()");

    const returnArray: Array<string | Date> = [];
    for (const row of this._data) {
      returnArray.push(row[colNumber - 1]);
    }
    return returnArray;
  }

  /**
   * Gets an entire column from the sheet as a Map of column names to values
   *
   * @param {number} numColumn number of the column
   * @return {MapGS<string | Date, string | Date>}
   *   the row names with column values
   */
  getColumnAsMap(numColumn: number): MapGS<string | Date, string | Date> {
    if (typeof numColumn !== "number") throw new Error('Column number must be ' +
      'a number in SheetGS.getColumnAsMap()');
    if (numColumn < 1) throw new Error('Column number must be greater than ' +
      '0 in SheetGS.getColumnAsMap()');
    const returnArray: MapGS<string | Date, string | Date> = new MapGS();
    for (const r of this._data) {
      returnArray.set(r[0], r[numColumn - 1]);
    }
    return returnArray;
  }

  /**
   * Converts linebreaks in the string to an array
   * @param {number} row the row of the cell to convert
   * @param {number} column the column of the cell to convert
   *
   * @return {string[]} the array of strings
   */
  convertLinebreaksToList(row: number, column: number): string[] {
    const thisValue = this.getValue(row, column);
    if (typeof thisValue === "string") return thisValue.split('\n');
    return [];
  }

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
  setValue(value: string | Date, row: number, col: number, reset: boolean = true): SheetGS {
    if (row < 1 || col < 1) {
      throw new Error('Row and column numbers need to be greater than 0 in ' + 'SheetGS.setValue()');
    }
    this._sheet.getRange(row, col).setValue(value);
    if (reset) this.resetData();
    return this;
  }

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
  setValueWithLists(value: string | Date, 
    row: string | Date | Array<string | Date>, 
    column: string | Date | Array<string | Date>, 
    reset: boolean = true): SheetGS {
    if ((value === undefined) || (row === undefined) || 
      (column === undefined)) throw new Error("Value, row name, and column " +
      "name must all be defined in SheetGS.setValueAsMap()");
    for (let r: number = 2; r <= this._lastRow; r++) {

      if (row instanceof Date) {
        Logger.log("found date for " + row);
        Logger.log("checking dates for " + this.getDateValue(r, 1));
      } 
      if (((row instanceof Array) && (this._checkRow(row, r))) ||
        ((row instanceof Date) && areDatesEqual(this.getDateValue(r, 1), row)) || 
        (this.getValue(r, 1) == row)) {

        for (let c: number = 2; c <= this._lastCol; c++) {

          Logger.log("Checking " + column + " against " + this.getValue(1, c));

          if (((column instanceof Array) && (this._checkCol(column, c))) ||
            ((column instanceof Date) && areDatesEqual(this.getDateValue(1, c), column)) ||
            (this.getValue(1, c) == column)) {

              Logger.log("Found column");
            this.setValue(value, r, c, reset);
          }
        }
      }
    }
    return this;
  }

  private _checkRow(rowArray: Array<string | Date>, rowNumber: number): 
    boolean {
    for (let i = 1; i <= rowArray.length; i++) {
      if (rowArray[i - 1] instanceof Date) {
        if (!areDatesEqual(this.getDateValue(rowNumber, i), rowArray[i - 1])) {
          return false;
        }
      } else if (rowArray[i - 1] != this._data[rowNumber - 1][i - 1]) {
        return false;
      }
    }
    return true;
  }

  private _checkCol(colArray: Array<string | Date>, colNumber: number): 
    boolean {
    for (let i = 1; i <= colArray.length; i++) {
      if (colArray[i - 1] instanceof Date) {
        if (!areDatesEqual(this.getDateValue(i, colNumber), colArray[i - 1])) {
          return false;
        }
      } else if (colArray[i - 1] != this._data[i - 1][colNumber - 1]) {
        return false;
      }
    }
    return true;
  }

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
  setValues(
    firstParam: string | Date | Array<string | Date> | Array<Array<string | Date>> | CellRange,
    startRow: number = 1,
    startCol: number = 1,
    numRows: number = 1,
    numCols: number = 1,
  ): SheetGS {
    let value: string | Date | Array<string | Date> | Array<Array<string | Date>>;
    if (typeof firstParam === 'object' && !(firstParam instanceof Array) && !(firstParam instanceof Date)) {
      startRow = firstParam.startRow;
      startCol = firstParam.startCol;
      numRows = firstParam.numRows == null ? 1 : firstParam.numRows;
      numCols = firstParam.numCols == null ? 1 : firstParam.numCols;
      value = firstParam.value;
    } else {
      value = firstParam;
    }

    if (startRow < 1 || startCol < 1) {
      throw new Error(
        'The start row (' +
          startRow +
          ') and start column (' +
          startCol +
          ') must be greater or equal to one in SheetGS.setValues',
      );
    }

    if (numRows < 1 || numCols < 1) {
      throw new Error(
        'The number of rows (' + numRows + ') and columns (' + numCols + ') must be greater or equal to one',
      );
    }

    for (let i = startRow; i < startRow + numRows; i++) {
      for (let j = startCol; j < startCol + numCols; j++) {
        if (value instanceof Array) {
          const currentValue = value[i - 1];
          if (currentValue instanceof Array) {
            this.setValue(currentValue[j - 1], i, j, false);
          } else this.setValue(currentValue, i, j, false);
        } else this.setValue(value, i, j, false);
      }
    }
    return this.resetData();
  }

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
  areSheetValuesEqual(value: Date | string, cell: [number, number], level: string = 'YEAR'): boolean {
    if (
      (value instanceof Date && areDatesEqual(value, this.getDateValue(cell[0], cell[1]), level)) ||
      value == this.getValue(cell[0], cell[1])
    )
      return true;
    return false;
  }

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
  areValuesEqualAsMap(value1: Date | string | null, value2: Date | string, 
    level: string = 'YEAR'): boolean {
    
    if (value1 == null) {
      throw new Error('Could not find map value in SheetGS.areMapValuesEqual()');
    }

    if ((value1 instanceof Date && areDatesEqual(value1, value2, level)) || 
      (value1 == value2)) return true;
    return false;
  }


  /**
   * Sets the designated value at the specified column if all of the passed
   *  columnsToMatch names and values match for a row
   * 
   * @param {string | Date} value the new value at the found location
   * @param {string | Date | number} column the column to place the value
   * @param {Array<{name: string | Date, value: string | Date}>} columnsToMatch 
   *  the other columns to match in the row where the new value will go 
   * @param {boolean} reset whether or not to reset the data in the object
   * @return {SheetGS | null} object for chaining, or null if could not find 
   *  matching columns 
   */
  setValueWithMatchingColumns(
    value: string | Date,
    column: string | Date | number,
    columnsToMatch: Array<{name: string | Date, value: string | Date}>,
    reset: boolean = true
  ): SheetGS | null {
    if (typeof column == "number") column = this._data[0][column - 1];

    let dataMap = this.getDataAsMap(true);
    for (let r of dataMap.keys()) {
      const thisRow = dataMap.get(r);
      if (thisRow != null) {
        let matchedAllColumns = true;
        for (let c of columnsToMatch) {
          if (!this.areValuesEqualAsMap(thisRow.get(c.name), c.value)) {
            matchedAllColumns = false;
            break;
          }
        }
        if (matchedAllColumns) {
          const rowNum = dataMap.getNum(r);
          const colNum = thisRow.getNum(column);
          if ((rowNum != null) && (colNum != null)) {
            return this.setValue(value, rowNum + 2, colNum + 1, reset);
          }
        }
      }
    }
    return null;
  }
  
  /**
   * Sets the designated value at the specified row if all of the passed
   *  rowsToMatch names and values match for a column
   * 
   * @param {string | Date} value the new value at the found location
   * @param {string | Date | number} row the row to place the value
   * @param {Array<{name: string | Date, value: string | Date}>} rowsToMatch 
   *  the other rows to match in the column where the new value will go 
   * @param {boolean} reset whether or not to reset the data in the object
   * @return {SheetGS | null} object for chaining, or null if could not find 
   *  matching rows 
   */
  setValueWithMatchingRows(
    value: string | Date,
    row: string | Date | number,
    rowsToMatch: Array<{name: string | Date, value: string | Date}>,
    reset: boolean = true
  ): SheetGS | null {
    if (typeof row == "number") row = this._data[row - 1][0];

    let dataMap = this.getDataAsMap(false);
    for (let c of dataMap.keys()) {
      const thisColumn = dataMap.get(c);
      if (thisColumn != null) {
        let matchedAllRows = true;
        for (let r of rowsToMatch) {
          Logger.log(r.name);
          if (!this.areValuesEqualAsMap(thisColumn.get(r.name), r.value)) {
            matchedAllRows = false;
            break;
          }
        }
        if (matchedAllRows) {
          const colNum = dataMap.getNum(c);
          const rowNum = thisColumn.getNum(row);
          if ((rowNum != null) && (colNum != null)) {
            return this.setValue(value, rowNum + 1, colNum + 2, reset);
          }
        }
      }
    }
    return null;
  }
  
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
  getDataAsMap(rowFirst: boolean = true): MapGS<string | Date, MapGS<string | Date, string | Date>> {
    if (this._mapData != undefined) return this._mapData;
    const data: MapGS<string | Date, MapGS<string | Date, string | Date>> = new MapGS();

    if (rowFirst) {
      for (let r: number = 2; r <= this._lastRow; r++) {
        const rowData: MapGS<string | Date, string | Date> = new MapGS();
        for (let c: number = 1; c <= this._lastCol; c++) {
          rowData.set(this.getValue(1, c), this.getValue(r, c));
        }
        data.set(this.getValue(r, 1), rowData);
      }
    } else {
      for (let c: number = 2; c <= this._lastCol; c++) {
        const columnData: MapGS<string | Date, string | Date> = new MapGS();
        for (let r: number = 1; r <= this._lastRow; r++) {
          columnData.set(this.getValue(r, 1), this.getValue(r, c));
        }
        data.set(this.getValue(1, c), columnData);
      }
    }
    return data;
  }

  /**
   * Clears data from the underlying Sheet object
   *
   * @param {number} row the starting row to clear, indexed at 1
   * @param {number} col the starting column to clear, indexed at 1
   * @param {number} numRows the number of rows to clear
   * @param {number} numCols the number of columns to clear
   * @return {SheetGS} the object for chaining
   */
  clear(row: number, col: number, numRows: number = 1, numCols: number = 1): SheetGS {
    if (row < 1 || col < 1) {
      throw new Error('Row and column must be greater than or equal to 1 in ' + 'SheetGS.clear()');
    }

    if (numRows < 1 || numCols < 1) {
      throw new Error('Number of rows and columns must be greater than or equal to 1' + ' in SheetGS.clear()');
    }

    this.getObject()
      .getRange(row, col, numRows, numCols)
      .clearContent();
    return this;
  }

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
   * @return {Array<Array<string | Date} a list of lists: rows, then all of
   *  the requested column values, not indexed by row
   */
  getRecordsMatchingColumnValue(
    matchColumnName: string | Date,
    matchColumnValue: string | Date,
    returnColumnNames: Array<string | Date>,
    sorted: boolean = false,
  ): Array<Array<string | Date>> {
    const data = this.getDataAsMap();
    const records: Array<Array<string | Date>> = [];

    // Loop through all of the keys (rows) in the Sheet
    for (const recordKey of data.keys(true)) {
      const recordKeyList = data.getAll(recordKey);
      if (recordKeyList != null) {
        // Loop through all of the rows
        for (const recordKeyMember of recordKeyList) {
          // Find the rows that have the correct value
          const mapValue = recordKeyMember.get(matchColumnName);
          if (mapValue == null) 
            throw new Error("Could not find column name '" + 
              matchColumnName + "' to match value '" + matchColumnValue + "'");
          if (this.areValuesEqualAsMap(mapValue, matchColumnValue)) {
            // Create an array to hold the matching column values
            const columnRecordsToPush: Array<string | Date> = [];

            // Loop through all of the columns
            for (const returnColumn of returnColumnNames) {
              // Get the column value, make sure it exists and add it to the
              //  array
              const returnColumnValue = recordKeyMember.get(returnColumn);
              if (returnColumnValue != null) {
                columnRecordsToPush.push(returnColumnValue);
              }
            }

            // Add the column values to the list to send back
            records.push(columnRecordsToPush);
          }
        }
      }
    }
    if (sorted) return records.sort();
    return records;
  }

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
  getRecordsMatchingColumnValueAsMap(
    matchColumnName: string | Date,
    matchColumnValue: string | Date,
    returnColumnNames: Array<string | Date>,
  ): MapGS<string | Date, MapGS<string | Date, string | Date>> {
    const data = this.getDataAsMap();
    const records: MapGS<string | Date, MapGS<string | Date, string | Date>> = new MapGS();

    for (const record of data.keys()) {
      const recordKeyList = data.getAll(record);
      if (recordKeyList != null) {
        for (const recordKeyMember of recordKeyList) {
          if (this.areValuesEqualAsMap(recordKeyMember.get(matchColumnName), matchColumnValue)) {
            const columnRecordsToPush: MapGS<string | Date, string | Date> = new MapGS();

            for (const returnColumn of returnColumnNames) {
              const returnColumnValue = recordKeyMember.get(returnColumn);
              if (returnColumnValue != null) {
                columnRecordsToPush.set(returnColumn, returnColumnValue);
              }
            }
            records.set(record, columnRecordsToPush);
          }
        }
      }
    }
    return records;
  }

  /**
   * Skips blank rows at the beginning (or a specified location) in a sheet
   *
   * @param {number} startRow the first row to look at for a blank row
   * @param {number} col the column to check for blanks
   *
   * @return {number} the first row that isn't blank
   */
  skipBlankRows(startRow: number = 1, col: number = 1): number {
    if (col < 1) {
      throw new Error('Column (' + col + ') must be greater or equal to 1 ' + 'in skipBlankRows');
    }
    if (startRow < 1) {
      throw new Error('Start row (' + startRow + ') must be greater or ' + 'equal to 1 in skipBlankRows');
    }
    while (startRow < this._lastRow && this.getValue(startRow, col) == '') {
      startRow++;
    }
    return startRow;
  }

  /**
   * Deletes a row in a Sheet
   *
   * @param {number} row the row number to delete
   *
   * @return {SheetGS} the object for chaining
   */
  deleteRow(row: number): SheetGS {
    if (row < 1 || row > this._lastRow) {
      throw new Error(
        'The specified row (' +
          row +
          ') must be greater ' +
          ' than or equal to 1 and less than or equal to the last row in ' +
          'SheetGS.deleteRow()',
      );
    }
    this._sheet.deleteRow(row);
    return this.resetData();
  }

  /**
   * Deletes a column in a Sheet
   *
   * @param {number} col the column number to delete
   *
   * @return {SheetGS} the object for chaining
   */
  deleteCol(col: number): SheetGS {
    if (col < 1 || col > this._lastCol) {
      throw new Error(
        'The specified column (' +
          col +
          ') must be greater ' +
          'than or equal to 1 and less than or equal to the last column in ' +
          'SheetGS.deleteCol()',
      );
    }
    this._sheet.deleteColumn(col);
    return this.resetData();
  }

  /**
   * Inserts a column into the Sheet
   *
   * @param {number} col the column number to insert before
   *
   * @return {SheetGS} the object for chaining
   */
  insertCol(col: number): SheetGS {
    if (col < 1) {
      throw new Error('The specified column (' + col + ') must be greater' + ' than or equal to 1');
    }
    this._sheet.insertColumns(col);
    return this.resetData();
  }

  /**
   * Finds text in the sheet and returns the Range found for the nth
   *  (default first) instance
   *
   * @param {string} findText the text to find
   * @param {number} findNumber the instance to find
   *
   * @return {GoogleAppsScript.Spreadsheet.Range | false} the Range found
   */
  getCellFromFind(findText: string, findNumber: number = 1): 
    GoogleAppsScript.Spreadsheet.Range | false {
    if (findText == '') {
      throw new Error('Text must be defined in SheetGS.getRowFromFind()');
    }

    // Make a new TextFinder object if one doesn't already exist for finding
    //  this text
    if (this._textFinder.get(findText) == undefined) {
      this._textFinder.set(findText, this._sheet.createTextFinder(findText));
    }

    // Get the TextFinder object or say that it can't be found
    const currentTextFinder = this._textFinder.get(findText);
    if (currentTextFinder == undefined) {
      throw new Error('Could not create textFinder in SheetGS.getCellFromFind()');
    }

    // If we're looking for greater than the 1st instance of the text, look
    //  for it that many times decrementing the findNumber each time
    while (findNumber > 1) {
      if (currentTextFinder.findNext() == null) {
        throw new Error('Could not find ' + findText + ', ' + findNumber + ' times ' + 'in SheetGS.getCellFromFind()');
      }
      findNumber--;
    }

    // Find the instance we want to return
    const currentRange = currentTextFinder.findNext();
    if (currentRange == null) {
      Logger.log('WARNING: Could not find instance of ' + findText + 
        ' in SheetGS.getCellFromFind()');
      return false;
    }
    return currentRange;
  }

  /**
   * Finds text in the sheet and returns the row found for the nth
   *  (default first) instance
   *
   * @param {number} findText the text to find
   * @param {number} findNumber the number of the instance to find
   *
   * @return {number} the row found, or -1 if not found
   */
  getRowFromFind(findText: string, findNumber: number = 1): number {
    if (findText == '') {
      throw new Error('Text must be defined in SheetGS.getRowFromFind()');
    }
    const thisRange = this.getCellFromFind(findText, findNumber);
    if (!thisRange) return -1;
    return thisRange.getRow();
  }

  /**
   * Gets the specified row as an array of strings or Dates
   *
   * @param {number} rowNumber the row number to get
   * @return {Array<string | Date>} the list of values in the row
   */
  getRow(rowNumber: number): Array<string | Date> {
    if (typeof rowNumber !== "number") throw new Error("Row '" + rowNumber + 
      "' must be a number in SheetGS.getRow()");

    if (rowNumber < 1) throw new Error("Row '" + rowNumber + "' must be " + 
      "greater than 0 in SheetGS.getRow()");

    let thisRow = this._data[rowNumber];
    if (thisRow === undefined) throw new Error("Row '" + rowNumber + 
      "' undefined in SheetGS.getRow()");

    return thisRow;
  }

  /**
   * Gets the specified row as a map of strings or Dates
   * @param {number} rowNumber the row number to get
   * @return {MapGS<string | Date, string | Date>} the map of values for the
   *  row
   */
  getRowAsMap(rowNumber: number): MapGS<string | Date, string | Date> {
    if (typeof rowNumber !== "number") throw new Error('Row number must be ' +
      'a number in SheetGS.getRowAsMap()');
    if (rowNumber < 1) throw new Error('Row number must be greater than ' +
      '0 in SheetGS.getRowAsMap()');
    const returnValue: MapGS<string | Date, string | Date> = new MapGS();
    for (let c = 0; c < this.getLastColumn(); c++) {
      returnValue.set(this._data[0][c], this._data[rowNumber][c]);
    }
    return returnValue;
  }

  /**
   * Finds text in the sheet and returns the column found for the nth
   *  (default first) instance
   *
   * @param {string} findText the text to find
   * @param {number} findNumber the number of the instance to find
   *
   * @return {number} the column found
   */
  getColumnFromFind(findText: string, findNumber: number = 1): number {
    if (findText == '') {
      throw new Error('Text to find must be defined in SheetGS.getColumnFromFind()');
    }
    const thisRange = this.getCellFromFind(findText, findNumber);
    if (!thisRange) return -1;
    return thisRange.getColumn();
  }

  /**
   * Gets the last row of the Sheet
   *
   * @return {number} the row
   */
  getLastRow(): number {
    return this._lastRow;
  }

  /**
   * Gets the last column of the Sheet
   *
   * @return {number} the column
   */
  getLastColumn(): number {
    return this._lastCol;
  }

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
  changeWorkingStatus(working: boolean, cell: [number, number] = [1, 1], color: string = '#DD0000'): SheetGS {
    if (working) this._sheet.protect().setDomainEdit(false);
    else this._sheet.protect().remove();

    this.setBackground(cell[0], cell[1], color);
    return this;
  }

  /**
   * Sets the background of the given cell to a color
   *
   * @param {number} row the row of the cell
   * @param {number} col the column of the cell
   * @param {string} color the color to set the background of the cell
   *
   * @return {SheetGS} the object for chaining
   */
  setBackground(row: number, col: number, color: string): SheetGS {
    this._sheet.getRange(row, col).setBackground(color);
    return this;
  }
}
