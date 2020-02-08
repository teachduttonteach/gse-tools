/// <reference types="google-apps-script" />
import { DateParams } from '../DateParams';
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
 * Gets the number of items in the response
 * @param {FormEventGS} obj the FormEvent object
 * @return {number} the number of items
 */
export declare function getNumFormItems(obj: FormEventGS): number;
/**
 * Get the numbered item response off of the form event
 * @param {FormEventGS} obj the FormEvent object
 * @param {number} num the number of the response
 * @return {GoogleAppsScript.Forms.ItemResponse} the ItemResponse object
 */
export declare function getFormItem(obj: FormEventGS, num: number): GoogleAppsScript.Forms.ItemResponse;
/**
 * Gets the response for the item number
 * @param {FormEventGS} obj the FormEvent object
 * @param {number} num the number of the response
 * @return {string | Array<string> | Array<Array<string>>} the item response
 */
export declare function getFormItemResponse(obj: FormEventGS, num: number): string | string[] | string[][];
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
 * @param {DateParams} dateParams the options for the form event
 * @return {string} the full date
 */
export declare function getFullFormEventDate(obj: FormEventGS, dateParams?: DateParams): string;
/**
 * Gets the title for the item number
 * @param {FormEventGS} obj the FormEvent object
 * @param {number} num the number of the response
 * @return {string} the item title
 */
export declare function getFormItemTitle(obj: FormEventGS, num: number): string;
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
     * Gets the number of items in the response
     * @return {number} the number of items
     */
    getNumItems(): number;
    /**
     * Gets the response for the item number
     * @param {number} num the number of the response
     * @return {string | Array<string> | Array<Array<string>>} the item response
     */
    getItemResponse(num: number): string | string[] | string[][];
    /**
     * Get the numbered item response off of the form event
     * @param {number} num the number of the response
     * @return {GoogleAppsScript.Forms.ItemResponse} the ItemResponse object
     */
    getItem(num: number): GoogleAppsScript.Forms.ItemResponse;
    /**
     * Gets the title for the item number
     * @param {number} num the number of the item
     * @return {string} the item title
     */
    getItemTitle(num: number): string;
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
     * Gets the first and last name from the email address
     * @return {[string, string]} the first and last name
     */
    getNameFromEmail(): [string, string];
    /**
     * Prints the full date from a list of optional arguments
     *
     * @param {DateParams} dateParams the options for the form event
     * @return {string} the full date
     */
    getFullDate(dateParams?: DateParams): string;
}
