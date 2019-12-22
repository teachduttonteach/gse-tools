/**
 * The cell range type for us in setting values
 */
type CellRange = {
  /**
   * The starting row
   */
  startRow: number,
  /**
   * The starting column
   */
  startCol: number,
  /**
   * The number of rows (default: 1)
   */
  numRows?: number,
  /**
   * The number of columns (default: 1)
   */
  numCols?: number,
  /**
   * The value of the cells
   */
  value: string
};      

/**
 * Class to access methods and properties of individual Sheets of Google Spreadsheets
 */
export class SheetGS {
    private _sheet: GoogleAppsScript.Spreadsheet.Sheet;
    private _data: any[][];
    private _textFinder: Map<string, GoogleAppsScript.Spreadsheet.TextFinder>;
    private _lastRow: number;
    private _lastCol: number;

    /**
     * Builds the SheetGS object
     * 
     * @param sheetObject the Google Apps Script Sheet object
     */
    constructor(sheetObject: GoogleAppsScript.Spreadsheet.Sheet) {
      this._sheet = sheetObject;
      this._lastRow = this._sheet.getLastRow();
      this._lastCol = this._sheet.getLastColumn();
      this._data = (this._lastRow && this._lastCol) ? this._sheet.getRange(1, 1, this._lastRow, this._lastCol).getValues() : [];
    }

    /**
     * Resets the data object when Sheet data changes
     * 
     * @returns {SheetGS} the object for chaining
     */
    resetData(): SheetGS {
      this._lastRow = this._sheet.getLastRow();
      this._lastCol = this._sheet.getLastColumn();
      this._data = this._sheet.getRange(1, 1, this._lastRow, this._lastCol).getValues();
      return this;
    }

    /**
     * Gets the underlying Google Apps Script object for direct access
     * 
     * @returns the Sheet object
     */
    getObject(): GoogleAppsScript.Spreadsheet.Sheet {
      return this._sheet;
    }

    /**
     * Gets the value of the cell
     * 
     * @param {number} row the row of the value
     * @param {number} col the column of the value
     */
    getValue(row: number, col: number) {
      return this._data[row - 1][col - 1];
    };
    
    /**
    * Gets an entire column from the sheet
    *
    * @param {number} numColumn number of the column
    * @return {Array<string>} the column
    */
    getColumn(numColumn: number): Array<string> {
      if (numColumn < 1) throw new Error("numColumn must be greater than 0 in Sheet.getColumn");
      let returnArray: Array<string> = [];
      for (let r of this._data) {
        returnArray.push(r[numColumn - 1]);
      }
      return returnArray;
    }
    
    /**
     * Converts linebreaks in the string to an array
     * @param {number} row the row of the cell to convert
     * @param {number} column the column of the cell to convert
     * 
     * @returns {SheetGS} the sheet for chaining
     */
    convertLinebreaksToList(row: number, column: number): SheetGS {
      return this.getValue(row, column).split("\n");
    };

    /**
     * Sets the value of the cell
     * 
     * @param value the value to set
     * @param row the row of the cell
     * @param col the column of the cell
     * 
     * @returns {SheetGS} the sheet for chaining
     */
    setValue(value: string, row: number, col: number, reset: boolean = true): SheetGS {
      if ((row < 1) || (col < 1)) throw new Error("Row and column numbers need to be greater than 0 in SheetGS.setValue()");
      this._sheet.getRange(row, col).setValue(value);
      if (reset) this.resetData();
      return this;
    }
    
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
    setValues(firstParam: string | Array<string> | CellRange, startRow: number = 1, startCol: number = 1, numRows: number = 1, numCols: number = 1): SheetGS {
      let value: string | Array<string>;
      if ((typeof firstParam === "object") && !(firstParam instanceof Array)) {
        startRow = firstParam.startRow;
        startCol = firstParam.startCol;
        numRows = firstParam.numRows == null ? 1 : firstParam.numRows;
        numCols = firstParam.numCols == null ? 1 : firstParam.numCols;
        value = firstParam.value;
      } else {
        value = firstParam;
      }
      if ((startRow < 1) || (startCol < 1)) throw new Error("The start row (" + startRow + ") and start column (" + startCol + ") must be greater or equal to one");
      if ((numRows < 1) || (numCols < 1)) throw new Error("The number of rows (" + numRows + ") and columns (" + numCols + ") must be greater or equal to one");   
      for (var i = startRow; i <= (startRow + numRows); i++) {
        for (var j = startCol; j <= (startCol + numCols); j++) {
          if (typeof value === "string") this.setValue(value, i, j, false);
          else if (typeof value[i] === "string") this.setValue(value[i], i, j, false);
          else this.setValue(value[i][j], i, j, false);
        }
      }
      return this.resetData();
    }
    
    /**
     * Skips blank rows at the beginning (or a specified location) in a sheet
     * 
     * @param startRow the first row to look at for a blank row
     * @param col the column to check for blanks
     * 
     * @returns {number} the first row that isn't blank
     */
    skipBlankRows(startRow: number = 1, col: number = 1): number {
      if (col < 1) throw new Error("Column (" + col + ") must be greater or equal to 1 in skipBlankRows");
      if (startRow < 1) throw new Error("Start row (" + startRow + ") must be greater or equal to 1 in skipBlankRows");
      while ((startRow < this._lastRow) && (this.getValue(startRow, col) == "")) {
        startRow++;
      }
      return startRow;
    };
    
    /**
     * Deletes a row in a Sheet
     * 
     * @param row the row number to delete
     * 
     * @returns {SheetGS} the object for chaining
     */
    deleteRow(row: number): SheetGS {
      if ((row < 1) || (row > this._lastRow)) throw new Error("The specified row (" + row + ") must be greater than or equal to 1 and less than or equal to the last row in SheetGS.deleteRow()");
      this._sheet.deleteRow(row);
      return this.resetData();
    }
    
    /**
     * Deletes a column in a Sheet
     * 
     * @param col the column number to delete
     * 
     * @returns {SheetGS} the object for chaining
     */
    deleteCol(col: number): SheetGS {
      if ((col < 1) || (col > this._lastCol)) throw new Error("The specified column (" + col + ") must be greater than or equal to 1 and less than or equal to the last column in SheetGS.deleteCol()");
      this._sheet.deleteColumn(col);
      return this.resetData();
    }
    
    /**
     * Inserts a column into the Sheet
     * 
     * @param col the column number to insert before
     * 
     * @returns {SheetGS} the object for chaining
     */
    insertCol(col: number): SheetGS {
      if (col < 1) throw new Error("The specified column (" + col + ") must be greater than or equal to 1");
      this._sheet.insertColumns(col);
      return this.resetData();
    }
    
    /**
     * Finds text in the sheet and returns the Range found for the nth (default first) instance
     * 
     * @param findText the text to find
     * 
     * @returns {GoogleAppsScript.Spreadsheet.Range} the Range found
     */
    getCellFromFind(findText: string, findNumber: number = 1): GoogleAppsScript.Spreadsheet.Range {
      if (findText == "") throw new Error("Text must be defined in SheetGS.getRowFromFind()");
      if (this._textFinder.get(findText) == undefined) this._textFinder.set(findText, this._sheet.createTextFinder(findText));
      let t_textFinder = this._textFinder.get(findText);
      if (t_textFinder == undefined) throw new Error("Could not create textFinder in SheetGS.getCellFromFind()");
      while (findNumber > 1) {
        if (t_textFinder.findNext() == null) throw new Error("Could not find " + findText + " " + findNumber + " times in SheetGS.getCellFromFind()");
        findNumber--;
      }
      let t_range = t_textFinder.findNext();
      if (t_range == null) throw new Error("Could not find instance of " + findText + " in SheetGS.getCellFromFind()");
      return t_range;
    }
    
    /**
     * Finds text in the sheet and returns the row found for the nth (default first) instance
     * 
     * @param findText the text to find
     * 
     * @returns {number} the row found
     */
    getRowFromFind(findText: string, findNumber: number = 1): number {
      if (findText == "") throw new Error("Text must be defined in SheetGS.getRowFromFind()");
      return this.getCellFromFind(findText, findNumber).getRow();
    }
    
    /**
     * Finds text in the sheet and returns the column found for the nth (default first) instance
     * 
     * @param findText the text to find
     * 
     * @returns {number} the column found
     */
    getColumnFromFind(findText: string, findNumber: number = 1): number {
      if (findText == "") throw new Error("Text must be defined in SheetGS.getColumnFromFind()");
      return this.getCellFromFind(findText, findNumber).getColumn();
    }
    
    /**
     * Gets the last row of the Sheet
     * 
     * @returns {number} the row
     */
    getLastRow(): number {
      return this._lastRow;
    }
    
    /**
     * Gets the last column of the Sheet
     * 
     * @returns {number} the column
     */
    getLastColumn(): number {
      return this._lastCol;
    }
    
    /**
     * Changes the color of a selected cell while an operation is occurring
     * 
     * @param working set true if the operation is occurring, false when it is done
     * @param cell the cell reference as an array
     * @param color the color to set the cell
     * 
     * @returns {SheetGS} the object for chaining
     */
    changeWorkingStatus(working: boolean, cell: Array<number> = [1,1], color: string = "#DD0000"): SheetGS {  
      if (working) this._sheet.protect().setDomainEdit(false);
      else this._sheet.protect().remove();
      this.setBackground(cell[0], cell[1], color);
      return this;
    };
    
    /**
     * Sets the background of the given cell to a color
     * 
     * @param row the row of the cell
     * @param col the column of the cell
     * @param color the color to set the background of the cell
     * 
     * @returns {SheetGS} the object for chaining
     */
    setBackground(row: number, col: number, color: string): SheetGS {
      this._sheet.getRange(row, col).setBackground(color);
      return this;
    };
    
    /**
     * Adds a value for the specified column and row beginning, and inserts a column if it doesn't exist
     * 
     * @param columnHeader the column name to match
     * @param {Array<string>} rowHeaders the beginning of the row to match
     * @param cellValue the value to put in
     * 
     * @returns {SheetGS} the object for chaining
     */
    addValueForSpecifiedColumn(columnHeader: string, rowHeaders: Array<string> | string, cellValue: string): SheetGS {
      // Populate the array storing the beginning of the row to match with the string or array
      let rowHeadersArray: Array<string>;
      if (typeof rowHeaders === "string") rowHeadersArray = [rowHeaders.toString()];
      else rowHeadersArray = rowHeaders;

      // Set the column to place the new value in as the end of the rowHeadersArray plus one
      let newValueColumn = rowHeadersArray.length + 1;
      
      // If this is a new column header, insert a new column
      if (this.getValue(1, newValueColumn) != columnHeader) {
        this._sheet.insertColumnBefore(newValueColumn).getRange(1, newValueColumn).setValue(cellValue);
      }
      
      // Go through all of the rows looking for the student name
      for (var i = 2; i <= this.getLastRow(); i++) {
        
        // If we found the name of the respondent, then set the bellwork response in the response sheet
        var foundRow = true;
        for (var j = 1; j < newValueColumn; j++) {
          if (rowHeaders[j] != this.getValue(i, j)) foundRow = false;
        }
        if (foundRow) {
          return this.setValue(cellValue, i, newValueColumn);
          
          // If we need to add the respondent
        } else if (this.getValue(i, 1) == "") {
          for (var j = 1; j < newValueColumn; j++) {
            this.setValue(rowHeaders[j], i, j, false);
          }
          this.setValue(cellValue, i, newValueColumn, false);
          
          // Should I resort the sheet at this point?
          this._sheet.setFrozenRows(1);
          this._sheet.sort(newValueColumn - 1);
          return this.resetData();
        }
      }
      throw new Error("Could not find column header " + columnHeader + " in SheetGS.addValueForSpecifiedColumn()");
    };
  }