class CalendarGS {
    ONE_DAY: number;
    dateToday: Date;
    endDate: Date;
    upcomingEventObjects: [];
    constructor(private id: string) {
        this.ONE_DAY = 24*60*60*1000;
        this.dateToday = new Date();
        this.endDate = new Date();
        this.upcomingEventObjects = [];
    }
  
    getUpcomingEvents = function(daysToLookAhead: number) {
        this.endDate.setMilliseconds(this.dateToday.getMilliseconds() + (daysToLookAhead * this.ONE_DAY));
        for (let event of CalendarApp.getCalendarById(this.id).getEvents(this.dateToday, this.endDate)) {
            this.upcomingEventObjects.push(new CalendarEvent(event));
        }
        return this.upcomingEventObjects;
    }

    // Documentation
    getId = function() {
        return this.id;
    }
}

