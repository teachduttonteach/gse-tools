import {MapGS} from "./MapGS"

export class Settings {
  private _name: string;
  private _scriptProperties: boolean;
  private _settings: MapGS<string, string>;

  constructor(name: string, docProperties: boolean) {
    this._name = "SETTINGS";
    if (name as string) this._name = name;
    this._scriptProperties = true;
    this._settings = new MapGS();
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
