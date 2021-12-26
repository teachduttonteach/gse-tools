import { UiGS } from '../UiGS';
import { DocLevels } from './DocLevels';

/**
 * Class to write a Google Document
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} id the id of the underlying Google Doc
 * @return {DocsGS} the Docs object
 */
export function newDocs(obj: DocsGS, id: string): DocsGS {
  return new DocsGS(id);
}

/**
 * Activate the Ui of the Doc if we're accessing from a Doc
 *
 * @param {DocsGS} obj the Docs object
 * @return {DocsGS} the object for chaining
 */
export function activateDocsUi(obj: DocsGS): DocsGS {
  return obj.activateUi();
}

/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {DocsGS} obj the Docs object
 * @return {GoogleAppsScript.Document.Document} the Google Document object
 */
export function getDocsObject(obj: DocsGS): GoogleAppsScript.Document.Document {
  return obj.getObject();
}

/**
 * Gets the ID of the document
 * 
 * @param obj the Docs object
 * @returns the ID of the document
 */
export function getDocId(obj: DocsGS): string {
  return obj.getId();
}

/**
 * Publishes the Doc by saving and closing.
 * 
 * @param {DocsGS} obj the Docs object
 * @returns {DocsGS} the Docs object for chaining
 */
export function publishDoc(obj: DocsGS): DocsGS {
  return obj.publish();
}

/**
 * Change the delimiter to go between the text before the title and the
 *  title itself
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} titleDelim the new delimiter, defaults to ":"
 *
 * @return {DocsGS} the object for chaining
 */
export function changeDocsTitleDelim(obj: DocsGS, titleDelim: string): DocsGS {
  return obj.changeTitleDelim(titleDelim);
}

/**
 * Change the separator for lists in the Google Doc
 *
 * @param {DocsGS} obj the Docs object
 * @param {GoogleAppsScript.Document.GlyphType} separator the new separator,
 *  defaults to BULLET
 *
 * @return {DocsGS} the object for chaining
 */
export function changeDocsSeparator(obj: DocsGS, separator: GoogleAppsScript.Document.GlyphType): DocsGS {
  return obj.changeSeparator(separator);
}

/**
 * Adds a list item to the Google Doc
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} text the text to display
 * @param {string} title the title of the item
 * @param {string} link the link to display
 * @return {DocsGS} the object for chaining
 */
export function appendDocsItem(obj: DocsGS, text: string, title: string, link: string): DocsGS {
  return obj.appendItem(text, title, link);
}

/**
 * Adds text to the document
 *
 * @param {DocsGS} obj the Docs object
 * @param {string} text the text to add
 * @param {string | number} level the level of the text
 * @param {boolean} firstParagraph if this should be the first paragraph of the document
 *
 * @return {DocsGS} the object for chaining
 */
export function addDocsText(obj: DocsGS, text: string, level: string | number, firstParagraph: boolean = false): DocsGS {
  return obj.addText(text, level, firstParagraph);
}

/**
 * Clears the body of text
 *
 * @param {DocsGS} obj the Docs object
 * @return {DocsGS} the object for chaining
 */
export function clearDocsBody(obj: DocsGS): DocsGS {
  return obj.clearBody();
}

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
   * @param {string} id the id of the underlying Google Doc
   */
  constructor(id: string) {
    super();
    this._docObject = DocumentApp.openById(id);
    if (this._docObject == null) {
      throw new Error('Document not found in Docs()');
    }
    this._titleDelim = ':';
    this._separator = DocumentApp.GlyphType.BULLET;
  }

  /**
   * Activate the Ui of the Doc if we're accessing from a Doc
   *
   * @return {DocsGS} the object for chaining
   */
  activateUi(): DocsGS {
    this._ui = DocumentApp.getUi();
    return this;
  }

  /**
   * Gets the underlying Google Apps Script object for direct access
   *
   * @return {GoogleAppsScript.Document.Document} the Google Document object
   */
  getObject(): GoogleAppsScript.Document.Document {
    return this._docObject;
  }

  /**
   * Gets the ID of the document object
   * 
   * @returns the ID of the document object
   */
  getId(): string {
    return this._docObject.getId();
  }

  /**
   * Return the body of the document
   *
   * @return {GoogleAppsScript.Document.Body} the document body
   */
  getBody(): GoogleAppsScript.Document.Body {
    return this._docObject.getBody();
  }

  /**
   * Change the delimiter to go between the text before the title and the
   *  title itself
   *
   * @param {string} titleDelim the new delimiter, defaults to ":"
   *
   * @return {DocsGS} the object for chaining
   */
  changeTitleDelim(titleDelim: string): DocsGS {
    if (titleDelim == null) {
      throw new Error('Invalid delimiter defined for DocsGS.changeTitleDelim');
    }
    this._titleDelim = titleDelim;
    return this;
  }

  /**
   * Change the separator for lists in the Google Doc
   *
   * @param {GoogleAppsScript.Document.GlyphType} separator the new separator,
   *  defaults to BULLET
   *
   * @return {DocsGS} the object for chaining
   */
  changeSeparator(separator: GoogleAppsScript.Document.GlyphType): DocsGS {
    if (DocumentApp.GlyphType[separator] == null) {
      throw new Error('Invalid separator defined for Docs.changeSeparator');
    }
    this._separator = separator;
    return this;
  }

  /**
   * Adds a list item to the Google Doc
   *
   * @param {string} text the text to display
   * @param {string} title the title of the item
   * @param {string} link the link to display
   * @return {DocsGS} the object for chaining
   */
  appendItem(text: string, title: string, link: string): DocsGS {
    if (text == null || title == null || link == null) {
      throw new Error('Text, title and link need to be defined for ' + 'DocsGS.appendItem()');
    }
    this._docObject
      .getBody()
      .appendListItem(text + this._titleDelim + ' ' + title)
      .setGlyphType(this._separator)
      .setLinkUrl(link);
    return this;
  }

  /**
   * Publishes the document by saving and closing.
   * 
   * @returns {DocsGS} the object for chaining
   */
  publish(): DocsGS {
    this._docObject.saveAndClose();
    return this;
  }

  /**
   * Adds text to the document
   *
   * @param {string} text the text to add
   * @param {string | number} level the level of the text
   * @param {boolean} firstParagraph if this is the first paragraph of the document
   *
   * @return {DocsGS} the object for chaining
   */
  addText(text: string, level: string | number = 'N', firstParagraph: boolean = false): DocsGS {
    if (text == undefined) {
      throw new Error('Text needs to be defined for the' + ' heading in DocsGS.addText()');
    }

    if (level == undefined) {
      throw new Error('Level (' + level + ') needs to ' + 'be a ParagraphHeading type in DocsGS.addText()');
    }
    if (typeof level === 'string') level = level.substr(0, 1).toUpperCase();

    const docLevelsInstance = new DocLevels();
    const thisLevel = docLevelsInstance.getDocLevels(level);
    if (thisLevel == null) {
      throw new Error('Level (' + level + ') needs to ' + 'be a ParagraphHeading type in DocsGS.addText()');
    }

    if (firstParagraph) {
      this._docObject
      .getBody()
      .getParagraphs()[0]
      .setHeading(thisLevel)
      .setText(text)
    } else {
      this._docObject
      .getBody()
      .appendParagraph(text)
      .setHeading(thisLevel);
    }
    return this;
  }

  /**
   * Clears the body of text
   *
   * @return {DocsGS} the object for chaining
   */
  clearBody(): DocsGS {
    this._docObject.getBody().setText('');
    return this;
  }
}
