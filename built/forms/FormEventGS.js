/**
 * Class to provide functions to Google Form events
 *
 * ```javascript
 * function onSubmitBellwork(e) {
 *   var formEvent = new gseTools.FormEventGS(e);
 *   alert(formEvent.fullDate("MD", "/", "\n", 0, "T"));
 * }
 * ```
 */
export function newFormEvent(e) {
    return new FormEventGS(e);
}
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {FormEventGS} obj the FormEvent object
 * @return {GoogleAppsScript.Events.FormsOnFormSubmit} the Event object
 */
export function getFormEventObject(obj) {
    return obj.getObject();
}
/**
 * Gets the title of the form
 *
 * @param {FormEventGS} obj the FormEvent object
 * @return {string} the title
 */
export function getFormEventTitle(obj) {
    return obj.getTitle();
}
/**
 * Gets the email address of the submitter of the form
 *
 * @param {FormEventGS} obj the FormEvent object
 * @return {string} the email address
 */
export function getFormEventEmail(obj) {
    return obj.getEmail();
}
/**
 * Prints the full date from a list of optional arguments
 *
 * @param {FormEventGS} obj the FormEvent object
 * @param {FormEventOptions} options the options for the form event
 * @return {string} the full date
 */
export function fullFormEventDate(obj, options) {
    return obj.fullDate(options);
}
/**
 * Class to provide functions to Google Form events
 *
 * ```javascript
 * function onSubmitBellwork(e) {
 *   var formEvent = new gseTools.FormEventGS(e);
 *   alert(formEvent.fullDate("MD", "/", "\n", 0, "T"));
 * }
 * ```
 */
export class FormEventGS {
    /**
     * Get the values needed for these tools from the form event
     *
     * @param {GoogleAppsScript.Events.FormsOnFormSubmit} e contains the
     *  form event
     */
    constructor(e) {
        this._title = e.source.getTitle();
        this._date = e.response.getTimestamp();
        this._email = e.response.getRespondentEmail();
        this._response = e.response;
        this._event = e;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Events.FormsOnFormSubmit} the Event object
     */
    getObject() {
        return this._event;
    }
    /**
     * Gets the title of the form
     *
     * @return {string} the title
     */
    getTitle() {
        return this._title;
    }
    /**
     * Gets the email address of the submitter of the form
     *
     * @return {string} the email address
     */
    getEmail() {
        return this._email;
    }
    /**
     * Prints the full date from a list of optional arguments
     *
     * @param {FormEventOptions} options the options for the form event
     * @return {string} the full date
     */
    fullDate(options) {
        if (options == null)
            options = {};
        const { dateOrder = 'MD', dateDelimiter = '/', suffixDelimiter = '\n', suffixResponseNumber = 0, suffixType = 'T', } = options;
        let [firstDate, secondDate] = [this._date.getMonth() + 1, this._date.getDate()];
        if (dateOrder == 'DM') {
            [firstDate, secondDate] = [this._date.getDate(), this._date.getMonth() + 1];
        }
        const suffixBuilder = this._response.getItemResponses()[suffixResponseNumber];
        let suffix = '';
        // Can account for other types here
        if (suffixType.toUpperCase().startsWith('T')) {
            suffix = suffixBuilder.getItem().getTitle();
        }
        return firstDate + dateDelimiter + secondDate + suffixDelimiter + suffix;
    }
}
