/// <reference types="google-apps-script" />
import { UiGS } from "./UiGS";
import { ClassInfo } from "./ClassGS";
/**
 * Create a JS-accessible Map
 */
/**
 * Parameters for writing a Google Doc
 */
declare type WriteDocsParams = {
    /**
     * How many announcements to display in the document
     */
    displayAnnouncements: number;
    /**
     * Whether or not to display course work
     */
    displayCoursework: true;
    /**
     * Whether or not to display the course work titles
     */
    displayCourseworkTitle: true;
    /**
     * Whether or not to display the due dates
     */
    displayDueDate: true;
    /**
     * Whether or not to display the description of the course work
     */
    displayDescription: true;
    /**
     * Whether or not to display the materials
     */
    displayMaterials: true;
    /**
     * Whether or not to display file links in the materials
     */
    displayFiles: true;
    /**
     * Whether or not to display video links in the materials
     */
    displayVideos: true;
    /**
     * Whether or not to display urls for the links in the materials
     */
    displayLinks: true;
    /**
     * Whether or not to display form links in the materials
     */
    displayForms: true;
    /**
     * The document title
     */
    docTitle: string;
};
/**
 * Class to write a Google Document
 *
 */
export declare class DocsGS extends UiGS {
    private _separator;
    private _docObject;
    private _titleDelim;
    /**
     *
     * @param id the id of the underlying Google Doc
     */
    constructor(id: string);
    /**
     * Activate the Ui of the Doc if we're accessing from a Doc
     *
     * @returns {DocsGS} the object for chaining
     */
    activateUi(): DocsGS;
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Google Document object
     */
    getObject(): GoogleAppsScript.Document.Document;
    /**
     * Change the delimiter to go between the text before the title and the title itself
     *
     * @param titleDelim the new delimiter, defaults to ":"
     *
     * @returns {DocsGS} the object for chaining
     */
    changeTitleDelim(titleDelim: string): DocsGS;
    /**
     * Change the separator for lists in the Google Doc
     *
     * @param separator the new separator, defaults to BULLET
     *
     * @returns {DocsGS} the object for chaining
     */
    changeSeparator(separator: GoogleAppsScript.Document.GlyphType): DocsGS;
    /**
     * Adds a list item to the Google Doc
     *
     * @returns {DocsGS} the object for chaining
     */
    appendItem(text: string, title: string, link: string): DocsGS;
    /**
     * Adds text to the document
     *
     * @param text the text to add
     * @param level the level of the text
     *
     * @returns {DocsGS} the object for chaining
     */
    addText(text: string, level: string | number): DocsGS;
    /**
     * Clears the body of text
     *
     * @returns {DocsGS} the object for chaining
     */
    clearBody(): DocsGS;
    /**
     * Writes a document from the Classroom info
     *
     * @param topic the topic object that contains class info
     * @param options the options for displaying the info
     *
     * @returns {DocsGS} the object for chaining
     */
    writeClassroomDocuments(data: ClassInfo, topicName: string, options?: WriteDocsParams): DocsGS;
    private _displayCourseWork;
    private _displayMaterial;
}
export {};
