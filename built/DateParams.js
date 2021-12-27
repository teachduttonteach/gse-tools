export class DateUtilities {
    formatTodaysDate(dateParams = {}, currentDate) {
        const { dateDelim = "/", dateOrder = "MD", titlePrefix = "" } = dateParams;
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        let displayDate = titlePrefix;
        if (dateOrder.indexOf("MD") != -1)
            displayDate += month + dateDelim + day;
        else
            displayDate += day + dateDelim + month;
        if (dateOrder.indexOf("Y") == 0)
            displayDate = year + dateDelim + displayDate;
        else if (dateOrder.indexOf("Y") > 0)
            displayDate += dateDelim + year;
        return displayDate;
    }
}
