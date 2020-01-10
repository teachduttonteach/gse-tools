import {UiGS} from '../UiGS';
import {DriveGS} from '../drive/DriveGS';
import {SlideGS} from './SlideGS';

/**
* Class to access methods and properties of Google Presentations
*
* @param {string} id the id of the presentation
*/
export function newSlideshow(id: string) {
    return new SlideshowGS(id);
}

/**
 * Clear the slideshow of slides
 * 
 * @param {SlideshowGS} obj the Slideshow object
 * @return {SlideshowGS} the object for chaining
 */
export function clear(obj: SlideshowGS): SlideshowGS {
  return obj.clear();
}

/**
 * Gets the number of the slide in the slideshow template
 *  that was most recently used
 * 
 * @param {SlideshowGS} obj the Slideshow object
 * @return {number} the number of the slide 
 */
export function getSlideshowTemplateSlideUsed(obj: SlideshowGS): number {
  return obj.getTemplateSlideUsed();
}

/**
 * Activate the Ui for the Presentation
 * @param {SlideshowGS} obj the Slideshow object
 * @return {SlideshowGS} the object for chaining
 */
export function activateSlideshowUi(obj: SlideshowGS): SlideshowGS {
    return obj.activateUi();
}

/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @return {GoogleAppsScript.Slides.Presentation} the Presentation object
 */
export function getSlideshowObject(obj: SlideshowGS): GoogleAppsScript.Slides.Presentation {
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
export function setSlideshowTemplate(obj: SlideshowGS, id: string): SlideshowGS {
    return obj.setTemplate(id)
};

/**
 * Changes the picture on the selected slide if a folder is specified
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} folder the folder containing the pictures
 * @param {SlideGS} slide the number of the slide to change the picture of
 *
 * @return {SlideshowGS} the object for chaining
 */
export function changeSlideshowPicture(obj: SlideshowGS, folder: string, slide: SlideGS): SlideshowGS {
    return obj.changeSlidePicture(folder, slide);
};

/**
 * Gets the slide by number
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {number} num the number of the slide
 *
 * @return {SlideGS} the slide object
 */
export function getSlideshowSlide(obj: SlideshowGS, num: number): SlideGS {
    return obj.getSlide(num);
};

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
export function addSlideshowSlide(obj: SlideshowGS, title: string, body: string, type: string): SlideGS {
    return obj.addSlide(title, body, type);
};

/**
 * Gets the slide in the presentation from the id of the slide
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} id the id of the slide
 *
 * @return {SlideGS} the slide object
 */
export function getSlideshowSlideById(obj: SlideshowGS, id: string): SlideGS {
    return obj.getSlideById(id);
};

/**
 * Removes a slide from the presentation
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} id the id of the slide to remove
 *
 * @return {SlideshowGS} the object for chaining
 */
export function removeSlideshowSlide(obj: SlideshowGS, id: string): SlideshowGS {
    return obj.removeSlide(id);
};

/**
 * Gets the slide type from the slide notes and adds the slide if not present
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} typeTitle the type of the slide (from slide notes)
 *
 * @return {SlideGS} the requested slide
 */
export function getSlideshowSlideByType(obj: SlideshowGS, typeTitle: string): SlideGS {
    return obj.getSlideByType(typeTitle);
};

/**
 * Sets the body for the given slide type
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} typeTitle the type of the slide
 * @param {string} slideText the body text to put in the slide
 *
 * @return {SlideshowGS} the object for chaining
 */
export function setSlideshowSlideBodyByType(obj: SlideshowGS, typeTitle: string, slideText: string): SlideshowGS {
    return obj.setSlideBodyByType(typeTitle, slideText);
};

/**
 * Sets the title for the given slide type
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @param {string} typeTitle the type of the slide
 * @param {string} title the body text to put in the slide
 *
 * @return {SlideshowGS} the object for chaining
 */
export function setSlideshowSlideTitleByType(obj: SlideshowGS, typeTitle: string, title: string): SlideshowGS {
    return obj.setSlideTitleByType(typeTitle, title);
};


/**
 * Class to access methods and properties of Google Presentations
 */
export class SlideshowGS extends UiGS {
  private _presentation: GoogleAppsScript.Slides.Presentation;
  private _allSlides: Array<SlideGS>;
  _ui: GoogleAppsScript.Base.Ui;
  private _template: GoogleAppsScript.Slides.Presentation;
  private _templateSlideUsed: number;

  /**
   *
   * @param {string} id the id of the presentation
   */
  constructor(id: string) {
    super();
    this._presentation = SlidesApp.openById(id);
    if (this._presentation == null) {
      throw new Error('Slideshow not found with id ' + id +
        ' in SlideshowGS()');
    }
    this._getAllSlides();
    this._templateSlideUsed = -1;
  }

  /**
   * Clear the slideshow of slides
   * 
   * @return {SlideshowGS} the object for chaining
   */
  clear(): SlideshowGS {
    for (let s of this._allSlides) {
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
  private _getAllSlides(): SlideshowGS {
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
  activateUi(): SlideshowGS {
    this._ui = SlidesApp.getUi();
    return this;
  }

  /**
   * Gets the underlying Google Apps Script object for direct access
   *
   * @return {GoogleAppsScript.Slides.Presentation} the Presentation object
   */
  getObject(): GoogleAppsScript.Slides.Presentation {
    return this._presentation;
  }

  /**
   * Sets the presentation template for adding slides
   *
   * @param {string} id the id of the presentation template
   *
   * @return {SlideshowGS} the object for chaining
   */
  setTemplate(id: string): SlideshowGS {
    if (id == null) {
      throw new Error('Template id is not defined for Slides.setTemplate');
    }
    this._template = SlidesApp.openById(id);
    if (this._template == null) {
      throw new Error('Could not find requested Google Slides template in ' +
        'Slides.setTemplate');
    }
    return this;
  };

  /**
   * Changes the picture on the selected slide if a folder is specified
   *
   * @param {string} folder the folder containing the pictures
   * @param {SlideGS} slide the number of the slide to change the picture of
   *
   * @return {SlideshowGS} the object for chaining
   */
  changeSlidePicture(folder: string, slide: SlideGS): SlideshowGS {
    if (folder != null) {
      const chosenPicture = new DriveGS().getRandomPicture(folder);
      slide.positionPicture(slide.changePicture(chosenPicture));
    }
    return this;
  };

  /**
   * Gets the slide by number
   *
   * @param {number} num the number of the slide
   *
   * @return {SlideGS} the slide object
   */
  getSlide(num: number): SlideGS {
    if (typeof num === 'number') return this._allSlides[num];
    throw new Error('Could not get slide #' + num +
      ' from slideshow in Slides.getSlide');
  };

  /**
   * Gets the number of the slide in the slideshow template
   *  that was most recently used
   * 
   * @return {number} the number of the slide 
   */
  getTemplateSlideUsed(): number {
    return this._templateSlideUsed;
  }

  /**
   * Adds a slide to the Slideshow, using a template if present
   *
   * @param {string} title the title of the new slide
   * @param {string} body the body of the new slide
   * @param {string} type the type of the new slide
   *
   * @return {SlideGS} the new slide object
   */
  addSlide(title: string, body: string, type: string): SlideGS {
    let slideAdded: GoogleAppsScript.Slides.Slide;
    if (this._template != null) {
      if (this._template.getSlides().length > 0) {
        const slideToGet = this._allSlides.length %
          this._template.getSlides().length;
        slideAdded = this._presentation.
            appendSlide(this._template.getSlides()[slideToGet]);
        this._templateSlideUsed = slideToGet;
      } else {
        slideAdded = this._presentation.
            appendSlide(this._template.getSlides()[0]);
      }
    } else {
      slideAdded = this._presentation.
          appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);
    }
    this._getAllSlides();
    return new SlideGS(slideAdded).setTitle(title).setBody(body).
        setNotes(type);
  };

  /**
   * Gets the slide in the presentation from the id of the slide
   *
   * @param {string} id the id of the slide
   *
   * @return {SlideGS} the slide object
   */
  getSlideById(id: string): SlideGS {
    if (id == null) {
      throw new Error('Id is not defined to remove in ' +
        'SlideshowGS.getSlideById');
    }
    for (let j = 0; j < this._allSlides.length; j++) {
      if (this._allSlides[j].getNotes().indexOf(id) == 0) {
        return this._allSlides[j];
      }
    }
    throw new Error('Slide id ' + id +
      ' not found in SlideshowGS.getSlideById');
  };

  /**
   * Removes a slide from the presentation
   *
   * @param {string} id the id of the slide to remove
   *
   * @return {SlideshowGS} the object for chaining
   */
  removeSlide(id: string): SlideshowGS {
    if (id == null) {
      throw new Error('ID is not defined to remove in Slides.removeSlide');
    }
    this.getSlideById(id).remove();
    this._getAllSlides();
    return this;
  };

  /**
   * Gets the slide type from the slide notes and adds the slide if not present
   *
   * @param {string} typeTitle the type of the slide (from slide notes)
   *
   * @return {SlideGS} the requested slide
   */
  getSlideByType(typeTitle: string): SlideGS {
    for (const s of this._allSlides) {
      const thisNotes = s.getNotes();
      if ((thisNotes != null) && (thisNotes != '') &&
        (thisNotes.substr(0, typeTitle.length) == typeTitle)) return s;
    }
    return this.addSlide(typeTitle, '', typeTitle);
  };

  /**
   * Sets the body for the given slide type
   *
   * @param {string} typeTitle the type of the slide
   * @param {string} slideText the body text to put in the slide
   *
   * @return {SlideshowGS} the object for chaining
   */
  setSlideBodyByType(typeTitle: string, slideText: string): SlideshowGS {
    this.getSlideByType(typeTitle).setBody(slideText);
    return this;
  };

  /**
   * Sets the title for the given slide type
   *
   * @param {string} typeTitle the type of the slide
   * @param {string} title the body text to put in the slide
   *
   * @return {SlideshowGS} the object for chaining
   */
  setSlideTitleByType(typeTitle: string, title: string): SlideshowGS {
    this.getSlideByType(typeTitle).setTitle(title);
    return this;
  };
}
