class SheetGS {
    _sheet: GoogleAppsScript.Spreadsheet.Sheet;
    _data: any[][];
    constructor(sheetObject: GoogleAppsScript.Spreadsheet.Sheet) {
      this._sheet = sheetObject;
      this._data = (this._sheet.getLastRow() && this._sheet.getLastColumn()) ? this._sheet.getRange(1, 1, this._sheet.getLastRow(), this._sheet.getLastColumn()).getValues() : [];
    }
    // TODO: Needs more error checking to ensure that the SS exists before checking for the sheet
    // TODO: These variables should be private
    // TODO: Put Sheet() inside of Spreadsheet()
    
    getValue(row: number = 1, col: number = 1) {
      return this._data[row - 1][col - 1];
    };
    
    /**
    * Raises a number to the given power, and returns the result.
    *
    * @param {sheetName} the name of the individual sheet to get the data for
    * @param {numColumn} the number of the column
    * @return {[]} the column
    */
    getColumn = function(numColumn: number = null): Array<string> {
      if (numColumn > 0) {
        let returnArray: Array<string>;
        for (let r of this._data) {
          returnArray.push(r[numColumn - 1]);
        }
        return returnArray;
      } else {
        throw new Error("numColumn must be greater than 0 in Sheet.getColumn");
      }
    }
    
    convertLinebreaksToList = function(row: number = null, column: number = null) {
      if (row as number) {
        return this.getValue(row, column).split("\n");
      } else {
        throw new Error("List and form need to be defined for SheetsGS.convertLinebreaksToList");
      }
    };
      
    setRange = function(rowStart: number = null, colStart: number = null, rows: number = null, cols: number = null, value: string = null) {
      if ((rowStart > 0) && (colStart > 0) && (rows > 0) && (cols > 0)) {
        this._sheet.getRange(rowStart, colStart, rows, cols).setValues(value);
        return this;
      } else {
        throw new Error("row and column numbers need to be greater than 0 in Sheet.setValue");
      }
    }
    
    setValue = function(row: number = null, col: number = null, value: number = null) {
      if ((row > 0) && (col > 0)) {
        if (value as number) {
          this._sheet.getRange(row, col).setValue(value);
          return this;
        } else {
          throw new Error("value must be defined in Sheet.setValue");
        }
      } else {
        throw new Error("row and column numbers need to be greater than 0 in Sheet.setValue");
      }
    }
    
    setValues = function(startRow: number = null, startCol: number = null, numRows: number = null, numCols: number = null, value: string = null) {
      if ((numRows > 0) && (numCols > 0)) {      
        for (var i = startRow; i <= (startRow + numRows); i++) {
          for (var j = startCol; j <= (startCol + numCols); j++) {
            this.setValue(i, j, value);
          }
        }
        return this;
      } else {
        throw new Error("number of rows and number of columns needs to be greater than 0 in Sheet.setValues");
      }
    }
    
    skipBlankRows = function(startRow: number = null, col: number = null) {
      if (col as number) {
        while (this.getValue(startRow, col) == "") {
          startRow++;
        }
        return startRow;
      } else {
        throw new Error("Must define column to check for blank rows in Sheet.skipBlankRows");
      }
    };
    
    deleteRow = function(row: number = null) {
      if (row > 0) {
        this._sheet.deleteRow(row);
        return this;
      } else {
        throw new Error("row needs to be greater than 0 in Sheet.deleteRow");
      }
    }
    
    deleteCol = function(col: number = null) {
      if (col > 0) {
        this._sheet.deleteColumn(col);
        return this;
      } else {
        throw new Error("column needs to be greater than 0 in Sheet.deleteCol");
      }
    }
    
    insertCol = function(col: number = null) {
      if (col > 0) {
        this._sheet.insertColumns(col);
        return this;
      } else {
        throw new Error("column needs to be greater than 0 in Sheet.insertCol");
      }
    }
    
    getRowFromFind = function(findText: string) {
      if (findText as string) {
        return this._sheet.createTextFinder(findText).findNext().getRow();
      } else {
        throw new Error("findText must be defined for Sheet.getRowFromFind");
      }
    }
    
    getColumnFromFind = function(findText: string = null) {
      if (findText as string) {
        return this._sheet.createTextFinder(findText).findNext().getColumn();
      } else {
        throw new Error("findText must be defined for Sheet.getRowFromFind");
      }
    }
    
    getLastRow = function() {
      return this._data.length;
    }
    
    getLastColumn = function() {
      return this._data[0].length;
    }
    
    changeWorkingStatus = function(status: string = null, cell: Array<number> = [1,1], color: string = null) {  
      if (status) {
        this._sheet.protect().setDomainEdit(false);
      } else {
        this._sheet.protect().remove();
      }
      this.setBackground(cell[0], cell[1], color);
    };
    
    setBackground = function(row: number = null, col: number = null, color: string = null) {
      this._sheet.getRange(row, col).setBackground(color);
    };
    
    addValuePerColumn = function(columnHeader: string = null, rowHeaders: any = null, cellValue: string = null) {
      if (!(rowHeaders as Array<string>)) rowHeaders = [rowHeaders];
      var newValueColumn = rowHeaders.length + 1;
      // If this is a new day to add bellwork, insert a new column
      if (this.getValue(1, newValueColumn) != columnHeader) {
        this._sheet.insertCol(newValueColumn - 1).setValue(1, newValueColumn, cellValue);
      }
      
      // Go through all of the rows looking for the student name
      for (var i = 2; i < this.getMaxRows(); i++) {
        
        // If we found the name of the respondent, then set the bellwork response in the response sheet
        var foundRow = true;
        for (var j = 1; j < newValueColumn; j++) {
          if (rowHeaders[j] != this.getValue(i, j)) foundRow = false;
        }
        if (foundRow) {
          this.setValue(i, newValueColumn, cellValue);
          break;
          
          // If we need to add the respondent
        } else if (this.getValue(i, 1) == "") {
          for (var j = 1; j < newValueColumn; j++) {
            this.setValue(i, j, rowHeaders[j]);
          }
          this.setValue(i, newValueColumn, cellValue);
          
          // Should I resort the sheet at this point?
          break;
        }
      }
    };
  }
  
