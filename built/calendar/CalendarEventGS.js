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
export function getCalendarEventDate(obj, firstParam, titlePrefix, dateDelim) {
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
    /**
     *
     * @param {GoogleAppsScript.Calendar.CalendarEvent} event the calendar
     *  event from Google Calendar
     * @param {number} timezoneOffset the timezone, default is -5 (EST)
     */
    constructor(event, timezoneOffset = -5) {
        const startTime = event.getStartTime();
        Logger.log(startTime);
        startTime.setUTCHours(startTime.getUTCHours() + timezoneOffset);
        Logger.log(startTime);
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
    getDate(firstParam, titlePrefix, dateDelim) {
        // Get values out of array
        let dateOrder = 'DM';
        if (typeof firstParam === 'object') {
            if (titlePrefix == undefined)
                titlePrefix = firstParam.titlePrefix;
            if (dateDelim == undefined)
                dateDelim = firstParam.dateDelim;
            if (firstParam.dateOrder != undefined)
                dateOrder = firstParam.dateOrder;
        }
        else if (typeof firstParam === 'string') {
            dateOrder = firstParam;
        }
        // Set default values
        if (titlePrefix == undefined)
            titlePrefix = ' ';
        if (dateDelim == undefined)
            dateDelim = '/';
        if (dateOrder == undefined)
            dateOrder = 'MD';
        // Create and return the date
        const dateString = titlePrefix + this._title;
        if (dateOrder == 'MD') {
            return this._month + dateDelim + this._date + dateString;
        }
        else {
            return this._date + dateDelim + this._month + dateString;
        }
    }
}
