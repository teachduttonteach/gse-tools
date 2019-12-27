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
     * @param e contains the form event
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
     * @returns the Event object
     */
    getObject() {
        return this._event;
    }
    /**
     * Gets the title of the form
     *
     * @returns the title
     */
    getTitle() {
        return this._title;
    }
    /**
     * Gets the email address of the submitter of the form
     *
     * @returns the email address
     */
    getEmail() {
        return this._email;
    }
    /**
     * Prints the full date from a list of optional arguments
     *
     * @param {FormEventOptions} options the options for the form event
     */
    fullDate(options) {
        if (options == null)
            options = {};
        let { dateOrder = "MD", dateDelimiter = "/", suffixDelimiter = "\n", suffixResponseNumber = 0, suffixType = "T" } = options;
        let [firstDate, secondDate] = [this._date.getMonth() + 1, this._date.getDate()];
        if (dateOrder == "DM")
            [firstDate, secondDate] = [this._date.getDate(), this._date.getMonth() + 1];
        let suffixBuilder = this._response.getItemResponses()[suffixResponseNumber];
        let suffix = "";
        // Can account for other types here
        if (suffixType.toUpperCase().startsWith("T"))
            suffix = suffixBuilder.getItem().getTitle();
        return firstDate + dateDelimiter + secondDate + suffixDelimiter + suffix;
    }
}
