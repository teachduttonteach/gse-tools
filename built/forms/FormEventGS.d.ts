/// <reference types="google-apps-script" />
import { FormEventOptions } from './FormEventOptions';
/**
 * Class to provide functions to Google Form events
 *
 * ```javascript
 * function onSubmitBellwork(e) {
 *   var formEvent = new gseTools.FormEventGS(e);
 *   alert(formEvent.fullDate("MD", "/", "\n", 0, "T"));
 * }
 * ```
 *
 * @param {GoogleAppsScript.Events.FormsOnFormSubmit} e the Google form
 *  submission event
 * @return {FormEventGS} the FormEventGS object
 */
export declare function newFormEvent(e: GoogleAppsScript.Events.FormsOnFormSubmit): FormEventGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {FormEventGS} obj the FormEvent object
 * @return {GoogleAppsScript.Events.FormsOnFormSubmit} the Event object
 */
export declare function getFormEventObject(obj: FormEventGS): GoogleAppsScript.Events.FormsOnFormSubmit;
/**
 * Gets the title of the form
 *
 * @param {FormEventGS} obj the FormEvent object
 * @return {string} the title
 */
export declare function getFormEventTitle(obj: FormEventGS): string;
/**
 * Gets the email address of the submitter of the form
 *
 * @param {FormEventGS} obj the FormEvent object
 * @return {string} the email address
 */
export declare function getFormEventEmail(obj: FormEventGS): string;
/**
 * Prints the full date from a list of optional arguments
 *
 * @param {FormEventGS} obj the FormEvent object
 * @param {FormEventOptions} options the options for the form event
 * @return {string} the full date
 */
export declare function fullFormEventDate(obj: FormEventGS, options?: FormEventOptions): string;
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
     * @param {GoogleAppsScript.Events.FormsOnFormSubmit} e contains the
     *  form event
     */
    constructor(e: GoogleAppsScript.Events.FormsOnFormSubmit);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Events.FormsOnFormSubmit} the Event object
     */
    getObject(): GoogleAppsScript.Events.FormsOnFormSubmit;
    /**
     * Gets the title of the form
     *
     * @return {string} the title
     */
    getTitle(): string;
    /**
     * Gets the email address of the submitter of the form
     *
     * @return {string} the email address
     */
    getEmail(): string;
    /**
     * Prints the full date from a list of optional arguments
     *
     * @param {FormEventOptions} options the options for the form event
     * @return {string} the full date
     */
    fullDate(options?: FormEventOptions): string;
}
