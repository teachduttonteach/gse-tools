/// <reference types="google-apps-script" />
import { UiGS } from '../UiGS';
/**
 * Class to write a Google Document
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} id the id of the underlying Google Doc
 */
export declare function newDocs(obj: DocsGS, id: string): DocsGS;
/**
 * Activate the Ui of the Doc if we're accessing from a Doc
 *
 * @param {DocsGS} obj the Docs object
 * @return {DocsGS} the object for chaining
 */
export declare function activateDocsUi(obj: DocsGS): DocsGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {DocsGS} obj the Docs object
 * @return {GoogleAppsScript.Document.Document} the Google Document object
 */
export declare function getDocsObject(obj: DocsGS): GoogleAppsScript.Document.Document;
/**
 * Change the delimiter to go between the text before the title and the
 *  title itself
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} titleDelim the new delimiter, defaults to ":"
 *
 * @return {DocsGS} the object for chaining
 */
export declare function changeDocsTitleDelim(obj: DocsGS, titleDelim: string): DocsGS;
/**
 * Change the separator for lists in the Google Doc
 *
 * @param {DocsGS} obj the Docs object
 * @param {GoogleAppsScript.Document.GlyphType} separator the new separator,
 *  defaults to BULLET
 *
 * @return {DocsGS} the object for chaining
 */
export declare function changeDocsSeparator(obj: DocsGS, separator: GoogleAppsScript.Document.GlyphType): DocsGS;
/**
 * Adds a list item to the Google Doc
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} text the text to display
 * @param {string} title the title of the item
 * @param {string} link the link to display
 * @return {DocsGS} the object for chaining
 */
export declare function appendDocsItem(obj: DocsGS, text: string, title: string, link: string): DocsGS;
/**
 * Adds text to the document
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} text the text to add
 * @param {string | number} level the level of the text
 *
 * @return {DocsGS} the object for chaining
 */
export declare function addDocsText(obj: DocsGS, text: string, level: string | number): DocsGS;
/**
 * Clears the body of text
 *
 * @param {DocsGS} obj the Docs object
 * @return {DocsGS} the object for chaining
 */
export declare function clearDocsBody(obj: DocsGS): DocsGS;
/**
 * Class to write a Google Document
 *
 */
export declare class DocsGS extends UiGS {
    private _separator;
    protected _docObject: GoogleAppsScript.Document.Document;
    private _titleDelim;
    /**
     *
     * @param {string} id the id of the underlying Google Doc
     */
    constructor(id: string);
    /**
     * Activate the Ui of the Doc if we're accessing from a Doc
     *
     * @return {DocsGS} the object for chaining
     */
    activateUi(): DocsGS;
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Document.Document} the Google Document object
     */
    getObject(): GoogleAppsScript.Document.Document;
    /**
     * Change the delimiter to go between the text before the title and the
     *  title itself
     *
     * @param {string} titleDelim the new delimiter, defaults to ":"
     *
     * @return {DocsGS} the object for chaining
     */
    changeTitleDelim(titleDelim: string): DocsGS;
    /**
     * Change the separator for lists in the Google Doc
     *
     * @param {GoogleAppsScript.Document.GlyphType} separator the new separator,
     *  defaults to BULLET
     *
     * @return {DocsGS} the object for chaining
     */
    changeSeparator(separator: GoogleAppsScript.Document.GlyphType): DocsGS;
    /**
     * Adds a list item to the Google Doc
     *
     * @param {string} text the text to display
     * @param {string} title the title of the item
     * @param {string} link the link to display
     * @return {DocsGS} the object for chaining
     */
    appendItem(text: string, title: string, link: string): DocsGS;
    /**
     * Adds text to the document
     *
     * @param {string} text the text to add
     * @param {string | number} level the level of the text
     *
     * @return {DocsGS} the object for chaining
     */
    addText(text: string, level?: string | number): DocsGS;
    /**
     * Clears the body of text
     *
     * @return {DocsGS} the object for chaining
     */
    clearBody(): DocsGS;
}
