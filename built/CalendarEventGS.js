/**
 * Gets the data from a Google Sheet and provides an interface to it in an efficient way.
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
     * @param event the calendar event from Google Calendar
     */
    constructor(event) {
        let t_endTime = event.getEndTime();
        t_endTime.setUTCDate(t_endTime.getUTCDate() - 1);
        t_endTime.setMilliseconds(t_endTime.getMilliseconds() - 1);
        this._date = t_endTime.getDate();
        this._month = t_endTime.getMonth() + 1;
        this._title = event.getTitle();
        this._event = event;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Calendar.CalendarEvent} the Event object
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
     * @param order the order to display the month and day; can be "MD" or "DM"
     * @param {string} titlePrefix the text to display before the title of the event; defaults to "Title: "
     * @param {string} dateDelim the delimiter for the date, defaults to "/"
     *
     * @returns {string} the string containing the date
     */
    getDate(firstParam, titlePrefix, dateDelim) {
        // Get values out of array
        let dateOrder = "DM";
        if (typeof firstParam === "object") {
            if (titlePrefix == undefined)
                titlePrefix = firstParam.titlePrefix;
            if (dateDelim == undefined)
                dateDelim = firstParam.dateDelim;
            if (firstParam.dateOrder != undefined)
                dateOrder = firstParam.dateOrder;
        }
        else if (typeof firstParam === "string") {
            dateOrder = firstParam;
        }
        // Set default values
        if (titlePrefix == undefined)
            titlePrefix = " ";
        if (dateDelim == undefined)
            dateDelim = "/";
        if (dateOrder == undefined)
            dateOrder = "MD";
        // Create and return the date
        let dateString = titlePrefix + this._title;
        if (dateOrder == "MD") {
            return this._month + dateDelim + this._date + dateString;
        }
        else {
            return this._date + dateDelim + this._month + dateString;
        }
    }
    ;
}
