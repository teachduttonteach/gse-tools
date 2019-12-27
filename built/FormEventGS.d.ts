/// <reference types="google-apps-script" />
/**
 * Type to hold the options for the form event
 */
export declare type FormEventOptions = {
    /**
     * The order of the dates, MD or DM (default: MD)
     */
    dateOrder?: string;
    /**
     * The delimiter for the date (default: "/")
     */
    dateDelimiter?: string;
    /**
     * The delimiter for the text to add afterwards (default: "\n")
     */
    suffixDelimiter?: string;
    /**
     * The response number for the response to use as a suffix (default: 0)
     */
    suffixResponseNumber?: number;
    /**
     * The type of the property to get off of the response (currently only "T" is valid for the title)
     */
    suffixType?: string;
};
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
export declare class FormEventGS {
    private _title;
    private _date;
    private _email;
    private _response;
    private _event;
    /**
     * Get the values needed for these tools from the form event
     *
     * @param e contains the form event
     */
    constructor(e: GoogleAppsScript.Events.FormsOnFormSubmit);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Event object
     */
    getObject(): GoogleAppsScript.Events.FormsOnFormSubmit;
    /**
     * Gets the title of the form
     *
     * @returns the title
     */
    getTitle(): string;
    /**
     * Gets the email address of the submitter of the form
     *
     * @returns the email address
     */
    getEmail(): string;
    /**
     * Prints the full date from a list of optional arguments
     *
     * @param {FormEventOptions} options the options for the form event
     */
    fullDate(options?: FormEventOptions): string;
}
