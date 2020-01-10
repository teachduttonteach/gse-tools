import { DateParams } from './DateParams';

export function getCalendarEventObject(obj: CalendarEventGS): GoogleAppsScript.Calendar.CalendarEvent {
  return obj.getObject();
}

export function getCalendarEventDate(
  obj: CalendarEventGS,
  firstParam?: string | DateParams,
  titlePrefix?: string,
  dateDelim?: string,
): string {
  return obj.getDate(firstParam, titlePrefix, dateDelim);
}

/**
 * Gets the data from a Calendar Event and provides an interface to it in an
 *  efficient way.
 *
 * ```javascript
 * var upcomingEvents = gseCalendar.getUpcomingEvents(10);
 * var gseCalendarEvent = new CalendarEventGS(upcomingEvents[0]);
 * var eventDate = gseCalendarEvent.getDate();
 * ```
 */
export class CalendarEventGS {
  private _date: number;
  private _month: number;
  private _title: string;
  private _event: GoogleAppsScript.Calendar.CalendarEvent;

  /**
   *
   * @param {GoogleAppsScript.Calendar.CalendarEvent} event the calendar event from Google Calendar
   */
  constructor(event: GoogleAppsScript.Calendar.CalendarEvent) {
    const startTime = event.getStartTime();
    this._date = startTime.getUTCDate();
    this._month = startTime.getUTCMonth() + 1;
    this._title = event.getTitle();
    this._event = event;
  }

  /**
   * Gets the underlying Google Apps Script object for direct access
   *
   * @return {GoogleAppsScript.Calendar.CalendarEvent} the Event object
   */
  getObject(): GoogleAppsScript.Calendar.CalendarEvent {
    return this._event;
  }

  /**
   * Displays the date of a calendar event
   *
   * ```javascript
   * var eventDateInMDOrder = gseCalendarEvent.getDate("MD", "Title: ", "/");
   *
   * var eventDateInDMOrder = gseCalendarEvent.getDate("DM", "START ", "-");
   *
   * var eventObject = {
   *  order: "MD",
   *  titlePrefix: "Title: ",
   *  dateDelim: "/"
   * }
   * var eventDate = gseCalendarEvent.getDate(eventObject);
   *
   * var eventDateWithDefaults = gseCalendarEvent.getDate();
   * ```
   *
   * @param {string | DateParams} firstParam the order to display the month
   *  and day; can be "MD" or "DM" *OR* this first parameter can be a
   *  DateParams object with dateOrder as one of the parameters
   * @param {string} titlePrefix the text to display before the title of the
   *  event; defaults to "Title: " (can also be in DateParams)
   * @param {string} dateDelim the delimiter for the date, defaults to "/"
   *
   * @return {string} the string containing the date
   */
  public getDate(firstParam?: string | DateParams, titlePrefix?: string, dateDelim?: string): string {
    // Get values out of array
    let dateOrder: string = 'DM';
    if (typeof firstParam === 'object') {
      if (titlePrefix == undefined) titlePrefix = firstParam.titlePrefix;
      if (dateDelim == undefined) dateDelim = firstParam.dateDelim;
      if (firstParam.dateOrder != undefined) dateOrder = firstParam.dateOrder;
    } else if (typeof firstParam === 'string') {
      dateOrder = firstParam;
    }

    // Set default values
    if (titlePrefix == undefined) titlePrefix = ' ';
    if (dateDelim == undefined) dateDelim = '/';
    if (dateOrder == undefined) dateOrder = 'MD';

    // Create and return the date
    const dateString: string = titlePrefix + this._title;
    if (dateOrder == 'MD') {
      return this._month + dateDelim + this._date + dateString;
    } else {
      return this._date + dateDelim + this._month + dateString;
    }
  }
}
