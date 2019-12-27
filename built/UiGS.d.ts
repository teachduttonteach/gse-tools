/// <reference types="google-apps-script" />
import { MapGS } from "./MapGS";
import { SidebarButton } from "./Groups";
/**
 * Class to hold the Google Apps User Interface
 *
 * ```javascript
 * var ui = new GSuiteObjects.UiGS();
 * ui.addMenu("Bellwork", "Update", 'doUpdate');
 * ```
 */
export declare class UiGS {
    protected _ui: GoogleAppsScript.Base.Ui;
    protected _menus: MapGS<string, GoogleAppsScript.Base.Menu>;
    constructor();
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Base.Ui} the Ui object
     */
    getUiObject(): GoogleAppsScript.Base.Ui;
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
    addMenu(menuName: string, itemName: string, functionName: string): UiGS;
    showSidebar(displayText: string, title: string, buttons?: Array<SidebarButton>, width?: number): void;
}
