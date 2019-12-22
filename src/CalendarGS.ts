import { CalendarEventGS, DateParams } from "./CalendarEventGS"

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
export class CalendarGS {
    private _oneDay: number = 24*60*60*1000;
    private _dateToday: Date;
    private _endDate: Date;
    private _upcomingEventObjects: Array<CalendarEventGS>;
    private _id: string;
    private _calendar: GoogleAppsScript.Calendar.Calendar;

    /**
     * ```javascript
     * var gseCalendar = new gseTools.CalendarGS(calendarId);
     * ```
     * @param id the id for this Google Calendar
     */
    constructor(id: string) {
        this._dateToday = new Date();
        this._endDate = new Date();
        this._upcomingEventObjects = [];
        this._id = id;
        this._calendar = CalendarApp.getCalendarById(id);
        if (this._calendar == null) throw new Error("Could not find Calendar with id " + id + " in CalendarGS()");
    }

    /**
     * Gets the underlying Google Apps Script object for direct access
     * 
     * @returns {GoogleAppsScript.Calendar.Calendar} the Calendar object
     */
    getObject(): GoogleAppsScript.Calendar.Calendar {
        return this._calendar;
    }

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
    getUpcomingEvents(daysToLookAhead: number): Array<CalendarEventGS> {
        this._endDate.setMilliseconds(this._dateToday.getMilliseconds() + (daysToLookAhead * this._oneDay));
        for (let event of this._calendar.getEvents(this._dateToday, this._endDate)) {
            this._upcomingEventObjects.push(new CalendarEventGS(event));
        }
        return this._upcomingEventObjects;
    }

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
    getUpcomingDueDates(daysToLookAhead: number, eventOptions: DateParams): string {
        let dueDates: string = "";
        for (let event of this.getUpcomingEvents(daysToLookAhead)) {
          if (dueDates != "") dueDates += "\n";
          dueDates += "\t" + event.getDate(eventOptions);
        }
        if (dueDates == "") return "\t" + eventOptions.noEventString;
        return dueDates;
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
     * var dueDatesList = gseCalendar.getUpcomingDueDates(10, eventOptions);
     * ```
     *
     * @param daysToLookAhead the number of days ahead to find events on the calendar
     * @param {DateParams} eventOptions options for displaying that there are no events and how to display the date; see above for defaults
     * 
     * @return {Array<string>} the list of due dates as an array
     */
    getUpcomingDueDatesList(daysToLookAhead: number, eventOptions: DateParams, noEventString: string = "None"): Array<string> {
        let dueDates: Array<string> = [];
        for (let event of this.getUpcomingEvents(daysToLookAhead)) {
            dueDates.push(event.getDate(eventOptions));
        }
        return dueDates;
    };
      
    /**
     * Get the id of the Google Calendar
     * 
     * ```javascript
     * var calendarId = gseCalendar.getId();
     * ```
     *
     * @returns {string} the id of this Google Calendar
     */
    getId(): string {
        return this._id;
    }
}