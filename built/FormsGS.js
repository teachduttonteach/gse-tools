import { UiGS } from "./UiGS";
import { QuestionType } from "./QuestionType";
/**
 * Class to manipulate Google Forms
 */
export class FormsGS extends UiGS {
    /**
     *
     * @param id the id of the form
     */
    constructor(id) {
        super();
        if (id == null)
            throw new Error("Form id needs to be defined in Form(): " + id);
        this._form = FormApp.openById(id);
        if (this._form == null)
            throw new Error("Form not found with id " + id + " in Form()");
    }
    /**
     * Activate the form Ui for Ui manipulation
     *
     * @returns {FormsGS} the object for chaining
     */
    activateUi() {
        this._ui = FormApp.getUi();
        if (this._ui == null)
            throw new Error("Could not retrieve Ui in Form()");
        return this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Forms.Form} the Google Form object
     */
    getObject() {
        return this._form;
    }
    /**
     * Convert a string to a list
     *
     * @param text the text to convert
     *
     * @returns {Array<string>} the list
     */
    convertLinebreaksToList(text) {
        if ((text == null) || (text == ""))
            return [];
        return text.split("\n");
    }
    ;
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
    addItem(title, questionType, optionsList, mcGridRowsList) {
        switch (questionType) {
            case QuestionType.PARAGRAPH:
                this._form.addParagraphTextItem().setTitle(title);
                break;
            case QuestionType.TRUE_FALSE:
                this._form.addMultipleChoiceItem().setTitle(title).setChoiceValues(["True", "False"]);
                break;
            case QuestionType.MULTIPLE_CHOICE:
                this._form.addMultipleChoiceItem().setTitle(title);
                if (optionsList == undefined)
                    throw new Error("Options list must be defined in FormsGS.addItem()");
                else if (typeof optionsList === "string")
                    this.addMultipleChoice(title, this.convertLinebreaksToList(optionsList));
                else
                    this.addMultipleChoice(title, optionsList);
                break;
            case QuestionType.MULTIPLE_SELECT:
                this._form.addCheckboxItem().setTitle(title);
                if (optionsList == undefined)
                    throw new Error("Options list must be defined in FormsGS.addItem()");
                else if (typeof optionsList === "string")
                    this.addMultipleCheck(title, this.convertLinebreaksToList(optionsList));
                else
                    this.addMultipleCheck(title, optionsList);
                break;
            case QuestionType.MC_GRID:
                let item = this._form.addGridItem().setTitle(title);
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
            case QuestionType.MS_GRID:
                let gridItem = this._form.addCheckboxGridItem().setTitle(title);
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
    }
    ;
    /**
     * Adds a paragraph item to the form
     *
     * @param title the title of the paragraph item
     *
     * @returns {FormsGS} the object for chaining
     */
    addParagraph(title) {
        if (title == null)
            throw new Error("Title needs to be defined for Form.addParagraph");
        this._form.addParagraphTextItem().setTitle(title);
        return this;
    }
    ;
    /**
     * Adds a true/false item to the form
     *
     * @param title the title of the true/false item
     *
     * @returns {FormsGS} the object for chaining
     */
    addTrueFalse(title) {
        if (title == null)
            throw new Error("Title needs to be defined for Form.addTrueFalse");
        this.addMultipleChoice(title, ["True", "False"]);
        return this;
    }
    ;
    /**
     * Returns an array of values from either an array or a string
     *
     * @param values the values to convert
     *
     * @returns {Array<string>} the array of values
     */
    setValuesFromList(values) {
        if (typeof values === "string")
            return this.convertLinebreaksToList(values.toString());
        return values;
    }
    /**
     * Adds a multiple choice item to the form
     *
     * @param title the title of the multiple choice item
     * @param items the choices for the question as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    addMultipleChoice(title, items) {
        let mcItem = this._form.addMultipleChoiceItem().setTitle(title);
        mcItem.setChoiceValues(this.setValuesFromList(items));
        return this;
    }
    /**
     * Adds a multiple checkbox item to the form
     *
     * @param title the title of the multiple checkbox item
     * @param items the choices for the question as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    addMultipleCheck(title, items) {
        let mcItem = this._form.addCheckboxItem().setTitle(title);
        mcItem.setChoiceValues(this.setValuesFromList(items));
        return this;
    }
    /**
     * Adds a multiple choice grid item to the form
     *
     * @param title the title of the multiple choice grid item
     * @param columns the columns for the grid as an array or string
     * @param rows the rows for the grid as an array or string
     *
     * @returns {FormsGS} the object for chaining
     */
    addMultipleGridChoice(title, columns, rows) {
        let mcItem = this._form.addGridItem().setTitle(title);
        mcItem.setColumns(this.setValuesFromList(columns));
        mcItem.setRows(this.setValuesFromList(rows));
        return this;
    }
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
    addMultipleGridCheck(title, columns, rows) {
        let mcItem = this._form.addCheckboxGridItem().setTitle(title);
        mcItem.setColumns(this.setValuesFromList(columns));
        mcItem.setRows(this.setValuesFromList(rows));
        return this;
    }
    ;
    /**
     * Add an image to the form
     *
     * @param file the image to add
     *
     * @returns {FormsGS} the object for chaining
     */
    addImage(file) {
        if (file == null)
            throw new Error("Could not find image in FormsGS.addImage()");
        this._form.addImageItem().setImage(file);
        return this;
    }
    ;
    /**
     * Delete the items on this form
     *
     * @returns {FormsGS} the object for chaining
     */
    deleteItems() {
        for (let i = this._form.getItems().length - 1; i >= 0; i--) {
            this._form.deleteItem(i);
        }
        this._form.deleteAllResponses();
        return this;
    }
    ;
    /**
     * Set the title of the form
     *
     * @param title the title of the form
     *
     * @returns the object for chaining
     */
    setTitle(title) {
        this._form.setTitle(title);
        return this;
    }
}
;
