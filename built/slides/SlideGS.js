import { QuestionType } from '../enums/QuestionType';
/**
 * Class to access methods and properties of individual Slides of Google
 *  Presentations
 */
export function newSlide(slideObject) {
    return new SlideGS(slideObject);
}
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SlideGS} obj the Slide object
 * @return {GoogleAppsScript.Slides.Slide} the Slide object
 */
export function getSlideObject(obj) {
    return obj.getObject();
}
/**
 * Replaces the picture at the specified number (default 0) with the
 *  specified picture
 *
 * @param {SlideGS} obj the Slide object
 * @param {GoogleAppsScript.Base.BlobSource} picture the blob (data)
 *  holding the picture
 * @param {number} imageNumber the number of the image on the slide
 *
 * @return {number} the number of the page element of the replaced picture
 */
export function replaceSlideImage(obj, picture, imageNumber = 0) {
    return obj.replaceImage(picture, imageNumber);
}
/**
 * Get the speaker notes from the slide
 *
 * @param {SlideGS} obj the Slide object
 * @return {string} the speaker notes
 */
export function getSlideNotes(obj) {
    return obj.getNotes();
}
;
/**
 * Set the speaker notes to the specified text
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} text the speaker notes
 *
 * @return {SlideGS} the object for chaining
 */
export function setSlideNotes(obj, text) {
    return obj.setNotes(text);
}
;
/**
 * Sets the title of the slide
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} title the title of the slide
 *
 * @return {SlideGS} the object for chaining
 */
export function setSlideTitle(obj, title) {
    return obj.setTitle(title);
}
;
/**
 * Sets the body of the slide
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} body the body of the slide
 *
 * @return {SlideGS} the object for chaining
 */
export function setSlideBody(obj, body) {
    return obj.setBody(body);
}
;
/**
 * Sets the body of the slide to a list
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} text the list, as a string with "\t" for each new
 *  member of the list
 * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional
 *  type of bullet for the list
 *
 * @return {SlideGS} the object for chaining
 */
export function setSlideList(obj, text, bulletType = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE) {
    return obj.setList(text, bulletType);
}
;
/**
 * Add items to a list on a slide
 *
 * @param {SlideGS} obj the Slide object
 * @param {string | Array<string>} questionOptions the options as a list
 *  of line breaks or an array
 * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional
 *  type of bullet for the list
 *
 * @return {SlideGS} the object for chaining
 */
export function addSlideItems(obj, questionOptions, bulletType = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE) {
    return obj.addItems(questionOptions, bulletType);
}
;
/**
 * Adds the item to the slide of a particular type
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} type the type of item to add to the slide
 * @param {string | Array<string>} itemsToAdd the string or array of
 *  strings that holds the item data
 * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional
 *  type of bullet for the list
 *
 * @return {SlideGS} the object for chaining
 */
export function addSlideItem(obj, type, itemsToAdd, bulletType = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE) {
    return obj.addItem(type, itemsToAdd, bulletType);
}
;
/**
 * Change the picture displayed in the slide
 *
 * @param {SlideGS} obj the Slide object
 * @param {GoogleAppsScript.Base.BlobSource} chosenPictureBlob the blob
 *  (data) of the picture to add
 * @param {number} pictureNumber the number of the picture on the slide
 *
 * @return {number} the number of the replaced page element
 */
export function changeSlidePicture(obj, chosenPictureBlob, pictureNumber = 0) {
    return obj.changePicture(chosenPictureBlob, pictureNumber);
}
;
/**
 * Sets the dimensions of the slide for picture orientation
 *
 * @param {SlideGS} obj the Slide object
 * @param {Dimensions} dimensions object that has at least one of the
 *  following properties: "totalHeight", "totalWidth", "maxHeight",
 *  "maxWidth", "margin"
 *
 * @return {SlideGS} the object for chaining
 */
export function setSlideDimensions(obj, dimensions) {
    return obj.setDimensions(dimensions);
}
;
/**
 * Position the picture on the slide according to the size of the image
 *
 * @param {SlideGS} obj the Slide object
 * @param {number} id the number of the picture on the slide
 * @param {boolean} bottom whether or not to display the image aligned to
 *  the bottom (default true = bottom)
 * @param {boolean} right whether or not to display the image aligned to
 *  the right (default true = right)
 * @return {SlideGS} the object for chaining
 */
export function positionSlidePicture(obj, id, bottom = true, right = true) {
    return obj.positionPicture(id, bottom, right);
}
;
/**
 * Get the page elements on the slide
 *
 * @param {SlideGS} obj the Slide object
 * @return {Array<GoogleAppsScript.Slides.PageElement>} the page elements
 */
export function getSlidePageElements(obj) {
    return obj.getPageElements();
}
;
/**
 * Removes the current slide
 * @param {SlideGS} obj the Slide object
 */
export function removeSlide(obj) {
    return obj.remove();
}
/**
 * Class to access methods and properties of individual Slides of Google
 *  Presentations
 */
export class SlideGS {
    /**
     *
     * @param {GoogleAppsScript.Slides.Slide} slideObject the underlying
     *  Google object
     */
    constructor(slideObject) {
        this._slide = slideObject;
        this._pageElements = this._slide.getPageElements();
        this._dimensions = {};
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Slides.Slide} the Slide object
     */
    getObject() {
        return this._slide;
    }
    /**
     * Replaces the picture at the specified number (default 0) with the
     *  specified picture
     *
     * @param {GoogleAppsScript.Base.BlobSource} picture the blob (data)
     *  holding the picture
     * @param {number} imageNumber the number of the image on the slide
     *
     * @return {number} the number of the page element of the replaced picture
     */
    replaceImage(picture, imageNumber = 0) {
        if (picture == null) {
            throw new Error('Picture not defined in Slide.replaceImage');
        }
        let foundImages = 0;
        for (let j = 0; j < this._pageElements.length; j++) {
            if (this._pageElements[j].getPageElementType() ==
                SlidesApp.PageElementType.IMAGE) {
                if (foundImages == imageNumber) {
                    this._pageElements[j].asImage().replace(picture);
                    return j;
                }
                else
                    foundImages++;
            }
        }
        throw new Error('Could not find picture number ' + imageNumber +
            ' on slide in Slide.replaceImage');
    }
    /**
     * Get the speaker notes from the slide
     *
     * @return {string} the speaker notes
     */
    getNotes() {
        return this._slide.getNotesPage().getSpeakerNotesShape().getText().
            asString();
    }
    ;
    /**
     * Set the speaker notes to the specified text
     *
     * @param {string} text the speaker notes
     *
     * @return {SlideGS} the object for chaining
     */
    setNotes(text) {
        if (text == null) {
            throw new Error('Notes text cannot be blank in Slide.setNotes');
        }
        this._slide.getNotesPage().getSpeakerNotesShape().getText().
            setText(text);
        return this;
    }
    ;
    /**
     * Sets the title of the slide
     *
     * @param {string} title the title of the slide
     *
     * @return {SlideGS} the object for chaining
     */
    setTitle(title) {
        if (title == null) {
            throw new Error('Slide title cannot be blank in Slide.setTitle');
        }
        this._slide.getPlaceholder(SlidesApp.PlaceholderType.TITLE).asShape().
            getText().setText(title);
        return this;
    }
    ;
    /**
     * Sets the body of the slide
     *
     * @param {string} body the body of the slide
     *
     * @return {SlideGS} the object for chaining
     */
    setBody(body) {
        if (body == null) {
            throw new Error('Body cannot be blank in Slide.setBody');
        }
        this._slide.getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape().
            getText().setText(body);
        return this;
    }
    ;
    /**
     * Sets the body of the slide to a list
     *
     * @param {string} text the list, as a string with "\t" for each new
     *  member of the list
     * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional
     *  type of bullet for the list
     *
     * @return {SlideGS} the object for chaining
     */
    setList(text, bulletType = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE) {
        if (text == null) {
            throw new Error('Text cannot be blank in Slide.setList');
        }
        this._slide.getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape().
            getText().setText(text).getListStyle().applyListPreset(bulletType);
        return this;
    }
    ;
    /**
     * Add items to a list on a slide
     *
     * @param {string | Array<string>} questionOptions the options as a list
     *  of line breaks or an array
     * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional
     *  type of bullet for the list
     *
     * @return {SlideGS} the object for chaining
     */
    addItems(questionOptions, bulletType = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE) {
        let choices = [];
        if (typeof questionOptions !== 'string')
            choices = questionOptions;
        else
            choices = questionOptions.split('\n');
        let textRange = '';
        for (const choice of choices) {
            textRange += '\t' + choice + '\n';
        }
        this.setList(textRange, bulletType);
        return this;
    }
    ;
    /**
     * Adds the item to the slide of a particular type
     *
     * @param {string} type the type of item to add to the slide
     * @param {string | Array<string>} itemsToAdd the string or array of
     *  strings that holds the item data
     * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional
     *  type of bullet for the list
     *
     * @return {SlideGS} the object for chaining
     */
    addItem(type, itemsToAdd, bulletType = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE) {
        switch (type) {
            case QuestionType.TRUE_FALSE:
                this.setBody('True or False?');
                break;
            case QuestionType.MULTIPLE_CHOICE:
            case QuestionType.MULTIPLE_SELECT:
                this.addItems(itemsToAdd, bulletType);
                break;
        }
        return this;
    }
    ;
    /**
     * Change the picture displayed in the slide
     *
     * @param {GoogleAppsScript.Base.BlobSource} chosenPictureBlob the blob
     *  (data) of the picture to add
     * @param {number} pictureNumber the number of the picture on the slide
     *
     * @return {number} the number of the replaced page element
     */
    changePicture(chosenPictureBlob, pictureNumber = 0) {
        if (chosenPictureBlob == null) {
            throw new Error('Slide and blob of chosen picture need to be ' +
                'defined in Slides.changePicture');
        }
        let countPictures = 0;
        for (let pictureId = 0; pictureId < this._pageElements.length; pictureId++) {
            if (this._pageElements[pictureId].getPageElementType() ==
                SlidesApp.PageElementType.IMAGE) {
                if (countPictures == pictureNumber) {
                    this._pageElements[pictureId].asImage().replace(chosenPictureBlob);
                    return pictureId;
                }
                countPictures++;
            }
        }
        return -1;
    }
    ;
    /**
     * Sets the dimensions of the slide for picture orientation
     *
     * @param {Dimensions} dimensions object that has at least one of the
     *  following properties: "totalHeight", "totalWidth", "maxHeight",
     *  "maxWidth", "margin"
     *
     * @return {SlideGS} the object for chaining
     */
    setDimensions(dimensions) {
        if (dimensions == undefined) {
            throw new Error('Height and width of dimensions need to all be ' +
                'integers in Slides.setDimensions');
        }
        this._dimensions = dimensions;
        return this;
    }
    ;
    /**
     * Position the picture on the slide according to the size of the image
     *
     * @param {number} id the number of the picture on the slide
     * @param {boolean} bottom whether or not to display the image aligned to
     *  the bottom (default true = bottom)
     * @param {boolean} right whether or not to display the image aligned to
     *  the right (default true = right)
     * @return {SlideGS} the object for chaining
     */
    positionPicture(id, bottom = true, right = true) {
        if (id == null) {
            throw new Error('ID and Slide need to be defined in ' +
                'SlidesGS.positionPicture()');
        }
        if (this._pageElements == null) {
            throw new Error('Could not get slide specified by Slide object in ' +
                'Slides.positionPicture');
        }
        if (this._pageElements[id] == null) {
            throw new Error('Could not get element id (' + id +
                ') off of Slide object in Slides.positionPicture');
        }
        const height = this._pageElements[id].getHeight();
        const width = this._pageElements[id].getWidth();
        const { maxHeight = 300, maxWidth = 250, totalHeight = 400, totalWidth = 720, margin = 10, } = this._dimensions;
        if (height > width) {
            const newWidth = (maxHeight / height) * width;
            this._pageElements[id].setWidth(newWidth);
            this._pageElements[id].setHeight(maxHeight);
            if (right) {
                this._pageElements[id].
                    setLeft(totalWidth - newWidth - margin);
            }
            else
                this._pageElements[id].setLeft(margin);
            if (bottom) {
                this._pageElements[id].
                    setTop(totalHeight - maxHeight - margin);
            }
            else
                this._pageElements[id].setTop(margin);
        }
        else {
            const newHeight = (maxWidth / width) * height;
            this._pageElements[id].setHeight(newHeight);
            this._pageElements[id].setWidth(maxWidth);
            if (bottom) {
                this._pageElements[id].
                    setTop(totalHeight - newHeight - margin);
            }
            else
                this._pageElements[id].setTop(margin);
            if (right) {
                this._pageElements[id].
                    setLeft(totalWidth - maxWidth - margin);
            }
            else
                this._pageElements[id].setLeft(margin);
        }
        return this;
    }
    ;
    /**
     * Get the page elements on the slide
     *
     * @return {Array<GoogleAppsScript.Slides.PageElement>} the page elements
     */
    getPageElements() {
        return this._pageElements;
    }
    ;
    /**
     * Removes the current slide
     */
    remove() {
        this._slide.remove();
    }
}
;
