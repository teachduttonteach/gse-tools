import { UiGS } from "../UiGS"
import { SheetGS } from "./SheetGS"
import { MapGS } from "../MapGS"

/**
 * Gets the data from a Google Sheet and provides an interface to it in an efficient way.
 *
 */
export class SpreadsheetGS extends UiGS {
  private _spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  private _sheets: GoogleAppsScript.Spreadsheet.Sheet[];
  _ui: GoogleAppsScript.Base.Ui;  

  /**
   *  
   * @param id the id of the Google Sheet to use
   */
  constructor();
  constructor(id: GoogleAppsScript.Spreadsheet.Spreadsheet);
  constructor(id: string);
  constructor(id?: any) {
    super();
    if (typeof id === "object") this._spreadsheet = id;
    else if (typeof id === "string") this._spreadsheet = SpreadsheetApp.openById(id);
    else this._spreadsheet = SpreadsheetApp.getActive();

    this._sheets = this._spreadsheet.getSheets();
    if (this._spreadsheet == null) throw new Error("Could not find spreadsheet in SpreadsheetGS()");
    if (this._sheets == null) throw new Error("Sheet object not set");
    for (let s of this._spreadsheet.getSheets()) {
      let t_sheet: string = s.getName();
      if (t_sheet == undefined) throw new Error("Sheet not defined in SpreadsheetGS()");
      (this._sheets as { [key: string]: any })[t_sheet] = new SheetGS(s);
    }
    if (typeof id === "number") this._sheets[id];
  }

  activateUi(): SpreadsheetGS {
    this._ui = SpreadsheetApp.getUi();
    return this;
  }

  /**
   * Gets the underlying Google Apps Script object for direct access
   * 
   * @returns the Spreadsheet object
   */
  getObject(): GoogleAppsScript.Spreadsheet.Spreadsheet {
    return this._spreadsheet;
  }
  
  /**
   * Get the data from the Spreadsheet as an object with rows (or columns) as the keys and columns (or rows) as the values
   * 
   * @param sheetName the sheet name
   * @param rowFirst if true, rows will be the keys and columns will be in the values along with the value found at that cell
   * 
   * @returns the data object
   */
  getMapData(sheetName: string, rowFirst: boolean = true): MapGS<string | Date, MapGS<string | Date, string | Date>> {
    return this.getOrCreateSheet(sheetName).getMapData(rowFirst);
  };
  
  /**
   * Gets the named sheet or creates it if it doesn't exist
   *  
   * @param sheetName the name of the sheet
   * 
   * @returns the specified sheet
   */
  getOrCreateSheet(sheetName: string): SheetGS {
    if (sheetName == null) throw new Error("Sheet name not defined in Spreadsheet.getOrCreateSheet");
    if (!this.hasSheet(sheetName)) {
      this.createSheet(sheetName);
    }
    return this.getSheet(sheetName);
  };
  
  /**
   * Create a new sheet in the Spreadsheet
   * 
   * @param sheetName the name of the sheet to create
   * 
   * @returns the new sheet
   */
  createSheet(sheetName: string): SheetGS {
    if (sheetName == null) throw new Error("Sheet name not defined in Spreadsheet.createSheet");
    (this._sheets as { [key: string]: any})[sheetName] = new SheetGS(this._spreadsheet.insertSheet(sheetName));
    return (this._sheets as { [key: string]: any})[sheetName];
  };
  
  /**
   * Checks to see if the Spreadsheet has a named sheet
   * 
   * @param sheetName the sheet name requested
   * 
   * @returns true if it has the named sheet
   */
  hasSheet(sheetName: string): boolean {
    if (sheetName == null) throw new Error("Sheet name not defined in Spreadsheet.hasSheet");
    let sheet: GoogleAppsScript.Spreadsheet.Sheet = (this._sheets as {[key: string]: any})[sheetName];
    if (sheet == null) return false;
    return true;
  };
  
  /**
   * Gets the named sheet
   * 
   * @param sheetName the name of the sheet to get
   * 
   * @returns the requested sheet
   */
  getSheet(sheetName: string): SheetGS {
    if ((sheetName == null) || !(sheetName in this._sheets)) throw new Error("Sheet name not defined in Spreadsheet.getSheet");
    let sheet: SheetGS = (this._sheets as {[key: string]: any})[sheetName];
    if (sheet == null) throw new Error("Could not find sheet named " + sheetName + " in Spreadsheet.getSheet");
    return sheet;
  };
  
  /**
   * Adds a trigger for this Spreadsheet
   * 
   * @param triggerType the type of trigger to add, from Script.EventType
   * @param sheetName the name of the sheet
   * @param functionName the name of the function to call
   * 
   * @returns the Spreadsheet object for chaining
   */
  addTrigger(triggerType: GoogleAppsScript.Script.EventType, sheetName: string, functionName: string): SpreadsheetGS {
    if ((triggerType == null) || (sheetName == null) || (functionName == null)) throw new Error("One of triggerType, sheetName or functionName is not defined in Spreadsheet.addTrigger");
    let sheet: GoogleAppsScript.Spreadsheet.Spreadsheet = (this._sheets as {[key: string]: any})[sheetName];
    if (sheet == null) throw new Error("Sheet name is incorrect or not found in Spreadsheet.addTrigger");
    switch (triggerType) {
      case ScriptApp.EventType.ON_CHANGE:
        ScriptApp.newTrigger(functionName).forSpreadsheet(sheet).onChange().create();
      case ScriptApp.EventType.ON_EDIT:
        ScriptApp.newTrigger(functionName).forSpreadsheet(sheet).onEdit().create();
      case ScriptApp.EventType.ON_FORM_SUBMIT:
        ScriptApp.newTrigger(functionName).forSpreadsheet(sheet).onFormSubmit().create();
    }
    return this;
  };  
}