import { UiGS } from '../UiGS';
import { SheetGS } from './SheetGS';
/**
 * Gets the data from a Google Sheet and provides an interface to it in an
 *  efficient way.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet | string | any} id the ID
 *  of the spreadsheet or the Sheet object itself
 * @param {string} sheetName if only one sheet is desired, specify it here
 * @return {SpreadsheetGS} the Spreadsheet object
 */
export function newSpreadsheet(id, sheetName) {
    return new SpreadsheetGS(id, sheetName);
}
/**
 * Activate the UI for the spreadsheet
 *
 * @param {SpreadsheetGS} obj the Spreadsheet object
 * @return {SpreadsheetGS} the object for chaining
 */
export function activateSpreadsheetUi(obj) {
    return obj.activateUi();
}
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SpreadsheetGS} obj the Spreadsheet object
 * @return {GoogleAppsScript.Spreadsheet.Spreadsheet} the Spreadsheet object
 */
export function getSpreadsheetObject(obj) {
    return obj.getObject();
}
/**
 * Get the data from the Spreadsheet as an object with rows (or columns) as
 *  the keys and columns (or rows) as the values
 *
 * @param {SpreadsheetGS} obj the Spreadsheet object
 * @param {string} sheetName the sheet name
 * @param {boolean} rowFirst if true, rows will be the keys and columns
 *  will be in the values along with the value found at that cell
 *
 * @return {Map<string | Date, Map<string | Date, string | Date>>} the
 *  data object
 */
export function getSpreadsheetDataAsMap(obj, sheetName, rowFirst = true) {
    return obj.getDataAsMap(sheetName, rowFirst);
}
/**
 * Gets the named sheet or creates it if it doesn't exist
 *
 * @param {SpreadsheetGS} obj the Spreadsheet object
 * @param {string} sheetName the name of the sheet
 * @return {SheetGS} the specified sheet
 */
export function getOrCreateSheet(obj, sheetName) {
    return obj.getOrCreateSheet(sheetName);
}
/**
 * Create a new sheet in the Spreadsheet
 *
 * @param {SpreadsheetGS} obj the Spreadsheet object
 * @param {string} sheetName the name of the sheet to create
 *
 * @return {SheetGS} the new sheet
 */
export function createSheet(obj, sheetName) {
    return obj.createSheet(sheetName);
}
/**
 * Checks to see if the Spreadsheet has a named sheet
 *
 * @param {SpreadsheetGS} obj the Spreadsheet object
 * @param {string} sheetName the sheet name requested
 * @return {boolean} true if it has the named sheet
 */
export function hasSheet(obj, sheetName) {
    return obj.hasSheet(sheetName);
}
/**
 * Gets the named sheet
 *
 * @param {SpreadsheetGS} obj the Spreadsheet object
 * @param {string} sheetName the name of the sheet to get
 *
 * @return {SheetGS} the requested sheet
 */
export function getSheet(obj, sheetName) {
    return obj.getSheet(sheetName);
}
/**
 * Adds a trigger for this Spreadsheet
 *
 * @param {SpreadsheetGS} obj the Spreadsheet object
 * @param {string} sheetName the name of the sheet
 * @param {GoogleAppsScript.Script.EventType | string} triggerType the type
 *  of trigger to add, from Script.EventType; or, 'Edit', 'Change'
 *  or 'Submit'
 * @param {string} functionName the name of the function to call on trigger
 *
 * @return {SpreadsheetGS} the Spreadsheet object for chaining
 */
export function addSpreadsheetTrigger(obj, sheetName, triggerType, functionName) {
    return obj.addTrigger(triggerType, functionName);
}
/**
 * Update triggers for a particular form
 *
 * @param {SpreadsheetGS} obj the Forms object
 * @param {string} sheetName the name of the sheet
 * @param {GoogleAppsScript.Script.EventType | string} triggerType the type
 *  of trigger to add, from Script.EventType; or, 'Edit', 'Change'
 *  or 'Submit'
 * @param {string} functionName the name of the function to call on trigger
 * @return {SpreadsheetGS} the object for chaining
 */
export function replaceSpreadsheetTrigger(obj, sheetName, triggerType, functionName) {
    return obj.replaceTrigger(sheetName, triggerType, functionName);
}
/**
 * Delete triggers for a particular function
 *
 * @param {SpreadsheetGS} obj the Forms object
 * @param {string} functionName the name of the function to call on trigger
 * @return {SpreadsheetGS} the object for chaining
 */
export function deleteSpreadsheetTriggers(obj, functionName) {
    return obj.deleteTriggers(functionName);
}
/**
 * Gets the data from a Google Sheet and provides an interface to it in an
 *  efficient way.
 *
 */
export class SpreadsheetGS extends UiGS {
    /**
     *
     * @param {GoogleAppsScript.Spreadsheet.Spreadsheet | string | any | undefined} id the id of the Google Sheet to use
     * @param {string} sheetName if only one sheet is desired, specify it here
     */
    constructor(id, sheetName) {
        super();
        if (typeof id === 'object')
            this._spreadsheet = id;
        else if (typeof id === 'string') {
            this._spreadsheet = SpreadsheetApp.openById(id);
        }
        else
            this._spreadsheet = SpreadsheetApp.getActive();
        this._sheets = this._spreadsheet.getSheets();
        if (this._spreadsheet == null) {
            throw new Error('Could not find spreadsheet in SpreadsheetGS()');
        }
        if (this._sheets == null)
            throw new Error('Sheet object not set');
        if (sheetName !== undefined) {
            const thisSheet = this._spreadsheet.getSheetByName(sheetName);
            if (thisSheet === null) {
                throw new Error('Sheet "' + sheetName + '" not defined in SpreadsheetGS()');
            }
            this._sheets[sheetName] = new SheetGS(thisSheet);
        }
        else {
            for (const thisSheet of this._spreadsheet.getSheets()) {
                const sheetName = thisSheet.getName();
                if (sheetName == undefined) {
                    throw new Error('Sheet not defined in SpreadsheetGS()');
                }
                this._sheets[sheetName] = new SheetGS(thisSheet);
            }
        }
        if (typeof id === 'number')
            this._sheets[id];
    }
    /**
     * Activate the UI for the spreadsheet
     *
     * @return {SpreadsheetGS} the object for chaining
     */
    activateUi() {
        this._ui = SpreadsheetApp.getUi();
        return this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Spreadsheet.Spreadsheet} the Spreadsheet object
     */
    getObject() {
        return this._spreadsheet;
    }
    /**
     * Get the data from the Spreadsheet as an object with rows (or columns) as
     *  the keys and columns (or rows) as the values
     *
     * @param {string} sheetName the sheet name
     * @param {boolean} rowFirst if true, rows will be the keys and columns
     *  will be in the values along with the value found at that cell
     *
     * @return {Map<string | Date, Map<string | Date, string | Date>>} the
     *  data object
     */
    getDataAsMap(sheetName, rowFirst = true) {
        return this.getOrCreateSheet(sheetName).getDataAsMap(rowFirst);
    }
    /**
     * Gets the named sheet or creates it if it doesn't exist
     *
     * @param {string} sheetName the name of the sheet
     *
     * @return {SheetGS} the specified sheet
     */
    getOrCreateSheet(sheetName) {
        if (sheetName == null) {
            throw new Error('Sheet name not defined in ' + 'Spreadsheet.getOrCreateSheet');
        }
        if (!this.hasSheet(sheetName))
            this.createSheet(sheetName);
        return this.getSheet(sheetName);
    }
    /**
     * Create a new sheet in the Spreadsheet
     *
     * @param {string} sheetName the name of the sheet to create
     *
     * @return {SheetGS} the new sheet
     */
    createSheet(sheetName) {
        if (sheetName == null) {
            throw new Error('Sheet name not defined in ' + 'Spreadsheet.createSheet');
        }
        this._sheets[sheetName] = new SheetGS(this._spreadsheet.insertSheet(sheetName));
        return this._sheets[sheetName];
    }
    /**
     * Checks to see if the Spreadsheet has a named sheet
     *
     * @param {string} sheetName the sheet name requested
     *
     * @return {boolean} true if it has the named sheet
     */
    hasSheet(sheetName) {
        if (sheetName == null) {
            throw new Error('Sheet name not defined in ' + 'Spreadsheet.hasSheet');
        }
        const sheet = this._sheets[sheetName];
        if (sheet == null)
            return false;
        return true;
    }
    /**
     * Gets the named sheet
     *
     * @param {string} sheetName the name of the sheet to get
     *
     * @return {SheetGS} the requested sheet
     */
    getSheet(sheetName) {
        if (sheetName == null) {
            throw new Error('Sheet name not defined in SpreadsheetGS.getSheet()');
        }
        const sheet = this._sheets[sheetName];
        if (sheet == null) {
            throw new Error('Could not find sheet named ' + sheetName + ' in SpreadsheetGS.getSheet()');
        }
        return sheet;
    }
    /**
     * Adds a trigger for this Spreadsheet. Default functions depending on the
     *  event type are 'onEdit', 'onChange', and 'onSubmit'. The default event
     *  type is ON_EDIT.
     *
     * @param {GoogleAppsScript.Script.EventType | string} triggerType the type
     *  of trigger to add, from Script.EventType; or, 'Edit', 'Change'
     *  or 'Submit'
     * @param {string} functionName the name of the function to call on trigger
     *
     * @return {SpreadsheetGS} the Spreadsheet object for chaining
     */
    addTrigger(triggerType, functionName) {
        if (typeof triggerType === 'string') {
            triggerType = triggerType.toUpperCase()[0];
        }
        switch (triggerType) {
            case ScriptApp.EventType.ON_CHANGE || 'C':
                if (functionName === undefined)
                    functionName = 'onChange';
                ScriptApp.newTrigger(functionName)
                    .forSpreadsheet(this._spreadsheet)
                    .onChange()
                    .create();
                break;
            case ScriptApp.EventType.ON_OPEN || 'O':
                if (functionName === undefined)
                    functionName = 'onOpen';
                ScriptApp.newTrigger(functionName)
                    .forSpreadsheet(this._spreadsheet)
                    .onOpen()
                    .create();
                break;
            case ScriptApp.EventType.ON_FORM_SUBMIT || 'S':
                if (functionName === undefined)
                    functionName = 'onSubmit';
                ScriptApp.newTrigger(functionName)
                    .forSpreadsheet(this._spreadsheet)
                    .onFormSubmit()
                    .create();
                break;
            default:
                if (functionName === undefined)
                    functionName = 'onEdit';
                ScriptApp.newTrigger(functionName)
                    .forSpreadsheet(this._spreadsheet)
                    .onEdit()
                    .create();
                break;
        }
        return this;
    }
    /**
     * Update triggers for a particular sheet
     *
     * @param {string} sheetName the name of the sheet
     * @param {GoogleAppsScript.Script.EventType | string} triggerType the type
     *  of trigger to add, from Script.EventType; or, 'Edit', 'Change'
     *  or 'Submit'
     * @param {string} functionName the name of the function to call on trigger
     * @return {SpreadsheetGS} the object for chaining
     */
    replaceTrigger(sheetName, triggerType, functionName) {
        this.deleteTriggers(functionName);
        this.addTrigger(triggerType, functionName);
        return this;
    }
    /**
     * Delete triggers for a particular function on the entire spreadsheet
     *
     * @param {string} functionName the function to delete triggers for
     * @return {SpreadsheetGS} the object for chaining
     */
    deleteTriggers(functionName) {
        for (const t of ScriptApp.getProjectTriggers()) {
            if (t.getTriggerSourceId() == this._spreadsheet.getId()) {
                if (functionName === undefined || t.getHandlerFunction() == functionName)
                    ScriptApp.deleteTrigger(t);
            }
        }
        return this;
    }
}
