/// <reference types="google-apps-script" />
import { DateParams } from './DateParams';
/**
 * Get the underlying object
 *
 * @param {CalendarEventGS} obj the CalendarEvent object
 * @return {GoogleAppsScript.Calendar.CalendarEvent} the object
 */
export declare function getCalendarEventObject(obj: CalendarEventGS): GoogleAppsScript.Calendar.CalendarEvent;
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
export declare function getCalendarEventDate(obj: CalendarEventGS, firstParam?: string | DateParams, titlePrefix?: string, dateDelim?: string): string;
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
export declare class CalendarEventGS {
    private _date;
    private _month;
    private _title;
    private _event;
    /**
     *
     * @param {GoogleAppsScript.Calendar.CalendarEvent} event the calendar
     *  event from Google Calendar
     * @param {number} timezoneOffset the timezone, default is -5 (EST)
     */
    constructor(event: GoogleAppsScript.Calendar.CalendarEvent, timezoneOffset?: number);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Calendar.CalendarEvent} the Event object
     */
    getObject(): GoogleAppsScript.Calendar.CalendarEvent;
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
    getDate(firstParam?: string | DateParams, titlePrefix?: string, dateDelim?: string): string;
}
