import { SpreadsheetGS } from "./SpreadsheetGS"
import { SheetGS } from "./SheetGS"
import { TriggerRanges } from "./TriggerRanges"

/**
 * Class to process Spreadsheet events (like onEdit, onChange)
 * 
 */
export class SheetEventGS {
    private _sheet: SheetGS;
    private _sheetName: string;
    private _row: number;
    private _column: number;
    private _value: string | Date;
    private _triggerRanges: TriggerRanges;
    private _triggerSheet: string;
    private _event: GoogleAppsScript.Events.SheetsOnEdit;
    private _activeSheet: SpreadsheetGS;
    
    constructor(private event: GoogleAppsScript.Events.SheetsOnEdit) {
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
    getObject(): GoogleAppsScript.Events.SheetsOnEdit {
        return this._event;
    }

    getActiveSheet(): SpreadsheetGS {
        return this._activeSheet;
    }

    getSheetName(): string {
        return this._sheetName;
    }

    getSheet(): SheetGS {
        return this._sheet;
    }

    getRow(): number {
        return this._row;
    }

    getColumn(): number {
        return this._column;
    }

    getEditedValue(): string | Date {
        return this._value;
    }

    /**
     * Check to see if the cell is in the specified trigger range
     * 
     * @returns true or false
     */
    checkCell(): boolean {
        let foundCell: boolean = false, foundColumn: boolean = false, foundRow: boolean = false;
        if (this._triggerSheet == this._sheetName) {
            let columns: Array<Array<number>>, rows: Array<Array<number>>;
            [columns, rows] = [this._triggerRanges.columns, this._triggerRanges.rows];
            
            columns.forEach( function(cRange) {
                if ((cRange[0] <= this._column) && (this._column <= cRange[1])) {
                    foundColumn = true;
                }
            });

            rows.forEach( function(rRange) {
                if ((rRange[0] <= this._row) && (this._row <= rRange[1])) {
                    foundRow = true;
                }
            });

            if (foundColumn && foundRow) return true;
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
    getValue(row: number, col: number): string {
        return this._sheet.getValue(row, col);
    }

    /**
   * Adds sheet to the trigger
   * 
   * @param name 
   */
    addSheetName(name: string): SheetEventGS {
        if (name as string) {
            this._triggerSheet = name;
            return this;
        } else {
        throw new Error("Sheet name is not found in Spreadsheet.addSheetName");
        }
    };
  
    addTriggerColumnRange(min: number = 0, max: number = 0): SheetEventGS {
        this.addTriggerRange(false, min, max);
        return this;
    };
    
    addTriggerRowRange(min: number = 0, max: number = 0): SheetEventGS {
        this.addTriggerRange(true, min, max);
        return this;
    };
    
    addTriggerRange(forRow: boolean, min: any, max: any): SheetEventGS {
        if (min instanceof Array) {
            for (var i = 0; i < min.length; i++) {
                if (max instanceof Array) {
                    for (var j = 0; j < max.length; j++) {
                        if (forRow) this._triggerRanges.rows.push([min[i], max[j]]);
                        else this._triggerRanges.columns.push([min[i], max[j]]);
                    }
                } else {
                    if (typeof max === "number") {
                        if (forRow) this._triggerRanges.rows.push([min[i], max]);
                        else this._triggerRanges.columns.push([min[i], max]);
                    } else {
                        if (forRow) this._triggerRanges.rows.push([min[i], min[i]]); 
                        else this._triggerRanges.columns.push([min[i], min[i]]);
                    }
                }
            }
        } else {
            if (typeof max === "number") {
                if (forRow) this._triggerRanges.rows.push([min, max]);
                else this._triggerRanges.columns.push([min, max]);
            } else {
                if (forRow) this._triggerRanges.rows.push([min, min]);
                else this._triggerRanges.columns.push([min, min]);
            }
        }
        return this;
    };

}