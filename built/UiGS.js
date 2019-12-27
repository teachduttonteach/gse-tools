import { MapGS } from "./MapGS";
/**
 * Class to hold the Google Apps User Interface
 *
 * ```javascript
 * var ui = new GSuiteObjects.UiGS();
 * ui.addMenu("Bellwork", "Update", 'doUpdate');
 * ```
 */
export class UiGS {
    constructor() {
        this._menus = new MapGS();
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Base.Ui} the Ui object
     */
    getUiObject() {
        return this._ui;
    }
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
    addMenu(menuName, itemName, functionName) {
        if ((menuName == "") || (itemName == "") || (functionName == ""))
            throw new Error("Name of menu, item and function must be defined in UiGS.addMenu()");
        let t_menu = this._menus.get(menuName);
        if (t_menu != null) {
            t_menu.addItem(itemName, functionName).addToUi();
        }
        else {
            this._menus.set(menuName, this._ui.createMenu(menuName).addItem(itemName, functionName));
            let t_menu = this._menus.get(menuName);
            if (t_menu == undefined)
                throw new Error("Could not find menu (" + menuName + ") in UiGS.addMenu()");
            t_menu.addToUi();
        }
        return this;
    }
    ;
    showSidebar(displayText, title, buttons, width = 300) {
        if (buttons != null) {
            displayText += "<p><script>function closeThis(bool) { google.script.host.close(); }</script>";
            for (let button of buttons) {
                displayText += "<button type='button' onclick='";
                if (button.wait == true)
                    displayText += "this.innerHTML = \"Wait ...\"; this.disabled = true; ";
                displayText += "google.script.run.";
                if (button.close == true)
                    displayText += "withSuccessHandler(closeThis).";
                displayText += button.function + "();'>" + button.text + "</button> ";
            }
        }
        this._ui.showSidebar(HtmlService.createHtmlOutput(displayText).setTitle(title).setWidth(width));
    }
}
