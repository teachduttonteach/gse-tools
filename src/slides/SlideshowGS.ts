import { UiGS } from '../UiGS';
import { DriveGS } from '../drive/DriveGS';
import { SlideGS } from './SlideGS';
import { QuestionType } from '../enums/QuestionType';
import { LessonInfo } from '../samples/LessonInfo';

export type SlideDisplayParams = {
  /**
   * A string in the Notes part of the slide to determine the one slide in the slideshow
   */
  findByGlobalSlideNotes?: string;
  /**
   * A string to find the column that contains specific Notes that determines the right slide for this class
   */
  findBySpecificSlideNotes?: string;
  /**
   * A string to find the column that contains specific info to determine where the text should be displayed, by the title of the alt text
   */
  findByAltText?: string;
  /**
   * String to display if there is no text available
   */
  noTitleText?: string;
  /**
   * Whether or not to display the linked text as the title of the slide
   */
  displayTextAsTitle?: boolean;
}

export type TextBoxSlideParams = {
  /**
   * Link to the image to display
   */
  imageLink?: string;
  /**
   * Options to display for a question
   */
  optionsToDisplay?: string;
  /**
   * Type of options to display (like multiple choice)
   */
  optionsType?: QuestionType;
}

/**
 * Class to access methods and properties of Google Presentations
 *
 * @param {string} id the id of the presentation
 * @return {SlideshowGS} the Slideshow object
 */
export function newSlideshow(id: string): SlideshowGS {
  return new SlideshowGS(id);
}

/**
 * Clear the slideshow of slides
 *
 * @param {SlideshowGS} obj the Slideshow object
 * @return {SlideshowGS} the object for chaining
 */
export function clearSlideshow(obj: SlideshowGS): SlideshowGS {
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
export function changeSlideshowPictureFromFolder(obj: SlideshowGS, folder: string, slide: SlideGS): SlideshowGS {
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
export function changeSlideshowPicture(obj: SlideshowGS, imageId: string, slide: SlideGS): SlideshowGS {
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
export function getSlide(obj: SlideshowGS, num: number): SlideGS {
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
export function addSlide(obj: SlideshowGS, title: string, body: string, type: string): SlideGS {
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
export function getSlideByNotes(obj: SlideshowGS, notes: string): SlideGS | null {
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
 export function setSlideTextByTitle(obj: SlideshowGS, title: string, text: string, multiple: boolean = false): Array<SlideGS> {
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
export function removeSlide(obj: SlideshowGS, id: string): SlideshowGS {
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
export function setSlideBodyByType(obj: SlideshowGS, slideNotes: string, slideText: string): SlideshowGS {
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
export function setSlideTitleByType(obj: SlideshowGS, slideNotes: string, title: string): SlideshowGS {
  return obj.setSlideTitleByType(slideNotes, title);
}

/**
 * Class to access methods and properties of Google Presentations
 */
export class SlideshowGS extends UiGS {
  private _presentation: GoogleAppsScript.Slides.Presentation;
  private _allSlides: Array<SlideGS>;
  //_ui: GoogleAppsScript.Base.Ui;
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
  clear(): SlideshowGS {
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
  changeSlidePicture(imageId: string, slide: SlideGS): SlideshowGS {
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
  changeSlidePictureFromFolder(folder: string, slide: SlideGS): SlideshowGS {
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
  getSlide(num: number): SlideGS {
    if (typeof num === 'number') return this._allSlides[num - 1];
    throw new Error('Could not get slide #' + num + ' from slideshow in Slides.getSlide');
  }

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
   * @param {string} notes the notes on the new slide
   *
   * @return {SlideGS} the new slide object
   */
  addSlide(title: string, body: string, notes: string = ''): SlideGS {
    let slideAdded: GoogleAppsScript.Slides.Slide;
    if (this._template != null) {
      if (this._template.getSlides().length > 0) {
        const slideToGet = this._allSlides.length % this._template.getSlides().length;
        slideAdded = this._presentation.appendSlide(this._template.getSlides()[slideToGet]);
        this._templateSlideUsed = slideToGet;
      } else {
        slideAdded = this._presentation.appendSlide(this._template.getSlides()[0]);
      }
    } else {
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
  getSlideByNotes(notes: string): SlideGS | null {
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
     setSlideTextByTitle(title: string, text: string, multiple: boolean = false): Array<SlideGS> {
       let slidesChanged: Array<SlideGS> = [];
      if (title == null) {
        throw new Error('Title for element is not defined to change in ' + 'SlideshowGS.getSlideByNotes()');
      }
      let checkMultiple: number = multiple ? 1 : 0;
      for (let slide of this._allSlides) {
        const pageElements: GoogleAppsScript.Slides.PageElement[] = slide.getPageElements();
        for (let pageElement of pageElements) {
          const thisTitle: string = pageElement.getTitle();
          if (thisTitle != null && thisTitle.indexOf(title) != -1) {
            const thisShape = pageElement.asShape();
            if (thisShape != null) {
              thisShape.getText().setText(text);
              // TODO: thisShape.getAutoFit() - as of 12/21 is not in npm @types/google-apps-script
              if (checkMultiple == 0) return [slide];
              checkMultiple++;
              slidesChanged.push(slide);
            } else {
              throw new Error(
                'Could not find text box on slide with title "' + title + '"',
              );
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
  removeSlide(id: string): SlideshowGS {
    if (id == null) {
      throw new Error('ID is not defined to remove in Slides.removeSlide');
    }
    const thisSlide = this.getSlideByNotes(id);
    if (thisSlide != null) thisSlide.remove();
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
  setSlideBodyByType(slideNotes: string, slideText: string): SlideshowGS {
    const thisSlide = this.getSlideByNotes(slideNotes);
    if (thisSlide != null) thisSlide.setBody(slideText);
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
  setSlideTitleByType(slideNotes: string, title: string): SlideshowGS {
    const thisSlide = this.getSlideByNotes(slideNotes);
    if (thisSlide != null) thisSlide.setTitle(title);
    return this;
  }

  setTextBoxOrTitleOnSlide(args: SlideDisplayParams,
    textBoxSlideParams: TextBoxSlideParams,
    textToSet: string | Array<LessonInfo>,
    settingsRowOrSlideNotes?: Map<string | Date, string | Date> | string,
  ) {
    const {
      findByGlobalSlideNotes,
      findBySpecificSlideNotes = SPECIFIC_SLIDE_NOTES,
      findByAltText,
      noTitleText = NO_TITLE_TEXT,
      displayTextAsTitle = false,
    } = args;

    const {
      imageLink,
      optionsToDisplay,
      optionsType
    } = textBoxSlideParams;

    let currentSlide: SlideGS | undefined = undefined;

    // Turn a list into a title if necessary
    if (typeof textToSet === 'object') {
      textToSet = textToSet.map(a => a.title).join('\n');;
    }    

    if (typeof settingsRowOrSlideNotes === 'string') {
      currentSlide = this.setSlideTextByTitle(settingsRowOrSlideNotes, textToSet == "" ? noTitleText : textToSet)[0];
    } else if (settingsRowOrSlideNotes !== undefined) {
      // If alt text is defined and present in the slideshow
      if (findByAltText !== undefined) {
        const thisAltText = settingsRowOrSlideNotes.get(findByAltText);
        if (thisAltText == null || typeof thisAltText !== 'string') {
          throw new Error(
            'Could not find alt text column name (' + thisAltText + ') in Question.updateTodaysQuestion()',
          );
        }

        // Get the current slide
        currentSlide = this.setSlideTextByTitle(thisAltText, textToSet == "" ? noTitleText : textToSet)[0];
      } else {
        // If specific slide notes are defined and present in the slideshow
        const theseSlideNotes = settingsRowOrSlideNotes.get(findBySpecificSlideNotes);
        if (theseSlideNotes != null) {
          const thisSlide = this.getSlideByNotes(theseSlideNotes.toString());
          // Get the current slide
          if (thisSlide !== null) {
            currentSlide = thisSlide;
          }
        }

        // If generic slide notes are defined and present in the slideshow
        if (currentSlide === undefined) {
          if (findByGlobalSlideNotes !== undefined) {
            const thisSlide = this.getSlideByNotes(findByGlobalSlideNotes);
            // Get the current slide
            if (thisSlide !== null) {
              currentSlide = thisSlide;
            }
          }
        }
      }

      if (currentSlide !== undefined) {
        // Display as title if displayTextAsTitle is set
        if (displayTextAsTitle) {
          currentSlide.setTitle(textToSet == "" ? noTitleText : textToSet);
        }
        // Otherwise, display in body
        else {
          currentSlide.setBody(textToSet == "" ? noTitleText : textToSet);
        }
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
