/// <reference types="google-apps-script" />
/**
 * Type to hold the parameters to print out the date for the calendar event
 *
 */
export declare type DateParams = {
    /**
     * what to print out before the title of the event
     */
    titlePrefix?: string;
    /**
     * the delimiter between sections of the date
     */
    dateDelim?: string;
    /**
     * the order to display the date in
     */
    dateOrder?: string;
    /**
     * what to print if there is no event for this day
     */
    noEventString?: string;
};
/**
 * Gets the data from a Google Sheet and provides an interface to it in an efficient way.
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
     * @param event the calendar event from Google Calendar
     */
    constructor(event: GoogleAppsScript.Calendar.CalendarEvent);
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Calendar.CalendarEvent} the Event object
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
     * @param order the order to display the month and day; can be "MD" or "DM"
     * @param {string} titlePrefix the text to display before the title of the event; defaults to "Title: "
     * @param {string} dateDelim the delimiter for the date, defaults to "/"
     *
     * @returns {string} the string containing the date
     */
    getDate(firstParam?: string | DateParams, titlePrefix?: string, dateDelim?: string): string;
}
