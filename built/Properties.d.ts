import { SpreadsheetGS } from "./SpreadsheetGS";
export declare function benchmark(obj: object, method: string): void;
export declare const ONE_DAY: number;
export declare function getDataSheet(): SpreadsheetGS;
export declare function setCache(key: string, value: any): void;
export declare function getCache<T>(key: string): T;
export declare function areDatesEqual(date1: Date, date2: Date, level?: string): boolean;
export declare enum Features {
    MULTISELECT_ENABLED = "MULTISELECT_ENABLED",
    MINE_ONLY = "MINE_ONLY",
    NAV_HIDDEN = "NAV_HIDDEN",
    SIMPLE_UPLOAD_ENABLED = "SIMPLE_UPLOAD_ENABLED",
    SUPPORT_DRIVES = "SUPPORT_DRIVES"
}
export declare enum MimeTypes {
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
}
export declare class Settings {
    private _name;
    private _scriptProperties;
    private _settings;
    constructor(name: string, docProperties: boolean);
    get(key: string | Array<string>): string | Map<string, string>;
    set(key: any, value: any): void;
    updateProperties(): void;
}
export declare function updateTriggers(formId: string, functionName: string): void;
