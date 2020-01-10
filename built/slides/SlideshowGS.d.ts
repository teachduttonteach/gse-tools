/// <reference types="google-apps-script" />
import { UiGS } from '../UiGS';
import { SlideGS } from './SlideGS';
/**
* Class to access methods and properties of Google Presentations
*
* @param {string} id the id of the presentation
*/
export declare function newSlideshow(id: string): SlideshowGS;
/**
 * Clear the slideshow of slides
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @return {SlideshowGS} the object for chaining
 */
export declare function clear(obj: SlideshowGS): SlideshowGS;
/**
 * Gets the number of the slide in the slideshow template
 *  that was most recently used
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @return {number} the number of the slide
 */
export declare function getSlideshowTemplateSlideUsed(obj: SlideshowGS): number;
/**
 * Activate the Ui for the Presentation
 * @param {SlideshowGS} obj the Slideshow object
 * @return {SlideshowGS} the object for chaining
 */
export declare function activateSlideshowUi(obj: SlideshowGS): SlideshowGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @return {GoogleAppsScript.Slides.Presentation} the Presentation object
 */
export declare function getSlideshowObject(obj: SlideshowGS): GoogleAppsScript.Slides.Presentation;
/**
 * Sets the presentation template for adding slides
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} id the id of the presentation template
 *
 * @return {SlideshowGS} the object for chaining
 */
export declare function setSlideshowTemplate(obj: SlideshowGS, id: string): SlideshowGS;
/**
 * Changes the picture on the selected slide if a folder is specified
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} folder the folder containing the pictures
 * @param {SlideGS} slide the number of the slide to change the picture of
 *
 * @return {SlideshowGS} the object for chaining
 */
export declare function changeSlideshowPicture(obj: SlideshowGS, folder: string, slide: SlideGS): SlideshowGS;
/**
 * Gets the slide by number
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {number} num the number of the slide
 *
 * @return {SlideGS} the slide object
 */
export declare function getSlideshowSlide(obj: SlideshowGS, num: number): SlideGS;
/**
 * Adds a slide to the Slideshow, using a template if present
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} title the title of the new slide
 * @param {string} body the body of the new slide
 * @param {string} type the type of the new slide
 *
 * @return {SlideGS} the new slide object
 */
export declare function addSlideshowSlide(obj: SlideshowGS, title: string, body: string, type: string): SlideGS;
/**
 * Gets the slide in the presentation from the id of the slide
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} id the id of the slide
 *
 * @return {SlideGS} the slide object
 */
export declare function getSlideshowSlideById(obj: SlideshowGS, id: string): SlideGS;
/**
 * Removes a slide from the presentation
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} id the id of the slide to remove
 *
 * @return {SlideshowGS} the object for chaining
 */
export declare function removeSlideshowSlide(obj: SlideshowGS, id: string): SlideshowGS;
/**
 * Gets the slide type from the slide notes and adds the slide if not present
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} typeTitle the type of the slide (from slide notes)
 *
 * @return {SlideGS} the requested slide
 */
export declare function getSlideshowSlideByType(obj: SlideshowGS, typeTitle: string): SlideGS;
/**
 * Sets the body for the given slide type
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} typeTitle the type of the slide
 * @param {string} slideText the body text to put in the slide
 *
 * @return {SlideshowGS} the object for chaining
 */
export declare function setSlideshowSlideBodyByType(obj: SlideshowGS, typeTitle: string, slideText: string): SlideshowGS;
/**
 * Sets the title for the given slide type
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} typeTitle the type of the slide
 * @param {string} title the body text to put in the slide
 *
 * @return {SlideshowGS} the object for chaining
 */
export declare function setSlideshowSlideTitleByType(obj: SlideshowGS, typeTitle: string, title: string): SlideshowGS;
/**
 * Class to access methods and properties of Google Presentations
 */
export declare class SlideshowGS extends UiGS {
    private _presentation;
    private _allSlides;
    _ui: GoogleAppsScript.Base.Ui;
    private _template;
    private _templateSlideUsed;
    /**
     *
     * @param {string} id the id of the presentation
     */
    constructor(id: string);
    /**
     * Clear the slideshow of slides
     *
     * @return {SlideshowGS} the object for chaining
     */
    clear(): SlideshowGS;
    /**
     * Gets all slides from a presentation
     *
     * @return {SlideshowGS} the object for chaining
     */
    private _getAllSlides;
    /**
     * Activate the Ui for the Presentation
     *
     * @return {SlideshowGS} the object for chaining
     */
    activateUi(): SlideshowGS;
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Slides.Presentation} the Presentation object
     */
    getObject(): GoogleAppsScript.Slides.Presentation;
    /**
     * Sets the presentation template for adding slides
     *
     * @param {string} id the id of the presentation template
     *
     * @return {SlideshowGS} the object for chaining
     */
    setTemplate(id: string): SlideshowGS;
    /**
     * Changes the picture on the selected slide if a folder is specified
     *
     * @param {string} folder the folder containing the pictures
     * @param {SlideGS} slide the number of the slide to change the picture of
     *
     * @return {SlideshowGS} the object for chaining
     */
    changeSlidePicture(folder: string, slide: SlideGS): SlideshowGS;
    /**
     * Gets the slide by number
     *
     * @param {number} num the number of the slide
     *
     * @return {SlideGS} the slide object
     */
    getSlide(num: number): SlideGS;
    /**
     * Gets the number of the slide in the slideshow template
     *  that was most recently used
     *
     * @return {number} the number of the slide
     */
    getTemplateSlideUsed(): number;
    /**
     * Adds a slide to the Slideshow, using a template if present
     *
     * @param {string} title the title of the new slide
     * @param {string} body the body of the new slide
     * @param {string} type the type of the new slide
     *
     * @return {SlideGS} the new slide object
     */
    addSlide(title: string, body: string, type: string): SlideGS;
    /**
     * Gets the slide in the presentation from the id of the slide
     *
     * @param {string} id the id of the slide
     *
     * @return {SlideGS} the slide object
     */
    getSlideById(id: string): SlideGS;
    /**
     * Removes a slide from the presentation
     *
     * @param {string} id the id of the slide to remove
     *
     * @return {SlideshowGS} the object for chaining
     */
    removeSlide(id: string): SlideshowGS;
    /**
     * Gets the slide type from the slide notes and adds the slide if not present
     *
     * @param {string} typeTitle the type of the slide (from slide notes)
     *
     * @return {SlideGS} the requested slide
     */
    getSlideByType(typeTitle: string): SlideGS;
    /**
     * Sets the body for the given slide type
     *
     * @param {string} typeTitle the type of the slide
     * @param {string} slideText the body text to put in the slide
     *
     * @return {SlideshowGS} the object for chaining
     */
    setSlideBodyByType(typeTitle: string, slideText: string): SlideshowGS;
    /**
     * Sets the title for the given slide type
     *
     * @param {string} typeTitle the type of the slide
     * @param {string} title the body text to put in the slide
     *
     * @return {SlideshowGS} the object for chaining
     */
    setSlideTitleByType(typeTitle: string, title: string): SlideshowGS;
}
