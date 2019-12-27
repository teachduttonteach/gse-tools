/// <reference types="google-apps-script" />
import { UiGS } from "./UiGS";
import { SlideGS } from "./SlideGS";
/**
 * Class to access methods and properties of Google Presentations
 */
export declare class SlideshowGS extends UiGS {
    private _presentation;
    private _allSlides;
    _ui: GoogleAppsScript.Base.Ui;
    private _template;
    /**
     *
     * @param id the id of the presentation
     */
    constructor(id: string);
    /**
     * Gets all slides from a presentation
     *
     * @returns {SlideshowGS} the object for chaining
     */
    private _getAllSlides;
    /**
     * Activate the Ui for the Presentation
     *
     * @returns {SlideshowGS} the object for chaining
     */
    activateUi(): SlideshowGS;
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Slides.Presentation} the Presentation object
     */
    getObject(): GoogleAppsScript.Slides.Presentation;
    /**
     * Sets the presentation template for adding slides
     *
     * @param id the id of the presentation template
     *
     * @returns {SlideshowGS} the object for chaining
     */
    setTemplate(id: string): SlideshowGS;
    /**
     * Changes the picture on the selected slide if a folder is specified
     *
     * @param folder the folder containing the pictures
     * @param slideNum the number of the slide to change the picture of
     *
     * @returns {SlideshowGS} the object for chaining
     */
    changeSlidePicture(folder: string, slide: SlideGS): SlideshowGS;
    /**
     * Gets the slide by number
     *
     * @param num the number of the slide
     *
     * @returns {SlideGS} the slide object
     */
    getSlide(num: number): SlideGS;
    /**
     * Adds a slide to the Slideshow, using a template if present
     *
     * @param title the title of the new slide
     * @param text the body of the new slide
     * @param type the type of the new slide
     *
     * @returns {SlideGS} the new slide object
     */
    addSlide(title: string, body: string, type: string): SlideGS;
    /**
     * Gets the slide in the presentation from the id of the slide
     *
     * @param id the id of the slide
     *
     * @returns {SlideGS} the slide object
     */
    getSlideById(id: string): SlideGS;
    /**
     * Removes a slide from the presentation
     *
     * @param id the id of the slide to remove
     *
     * @returns {SlideshowGS} the object for chaining
     */
    removeSlide(id: string): SlideshowGS;
    /**
     * Gets the slide type from the slide notes and adds the slide if not present
     *
     * @param typeTitle the type of the slide (from slide notes)
     *
     * @returns {SlideGS} the requested slide
     */
    getSlideByType(typeTitle: string): SlideGS;
    /**
     * Sets the body for the given slide type
     *
     * @param typeTitle the type of the slide
     * @param slideText the body text to put in the slide
     *
     * @returns {SlideshowGS} the object for chaining
     */
    setSlideBodyByType(typeTitle: string, slideText: string): SlideshowGS;
    /**
     * Sets the title for the given slide type
     *
     * @param typeTitle the type of the slide
     * @param title the body text to put in the slide
     *
     * @returns {SlideshowGS} the object for chaining
     */
    setSlideTitleByType(typeTitle: string, title: string): SlideshowGS;
}
