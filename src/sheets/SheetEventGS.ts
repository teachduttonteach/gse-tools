import { SpreadsheetGS } from './SpreadsheetGS';
import { SheetGS } from './SheetGS';
import { TriggerRanges } from './TriggerRanges';
import { MapGS } from '../map/MapGS';

/**
 * Class to process Spreadsheet events (like onEdit, onChange)
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} event the underlying
 *  event object
 */
export function newSheetEvent(event: GoogleAppsScript.Events.SheetsOnEdit | 
  GoogleAppsScript.Events.SheetsOnChange | 
  GoogleAppsScript.Events.SheetsOnFormSubmit | 
  GoogleAppsScript.Events.SheetsOnOpen): SheetEventGS {
  return new SheetEventGS(event);
}

/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {GoogleAppsScript.Events.SheetsOnEdit | 
  GoogleAppsScript.Events.SheetsOnChange | 
  GoogleAppsScript.Events.SheetsOnFormSubmit | 
  GoogleAppsScript.Events.SheetsOnOpen} the Event object
 */
export function getSheetEventObject(obj: SheetEventGS): 
  GoogleAppsScript.Events.SheetsOnEdit | 
  GoogleAppsScript.Events.SheetsOnChange | 
  GoogleAppsScript.Events.SheetsOnFormSubmit | 
  GoogleAppsScript.Events.SheetsOnOpen {
    return obj.getObject();
}

/**
 * Gets the active spreadsheet

 * @param {SheetEventGS} obj the SheetEvent object
 *
 * @return {SpreadsheetGS} the spreadsheet, or undefined if the event does not
 *  refer to a spreadsheet
 */
export function getSheetEventActiveSheet(obj: SheetEventGS): 
  SpreadsheetGS | undefined {
  return obj.getActiveSheet();
}

/**
 * Gets the current sheet name
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {string | undefined} the sheet name, or undefined if the event
 *  does not refer to a sheet
 */
export function getSheetEventSheetName(obj: SheetEventGS): string | undefined {
  return obj.getSheetName();
}

/**
 * Get the current sheet
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {SheetGS | undefined} the current sheet, or undefined if the event
 *  does not have an associated sheet
 */
export function getSheetEventSheet(obj: SheetEventGS): SheetGS | undefined {
  return obj.getSheet();
}

/**
 * Get the current row
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {number | undefined} the current row, or undefined if the event has 
 *  no sheet
 */
export function getSheetEventRow(obj: SheetEventGS): number | undefined {
  return obj.getRow();
}

/**
 * Get the current column
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {number | undefined} the current column, or undefined if the event 
 *  has no sheet
 */
export function getSheetEventColumn(obj: SheetEventGS): number | undefined {
  return obj.getColumn();
}

/**
 * Get the value that has been edited
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {string | Date | undefined} the value, or undefined if the event 
 *  has no value
 */
export function getSheetEventEditedValue(obj: SheetEventGS): 
  string | Date | undefined {
  return obj.getEditedValue();
}

/**
 * Check to see if the cell is in the specified trigger range
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {boolean | undefined} true if the cell is in the trigger range, or 
 *  undefined if the event has no sheet
 */
export function checkSheetEventCell(obj: SheetEventGS): boolean | undefined {
  return obj.checkCell();
}

/**
 * Gets the value from the underlying sheet
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} row the row of the cell
 * @param {number} col the column of the cell
 *
 * @return {string | undefined} the value of the cell, or undefined if the 
 *  event has no sheet
 */
export function getSheetEventValue(obj: SheetEventGS, row: number, 
  col: number): string | Date | undefined {
  return obj.getValue(row, col);
}

/**
 * Adds sheet to the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {string} name the name of the sheet
 * @return {SheetEventGS | undefined} the object for chaining, or undefined if 
 *  the event has no sheet
 */
export function addSheetEventTriggerSheetName(obj: SheetEventGS, name: string):
  SheetEventGS | undefined {
  return obj.addTriggerSheetName(name);
}

/**
 * Adds a column range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} min the first column
 * @param {number} max the last column
 * @return {SheetEventGS | undefined} the object for chaining, or undefined if 
 *  the event has no sheet
 */
export function addSheetEventTriggerColumnRange(obj: SheetEventGS, 
  min: number = 0, max: number = 0): SheetEventGS | undefined {
  return obj.addTriggerColumnRange(min, max);
}

/**
 * Adds a row range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} min the first row
 * @param {number} max the last row
 * @return {SheetEventGS | undefined} the object for chaining, or undefined if 
 *  the event has no sheet
 */
export function addSheetEventTriggerRowRange(obj: SheetEventGS, 
  min: number = 0, max: number = 0): SheetEventGS | undefined {
  return obj.addTriggerRowRange(min, max);
}

/**
 * Adds a range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {boolean} forRow true if the range is for rows
 * @param {number | Array<number>} min the minimum row/column, or list of
 *  rows or columns
 * @param {number | Array<number>} max the maximum row/column, or list of
 *  rows or columns
 * @return {SheetEventGS | undefined} the object for chaining, or undefined if 
 *  the event has no sheet
 */
export function addSheetEventTriggerRange(
  obj: SheetEventGS,
  forRow: boolean,
  min: number | Array<number>,
  max: number | Array<number>,
): SheetEventGS | undefined {
  return obj.addTriggerRange(forRow, min, max);
}

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
  private _namedValues: {[key: string]: Array<string>};
  private _event: GoogleAppsScript.Events.SheetsOnEdit | 
    GoogleAppsScript.Events.SheetsOnChange | 
    GoogleAppsScript.Events.SheetsOnFormSubmit |
    GoogleAppsScript.Events.SheetsOnOpen;
  private _activeSheet: SpreadsheetGS;

  /**
   *
   * @param {GoogleAppsScript.Events.SheetsOnEdit | 
   * GoogleAppsScript.Events.SheetsOnChange | 
   * GoogleAppsScript.Events.SheetsOnFormSubmit |
   * GoogleAppsScript.Events.SheetsOnOpen} event the underlying
   *  event object
   */
  constructor(private event: GoogleAppsScript.Events.SheetsOnEdit | 
    GoogleAppsScript.Events.SheetsOnChange | 
    GoogleAppsScript.Events.SheetsOnFormSubmit | 
    GoogleAppsScript.Events.SheetsOnOpen) {

    if ("source" in event) {
      const spreadsheet = new SpreadsheetGS(event.source.getActiveSheet().getParent());
      this._sheet = spreadsheet.getSheet(event.source.getActiveSheet().getName());
      this._sheetName = event.source.getActiveSheet().getName();
      this._activeSheet = spreadsheet;
    }

    if ("range" in event) {
      this._row = event.range.getRow();
      this._column = event.range.getColumn();
      this._value = event.range.getValue();
    }

    if ("namedValues" in event) {
      this._namedValues = event.namedValues;
    }

    this._event = event;    
  }

  /**
   * Gets the underlying Google Apps Script object for direct access
   *
   * @return {GoogleAppsScript.Events.SheetsOnEdit | 
    GoogleAppsScript.Events.SheetsOnChange | 
    GoogleAppsScript.Events.SheetsOnFormSubmit | 
    GoogleAppsScript.Events.SheetsOnOpen} the Event object
   */
  getObject(): GoogleAppsScript.Events.SheetsOnEdit | 
  GoogleAppsScript.Events.SheetsOnChange | 
  GoogleAppsScript.Events.SheetsOnFormSubmit | 
  GoogleAppsScript.Events.SheetsOnOpen {
    return this._event;
  }

  /**
   * Gets the active spreadsheet
   *
   * @return {SpreadsheetGS | undefined} the spreadsheet, or undefined if the
   *  event is not associated with a spreadsheet
   */
  getActiveSheet(): SpreadsheetGS | undefined {
    if (this._activeSheet !== undefined) return this._activeSheet;
    console.log("WARNING: No active sheet for this event in SheetEventGS.getActiveSheet()");
    return undefined;
  }

  /**
   * Gets the current sheet name
   *
   * @return {string | undefined} the sheet name, or undefined if the event
   *  is not associated with a sheet
   */
  getSheetName(): string | undefined {
    if (this._sheetName !== undefined) return this._sheetName;
    console.log("WARNING: No sheet name for this event in SheetEventGS.getSheetName()");
    return undefined;
  }

  /**
   * Get the current sheet
   *
   * @return {SheetGS | undefined} the current sheet, or undefined if the 
   *  event is not associated with a sheet
   */
  getSheet(): SheetGS | undefined {
    if (this._sheet !== undefined) return this._sheet;
    console.log("WARNING: No sheet for this event in SheetEventGS.getSheet()");
    return undefined;
  }

  /**
   * Get the current row
   *
   * @return {number | undefined} the current row, or undefined if the event
   *  has no row
   */
  getRow(): number | undefined {
    if (this._row !== undefined) return this._row;
    console.log("WARNING: No row for this event in SheetEventGS.getRow()");
    return undefined;
  }

  /**
   * Get the current column
   *
   * @return {number | undefined} the current column, or undefined if the 
   *    event has no column
   */
  getColumn(): number | undefined {
    if (this._column !== undefined) return this._column;
    console.log("WARNING: No sheet name for this event in SheetEventGS.getColumn()");
    return undefined;
  }

  getValuesAsMap(): MapGS<string, Array<string>> {
    let thisValues = new MapGS<string, Array<string>>();
    for (let key in this._namedValues) {
      thisValues.set(key, this._namedValues[key]);
    }
    return thisValues;
  }

  /**
   * Get the value that has been edited
   *
   * @return {string | Date | undefined} the value, or undefined if the
   *  event has no value
   */
  getEditedValue(): string | Date | undefined {
    if (this._value !== undefined) return this._value;
    console.log("WARNING: No value for this event in SheetEventGS.getEditedValue()");
    return undefined;
  }

  /**
   * Check to see if the cell is in the specified trigger range
   *
   * @return {boolean | undefined} true if the cell is in the trigger range,
   *  undefined if the event has no associated sheet
   */
  checkCell(): boolean | undefined {
    if ((this._triggerSheet === undefined) || 
      (this._sheetName === undefined)) {
      console.log("WARNING: No associated sheet for this event in " +
        "SheetEventGS.checkCell()");
      return undefined;
    }

    let foundColumn: boolean = false;
    let foundRow: boolean = false;
    if (this._triggerSheet == this._sheetName) {
      const [columns, rows] = [this._triggerRanges.columns, this._triggerRanges.rows];

      for (const c of columns) {
        if (c[0] <= this._column && this._column <= c[1]) {
          foundColumn = true;
        }
      }

      for (const r of rows) {
        if (r[0] <= this._row && this._row <= r[1]) {
          foundRow = true;
        }
      }

      if (foundColumn && foundRow) return true;
    }
    return false;
  }

  /**
   * Gets the value from the underlying sheet
   *
   * @param {number} row the row of the cell
   * @param {number} col the column of the cell
   *
   * @return {string | undefined} the value of the cell, or undefined if the
   *  event does not refer to a cell
   */
  getValue(row: number, col: number): string | Date | undefined {
    if (this._sheet !== undefined) return this._sheet.getValue(row, col);
    console.log("WARNING: No sheet associated with this event in SheetEventGS.getValue()");
    return undefined;
  }

  /**
   * Adds sheet to the trigger
   *
   * @param {string} name the name of the sheet
   * @return {SheetEventGS | undefined} the object for chaining, or undefined
   *  if the event does not have an associated sheet
   */
  addTriggerSheetName(name: string): SheetEventGS | undefined {
    if (this._activeSheet === undefined) {
      console.log("WARNING: No sheet associated with this event in SheetEventGS.addTriggerSheetName()");
      return undefined;
    }

    if (this._activeSheet.hasSheet(name)) {
      this._triggerSheet = name;
      return this;
    } else {
      throw new Error('Sheet name is not found in Spreadsheet.addSheetName');
    }
  }

  /**
   * Adds a column range for the trigger
   *
   * @param {number} min the first column
   * @param {number} max the last column
   * @return {SheetEventGS | undefined} the object for chaining, or undefined
   *  if there is no associated range
   */
  addTriggerColumnRange(min: number = 0, max: number = 0): 
    SheetEventGS | undefined {
    return this.addTriggerRange(false, min, max);
  }

  /**
   * Adds a row range for the trigger
   *
   * @param {number} min the first row
   * @param {number} max the last row
   * @return {SheetEventGS | undefined} the object for chaining, or undefined
   *  if there is no associated range
   */
  addTriggerRowRange(min: number = 0, max: number = 0): 
    SheetEventGS | undefined {
    return this.addTriggerRange(true, min, max);
  }

  /**
   * Adds a range for the trigger
   *
   * @param {boolean} forRow true if the range is for rows
   * @param {number | Array<number>} min the minimum row/column, or list of
   *  rows or columns
   * @param {number | Array<number>} max the maximum row/column, or list of
   *  rows or columns
   * @return {SheetEventGS | undefined} the object for chaining, or undefined
   *  if there is no associated range
   */
  addTriggerRange(forRow: boolean, min: number | Array<number>, 
      max: number | Array<number>): SheetEventGS | undefined {

    if (this._triggerRanges === undefined) {
      console.log("WARNING: No trigger ranges associated with this event in " +
      "SheetEventGS.addTriggerRange()");
      return undefined;
    }

    if (min instanceof Array) {
      for (let i = 0; i < min.length; i++) {
        if (max instanceof Array) {
          for (let j = 0; j < max.length; j++) {
            if (forRow) this._triggerRanges.rows.push([min[i], max[j]]);
            else this._triggerRanges.columns.push([min[i], max[j]]);
          }
        } else {
          if (typeof max === 'number') {
            if (forRow) this._triggerRanges.rows.push([min[i], max]);
            else this._triggerRanges.columns.push([min[i], max]);
          } else {
            if (forRow) this._triggerRanges.rows.push([min[i], min[i]]);
            else this._triggerRanges.columns.push([min[i], min[i]]);
          }
        }
      }
    } else {
      if (typeof max === 'number') {
        if (forRow) this._triggerRanges.rows.push([min, max]);
        else this._triggerRanges.columns.push([min, max]);
      } else {
        if (forRow) this._triggerRanges.rows.push([min, min]);
        else this._triggerRanges.columns.push([min, min]);
      }
    }
    return this;
  }
}
