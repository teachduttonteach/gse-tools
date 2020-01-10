/// <reference types="google-apps-script" />
import { UiGS } from '../UiGS';
/**
 * Class to manipulate Google Forms
 * @param {string} id the id of the form
 */
export declare function newForms(id: string): FormsGS;
/**
 * Activate the form Ui for Ui manipulation
 *
 * @param {FormsGS} obj the Forms object
 * @return {FormsGS} the object for chaining
 */
export declare function activateFormsUi(obj: FormsGS): FormsGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {FormsGS} obj the Forms object
 * @return {GoogleAppsScript.Forms.Form} the Google Form object
 */
export declare function getFormsObject(obj: FormsGS): GoogleAppsScript.Forms.Form;
/**
 * Convert a string to a list
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} text the text to convert
 *
 * @return {Array<string>} the list
 */
export declare function convertFormsLinebreaksToList(obj: FormsGS, text: string): Array<string>;
/**
 * Add an item to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title title of the item
 * @param {string} questionType type of the item, contained in QuestionType
 * @param {string | Array<string>} optionsList list of options for multiple
 *  choice, select, or the columns for grid items
 * @param {string | Array<string>} mcGridRowsList rows for grid items
 *
 * @return {FormsGS} the object for chaining
 */
export declare function addFormsItem(obj: FormsGS, title: string, questionType: string, optionsList?: string | Array<string>, mcGridRowsList?: string | Array<string>): FormsGS;
/**
 * Adds a paragraph item to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title the title of the paragraph item
 *
 * @return {FormsGS} the object for chaining
 */
export declare function addFormsParagraph(obj: FormsGS, title: string): FormsGS;
/**
 * Adds a true/false item to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title the title of the true/false item
 *
 * @return {FormsGS} the object for chaining
 */
export declare function addFormsTrueFalse(obj: FormsGS, title: string): FormsGS;
/**
 * Returns an array of values from either an array or a string
 *
 * @param {FormsGS} obj the Forms object
 * @param {Array<string> | string} values the values to convert
 *
 * @return {Array<string>} the array of values
 */
export declare function setFormsValuesFromList(obj: FormsGS, values: Array<string> | string): Array<string>;
/**
 * Adds a multiple choice item to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title the title of the multiple choice item
 * @param {Array<string> | string} items the choices for the question as
 *  an array or string
 *
 * @return {FormsGS} the object for chaining
 */
export declare function addFormsMultipleChoice(obj: FormsGS, title: string, items: Array<string> | string): FormsGS;
/**
 * Adds a multiple checkbox item to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title the title of the multiple checkbox item
 * @param {Array<string> | string} items the choices for the question as
 *  an array or string
 *
 * @return {FormsGS} the object for chaining
 */
export declare function addFormsMultipleCheck(obj: FormsGS, title: string, items: Array<string> | string): FormsGS;
/**
 * Adds a multiple choice grid item to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title the title of the multiple choice grid item
 * @param {Array<string> | string} columns the columns for the grid as an
 *  array or string
 * @param {Array<string> | string} rows the rows for the grid as an array
 *  or string
 *
 * @return {FormsGS} the object for chaining
 */
export declare function addFormsMultipleGridChoice(obj: FormsGS, title: string, columns: Array<string> | string, rows: Array<string> | string): FormsGS;
/**
 * Adds a multiple checkbox grid item to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title the title of the multiple checkbox grid item
 * @param {Array<string> | string} columns the columns for the grid as an
 *  array or string
 * @param {Array<string> | string} rows the rows for the grid as an array
 *  or string
 *
 * @return {FormsGS} the object for chaining
 */
export declare function addFormsMultipleGridCheck(obj: FormsGS, title: string, columns: Array<string> | string, rows: Array<string> | string): FormsGS;
/**
 * Add an image to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {GoogleAppsScript.Base.BlobSource} file the image to add
 *
 * @return {FormsGS} the object for chaining
 */
export declare function addFormsImage(obj: FormsGS, file: GoogleAppsScript.Base.BlobSource): FormsGS;
/**
 * Delete the items on this form
 *
 * @param {FormsGS} obj the Forms object
 * @return {FormsGS} the object for chaining
 */
export declare function deleteFormsItems(obj: FormsGS): FormsGS;
/**
 * Set the title of the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title the title of the form
 *
 * @return {FormsGS} the object for chaining
 */
export declare function setFormsTitle(obj: FormsGS, title: string): FormsGS;
/**
 * Class to manipulate Google Forms
 */
export declare class FormsGS extends UiGS {
    private _form;
    _ui: GoogleAppsScript.Base.Ui;
    /**
     *
     * @param {string} id the id of the form
     */
    constructor(id: string);
    /**
     * Activate the form Ui for Ui manipulation
     *
     * @return {FormsGS} the object for chaining
     */
    activateUi(): FormsGS;
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Forms.Form} the Google Form object
     */
    getObject(): GoogleAppsScript.Forms.Form;
    /**
     * Convert a string to a list
     *
     * @param {string} text the text to convert
     *
     * @return {Array<string>} the list
     */
    convertLinebreaksToList(text: string): Array<string>;
    /**
     * Add an item to the form
     *
     * @param {string} title title of the item
     * @param {string} questionType type of the item, contained in QuestionType
     * @param {string | Array<string>} optionsList list of options for multiple
     *  choice, select, or the columns for grid items
     * @param {string | Array<string>} mcGridRowsList rows for grid items
     *
     * @return {FormsGS} the object for chaining
     */
    addItem(title: string, questionType: string, optionsList?: string | Array<string>, mcGridRowsList?: string | Array<string>): FormsGS;
    /**
     * Adds a paragraph item to the form
     *
     * @param {string} title the title of the paragraph item
     *
     * @return {FormsGS} the object for chaining
     */
    addParagraph(title: string): FormsGS;
    /**
     * Adds a true/false item to the form
     *
     * @param {string} title the title of the true/false item
     *
     * @return {FormsGS} the object for chaining
     */
    addTrueFalse(title: string): FormsGS;
    /**
     * Returns an array of values from either an array or a string
     *
     * @param {Array<string> | string} values the values to convert
     *
     * @return {Array<string>} the array of values
     */
    setValuesFromList(values: Array<string> | string): Array<string>;
    /**
     * Adds a multiple choice item to the form
     *
     * @param {string} title the title of the multiple choice item
     * @param {Array<string> | string} items the choices for the question as
     *  an array or string
     *
     * @return {FormsGS} the object for chaining
     */
    addMultipleChoice(title: string, items: Array<string> | string): FormsGS;
    /**
     * Adds a multiple checkbox item to the form
     *
     * @param {string} title the title of the multiple checkbox item
     * @param {Array<string> | string} items the choices for the question as
     *  an array or string
     *
     * @return {FormsGS} the object for chaining
     */
    addMultipleCheck(title: string, items: Array<string> | string): FormsGS;
    /**
     * Adds a multiple choice grid item to the form
     *
     * @param {string} title the title of the multiple choice grid item
     * @param {Array<string> | string} columns the columns for the grid as an
     *  array or string
     * @param {Array<string> | string} rows the rows for the grid as an array
     *  or string
     *
     * @return {FormsGS} the object for chaining
     */
    addMultipleGridChoice(title: string, columns: Array<string> | string, rows: Array<string> | string): FormsGS;
    /**
     * Adds a multiple checkbox grid item to the form
     *
     * @param {string} title the title of the multiple checkbox grid item
     * @param {Array<string> | string} columns the columns for the grid as an
     *  array or string
     * @param {Array<string> | string} rows the rows for the grid as an array
     *  or string
     *
     * @return {FormsGS} the object for chaining
     */
    addMultipleGridCheck(title: string, columns: Array<string> | string, rows: Array<string> | string): FormsGS;
    /**
     * Add an image to the form
     *
     * @param {GoogleAppsScript.Base.BlobSource} file the image to add
     *
     * @return {FormsGS} the object for chaining
     */
    addImage(file: GoogleAppsScript.Base.BlobSource): FormsGS;
    /**
     * Delete the items on this form
     *
     * @return {FormsGS} the object for chaining
     */
    deleteItems(): FormsGS;
    /**
     * Set the title of the form
     *
     * @param {string} title the title of the form
     *
     * @return {FormsGS} the object for chaining
     */
    setTitle(title: string): FormsGS;
}
