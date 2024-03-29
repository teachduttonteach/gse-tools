import { Utilities } from '../utils/Utilities';
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
export function getSheetValue(obj: SheetGS, row: number, col: number): string | Date {
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
export function getSheetDateValue(obj: SheetGS, row: number, col: number): Date | null {
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
 * @return {Map<string | Date, Map<string | Date, string | Date>>}
 *  a map object of rows with maps of columns
 */
export function getSheetValuesAsMap(
  obj: SheetGS,
  row: number,
  col: number,
  numRows: number,
  numCols: number,
): Map<string | Date, Map<string | Date, string | Date>> {
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
 * Gets all column headers from the sheet as an array
 *
 * @param {SheetGS} obj the Sheet object
 * @return {Array<string | Date>} the column headers as an array
 */
 export function getSheetColumnHeaders(obj: SheetGS): Array<string | Date> {
  return obj.getColumnHeaders();
}

/**
 * Gets all row headers from the sheet as an array
 *
 * @param {SheetGS} obj the Sheet object
 * @return {Array<string | Date>} the row headers as an array
 */
 export function getSheetRowHeaders(obj: SheetGS): Array<string | Date> {
  return obj.getRowHeaders();
}

/**
 * Gets value from row and column headers
 *
 * @param {SheetGS} obj the Sheet object
 * @param {string | Date} row the row header value
 * @param {string | Date} col the column header value
 * @return {string | Date} the value
 */
 export function getSheetValueFromHeaders(obj: SheetGS, row: string | Date, col: string | Date): string | Date {
  return obj.getValueFromHeaders(row, col);
}

/**
 * Gets value from row number and column header
 *
 * @param {SheetGS} obj the Sheet object
 * @param {string | Date} row the row number
 * @param {string | Date} col the column header value
 * @return {string | Date} the value
 */
 export function getSheetValueFromColumnHeader(obj: SheetGS, row: number, col: string | Date): string | Date {
  return obj.getValueFromColumnHeader(row, col);
}

/**
 * Gets an entire column from the sheet as a Map of column names to values
 *
 * @param {SheetGS} obj the Sheet object
 * @param {number} numColumn number of the column
 * @return {Map<string | Date, string | Date>}
 *   the row names with column values
 */
export function getSheetColumnAsMap(obj: SheetGS, numColumn: number): Map<string | Date, string | Date> {
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
  level: string = DEFAULT_DATE_COMPARE_LEVEL,
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
  value1: Date | string | undefined,
  value2: Date | string,
  level: string = DEFAULT_DATE_COMPARE_LEVEL,
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
 * @return {Map<string | Date, Map<string | Date, string | Date>>}
 *  the data object
 */
export function getSheetDataAsMap(
  obj: SheetGS,
  rowFirst: boolean = true,
): Map<string | Date, Map<string | Date, string | Date>> {
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
 * @return {Array<Array<string | Date>>} a list of lists: rows, then all of
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
 * @return {Map<string | Date, Map<string | Date, string | Date>>}
 *  a map of the row names to the column names to the cell values for the
 *  requested columns
 */
export function getRecordsMatchingColumnValueAsMap(
  obj: SheetGS,
  matchColumnName: string | Date,
  matchColumnValue: string | Date,
  returnColumnNames: Array<string | Date>,
): Map<string | Date, Map<string | Date, string | Date>> {
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
 * @return {Map<string | Date, string | Date>} the map of values for the
 *  row
 */
export function getRowAsMap(obj: SheetGS, rowNumber: number): Map<string | Date, string | Date> {
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
  cell: [number, number] = CHANGE_WORKING_STATUS_CELL,
  color: string = CHANGE_WORKING_STATUS_COLOR,
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
 * @param {SheetGS} obj the object itself
 * @param {string | Date} value the new value at the found location
 * @param {string | Date | number} column the column to place the value
 * @param {Array<{name: string | Date, value: string | Date}>} columnsToMatch the
 *  other columns to match in the row where the new value will go
 * @param {boolean} reset whether or not to reset the data in the object
 * @return {SheetGS | null} object for chaining, or null if could not find
 *  matching columns
 */
export function setValueWithMatchingColumns(
  obj: SheetGS,
  value: string | Date,
  column: string | Date | number,
  columnsToMatch: Array<{ name: string | Date; value: string | Date }>,
  reset: boolean = true,
): SheetGS | null {
  return obj.setValueWithMatchingColumns(value, column, columnsToMatch, reset);
}

/**
 * Hides a particular column
 * 
 * @param {SheetGS} obj the object itself
 * @param {number} col the column to hid3
 * @returns {SheetGS} the object for chaining
 */
export function hideSheetColumn(
  obj: SheetGS,
  col: number
): SheetGS {
  return obj.hideColumn(col);
}

/**
 * Hides a particular row
 * 
 * @param {SheetGS} obj the object itself
 * @param {number} row the row to hid3
 * @returns {SheetGS} the object for chaining
 */
export function hideSheetRow(obj: SheetGS, row: number): SheetGS {
  return obj.hideRow(row);
}

/**
 * Sort sheet by a particular column or columns
 * 
 * @param {SheetGS} obj the object itself
 * @param {number | Array<number>} col the column or columns to sort by
 * @returns {SheetGS} the object for chaining
 */
export function sortBySheetColumn(obj: SheetGS, col: number | Array<number>): SheetGS {
  return obj.sortByColumn(col);
}

/**
 * Class to access methods and properties of individual
 * Sheets of Google Spreadsheets
 */
export class SheetGS {
  private _sheet: GoogleAppsScript.Spreadsheet.Sheet;
  private _data: Array<Array<string | Date>>;
  private _textFinder: Map<string, GoogleAppsScript.Spreadsheet.TextFinder>;
  private _lastRow: number;
  private _lastCol: number;
  private _mapData: Map<string | Date, Map<string | Date, string | Date>>;

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
      this._lastRow && this._lastCol ? this._sheet.getRange(1, 1, this._lastRow, this._lastCol).getValues() : [[]];
    for (let r = 0; r < this._data.length; r++) {
      for (let c = 0; c < this._data[r].length; c++) {
        if (Object.prototype.toString.call(this._data[r][c]) === '[object Date]') {
          this._data[r][c] = new Date(this._data[r][c]);
        }
      }
    }
    this._textFinder = new Map();
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
    this._textFinder = new Map();
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
    if (typeof row !== 'number' || typeof col !== 'number') {
      throw new Error('Row and column values (' + row + ', ' + col + ') must be ' + 'numbers in getValue()');
    }

    if (row < 1 || col < 1) {
      throw new Error('Row and column numbers (' + row + ',' + col + ') must be greater than 0 in getValue()');
    }

    return this._data[row - 1][col - 1];
  }

  /**
   * Gets the string value of the cell
   *
   * @param {number} row the row of the value, indexed at 1
   * @param {number} col the column of the value, indexed at 1
   * @return {string} the value requested
   */
   getValueFromHeaders(row: string | Date, col: string | Date): string | Date {

    const colNumber = this._data[0].indexOf(col);
    for (let r = 0; r < this._data.length; r++) {
      if (this._data[r][0] == row) return this._data[r][colNumber];
    }
    throw new Error("Could not find value for row " + row + " and column " + col + " in getValueFromHeaders()");
  }

  /**
   * Gets the string value of the cell
   *
   * @param {number} row the row of the value, indexed at 1
   * @param {number} col the column of the value, indexed at 1
   * @return {string} the value requested
   */
   getValueFromColumnHeader(row: number, col: string | Date): string | Date {
     try {
      return this._data[row][this._data[0].indexOf(col)];
     } catch(e) {
      throw new Error("Could not find value for row " + row + " and column " + col + ": " + e + " in getValueFromColumnHeader()");
     }
  }

  /**
   * Gets the Date value of the cell
   *
   * @param {number} row the row of the value, indexed at 1
   * @param {number} col the column of the value, indexed at 1
   * @return {Date} the date value requested
   */
  getDateValue(row: number, col: number): Date | null {
    const dateValue = this._data[row - 1][col - 1];
    if (dateValue instanceof Date) return dateValue;
    console.log(
      "WARNING: Value '" + dateValue + "' at row, col '" + [row, col].join(',') + "' is not a date in getDateValue()",
    );
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

    if (
      typeof row !== 'number' ||
      typeof col !== 'number' ||
      typeof numRows !== 'number' ||
      typeof numCols !== 'number'
    ) {
      throw new Error(
        'Row, column, number of rows and columns (' +
          [row, col, numRows, numCols].join(',') +
          ') must all be numbers ' +
          'in getValues()',
      );
    }

    if (row < 1 || col < 1 || numRows < 1 || numCols < 1) {
      throw new Error(
        'Row, column, number of rows and columns (' +
          [row, col, numRows, numCols].join(',') +
          ') must all be greater ' +
          'than or equal to 1 in getValues()',
      );
    }

    for (let r = row; r < row + numRows; r++) {
      const columnsValues: Array<string | Date> = [];
      for (let c = col; c < col + numCols; c++) {
        const thisValue = this._data[r - 1][c - 1];
        if (thisValue === undefined) {
          throw new Error('Could not find value' + ' at (' + [r - 1, c - 1].join(',') + ') in getValues()');
        }
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
   * @return {Map<string | Date, Map<string | Date, string | Date>>}
   *  a map object of rows with maps of columns
   */
  getValuesAsMap(
    row: number,
    col: number,
    numRows: number,
    numCols: number,
  ): Map<string | Date, Map<string | Date, string | Date>> {
    const _return: Map<string | Date, Map<string | Date, string | Date>> = new Map();

    if (numRows == -1) numRows = this._lastRow - row;
    if (numCols == -1) numCols = this._lastCol - col;

    if (row < 1 || col < 1 || numRows < 1 || numCols < 1) {
      throw new Error(
        'Row, column, number of rows and columns must all be greater than or equal to 1 in getValuesAsMap()',
      );
    }
    if (row + numRows > this._lastRow || col + numCols > this._lastCol) {
      throw new Error('Rows and columns requested must not exceed size of sheet in getValuesAsMap()');
    }

    for (let r = row; r < row + numRows; r++) {
      const _columns: Map<string | Date, string | Date> = new Map();
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
    if (typeof colNumber !== 'number') {
      throw new Error("Column '" + colNumber + "' must be a number in getColumn()");
    }

    if (colNumber < 1) {
      throw new Error("Column '" + colNumber + "' must be " + 'greater than 0 in getColumn()');
    }

    const returnArray: Array<string | Date> = [];
    for (const row of this._data) {
      returnArray.push(row[colNumber - 1]);
    }
    return returnArray;
  }
  
  /**
   * Gets all column headers from the sheet as an array
   *
   * @return {Array<string | Date>} the column headers as an array
   */
   getColumnHeaders(): Array<string | Date> {
    let returnArray: Array<string | Date> = [];
    this._data[0].forEach(cell => cell != "" ? returnArray.push(cell) : 0);
    return returnArray;
  }

  /**
   * Gets the column number from the header
   * 
   * @param {string | Date} header the column header
   * 
   * @returns {number} column number
   */
   getColumnFromHeader(header: string | Date): number {
     let columnNumber: number = -1;
     this._data[0].forEach(function(cell, i) { cell == header ? columnNumber == i : 0 });
     return columnNumber;
   }


  /**
   * Gets the row number from the header
   * 
   * @param {string | Date} header the row header
   * 
   * @returns {number} row number
   */
   getRowFromHeader(header: string | Date): number {
    let rowNumber: number = -1;
    this._data.forEach(function(row, i) { row[0] == header ? rowNumber == i : 0 });
    return rowNumber;
  }

  /**
   * Gets all row headers from the sheet as an array
   *
   * @return {Array<string | Date>} the row headers as an array
   */
   getRowHeaders(): Array<string | Date> {
    let returnArray: Array<string | Date> = [];
    this._data.forEach(row => row[0] != "" ? returnArray.push(row[0]) : 0);
    return returnArray;
  }

  /**
   * Gets an entire column from the sheet as a Map of column names to values
   *
   * @param {number} numColumn number of the column
   * @return {Map<string | Date, string | Date>}
   *   the row names with column values
   */
  getColumnAsMap(numColumn: number): Map<string | Date, string | Date> {
    if (typeof numColumn !== 'number') {
      throw new Error('Column number must be a number in getColumnAsMap()');
    }
    if (numColumn < 1) {
      throw new Error('Column number must be greater than 0 in getColumnAsMap()');
    }
    const returnArray: Map<string | Date, string | Date> = new Map();
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
    if (typeof thisValue === 'string') return thisValue.split('\n');
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
      throw new Error('Row and column numbers need to be greater than 0 in setValue()');
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
  setValueWithLists(
    value: string | Date,
    row: string | Date | Array<string | Date>,
    column: string | Date | Array<string | Date>,
    reset: boolean = true,
  ): SheetGS {
    if (value === undefined || row === undefined || column === undefined) {
      throw new Error('Value, row name, and column name must all be defined in setValueAsMap()');
    }
    const utils = new Utilities();

    for (let r: number = 2; r <= this._lastRow; r++) {
      if (
        (row instanceof Array && this._checkRow(row, r)) ||
        (row instanceof Date && utils.areDatesEqual(this.getDateValue(r, 1), row)) ||
        this.getValue(r, 1) == row
      ) {
        for (let c: number = 2; c <= this._lastCol; c++) {
          if (
            (column instanceof Array && this._checkCol(column, c)) ||
            (column instanceof Date && utils.areDatesEqual(this.getDateValue(1, c), column)) ||
            this.getValue(1, c) == column
          ) {
            this.setValue(value, r, c, reset);
          }
        }
      }
    }
    return this;
  }

  /**
   * Check the row to see if the values are equal
   *
   * @param {Array<string | Date>} rowArray
   * @param {number} rowNumber
   * @return {boolean} whether or not the values are equal
   */
  private _checkRow(rowArray: Array<string | Date>, rowNumber: number): boolean {
    const utils = new Utilities();

    for (let i = 1; i <= rowArray.length; i++) {
      if (rowArray[i - 1] instanceof Date) {
        if (!utils.areDatesEqual(this.getDateValue(rowNumber, i), rowArray[i - 1])) {
          return false;
        }
      } else if (rowArray[i - 1] != this._data[rowNumber - 1][i - 1]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check the column to see if the values are equal
   *
   * @param {Array<string | Date>} colArray
   * @param {number} colNumber
   * @return {boolean} whether or not the values are equal
   */
  private _checkCol(colArray: Array<string | Date>, colNumber: number): boolean {
    const utils = new Utilities();

    for (let i = 1; i <= colArray.length; i++) {
      if (colArray[i - 1] instanceof Date) {
        if (!utils.areDatesEqual(this.getDateValue(i, colNumber), colArray[i - 1])) {
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
   *  Values as arrays have as rows the first dimension and as columns the
   *  second dimension.
   * ```javascript
   * mySheet.setValues([["John", "Doe"],["Jane", "Doe"]], 1, 1, 2, 2);
   * ```
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
        'The start row (' + startRow + ') and start column (' + startCol + ') must be greater or equal to one in setValues()',
      );
    }

    if (numRows < 1 || numCols < 1) {
      throw new Error(
        'The number of rows (' + numRows + ') and columns (' + numCols + ') must be greater or equal to one in setValues()',
      );
    }

    // TODO: Set values with this._sheet.getRange().setValues()

    if (
      value instanceof Array &&
      (value as any[]).every(item => item instanceof Array)
    ) {
      this._sheet
        .getRange(startRow, startCol, numRows, numCols)
        .setValues(value as any[]);
      return this.resetData();
    }

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (value instanceof Array) {
          const currentValue = value[i];
          if (currentValue instanceof Array) {
            this.setValue(currentValue[j], startRow + i, startCol + j, false);
          } else {
            this.setValue(currentValue, startRow + i, startCol + j, false);
          }
        } else {
          this.setValue(value, startRow + i, startCol + j, false);
        }
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
  areSheetValuesEqual(value: Date | string, cell: [number, number], level: string = DEFAULT_DATE_COMPARE_LEVEL): boolean {
    const utils = new Utilities();

    if (
      (value instanceof Date && utils.areDatesEqual(value, this.getDateValue(cell[0], cell[1]), level)) ||
      value == this.getValue(cell[0], cell[1])
    ) {
      return true;
    }
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
  areValuesEqualAsMap(value1: Date | string | undefined, value2: Date | string, level: string = DEFAULT_DATE_COMPARE_LEVEL): boolean {
    if ((value1 === undefined) || (value1 == null)) {
      throw new Error('Could not find map value in areValuesEqualAsMap()');
    }
    const utils = new Utilities();

    if ((value1 instanceof Date && utils.areDatesEqual(value1, value2, level)) || value1 == value2) return true;
    return false;
  }

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
  setValueWithMatchingColumns(
    value: string | Date,
    column: string | Date | number,
    columnsToMatch: Array<{ name: string | Date; value: string | Date }>,
    reset: boolean = true,
  ): SheetGS | null {
    if (typeof column == 'number') column = this._data[0][column - 1];
    let columnNumberOfValue = this.getColumnFromHeader(column);

    let columnNumbersToMatch: Array<{ col: number; value: string | Date }> = [];
    for (const c of columnsToMatch) {
      columnNumbersToMatch.push({
        col: this.getColumnFromHeader(c.name),
        value: c.value
      })
    }

    this._data.forEach(function(thisRow, rowNumber) {
      let matchedAllColumns = true;
      for (const c of columnNumbersToMatch) {
        if (thisRow[c.col] != c.value) {
          matchedAllColumns = false;
          break;
        }
      }
      if (matchedAllColumns) {
        return this.setValue(value, rowNumber, columnNumberOfValue, reset);
      }
    });

    /*
    const dataMap = this.getDataAsMap(true);
    for (const r of dataMap.keys()) {
      const thisRow = dataMap.get(r);
      if (thisRow != null) {
        let matchedAllColumns = true;
        for (const c of columnsToMatch) {
          if (!this.areValuesEqualAsMap(thisRow.get(c.name), c.value)) {
            matchedAllColumns = false;
            break;
          }
        }
        if (matchedAllColumns) {
          const rowNum = dataMap.getNum(r);
          const colNum = thisRow.getNum(column);
          if (rowNum != null && colNum != null) {
            return this.setValue(value, rowNum + 2, colNum + 1, reset);
          }
        }
      }
    }
    */
    return null;
  }

  /**
   * Get the data from the Sheet as an object with rows (or columns) as the
   *  keys and columns (or rows) as the values
   *
   * @param {boolean} rowFirst if true, rows will be the keys and columns will
   *  be in the values along with the value found at that cell
   *
   * @return {Map<string | Date, Map<string | Date, string | Date>>}
   *  the data object
   */
  getDataAsMap(rowFirst: boolean = true): Map<string | Date, Map<string | Date, string | Date>> {
    if (this._mapData != undefined) return this._mapData;
    const data: Map<string | Date, Map<string | Date, string | Date>> = new Map();

    if (rowFirst) {
      for (let r: number = 2; r <= this._lastRow; r++) {
        const rowData: Map<string | Date, string | Date> = new Map();
        for (let c: number = 1; c <= this._lastCol; c++) {
          rowData.set(this.getValue(1, c), this.getValue(r, c));
        }
        data.set(this.getValue(r, 1), rowData);
      }
    } else {
      for (let c: number = 2; c <= this._lastCol; c++) {
        const columnData: Map<string | Date, string | Date> = new Map();
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
      throw new Error('Number of rows and columns must be greater than or ' + 'equal to 1 in SheetGS.clear()');
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
   * @return {Array<Array<string | Date>>} a list of lists: rows, then all of
   *  the requested column values, not indexed by row
   */
  getRecordsMatchingColumnValue(
    matchColumnName: string | Date,
    matchColumnValue: string | Date,
    returnColumnNames: Array<string | Date>,
    sorted: boolean = false,
  ): Array<Array<string | Date>> {
    // Create the return array for matching column values
    const recordsMatchingColumnValue: Array<Array<string | Date>> = [];

    // Loop through each row of data
    this.getDataAsMap().forEach(function(columnMap) {

      // Check to see if the current row has the correct column name/value pair
      if (columnMap.get(matchColumnName) == matchColumnValue) {

        // Create the array for the column values to grab from this row
        let matchedColumns: Array<string | Date> = [];

        // Loop through each column name/value pair
        columnMap.forEach(function(value, columnName) {

          // Check to see if the current column name is in the list to return
          if (columnName.toString() in returnColumnNames) 
            matchedColumns.push(value);
        });

        // Push the column values into a new row to return
        recordsMatchingColumnValue.push(matchedColumns);  
      }
    });

    // If the records should be sorted, do so
    return sorted ? recordsMatchingColumnValue.sort() : recordsMatchingColumnValue;
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
   * @return {Map<string | Date, Map<string | Date, string | Date>>}
   *  a map of the row names to the column names to the cell values for the
   *  requested columns
   */
  getRecordsMatchingColumnValueAsMap(
    matchColumnName: string | Date,
    matchColumnValue: string | Date,
    returnColumnNames: Array<string | Date>,
  ): Map<string | Date, Map<string | Date, string | Date>> {
    // Create the return map for matching column values
    const recordsMatchingColumnValue: Map<string | Date, Map<string | Date, string | Date>> = new Map();

    // Loop through each row of data
    this.getDataAsMap().forEach(function(columnMap, rowKey) {

      // Check to see if the current row has the correct column name/value pair
      if (columnMap.get(matchColumnName) == matchColumnValue) {

        // Create the map for the column values to grab from this row
        let matchedColumns: Map<string | Date, string | Date> = new Map();

        // Loop through each column name/value pair
        columnMap.forEach(function(value, columnName) {

          // Check to see if the current column name is in the list to return
          if (columnName.toString() in returnColumnNames) 
            matchedColumns.set(columnName, value);
        });

        // Push the column values into a new row to return
        recordsMatchingColumnValue.set(rowKey, matchedColumns);  
      }
    });

    // If the records should be sorted, do so
    return recordsMatchingColumnValue;
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
      throw new Error('Column (' + col + ') must be greater or equal to 1 in skipBlankRows()');
    }
    if (startRow < 1) {
      throw new Error('Start row (' + startRow + ') must be greater or equal to 1 in skipBlankRows()');
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
        'The specified row (' + row + ') must be greater than or equal to 1 and less than or equal to the last row in deleteRow()',
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
          col + ') must be greater than or equal to 1 and less than or equal to the last column in deleteCol()',
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
      throw new Error('The specified column (' + col + ') must be greater than or equal to 1 in insertCol()');
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
  getCellFromFind(findText: string, findNumber: number = 1): GoogleAppsScript.Spreadsheet.Range | false {
    if (findText == '') {
      throw new Error('Text must be defined in getCellFromFind()');
    }

    // Make a new TextFinder object if one doesn't already exist for finding
    //  this text
    if (this._textFinder.get(findText) == undefined) {
      this._textFinder.set(findText, this._sheet.createTextFinder(findText));
    }

    // Get the TextFinder object or say that it can't be found
    const currentTextFinder = this._textFinder.get(findText);
    if (currentTextFinder == undefined) {
      throw new Error('Could not create textFinder in getCellFromFind()');
    }

    // If we're looking for greater than the 1st instance of the text, look
    //  for it that many times decrementing the findNumber each time
    while (findNumber > 1) {
      if (currentTextFinder.findNext() == null) {
        throw new Error('Could not find ' + findText + ', ' + findNumber + ' times in getCellFromFind()');
      }
      findNumber--;
    }

    // Find the instance we want to return
    const currentRange = currentTextFinder.findNext();
    if (currentRange == null) {
      console.log('WARNING: Could not find instance of ' + findText + ' in getCellFromFind()');
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
   * @param {number} rowNumber the row number to get, indexed at 1
   * @return {Array<string | Date>} the list of values in the row
   */
  getRow(rowNumber: number): Array<string | Date> {
    if (typeof rowNumber !== 'number') {
      throw new Error("Row '" + rowNumber + "' must be a number in getRow()");
    }

    if (rowNumber < 1) {
      throw new Error("Row '" + rowNumber + "' must be greater than 0 in getRow()");
    }

    const thisRow = this._data[rowNumber - 1];
    if (thisRow === undefined) {
      throw new Error("Row '" + rowNumber + "' undefined in getRow()");
    }

    return thisRow;
  }

  /**
   * Gets the specified row as a map of strings or Dates
   * @param {number} rowNumber the row number to get
   * @return {Map<string | Date, string | Date>} the map of values for the
   *  row
   */
  getRowAsMap(rowNumber: number): Map<string | Date, string | Date> {
    if (typeof rowNumber !== 'number') {
      throw new Error('Row number must be a number in SheetGS.getRowAsMap()');
    }
    if (rowNumber < 1) {
      throw new Error('Row number must be greater than 0 in getRowAsMap()');
    }
    const returnValue: Map<string | Date, string | Date> = new Map();
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
      throw new Error('Text to find must be defined in getColumnFromFind()');
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
  changeWorkingStatus(working: boolean, cell: [number, number] = CHANGE_WORKING_STATUS_CELL, color: string = CHANGE_WORKING_STATUS_COLOR): SheetGS {
    if (working) this._sheet.protect().setDomainEdit(false);
    else this._sheet.protect().remove();

    return this.setBackground(cell[0], cell[1], color);
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

  /**
   * Hides a particular column
   * 
   * @param {number} col the column to hid3
   * @returns {SheetGS} the object for chaining
   */
  hideColumn(col: number): SheetGS {
    this._sheet.hideColumn(this._sheet.getRange(1, col));
    return this;
  }

  /**
   * Hides a particular row
   * 
   * @param {number} row the row to hid3
   * @returns {SheetGS} the object for chaining
   */
   hideRow(row: number): SheetGS {
    this._sheet.hideRow(this._sheet.getRange(row, 1));
    return this;
  }

  /**
   * Sort sheet by a particular column or columns
   * 
   * @param {number | Array<number>} col the column or columns to sort by
   * @returns {SheetGS} the object for chaining
   */
  sortByColumn(col: number | Array<number>): SheetGS {
    if (typeof col === 'number') {
      this._sheet.sort(col);
    } else if (typeof col === 'object') {
      for (const column of col) {
        this._sheet.sort(column);
      }
    }
    return this;
  }
}

