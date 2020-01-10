import { SpreadsheetGS } from './SpreadsheetGS';
import { SheetGS } from './SheetGS';
import { TriggerRanges } from './TriggerRanges';

/**
 * Class to process Spreadsheet events (like onEdit, onChange)
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} event the underlying
 *  event object
 */
export function newSheetEvent(event: GoogleAppsScript.Events.SheetsOnEdit): SheetEventGS {
  return new SheetEventGS(event);
}

/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {GoogleAppsScript.Events.SheetsOnEdit} the Event object
 */
export function getSheetEventObject(obj: SheetEventGS): GoogleAppsScript.Events.SheetsOnEdit {
  return obj.getObject();
}

/**
 * Gets the active spreadsheet

 * @param {SheetEventGS} obj the SheetEvent object
 *
 * @return {SpreadsheetGS} the spreadsheet
 */
export function getSheetEventActiveSheet(obj: SheetEventGS): SpreadsheetGS {
  return obj.getActiveSheet();
}

/**
 * Gets the current sheet name
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {string} the sheet name
 */
export function getSheetEventSheetName(obj: SheetEventGS): string {
  return obj.getSheetName();
}

/**
 * Get the current sheet
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {SheetGS} the current sheet
 */
export function getSheetEventSheet(obj: SheetEventGS): SheetGS {
  return obj.getSheet();
}

/**
 * Get the current row
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {number} the current row
 */
export function getSheetEventRow(obj: SheetEventGS): number {
  return obj.getRow();
}

/**
 * Get the current column
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {number} the current column
 */
export function getSheetEventColumn(obj: SheetEventGS): number {
  return obj.getColumn();
}

/**
 * Get the value that has been edited
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {string | Date} the value
 */
export function getSheetEventEditedValue(obj: SheetEventGS): string | Date {
  return obj.getEditedValue();
}

/**
 * Check to see if the cell is in the specified trigger range
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @return {boolean} true if the cell is in the trigger range
 */
export function checkSheetEventCell(obj: SheetEventGS): boolean {
  return obj.checkCell();
}

/**
 * Gets the value from the underlying sheet
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} row the row of the cell
 * @param {number} col the column of the cell
 *
 * @return {string} the value of the cell
 */
export function getSheetEventValue(obj: SheetEventGS, row: number, col: number): string {
  return obj.getValue(row, col);
}

/**
 * Adds sheet to the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {string} name the name of the sheet
 * @return {SheetEventGS} the object for chaining
 */
export function addSheetEventTriggerSheetName(obj: SheetEventGS, name: string): SheetEventGS {
  return obj.addTriggerSheetName(name);
}

/**
 * Adds a column range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} min the first column
 * @param {number} max the last column
 * @return {SheetEventGS} the object for chaining
 */
export function addSheetEventTriggerColumnRange(obj: SheetEventGS, min: number = 0, max: number = 0): SheetEventGS {
  return obj.addTriggerColumnRange(min, max);
}

/**
 * Adds a row range for the trigger
 *
 * @param {SheetEventGS} obj the SheetEvent object
 * @param {number} min the first row
 * @param {number} max the last row
 * @return {SheetEventGS} the object for chaining
 */
export function addSheetEventTriggerRowRange(obj: SheetEventGS, min: number = 0, max: number = 0): SheetEventGS {
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
 * @return {SheetEventGS} the object for chaining
 */
export function addSheetEventTriggerRange(
  obj: SheetEventGS,
  forRow: boolean,
  min: number | Array<number>,
  max: number | Array<number>,
): SheetEventGS {
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
  private _event: GoogleAppsScript.Events.SheetsOnEdit;
  private _activeSheet: SpreadsheetGS;

  /**
   *
   * @param {GoogleAppsScript.Events.SheetsOnEdit} event the underlying
   *  event object
   */
  constructor(private event: GoogleAppsScript.Events.SheetsOnEdit) {
    const spreadsheet = new SpreadsheetGS(event.source.getActiveSheet().getParent());
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
   * @return {GoogleAppsScript.Events.SheetsOnEdit} the Event object
   */
  getObject(): GoogleAppsScript.Events.SheetsOnEdit {
    return this._event;
  }

  /**
   * Gets the active spreadsheet
   *
   * @return {SpreadsheetGS} the spreadsheet
   */
  getActiveSheet(): SpreadsheetGS {
    return this._activeSheet;
  }

  /**
   * Gets the current sheet name
   *
   * @return {string} the sheet name
   */
  getSheetName(): string {
    return this._sheetName;
  }

  /**
   * Get the current sheet
   *
   * @return {SheetGS} the current sheet
   */
  getSheet(): SheetGS {
    return this._sheet;
  }

  /**
   * Get the current row
   *
   * @return {number} the current row
   */
  getRow(): number {
    return this._row;
  }

  /**
   * Get the current column
   *
   * @return {number} the current column
   */
  getColumn(): number {
    return this._column;
  }

  /**
   * Get the value that has been edited
   *
   * @return {string | Date} the value
   */
  getEditedValue(): string | Date {
    return this._value;
  }

  /**
   * Check to see if the cell is in the specified trigger range
   *
   * @return {boolean} true if the cell is in the trigger range
   */
  checkCell(): boolean {
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
   * @return {string} the value of the cell
   */
  getValue(row: number, col: number): string {
    return this._sheet.getValue(row, col);
  }

  /**
   * Adds sheet to the trigger
   *
   * @param {string} name the name of the sheet
   * @return {SheetEventGS} the object for chaining
   */
  addTriggerSheetName(name: string): SheetEventGS {
    if (name as string) {
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
   * @return {SheetEventGS} the object for chaining
   */
  addTriggerColumnRange(min: number = 0, max: number = 0): SheetEventGS {
    this.addTriggerRange(false, min, max);
    return this;
  }

  /**
   * Adds a row range for the trigger
   *
   * @param {number} min the first row
   * @param {number} max the last row
   * @return {SheetEventGS} the object for chaining
   */
  addTriggerRowRange(min: number = 0, max: number = 0): SheetEventGS {
    this.addTriggerRange(true, min, max);
    return this;
  }

  /**
   * Adds a range for the trigger
   *
   * @param {boolean} forRow true if the range is for rows
   * @param {number | Array<number>} min the minimum row/column, or list of
   *  rows or columns
   * @param {number | Array<number>} max the maximum row/column, or list of
   *  rows or columns
   * @return {SheetEventGS} the object for chaining
   */
  addTriggerRange(forRow: boolean, min: number | Array<number>, max: number | Array<number>): SheetEventGS {
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
