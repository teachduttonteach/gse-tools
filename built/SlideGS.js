/**
 * Class to access methods and properties of individual Slides of Google Presentations
 */
var SlideGS = /** @class */ (function () {
    function SlideGS(slideObject) {
        this._slide = slideObject;
        this._pageElements = this._slide.getPageElements();
        this._dimensions.totalHeight = 400;
        this._dimensions.totalWidth = 720;
        this._dimensions.maxHeight = 300;
        this._dimensions.maxWidth = 250;
        this._dimensions.margin = 10;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Slide object
     */
    SlideGS.prototype.getObject = function () {
        return this._slide;
    };
    /**
     * Replaces the picture at the specified number (default 0) with the specified picture
     *
     * @param picture the blob (data) holding the picture
     *
     * @returns {number} the number of the page element of the replaced picture
     */
    SlideGS.prototype.replaceImage = function (picture, imageNumber) {
        if (imageNumber === void 0) { imageNumber = 0; }
        if (picture) {
            var foundImages = 0;
            for (var j = 0; j < this._pageElements.length; j++) {
                if (this._pageElements[j].getPageElementType() == SlidesApp.PageElementType.IMAGE) {
                    if (foundImages = imageNumber) {
                        this._pageElements[j].asImage().replace(picture);
                        return j;
                    }
                    else {
                        foundImages++;
                    }
                }
            }
            throw new Error("Could not find picture number " + imageNumber + " on slide in Slide.replaceImage");
        }
        else {
            throw new Error("Picture not defined in Slide.replaceImage");
        }
    };
    /**
     * Get the speaker notes from the slide
     *
     * @returns {string} the speaker notes
     */
    SlideGS.prototype.getNotes = function () {
        return this._slide.getNotesPage().getSpeakerNotesShape().getText().asString();
    };
    ;
    /**
     * Set the speaker notes to the specified text
     *
     * @param text the speaker notes
     *
     * @returns {SlideGS} the object for chaining
     */
    SlideGS.prototype.setNotes = function (text) {
        if (text) {
            this._slide.getNotesPage().getSpeakerNotesShape().getText().setText(text);
            return this;
        }
        else {
            throw new Error("Notes text cannot be blank in Slide.setNotes");
        }
    };
    ;
    /**
     * Sets the title of the slide
     *
     * @param title the title of the slide
     *
     * @returns {SlideGS} the object for chaining
     */
    SlideGS.prototype.setTitle = function (title) {
        if (title) {
            this._slide.getPlaceholder(SlidesApp.PlaceholderType.TITLE).asShape().getText().setText(title);
            return this;
        }
        else {
            throw new Error("Slide title cannot be blank in Slide.setTitle");
        }
    };
    ;
    /**
     * Sets the body of the slide
     *
     * @param body the body of the slide
     *
     * @returns {SlideGS} the object for chaining
     */
    SlideGS.prototype.setBody = function (body) {
        if (body) {
            this._slide.getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape().getText().setText(body);
            return this;
        }
        else {
            throw new Error("Body cannot be blank in Slide.setBody");
        }
    };
    ;
    /**
     * Sets the body of the slide to a list
     *
     * @param text the list, as a string with "\t" for each new member of the list
     * @param bulletType the optional type of bullet for the list
     *
     * @returns {SlideGS} the object for chaining
     */
    SlideGS.prototype.setList = function (text, bulletType) {
        if (bulletType === void 0) { bulletType = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE; }
        if (text) {
            this._slide.getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape().getText().setText(text).getListStyle().applyListPreset(bulletType);
            return this;
        }
        else {
            throw new Error("Text cannot be blank in Slide.setList");
        }
    };
    ;
    /**
     * Add items to a list on a slide
     *
     * @param questionOptions the options as a list of line breaks or an array
     * @param bulletType the optional type of bullet for the list
     *
     * @returns {SlideGS} the object for chaining
     */
    SlideGS.prototype.addItems = function (questionOptions, bulletType) {
        if (bulletType === void 0) { bulletType = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE; }
        var choices = [];
        if (typeof questionOptions !== "string")
            choices = questionOptions;
        else
            choices = questionOptions.split("\n");
        var textRange = "";
        for (var choice in choices) {
            textRange += "\t" + choice + "\n";
        }
        this.setList(textRange, bulletType);
        return this;
    };
    ;
    /**
     * Adds the item to the slide of a particular type
     *
     * @param type the type of item to add to the slide
     * @param itemsToAdd the string or array of strings that holds the item data
     * @param bulletType the optional type of bullet for the list
     *
     * @returns {SlideGS} the object for chaining
     */
    SlideGS.prototype.addItem = function (type, itemsToAdd, bulletType) {
        if (bulletType === void 0) { bulletType = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE; }
        switch (type) {
            case QUESTION_TYPE.TRUE_FALSE["string"]:
                this.setBody("True or False?");
                break;
            case QUESTION_TYPE.MULTIPLE_CHOICE["string"]:
            case QUESTION_TYPE.MULTIPLE_SELECT["string"]:
                this.addItems(itemsToAdd, bulletType);
                break;
        }
        return this;
    };
    ;
    /**
     * Change the picture displayed in the slide
     *
     * @param chosenPictureBlob the blob (data) of the picture to add
     * @param pictureNumber the number of the picture on the slide
     *
     * @returns {number} the number of the replaced page element
     */
    SlideGS.prototype.changePicture = function (chosenPictureBlob, pictureNumber) {
        if (pictureNumber === void 0) { pictureNumber = 0; }
        if (chosenPictureBlob) {
            var countPictures = 0;
            for (var pictureId = 0; pictureId < this._pageElements.length; pictureId++) {
                if (this._pageElements[pictureId].getPageElementType() == SlidesApp.PageElementType.IMAGE) {
                    if (countPictures == pictureNumber) {
                        this._pageElements[pictureId].asImage().replace(chosenPictureBlob);
                        return pictureId;
                    }
                    countPictures++;
                }
            }
            return -1;
        }
        else {
            throw new Error("Slide and blob of chosen picture need to be defined in Slides.changePicture");
        }
    };
    ;
    /**
     * Sets the dimensions of the slide for picture orientation
     *
     * @param dimensions object that has at least one of the following properties: "totalHeight", "totalWidth", "maxHeight", "maxWidth", "margin"
     *
     * @returns {SlideGS} the object for chaining
     */
    SlideGS.prototype.setDimensions = function (dimensions) {
        if (dimensions != undefined) {
            this._dimensions = dimensions;
            return this;
        }
        else {
            throw new Error("Height and width of dimensions need to all be integers in Slides.setDimensions");
        }
    };
    ;
    /**
     * Position the picture on the slide according to the size of the image
     *
     * @param id the number of the picture on the slide
     * @param bottom whether or not to display the image aligned to the bottom (default true = bottom)
     * @param right whether or not to display the image aligned to the right (default true = right)
     */
    SlideGS.prototype.positionPicture = function (id, bottom, right) {
        if (bottom === void 0) { bottom = true; }
        if (right === void 0) { right = true; }
        if (typeof id === "number") {
            if (this._pageElements) {
                if (this._pageElements[id]) {
                    var height = this._pageElements[id].getHeight();
                    var width = this._pageElements[id].getWidth();
                    if (height > width) {
                        var newWidth = (this._dimensions["maxHeight"] / height) * width;
                        this._pageElements[id].setWidth(newWidth);
                        this._pageElements[id].setHeight(this._dimensions["maxHeight"]);
                        if (right)
                            this._pageElements[id].setLeft(this._dimensions["totalWidth"] - newWidth - this._dimensions["margin"]);
                        else
                            this._pageElements[id].setLeft(this._dimensions["margin"]);
                        if (bottom)
                            this._pageElements[id].setTop(this._dimensions["totalHeight"] - this._dimensions["maxHeight"] - this._dimensions["margin"]);
                        else
                            this._pageElements[id].setTop(this._dimensions["margin"]);
                    }
                    else {
                        var newHeight = (this._dimensions["maxWidth"] / width) * height;
                        this._pageElements[id].setHeight(newHeight);
                        this._pageElements[id].setWidth(this._dimensions["maxWidth"]);
                        if (bottom)
                            this._pageElements[id].setTop(this._dimensions["totalHeight"] - newHeight - this._dimensions["margin"]);
                        else
                            this._pageElements[id].setTop(this._dimensions["margin"]);
                        if (right)
                            this._pageElements[id].setLeft(this._dimensions["totalWidth"] - this._dimensions["maxWidth"] - this._dimensions["margin"]);
                        else
                            this._pageElements[id].setLeft(this._dimensions["margin"]);
                    }
                    return this;
                }
                else {
                    throw new Error("Could not get element id off of Slide object in Slides.positionPicture");
                }
            }
            else {
                throw new Error("Could not get slide specified by Slide object in Slides.positionPicture");
            }
        }
        else {
            throw new Error("ID and Slide need to be defined in Slides.positionPicture");
        }
    };
    ;
    /**
     * Get the page elements on the slide
     *
     * @returns the page elements
     */
    SlideGS.prototype.getPageElements = function () {
        return this._pageElements;
    };
    ;
    return SlideGS;
}());
;
