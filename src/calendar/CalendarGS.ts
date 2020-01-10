import { CalendarEventGS } from './CalendarEventGS';
import { DateParams } from './DateParams';

export function newCalendar(id: string, hoursFromUTC: number): CalendarGS {
  return new CalendarGS(id, hoursFromUTC);
}

/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {CalendarGS} obj the calendar object
 * @return {GoogleAppsScript.Calendar.Calendar} the Google Calendar object
 */
export function getCalendarObject(obj: CalendarGS): GoogleAppsScript.Calendar.Calendar {
  return obj.getObject();
}

/**
 * Get the id of the Google Calendar
 *
 * ```javascript
 * var calendarId = gseCalendar.getId();
 * ```
 *
 * @param {CalendarGS} obj the calendar object
 * @return {string} the id of this Google Calendar
 */
export function getCalendarId(obj: CalendarGS): string {
  return obj.getId();
}

/**
 * Gets the upcoming due dates for events on the calendar
 * ```javascript
 * var eventOptions = {
 *  "noEventString": "None",
 *  "order": "MD",
 *  "titlePrefix": "Title: ",
 *  "dateDelim": "/"
 * }
 * var dueDates = getCalendarUpcomingDueDates(calendar, 10, eventOptions);
 * ```
 *
 * @param {CalendarGS} obj the calendar object
 * @param {number} daysToLookAhead the number of days ahead to find
 * events on the calendar
 * @param {DateParams} eventOptions options for displaying that there are
 *  no events and how to display the date; see above for defaults
 *
 * @return {string} the list of due dates as a string for use in Slides
 */

export function getCalendarUpcomingDueDates(
  obj: CalendarGS,
  daysToLookAhead: number,
  eventOptions: DateParams,
): string {
  return obj.getUpcomingDueDates(daysToLookAhead, eventOptions);
}

/**
 * Gets the upcoming due dates for events on the calendar
 * ```javascript
 * var eventOptions = {
 *  "noEventString": "None",
 *  "order": "MD",
 *  "titlePrefix": "Title: ",
 *  "dateDelim": "/"
 * }
 * var dueDatesList = getCalendarUpcomingDueDates(calendar, 10, eventOptions);
 * ```
 *
 * @param {CalendarGS} obj the calendar object
 * @param {number} daysToLookAhead the number of days ahead to find events
 *  on the calendar
 * @param {DateParams} eventOptions options for displaying that there are
 *  no events and how to display the date; see above for defaults
 * @param {string} noEventString the string to display if there is no event
 * @return {Array<string>} the list of due dates as an array
 */
export function getCalendarUpcomingDueDatesList(
  obj: CalendarGS,
  daysToLookAhead: number,
  eventOptions: DateParams,
  noEventString?: string,
): string[] {
  return obj.getUpcomingDueDatesList(daysToLookAhead, eventOptions, noEventString);
}

/**
 * Gets the upcoming events on the calendar
 * ```javascript
 * var upcomingEvents = getCalendarUpcomingEvents(calendar, 10);
 * ```
 *
 * @param {CalendarGS} obj the calendar object
 * @param {number} daysToLookAhead the number of days ahead to find
 *  events on the calendar
 *
 * @return {Array<CalendarEventGS>} the list of calendar events
 */
export function getCalendarUpcomingEvents(obj: CalendarGS, daysToLookAhead: number): CalendarEventGS[] {
  return obj.getUpcomingEvents(daysToLookAhead);
}

/**
 * Class to hold properties and methods to manipulate the Google Calendar
 *
 * ```javascript
 * var gseClass = gseClassroom.getClass(enrollmentCode);
 * var calendarId = gseClass.getCalendarId();
 *
 * var gseCalendar = new gseTools.CalendarGS(calendarId);
 * var upcomingEvents = gseCalendar.getUpcomingEvents(10);
 * var calendarId = gseCalendar.getId();
 * ```
 *
 */
export class CalendarGS {
  private _oneDay: number = 24 * 60 * 60 * 1000;
  private _dateToday: Date;
  private _endDate: Date;
  private _upcomingEventObjects: Array<CalendarEventGS>;
  private _id: string;
  private _calendar: GoogleAppsScript.Calendar.Calendar;

  /**
   * ```javascript
   * var gseCalendar = new gseTools.CalendarGS(calendarId);
   * ```
   * @param {string} id the id for this Google Calendar
   * @param {number} hoursFromUTC specify how many hours off of UTC you
   *  want to display
   */
  constructor(id: string, hoursFromUTC: number = 0) {
    const dateInComputersTimeZone = new Date();
    this._endDate = new Date();
    this._upcomingEventObjects = [];
    this._id = id;

    const minutesOffset = dateInComputersTimeZone.getTimezoneOffset();
    const minutesFromUTC = hoursFromUTC * 60;
    const millisecondAdjustment = (minutesFromUTC - minutesOffset) * 60 * 1000;
    this._dateToday = new Date();
    this._dateToday.setTime(dateInComputersTimeZone.getTime() - millisecondAdjustment);

    this._calendar = CalendarApp.getCalendarById(id);
    if (this._calendar == null) {
      throw new Error('Could not find Calendar ' + 'with id ' + id + ' in CalendarGS()');
    }
  }

  /**
   * Gets the underlying Google Apps Script object for direct access
   *
   * @return {GoogleAppsScript.Calendar.Calendar} the Google Calendar object
   */
  getObject(): GoogleAppsScript.Calendar.Calendar {
    return this._calendar;
  }

  /**
   * Gets the upcoming events on the calendar
   * ```javascript
   * var upcomingEvents = gseCalendar.getUpcomingEvents(10);
   * ```
   *
   * @param {number} daysToLookAhead the number of days ahead to find
   *  events on the calendar
   *
   * @return {Array<CalendarEventGS>} the list of calendar events
   */
  getUpcomingEvents(daysToLookAhead: number): Array<CalendarEventGS> {
    this._endDate = new Date();
    this._endDate.setMilliseconds(this._dateToday.getMilliseconds() + daysToLookAhead * this._oneDay);
    this._upcomingEventObjects = [];
    for (const event of this._calendar.getEvents(this._dateToday, this._endDate)) {
      this._upcomingEventObjects.push(new CalendarEventGS(event));
    }
    return this._upcomingEventObjects;
  }

  /**
   * Gets the upcoming due dates for events on the calendar
   * ```javascript
   * var eventOptions = {
   *  "noEventString": "None",
   *  "order": "MD",
   *  "titlePrefix": "Title: ",
   *  "dateDelim": "/"
   * }
   * var dueDates = gseCalendar.getUpcomingDueDates(10, eventOptions);
   * ```
   *
   * @param {number} daysToLookAhead the number of days ahead to find
   * events on the calendar
   * @param {DateParams} eventOptions options for displaying that there are
   *  no events and how to display the date; see above for defaults
   *
   * @return {string} the list of due dates as a string for use in Slides
   */
  getUpcomingDueDates(daysToLookAhead: number, eventOptions: DateParams): string {
    let dueDates: string = '';
    for (const event of this.getUpcomingEvents(daysToLookAhead)) {
      if (dueDates != '') dueDates += '\n';
      dueDates += '\t' + event.getDate(eventOptions);
    }
    if (dueDates == '') return '\t' + eventOptions.noEventString;
    return dueDates;
  }

  /**
   * Gets the upcoming due dates for events on the calendar
   * ```javascript
   * var eventOptions = {
   *  "noEventString": "None",
   *  "order": "MD",
   *  "titlePrefix": "Title: ",
   *  "dateDelim": "/"
   * }
   * var dueDatesList = gseCalendar.getUpcomingDueDates(10, eventOptions);
   * ```
   *
   * @param {number} daysToLookAhead the number of days ahead to find events
   *  on the calendar
   * @param {DateParams} eventOptions options for displaying that there are
   *  no events and how to display the date; see above for defaults
   * @param {string} noEventString the string to display if there is no event
   * @return {Array<string>} the list of due dates as an array
   */
  getUpcomingDueDatesList(
    daysToLookAhead: number,
    eventOptions: DateParams,
    noEventString: string = 'None',
  ): Array<string> {
    const dueDates: Array<string> = [];
    for (const event of this.getUpcomingEvents(daysToLookAhead)) {
      dueDates.push(event.getDate(eventOptions));
    }
    return dueDates;
  }

  /**
   * Get the id of the Google Calendar
   *
   * ```javascript
   * var calendarId = gseCalendar.getId();
   * ```
   *
   * @return {string} the id of this Google Calendar
   */
  getId(): string {
    return this._id;
  }
}
