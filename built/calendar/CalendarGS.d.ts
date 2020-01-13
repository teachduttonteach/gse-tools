/// <reference types="google-apps-script" />
import { CalendarEventGS } from './CalendarEventGS';
import { DateParams } from './DateParams';
export declare function newCalendar(id: string, hoursFromUTC: number): CalendarGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {CalendarGS} obj the calendar object
 * @return {GoogleAppsScript.Calendar.Calendar} the Google Calendar object
 */
export declare function getCalendarObject(obj: CalendarGS): GoogleAppsScript.Calendar.Calendar;
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
export declare function getCalendarId(obj: CalendarGS): string;
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
export declare function getUpcomingDueDates(obj: CalendarGS, daysToLookAhead: number, eventOptions: DateParams): string;
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
export declare function getUpcomingDueDatesList(obj: CalendarGS, daysToLookAhead: number, eventOptions: DateParams, noEventString?: string): string[];
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
export declare function getUpcomingEvents(obj: CalendarGS, daysToLookAhead: number): CalendarEventGS[];
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
export declare class CalendarGS {
    private _oneDay;
    private _dateToday;
    private _endDate;
    private _upcomingEventObjects;
    private _id;
    private _calendar;
    /**
     * ```javascript
     * var gseCalendar = new gseTools.CalendarGS(calendarId);
     * ```
     * @param {string} id the id for this Google Calendar
     * @param {number} hoursFromUTC specify how many hours off of UTC you
     *  want to display
     */
    constructor(id: string, hoursFromUTC?: number);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {GoogleAppsScript.Calendar.Calendar} the Google Calendar object
     */
    getObject(): GoogleAppsScript.Calendar.Calendar;
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
    getUpcomingEvents(daysToLookAhead: number): Array<CalendarEventGS>;
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
    getUpcomingDueDates(daysToLookAhead: number, eventOptions: DateParams): string;
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
    getUpcomingDueDatesList(daysToLookAhead: number, eventOptions: DateParams, noEventString?: string): Array<string>;
    /**
     * Get the id of the Google Calendar
     *
     * ```javascript
     * var calendarId = gseCalendar.getId();
     * ```
     *
     * @return {string} the id of this Google Calendar
     */
    getId(): string;
}
