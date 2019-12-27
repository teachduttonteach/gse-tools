import { SpreadsheetGS } from "./SpreadsheetGS";
export function benchmark(obj, method) {
    Logger.log(obj.constructor.name + ": " + method);
}
export const ONE_DAY = 24 * 60 * 60 * 1000;
export function getDataSheet() {
    let _sheet;
    let _sheetList = DriveApp.getFilesByName(ScriptApp.getScriptId());
    if ((_sheetList == null) || (!_sheetList.hasNext()))
        _sheet = SpreadsheetApp.create(ScriptApp.getScriptId());
    else
        _sheet = SpreadsheetApp.open(_sheetList.next());
    return new SpreadsheetGS(_sheet);
}
;
export function setCache(key, value) {
    Logger.log("Setting cache of " + key + " to " + value);
    let t_cache = CacheService.getScriptCache();
    if (t_cache == null)
        throw new Error("Could not create CacheService in GroupCreator.displayGroupSet()");
    t_cache.put(key, JSON.stringify(value));
}
export function getCache(key) {
    let t_cache = CacheService.getScriptCache();
    if (t_cache == null)
        throw new Error("Could not create CacheService in acceptGroups()");
    let cachedInfo = t_cache.get(key);
    if (cachedInfo == null)
        throw new Error("Could not find CachedInfo for minimum group set in acceptGroups()");
    Logger.log("Getting cache of " + key + " = " + cachedInfo);
    return JSON.parse(cachedInfo);
}
function getNameFromEmail(email) {
    var name = this.email.split("@")[0].split(".");
    return [name[0].charAt(0).toUpperCase() + name[0].slice(1), name[1].charAt(0).toUpperCase() + name[1].slice(1)];
}
export function areDatesEqual(date1, date2, level = "YEAR") {
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
export var Features;
(function (Features) {
    Features["MULTISELECT_ENABLED"] = "MULTISELECT_ENABLED";
    Features["MINE_ONLY"] = "MINE_ONLY";
    Features["NAV_HIDDEN"] = "NAV_HIDDEN";
    Features["SIMPLE_UPLOAD_ENABLED"] = "SIMPLE_UPLOAD_ENABLED";
    Features["SUPPORT_DRIVES"] = "SUPPORT_DRIVES";
})(Features || (Features = {}));
;
export var MimeTypes;
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
})(MimeTypes || (MimeTypes = {}));
;
export class Settings {
    constructor(name, docProperties) {
        this._name = "SETTINGS";
        if (name)
            this._name = name;
        this._scriptProperties = true;
        this._settings = new Map();
        if (docProperties) {
            this._scriptProperties = false;
            let t_prop = PropertiesService.getDocumentProperties().getProperty(this._name);
            if (t_prop == null)
                throw new Error("Could not find property in Settings()");
            this._settings = JSON.parse(t_prop);
        }
        else {
            let t_prop = PropertiesService.getScriptProperties().getProperty(this._name);
            if (t_prop == null)
                throw new Error("Could not find property in Settings()");
            this._settings = JSON.parse(t_prop);
        }
    }
    get(key) {
        if (key != null) {
            if (typeof key != "string") {
                let settingsMap = new Map();
                for (let i of key) {
                    let t_value = this._settings.get(i);
                    if (t_value == undefined)
                        throw new Error("Key not found in Settings.get()");
                    settingsMap.set(i, JSON.parse(t_value));
                }
                return settingsMap;
            }
            let t_value = this._settings.get(key);
            if (t_value == undefined)
                throw new Error("Key not found in Settings.get()");
            return JSON.parse(t_value);
        }
        throw new Error("Key not specified in Settings.get()");
    }
    ;
    set(key, value) {
        if (key) {
            for (var i = 0; i < key.length; i++) {
                this._settings.set(key[i], JSON.stringify(value));
            }
        }
        else {
            this._settings.set(key, JSON.stringify(value));
        }
    }
    ;
    updateProperties() {
        var stringifiedValues = JSON.stringify(this._settings);
        if (this._scriptProperties)
            PropertiesService.getScriptProperties().setProperty(this._name, stringifiedValues);
        else
            PropertiesService.getDocumentProperties().setProperty(this._name, stringifiedValues);
    }
    ;
}
;
export function updateTriggers(formId, functionName) {
    // Update triggers for bellwork
    for (let t of ScriptApp.getProjectTriggers()) {
        if (t.getHandlerFunction() == functionName)
            ScriptApp.deleteTrigger(t);
    }
    ScriptApp.newTrigger(functionName).forForm(formId).onFormSubmit().create();
}
