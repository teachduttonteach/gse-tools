import {QuestionType} from '../enums/QuestionType';
import {Dimensions} from './Dimensions';

/**
 * Class to access methods and properties of individual Slides of Google
 *  Presentations
 * @param {GoogleAppsScript.Slides.Slide} slideObject the Google Slides object
 * @return {SlideGS} the underlying object
 */
export function newSlide(slideObject: GoogleAppsScript.Slides.Slide): SlideGS {
  return new SlideGS(slideObject);
}

/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {SlideGS} obj the Slide object
 * @return {GoogleAppsScript.Slides.Slide} the Slide object
 */
export function getSlideObject(obj: SlideGS): GoogleAppsScript.Slides.Slide {
  return obj.getObject();
}

/**
 * Get the title of the current slide
 *
 * @param {SlideGS} obj the Slide object
 * @return {string} the title
 */
export function getSlideTitle(obj: SlideGS): string {
  return obj.getTitle();
}

/**
 * Get the speaker notes from the slide
 *
 * @param {SlideGS} obj the Slide object
 * @return {string} the speaker notes
 */
export function getSlideNotes(obj: SlideGS): string {
  return obj.getNotes();
}

/**
 * Set the speaker notes to the specified text
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} text the speaker notes
 *
 * @return {SlideGS} the object for chaining
 */
export function setSlideNotes(obj: SlideGS, text: string): SlideGS {
  return obj.setNotes(text);
}

/**
 * Sets the title of the slide
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} title the title of the slide
 *
 * @return {SlideGS} the object for chaining
 */
export function setSlideTitle(obj: SlideGS, title: string): SlideGS {
  return obj.setTitle(title);
}

/**
 * Sets the body of the slide
 *
 * @param {SlideGS} obj the Slide object
 * @param {string} body the body of the slide
 *
 * @return {SlideGS} the object for chaining
 */
export function setSlideBody(obj: SlideGS, body: string): SlideGS {
  return obj.setBody(body);
}

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
export function setSlideList(
    obj: SlideGS,
    text: string,
    bulletType: GoogleAppsScript.Slides.ListPreset =
    SlidesApp.ListPreset.DISC_CIRCLE_SQUARE,
): SlideGS {
  return obj.setList(text, bulletType);
}

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
export function addSlideItems(
    obj: SlideGS,
    questionOptions: string | Array<string>,
    bulletType: GoogleAppsScript.Slides.ListPreset =
    SlidesApp.ListPreset.DISC_CIRCLE_SQUARE,
): SlideGS {
  return obj.addItems(questionOptions, bulletType);
}

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
export function addSlideItem(
    obj: SlideGS,
    type: QuestionType,
    itemsToAdd: string | Array<string>,
    bulletType: GoogleAppsScript.Slides.ListPreset =
    SlidesApp.ListPreset.DISC_CIRCLE_SQUARE,
): SlideGS {
  return obj.addItem(type, itemsToAdd, bulletType);
}

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
export function changeSlidePicture(
    obj: SlideGS,
    chosenPictureBlob: GoogleAppsScript.Base.BlobSource,
    pictureNumber: number = 0,
): number {
  return obj.changePicture(chosenPictureBlob, pictureNumber);
}

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
export function setSlideDimensions(obj: SlideGS, dimensions: Dimensions):
  SlideGS {
  return obj.setDimensions(dimensions);
}

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
export function positionSlidePicture(obj: SlideGS, id: number,
    bottom: boolean = true, right: boolean = true): SlideGS {
  return obj.positionPicture(id, bottom, right);
}

/**
 * Get the page elements on the slide
 *
 * @param {SlideGS} obj the Slide object
 * @return {Array<GoogleAppsScript.Slides.PageElement>} the page elements
 */
export function getSlidePageElements(obj: SlideGS):
  Array<GoogleAppsScript.Slides.PageElement> {
  return obj.getPageElements();
}

/**
 * Removes the current slide
 * @param {SlideGS} obj the Slide object
 * @return {SlideGS} the object for chaining
 */
export function removeSlide(obj: SlideGS): SlideGS {
  obj.remove();
  return obj;
}

/**
 * Class to access methods and properties of individual Slides of Google
 *  Presentations
 */
export class SlideGS {
  private _slide: GoogleAppsScript.Slides.Slide;
  private _pageElements: Array<GoogleAppsScript.Slides.PageElement>;
  private _dimensions: Dimensions;

  /**
   *
   * @param {GoogleAppsScript.Slides.Slide} slideObject the underlying
   *  Google object
   */
  constructor(slideObject: GoogleAppsScript.Slides.Slide) {
    this._slide = slideObject;
    this._pageElements = this._slide.getPageElements();
    this._dimensions = {} as Dimensions;
  }

  /**
   * Gets the underlying Google Apps Script object for direct access
   *
   * @return {GoogleAppsScript.Slides.Slide} the Slide object
   */
  getObject(): GoogleAppsScript.Slides.Slide {
    return this._slide;
  }

  /**
   * Change the picture displayed in the slide
   *
   * @param {GoogleAppsScript.Base.BlobSource} chosenPictureBlob the blob
   *  (data) of the picture to add
   * @param {number} pictureNumber the number of the picture on the slide
   *
   * @return {number} the number of the replaced page element
   */
  changePicture(chosenPictureBlob: GoogleAppsScript.Base.BlobSource,
      pictureNumber: number = 0): number {
    if (chosenPictureBlob == null) {
      throw new Error('Slide and blob of chosen picture need to be ' +
        'defined in Slides.changePicture');
    }

    const pictureId = this._findPicture(pictureNumber);
    if (pictureId == -1) {
      this._slide.insertImage(chosenPictureBlob);
      this._pageElements = this._slide.getPageElements();
      return this._findPicture(pictureNumber);
    }
    this._pageElements[pictureId].asImage().replace(chosenPictureBlob);
    return pictureId;
  }

  /**
   * Find the picture on the slide according to the number
   *
   * @param {number} pictureNumber the sequential number of the picture
   * @return {number} the ID of the picture or -1 if not found
   */
  private _findPicture(pictureNumber: number): number {
    let countPictures: number = 0;
    for (let pictureId = 0; pictureId < this._pageElements.length;
      pictureId++) {
      if (this._pageElements[pictureId].getPageElementType() ==
        SlidesApp.PageElementType.IMAGE) {
        if (countPictures == pictureNumber) {
          return pictureId;
        }
        countPictures++;
      }
    }
    return -1;
  }


  /**
   * Get the title of the current slide
   *
   * @return {string} the title
   */
  getTitle(): string {
    return this._slide
        .getPlaceholder(SlidesApp.PlaceholderType.TITLE)
        .asShape()
        .getText()
        .asString();
  }

  /**
   * Get the speaker notes from the slide
   *
   * @return {string} the speaker notes
   */
  getNotes(): string {
    return this._slide
        .getNotesPage()
        .getSpeakerNotesShape()
        .getText()
        .asString();
  }

  /**
   * Set the speaker notes to the specified text
   *
   * @param {string} text the speaker notes
   *
   * @return {SlideGS} the object for chaining
   */
  setNotes(text: string): SlideGS {
    if (text == null) {
      throw new Error('Notes text cannot be blank in Slide.setNotes');
    }
    this._slide
        .getNotesPage()
        .getSpeakerNotesShape()
        .getText()
        .setText(text);
    return this;
  }

  /**
   * Sets the title of the slide
   *
   * @param {string} title the title of the slide
   *
   * @return {SlideGS} the object for chaining
   */
  setTitle(title: string): SlideGS {
    if (title == null) {
      throw new Error('Slide title cannot be blank in Slide.setTitle');
    }
    this._slide
        .getPlaceholder(SlidesApp.PlaceholderType.TITLE)
        .asShape()
        .getText()
        .setText(title);
    return this;
  }

  /**
   * Sets the body of the slide
   *
   * @param {string} body the body of the slide
   *
   * @return {SlideGS} the object for chaining
   */
  setBody(body: string): SlideGS {
    if (body == null) {
      throw new Error('Body cannot be blank in Slide.setBody');
    }
    this._slide
        .getPlaceholder(SlidesApp.PlaceholderType.BODY)
        .asShape()
        .getText()
        .setText(body);
    return this;
  }

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
  setList(
      text: string,
      bulletType: GoogleAppsScript.Slides.ListPreset =
      SlidesApp.ListPreset.DISC_CIRCLE_SQUARE,
  ): SlideGS {
    if (text == null) {
      throw new Error('Text cannot be blank in Slide.setList');
    }
    this._slide
        .getPlaceholder(SlidesApp.PlaceholderType.BODY)
        .asShape()
        .getText()
        .setText(text)
        .getListStyle()
        .applyListPreset(bulletType);
    return this;
  }

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
  addItems(
      questionOptions: string | Array<string>,
      bulletType: GoogleAppsScript.Slides.ListPreset =
      SlidesApp.ListPreset.DISC_CIRCLE_SQUARE,
  ): SlideGS {
    let choices: Array<string> = [];
    if (typeof questionOptions !== 'string') choices = questionOptions;
    else choices = questionOptions.split('\n');
    let textRange: string = '';
    for (const choice of choices) {
      textRange += '\t' + choice + '\n';
    }
    this.setList(textRange, bulletType);
    return this;
  }

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
  addItem(
      type: QuestionType,
      itemsToAdd: string | Array<string>,
      bulletType: GoogleAppsScript.Slides.ListPreset =
      SlidesApp.ListPreset.DISC_CIRCLE_SQUARE,
  ): SlideGS {
    switch (type) {
      case QuestionType["True / False"]:
        this.setBody('True or False?');
        break;
      case QuestionType["Multiple Choice"]:
      case QuestionType["Multiple Select"]:
        this.addItems(itemsToAdd, bulletType);
        break;
    }
    return this;
  }

  /**
   * Sets the dimensions of the slide for picture orientation
   *
   * @param {Dimensions} dimensions object that has at least one of the
   *  following properties: "totalHeight", "totalWidth", "maxHeight",
   *  "maxWidth", "margin"
   *
   * @return {SlideGS} the object for chaining
   */
  setDimensions(dimensions: Dimensions): SlideGS {
    if (dimensions == undefined) {
      throw new Error('Height and width of dimensions need to all be ' +
        'integers in Slides.setDimensions');
    }
    this._dimensions = dimensions;
    return this;
  }

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
  positionPicture(id: number, bottom: boolean = true, right: boolean = true):
    SlideGS {
    if (id == null) {
      throw new Error('ID and Slide need to be defined in ' +
      'SlidesGS.positionPicture()');
    }

    if (id == -1) {
      throw new Error('Could not find picture on current slide' +
      ' in SlidesGS.positionPicture()');
    }

    if (this._pageElements == null) {
      throw new Error('Could not get slide ' +
      'specified by Slide object in SlidesGS.positionPicture()');
    }

    if (this._pageElements[id] == null) {
      throw new Error('Could not get ' +
      'element id (' + id +
      ') off of Slide object in SlidesGS.positionPicture');
    }

    const height = this._pageElements[id].getHeight();
    const width = this._pageElements[id].getWidth();

    const {maxHeight = 300, maxWidth = 250, totalHeight = 400,
      totalWidth = 720, margin = 10} = this._dimensions;

    if (height > width) {
      const newWidth = (maxHeight / height) * width;
      this._pageElements[id].setWidth(newWidth);
      this._pageElements[id].setHeight(maxHeight);
      if (right) {
        this._pageElements[id].setLeft(totalWidth - newWidth - margin);
      } else this._pageElements[id].setLeft(margin);
      if (bottom) {
        this._pageElements[id].setTop(totalHeight - maxHeight - margin);
      } else this._pageElements[id].setTop(margin);
    } else {
      const newHeight = (maxWidth / width) * height;
      this._pageElements[id].setHeight(newHeight);
      this._pageElements[id].setWidth(maxWidth);
      if (bottom) {
        this._pageElements[id].setTop(totalHeight - newHeight - margin);
      } else this._pageElements[id].setTop(margin);
      if (right) {
        this._pageElements[id].setLeft(totalWidth - maxWidth - margin);
      } else this._pageElements[id].setLeft(margin);
    }
    return this;
  }

  /**
   * Get the page elements on the slide
   *
   * @return {Array<GoogleAppsScript.Slides.PageElement>} the page elements
   */
  getPageElements(): Array<GoogleAppsScript.Slides.PageElement> {
    return this._pageElements;
  }

  /**
   * Removes the current slide
   */
  remove(): void {
    this._slide.remove();
  }
}
