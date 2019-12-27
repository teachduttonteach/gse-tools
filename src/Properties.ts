import { stringify } from "querystring";
import { SpreadsheetGS } from "./SpreadsheetGS"

export function benchmark(obj: object, method: string) {
  Logger.log(obj.constructor.name + ": " + method);
}

export const ONE_DAY = 24*60*60*1000;

export function getDataSheet() {
  let _sheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  let _sheetList: GoogleAppsScript.Drive.FileIterator = DriveApp.getFilesByName(ScriptApp.getScriptId());
  if ((_sheetList == null) || (!_sheetList.hasNext())) _sheet = SpreadsheetApp.create(ScriptApp.getScriptId());
  else _sheet = SpreadsheetApp.open(_sheetList.next());
  return new SpreadsheetGS(_sheet);
};

export function setCache(key: string, value: any): void {
  Logger.log("Setting cache of " + key + " to " + value);
  let t_cache = CacheService.getScriptCache();
  if (t_cache == null) throw new Error("Could not create CacheService in GroupCreator.displayGroupSet()");

  t_cache.put(key, JSON.stringify(value));
}

export function getCache<T>(key: string): T {
  let t_cache = CacheService.getScriptCache();
  if (t_cache == null) throw new Error("Could not create CacheService in acceptGroups()");

  let cachedInfo = t_cache.get(key);
  if (cachedInfo == null) throw new Error("Could not find CachedInfo for minimum group set in acceptGroups()");

  Logger.log("Getting cache of " + key + " = " + cachedInfo);
  return JSON.parse(cachedInfo);
}

function getNameFromEmail(email: string) {
  var name = this.email.split("@")[0].split(".");
  return [name[0].charAt(0).toUpperCase() + name[0].slice(1), name[1].charAt(0).toUpperCase() + name[1].slice(1)];  
}

export function areDatesEqual(date1: Date, date2: Date, level: string = "YEAR") {
  if (level.toUpperCase() == "YEAR") {
    if (date1.getUTCFullYear() != date2.getUTCFullYear()) return false;
  } 
  if (level.toUpperCase() != "DAY") {
    if (date1.getUTCMonth() != date2.getUTCMonth()) return false;
  }

  return (date1.getUTCDate() == date2.getUTCDate());
}

export enum Features {
  MULTISELECT_ENABLED = "MULTISELECT_ENABLED",
  MINE_ONLY = "MINE_ONLY",
  NAV_HIDDEN = "NAV_HIDDEN",
  SIMPLE_UPLOAD_ENABLED = "SIMPLE_UPLOAD_ENABLED",
  SUPPORT_DRIVES = "SUPPORT_DRIVES"
};

export enum MimeTypes {
  AUDIO = "application/vnd.google-apps.audio",
  DOCS = "application/vnd.google-apps.document",
  DRAWING = "application/vnd.google-apps.drawing",
  DRIVE_FILE = "application/vnd.google-apps.file",
  DRIVE_FOLDER = "application/vnd.google-apps.folder",
  FORMS = "application/vnd.google-apps.form",
  FUSION = "application/vnd.google-apps.fusiontable",
  MAPS = "application/vnd.google-apps.map",
  PHOTO = "application/vnd.google-apps.photo",	
  SLIDES = "application/vnd.google-apps.presentation",
  APPS_SCRIPT = "application/vnd.google-apps.script",
  SITES = "application/vnd.google-apps.site",
  SHEETS = "application/vnd.google-apps.spreadsheet",
  UNKNOWN = "application/vnd.google-apps.unknown",
  VIDEO = "application/vnd.google-apps.video",
  DRIVE_SDK = "application/vnd.google-apps.drive-sdk"
};

export class Settings {
  private _name: string;
  private _scriptProperties: boolean;
  private _settings: Map<string, string>;

  constructor(name: string, docProperties: boolean) {
    this._name = "SETTINGS";
    if (name as string) this._name = name;
    this._scriptProperties = true;
    this._settings = new Map();
    if (docProperties) {
      this._scriptProperties = false;
      let t_prop = PropertiesService.getDocumentProperties().getProperty(this._name);
      if (t_prop == null) throw new Error("Could not find property in Settings()");
      this._settings = JSON.parse(t_prop);
    } else {
      let t_prop = PropertiesService.getScriptProperties().getProperty(this._name);
      if (t_prop == null) throw new Error("Could not find property in Settings()");
      this._settings = JSON.parse(t_prop);
    }  
  }

  get(key: string | Array<string>): string | Map<string, string> {
    if (key != null) {
      if (typeof key != "string") {
        let settingsMap: Map<string, string> = new Map();
        for (let i of key) {
          let t_value = this._settings.get(i);
          if (t_value == undefined) throw new Error("Key not found in Settings.get()");
          settingsMap.set(i, JSON.parse(t_value));
        }
        return settingsMap;
      } 
      let t_value = this._settings.get(key);
      if (t_value == undefined) throw new Error("Key not found in Settings.get()");
      return JSON.parse(t_value);
    }
    throw new Error("Key not specified in Settings.get()");
  };
  
  set(key: any, value: any) {
    if (key as Array<string>) {
      for (var i = 0; i < key.length; i++) {
        this._settings.set(key[i], JSON.stringify(value));
      }
    } else {
      this._settings.set(key, JSON.stringify(value));
    }
  };
  
  updateProperties() {
    var stringifiedValues = JSON.stringify(this._settings);
    if (this._scriptProperties) PropertiesService.getScriptProperties().setProperty(this._name, stringifiedValues);
    else PropertiesService.getDocumentProperties().setProperty(this._name, stringifiedValues);
  };
  
};

export function updateTriggers(formId: string, functionName: string) {
  // Update triggers for bellwork
  for (let t of ScriptApp.getProjectTriggers()) {
    if (t.getHandlerFunction() == functionName) ScriptApp.deleteTrigger(t);
  }
  ScriptApp.newTrigger(functionName).forForm(formId).onFormSubmit().create();
}

