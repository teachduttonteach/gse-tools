/**
 * Gets the data from a Google Sheet and provides an interface to it in an efficient way.
 *
 * @param {id} the id of the Google Sheet to use
 */
class SpreadsheetGS {
  _spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  _sheets: object = {};
  _menus: object = {};
  constructor();
  constructor(id: object);
  constructor(id: string);
  constructor(id: number);
  constructor(id?: any) {
    if ((id as undefined) || (id as string)) {
      id as object ? this._spreadsheet = id : this._spreadsheet = SpreadsheetApp.openById(id);
    } else {
      this._spreadsheet = SpreadsheetApp.getActive();
    }
  
    if (!(this._spreadsheet as undefined)) {
      if (!(this._sheets as undefined)) {
        //this._sheets = {"Stuff": "done"};
        //Logger.log(this._sheets);
        for (let s of this._spreadsheet.getSheets()) {
          this._sheets[s.getName()] = new SheetGS(s);
        }
        if (id as number) {
          return this._sheets[id];
        }
      } else {
        throw new Error("Sheet object not set");
      }
    } else {
      throw new Error("Could not find spreadsheet in Spreadsheet()");
    }
  }
  
  getDataAsObject = function(name: string = null, rowFirst: boolean = true) {
    let dataSheet: SheetGS = this.getOrCreateSheet(name);
    var data = {};
    if ((rowFirst as boolean) && rowFirst) {
      for (let r: number = 2; r <= dataSheet.getLastRow(); r++) {
        var rowData = {};
        for (let c: number = 2; c <= dataSheet.getLastColumn(); c++) {
          rowData[dataSheet.getValue(1, c)] = dataSheet.getValue(r, c);
        }
        data[dataSheet.getValue(r, 1)] = rowData;
      }
    } else {
      for (let c: number = 2; c <= dataSheet.getLastColumn(); c++) {
        var columnData = {};
        for (let r: number = 2; r <= dataSheet.getLastRow(); r++) {
          columnData[dataSheet.getValue(r, 1)] = dataSheet.getValue(r, c);
        }
        data[dataSheet.getValue(1, c)] = columnData;
      }
    }
    return data;
  };
  
  getOrCreateSheet = function(sheetName: string) {
    if (sheetName as string) {
      if (!this.hasSheet(sheetName)) {
        this.createSheet(sheetName);
      }
      return this.getSheet(sheetName);
    } else {
      throw new Error("Sheet name not defined in Spreadsheet.getOrCreateSheet");
    }
  };
  
  createSheet = function(sheetName: string): SheetGS {
    if (sheetName as string) {
      this._sheets[sheetName] = new SheetGS(this._spreadsheet.insertSheet(sheetName));
    } else {
      throw new Error("Sheet name not defined in Spreadsheet.createSheet");
    }
    return this._sheets[sheetName];
  };
  
  hasSheet = function(sheetName: string) {
    if (sheetName as string) {
      let sheet: GoogleAppsScript.Spreadsheet.Sheet = this._sheets[sheetName];
      if (sheet as undefined) return false;
      return true;
    } else {
      throw new Error("Sheet name not defined in Spreadsheet.hasSheet");
    }
  };
  
  getSheet = function(sheetName: string) {
    if ((sheetName as string) && (sheetName in this._sheets)) {
      var sheet = this._sheets[sheetName];
      if (sheet as string) {
        return sheet;
      } else {
        throw new Error("Could not find sheet named " + sheetName + " in Spreadsheet.getSheet");
      }
    } else {
      throw new Error("Sheet name not defined in Spreadsheet.getSheet");
    }
  };
  
  _ui: GoogleAppsScript.Base.Ui = SpreadsheetApp.getUi();
  addMenu = function(menuName: string, itemName: string, functionName: string) {
    if ((menuName as string) && (itemName as string) && (functionName as string)) {
      if (menuName in this._menus) {
        this._menus[menuName].addItem(itemName, functionName).addToUi();
      } else {
        this._menus[menuName] = this._ui.createMenu(menuName).addItem(itemName, functionName);
        this._menus[menuName].addToUi();
      }
      return this;
    } else {
      throw new Error("One of menuName, itemName or functionName is not defined in Spreadsheet.addMenu");
    }
  };
  
  _triggerRanges = {
    "columns": [],
    "rows": []
  };
  
  // Will triggers work in a library?
  addTrigger = function(triggerType: GoogleAppsScript.Script.EventType, sheetName: string, functionName: string) {
    if ((triggerType as GoogleAppsScript.Script.EventType) && (sheetName as string) && (functionName as string)) {
      let sheet: GoogleAppsScript.Spreadsheet.Spreadsheet = this._sheets[sheetName];
      if (sheet as GoogleAppsScript.Spreadsheet.Spreadsheet) {
        switch (triggerType) {
          case ScriptApp.EventType.ON_CHANGE:
            ScriptApp.newTrigger(functionName).forSpreadsheet(sheet).onChange().create();
          case ScriptApp.EventType.ON_EDIT:
            ScriptApp.newTrigger(functionName).forSpreadsheet(sheet).onEdit().create();
          case ScriptApp.EventType.ON_FORM_SUBMIT:
            ScriptApp.newTrigger(functionName).forSpreadsheet(sheet).onFormSubmit().create();
        }
        
        return this;
      } else {
        throw new Error("Sheet name is incorrect or not found in Spreadsheet.addTrigger");
      }
    } else {
      throw new Error("One of triggerType, sheetName or functionName is not defined in Spreadsheet.addTrigger");
    }
  };
  
  _triggerSheet = "";
  addSheetName = function(name: string) {
    if (name as string) {
      this._triggerSheet = name;
      return this;
    } else {
      throw new Error("Sheet name is not found in Spreadsheet.addSheetName");
    }
  };
  
  addTriggerColumnRange = function(min: number = 0, max: number = 0) {
    this.addTriggerRange("columns", min, max);
  };
  
  addTriggerRowRange = function(min: number = 0, max: number = 0) {
    this.addTriggerRange("rows", min, max);
  };
  
  addTriggerRange = function(type: string, min: any, max: any) {
    if (type as string) {
      if (min as Array<number>) {
        for (var i = 0; i < min.length; i++) {
          if (max as Array<number>) {
            for (var j = 0; j < max.length; j++) {
              this._triggerRanges[type].push([min[i], max[j]]);
            }
          } else {
            if (max as number) this._triggerRanges[type].push([min[i], max]);
            else this._triggerRanges[type].push([min[i], min[i]]);
          }
        }
      } else {
        if (max as number) this._triggerRanges[type].push([min, max]);
        else this._triggerRanges[type].push([min, min]);
      }
    } else {
      throw new Error("type needs to be defined in Spreadsheet.addRange");
    }   
    return this;
  };
}