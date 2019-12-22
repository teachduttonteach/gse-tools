"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UiGS_1 = require("./UiGS");
var SheetGS_1 = require("./SheetGS");
/**
 * Gets the data from a Google Sheet and provides an interface to it in an efficient way.
 *
 */
var SpreadsheetGS = /** @class */ (function (_super) {
    __extends(SpreadsheetGS, _super);
    function SpreadsheetGS(id) {
        var _this = _super.call(this) || this;
        _this._ui = SpreadsheetApp.getUi();
        if ((id == null) || (typeof id === "string")) {
            typeof id === "object" ? _this._spreadsheet = id : _this._spreadsheet = SpreadsheetApp.openById(id);
        }
        else {
            _this._spreadsheet = SpreadsheetApp.getActive();
        }
        _this._sheets = _this._spreadsheet.getSheets();
        if (_this._spreadsheet) {
            if (_this._sheets) {
                //this._sheets = {"Stuff": "done"};
                //Logger.log(this._sheets);
                for (var _i = 0, _a = _this._spreadsheet.getSheets(); _i < _a.length; _i++) {
                    var s = _a[_i];
                    var t_sheet = s.getName();
                    if (t_sheet == undefined)
                        throw new Error("Sheet not defined in SpreadsheetGS()");
                    _this._sheets[t_sheet] = new SheetGS_1.SheetGS(s);
                }
                if (typeof id === "number") {
                    _this._sheets[id];
                }
            }
            else {
                throw new Error("Sheet object not set");
            }
        }
        else {
            throw new Error("Could not find spreadsheet in Spreadsheet()");
        }
        return _this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Spreadsheet object
     */
    SpreadsheetGS.prototype.getObject = function () {
        return this._spreadsheet;
    };
    /**
     * Get the data from the Spreadsheet as an object with rows (or columns) as the keys and columns (or rows) as the values
     *
     * @param sheetName the sheet name
     * @param rowFirst if true, rows will be the keys and columns will be the values
     *
     * @returns the data object
     */
    SpreadsheetGS.prototype.getDataAsObject = function (sheetName, rowFirst) {
        if (rowFirst === void 0) { rowFirst = true; }
        var dataSheet = this.getOrCreateSheet(sheetName);
        var data = new Map();
        if (rowFirst) {
            for (var r = 2; r <= dataSheet.getLastRow(); r++) {
                var rowData = new Map();
                for (var c = 2; c <= dataSheet.getLastColumn(); c++) {
                    rowData.set(dataSheet.getValue(1, c), dataSheet.getValue(r, c));
                }
                data.set(dataSheet.getValue(r, 1), rowData);
            }
        }
        else {
            for (var c = 2; c <= dataSheet.getLastColumn(); c++) {
                var columnData = new Map();
                for (var r = 2; r <= dataSheet.getLastRow(); r++) {
                    columnData.set(dataSheet.getValue(r, 1), dataSheet.getValue(r, c));
                }
                data.set(dataSheet.getValue(1, c), columnData);
            }
        }
        return data;
    };
    ;
    /**
     * Gets the named sheet or creates it if it doesn't exist
     *
     * @param sheetName the name of the sheet
     *
     * @returns the specified sheet
     */
    SpreadsheetGS.prototype.getOrCreateSheet = function (sheetName) {
        if (sheetName) {
            if (!this.hasSheet(sheetName)) {
                this.createSheet(sheetName);
            }
            return this.getSheet(sheetName);
        }
        else {
            throw new Error("Sheet name not defined in Spreadsheet.getOrCreateSheet");
        }
    };
    ;
    /**
     * Create a new sheet in the Spreadsheet
     *
     * @param sheetName the name of the sheet to create
     *
     * @returns the new sheet
     */
    SpreadsheetGS.prototype.createSheet = function (sheetName) {
        if (sheetName) {
            this._sheets[sheetName] = new SheetGS_1.SheetGS(this._spreadsheet.insertSheet(sheetName));
        }
        else {
            throw new Error("Sheet name not defined in Spreadsheet.createSheet");
        }
        return this._sheets[sheetName];
    };
    ;
    /**
     * Checks to see if the Spreadsheet has a named sheet
     *
     * @param sheetName the sheet name requested
     *
     * @returns true if it has the named sheet
     */
    SpreadsheetGS.prototype.hasSheet = function (sheetName) {
        if (sheetName) {
            var sheet = this._sheets[sheetName];
            if (sheet == null)
                return false;
            return true;
        }
        else {
            throw new Error("Sheet name not defined in Spreadsheet.hasSheet");
        }
    };
    ;
    /**
     * Gets the named sheet
     *
     * @param sheetName the name of the sheet to get
     *
     * @returns the requested sheet
     */
    SpreadsheetGS.prototype.getSheet = function (sheetName) {
        if (sheetName && (sheetName in this._sheets)) {
            var sheet = this._sheets[sheetName];
            if (sheet == null) {
                throw new Error("Could not find sheet named " + sheetName + " in Spreadsheet.getSheet");
            }
            else {
                return sheet;
            }
        }
        else {
            throw new Error("Sheet name not defined in Spreadsheet.getSheet");
        }
    };
    ;
    /**
     * Adds a trigger for this Spreadsheet
     *
     * @param triggerType the type of trigger to add, from Script.EventType
     * @param sheetName the name of the sheet
     * @param functionName the name of the function to call
     *
     * @returns the Spreadsheet object for chaining
     */
    SpreadsheetGS.prototype.addTrigger = function (triggerType, sheetName, functionName) {
        if (triggerType && sheetName && functionName) {
            var sheet = this._sheets[sheetName];
            if (sheet) {
                switch (triggerType) {
                    case ScriptApp.EventType.ON_CHANGE:
                        ScriptApp.newTrigger(functionName).forSpreadsheet(sheet).onChange().create();
                    case ScriptApp.EventType.ON_EDIT:
                        ScriptApp.newTrigger(functionName).forSpreadsheet(sheet).onEdit().create();
                    case ScriptApp.EventType.ON_FORM_SUBMIT:
                        ScriptApp.newTrigger(functionName).forSpreadsheet(sheet).onFormSubmit().create();
                }
                return this;
            }
            else {
                throw new Error("Sheet name is incorrect or not found in Spreadsheet.addTrigger");
            }
        }
        else {
            throw new Error("One of triggerType, sheetName or functionName is not defined in Spreadsheet.addTrigger");
        }
    };
    ;
    return SpreadsheetGS;
}(UiGS_1.UiGS));
exports.SpreadsheetGS = SpreadsheetGS;
