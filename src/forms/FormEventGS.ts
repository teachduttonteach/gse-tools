import {FormEventOptions} from './FormEventOptions';

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
        suffixDelimiter = '\n',
        suffixResponseNumber = 0,
        suffixType = 'T',
      } = options;

      let [firstDate, secondDate] = [this._date.getMonth() + 1,
        this._date.getDate()];
      if (dateOrder == 'DM') {
        [firstDate, secondDate] =
        [this._date.getDate(), this._date.getMonth() + 1];
      }

      const suffixBuilder =
        this._response.getItemResponses()[suffixResponseNumber];
      let suffix: string = '';

      // Can account for other types here
      if (suffixType.toUpperCase().startsWith('T')) {
        suffix =
        suffixBuilder.getItem().getTitle();
      }
      return firstDate + dateDelimiter + secondDate + suffixDelimiter + suffix;
    }
}
