import { FormEventOptions } from './FormEventOptions';
import { DateParams } from '../DateParams';
import { isJsxOpeningElement, OutputFileType } from '../../node_modules/typescript/lib/typescript';

type WholeScheme = {
  email: EmailScheme,
  output: NameScheme
}

type EmailScheme = {
  dotSeparated: boolean;
  dotSeparatedNumbers: boolean;
  numbersPresent: boolean;
  firstNameFirst: boolean;
  firstNameFull: boolean;
  lastNameFull: boolean;
}

type NameScheme = {
  nameSeparator: string;
  numbersSeparator: Array<string>;
  firstNameFirst: boolean;
  displayNumbers: boolean;
  numbersLast: boolean;
  firstNameFull: boolean;
  lastNameFull: boolean;
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
 *
 * @param {GoogleAppsScript.Events.FormsOnFormSubmit} e the Google form
 *  submission event
 * @return {FormEventGS} the FormEventGS object
 */
export function newFormEvent(e?: GoogleAppsScript.Events.FormsOnFormSubmit): FormEventGS {
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
export function getFormItem(obj: FormEventGS, num: number): GoogleAppsScript.Forms.ItemResponse {
  return obj.getItem(num);
}

/**
 * Gets the response for the item number
 * @param {FormEventGS} obj the FormEvent object
 * @param {number} num the number of the response
 * @return {string | Array<string> | Array<Array<string>>} the item response
 */
export function getFormItemResponse(obj: FormEventGS, num: number): string | string[] | string[][] {
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
export function getFullFormEventDate(obj: FormEventGS, dateParams?: DateParams): string {
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
  private _emailSchemes: Array<WholeScheme>;

  /**
   * Get the values needed for these tools from the form event
   *
   * @param {GoogleAppsScript.Events.FormsOnFormSubmit} e contains the
   *  form event
   */
  constructor(e?: GoogleAppsScript.Events.FormsOnFormSubmit) {
    if (e !== undefined) {
      this._title = e.source.getTitle();
      this._date = e.response.getTimestamp();
      this._email = e.response.getRespondentEmail();
      this._response = e.response;
      this._event = e;
    } 
    this._emailSchemes = [];
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

  setEmail(email: string): FormEventGS {
    this._email = email;
    return this;
  }

  /**
   * Gets the response for the item number
   * @param {number} num the number of the response
   * @return {string | Array<string> | Array<Array<string>>} the item response
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
    if (thisItem == null || thisItem == undefined) {
      throw new Error(
        'Could not find item #' +
          num +
          ' in form item responses having' +
          ' length of ' +
          this.getNumItems() +
          ' in FormEventGS.getItemResponse()',
      );
    }
    return thisItem;
  }

  /**
   * Gets the title for the item number
   * @param {number} num the number of the item
   * @return {string} the item title
   */
  getItemTitle(num: number): string {
    return this.getItem(num)
      .getItem()
      .getTitle();
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

  addEmailScheme(scheme: string, output: string): FormEventGS {
    if (scheme === undefined || output === undefined) {
      throw new Error("Must define both the scheme and the output in addEmailScheme()");
    }

    const numDots = scheme.split(".").length;
    const firstNameFull = scheme.search(/first/i);
    const firstNameAbbr = firstNameFull == -1 ? scheme.search(/f/i) : -1;
    const lastNameFull = scheme.search(/last/i);
    const lastNameAbbr = lastNameFull == -1 ? scheme.search(/l/i) : -1;
    let numbers = scheme.search(/#/);

    const emailScheme = {
      dotSeparated: (numDots > 1) ? true : false,
      firstNameFirst: (firstNameFull * firstNameAbbr) > (lastNameFull * lastNameAbbr) ? true : false,
      dotSeparatedNumbers: (numbers == -1 || numDots < 2) ? false : true,
      firstNameFull: firstNameFull == -1 ? false : true,
      lastNameFull: lastNameFull == -1 ? false : true,
      numbersPresent: numbers == -1 ? false : true
    };

    numbers = output.search(/#/);
    const firstName = output.search(/f/i);
    const lastName = output.search(/l/i);
    const nameSeparatorPresent = output.match(/(?:(first)|(f)|(last)|(l))(.*)(?:(first)|(f)|(last)|(l))/i);
    let numbersSeparatorPresent = numbers == -1 ? null : output.match(/([^flt]*)#([^fl]*)/i) || output.match(/([^flt]*)#/i) || output.match(/#([^fl]*)/i);

    console.log(JSON.stringify(emailScheme));

    this._emailSchemes.push({
      email: emailScheme, 
      output: {
      displayNumbers: numbers == -1 ? false : true,
      firstNameFirst: firstName < lastName,
      nameSeparator: nameSeparatorPresent == null ? "" : nameSeparatorPresent[5],
      numbersLast: (numbers > firstName && numbers > lastName) ? true : false,
      numbersSeparator: numbersSeparatorPresent == null ? [] : numbersSeparatorPresent.slice(1),
      firstNameFull: (output.match(/first/i) == null) ? false : true,
      lastNameFull: (output.match(/last/i) == null) ? false : true
      }
    });

    return this;
  }

  /**
   * Gets the first and last name from the email address
   * @return {[string, string]} the first and last name
   */
  getNameFromEmail(): string {
    if (this._email == null || this._email == undefined) {
      throw new Error('Email not found on form response in FormEventGS.getNameFromEmail()');
    }
    let emailFirst: string = this._email.split('@')[0];

    let numbers = emailFirst.match(/([0-9]+)/);
    let dotParts = emailFirst.split(".");

    for (let wholeScheme of this._emailSchemes) {
      const scheme: EmailScheme = wholeScheme.email;
      console.log("input: " + JSON.stringify(scheme));
      if ((scheme.numbersPresent != (numbers == null)) && ((dotParts.length > 1) == scheme.dotSeparated)) {
        const outputScheme = wholeScheme.output;
        console.log("output: " + JSON.stringify(outputScheme));
        let output = "";
        if (outputScheme.displayNumbers) {
          if (outputScheme.numbersSeparator.length > 0) {
            output += outputScheme.numbersSeparator[0];
          }
          if (numbers != null) {
            output += numbers[0];
          }
          if (outputScheme.numbersSeparator.length > 1) {
            output += outputScheme.numbersSeparator[1];
          }
        }
        let firstAndLast = "";
        if (scheme.dotSeparated) {
          const order = (scheme.firstNameFirst == outputScheme.firstNameFirst) ? [0, 1] : [1, 0];

          if (numbers != null) {
            if (dotParts[0] == numbers[0]) {
              order[0]++;
              order[1]++;
            }
          }

          if (!outputScheme.firstNameFull) {
            dotParts[order[scheme.firstNameFirst ? 0 : 1]] = dotParts[order[scheme.firstNameFirst ? 0 : 1]].charAt(0);
          }

          if (!outputScheme.lastNameFull) {
            dotParts[order[scheme.firstNameFirst ? 1 : 0]] = dotParts[order[scheme.firstNameFirst ? 1 : 0]].charAt(0);
          }

          const first = dotParts[order[0]].charAt(0).toUpperCase() + ((dotParts[order[0]].length > 1) ? dotParts[order[0]].slice(1) : "");
          const last = dotParts[order[1]].charAt(0).toUpperCase() + ((dotParts[order[1]].length > 1) ? dotParts[order[1]].slice(1) : "");
            
          firstAndLast = [first, last].join(outputScheme.nameSeparator);
        } else {
          let unseparated = emailFirst;
          if (numbers != null) {
            const match = emailFirst.match(/(.*)[0-9]+/) || emailFirst.match(/[0-9]+(.*)/);
            if (match != null) {
              unseparated = match[1];
            }
          }

          let first = "", last = "";
          if (scheme.firstNameFull && scheme.lastNameFull) {
            first = unseparated;
          } else if (scheme.firstNameFull) {
            if (scheme.firstNameFirst) {
              last = unseparated.substring(unseparated.length - 2, unseparated.length - 1);
              first = unseparated.substring(0, unseparated.length - 2);
            } else {
              last = unseparated.substring(0, 1);
              first = unseparated.substring(1, unseparated.length - 1);
            }
          } else if (scheme.lastNameFull) {
            if (scheme.firstNameFirst) {
              last = unseparated.substring(1, unseparated.length - 1);
              first = unseparated.substring(0, 1);
            } else {
              last = unseparated.substring(0, unseparated.length - 2);
              first = unseparated.substring(unseparated.length - 2, unseparated.length - 1);
            }
          } else {
            if (scheme.firstNameFirst) {
              last = unseparated.substring(1, 2);
              first = unseparated.substring(0, 1);
            } else {
              last = unseparated.substring(0, 1);
              first = unseparated.substring(1, 2);
            }
          }

          console.log("Capitalizing " + first.charAt(0) + " and " + first.slice(1));
          first = first.charAt(0).toUpperCase() + ((first.length > 1) ? first.slice(1) : "");
          last = last.charAt(0).toUpperCase() + ((last.length > 1) ? last.slice(1) : "");

          if (outputScheme.firstNameFirst) {
            firstAndLast = [first, last].join(outputScheme.nameSeparator);
          } else {
            firstAndLast = [last, first].join(outputScheme.nameSeparator);
          }
        }
        if (outputScheme.numbersLast) {
          output = firstAndLast + output;
        } else {
          output += firstAndLast;
        }
      return output;
      }
    }
    return emailFirst;
  }

  /**
   * Prints the full date from a list of optional arguments
   *
   * @param {DateParams} dateParams the options for the form event
   * @return {string} the full date
   */
  getFullDate(dateParams?: DateParams): string {
    if (dateParams == null) dateParams = {} as DateParams;
    const { dateOrder = 'MD', dateDelim = '/' } = dateParams;

    let [firstDate, secondDate] = [this._date.getMonth() + 1, this._date.getDate()];
    if (dateOrder == 'DM') {
      [firstDate, secondDate] = [this._date.getDate(), this._date.getMonth() + 1];
    }

    return firstDate + dateDelim + secondDate;
  }
}
