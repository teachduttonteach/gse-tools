"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UiGS_1 = require("./UiGS");
var DocLevels = new Map([
    ["N", GoogleAppsScript.Document.ParagraphHeading.NORMAL],
    ["S", GoogleAppsScript.Document.ParagraphHeading.SUBTITLE],
    ["T", GoogleAppsScript.Document.ParagraphHeading.TITLE],
    ["H1", GoogleAppsScript.Document.ParagraphHeading.HEADING1],
    ["H2", GoogleAppsScript.Document.ParagraphHeading.HEADING2],
    ["H3", GoogleAppsScript.Document.ParagraphHeading.HEADING3],
    ["H4", GoogleAppsScript.Document.ParagraphHeading.HEADING4],
    ["H5", GoogleAppsScript.Document.ParagraphHeading.HEADING5],
    ["H6", GoogleAppsScript.Document.ParagraphHeading.HEADING6]
]);
/**
 * Class to write a Google Document
 *
 */
var DocsGS = /** @class */ (function (_super) {
    __extends(DocsGS, _super);
    /**
     *
     * @param id the id of the underlying Google Doc
     */
    function DocsGS(id) {
        var _this = _super.call(this) || this;
        _this._ui = DocumentApp.getUi();
        _this._docObject = DocumentApp.openById(id);
        if (_this._docObject == null)
            throw new Error("Document not found in Docs()");
        _this._titleDelim = ":";
        _this._separator = DocumentApp.GlyphType.BULLET;
        return _this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Document object
     */
    DocsGS.prototype.getObject = function () {
        return this._docObject;
    };
    /**
     * Change the delimiter to go between the text before the title and the title itself
     *
     * @param titleDelim the new delimiter, defaults to ":"
     *
     * @returns this object, for chaining
     */
    DocsGS.prototype.changeTitleDelim = function (titleDelim) {
        if (titleDelim) {
            this._titleDelim = titleDelim;
            return this;
        }
        else {
            throw new Error("Invalid delimiter defined for Docs.changeTitleDelim");
        }
    };
    /**
     * Change the separator for lists in the Google Doc
     *
     * @param separator the new separator, defaults to BULLET
     *
     * @returns this object, for chaining
     */
    DocsGS.prototype.changeSeparator = function (separator) {
        if (separator) {
            this._separator = separator;
            return this;
        }
        else {
            throw new Error("Invalid separator defined for Docs.changeSeparator");
        }
    };
    /**
     * Adds a list item to the Google Doc
     *
     * @returns this object, for chaining
     */
    DocsGS.prototype.appendItem = function (text, title, link) {
        if ((text == null) || (title == null) || (link == null))
            throw new Error("Text, title and link need to be defined for DocsGS.appendItem()");
        this._docObject.getBody().appendListItem(text + this._titleDelim + " " + title).setGlyphType(this._separator).setLinkUrl(link);
        return this;
    };
    ;
    /**
     * Adds text to the document
     *
     * @param text the text to add
     * @param level the level of the text
     *
     * @returns the document object
     */
    DocsGS.prototype.addText = function (text, level) {
        if ((text == null) || (level == undefined))
            throw new Error("Text needs to be defined for the heading in DocsGS.addText()");
        this._docObject.getBody().appendParagraph(text).setHeading(level);
        return this;
    };
    ;
    /**
     * Clears the body of text
     *
     * @returns the document object
     */
    DocsGS.prototype.clearBody = function () {
        this._docObject.getBody().setText("");
        return this;
    };
    /**
     * Writes a document from the Classroom info
     *
     * @param topic the topic object that contains class info
     * @param options the options for displaying the info
     *
     * @returns {DocsGS} the document object
     */
    DocsGS.prototype.writeClassroomDocuments = function (data, topicName, docTitle, options) {
        var _a = options, _b = _a.displayTitle, displayTitle = _b === void 0 ? true : _b, _c = _a.displayAnnouncements, displayAnnouncements = _c === void 0 ? true : _c, _d = _a.displayCoursework, displayCoursework = _d === void 0 ? true : _d, _e = _a.displayCourseworkTitle, displayCourseworkTitle = _e === void 0 ? true : _e, _f = _a.displayDueDate, displayDueDate = _f === void 0 ? true : _f, _g = _a.displayDescription, displayDescription = _g === void 0 ? true : _g, _h = _a.dueDate, dueDate = _h === void 0 ? "Due Date" : _h, _j = _a.dateOrder, dateOrder = _j === void 0 ? "MDY" : _j, _k = _a.displayFiles, displayFiles = _k === void 0 ? true : _k, _l = _a.dateDelimiter, dateDelimiter = _l === void 0 ? "/" : _l, _m = _a.displayForms, displayForms = _m === void 0 ? true : _m, _o = _a.displayLinks, displayLinks = _o === void 0 ? true : _o, _p = _a.displayMaterials, displayMaterials = _p === void 0 ? true : _p, _q = _a.displayVideos, displayVideos = _q === void 0 ? true : _q;
        this.clearBody();
        var t_title = DocLevels.get("T");
        if (t_title == undefined)
            throw new Error("No title in DocsGS.writeClassroomDocuments()");
        if (displayTitle)
            this.addText(docTitle, t_title);
        if (displayAnnouncements) {
            var t_announcements = data.getAnnouncements(topicName);
            var t_titles = t_announcements.titles;
            var t_level = t_announcements.level;
            if ((t_level == undefined) || (t_titles == undefined))
                throw new Error("Announcement titles undefined in DocsGS.writeClassroomDocuments()");
            for (var _i = 0, t_titles_1 = t_titles; _i < t_titles_1.length; _i++) {
                var title = t_titles_1[_i];
                var t_pLevel = DocLevels.get(t_level);
                if (t_pLevel == undefined)
                    throw new Error("Paragraph level undefined in DocsGS.writeClassroomDocuments");
                this.addText(title, t_pLevel);
            }
        }
        if (displayCoursework) {
            var t_courseWork = data.getCourseWork(topicName);
            var t_titles = t_courseWork.titles;
            var t_level = t_courseWork.level;
            if ((t_level == undefined) || (t_titles == undefined))
                throw new Error("Coursework titles undefined in DocsGS.writeClassroomDocuments()");
            for (var _r = 0, t_titles_2 = t_titles; _r < t_titles_2.length; _r++) {
                var courseWork = t_titles_2[_r];
                // LEFT OFF HERE
                if (displayCourseworkTitle)
                    this.addText(courseWork.title, 2);
                if (displayDueDate && courseWork.dueDate) {
                    var dueDateString = dueDate;
                    for (var i = 0; i < dateOrder.length; i++) {
                        var currentLetter = dateOrder.substring(i, i + 1);
                        if (currentLetter == "M")
                            dueDateString += courseWork["dueDate"]["month"];
                        else if (currentLetter == "D")
                            dueDateString += courseWork["dueDate"]["day"];
                        else if (currentLetter == "Y")
                            dueDateString += courseWork["dueDate"]["year"];
                        if (i < (dateOrder.length - 1))
                            dueDateString += dateDelimiter;
                    }
                    this.addText(dueDateString, 3);
                }
                if (displayDescription && courseWork.description) {
                    var t_normal = DocLevels.get("N");
                    if (t_normal == undefined)
                        throw new Error("Normal type undefined in DocsGS.writeClassroomDocuments()");
                    this.addText(courseWork.description, t_normal);
                }
                if (displayMaterials && courseWork.materials) {
                    var t_normal = DocLevels.get("N");
                    if (t_normal == undefined)
                        throw new Error("Normal type undefined in DocsGS.writeClassroomDocuments()");
                    this.addText("Materials:", t_normal);
                    for (var _s = 0, _t = courseWork.materials; _s < _t.length; _s++) {
                        var material = _t[_s];
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
        }
        return this;
    };
    return DocsGS;
}(UiGS_1.UiGS));
exports.DocsGS = DocsGS;
;
