import { SpreadsheetGS } from "./SpreadsheetGS";
/**
 * Class to process Spreadsheet events (like onEdit, onChange)
 *
 */
export class SheetEventGS {
    constructor(event) {
        this.event = event;
        let spreadsheet = new SpreadsheetGS(event.source.getActiveSheet().getParent());
        this._sheet = spreadsheet.getSheet(event.source.getActiveSheet().getName());
        this._sheetName = event.source.getActiveSheet().getName();
        this._row = event.range.getRow();
        this._column = event.range.getColumn();
        this._value = event.range.getValue();
        this._event = event;
        this._activeSheet = spreadsheet;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Event object
     */
    getObject() {
        return this._event;
    }
    getSheetName() {
        return this._sheetName;
    }
    getSheet() {
        return this._sheet;
    }
    getRow() {
        return this._row;
    }
    getColumn() {
        return this._column;
    }
    /**
     * Check to see if the cell is in the specified trigger range
     *
     * @returns true or false
     */
    checkCell() {
        let foundCell = false, foundColumn = false, foundRow = false;
        if (this._triggerSheet == this._sheetName) {
            let columns, rows;
            [columns, rows] = [this._triggerRanges.columns, this._triggerRanges.rows];
            columns.forEach(function (cRange) {
                if ((cRange[0] <= this._column) && (this._column <= cRange[1])) {
                    foundColumn = true;
                }
            });
            rows.forEach(function (rRange) {
                if ((rRange[0] <= this._row) && (this._row <= rRange[1])) {
                    foundRow = true;
                }
            });
            if (foundColumn && foundRow)
                return true;
        }
        return false;
    }
    /**
     * Gets the value from the underlying sheet
     *
     * @param row the row of the cell
     * @param col the column of the cell
     *
     * @returns the value of the cell
     */
    getValue(row, col) {
        return this._sheet.getValue(row, col);
    }
    /**
   * Adds sheet to the trigger
   *
   * @param name
   */
    addSheetName(name) {
        if (name) {
            this._triggerSheet = name;
            return this;
        }
        else {
            throw new Error("Sheet name is not found in Spreadsheet.addSheetName");
        }
    }
    ;
    addTriggerColumnRange(min = 0, max = 0) {
        this.addTriggerRange(false, min, max);
        return this;
    }
    ;
    addTriggerRowRange(min = 0, max = 0) {
        this.addTriggerRange(true, min, max);
        return this;
    }
    ;
    addTriggerRange(forRow, min, max) {
        if (min instanceof Array) {
            for (var i = 0; i < min.length; i++) {
                if (max instanceof Array) {
                    for (var j = 0; j < max.length; j++) {
                        if (forRow)
                            this._triggerRanges.rows.push([min[i], max[j]]);
                        else
                            this._triggerRanges.columns.push([min[i], max[j]]);
                    }
                }
                else {
                    if (typeof max === "number") {
                        if (forRow)
                            this._triggerRanges.rows.push([min[i], max]);
                        else
                            this._triggerRanges.columns.push([min[i], max]);
                    }
                    else {
                        if (forRow)
                            this._triggerRanges.rows.push([min[i], min[i]]);
                        else
                            this._triggerRanges.columns.push([min[i], min[i]]);
                    }
                }
            }
        }
        else {
            if (typeof max === "number") {
                if (forRow)
                    this._triggerRanges.rows.push([min, max]);
                else
                    this._triggerRanges.columns.push([min, max]);
            }
            else {
                if (forRow)
                    this._triggerRanges.rows.push([min, min]);
                else
                    this._triggerRanges.columns.push([min, min]);
            }
        }
        return this;
    }
    ;
}
