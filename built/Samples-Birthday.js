import { getDataSheet, ONE_DAY } from "./Properties";
function sendBirthdayEmail(lookAheadDays, emailToSend) {
    let spreadsheet = getDataSheet();
    let studentInfo = spreadsheet.getSheet("Student Info").getMapData();
    let today = new Date();
    let birthdays = "";
    for (let row of studentInfo.getKeys()) {
        let t_row = studentInfo.get(row);
        if (t_row == null)
            throw new Error("Problem with map in Samples-Birthday");
        let t_birthday = t_row.get("Birthday");
        if (t_birthday == null)
            throw new Error("Could not find birthday for " + row);
        let studentDate = new Date(t_birthday);
        let lookAheadDate = new Date();
        lookAheadDate.setTime(today.getTime() + (lookAheadDays * ONE_DAY));
        if ((studentDate.getTime() >= today.getTime()) && (studentDate.getTime() <= lookAheadDate.getTime())) {
            birthdays += row + " has birthday #" + (today.getFullYear() - studentDate.getFullYear()) + " on " + (studentDate.getMonth() + 1) + "/" + studentDate.getDate() + "\n";
        }
    }
    MailApp.sendEmail(emailToSend, emailToSend, "Today's Birthdays (plus the next " + lookAheadDays + " days)!", birthdays);
}
function happyBirthday() {
    sendBirthdayEmail(7, "john.dutton@campusinternationalschool.org");
}
