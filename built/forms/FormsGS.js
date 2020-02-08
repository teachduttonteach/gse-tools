import { UiGS } from '../UiGS';
import { QuestionType } from '../enums/QuestionType';
import { DriveGS } from '../drive/DriveGS';
/**
 * Class to manipulate Google Forms
 * @param {string} id the id of the form
 * @return {FormsGS} the FormsGS object
 */
export function newForms(id) {
    return new FormsGS(id);
}
/**
 * Activate the form Ui for Ui manipulation
 *
 * @param {FormsGS} obj the Forms object
 * @return {FormsGS} the object for chaining
 */
export function activateFormUi(obj) {
    return obj.activateUi();
}
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {FormsGS} obj the Forms object
 * @return {GoogleAppsScript.Forms.Form} the Google Form object
 */
export function getFormObject(obj) {
    return obj.getObject();
}
/**
 * Convert a string to a list
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} text the text to convert
 *
 * @return {Array<string>} the list
 */
export function convertFormLinebreaksToList(obj, text) {
    return obj.convertLinebreaksToList(text);
}
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
export function addFormItem(obj, title, questionType, optionsList, mcGridRowsList) {
    return obj.addItem(title, questionType, optionsList, mcGridRowsList);
}
/**
 * Adds a paragraph item to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title the title of the paragraph item
 *
 * @return {FormsGS} the object for chaining
 */
export function addFormParagraph(obj, title) {
    return obj.addParagraph(title);
}
/**
 * Adds a true/false item to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title the title of the true/false item
 *
 * @return {FormsGS} the object for chaining
 */
export function addFormTrueFalse(obj, title) {
    return obj.addTrueFalse(title);
}
/**
 * Returns an array of values from either an array or a string
 *
 * @param {FormsGS} obj the Forms object
 * @param {Array<string> | string} values the values to convert
 *
 * @return {Array<string>} the array of values
 */
export function setFormValuesFromList(obj, values) {
    return obj.setValuesFromList(values);
}
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
export function addFormMultipleChoice(obj, title, items) {
    return obj.addMultipleChoice(title, items);
}
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
export function addFormMultipleCheck(obj, title, items) {
    return obj.addMultipleCheck(title, items);
}
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
export function addFormMultipleGridChoice(obj, title, columns, rows) {
    return obj.addMultipleGridChoice(title, columns, rows);
}
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
export function addFormMultipleGridCheck(obj, title, columns, rows) {
    return obj.addMultipleGridCheck(title, columns, rows);
}
/**
 * Add an image to the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {GoogleAppsScript.Base.BlobSource} file the image to add
 *
 * @return {FormsGS} the object for chaining
 */
export function addFormImage(obj, file) {
    return obj.addImage(file);
}
/**
 * Delete the items on this form
 *
 * @param {FormsGS} obj the Forms object
 * @return {FormsGS} the object for chaining
 */
export function deleteFormItems(obj) {
    return obj.deleteItems();
}
/**
 * Set the title of the form
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} title the title of the form
 *
 * @return {FormsGS} the object for chaining
 */
export function setFormTitle(obj, title) {
    return obj.setTitle(title);
}
/**
 * Adds a trigger for this Form
 *
 * @param {FormsGS} obj the Forms object
 * @param {GoogleAppsScript.Script.EventType} triggerType the type of
 *  trigger to add, from Script.EventType
 * @param {string} functionName the name of the function to call
 *
 * @return {FormsGS} the Form object for chaining
 */
export function addFormTrigger(obj, triggerType, functionName) {
    return obj.addTrigger(triggerType, functionName);
}
/**
 * Update triggers for a particular form
 *
 * @param {FormsGS} obj the Forms object
 * @param {GoogleAppsScript.Script.EventType} triggerType the type of
 *  trigger to add, from Script.EventType
 * @param {string} functionName the function to call when triggered on form
 *  submit
 * @return {FormsGS} the object for chaining
 */
export function replaceFormTrigger(obj, triggerType, functionName) {
    return obj.replaceTrigger(triggerType, functionName);
}
/**
 * Delete triggers for a particular function
 *
 * @param {FormsGS} obj the Forms object
 * @param {string} functionName the function to delete triggers for
 * @return {FormsGS} the object for chaining
 */
export function deleteFormTriggers(obj, functionName) {
    return obj.deleteTriggers(functionName);
}
/**
 * Class to manipulate Google Forms
 */
export class FormsGS extends UiGS {
    /**
     *
     * @param {string} id the id of the form
     */
    constructor(id) {
        super();
        if (id == null) {
            throw new Error('Form id needs to be defined in Form(): ' + id);
        }
        this._form = FormApp.openById(id);
        if (this._form == null) {
            throw new Error('Form not found with id ' + id + ' in Form()');
        }
    }
    /**
     * Activate the form Ui for Ui manipulation
     *
     * @return {FormsGS} the object for chaining
     */
    activateUi() {
        this._ui = FormApp.getUi();
        if (this._ui == null)
            throw new Error('Could not retrieve Ui in Form()');
        return this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Forms.Form} the Google Form object
     */
    getObject() {
        return this._form;
    }
    /**
     * Convert a string to a list
     *
     * @param {string} text the text to convert
     *
     * @return {Array<string>} the list
     */
    convertLinebreaksToList(text) {
        if (text == null || text == '')
            return [];
        return text.split('\n');
    }
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
    addItem(title, questionType, optionsList, mcGridRowsList) {
        if (title == null) {
            throw new Error('Title of form question cannot be blank in ' +
                'FormsGS.addItem()');
        }
        if (questionType == null) {
            throw new Error('Question type cannot be blank in ' +
                'FormsGS.addItem()');
        }
        switch (questionType) {
            case QuestionType.Paragraph:
                this._form.addParagraphTextItem().setTitle(title);
                break;
            case QuestionType["True / False"]:
                this._form
                    .addMultipleChoiceItem()
                    .setTitle(title)
                    .setChoiceValues(['True', 'False']);
                break;
            case QuestionType["Multiple Choice"]:
                if (optionsList == undefined) {
                    throw new Error('Options list must be defined in FormsGS.addItem()');
                }
                else if (typeof optionsList === 'string') {
                    this.addMultipleChoice(title, this.convertLinebreaksToList(optionsList));
                }
                else
                    this.addMultipleChoice(title, optionsList);
                break;
            case QuestionType["Multiple Select"]:
                this._form.addCheckboxItem().setTitle(title);
                if (optionsList == undefined) {
                    throw new Error('Options list must be defined in FormsGS.addItem()');
                }
                else if (typeof optionsList === 'string') {
                    this.addMultipleCheck(title, this.convertLinebreaksToList(optionsList));
                }
                else
                    this.addMultipleCheck(title, optionsList);
                break;
            case QuestionType["MC Grid"]:
                const item = this._form.addGridItem().setTitle(title);
                if (optionsList == undefined) {
                    throw new Error('Options list must be ' +
                        'defined in FormsGS.addItem()');
                }
                else if (typeof optionsList === 'string') {
                    item.setColumns(this.convertLinebreaksToList(optionsList));
                }
                else
                    item.setColumns(optionsList);
                if (mcGridRowsList == undefined) {
                    throw new Error('Grid rows list must be defined in ' +
                        'FormsGS.addItem()');
                }
                else if (typeof mcGridRowsList === 'string') {
                    item.setRows(this.convertLinebreaksToList(mcGridRowsList));
                }
                else
                    item.setRows(mcGridRowsList);
                break;
            case QuestionType["MS Grid"]:
                const gridItem = this._form.addCheckboxGridItem().setTitle(title);
                if (optionsList == undefined) {
                    throw new Error('Options list must be ' +
                        'defined in FormsGS.addItem()');
                }
                else if (typeof optionsList === 'string') {
                    gridItem.setColumns(this.convertLinebreaksToList(optionsList));
                }
                else
                    gridItem.setColumns(optionsList);
                if (mcGridRowsList == undefined) {
                    throw new Error('Grid rows list ' +
                        'must be defined in FormsGS.addItem()');
                }
                else if (typeof mcGridRowsList === 'string') {
                    gridItem.setRows(this.convertLinebreaksToList(mcGridRowsList));
                }
                else
                    gridItem.setRows(mcGridRowsList);
                break;
            default:
                this._form.addParagraphTextItem().setTitle(title);
                break;
        }
        return this;
    }
    /**
     * Adds a paragraph item to the form
     *
     * @param {string} title the title of the paragraph item
     *
     * @return {FormsGS} the object for chaining
     */
    addParagraph(title) {
        if (title == null) {
            throw new Error('Title needs to be defined for ' + 'Form.addParagraph');
        }
        this._form.addParagraphTextItem().setTitle(title);
        return this;
    }
    /**
     * Adds a true/false item to the form
     *
     * @param {string} title the title of the true/false item
     *
     * @return {FormsGS} the object for chaining
     */
    addTrueFalse(title) {
        if (title == null) {
            throw new Error('Title needs to be defined for ' + 'Form.addTrueFalse');
        }
        this.addMultipleChoice(title, ['True', 'False']);
        return this;
    }
    /**
     * Returns an array of values from either an array or a string
     *
     * @param {Array<string> | string} values the values to convert
     *
     * @return {Array<string>} the array of values
     */
    setValuesFromList(values) {
        if (typeof values === 'string') {
            return this.convertLinebreaksToList(values.toString());
        }
        return values;
    }
    /**
     * Adds a multiple choice item to the form
     *
     * @param {string} title the title of the multiple choice item
     * @param {Array<string> | string} items the choices for the question as
     *  an array or string
     *
     * @return {FormsGS} the object for chaining
     */
    addMultipleChoice(title, items) {
        const mcItem = this._form.addMultipleChoiceItem().setTitle(title);
        mcItem.setChoiceValues(this.setValuesFromList(items));
        return this;
    }
    /**
     * Adds a multiple checkbox item to the form
     *
     * @param {string} title the title of the multiple checkbox item
     * @param {Array<string> | string} items the choices for the question as
     *  an array or string
     *
     * @return {FormsGS} the object for chaining
     */
    addMultipleCheck(title, items) {
        const mcItem = this._form.addCheckboxItem().setTitle(title);
        mcItem.setChoiceValues(this.setValuesFromList(items));
        return this;
    }
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
    addMultipleGridChoice(title, columns, rows) {
        const mcItem = this._form.addGridItem().setTitle(title);
        mcItem.setColumns(this.setValuesFromList(columns));
        mcItem.setRows(this.setValuesFromList(rows));
        return this;
    }
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
    addMultipleGridCheck(title, columns, rows) {
        const mcItem = this._form.addCheckboxGridItem().setTitle(title);
        mcItem.setColumns(this.setValuesFromList(columns));
        mcItem.setRows(this.setValuesFromList(rows));
        return this;
    }
    /**
     * Add an image to the form
     *
     * @param {GoogleAppsScript.Base.BlobSource} file the image to add
     *
     * @return {FormsGS} the object for chaining
     */
    addImage(file) {
        if (file == null) {
            throw new Error('Could not find image in ' + 'FormsGS.addImage()');
        }
        try {
            this._form.addImageItem().setImage(file);
        }
        catch (e) {
            console.log('WARNING: Could not add image to form in ' +
                'FormsGS.addImage(): ' + e);
        }
        return this;
    }
    /**
     * Add an image to the form
     *
     * @param {string} id the id of the image to add
     *
     * @return {FormsGS} the object for chaining
     */
    addImageFromId(id) {
        if (id == null) {
            throw new Error('Image id not defined in FormsGS.addImageFromId()');
        }
        try {
            const imageBlob = new DriveGS().getImageBlob(id);
            if (typeof imageBlob !== 'boolean') {
                this.addImage(imageBlob);
            }
            else {
                console.log('WARNING: Could not find image in ' +
                    'FormsGS.addImageFromId()');
            }
        }
        catch (e) {
            console.log('WARNING: Could not add image to form in ' +
                'FormsGS.addImageFromId(): ' + e);
        }
        return this;
    }
    /**
     * Delete the items on this form
     *
     * @return {FormsGS} the object for chaining
     */
    deleteItems() {
        for (let i = this._form.getItems().length - 1; i >= 0; i--) {
            this._form.deleteItem(i);
        }
        this._form.deleteAllResponses();
        return this;
    }
    /**
     * Set the title of the form
     *
     * @param {string} title the title of the form
     *
     * @return {FormsGS} the object for chaining
     */
    setTitle(title) {
        this._form.setTitle(title);
        return this;
    }
    /**
     * Adds a trigger for this Form
     *
     * @param {GoogleAppsScript.Script.EventType | string} triggerType the type
     *  of trigger to add, from Script.EventType; or, 'Open' or 'Submit'
     * @param {string} functionName the name of the function to call
     *
     * @return {FormsGS} the Form object for chaining
     */
    addTrigger(triggerType, functionName) {
        if (triggerType == null) {
            throw new Error('Trigger type must be defined in FormsGS.addTrigger()');
        }
        if (typeof triggerType === 'string') {
            triggerType = triggerType.toUpperCase()[0];
        }
        switch (triggerType) {
            case ScriptApp.EventType.ON_OPEN || 'O':
                if (functionName === undefined)
                    functionName = 'onOpen';
                ScriptApp.newTrigger(functionName)
                    .forForm(this._form)
                    .onOpen()
                    .create();
                break;
            default:
                if (functionName === undefined)
                    functionName = 'onSubmit';
                ScriptApp.newTrigger(functionName)
                    .forForm(this._form)
                    .onFormSubmit()
                    .create();
                break;
        }
        return this;
    }
    /**
     * Update triggers for a particular form
     *
     * @param {GoogleAppsScript.Script.EventType} triggerType the type of
     *  trigger to add, from Script.EventType
     * @param {string} functionName the function to call when triggered on form
     *  submit
     * @return {FormsGS} the object for chaining
     */
    replaceTrigger(triggerType, functionName) {
        this.deleteTriggers(functionName);
        this.addTrigger(triggerType, functionName);
        return this;
    }
    /**
     * Delete triggers for a particular function
     *
     * @param {string} functionName the function to delete triggers for
     * @return {FormsGS} the object for chaining
     */
    deleteTriggers(functionName) {
        for (const t of ScriptApp.getProjectTriggers()) {
            if (t.getTriggerSourceId() == this._form.getId()) {
                if ((functionName === undefined) ||
                    (t.getHandlerFunction() == functionName))
                    ScriptApp.deleteTrigger(t);
            }
        }
        return this;
    }
}
