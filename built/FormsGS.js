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
/**
 * Class to manipulate Google Forms
 */
var FormsGS = /** @class */ (function (_super) {
    __extends(FormsGS, _super);
    function FormsGS(id) {
        var _this = _super.call(this) || this;
        if (id != "") {
            _this._form = FormApp.openById(id);
            if (_this._form == null)
                throw new Error("Form not found with id " + id + " in Form()");
            _this._ui = FormApp.getUi();
            if (_this._ui == null)
                throw new Error("Could not retrieve Ui in Form()");
        }
        else {
            throw new Error("Form id needs to be defined in Form(): " + id);
        }
        if (_this._form == null)
            throw new Error("Form not found in Form()");
        return _this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Form object
     */
    FormsGS.prototype.getObject = function () {
        return this._form;
    };
    /**
     * Convert a string to a list
     *
     * @param text the text to convert
     *
     * @returns {Array<string>} the list
     */
    FormsGS.prototype.convertLinebreaksToList = function (text) {
        return text.split("\n");
    };
    ;
    /**
     * Add an item to the form
     *
     * @param title title of the item
     * @param questionType type of the item, contained in QUESTION_TYPE
     * @param optionsList list of options for multiple choice, select, or the columns for grid items
     * @param mcGridRowsList rows for grid items
     *
     * @returns {FormsGS} the object for chaining
     */
    FormsGS.prototype.addItem = function (title, questionType, optionsList, mcGridRowsList) {
        switch (questionType) {
            case QUESTION_TYPE.PARAGRAPH["string"]:
                this._form.addParagraphTextItem().setTitle(title);
                break;
            case QUESTION_TYPE.TRUE_FALSE["string"]:
                this._form.addMultipleChoiceItem().setTitle(title).setChoiceValues(["True", "False"]);
                break;
            case QUESTION_TYPE.MULTIPLE_CHOICE["string"]:
                this._form.addMultipleChoiceItem().setTitle(title);
                if (optionsList == undefined)
                    throw new Error("Options list must be defined in FormsGS.addItem()");
                else if (typeof optionsList === "string")
                    this.addMultipleChoice(title, this.convertLinebreaksToList(optionsList));
                else
                    this.addMultipleChoice(title, optionsList);
                break;
            case QUESTION_TYPE.MULTIPLE_SELECT["string"]:
                this._form.addCheckboxItem().setTitle(title);
                if (optionsList == undefined)
                    throw new Error("Options list must be defined in FormsGS.addItem()");
                else if (typeof optionsList === "string")
                    this.addMultipleCheck(title, this.convertLinebreaksToList(optionsList));
                else
                    this.addMultipleCheck(title, optionsList);
                break;
            case QUESTION_TYPE.MC_GRID["string"]:
                var item = this._form.addGridItem().setTitle(title);
                if (optionsList == undefined)
                    throw new Error("Options list must be defined in FormsGS.addItem()");
                else if (typeof optionsList === "string")
                    item.setColumns(this.convertLinebreaksToList(optionsList));
                else
                    item.setColumns(optionsList);
                if (mcGridRowsList == undefined)
                    throw new Error("Grid rows list must be defined in FormsGS.addItem()");
                else if (typeof mcGridRowsList === "string")
                    item.setRows(this.convertLinebreaksToList(mcGridRowsList));
                else
                    item.setRows(mcGridRowsList);
                break;
            case QUESTION_TYPE.MS_GRID["string"]:
                var gridItem = this._form.addCheckboxGridItem().setTitle(title);
                if (optionsList == undefined)
                    throw new Error("Options list must be defined in FormsGS.addItem()");
                else if (typeof optionsList === "string")
                    gridItem.setColumns(this.convertLinebreaksToList(optionsList));
                else
                    gridItem.setColumns(optionsList);
                if (mcGridRowsList == undefined)
                    throw new Error("Grid rows list must be defined in FormsGS.addItem()");
                else if (typeof mcGridRowsList === "string")
                    gridItem.setRows(this.convertLinebreaksToList(mcGridRowsList));
                else
                    gridItem.setRows(mcGridRowsList);
                break;
            default:
                this._form.addParagraphTextItem().setTitle(title);
                break;
        }
        return this;
    };
    ;
    /**
     * Adds a paragraph item to the form
     *
     * @param title the title of the paragraph item
     *
     * @returns {FormsGS} the object for chaining
     */
    FormsGS.prototype.addParagraph = function (title) {
        if (typeof title === "string") {
            this._form.addParagraphTextItem().setTitle(title);
            return this;
        }
        else {
            throw new Error("Title needs to be defined for Form.addParagraph");
        }
    };
    ;
    /**
     * Adds a true/false item to the form
     *
     * @param title the title of the true/false item
     *
     * @returns {FormsGS} the object for chaining
     */
    FormsGS.prototype.addTrueFalse = function (title) {
        if (typeof title === "string") {
            this.addMultipleChoice(title, ["True", "False"]);
            return this;
        }
        else {
            throw new Error("Title needs to be defined for Form.addTrueFalse");
        }
    };
    ;
    /**
     * Returns an array of values from either an array or a string
     *
     * @param values the values to convert
     *
     * @returns {Array<string>} the array of values
     */
    FormsGS.prototype.setValuesFromList = function (values) {
        if (typeof values === "string")
            return this.convertLinebreaksToList(values.toString());
        return values;
    };
    /**
     * Adds a multiple choice item to the form
     *
     * @param title the title of the multiple choice item
     * @param items the choices for the question as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    FormsGS.prototype.addMultipleChoice = function (title, items) {
        var mcItem = this._form.addMultipleChoiceItem().setTitle(title);
        mcItem.setChoiceValues(this.setValuesFromList(items));
        return this;
    };
    /**
     * Adds a multiple checkbox item to the form
     *
     * @param title the title of the multiple checkbox item
     * @param items the choices for the question as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    FormsGS.prototype.addMultipleCheck = function (title, items) {
        var mcItem = this._form.addCheckboxItem().setTitle(title);
        mcItem.setChoiceValues(this.setValuesFromList(items));
        return this;
    };
    /**
     * Adds a multiple choice grid item to the form
     *
     * @param title the title of the multiple choice grid item
     * @param columns the columns for the grid as an array or string
     * @param rows the rows for the grid as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    FormsGS.prototype.addMultipleGridChoice = function (title, columns, rows) {
        var mcItem = this._form.addGridItem().setTitle(title);
        mcItem.setColumns(this.setValuesFromList(columns));
        mcItem.setRows(this.setValuesFromList(rows));
        return this;
    };
    ;
    /**
     * Adds a multiple checkbox grid item to the form
     *
     * @param title the title of the multiple checkbox grid item
     * @param columns the columns for the grid as an array or string
     * @param rows the rows for the grid as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    FormsGS.prototype.addMultipleGridCheck = function (title, columns, rows) {
        var mcItem = this._form.addCheckboxGridItem().setTitle(title);
        mcItem.setColumns(this.setValuesFromList(columns));
        mcItem.setRows(this.setValuesFromList(rows));
        return this;
    };
    ;
    /**
     * Add an image to the form
     *
     * @param file the image to add
     *
     * @returns {FormsGS} the object for chaining
     */
    FormsGS.prototype.addImage = function (file) {
        if (file != null)
            this._form.addImageItem().setImage(file);
        else
            throw new Error("Could not find image in FormsGS.addImage()");
        return this;
    };
    ;
    /**
     * Delete the items on this form
     *
     * @returns {FormsGS} the object for chaining
     */
    FormsGS.prototype.deleteItems = function () {
        for (var i = this._form.getItems().length - 1; i >= 0; i--) {
            this._form.deleteItem(i);
        }
        this._form.deleteAllResponses();
        return this;
    };
    ;
    /**
     * Set the title of the form
     *
     * @param title the title of the form
     *
     * @returns the object for chaining
     */
    FormsGS.prototype.setTitle = function (title) {
        this._form.setTitle(title);
        return this;
    };
    return FormsGS;
}(UiGS_1.UiGS));
exports.FormsGS = FormsGS;
;
