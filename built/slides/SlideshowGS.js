import { UiGS } from '../UiGS';
import { DriveGS } from '../drive/DriveGS';
import { SlideGS } from './SlideGS';
/**
 * Class to access methods and properties of Google Presentations
 *
 * @param {string} id the id of the presentation
 * @return {SlideshowGS} the Slideshow object
 */
export function newSlideshow(id) {
    return new SlideshowGS(id);
}
/**
 * Clear the slideshow of slides
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @return {SlideshowGS} the object for chaining
 */
export function clearSlideshow(obj) {
    return obj.clear();
}
/**
 * Gets the number of the slide in the slideshow template
 *  that was most recently used
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @return {number} the number of the slide
 */
export function getSlideshowTemplateSlideUsed(obj) {
    return obj.getTemplateSlideUsed();
}
/**
 * Activate the Ui for the Presentation
 * @param {SlideshowGS} obj the Slideshow object
 * @return {SlideshowGS} the object for chaining
 */
export function activateSlideshowUi(obj) {
    return obj.activateUi();
}
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @return {GoogleAppsScript.Slides.Presentation} the Presentation object
 */
export function getSlideshowObject(obj) {
    return obj.getObject();
}
/**
 * Sets the presentation template for adding slides
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} id the id of the presentation template
 *
 * @return {SlideshowGS} the object for chaining
 */
export function setSlideshowTemplate(obj, id) {
    return obj.setTemplate(id);
}
/**
 * Changes the picture on the selected slide if a folder is specified
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} folder the folder containing the pictures
 * @param {SlideGS} slide the number of the slide to change the picture of
 *
 * @return {SlideshowGS} the object for chaining
 */
export function changeSlideshowPictureFromFolder(obj, folder, slide) {
    return obj.changeSlidePictureFromFolder(folder, slide);
}
/**
 * Changes the picture on the selected slide if specified
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} imageId the folder containing the pictures
 * @param {SlideGS} slide the number of the slide to change the picture of
 *
 * @return {SlideshowGS} the object for chaining
 */
export function changeSlideshowPicture(obj, imageId, slide) {
    return obj.changeSlidePicture(imageId, slide);
}
/**
 * Gets the slide by number
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {number} num the number of the slide
 *
 * @return {SlideGS} the slide object
 */
export function getSlide(obj, num) {
    return obj.getSlide(num);
}
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
export function addSlide(obj, title, body, type) {
    return obj.addSlide(title, body, type);
}
/**
 * Gets the slide in the presentation from the id of the slide
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} notes the notes on the slide
 *
 * @return {SlideGS} the slide object
 */
export function getSlideByNotes(obj, notes) {
    return obj.getSlideByNotes(notes);
}
/**
 * Sets the textbox text in the presentation from the title of the textbox
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} title the title of the textbox
 * @param {string} text the text in the textbox
 * @param {boolean} multiple whether to display in multiple text boxes
 *
 * @return {SlideGS} the slide object
 */
export function setSlideTextByTitle(obj, title, text, multiple = false) {
    return obj.setSlideTextByTitle(title, text, multiple);
}
/**
 * Removes a slide from the presentation
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} id the id of the slide to remove
 *
 * @return {SlideshowGS} the object for chaining
 */
export function removeSlide(obj, id) {
    return obj.removeSlide(id);
}
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
export function setSlideBodyByType(obj, slideNotes, slideText) {
    return obj.setSlideBodyByType(slideNotes, slideText);
}
/**
 * Sets the title for the given slide type
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} slideNotes the notes on the slide
 * @param {string} title the body text to put in the slide
 *
 * @return {SlideshowGS} the object for chaining
 */
export function setSlideTitleByType(obj, slideNotes, title) {
    return obj.setSlideTitleByType(slideNotes, title);
}
/**
 * Class to access methods and properties of Google Presentations
 */
export class SlideshowGS extends UiGS {
    /**
     *
     * @param {string} id the id of the presentation
     */
    constructor(id) {
        super();
        this._presentation = SlidesApp.openById(id);
        if (this._presentation == null) {
            throw new Error('Slideshow not found with id ' + id + ' in SlideshowGS()');
        }
        this._getAllSlides();
        this._templateSlideUsed = -1;
    }
    /**
     * Clear the slideshow of slides
     *
     * @return {SlideshowGS} the object for chaining
     */
    clear() {
        for (const s of this._allSlides) {
            s.remove();
        }
        this._getAllSlides();
        return this;
    }
    /**
     * Gets all slides from a presentation
     *
     * @return {SlideshowGS} the object for chaining
     */
    _getAllSlides() {
        this._allSlides = [];
        for (const s of this._presentation.getSlides()) {
            this._allSlides.push(new SlideGS(s));
        }
        return this;
    }
    /**
     * Activate the Ui for the Presentation
     *
     * @return {SlideshowGS} the object for chaining
     */
    activateUi() {
        this._ui = SlidesApp.getUi();
        return this;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Slides.Presentation} the Presentation object
     */
    getObject() {
        return this._presentation;
    }
    /**
     * Sets the presentation template for adding slides
     *
     * @param {string} id the id of the presentation template
     *
     * @return {SlideshowGS} the object for chaining
     */
    setTemplate(id) {
        if (id == null) {
            throw new Error('Template id is not defined for Slides.setTemplate');
        }
        this._template = SlidesApp.openById(id);
        if (this._template == null) {
            throw new Error('Could not find requested Google Slides template in ' + 'Slides.setTemplate');
        }
        return this;
    }
    /**
     * Changes the picture on the selected slide if specified
     *
     * @param {string} imageId the imageId of the picture
     * @param {SlideGS} slide the number of the slide to change the picture of
     *
     * @return {SlideshowGS} the object for chaining
     */
    changeSlidePicture(imageId, slide) {
        if (imageId != null) {
            const chosenPicture = new DriveGS().getImageBlob(imageId);
            if (chosenPicture) {
                slide.positionPicture(slide.changePicture(chosenPicture));
            }
        }
        return this;
    }
    /**
     * Changes the picture on the selected slide if a folder is specified
     *
     * @param {string} folder the folder containing the pictures
     * @param {SlideGS} slide the number of the slide to change the picture of
     *
     * @return {SlideshowGS} the object for chaining
     */
    changeSlidePictureFromFolder(folder, slide) {
        if (folder != null) {
            const chosenPicture = new DriveGS().getRandomPicture(folder);
            slide.positionPicture(slide.changePicture(chosenPicture));
        }
        return this;
    }
    /**
     * Gets the slide by number
     *
     * @param {number} num the number of the slide, indexed at 1
     *
     * @return {SlideGS} the Slide object for the requested slide
     */
    getSlide(num) {
        if (typeof num === 'number')
            return this._allSlides[num - 1];
        throw new Error('Could not get slide #' + num + ' from slideshow in Slides.getSlide');
    }
    /**
     * Gets the number of the slide in the slideshow template
     *  that was most recently used
     *
     * @return {number} the number of the slide
     */
    getTemplateSlideUsed() {
        return this._templateSlideUsed;
    }
    /**
     * Adds a slide to the Slideshow, using a template if present
     *
     * @param {string} title the title of the new slide
     * @param {string} body the body of the new slide
     * @param {string} notes the notes on the new slide
     *
     * @return {SlideGS} the new slide object
     */
    addSlide(title, body, notes = '') {
        let slideAdded;
        if (this._template != null) {
            if (this._template.getSlides().length > 0) {
                const slideToGet = this._allSlides.length % this._template.getSlides().length;
                slideAdded = this._presentation.appendSlide(this._template.getSlides()[slideToGet]);
                this._templateSlideUsed = slideToGet;
            }
            else {
                slideAdded = this._presentation.appendSlide(this._template.getSlides()[0]);
            }
        }
        else {
            slideAdded = this._presentation.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);
        }
        this._getAllSlides();
        return new SlideGS(slideAdded)
            .setTitle(title)
            .setBody(body)
            .setNotes(notes);
    }
    /**
     * Gets the slide in the presentation from the id of the slide
     *
     * @param {string} notes the id of the slide
     *
     * @return {SlideGS} the slide object
     */
    getSlideByNotes(notes) {
        if (notes == null) {
            throw new Error('Notes are not defined to remove in ' + 'SlideshowGS.getSlideByNotes()');
        }
        for (let j = 0; j < this._allSlides.length; j++) {
            if (this._allSlides[j].getNotes().indexOf(notes) == 0) {
                return this._allSlides[j];
            }
        }
        console.log('WARNING: Slide with note ' + notes + ' not found in ' + 'SlideshowGS.getSlideByNotes()');
        return null;
    }
    /**
     * Sets the text of the chosen text box in the presentation from the title of the alt text
     *
     * @param {string} title the alt text title on the slide
     * @param {string} text the text to set
     * @param {boolean} multiple allow multiple text boxes to be set
     *
     * @return {SlideGS} the slide object
     */
    setSlideTextByTitle(title, text, multiple = false) {
        let slidesChanged = [];
        if (title == null) {
            throw new Error('Title for element is not defined to change in ' + 'SlideshowGS.getSlideByNotes()');
        }
        let checkMultiple = multiple ? 1 : 0;
        for (let slide of this._allSlides) {
            const pageElements = slide.getPageElements();
            for (let pageElement of pageElements) {
                const thisTitle = pageElement.getTitle();
                if (thisTitle != null && thisTitle.indexOf(title) != -1) {
                    const thisShape = pageElement.asShape();
                    if (thisShape != null) {
                        thisShape.getText().setText(text);
                        // TODO: thisShape.getAutoFit() - as of 12/21 is not in npm @types/google-apps-script
                        if (checkMultiple == 0)
                            return [slide];
                        checkMultiple++;
                        slidesChanged.push(slide);
                    }
                    else {
                        throw new Error('Could not find text box on slide with title "' + title + '"');
                    }
                }
            }
        }
        if (checkMultiple < 2)
            console.log('WARNING: Slide with title ' + title + ' not found in ' + 'SlideshowGS.setSlideTextByTitle()');
        return slidesChanged;
    }
    /**
     * Removes a slide from the presentation
     *
     * @param {string} id the id of the slide to remove
     *
     * @return {SlideshowGS} the object for chaining
     */
    removeSlide(id) {
        if (id == null) {
            throw new Error('ID is not defined to remove in Slides.removeSlide');
        }
        const thisSlide = this.getSlideByNotes(id);
        if (thisSlide != null)
            thisSlide.remove();
        this._getAllSlides();
        return this;
    }
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
    setSlideBodyByType(slideNotes, slideText) {
        const thisSlide = this.getSlideByNotes(slideNotes);
        if (thisSlide != null)
            thisSlide.setBody(slideText);
        return this;
    }
    /**
     * Sets the title for the given slide type
     *
     * @param {string} slideNotes the notes on the slide
     * @param {string} title the body text to put in the slide
     *
     * @return {SlideshowGS} the object for chaining
     */
    setSlideTitleByType(slideNotes, title) {
        const thisSlide = this.getSlideByNotes(slideNotes);
        if (thisSlide != null)
            thisSlide.setTitle(title);
        return this;
    }
    setTextBoxOrTitleOnSlide(args, textBoxSlideParams, settingsRow, textToSet) {
        const { findByGlobalSlideNotes, findBySpecificSlideNotes = 'Slide Notes', findByAltText, noTitleText = 'No Question Today', displayTextAsTitle = false, } = args;
        const { imageLink, optionsToDisplay, optionsType } = textBoxSlideParams;
        let currentSlide = undefined;
        // Turn a list into a title if necessary
        if (typeof textToSet === 'object') {
            textToSet = textToSet.map(a => a.title).join('\n');
            ;
        }
        // If alt text is defined and present in the slideshow
        if (findByAltText !== undefined) {
            const thisAltText = settingsRow.get(findByAltText);
            if (thisAltText == null || typeof thisAltText !== 'string') {
                throw new Error('Could not find alt text column name (' + thisAltText + ') in Question.updateTodaysQuestion()');
            }
            // Get the current slide
            currentSlide = this.setSlideTextByTitle(thisAltText, textToSet == "" ? noTitleText : textToSet)[0];
        }
        else {
            // If specific slide notes are defined and present in the slideshow
            const theseSlideNotes = settingsRow.get(findBySpecificSlideNotes);
            if (theseSlideNotes != null) {
                const thisSlide = this.getSlideByNotes(theseSlideNotes.toString());
                // Get the current slide
                if (thisSlide !== null)
                    currentSlide = thisSlide;
            }
            // If generic slide notes are defined and present in the slideshow
            if (currentSlide === undefined) {
                if (findByGlobalSlideNotes !== undefined) {
                    const thisSlide = this.getSlideByNotes(findByGlobalSlideNotes);
                    // Get the current slide
                    if (thisSlide !== null)
                        currentSlide = thisSlide;
                }
            }
            if (currentSlide !== undefined) {
                // Display as title if displayTextAsTitle is set
                if (displayTextAsTitle)
                    currentSlide.setTitle(textToSet == "" ? noTitleText : textToSet);
                // Otherwise, display in body
                else
                    currentSlide.setBody(textToSet == "" ? noTitleText : textToSet);
            }
        }
        if (currentSlide !== undefined) {
            // If there is an image to display
            if ((imageLink != null) && (imageLink != "")) {
                // Set image on current slide
                this.changeSlidePicture(imageLink, currentSlide);
            }
            // If there are options to display
            if (optionsType !== undefined) {
                if (optionsToDisplay !== undefined && optionsToDisplay !== null && optionsToDisplay != '') {
                    currentSlide.addItem(optionsType, optionsToDisplay);
                }
            }
        }
    }
}
