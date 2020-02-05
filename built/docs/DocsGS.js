import { UiGS } from '../UiGS';
import { getDocLevels } from './DocLevels';
/**
 * Class to write a Google Document
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} id the id of the underlying Google Doc
 * @return {DocsGS} the Docs object
 */
export function newDocs(obj, id) {
    return new DocsGS(id);
}
/**
 * Activate the Ui of the Doc if we're accessing from a Doc
 *
 * @param {DocsGS} obj the Docs object
 * @return {DocsGS} the object for chaining
 */
export function activateDocsUi(obj) {
    return obj.activateUi();
}
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {DocsGS} obj the Docs object
 * @return {GoogleAppsScript.Document.Document} the Google Document object
 */
export function getDocsObject(obj) {
    return obj.getObject();
}
/**
 * Change the delimiter to go between the text before the title and the
 *  title itself
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} titleDelim the new delimiter, defaults to ":"
 *
 * @return {DocsGS} the object for chaining
 */
export function changeDocsTitleDelim(obj, titleDelim) {
    return obj.changeTitleDelim(titleDelim);
}
/**
 * Change the separator for lists in the Google Doc
 *
 * @param {DocsGS} obj the Docs object
 * @param {GoogleAppsScript.Document.GlyphType} separator the new separator,
 *  defaults to BULLET
 *
 * @return {DocsGS} the object for chaining
 */
export function changeDocsSeparator(obj, separator) {
    return obj.changeSeparator(separator);
}
/**
 * Adds a list item to the Google Doc
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} text the text to display
 * @param {string} title the title of the item
 * @param {string} link the link to display
 * @return {DocsGS} the object for chaining
 */
export function appendDocsItem(obj, text, title, link) {
    return obj.appendItem(text, title, link);
}
/**
 * Adds text to the document
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} text the text to add
 * @param {string | number} level the level of the text
 *
 * @return {DocsGS} the object for chaining
 */
export function addDocsText(obj, text, level) {
    return obj.addText(text, level);
}
/**
 * Clears the body of text
 *
 * @param {DocsGS} obj the Docs object
 * @return {DocsGS} the object for chaining
 */
export function clearDocsBody(obj) {
    return obj.clearBody();
}
/**
 * Class to write a Google Document
 *
 */
export class DocsGS extends UiGS {
    /**
     *
     * @param {string} id the id of the underlying Google Doc
     */
    constructor(id) {
        super();
        this._docObject = DocumentApp.openById(id);
        if (this._docObject == null) {
            throw new Error('Document not found in Docs()');
        }
        this._titleDelim = ':';
        this._separator = DocumentApp.GlyphType.BULLET;
    }
    /**
     * Activate the Ui of the Doc if we're accessing from a Doc
     *
     * @return {DocsGS} the object for chaining
     */
    activateUi() {
        this._ui = DocumentApp.getUi();
        return this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Document.Document} the Google Document object
     */
    getObject() {
        return this._docObject;
    }
    /**
     * Return the body of the document
     *
     * @return {GoogleAppsScript.Document.Body} the document body
     */
    getBody() {
        return this._docObject.getBody();
    }
    /**
     * Change the delimiter to go between the text before the title and the
     *  title itself
     *
     * @param {string} titleDelim the new delimiter, defaults to ":"
     *
     * @return {DocsGS} the object for chaining
     */
    changeTitleDelim(titleDelim) {
        if (titleDelim == null) {
            throw new Error('Invalid delimiter defined for DocsGS.changeTitleDelim');
        }
        this._titleDelim = titleDelim;
        return this;
    }
    /**
     * Change the separator for lists in the Google Doc
     *
     * @param {GoogleAppsScript.Document.GlyphType} separator the new separator,
     *  defaults to BULLET
     *
     * @return {DocsGS} the object for chaining
     */
    changeSeparator(separator) {
        if (DocumentApp.GlyphType[separator] == null) {
            throw new Error('Invalid separator defined for Docs.changeSeparator');
        }
        this._separator = separator;
        return this;
    }
    /**
     * Adds a list item to the Google Doc
     *
     * @param {string} text the text to display
     * @param {string} title the title of the item
     * @param {string} link the link to display
     * @return {DocsGS} the object for chaining
     */
    appendItem(text, title, link) {
        if (text == null || title == null || link == null) {
            throw new Error('Text, title and link need to be defined for ' +
                'DocsGS.appendItem()');
        }
        this._docObject
            .getBody()
            .appendListItem(text + this._titleDelim + ' ' + title)
            .setGlyphType(this._separator)
            .setLinkUrl(link);
        return this;
    }
    /**
     * Adds text to the document
     *
     * @param {string} text the text to add
     * @param {string | number} level the level of the text
     *
     * @return {DocsGS} the object for chaining
     */
    addText(text, level = 'N') {
        if (text == undefined) {
            throw new Error('Text needs to be defined for the' +
                ' heading in DocsGS.addText()');
        }
        if (level == undefined) {
            throw new Error('Level (' + level + ') needs to ' +
                'be a ParagraphHeading type in DocsGS.addText()');
        }
        if (typeof level === 'string')
            level = level.substr(0, 1).toUpperCase();
        const thisLevel = getDocLevels(level);
        if (thisLevel == null) {
            throw new Error('Level (' + level + ') needs to ' +
                'be a ParagraphHeading type in DocsGS.addText()');
        }
        this._docObject
            .getBody()
            .appendParagraph(text)
            .setHeading(thisLevel);
        return this;
    }
    /**
     * Clears the body of text
     *
     * @return {DocsGS} the object for chaining
     */
    clearBody() {
        this._docObject.getBody().setText('');
        return this;
    }
}
