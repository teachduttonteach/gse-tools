/// <reference types="google-apps-script" />
import { UiGS } from '../UiGS';
import { SlideGS } from './SlideGS';
/**
 * Class to access methods and properties of Google Presentations
 *
 * @param {string} id the id of the presentation
 * @return {SlideshowGS} the Slideshow object
 */
export declare function newSlideshow(id: string): SlideshowGS;
/**
 * Clear the slideshow of slides
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @return {SlideshowGS} the object for chaining
 */
export declare function clearSlideshow(obj: SlideshowGS): SlideshowGS;
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
export declare function changeSlideshowPictureFromFolder(obj: SlideshowGS, folder: string, slide: SlideGS): SlideshowGS;
/**
 * Changes the picture on the selected slide if specified
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} imageId the folder containing the pictures
 * @param {SlideGS} slide the number of the slide to change the picture of
 *
 * @return {SlideshowGS} the object for chaining
 */
export declare function changeSlideshowPicture(obj: SlideshowGS, imageId: string, slide: SlideGS): SlideshowGS;
/**
 * Gets the slide by number
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {number} num the number of the slide
 *
 * @return {SlideGS} the slide object
 */
export declare function getSlide(obj: SlideshowGS, num: number): SlideGS;
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
export declare function addSlide(obj: SlideshowGS, title: string, body: string, type: string): SlideGS;
/**
 * Gets the slide in the presentation from the id of the slide
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} notes the notes on the slide
 *
 * @return {SlideGS} the slide object
 */
export declare function getSlideByNotes(obj: SlideshowGS, notes: string): SlideGS | null;
/**
 * Removes a slide from the presentation
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} id the id of the slide to remove
 *
 * @return {SlideshowGS} the object for chaining
 */
export declare function removeSlide(obj: SlideshowGS, id: string): SlideshowGS;
/**
 * Gets the slide type from the slide notes and adds the slide if not present
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} slideNotes the type of the slide (from slide notes)
 *
 * @return {SlideGS} the requested slide

export function getSlideByType(obj: SlideshowGS, typeTitle: string): SlideGS {
  return obj.getSlideByType(typeTitle);
}
*/
/**
 * Sets the body for the given slide type
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} slideNotes the notes on the slide
 * @param {string} slideText the body text to put in the slide
 *
 * @return {SlideshowGS} the object for chaining
 */
export declare function setSlideBodyByType(obj: SlideshowGS, slideNotes: string, slideText: string): SlideshowGS;
/**
 * Sets the title for the given slide type
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} slideNotes the notes on the slide
 * @param {string} title the body text to put in the slide
 *
 * @return {SlideshowGS} the object for chaining
 */
export declare function setSlideTitleByType(obj: SlideshowGS, slideNotes: string, title: string): SlideshowGS;
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
     * Changes the picture on the selected slide if specified
     *
     * @param {string} imageId the imageId of the picture
     * @param {SlideGS} slide the number of the slide to change the picture of
     *
     * @return {SlideshowGS} the object for chaining
     */
    changeSlidePicture(imageId: string, slide: SlideGS): SlideshowGS;
    /**
     * Changes the picture on the selected slide if a folder is specified
     *
     * @param {string} folder the folder containing the pictures
     * @param {SlideGS} slide the number of the slide to change the picture of
     *
     * @return {SlideshowGS} the object for chaining
     */
    changeSlidePictureFromFolder(folder: string, slide: SlideGS): SlideshowGS;
    /**
     * Gets the slide by number
     *
     * @param {number} num the number of the slide, indexed at 1
     *
     * @return {SlideGS} the Slide object for the requested slide
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
     * @param {string} notes the notes on the new slide
     *
     * @return {SlideGS} the new slide object
     */
    addSlide(title: string, body: string, notes?: string): SlideGS;
    /**
     * Gets the slide in the presentation from the id of the slide
     *
     * @param {string} notes the id of the slide
     *
     * @return {SlideGS} the slide object
     */
    getSlideByNotes(notes: string): SlideGS | null;
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
     * @param {string} slideNotes the type of the slide (from slide notes)
     *
     * @return {SlideGS} the requested slide
  
    getSlideByType(typeTitle: string): SlideGS {
      for (const s of this._allSlides) {
        const thisNotes = s.getNotes();
        if (thisNotes != null && thisNotes != '' &&
          thisNotes.substr(0, typeTitle.length) == typeTitle) return s;
      }
      return this.addSlide(typeTitle, '', typeTitle);
    }
    */
    /**
     * Sets the body for the given slide type
     *
     * @param {string} slideNotes the notes on the slide
     * @param {string} slideText the body text to put in the slide
     *
     * @return {SlideshowGS} the object for chaining
     */
    setSlideBodyByType(slideNotes: string, slideText: string): SlideshowGS;
    /**
     * Sets the title for the given slide type
     *
     * @param {string} slideNotes the notes on the slide
     * @param {string} title the body text to put in the slide
     *
     * @return {SlideshowGS} the object for chaining
     */
    setSlideTitleByType(slideNotes: string, title: string): SlideshowGS;
}
