"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpreadsheetGS_1 = require("./SpreadsheetGS");
function getDataSheet() {
    var _sheet;
    var _sheetList = DriveApp.getFilesByName(ScriptApp.getScriptId());
    if ((_sheetList == null) || (!_sheetList.hasNext()))
        _sheet = SpreadsheetApp.create(ScriptApp.getScriptId());
    else
        _sheet = SpreadsheetApp.openById(_sheetList.next().getId());
    return new SpreadsheetGS_1.SpreadsheetGS(_sheet);
}
exports.getDataSheet = getDataSheet;
;
function getNameFromEmail(email) {
    var name = this.email.split("@")[0].split(".");
    return [name[0].charAt(0).toUpperCase() + name[0].slice(1), name[1].charAt(0).toUpperCase() + name[1].slice(1)];
}
function areDatesEqual(date1, date2, level) {
    if (level === void 0) { level = "YEAR"; }
    if (level.toUpperCase() == "YEAR") {
        if (date1.getUTCFullYear() != date2.getUTCFullYear())
            return false;
    }
    if (level.toUpperCase() != "DAY") {
        if (date1.getUTCMonth() != date2.getUTCMonth())
            return false;
    }
    return (date1.getUTCDate() == date2.getUTCDate());
}
exports.areDatesEqual = areDatesEqual;
var Features;
(function (Features) {
    Features["MULTISELECT_ENABLED"] = "MULTISELECT_ENABLED";
    Features["MINE_ONLY"] = "MINE_ONLY";
    Features["NAV_HIDDEN"] = "NAV_HIDDEN";
    Features["SIMPLE_UPLOAD_ENABLED"] = "SIMPLE_UPLOAD_ENABLED";
    Features["SUPPORT_DRIVES"] = "SUPPORT_DRIVES";
})(Features = exports.Features || (exports.Features = {}));
;
var MimeTypes;
(function (MimeTypes) {
    MimeTypes["AUDIO"] = "application/vnd.google-apps.audio";
    MimeTypes["DOCS"] = "application/vnd.google-apps.document";
    MimeTypes["DRAWING"] = "application/vnd.google-apps.drawing";
    MimeTypes["DRIVE_FILE"] = "application/vnd.google-apps.file";
    MimeTypes["DRIVE_FOLDER"] = "application/vnd.google-apps.folder";
    MimeTypes["FORMS"] = "application/vnd.google-apps.form";
    MimeTypes["FUSION"] = "application/vnd.google-apps.fusiontable";
    MimeTypes["MAPS"] = "application/vnd.google-apps.map";
    MimeTypes["PHOTO"] = "application/vnd.google-apps.photo";
    MimeTypes["SLIDES"] = "application/vnd.google-apps.presentation";
    MimeTypes["APPS_SCRIPT"] = "application/vnd.google-apps.script";
    MimeTypes["SITES"] = "application/vnd.google-apps.site";
    MimeTypes["SHEETS"] = "application/vnd.google-apps.spreadsheet";
    MimeTypes["UNKNOWN"] = "application/vnd.google-apps.unknown";
    MimeTypes["VIDEO"] = "application/vnd.google-apps.video";
    MimeTypes["DRIVE_SDK"] = "application/vnd.google-apps.drive-sdk";
})(MimeTypes = exports.MimeTypes || (exports.MimeTypes = {}));
;
var Settings = /** @class */ (function () {
    function Settings(name, docProperties) {
        this._name = "SETTINGS";
        if (name)
            this._name = name;
        this._scriptProperties = true;
        this._settings = new Map();
        if (docProperties) {
            this._scriptProperties = false;
            var t_prop = PropertiesService.getDocumentProperties().getProperty(this._name);
            if (t_prop == null)
                throw new Error("Could not find property in Settings()");
            this._settings = JSON.parse(t_prop);
        }
        else {
            var t_prop = PropertiesService.getScriptProperties().getProperty(this._name);
            if (t_prop == null)
                throw new Error("Could not find property in Settings()");
            this._settings = JSON.parse(t_prop);
        }
    }
    Settings.prototype.get = function (key) {
        if (key != null) {
            if (typeof key != "string") {
                var settingsMap = new Map();
                for (var _i = 0, key_1 = key; _i < key_1.length; _i++) {
                    var i = key_1[_i];
                    var t_value_1 = this._settings.get(i);
                    if (t_value_1 == undefined)
                        throw new Error("Key not found in Settings.get()");
                    settingsMap.set(i, JSON.parse(t_value_1));
                }
                return settingsMap;
            }
            var t_value = this._settings.get(key);
            if (t_value == undefined)
                throw new Error("Key not found in Settings.get()");
            return JSON.parse(t_value);
        }
        throw new Error("Key not specified in Settings.get()");
    };
    ;
    Settings.prototype.set = function (key, value) {
        if (key) {
            for (var i = 0; i < key.length; i++) {
                this._settings.set(key[i], JSON.stringify(value));
            }
        }
        else {
            this._settings.set(key, JSON.stringify(value));
        }
    };
    ;
    Settings.prototype.updateProperties = function () {
        var stringifiedValues = JSON.stringify(this._settings);
        if (this._scriptProperties)
            PropertiesService.getScriptProperties().setProperty(this._name, stringifiedValues);
        else
            PropertiesService.getDocumentProperties().setProperty(this._name, stringifiedValues);
    };
    ;
    return Settings;
}());
exports.Settings = Settings;
;
function updateTriggers(formId, functionName) {
    // Update triggers for bellwork
    for (var _i = 0, _a = ScriptApp.getProjectTriggers(); _i < _a.length; _i++) {
        var t = _a[_i];
        if (t.getHandlerFunction() == functionName)
            ScriptApp.deleteTrigger(t);
    }
    ScriptApp.newTrigger(functionName).forForm(formId).onFormSubmit().create();
}
exports.updateTriggers = updateTriggers;
