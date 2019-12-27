import { MapGS } from "./MapGS";
/**
 * Class to access methods and properties of individual Sheets of Google Spreadsheets
 */
export class SheetGS {
    /**
     * Builds the SheetGS object
     *
     * @param sheetObject the Google Apps Script Sheet object
     */
    constructor(sheetObject) {
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
    resetData() {
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
    getObject() {
        return this._sheet;
    }
    /**
     * Gets the value of the cell
     *
     * @param {number} row the row of the value, indexed at 1
     * @param {number} col the column of the value, indexed at 1
     */
    getValue(row, col) {
        return this._data[row - 1][col - 1];
    }
    ;
    /**
     * Gets the values of the cells
     *
     * @param {number} row the row of the value, indexed at 1
     * @param {number} col the column of the value, indexed at 1
     * @param {number} numRows the number of rows to get
     * @param {number} numCols the number of columns to get
     */
    getValues(row, col, numRows, numCols) {
        let t_return = [[]];
        for (let r = row; r < (row + numRows); r++) {
            let t_columns = [];
            for (let c = col; c < (col + numCols); c++) {
                t_columns.push(this._data[r - 1][c - 1]);
            }
            t_return.push(t_columns);
        }
        return t_return;
    }
    ;
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
    getMapValues(row, col, numRows, numCols) {
        let t_return = new MapGS();
        for (let r = row; r < (row + numRows); r++) {
            let t_columns = new MapGS();
            for (let c = col; c < (col + numCols); c++) {
                t_columns.set(this._data[0][c - 1], this._data[r - 1][c - 1]);
            }
            t_return.set(this._data[r - 1][0], t_columns);
        }
        return t_return;
    }
    ;
    /**
    * Gets an entire column from the sheet
    *
    * @param {number} numColumn number of the column
    * @return {Array<string>} the column
    */
    getColumn(numColumn) {
        if (numColumn < 1)
            throw new Error("numColumn must be greater than 0 in Sheet.getColumn");
        let returnArray = [];
        for (let r of this._data) {
            returnArray.push(r[numColumn - 1]);
        }
        return returnArray;
    }
    /**
    * Gets an entire column from the sheet
    *
    * @param {number} numColumn number of the column
    * @return {MapGS<string, string>} the row names with column values
    */
    getMapColumn(numColumn) {
        if (numColumn < 1)
            throw new Error("numColumn must be greater than 0 in Sheet.getColumn");
        let returnArray = new MapGS();
        for (let r of this._data) {
            returnArray.set(r[0], r[numColumn - 1]);
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
    convertLinebreaksToList(row, column) {
        return this.getValue(row, column).split("\n");
    }
    ;
    /**
     * Sets the value of the cell
     *
     * @param value the value to set
     * @param row the row of the cell
     * @param col the column of the cell
     *
     * @returns {SheetGS} the sheet for chaining
     */
    setValue(value, row, col, reset = true) {
        if ((row < 1) || (col < 1))
            throw new Error("Row and column numbers need to be greater than 0 in SheetGS.setValue()");
        this._sheet.getRange(row, col).setValue(value);
        if (reset)
            this.resetData();
        return this;
    }
    setMapValue(value, row, column, reset = true) {
        for (let r = 2; r <= this._lastRow; r++) {
            if (this.getValue(r, 1) == row) {
                for (let c = 2; c <= this._lastCol; c++) {
                    if (this.getValue(1, c) == column)
                        this.setValue(value, r, c, reset);
                }
            }
        }
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
    setValues(firstParam, startRow = 1, startCol = 1, numRows = 1, numCols = 1) {
        let value;
        if ((typeof firstParam === "object") && !(firstParam instanceof Array)) {
            startRow = firstParam.startRow;
            startCol = firstParam.startCol;
            numRows = firstParam.numRows == null ? 1 : firstParam.numRows;
            numCols = firstParam.numCols == null ? 1 : firstParam.numCols;
            value = firstParam.value;
        }
        else {
            value = firstParam;
        }
        if ((startRow < 1) || (startCol < 1))
            throw new Error("The start row (" + startRow + ") and start column (" + startCol + ") must be greater or equal to one");
        if ((numRows < 1) || (numCols < 1))
            throw new Error("The number of rows (" + numRows + ") and columns (" + numCols + ") must be greater or equal to one");
        for (var i = startRow; i <= (startRow + numRows); i++) {
            for (var j = startCol; j <= (startCol + numCols); j++) {
                if (typeof value === "string")
                    this.setValue(value, i, j, false);
                else {
                    let t_val = value[i];
                    if (typeof t_val === "string")
                        this.setValue(t_val, i, j, false);
                    else
                        this.setValue(t_val[j], i, j, false);
                }
            }
        }
        return this.resetData();
    }
    setMapValues(value, rowValue, columnName, secondColumnName, secondColumnValue) {
        var mapData = this.getMapData();
        for (let row of mapData.getKeys()) {
            let t_row = mapData.get(row);
            if ((t_row != null) && (row == rowValue)) {
                if ((secondColumnName != null) && (secondColumnValue != null)) {
                    if (t_row.get(secondColumnName) == secondColumnValue) {
                        this.setMapValue(value, rowValue, columnName);
                    }
                }
                else {
                    this.setMapValue(value, rowValue, columnName);
                }
            }
        }
        return this.resetData();
    }
    /**
 * Get the data from the Sheet as an object with rows (or columns) as the keys and columns (or rows) as the values
 *
 * @param rowFirst if true, rows will be the keys and columns will be in the values along with the value found at that cell
 *
 * @returns the data object
 */
    getMapData(rowFirst = true) {
        if (this._mapData != undefined)
            return this._mapData;
        let data = new MapGS();
        if (rowFirst) {
            for (let r = 2; r <= this._lastRow; r++) {
                let rowData = new MapGS();
                for (let c = 2; c <= this._lastCol; c++) {
                    rowData.set(this.getValue(1, c), this.getValue(r, c));
                }
                data.set(this.getValue(r, 1), rowData);
            }
        }
        else {
            for (let c = 2; c <= this._lastCol; c++) {
                var columnData = new MapGS();
                for (let r = 2; r <= this._lastRow; r++) {
                    columnData.set(this.getValue(r, 1), this.getValue(r, c));
                }
                data.set(this.getValue(1, c), columnData);
            }
        }
        return data;
    }
    ;
    clear(row, col, numRows, numCols) {
        this.getObject().getRange(row, col, numRows, numCols).clearContent();
    }
    getRecordsMatchingColumnValue(matchColumnName, matchColumnValue, returnColumnNames) {
        let data = this.getMapData();
        let records = [[]];
        for (let record of data.getKeys()) {
            let t_record = data.get(record);
            if ((t_record != null) && (t_record.get(matchColumnName) == matchColumnValue)) {
                let t_recordsToPush = [];
                for (let t_column of returnColumnNames) {
                    let t_colValue = t_record.get(t_column);
                    if (t_colValue != null)
                        t_recordsToPush.push(t_colValue);
                }
                records.push(t_recordsToPush);
            }
        }
        return records;
    }
    getMapRecordsMatchingColumnValue(matchColumnName, matchColumnValue, returnColumnNames) {
        let data = this.getMapData();
        let records = new MapGS();
        for (let record of data.getKeys()) {
            let t_record = data.get(record);
            if ((t_record != null) && (t_record.get(matchColumnName) == matchColumnValue)) {
                let t_recordsToPush = new MapGS();
                for (let t_column of returnColumnNames) {
                    let t_colValue = t_record.get(t_column);
                    if (t_colValue != null)
                        t_recordsToPush.set(t_column, t_colValue);
                }
                records.set(record, t_recordsToPush);
            }
        }
        return records;
    }
    /**
     * Skips blank rows at the beginning (or a specified location) in a sheet
     *
     * @param startRow the first row to look at for a blank row
     * @param col the column to check for blanks
     *
     * @returns {number} the first row that isn't blank
     */
    skipBlankRows(startRow = 1, col = 1) {
        if (col < 1)
            throw new Error("Column (" + col + ") must be greater or equal to 1 in skipBlankRows");
        if (startRow < 1)
            throw new Error("Start row (" + startRow + ") must be greater or equal to 1 in skipBlankRows");
        while ((startRow < this._lastRow) && (this.getValue(startRow, col) == "")) {
            startRow++;
        }
        return startRow;
    }
    ;
    /**
     * Deletes a row in a Sheet
     *
     * @param row the row number to delete
     *
     * @returns {SheetGS} the object for chaining
     */
    deleteRow(row) {
        if ((row < 1) || (row > this._lastRow))
            throw new Error("The specified row (" + row + ") must be greater than or equal to 1 and less than or equal to the last row in SheetGS.deleteRow()");
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
    deleteCol(col) {
        if ((col < 1) || (col > this._lastCol))
            throw new Error("The specified column (" + col + ") must be greater than or equal to 1 and less than or equal to the last column in SheetGS.deleteCol()");
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
    insertCol(col) {
        if (col < 1)
            throw new Error("The specified column (" + col + ") must be greater than or equal to 1");
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
    getCellFromFind(findText, findNumber = 1) {
        if (findText == "")
            throw new Error("Text must be defined in SheetGS.getRowFromFind()");
        if (this._textFinder.get(findText) == undefined)
            this._textFinder.set(findText, this._sheet.createTextFinder(findText));
        let t_textFinder = this._textFinder.get(findText);
        if (t_textFinder == undefined)
            throw new Error("Could not create textFinder in SheetGS.getCellFromFind()");
        while (findNumber > 1) {
            if (t_textFinder.findNext() == null)
                throw new Error("Could not find " + findText + " " + findNumber + " times in SheetGS.getCellFromFind()");
            findNumber--;
        }
        let t_range = t_textFinder.findNext();
        if (t_range == null)
            throw new Error("Could not find instance of " + findText + " in SheetGS.getCellFromFind()");
        return t_range;
    }
    /**
     * Finds text in the sheet and returns the row found for the nth (default first) instance
     *
     * @param findText the text to find
     *
     * @returns {number} the row found
     */
    getRowFromFind(findText, findNumber = 1) {
        if (findText == "")
            throw new Error("Text must be defined in SheetGS.getRowFromFind()");
        return this.getCellFromFind(findText, findNumber).getRow();
    }
    getRow(rowNumber) {
        return this._data[rowNumber];
    }
    getMapRow(rowNumber) {
        let t_return = new MapGS();
        for (let c = 1; c < this.getLastColumn(); c++) {
            t_return.set(this._data[0][c], this._data[rowNumber][c]);
        }
        return t_return;
    }
    /**
     * Finds text in the sheet and returns the column found for the nth (default first) instance
     *
     * @param findText the text to find
     *
     * @returns {number} the column found
     */
    getColumnFromFind(findText, findNumber = 1) {
        if (findText == "")
            throw new Error("Text must be defined in SheetGS.getColumnFromFind()");
        return this.getCellFromFind(findText, findNumber).getColumn();
    }
    /**
     * Gets the last row of the Sheet
     *
     * @returns {number} the row
     */
    getLastRow() {
        return this._lastRow;
    }
    /**
     * Gets the last column of the Sheet
     *
     * @returns {number} the column
     */
    getLastColumn() {
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
    changeWorkingStatus(working, cell = [1, 1], color = "#DD0000") {
        if (working)
            this._sheet.protect().setDomainEdit(false);
        else
            this._sheet.protect().remove();
        this.setBackground(cell[0], cell[1], color);
        return this;
    }
    ;
    /**
     * Sets the background of the given cell to a color
     *
     * @param row the row of the cell
     * @param col the column of the cell
     * @param color the color to set the background of the cell
     *
     * @returns {SheetGS} the object for chaining
     */
    setBackground(row, col, color) {
        this._sheet.getRange(row, col).setBackground(color);
        return this;
    }
    ;
    /**
     * Adds a value for the specified column and row beginning, and inserts a column if it doesn't exist
     *
     * @param columnHeader the column name to match
     * @param {Array<string>} rowHeaders the beginning of the row to match
     * @param cellValue the value to put in
     *
     * @returns {SheetGS} the object for chaining
     */
    addValueForSpecifiedColumn(columnHeader, rowHeaders, cellValue) {
        // Populate the array storing the beginning of the row to match with the string or array
        let rowHeadersArray;
        if (typeof rowHeaders === "string")
            rowHeadersArray = [rowHeaders.toString()];
        else
            rowHeadersArray = rowHeaders;
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
                if (rowHeaders[j] != this.getValue(i, j))
                    foundRow = false;
            }
            if (foundRow) {
                return this.setValue(cellValue, i, newValueColumn);
                // If we need to add the respondent
            }
            else if (this.getValue(i, 1) == "") {
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
    }
    ;
}
