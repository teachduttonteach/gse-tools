/// <reference types="google-apps-script" />
/**
 * Type to hold the slide and picture dimensions
 */
declare type Dimensions = {
    /**
     * Total height of the slide for positioning pictures
     */
    totalHeight?: number;
    /**
     * Total width of the slide for positioning pictures
     */
    totalWidth?: number;
    /**
     * Maximum height of the picture
     */
    maxHeight?: number;
    /**
     * Maximum width of the picture
     */
    maxWidth?: number;
    /**
     * Margin between the sides of the picture and the slide
     */
    margin?: number;
};
/**
 * Class to access methods and properties of individual Slides of Google Presentations
 */
export declare class SlideGS {
    private _slide;
    private _pageElements;
    private _dimensions;
    constructor(slideObject: GoogleAppsScript.Slides.Slide);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Slides.Slide} the Slide object
     */
    getObject(): GoogleAppsScript.Slides.Slide;
    /**
     * Replaces the picture at the specified number (default 0) with the specified picture
     *
     * @param {GoogleAppsScript.Base.BlobSource} picture the blob (data) holding the picture
     * @param {number} imageNumber the number of the image on the slide
     *
     * @returns {number} the number of the page element of the replaced picture
     */
    replaceImage(picture: GoogleAppsScript.Base.BlobSource, imageNumber?: number): number;
    /**
     * Get the speaker notes from the slide
     *
     * @returns {string} the speaker notes
     */
    getNotes(): string;
    /**
     * Set the speaker notes to the specified text
     *
     * @param text the speaker notes
     *
     * @returns {SlideGS} the object for chaining
     */
    setNotes(text: string): SlideGS;
    /**
     * Sets the title of the slide
     *
     * @param title the title of the slide
     *
     * @returns {SlideGS} the object for chaining
     */
    setTitle(title: string): SlideGS;
    /**
     * Sets the body of the slide
     *
     * @param body the body of the slide
     *
     * @returns {SlideGS} the object for chaining
     */
    setBody(body: string): SlideGS;
    /**
     * Sets the body of the slide to a list
     *
     * @param text the list, as a string with "\t" for each new member of the list
     * @param bulletType the optional type of bullet for the list
     *
     * @returns {SlideGS} the object for chaining
     */
    setList(text: string, bulletType?: GoogleAppsScript.Slides.ListPreset): SlideGS;
    /**
     * Add items to a list on a slide
     *
     * @param {string | Array<string>} questionOptions the options as a list of line breaks or an array
     * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional type of bullet for the list
     *
     * @returns {SlideGS} the object for chaining
     */
    addItems(questionOptions: string | Array<string>, bulletType?: GoogleAppsScript.Slides.ListPreset): SlideGS;
    /**
     * Adds the item to the slide of a particular type
     *
     * @param type the type of item to add to the slide
     * @param {string | Array<string>} itemsToAdd the string or array of strings that holds the item data
     * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional type of bullet for the list
     *
     * @returns {SlideGS} the object for chaining
     */
    addItem(type: string, itemsToAdd: string | Array<string>, bulletType?: GoogleAppsScript.Slides.ListPreset): SlideGS;
    /**
     * Change the picture displayed in the slide
     *
     * @param {GoogleAppsScript.Base.BlobSource} chosenPictureBlob the blob (data) of the picture to add
     * @param pictureNumber the number of the picture on the slide
     *
     * @returns {number} the number of the replaced page element
     */
    changePicture(chosenPictureBlob: GoogleAppsScript.Base.BlobSource, pictureNumber?: number): number;
    /**
     * Sets the dimensions of the slide for picture orientation
     *
     * @param dimensions object that has at least one of the following properties: "totalHeight", "totalWidth", "maxHeight", "maxWidth", "margin"
     *
     * @returns {SlideGS} the object for chaining
     */
    setDimensions(dimensions: Dimensions): SlideGS;
    /**
     * Position the picture on the slide according to the size of the image
     *
     * @param id the number of the picture on the slide
     * @param bottom whether or not to display the image aligned to the bottom (default true = bottom)
     * @param right whether or not to display the image aligned to the right (default true = right)
     */
    positionPicture(id: number, bottom?: boolean, right?: boolean): this;
    /**
     * Get the page elements on the slide
     *
     * @returns the page elements
     */
    getPageElements(): Array<GoogleAppsScript.Slides.PageElement>;
    /**
     * Removes the current slide
     */
    remove(): void;
}
export {};
