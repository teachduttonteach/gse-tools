class CalendarEvent {
    date: GoogleAppsScript.Base.Date;
    month: number;
    title: string;

    constructor(private event: GoogleAppsScript.Calendar.CalendarEvent) {
        this.date = event.getEndTime();
        this.date.setUTCDate(this.date.getUTCDate() - 1);
        this.date.setMilliseconds(this.date.getMilliseconds() - 1);
        this.month = this.date.getMonth() + 1;
        this.title = event.getTitle();      
    }

    getDate = function(order: string, dateDelim: string, titleDelim: string) {
        var dateString = titleDelim + this.title;
        if (order == "MD") {
            return this.month + dateDelim + this.date + dateString;
        } else if (order == "DM") {
            return this.date + dateDelim + this.month + dateString;
        }
    };
}
