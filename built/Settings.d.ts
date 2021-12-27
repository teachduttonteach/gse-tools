/**
 * Class to hold settings in the PropertiesService
 */
export declare class Settings {
    private _name;
    private _scriptProperties;
    private _settings;
    /**
     *
     * @param {string} name the name of the settings to retrieve
     * @param {boolean} docProperties whether or not to use document properties
     */
    constructor(name: string, docProperties: boolean);
    /**
     * Gets the value for a particular key
     *
     * @param {string | Array<string>} key the key to retrieve
     * @return {string | Map<string, string>} the value
     */
    get(key: string | Array<string>): string | Map<string, string>;
    /**
     * Sets the value of a key
     *
     * @param {Array<string> | string} key the key to set
     * @param {string} value the value
     */
    set(key: Array<string> | string, value: string): void;
    /**
     * Update the properties held in PropertiesService
     */
    updateProperties(): void;
}
