/// <reference types="google-apps-script" />
import { UiGS } from "./UiGS";
/**
 * Class to manipulate Google Forms
 */
export declare class FormsGS extends UiGS {
    private _form;
    _ui: GoogleAppsScript.Base.Ui;
    /**
     *
     * @param id the id of the form
     */
    constructor(id: string);
    /**
     * Activate the form Ui for Ui manipulation
     *
     * @returns {FormsGS} the object for chaining
     */
    activateUi(): FormsGS;
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Forms.Form} the Google Form object
     */
    getObject(): GoogleAppsScript.Forms.Form;
    /**
     * Convert a string to a list
     *
     * @param text the text to convert
     *
     * @returns {Array<string>} the list
     */
    convertLinebreaksToList(text: string): Array<string>;
    /**
     * Add an item to the form
     *
     * @param title title of the item
     * @param questionType type of the item, contained in QuestionType
     * @param optionsList list of options for multiple choice, select, or the columns for grid items
     * @param mcGridRowsList rows for grid items
     *
     * @returns {FormsGS} the object for chaining
     */
    addItem(title: string, questionType: string, optionsList?: string | Array<string>, mcGridRowsList?: string | Array<string>): FormsGS;
    /**
     * Adds a paragraph item to the form
     *
     * @param title the title of the paragraph item
     *
     * @returns {FormsGS} the object for chaining
     */
    addParagraph(title: string): FormsGS;
    /**
     * Adds a true/false item to the form
     *
     * @param title the title of the true/false item
     *
     * @returns {FormsGS} the object for chaining
     */
    addTrueFalse(title: string): FormsGS;
    /**
     * Returns an array of values from either an array or a string
     *
     * @param values the values to convert
     *
     * @returns {Array<string>} the array of values
     */
    setValuesFromList(values: Array<string> | string): Array<string>;
    /**
     * Adds a multiple choice item to the form
     *
     * @param title the title of the multiple choice item
     * @param items the choices for the question as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    addMultipleChoice(title: string, items: Array<string> | string): FormsGS;
    /**
     * Adds a multiple checkbox item to the form
     *
     * @param title the title of the multiple checkbox item
     * @param items the choices for the question as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    addMultipleCheck(title: string, items: Array<string> | string): FormsGS;
    /**
     * Adds a multiple choice grid item to the form
     *
     * @param title the title of the multiple choice grid item
     * @param columns the columns for the grid as an array or string
     * @param rows the rows for the grid as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    addMultipleGridChoice(title: string, columns: Array<string> | string, rows: Array<string> | string): FormsGS;
    /**
     * Adds a multiple checkbox grid item to the form
     *
     * @param title the title of the multiple checkbox grid item
     * @param columns the columns for the grid as an array or string
     * @param rows the rows for the grid as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    addMultipleGridCheck(title: string, columns: Array<string> | string, rows: Array<string> | string): FormsGS;
    /**
     * Add an image to the form
     *
     * @param file the image to add
     *
     * @returns {FormsGS} the object for chaining
     */
    addImage(file: GoogleAppsScript.Base.BlobSource): FormsGS;
    /**
     * Delete the items on this form
     *
     * @returns {FormsGS} the object for chaining
     */
    deleteItems(): FormsGS;
    /**
     * Set the title of the form
     *
     * @param title the title of the form
     *
     * @returns the object for chaining
     */
    setTitle(title: string): FormsGS;
}
