"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to hold the Google Apps User Interface
 *
 * ```javascript
 * var ui = new GSuiteObjects.UiGS();
 * ui.addMenu("Bellwork", "Update", 'doUpdate');
 * ```
 */
var UiGS = /** @class */ (function () {
    function UiGS() {
        this._menus = new Map();
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Base.Ui} the Ui object
     */
    UiGS.prototype.getUiObject = function () {
        return this._ui;
    };
    /**
     * Add a menu to the user interface
     *
     * ```javascript
     * ui.addMenu("Bellwork", "Update", 'doUpdate');
     * ```
     *
     * @param menuName the name of the menu to add this item to
     * @param itemName the name of the item to add to the menu
     * @param functionName the name of the function to call when the item is clicked
     *
     * @return {UiGS} the menu for chaining
     */
    UiGS.prototype.addMenu = function (menuName, itemName, functionName) {
        if ((menuName == "") || (itemName == "") || (functionName == ""))
            throw new Error("Name of menu, item and function must be defined in UiGS.addMenu()");
        if (menuName in this._menus) {
            var t_menu = this._menus.get(menuName);
            if (t_menu == undefined)
                throw new Error("Could not find menu (" + menuName + ") in UiGS.addMenu()");
            t_menu.addItem(itemName, functionName).addToUi();
        }
        else {
            this._menus.set(menuName, this._ui.createMenu(menuName).addItem(itemName, functionName));
            var t_menu = this._menus.get(menuName);
            if (t_menu == undefined)
                throw new Error("Could not find menu (" + menuName + ") in UiGS.addMenu()");
            t_menu.addToUi();
        }
        return this;
    };
    ;
    return UiGS;
}());
exports.UiGS = UiGS;
