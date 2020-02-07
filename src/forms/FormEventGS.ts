import {FormEventOptions} from './FormEventOptions';
import {DateParams} from '../DateParams'

/**
 * Class to provide functions to Google Form events
 *
 * ```javascript
 * function onSubmitBellwork(e) {
 *   var formEvent = new gseTools.FormEventGS(e);
 *   alert(formEvent.fullDate("MD", "/", "\n", 0, "T"));
 * }
 * ```
 *
 * @param {GoogleAppsScript.Events.FormsOnFormSubmit} e the Google form
 *  submission event
 * @return {FormEventGS} the FormEventGS object
 */
export function newFormEvent(e: GoogleAppsScript.Events.FormsOnFormSubmit):
  FormEventGS {
  return new FormEventGS(e);
}

/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {FormEventGS} obj the FormEvent object
 * @return {GoogleAppsScript.Events.FormsOnFormSubmit} the Event object
 */
export function getFormEventObject(obj: FormEventGS):
  GoogleAppsScript.Events.FormsOnFormSubmit {
  return obj.getObject();
}

/**
 * Gets the number of items in the response
 * @param {FormEventGS} obj the FormEvent object
 * @return {number} the number of items
 */
export function getNumFormItems(obj: FormEventGS): number {
  return obj.getNumItems();
}

/**
 * Get the numbered item response off of the form event
 * @param {FormEventGS} obj the FormEvent object
 * @param {number} num the number of the response 
 * @return {GoogleAppsScript.Forms.ItemResponse} the ItemResponse object
 */
export function getFormItem(obj: FormEventGS, num: number): 
  GoogleAppsScript.Forms.ItemResponse {
  
  return obj.getItem(num);
}

/**
 * Gets the response for the item number
 * @param {FormEventGS} obj the FormEvent object
 * @param {number} num the number of the response
 * @return {string | string[] | string[][]} the item response 
 */
export function getFormItemResponse(obj: FormEventGS, num: number): 
  string | string[] | string[][] {
  return obj.getItemResponse(num);
}


/**
 * Gets the title of the form
 *
 * @param {FormEventGS} obj the FormEvent object
 * @return {string} the title
 */
export function getFormEventTitle(obj: FormEventGS): string {
  return obj.getTitle();
}

/**
 * Gets the email address of the submitter of the form
 *
 * @param {FormEventGS} obj the FormEvent object
 * @return {string} the email address
 */
export function getFormEventEmail(obj: FormEventGS): string {
  return obj.getEmail();
}

/**
 * Prints the full date from a list of optional arguments
 *
 * @param {FormEventGS} obj the FormEvent object
 * @param {DateParams} dateParams the options for the form event
 * @return {string} the full date
 */
export function getFullFormEventDate(obj: FormEventGS,
    dateParams?: DateParams): string {
  return obj.getFullDate(dateParams);
}

/**
 * Gets the title for the item number
 * @param {FormEventGS} obj the FormEvent object
 * @param {number} num the number of the response
 * @return {string} the item title 
 */
export function getFormItemTitle(obj: FormEventGS, num: number): string {
  return obj.getItemTitle(num);    
}

/**
 * Class to provide functions to Google Form events
 *
 * ```javascript
 * function onSubmitBellwork(e) {
 *   var formEvent = new gseTools.FormEventGS(e);
 *   alert(formEvent.fullDate("MD", "/", "\n", 0, "T"));
 * }
 * ```
 */
export class FormEventGS {
  private _title: string;
  private _date: GoogleAppsScript.Base.Date;
  private _email: string;
  private _response: GoogleAppsScript.Forms.FormResponse;
  private _event: GoogleAppsScript.Events.FormsOnFormSubmit;

  /**
   * Get the values needed for these tools from the form event
   *
   * @param {GoogleAppsScript.Events.FormsOnFormSubmit} e contains the
   *  form event
   */
  constructor(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
    this._title = e.source.getTitle();
    this._date = e.response.getTimestamp();
    this._email = e.response.getRespondentEmail();
    this._response = e.response;
    this._event = e;
  }

  /**
   * Gets the underlying Google Apps Script object for direct access
   *
   * @return {GoogleAppsScript.Events.FormsOnFormSubmit} the Event object
   */
  getObject(): GoogleAppsScript.Events.FormsOnFormSubmit {
    return this._event;
  }

  /**
   * Gets the number of items in the response
   * @return {number} the number of items
   */
  getNumItems(): number {
    return this._response.getItemResponses().length;
  }

  /**
   * Gets the response for the item number
   * @param {number} num the number of the response
   * @return {string | string[] | string[][]} the item response 
   */
  getItemResponse(num: number): string | string[] | string[][] {
    return this.getItem(num).getResponse();
  }

  /**
   * Get the numbered item response off of the form event
   * @param {number} num the number of the response 
   * @return {GoogleAppsScript.Forms.ItemResponse} the ItemResponse object
   */
  getItem(num: number): GoogleAppsScript.Forms.ItemResponse {
    const thisItem = this._response.getItemResponses()[num];
    if ((thisItem == null) || (thisItem == undefined)) throw new 
      Error("Could not find item #" + num + " in form item responses having" +
      " length of " + this.getNumItems() + 
      " in FormEventGS.getItemResponse()");
    return thisItem;
  }

  /**
   * Gets the title for the item number
   * @param {number} num the number of the item
   * @return {string} the item title 
   */
  getItemTitle(num: number): string {
    return this.getItem(num).getItem().getTitle();    
  }

  /**
   * Gets the title of the form
   *
   * @return {string} the title
   */
  getTitle(): string {
    return this._title;
  }

  /**
   * Gets the email address of the submitter of the form
   *
   * @return {string} the email address
   */
  getEmail(): string {
    return this._email;
  }

  /**
   * Gets the first and last name from the email address
   * @return {[string, string]} the first and last name
   */
  getNameFromEmail(): [string, string] {
    if ((this._email == null) || (this._email == undefined)) throw new
      Error("Email not found on form response in " +
      "FormEventGS.getNameFromEmail()");
    const email: string[] = this._email.split("@")[0].split(".");
    if (!(email instanceof Array)) throw new Error("Could not find name in " +
      "email address '" + this._email + "' in FormEventGS.getNameFromEmail()");
    const firstName = email[0].charAt(0).toUpperCase() + email[0].slice(1);
    const lastName = email[1].charAt(0).toUpperCase() + email[1].slice(1);
    return [firstName, lastName];    
  }

  /**
   * Prints the full date from a list of optional arguments
   *
   * @param {DateParams} dateParams the options for the form event
   * @return {string} the full date
   */
  getFullDate(dateParams?: DateParams): string {
    if (dateParams == null) dateParams = {} as DateParams;
    const {
      dateOrder = 'MD',
      dateDelim = '/',
    } = dateParams;

    let [firstDate, secondDate] =
      [this._date.getMonth() + 1, this._date.getDate()];
    if (dateOrder == 'DM') {
      [firstDate, secondDate] =
        [this._date.getDate(), this._date.getMonth() + 1];
    }

    return firstDate + dateDelim + secondDate;
  }
}
