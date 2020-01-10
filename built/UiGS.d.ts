/// <reference types="google-apps-script" />
import { MapGS } from './map/MapGS';
import { SidebarButton } from './SidebarButton';
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
    /**
     * Makes a new menu
     */
    constructor();
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Base.Ui} the Ui object
     */
    getUiObject(): GoogleAppsScript.Base.Ui;
    /**
     * Add a menu to the user interface
     *
     * ```javascript
     * ui.addMenu("Bellwork", "Update", 'doUpdate');
     * ```
     *
     * @param {string} menuName the name of the menu to add this item to
     * @param {string} itemName the name of the item to add to the menu
     * @param {string} functionName the name of the function to call when the
     *  item is clicked
     *
     * @return {UiGS} the menu for chaining
     */
    addMenu(menuName: string, itemName: string, functionName: string): UiGS;
    /**
     * Show the sidebar
     *
     * @param {string} displayText the text to display
     * @param {string} title the title of the sidebar
     * @param {Array<SidebarButton>} buttons the buttons to display
     * @param {number} width how wide the sidebar should be; default is 300
     */
    showSidebar(displayText: string, title: string, buttons?: Array<SidebarButton>, width?: number): void;
}
