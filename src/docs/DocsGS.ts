import { UiGS } from "../UiGS"
import {DocLevels} from "./DocLevels"

/**
 * Class to write a Google Document 
 * 
 */
export class DocsGS extends UiGS {
  private _separator: GoogleAppsScript.Document.GlyphType;
  protected _docObject: GoogleAppsScript.Document.Document;
  private _titleDelim: string;

  /**
   * 
   * @param id the id of the underlying Google Doc
   */
  constructor(id: string) {
    super();
    this._docObject = DocumentApp.openById(id);
    if (this._docObject == null) throw new Error("Document not found in Docs()");
    this._titleDelim = ":";  
    this._separator = DocumentApp.GlyphType.BULLET;
  }

  /**
   * Activate the Ui of the Doc if we're accessing from a Doc
   * 
   * @returns {DocsGS} the object for chaining
   */
  activateUi(): DocsGS {
    this._ui = DocumentApp.getUi();
    return this;
  }

  /**
   * Gets the underlying Google Apps Script object for direct access
   * 
   * @returns the Google Document object
   */
  getObject(): GoogleAppsScript.Document.Document {
    return this._docObject;
  }

  /**
   * Change the delimiter to go between the text before the title and the title itself
   * 
   * @param titleDelim the new delimiter, defaults to ":"
   * 
   * @returns {DocsGS} the object for chaining
   */
  changeTitleDelim(titleDelim: string): DocsGS {
    if (titleDelim == null) throw new Error("Invalid delimiter defined for DocsGS.changeTitleDelim");
    this._titleDelim = titleDelim;
    return this;
  }

  /**
   * Change the separator for lists in the Google Doc
   * 
   * @param separator the new separator, defaults to BULLET
   * 
   * @returns {DocsGS} the object for chaining
   */
  changeSeparator(separator: GoogleAppsScript.Document.GlyphType): DocsGS {
    if (!(separator in DocumentApp.GlyphType)) throw new Error("Invalid separator defined for Docs.changeSeparator");
    this._separator = separator;
    return this;
  }

  /**
   * Adds a list item to the Google Doc
   * 
   * @returns {DocsGS} the object for chaining
   */
  appendItem(text: string, title: string, link: string): DocsGS {
    if ((text == null) || (title == null) || (link == null)) throw new Error("Text, title and link need to be defined for DocsGS.appendItem()");
    this._docObject.getBody().appendListItem(text + this._titleDelim + " " + title).setGlyphType(this._separator).setLinkUrl(link);
    return this;
  };

  /**
   * Adds text to the document
   * 
   * @param text the text to add
   * @param level the level of the text
   * 
   * @returns {DocsGS} the object for chaining
   */
  addText(text: string, level: string | number): DocsGS {
    if (text == undefined) throw new Error("Text needs to be defined for the heading in DocsGS.addText()");      
    
    if (level == undefined) throw new Error("Level (" + level + ") needs to be a ParagraphHeading type in DocsGS.addText()");
    if (typeof level === "string") level = level.substr(0, 1).toUpperCase();
    
    let t_level = DocLevels(level);
    if (t_level == null) throw new Error("Level (" + level + ") needs to be a ParagraphHeading type in DocsGS.addText()");
    
    this._docObject.getBody().appendParagraph(text).setHeading(t_level);
    return this;
  };
  
  /** 
   * Clears the body of text
   * 
   * @returns {DocsGS} the object for chaining
   */
  clearBody(): DocsGS {
    this._docObject.getBody().setText("");
    return this;
  }
};