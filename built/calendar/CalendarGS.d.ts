/// <reference types="google-apps-script" />
import { CalendarEventGS } from './CalendarEventGS';
import { DateParams } from '../DateParams';
/**
 * Class to hold properties and methods to manipulate the Google Calendar
 *
 * ```javascript
 * var enrollmentCode = '1234qz';
 *
 * var gseClassroom = gsetools.newClassroom();
 * var gseClass = gsetools.getGoogleClass(gseClassroom, enrollmentCode);
 * var calendarId = gsetools.getCalendarId(gseClass);
 *
 * var gseCalendar = gsetools.newCalendar(calendarId);
 * var upcomingEvents = gsetools.getUpcomingEvents(gseCalendar, 10);
 *
 * var eventOptions = {
 *  dateDelim: '/',
 *  dateOrder: 'MD',
 *  noEventString: 'NONE',
 *  titlePrefix: ' : '
 * };
 * var upcomingDueDatesArray =
 *  gsetools.getUpcomingDueDatesList(gseCalendar, 14, eventOptions);
 * var upcomingDueDatesString =
 *  gsetools.getUpcomingDueDates(gseCalendar, 14, eventOptions);
 *
 * var calendarId = gsetools.getId(gseCalendar);
 * ```
 *
 * @param {string} id the ID of the calendar
 * @param {number} timezoneOffset the timezone offset for the user,
 *  default is -5
 * @return {CalendarGS} the Calendar object
 */
export declare function newCalendar(id: string, timezoneOffset?: number): CalendarGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 * ```javascript
 * var gseCalendar = gsetools.newCalendar(calendarId);
 * var googleCalendar = gsetools.getCalendarObject(gseCalendar);
 * ```
 *
 * @param {CalendarGS} obj the calendar object
 * @return {GoogleAppsScript.Calendar.Calendar} the Google Calendar object
 */
export declare function getCalendarObject(obj: CalendarGS): GoogleAppsScript.Calendar.Calendar;
/**
 * Get the id of the Google Calendar
 *
 * ```javascript
 * var enrollmentCode = '1234qz';
 *
 * var gseClassroom = gsetools.newClassroom();
 * var gseClass = gsetools.getGoogleClass(gseClassroom, enrollmentCode);
 * var calendarId = gsetools.getCalendarId(gseClass);
 *
 * var gseCalendar = gsetools.newCalendar(calendarId);
 * ```
 *
 * @param {CalendarGS} obj the calendar object
 * @return {string} the id of this Google Calendar
 */
export declare function getCalendarId(obj: CalendarGS): string;
/**
 * Gets the upcoming due dates for events on the calendar
 * ```javascript
 * var gseCalendar = gsetools.newCalendar(calendarId);
 * var upcomingEvents = gsetools.getUpcomingEvents(gseCalendar, 10);
 *
 * var eventOptions = {
 *  dateDelim: '/',
 *  dateOrder: 'MD',
 *  noEventString: 'NONE',
 *  titlePrefix: ' : '
 * };
 * var upcomingDueDatesArray =
 *  gsetools.getUpcomingDueDates(gseCalendar, 14, eventOptions);
 * ```
 *
 * @param {CalendarGS} obj the calendar object
 * @param {number} daysToLookAhead the number of days ahead to find
 * events on the calendar
 * @param {DateParams} eventOptions options for displaying that there are
 *  no events and how to display the date; see above for defaults
 * @param {number} timezoneOffset the timezone
 * @return {string} the list of due dates as a string for use in Slides
 */
export declare function getUpcomingDueDates(obj: CalendarGS, daysToLookAhead: number, eventOptions: DateParams, timezoneOffset?: number): string;
/**
 * Gets the upcoming due dates for events on the calendar as an array
 * ```javascript
 * var gseCalendar = gsetools.newCalendar(calendarId);
 * var upcomingEvents = gsetools.getUpcomingEvents(gseCalendar, 10);
 *
 * var eventOptions = {
 *  dateDelim: '/',
 *  dateOrder: 'MD',
 *  noEventString: 'NONE',
 *  titlePrefix: ' : '
 * };
 * var upcomingDueDatesArray =
 *  gsetools.getUpcomingDueDatesList(gseCalendar, 14, eventOptions);
 * ```
 *
 * @param {CalendarGS} obj the calendar object
 * @param {number} daysToLookAhead the number of days ahead to find events
 *  on the calendar
 * @param {DateParams} eventOptions options for displaying that there are
 *  no events and how to display the date; see above for defaults
 * @param {number} timezoneOffset the timezone
 * @return {Array<string>} the list of due dates as an array
 */
export declare function getUpcomingDueDatesList(obj: CalendarGS, daysToLookAhead: number, eventOptions: DateParams, timezoneOffset?: number): string[];
/**
 * Gets the upcoming events on the calendar
 * ```javascript
 * var enrollmentCode = '1234qz';
 *
 * var gseClassroom = gsetools.newClassroom();
 * var gseClass = gsetools.getGoogleClass(gseClassroom, enrollmentCode);
 * var calendarId = gsetools.getCalendarId(gseClass);
 *
 * var gseCalendar = gsetools.newCalendar(calendarId);
 * var upcomingEvents = gsetools.getUpcomingEvents(gseCalendar, 10);
 * ```
 *
 * @param {CalendarGS} obj the calendar object
 * @param {number} daysToLookAhead the number of days ahead to find
 *  events on the calendar
 * @param {number} timezoneOffset the timezone
 *
 * @return {Array<CalendarEventGS>} the list of calendar events
 */
export declare function getUpcomingEvents(obj: CalendarGS, daysToLookAhead: number, timezoneOffset: number): CalendarEventGS[];
/**
 * Class to hold properties and methods to manipulate the Google Calendar
 *
 * ```javascript
 * // Need to active Classroom in Advanced Services
 * var gseClassroom = new gsetools.ClassroomGS();
 *
 * var gseClass = gseClassroom.getClass(enrollmentCode);
 * var calendarId = gseClass.getCalendarId();
 *
 * var gseCalendar = new gsetools.CalendarGS(calendarId);
 * var upcomingEvents = gseCalendar.getUpcomingEvents(10);
 *
 * var eventOptions = {
 *  dateDelim: '/',
 *  dateOrder: 'MD',
 *  noEventString: 'NONE',
 *  titlePrefix: ' : '
 * };
 * var upcomingDueDatesArray =
 *  gseCalendar.getUpcomingDueDatesList(14, eventOptions);
 * var upcomingDueDatesString =
 *  gseCalendar.getUpcomingDueDates(14, eventOptions);
 *
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
    private _timezoneOffset;
    /**
     * ```javascript
     * var gseCalendar = new gseTools.CalendarGS(calendarId);
     * ```
     * @param {string} id the id for this Google Calendar
     * @param {number} timezoneOffset specify how many hours off of UTC you
     *  want to display
     */
    constructor(id: string, timezoneOffset?: number);
    /**
     * Gets the underlying Google Apps Script object for direct access
     * ```javascript
     * var googleCalendar = gseCalendar.getObject();
     * ```
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
     * Gets the upcoming due dates for events on the calendar as a string
     * ```javascript
     * var eventOptions = {
     *  dateDelim: '/',
     *  dateOrder: 'MD',
     *  noEventString: 'NONE',
     *  titlePrefix: ' : '
     * };
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
     * Gets the upcoming due dates for events on the calendar as an array
     * ```javascript
     * var eventOptions = {
     *  dateDelim: '/',
     *  dateOrder: 'MD',
     *  noEventString: 'NONE',
     *  titlePrefix: ' : '
     * };
     * var dueDatesList = gseCalendar.getUpcomingDueDates(10, eventOptions);
     * ```
     *
     * @param {number} daysToLookAhead the number of days ahead to find events
     *  on the calendar
     * @param {DateParams} eventOptions options for displaying that there are
     *  no events and how to display the date; see above for defaults
     * @return {Array<string>} the list of due dates as an array
     */
    getUpcomingDueDatesList(daysToLookAhead: number, eventOptions: DateParams): Array<string>;
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
