import { getOneDay, compareDates, getTodaysDate } from '../utils/Utilities';
import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { MapGS } from '../map/MapGS';
/**
 * Send birthday email to the requested recipient
 *
 * @param {number} lookAheadDays how many days to look ahead
 * @param {string} emailToSend the email address to send it to
 * @param {birthdayParams} birthdayParams the parameters for the birthday
 */
export function sendBirthdayEmail(lookAheadDays, emailToSend, birthdayParams) {
    if (birthdayParams == null)
        birthdayParams = {};
    const { studentInfoSheet = 'Student Info', birthdayColumnName = 'Birthday', studentNameColumn = 'Full Name', dateOrder = 'MD', timezoneOffset = -5, } = birthdayParams;
    const spreadsheet = new SpreadsheetGS();
    const studentInfo = spreadsheet.getSheet(studentInfoSheet).getDataAsMap();
    const today = getTodaysDate(timezoneOffset);
    const studentBirthdays = new MapGS();
    for (const row of studentInfo.entries()) {
        const studentName = row[1].get(studentNameColumn);
        if ((studentName == null) || studentName instanceof Date) {
            throw new Error('Student name cannot be a date or empty.');
        }
        const thisRow = row[1];
        if (thisRow == null) {
            throw new Error('Problem with map in Samples-Birthday');
        }
        const thisBirthday = thisRow.get(birthdayColumnName);
        if (thisBirthday == null) {
            throw new Error('Could not find birthday for ' + studentName);
        }
        const studentDate = new Date(thisBirthday);
        const lookAheadDate = getTodaysDate(timezoneOffset);
        lookAheadDate.setTime(today.getTime() + lookAheadDays * getOneDay());
        if (compareDates(studentDate, today, true, true, 'MONTH') &&
            compareDates(studentDate, lookAheadDate, false, true, 'MONTH')) {
            let displayDate = (studentDate.getMonth() + 1) + '/' +
                studentDate.getDate();
            if (dateOrder == 'DM') {
                displayDate = studentDate.getDate() + '/' +
                    (studentDate.getMonth() + 1);
            }
            if (!studentBirthdays.has(studentName)) {
                studentBirthdays.set(studentName, studentName + ' has birthday #' +
                    (today.getFullYear() - studentDate.getFullYear()) +
                    ' on ' + displayDate);
            }
        }
    }
    MailApp.sendEmail(emailToSend, emailToSend, 'Today\'s Birthdays (plus the next ' + lookAheadDays + ' days)!', studentBirthdays.values().join('\n'));
}
