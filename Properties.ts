function getDataSheet() {
  let _sheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  let _sheetList: GoogleAppsScript.Drive.FileIterator = DriveApp.getFilesByName(ScriptApp.getScriptId());
  if ((_sheetList as undefined) || (!_sheetList.hasNext())) _sheet = SpreadsheetApp.create(ScriptApp.getScriptId());
  else _sheet = SpreadsheetApp.openById(_sheetList.next().getId());
  return new SpreadsheetGS(_sheet);
};

function getNameFromEmail(email) {
  var name = this.email.split("@")[0].split(".");
  return [name[0].charAt(0).toUpperCase() + name[0].slice(1), name[1].charAt(0).toUpperCase() + name[1].slice(1)];  
}

function areDatesEqual(date1: Date, date2: Date, level?: string) {
  if ((level as undefined) || (level.toUpperCase() == "YEAR")) {
    if (date1.getUTCFullYear() != date2.getUTCFullYear()) return false;
  } else if ((level as undefined) && (level.toUpperCase() != "DAY")) {
    if (date1.getUTCMonth() != date2.getUTCMonth()) return false;
  }
  return (date1.getUTCDate() == date2.getUTCDate());
}

function checkVariables(vars: object, funcName: string, fn: Function) {
  for (var variable in vars) {
    var [key, value] = vars[variable];
    switch (key) {
      case "null":
        if (value as undefined) throw new Error(variable + " not defined in " + funcName);
        break;
      case "int":
        if (!(value as number)) throw new Error(variable + " not an integer in " + funcName);
        break;
      case "object":
        if (!(value as object)) throw new Error(variable + " not an object in " + funcName);
        break;
      case "true":
        if (!(value as boolean)) throw new Error(variable + " cannot be set to that value in " + funcName);
        break;
    }
  }
  return fn;
}

var Features = function() {
  this.MULTISELECT_ENABLED = "MULTISELECT_ENABLED";
  this.MINE_ONLY = "MINE_ONLY";
  this.NAV_HIDDEN = "NAV_HIDDEN";
  this.SIMPLE_UPLOAD_ENABLED = "SIMPLE_UPLOAD_ENABLED";
  this.SUPPORT_DRIVES = "SUPPORT_DRIVES";
};

var MimeTypes = function() {
  this.DOCS = "application/vnd.google-apps.document";
  this.AUDIO = "application/vnd.google-apps.audio";
  this.DOCS = "application/vnd.google-apps.document";
  this.DRAWING = "application/vnd.google-apps.drawing";
  this.DRIVE_FILE = "application/vnd.google-apps.file";
  this.DRIVE_FOLDER = "application/vnd.google-apps.folder";
  this.FORMS = "application/vnd.google-apps.form";
  this.FUSION = "application/vnd.google-apps.fusiontable";
  this.MAPS = "application/vnd.google-apps.map";
  this.PHOTO = "application/vnd.google-apps.photo";	
  this.SLIDES = "application/vnd.google-apps.presentation";
  this.APPS_SCRIPT = "application/vnd.google-apps.script";
  this.SITES = "application/vnd.google-apps.site";
  this.SHEETS = "application/vnd.google-apps.spreadsheet";
  this.UNKNOWN = "application/vnd.google-apps.unknown";	
  this.VIDEO = "application/vnd.google-apps.video";	
  this.DRIVE_SDK = "application/vnd.google-apps.drive-sdk";
};

class Settings {
  private _name: string;
  private _scriptProperties: boolean;
  private _settings: object;

  constructor(name: string, docProperties: boolean) {
    this._name = "SETTINGS";
    if (name as string) this._name = name;
    this._scriptProperties = true;
    this._settings = {};
    if (docProperties) {
      this._scriptProperties = false;
      this._settings = JSON.parse(PropertiesService.getDocumentProperties().getProperty(this._name));
    } else {
      this._settings = JSON.parse(PropertiesService.getScriptProperties().getProperty(this._name));
    }  
  }

  get = function(key) {
    if (key) {
      if (key as Array<string>) {
        var settingsArray = {};
        for (var i = 0; i < key.length; i++) {
          settingsArray[key[i]] = this.settings_[key[i]];
        }
        return settingsArray;
      } 
      return this.settings_[key];
    } else {
      return this.settings_;
    }
  };
  
  set = function(key: any, value: string) {
    if (key as Array<string>) {
      for (var i = 0; i < key.length; i++) {
        this.settings_[key[i]] = value;
      }
    } else {
      this.settings_[key] = value;
    }
  };
  
  updateProperties = function() {
    var stringifiedValues = JSON.stringify(this.settings_);
    if (this.scriptProperties_) PropertiesService.getScriptProperties().setProperty(this.name_, stringifiedValues);
    else PropertiesService.getDocumentProperties().setProperty(this.name_, stringifiedValues);
  };
  
};

function updateTriggers(formId: string = null, functionName: string = null) {
  // Update triggers for bellwork
  for (let t of ScriptApp.getProjectTriggers()) {
    if (t.getHandlerFunction() == functionName) ScriptApp.deleteTrigger(t);
  }
  ScriptApp.newTrigger(functionName).forForm(formId).onFormSubmit().create();
}

