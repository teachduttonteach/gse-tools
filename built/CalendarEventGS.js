"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the data from a Google Sheet and provides an interface to it in an efficient way.
 *
 * ```javascript
 * var upcomingEvents = gseCalendar.getUpcomingEvents(10);
 * var gseCalendarEvent = new CalendarEventGS(upcomingEvents[0]);
 * var eventDate = gseCalendarEvent.getDate();
 * ```
 */
var CalendarEventGS = /** @class */ (function () {
    /**
     *
     * @param event the calendar event from Google Calendar
     */
    function CalendarEventGS(event) {
        var __d = event.getEndTime();
        __d.setUTCDate(__d.getUTCDate() - 1);
        __d.setMilliseconds(__d.getMilliseconds() - 1);
        this._date = __d.getDate();
        this._month = __d.getMonth() + 1;
        this._title = event.getTitle();
        this._event = event;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Calendar.CalendarEvent} the Event object
     */
    CalendarEventGS.prototype.getObject = function () {
        return this._event;
    };
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
    CalendarEventGS.prototype.getDate = function (firstParam, titlePrefix, dateDelim) {
        // Get values out of array
        var dateOrder = "";
        if (typeof firstParam === "object") {
            if (titlePrefix == undefined)
                titlePrefix = firstParam.titlePrefix;
            if (dateDelim == undefined)
                dateDelim = firstParam.dateDelim;
            if (firstParam.order != undefined)
                dateOrder = firstParam.order;
        }
        else if (typeof firstParam === "string") {
            dateOrder = firstParam.toString();
        }
        else {
            throw new Error("Invalid input in CalendarEventGS.getDate()");
        }
        // Set default values
        if (titlePrefix == null)
            titlePrefix = " ";
        if (dateDelim == null)
            dateDelim = "/";
        if (dateOrder == null)
            dateOrder = "MD";
        // Create and return the date
        var dateString = titlePrefix + this._title;
        if (dateOrder.toUpperCase() == "MD") {
            return this._month + dateDelim + this._date + dateString;
        }
        else {
            return this._date + dateDelim + this._month + dateString;
        }
    };
    ;
    return CalendarEventGS;
}());
exports.CalendarEventGS = CalendarEventGS;
