/// <reference types="google-apps-script" />
import { QuestionType } from '../enums/QuestionType';
import { Dimensions } from './Dimensions';
/**
 * Class to access methods and properties of individual Slides of Google
 *  Presentations
 * @param {GoogleAppsScript.Slides.Slide} slideObject the Google Slides object
 * @return {SlideGS} the underlying object
 */
export declare function newSlide(slideObject: GoogleAppsScript.Slides.Slide): SlideGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SlideGS} obj the Slide object
 * @return {GoogleAppsScript.Slides.Slide} the Slide object
 */
export declare function getSlideObject(obj: SlideGS): GoogleAppsScript.Slides.Slide;
/**
 * Get the title of the current slide
 *
 * @param {SlideGS} obj the Slide object
 * @return {string} the title
 */
export declare function getSlideTitle(obj: SlideGS): string;
/**
 * Get the speaker notes from the slide
 *
 * @param {SlideGS} obj the Slide object
 * @return {string} the speaker notes
 */
export declare function getSlideNotes(obj: SlideGS): string;
/**
 * Set the speaker notes to the specified text
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} text the speaker notes
 *
 * @return {SlideGS} the object for chaining
 */
export declare function setSlideNotes(obj: SlideGS, text: string): SlideGS;
/**
 * Sets the title of the slide
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} title the title of the slide
 * @param {string} defaultText the default text to display
 *
 * @return {SlideGS} the object for chaining
 */
export declare function setSlideTitle(obj: SlideGS, title: string): SlideGS;
/**
 * Sets the body of the slide
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} body the body of the slide
 *
 * @return {SlideGS} the object for chaining
 */
export declare function setSlideBody(obj: SlideGS, body: string): SlideGS;
/**
 * Sets the body of the slide to a list
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} text the list, as a string with "\n" for each new
 *  member of the list
 * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional
 *  type of bullet for the list
 *
 * @return {SlideGS} the object for chaining
 */
export declare function setSlideList(obj: SlideGS, text: string, bulletType?: GoogleAppsScript.Slides.ListPreset): SlideGS;
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
export declare function addSlideItems(obj: SlideGS, questionOptions: string | Array<string>, bulletType?: GoogleAppsScript.Slides.ListPreset): SlideGS;
/**
 * Adds the item to the slide of a particular type
 *
 * @param {SlideGS} obj the Slide object
 * @param {QuestionType} type the type of item to add to the slide:
 *  QuestionType.TRUE_FALSE, QuestionType.MULTIPLE_CHOICE,
 *  QuestionType.MULTIPLE_SELECT
 * @param {string | Array<string>} itemsToAdd the string or array of
 *  strings that holds the item data
 * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional
 *  type of bullet for the list
 *
 * @return {SlideGS} the object for chaining
 */
export declare function addSlideItem(obj: SlideGS, type: QuestionType, itemsToAdd: string | Array<string>, bulletType?: GoogleAppsScript.Slides.ListPreset): SlideGS;
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
export declare function changeSlidePicture(obj: SlideGS, chosenPictureBlob: GoogleAppsScript.Base.BlobSource, pictureNumber?: number): number;
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
export declare function setSlideDimensions(obj: SlideGS, dimensions: Dimensions): SlideGS;
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
export declare function positionSlidePicture(obj: SlideGS, id: number, bottom?: boolean, right?: boolean): SlideGS;
/**
 * Get the page elements on the slide
 *
 * @param {SlideGS} obj the Slide object
 * @return {Array<GoogleAppsScript.Slides.PageElement>} the page elements
 */
export declare function getSlidePageElements(obj: SlideGS): Array<GoogleAppsScript.Slides.PageElement>;
/**
 * Removes the current slide
 * @param {SlideGS} obj the Slide object
 * @return {SlideGS} the object for chaining
 */
export declare function removeSlide(obj: SlideGS): SlideGS;
/**
 * Class to access methods and properties of individual Slides of Google
 *  Presentations
 */
export declare class SlideGS {
    private _slide;
    private _pageElements;
    private _dimensions;
    /**
     *
     * @param {GoogleAppsScript.Slides.Slide} slideObject the underlying
     *  Google object
     */
    constructor(slideObject: GoogleAppsScript.Slides.Slide);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Slides.Slide} the Slide object
     */
    getObject(): GoogleAppsScript.Slides.Slide;
    /**
     * Change the picture displayed in the slide
     *
     * @param {GoogleAppsScript.Base.BlobSource} chosenPictureBlob the blob
     *  (data) of the picture to add
     * @param {number} pictureNumber the number of the picture on the slide
     *
     * @return {number} the number of the replaced page element
     */
    changePicture(chosenPictureBlob: GoogleAppsScript.Base.BlobSource, pictureNumber?: number): number;
    /**
     * Find the picture on the slide according to the number
     *
     * @param {number} pictureNumber the sequential number of the picture
     * @return {number} the ID of the picture or -1 if not found
     */
    private _findPicture;
    /**
     * Get the title of the current slide
     *
     * @return {string} the title
     */
    getTitle(): string;
    /**
     * Get the speaker notes from the slide
     *
     * @return {string} the speaker notes
     */
    getNotes(): string;
    /**
     * Set the speaker notes to the specified text
     *
     * @param {string} text the speaker notes
     *
     * @return {SlideGS} the object for chaining
     */
    setNotes(text: string): SlideGS;
    /**
     * Sets the title of the slide
     *
     * @param {string} title the title of the slide
     *
     * @return {SlideGS} the object for chaining
     */
    setTitle(title: string): SlideGS;
    /**
     * Sets the body of the slide
     *
     * @param {string} body the body of the slide
     *
     * @return {SlideGS} the object for chaining
     */
    setBody(body: string): SlideGS;
    /**
     * Sets the body of the slide to a list
     *
     * @param {string} text the list, as a string with "\n" for each new
     *  member of the list
     * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional
     *  type of bullet for the list
     *
     * @return {SlideGS} the object for chaining
     */
    setList(text: string, bulletType?: GoogleAppsScript.Slides.ListPreset): SlideGS;
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
    addItems(questionOptions: string | Array<string>, bulletType?: GoogleAppsScript.Slides.ListPreset): SlideGS;
    /**
     * Adds the item to the slide of a particular type
     *
     * @param {QuestionType} type the type of item to add to the slide:
     *  QuestionType.TRUE_FALSE, QuestionType.MULTIPLE_CHOICE,
     *  QuestionType.MULTIPLE_SELECT
     * @param {string | Array<string>} itemsToAdd the string or array of
     *  strings that holds the item data
     * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional
     *  type of bullet for the list
     *
     * @return {SlideGS} the object for chaining
     */
    addItem(type: QuestionType, itemsToAdd: string | Array<string>, bulletType?: GoogleAppsScript.Slides.ListPreset): SlideGS;
    /**
     * Sets the dimensions of the slide for picture orientation
     *
     * @param {Dimensions} dimensions object that has at least one of the
     *  following properties: "totalHeight", "totalWidth", "maxHeight",
     *  "maxWidth", "margin"
     *
     * @return {SlideGS} the object for chaining
     */
    setDimensions(dimensions: Dimensions): SlideGS;
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
    positionPicture(id: number, bottom?: boolean, right?: boolean): SlideGS;
    /**
     * Get the page elements on the slide
     *
     * @return {Array<GoogleAppsScript.Slides.PageElement>} the page elements
     */
    getPageElements(): Array<GoogleAppsScript.Slides.PageElement>;
    /**
     * Removes the current slide
     */
    remove(): void;
}
