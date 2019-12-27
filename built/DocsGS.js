import { UiGS } from "./UiGS";
/**
 * Heading levels within a Google Doc, mapping anything starting with:
 * - "N" to NORMAL
 * - "S" to SUBTITLE
 * - "T" to TITLE
 *  and all numbers 1 - 6 to their respective HEADINGs
 */
function DocLevels(key) {
    switch (key) {
        case "N":
            return DocumentApp.ParagraphHeading.NORMAL;
        case "S":
            return DocumentApp.ParagraphHeading.SUBTITLE;
        case "T":
            return DocumentApp.ParagraphHeading.TITLE;
        case 1:
            return DocumentApp.ParagraphHeading.HEADING1;
        case 2:
            return DocumentApp.ParagraphHeading.HEADING2;
        case 3:
            return DocumentApp.ParagraphHeading.HEADING3;
        case 4:
            return DocumentApp.ParagraphHeading.HEADING4;
        case 5:
            return DocumentApp.ParagraphHeading.HEADING5;
        case 6:
            return DocumentApp.ParagraphHeading.HEADING6;
    }
    return DocumentApp.ParagraphHeading.NORMAL;
}
/**
 * Class to write a Google Document
 *
 */
export class DocsGS extends UiGS {
    /**
     *
     * @param id the id of the underlying Google Doc
     */
    constructor(id) {
        super();
        this._docObject = DocumentApp.openById(id);
        if (this._docObject == null)
            throw new Error("Document not found in Docs()");
        this._titleDelim = ":";
        this._separator = DocumentApp.GlyphType.BULLET;
    }
    /**
     * Activate the Ui of the Doc if we're accessing from a Doc
     *
     * @returns {DocsGS} the object for chaining
     */
    activateUi() {
        this._ui = DocumentApp.getUi();
        return this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Google Document object
     */
    getObject() {
        return this._docObject;
    }
    /**
     * Change the delimiter to go between the text before the title and the title itself
     *
     * @param titleDelim the new delimiter, defaults to ":"
     *
     * @returns {DocsGS} the object for chaining
     */
    changeTitleDelim(titleDelim) {
        if (titleDelim == null)
            throw new Error("Invalid delimiter defined for DocsGS.changeTitleDelim");
        this._titleDelim = titleDelim;
        return this;
    }
    /**
     * Change the separator for lists in the Google Doc
     *
     * @param separator the new separator, defaults to BULLET
     *
     * @returns {DocsGS} the object for chaining
     */
    changeSeparator(separator) {
        if (!(separator in DocumentApp.GlyphType))
            throw new Error("Invalid separator defined for Docs.changeSeparator");
        this._separator = separator;
        return this;
    }
    /**
     * Adds a list item to the Google Doc
     *
     * @returns {DocsGS} the object for chaining
     */
    appendItem(text, title, link) {
        if ((text == null) || (title == null) || (link == null))
            throw new Error("Text, title and link need to be defined for DocsGS.appendItem()");
        this._docObject.getBody().appendListItem(text + this._titleDelim + " " + title).setGlyphType(this._separator).setLinkUrl(link);
        return this;
    }
    ;
    /**
     * Adds text to the document
     *
     * @param text the text to add
     * @param level the level of the text
     *
     * @returns {DocsGS} the object for chaining
     */
    addText(text, level) {
        if (text == undefined)
            throw new Error("Text needs to be defined for the heading in DocsGS.addText()");
        if (level == undefined)
            throw new Error("Level (" + level + ") needs to be a ParagraphHeading type in DocsGS.addText()");
        if (typeof level === "string")
            level = level.substr(0, 1).toUpperCase();
        let t_level = DocLevels(level);
        if (t_level == null)
            throw new Error("Level (" + level + ") needs to be a ParagraphHeading type in DocsGS.addText()");
        this._docObject.getBody().appendParagraph(text).setHeading(t_level);
        return this;
    }
    ;
    /**
     * Clears the body of text
     *
     * @returns {DocsGS} the object for chaining
     */
    clearBody() {
        this._docObject.getBody().setText("");
        return this;
    }
    /**
     * Writes a document from the Classroom info
     *
     * @param topic the topic object that contains class info
     * @param options the options for displaying the info
     *
     * @returns {DocsGS} the object for chaining
     */
    writeClassroomDocuments(data, topicName, options) {
        // Expand options
        if (options == undefined)
            options = {};
        let { displayAnnouncements = 1, displayCoursework = true, docTitle = undefined } = options;
        // Clear the body and get the doc title
        this.clearBody();
        let t_title = docTitle;
        if (t_title == undefined)
            t_title = data.getName(topicName);
        let t_level = DocLevels("T");
        if ((t_title == undefined) || (t_level == undefined))
            throw new Error("Title (" + t_title + ") or level (" + t_level + ") not defined in DocsGS.writeClassroomDocuments()");
        // Display the title by removing the first child if necessary
        let t_body = this._docObject.getBody();
        let t_child = t_body.getChild(0);
        if (t_child.getType() == DocumentApp.ElementType.LIST_ITEM) {
            t_body.appendParagraph(t_title).setHeading(t_level);
            t_child.removeFromParent();
        }
        else
            t_child.asParagraph().setHeading(t_level).setText(t_title);
        // Display the given number of announcements
        if (displayAnnouncements) {
            let t_announcements = data.getAnnouncements();
            if (t_announcements == undefined)
                throw new Error("Announcement titles undefined in DocsGS.writeClassroomDocuments()");
            for (let a = 0; a < displayAnnouncements; a++) {
                this.addText(t_announcements[a], "Normal");
            }
        }
        // Display the coursework
        if (displayCoursework) {
            // Get the coursework for the topic
            let t_courseWork = data.getCourseWork(topicName);
            let t_titles = t_courseWork.work;
            let t_level = t_courseWork.level;
            if ((t_level == undefined) || (t_titles == undefined))
                throw new Error("Coursework titles undefined in DocsGS.writeClassroomDocuments()");
            // For each of the pieces of course work ...
            for (let courseWork of t_titles) {
                this._displayCourseWork(courseWork, options);
            }
        }
        return this;
    }
    _displayCourseWork(courseWork, options) {
        let { displayCourseworkTitle = true, displayDueDate = true, displayDescription = true, displayMaterials = true, } = options;
        // Display the title, due date and description
        if (displayCourseworkTitle)
            this.addText(courseWork.title, 2);
        if (displayDueDate && courseWork.dueDate) {
            this.addText(courseWork.dueDate, 3);
        }
        if (displayDescription && courseWork.description) {
            this.addText(courseWork.description, "Normal");
        }
        // Display the materials if they exist
        if (displayMaterials && (courseWork.materials != null) && (courseWork.materials.length > 0)) {
            this._displayMaterial(courseWork.materials, options);
        }
    }
    _displayMaterial(materials, options) {
        let { displayFiles = true, displayForms = true, displayLinks = true, displayVideos = true, } = options;
        this.addText("Materials:", "Normal");
        for (let material of materials) {
            if (displayFiles && material.file) {
                this.appendItem("File", material.title, material.file);
            }
            else if (displayVideos && material.video) {
                this.appendItem("Video", material.title, material.video);
            }
            else if (displayLinks && material.link) {
                this.appendItem("Link", material.title, material.link);
            }
            else if (displayForms && material.form) {
                this.appendItem("Form", material.title, material.form);
            }
        }
    }
}
;
