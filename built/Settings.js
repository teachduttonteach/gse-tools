/**
 * Class to hold settings in the PropertiesService
 */
export class Settings {
    /**
     *
     * @param {string} name the name of the settings to retrieve
     * @param {boolean} docProperties whether or not to use document properties
     */
    constructor(name, docProperties) {
        this._name = 'SETTINGS';
        if (name)
            this._name = name;
        this._scriptProperties = true;
        this._settings = new Map();
        if (docProperties) {
            this._scriptProperties = false;
            const thisProp = PropertiesService.getDocumentProperties().getProperty(this._name);
            if (thisProp == null) {
                throw new Error('Could not find property in Settings()');
            }
            this._settings = JSON.parse(thisProp);
        }
        else {
            const thisProp = PropertiesService.getScriptProperties().getProperty(this._name);
            if (thisProp == null) {
                throw new Error('Could not find property in Settings()');
            }
            this._settings = JSON.parse(thisProp);
        }
    }
    /**
     * Gets the value for a particular key
     *
     * @param {string | Array<string>} key the key to retrieve
     * @return {string | Map<string, string>} the value
     */
    get(key) {
        if (key != null) {
            if (typeof key != 'string') {
                const settingsMap = new Map();
                for (const i of key) {
                    const thisValue = this._settings.get(i);
                    if (thisValue == undefined) {
                        throw new Error('Key not found in Settings.get()');
                    }
                    settingsMap.set(i, JSON.parse(thisValue));
                }
                return settingsMap;
            }
            const thisValue = this._settings.get(key);
            if (thisValue == undefined) {
                throw new Error('Key not found in Settings.get()');
            }
            return JSON.parse(thisValue);
        }
        throw new Error('Key not specified in Settings.get()');
    }
    /**
     * Sets the value of a key
     *
     * @param {Array<string> | string} key the key to set
     * @param {string} value the value
     */
    set(key, value) {
        if (key instanceof Array) {
            for (let i = 0; i < key.length; i++) {
                this._settings.set(key[i], JSON.stringify(value));
            }
        }
        else {
            this._settings.set(key, JSON.stringify(value));
        }
    }
    /**
     * Update the properties held in PropertiesService
     */
    updateProperties() {
        const stringifiedValues = JSON.stringify(this._settings);
        if (this._scriptProperties) {
            PropertiesService.getScriptProperties().setProperty(this._name, stringifiedValues);
        }
        else {
            PropertiesService.getDocumentProperties().setProperty(this._name, stringifiedValues);
        }
    }
}
