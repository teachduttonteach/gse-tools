import { FormEventOptions } from './FormEventOptions';

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
export function newFormEvent(e: GoogleAppsScript.Events.FormsOnFormSubmit): FormEventGS {
  return new FormEventGS(e);
}

/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {FormEventGS} obj the FormEvent object
 * @return {GoogleAppsScript.Events.FormsOnFormSubmit} the Event object
 */
export function getFormEventObject(obj: FormEventGS): GoogleAppsScript.Events.FormsOnFormSubmit {
  return obj.getObject();
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
 * @param {FormEventOptions} options the options for the form event
 * @return {string} the full date
 */
export function fullFormEventDate(obj: FormEventGS, options?: FormEventOptions): string {
  return obj.fullDate(options);
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
   * Prints the full date from a list of optional arguments
   *
   * @param {FormEventOptions} options the options for the form event
   * @return {string} the full date
   */
  fullDate(options?: FormEventOptions): string {
    if (options == null) options = {} as FormEventOptions;
    const {
      dateOrder = 'MD',
      dateDelimiter = '/',
    } = options;

    let [firstDate, secondDate] = [this._date.getMonth() + 1, this._date.getDate()];
    if (dateOrder == 'DM') {
      [firstDate, secondDate] = [this._date.getDate(), this._date.getMonth() + 1];
    }

    return firstDate + dateDelimiter + secondDate;
  }
}
