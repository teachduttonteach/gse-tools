/// <reference types="google-apps-script" />
import { CalendarEventGS, DateParams } from "./CalendarEventGS";
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
     * @param id the id for this Google Calendar
     */
    constructor(id: string);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Calendar.Calendar} the Calendar object
     */
    getObject(): GoogleAppsScript.Calendar.Calendar;
    /**
     * Gets the upcoming events on the calendar
     * ```javascript
     * var upcomingEvents = gseCalendar.getUpcomingEvents(10);
     * ```
     *
     * @param daysToLookAhead the number of days ahead to find events on the calendar
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
     * @param daysToLookAhead the number of days ahead to find events on the calendar
     * @param {DateParams} eventOptions options for displaying that there are no events and how to display the date; see above for defaults
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
     * @param daysToLookAhead the number of days ahead to find events on the calendar
     * @param {DateParams} eventOptions options for displaying that there are no events and how to display the date; see above for defaults
     *
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
     * @returns {string} the id of this Google Calendar
     */
    getId(): string;
}
