import { DateUtilities } from '../DateParams';
/**
 * Get the underlying object
 *
 * @param {CalendarEventGS} obj the CalendarEvent object
 * @return {GoogleAppsScript.Calendar.CalendarEvent} the object
 */
export function getCalendarEventObject(obj) {
    return obj.getObject();
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
 * @param {CalendarEventGS} obj the CalendarEvent object
 * @param {string | DateParams} firstParam the order to display the month
 *  and day; can be "MD" or "DM" *OR* this first parameter can be a
 *  DateParams object with dateOrder as one of the parameters
 * @param {string} titlePrefix the text to display before the title of the
 *  event; defaults to "Title: " (can also be in DateParams)
 * @param {string} dateDelim the delimiter for the date, defaults to "/"
 *
 * @return {string} the string containing the date
 */
export function getCalendarEventDate(obj, dateParams) {
    return obj.getDate(dateParams);
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
    /**
     *
     * @param {GoogleAppsScript.Calendar.CalendarEvent} event the calendar
     *  event from Google Calendar
     * @param {number} timezoneOffset the timezone, default is -5 (EST)
     */
    constructor(event, timezoneOffset = -5) {
        const startTime = event.getStartTime();
        startTime.setUTCHours(startTime.getUTCHours() + timezoneOffset);
        this._date = startTime.getUTCDate();
        this._month = startTime.getUTCMonth() + 1;
        this._year = startTime.getUTCFullYear();
        this._title = event.getTitle();
        this._event = event;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Calendar.CalendarEvent} the Event object
     */
    getObject() {
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
    getDate(dateParams = {}) {
        const dateUtilitiesInterface = new DateUtilities();
        return dateUtilitiesInterface.formatTodaysDate(dateParams, new Date(this._year, this._month, this._date));
    }
}
