import { UiGS } from "./UiGS";
import { DriveGS } from "./DriveGS";
import { SlideGS } from "./SlideGS";
/**
 * Class to access methods and properties of Google Presentations
 */
export class SlideshowGS extends UiGS {
    /**
     *
     * @param id the id of the presentation
     */
    constructor(id) {
        super();
        this._presentation = SlidesApp.openById(id);
        if (this._presentation == null)
            throw new Error("Slideshow not found with id " + id + " in SlideshowGS()");
        this._getAllSlides();
    }
    /**
     * Gets all slides from a presentation
     *
     * @returns {SlideshowGS} the object for chaining
     */
    _getAllSlides() {
        this._allSlides = [];
        for (let s of this._presentation.getSlides()) {
            this._allSlides.push(new SlideGS(s));
        }
        return this;
    }
    /**
     * Activate the Ui for the Presentation
     *
     * @returns {SlideshowGS} the object for chaining
     */
    activateUi() {
        this._ui = SlidesApp.getUi();
        return this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Slides.Presentation} the Presentation object
     */
    getObject() {
        return this._presentation;
    }
    /**
     * Sets the presentation template for adding slides
     *
     * @param id the id of the presentation template
     *
     * @returns {SlideshowGS} the object for chaining
     */
    setTemplate(id) {
        if (id == null)
            throw new Error("Template id is not defined for Slides.setTemplate");
        this._template = SlidesApp.openById(id);
        if (this._template == null)
            throw new Error("Could not find requested Google Slides template in Slides.setTemplate");
        return this;
    }
    ;
    /**
     * Changes the picture on the selected slide if a folder is specified
     *
     * @param folder the folder containing the pictures
     * @param slideNum the number of the slide to change the picture of
     *
     * @returns {SlideshowGS} the object for chaining
     */
    changeSlidePicture(folder, slide) {
        if (folder != null) {
            let chosenPicture = new DriveGS().getRandomPicture(folder);
            slide.positionPicture(slide.changePicture(chosenPicture));
        }
        return this;
    }
    ;
    /**
     * Gets the slide by number
     *
     * @param num the number of the slide
     *
     * @returns {SlideGS} the slide object
     */
    getSlide(num) {
        if (typeof num === "number")
            return this._allSlides[num];
        throw new Error("Could not get slide #" + num + " from slideshow in Slides.getSlide");
    }
    ;
    /**
     * Adds a slide to the Slideshow, using a template if present
     *
     * @param title the title of the new slide
     * @param text the body of the new slide
     * @param type the type of the new slide
     *
     * @returns {SlideGS} the new slide object
     */
    addSlide(title, body, type) {
        let slideAdded;
        if (this._template != null) {
            if (this._template.getSlides().length > 0) {
                var slideToGet = this._allSlides.length % this._template.getSlides().length;
                slideAdded = this._presentation.appendSlide(this._template.getSlides()[slideToGet]);
            }
            else
                slideAdded = this._presentation.appendSlide(this._template.getSlides()[0]);
        }
        else
            slideAdded = this._presentation.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);
        return new SlideGS(slideAdded).setTitle(title).setBody(body).setNotes(type);
    }
    ;
    /**
     * Gets the slide in the presentation from the id of the slide
     *
     * @param id the id of the slide
     *
     * @returns {SlideGS} the slide object
     */
    getSlideById(id) {
        if (id == null)
            throw new Error("Id is not defined to remove in SlideshowGS.getSlideById");
        for (var j = 0; j < this._allSlides.length; j++) {
            if (this._allSlides[j].getNotes().indexOf(id) == 0) {
                return this._allSlides[j];
            }
        }
        throw new Error("Slide id " + id + " not found in SlideshowGS.getSlideById");
    }
    ;
    /**
     * Removes a slide from the presentation
     *
     * @param id the id of the slide to remove
     *
     * @returns {SlideshowGS} the object for chaining
     */
    removeSlide(id) {
        if (id == null)
            throw new Error("ID is not defined to remove in Slides.removeSlide");
        this.getSlideById(id).remove();
        this._getAllSlides();
        return this;
    }
    ;
    /**
     * Gets the slide type from the slide notes and adds the slide if not present
     *
     * @param typeTitle the type of the slide (from slide notes)
     *
     * @returns {SlideGS} the requested slide
     */
    getSlideByType(typeTitle) {
        let slide;
        for (let s of this._allSlides) {
            let t_notes = s.getNotes();
            Logger.log("Notes: '" + t_notes + "'");
            if ((t_notes != null) && (t_notes != "") && (t_notes.substr(0, typeTitle.length) == typeTitle))
                return s;
        }
        return this.addSlide(typeTitle, "", typeTitle);
    }
    ;
    /**
     * Sets the body for the given slide type
     *
     * @param typeTitle the type of the slide
     * @param slideText the body text to put in the slide
     *
     * @returns {SlideshowGS} the object for chaining
     */
    setSlideBodyByType(typeTitle, slideText) {
        this.getSlideByType(typeTitle).setBody(slideText);
        return this;
    }
    ;
    /**
     * Sets the title for the given slide type
     *
     * @param typeTitle the type of the slide
     * @param title the body text to put in the slide
     *
     * @returns {SlideshowGS} the object for chaining
     */
    setSlideTitleByType(typeTitle, title) {
        this.getSlideByType(typeTitle).setTitle(title);
        return this;
    }
    ;
}
