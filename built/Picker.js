"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Properties_1 = require("./Properties");
function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}
/**
 * Raises a number to the given power, and returns the result.
 *
 * @param {number} base the number we're raising to a power
 * @param {number} exp the exponent we're raising the base to
 * @return {number} the result of the exponential calculation
 */
var Picker = /** @class */ (function () {
    function Picker() {
    }
    //this.pickerSettings = new Settings("PICKER");
    Picker.prototype.setDoc = function (dialogName, id) {
        //var s = new Settings();
        //s.set(dialogName, id);
    };
    Picker.prototype.show = function (dialogText, dialogName) {
        var m = Properties_1.MimeTypes;
        var f = Properties_1.Features;
        var settings = new Properties_1.Settings("Picker", false);
        settings.set("DIALOG_WIDTH", "600");
        settings.set("DIALOG_HEIGHT", "425");
        settings.set("INCLUDE_FOLDERS", "true");
        settings.set("MIME_TYPES", [m.DOCS, m.DRIVE_FILE]);
        settings.set("FEATURES", [f.MULTISELECT_ENABLED]);
        var template = HtmlService.createTemplateFromFile('PickerBox.html');
        template.data = settings.get("Template");
        template.data["SELECTED_DOCUMENT"] = dialogName;
        var html = template.evaluate().setWidth(+settings.get("DIALOG_WIDTH")).setHeight(+settings.get("DIALOG_HEIGHT"));
        Logger.log(html.getContent());
        return SpreadsheetApp.getUi().showModalDialog(html, dialogText);
    };
    return Picker;
}());
exports.Picker = Picker;
;
/**
 * Displays a sidebar.
 */
var Sidebar = /** @class */ (function () {
    function Sidebar() {
        var htmlOutput = HtmlService
            .createHtmlOutput('<p>A change of speed, a change of style...</p>')
            .setTitle('My add-on');
        SpreadsheetApp.getUi().showSidebar(htmlOutput);
    }
    return Sidebar;
}());
