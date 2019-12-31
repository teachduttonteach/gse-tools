import { QuestionType } from "../enums/QuestionType";
import {Dimensions} from "./Dimensions"

/**
 * Class to access methods and properties of individual Slides of Google Presentations
 */
export class SlideGS {
    private _slide: GoogleAppsScript.Slides.Slide;
    private _pageElements: Array<GoogleAppsScript.Slides.PageElement>;
    private _dimensions: Dimensions;
  
    constructor(slideObject: GoogleAppsScript.Slides.Slide) {
      this._slide = slideObject;
      this._pageElements = this._slide.getPageElements();
      this._dimensions = {} as Dimensions;
    }

    /**
     * Gets the underlying Google Apps Script object for direct access
     * 
     * @returns {GoogleAppsScript.Slides.Slide} the Slide object
     */
    getObject(): GoogleAppsScript.Slides.Slide {
      return this._slide;
    }
    
    /**
     * Replaces the picture at the specified number (default 0) with the specified picture
     * 
     * @param {GoogleAppsScript.Base.BlobSource} picture the blob (data) holding the picture
     * @param {number} imageNumber the number of the image on the slide 
     * 
     * @returns {number} the number of the page element of the replaced picture
     */
    replaceImage(picture: GoogleAppsScript.Base.BlobSource, imageNumber: number = 0): number {
      if (picture == null) throw new Error("Picture not defined in Slide.replaceImage");
      let foundImages: number = 0;
      for (var j = 0; j < this._pageElements.length; j++) {
        if (this._pageElements[j].getPageElementType() == SlidesApp.PageElementType.IMAGE) {
          if (foundImages == imageNumber) {
            this._pageElements[j].asImage().replace(picture);
            return j;
          } else {
            foundImages++;
          }
        }
      }
      throw new Error("Could not find picture number " + imageNumber + " on slide in Slide.replaceImage");
    }

    /**
     * Get the speaker notes from the slide
     * 
     * @returns {string} the speaker notes
     */
    getNotes(): string {
      return this._slide.getNotesPage().getSpeakerNotesShape().getText().asString();
    };

    /**
     * Set the speaker notes to the specified text
     * 
     * @param text the speaker notes
     * 
     * @returns {SlideGS} the object for chaining
     */
    setNotes(text: string): SlideGS {
      if (text == null) throw new Error("Notes text cannot be blank in Slide.setNotes");
      this._slide.getNotesPage().getSpeakerNotesShape().getText().setText(text);
      return this;
    };

    /**
     * Sets the title of the slide 
     * 
     * @param title the title of the slide
     * 
     * @returns {SlideGS} the object for chaining
     */
    setTitle(title: string): SlideGS {
      if (title == null) throw new Error("Slide title cannot be blank in Slide.setTitle"); 
      this._slide.getPlaceholder(SlidesApp.PlaceholderType.TITLE).asShape().getText().setText(title);
      return this;
    };

    /**
     * Sets the body of the slide
     * 
     * @param body the body of the slide
     * 
     * @returns {SlideGS} the object for chaining
     */
    setBody(body: string): SlideGS {
      if (body == null) throw new Error("Body cannot be blank in Slide.setBody"); 
      this._slide.getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape().getText().setText(body);   
      return this;
    };

    /**
     * Sets the body of the slide to a list
     * 
     * @param text the list, as a string with "\t" for each new member of the list
     * @param bulletType the optional type of bullet for the list
     * 
     * @returns {SlideGS} the object for chaining
     */
    setList(text: string, bulletType: GoogleAppsScript.Slides.ListPreset = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE): SlideGS {
      if (text == null) throw new Error("Text cannot be blank in Slide.setList");
      this._slide.getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape().getText().setText(text).getListStyle().applyListPreset(bulletType);   
      return this;
    };
    
    /**
     * Add items to a list on a slide
     * 
     * @param {string | Array<string>} questionOptions the options as a list of line breaks or an array
     * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional type of bullet for the list
     * 
     * @returns {SlideGS} the object for chaining
     */
    addItems(questionOptions: string | Array<string>, bulletType: GoogleAppsScript.Slides.ListPreset = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE): SlideGS {
      let choices: Array<string> = [];
      if (typeof questionOptions !== "string") choices = questionOptions;
      else choices = questionOptions.split("\n");
      let textRange: string = "";
      for (let choice in choices) {
        textRange += "\t" + choice + "\n";
      }
      this.setList(textRange, bulletType);
      return this;
    };
    
    /**
     * Adds the item to the slide of a particular type
     * 
     * @param type the type of item to add to the slide
     * @param {string | Array<string>} itemsToAdd the string or array of strings that holds the item data
     * @param {GoogleAppsScript.Slides.ListPreset} bulletType the optional type of bullet for the list
     * 
     * @returns {SlideGS} the object for chaining
     */
    addItem(type: string, itemsToAdd: string | Array<string>, bulletType: GoogleAppsScript.Slides.ListPreset = SlidesApp.ListPreset.DISC_CIRCLE_SQUARE): SlideGS {
      switch (type) {
        case QuestionType.TRUE_FALSE:
          this.setBody("True or False?");
          break;
        case QuestionType.MULTIPLE_CHOICE:
        case QuestionType.MULTIPLE_SELECT:
          this.addItems(itemsToAdd, bulletType);
          break;
      }
      return this;
    };
    
    /**
     * Change the picture displayed in the slide
     * 
     * @param {GoogleAppsScript.Base.BlobSource} chosenPictureBlob the blob (data) of the picture to add
     * @param pictureNumber the number of the picture on the slide
     * 
     * @returns {number} the number of the replaced page element
     */
    changePicture(chosenPictureBlob: GoogleAppsScript.Base.BlobSource, pictureNumber: number = 0): number {
      if (chosenPictureBlob == null) throw new Error("Slide and blob of chosen picture need to be defined in Slides.changePicture");
      let countPictures: number = 0;
      for (var pictureId = 0; pictureId < this._pageElements.length; pictureId++) {
        if (this._pageElements[pictureId].getPageElementType() == SlidesApp.PageElementType.IMAGE) {
          if (countPictures == pictureNumber) {
            this._pageElements[pictureId].asImage().replace(chosenPictureBlob);
            return pictureId;
          }
          countPictures++;
        }
      }
      return -1;
    };

    /**
     * Sets the dimensions of the slide for picture orientation
     * 
     * @param dimensions object that has at least one of the following properties: "totalHeight", "totalWidth", "maxHeight", "maxWidth", "margin" 
     *  
     * @returns {SlideGS} the object for chaining 
     */
    setDimensions(dimensions: Dimensions): SlideGS {
      if (dimensions == undefined) throw new Error("Height and width of dimensions need to all be integers in Slides.setDimensions");
      this._dimensions = dimensions;
      return this;
    };

    /**
     * Position the picture on the slide according to the size of the image
     * 
     * @param id the number of the picture on the slide
     * @param bottom whether or not to display the image aligned to the bottom (default true = bottom)
     * @param right whether or not to display the image aligned to the right (default true = right)
     */
    positionPicture(id: number, bottom: boolean = true, right: boolean = true) {
      if (id == null) throw new Error("ID and Slide need to be defined in SlidesGS.positionPicture()");
      if (this._pageElements == null) throw new Error("Could not get slide specified by Slide object in Slides.positionPicture");
      if (this._pageElements[id] == null) throw new Error("Could not get element id (" + id + ") off of Slide object in Slides.positionPicture");
      let height = this._pageElements[id].getHeight();
      let width = this._pageElements[id].getWidth();     
      
      let {
        maxHeight = 300,
        maxWidth = 250,
        totalHeight = 400,
        totalWidth = 720,
        margin = 10
      } = this._dimensions;

      if (height > width) {
        var newWidth = (maxHeight / height) * width;
        this._pageElements[id].setWidth(newWidth);
        this._pageElements[id].setHeight(maxHeight);
        if (right) this._pageElements[id].setLeft(totalWidth - newWidth - margin);
        else this._pageElements[id].setLeft(margin);
        if (bottom) this._pageElements[id].setTop(totalHeight - maxHeight - margin);
        else this._pageElements[id].setTop(margin);
      } else {
        var newHeight = (maxWidth / width) * height;
        this._pageElements[id].setHeight(newHeight);
        this._pageElements[id].setWidth(maxWidth);
        if (bottom) this._pageElements[id].setTop(totalHeight - newHeight - margin);
        else this._pageElements[id].setTop(margin);
        if (right) this._pageElements[id].setLeft(totalWidth - maxWidth - margin);
        else this._pageElements[id].setLeft(margin);
      }
      return this;
    };
    
    /**
     * Get the page elements on the slide
     * 
     * @returns the page elements
     */
    getPageElements(): Array<GoogleAppsScript.Slides.PageElement> {
      return this._pageElements;
    };

    /**
     * Removes the current slide
     */
    remove(): void {
      this._slide.remove();
    }

  };
  
