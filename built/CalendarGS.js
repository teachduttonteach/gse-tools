"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CalendarEventGS_1 = require("./CalendarEventGS");
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
var CalendarGS = /** @class */ (function () {
    /**
     * ```javascript
     * var gseCalendar = new gseTools.CalendarGS(calendarId);
     * ```
     * @param id the id for this Google Calendar
     */
    function CalendarGS(id) {
        this._oneDay = 24 * 60 * 60 * 1000;
        this._dateToday = new Date();
        this._endDate = new Date();
        this._upcomingEventObjects = [];
        this._id = id;
        this._calendar = CalendarApp.getCalendarById(id);
        if (this._calendar == null)
            throw new Error("Could not find Calendar with id " + id + " in CalendarGS()");
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {GoogleAppsScript.Calendar.Calendar} the Calendar object
     */
    CalendarGS.prototype.getObject = function () {
        return this._calendar;
    };
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
    CalendarGS.prototype.getUpcomingEvents = function (daysToLookAhead) {
        this._endDate.setMilliseconds(this._dateToday.getMilliseconds() + (daysToLookAhead * this._oneDay));
        for (var _i = 0, _a = this._calendar.getEvents(this._dateToday, this._endDate); _i < _a.length; _i++) {
            var event_1 = _a[_i];
            this._upcomingEventObjects.push(new CalendarEventGS_1.CalendarEventGS(event_1));
        }
        return this._upcomingEventObjects;
    };
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
     * @param eventOptions options for displaying that there are no events and how to display the date; see above for defaults
     *
     * @return {string} the list of due dates as a string for use in Slides
     */
    CalendarGS.prototype.getUpcomingDueDates = function (daysToLookAhead, eventOptions) {
        var dueDates = "";
        for (var _i = 0, _a = this.getUpcomingEvents(daysToLookAhead); _i < _a.length; _i++) {
            var event_2 = _a[_i];
            if (dueDates != "")
                dueDates += "\n";
            dueDates += "\t" + event_2.getDate(eventOptions);
        }
        if (dueDates == "")
            return "\t" + eventOptions.noEventString;
        return dueDates;
    };
    ;
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
     * @param eventOptions options for displaying that there are no events and how to display the date; see above for defaults
     *
     * @return {Array<string>} the list of due dates as an array
     */
    CalendarGS.prototype.getUpcomingDueDatesList = function (daysToLookAhead, eventOptions, noEventString) {
        if (noEventString === void 0) { noEventString = "None"; }
        var dueDates = [];
        for (var _i = 0, _a = this.getUpcomingEvents(daysToLookAhead); _i < _a.length; _i++) {
            var event_3 = _a[_i];
            dueDates.push(event_3.getDate(eventOptions));
        }
        return dueDates;
    };
    ;
    /**
     * Get the id of the Google Calendar
     *
     * ```javascript
     * var calendarId = gseCalendar.getId();
     * ```
     *
     * @returns {string} the id of this Google Calendar
     */
    CalendarGS.prototype.getId = function () {
        return this._id;
    };
    return CalendarGS;
}());
exports.CalendarGS = CalendarGS;
