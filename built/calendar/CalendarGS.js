import { CalendarEventGS } from './CalendarEventGS';
import { Utilities } from '../utils/Utilities';
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
export function newCalendar(id, timezoneOffset = -5) {
    return new CalendarGS(id, timezoneOffset);
}
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
export function getCalendarObject(obj) {
    return obj.getObject();
}
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
export function getCalendarId(obj) {
    return obj.getId();
}
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
export function getUpcomingDueDates(obj, daysToLookAhead, eventOptions, timezoneOffset = -5) {
    return obj.getUpcomingDueDates(daysToLookAhead, eventOptions);
}
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
export function getUpcomingDueDatesList(obj, daysToLookAhead, eventOptions, timezoneOffset = -5) {
    return obj.getUpcomingDueDatesList(daysToLookAhead, eventOptions);
}
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
export function getUpcomingEvents(obj, daysToLookAhead, timezoneOffset) {
    return obj.getUpcomingEvents(daysToLookAhead);
}
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
export class CalendarGS {
    /**
     * ```javascript
     * var gseCalendar = new gseTools.CalendarGS(calendarId);
     * ```
     * @param {string} id the id for this Google Calendar
     * @param {number} timezoneOffset specify how many hours off of UTC you
     *  want to display
     */
    constructor(id, timezoneOffset = -5) {
        this._oneDay = 24 * 60 * 60 * 1000;
        this._endDate = new Date();
        this._upcomingEventObjects = [];
        this._id = id;
        this._timezoneOffset = timezoneOffset;
        const utils = new Utilities();
        this._dateToday = utils.getTodaysDate(this._timezoneOffset);
        this._calendar = CalendarApp.getCalendarById(id);
        if (this._calendar == null) {
            throw new Error('Could not find Calendar ' + 'with id ' + id + ' in CalendarGS()');
        }
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     * ```javascript
     * var googleCalendar = gseCalendar.getObject();
     * ```
     *
     * @return {GoogleAppsScript.Calendar.Calendar} the Google Calendar object
     */
    getObject() {
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
    getUpcomingEvents(daysToLookAhead) {
        const utils = new Utilities();
        this._endDate = utils.getTodaysDate(this._timezoneOffset);
        this._endDate.setMilliseconds(this._dateToday.getMilliseconds() + daysToLookAhead * this._oneDay);
        this._upcomingEventObjects = [];
        for (const event of this._calendar.getEvents(this._dateToday, this._endDate)) {
            this._upcomingEventObjects.push(new CalendarEventGS(event));
        }
        return this._upcomingEventObjects;
    }
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
    getUpcomingDueDates(daysToLookAhead, eventOptions) {
        let dueDates = '';
        for (const event of this.getUpcomingEvents(daysToLookAhead)) {
            if (dueDates != '')
                dueDates += '\n';
            dueDates += '\t' + event.getDate(eventOptions);
        }
        if (dueDates == '')
            return '\t' + eventOptions.noEventString;
        return dueDates;
    }
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
    getUpcomingDueDatesList(daysToLookAhead, eventOptions) {
        const dueDates = [];
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
    getId() {
        return this._id;
    }
}
