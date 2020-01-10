import { getDataSheet } from '../drive-sheets/DataSheet';
import { ONE_DAY } from '../utils/Utilities';
/**
 * Send birthday email to the requested recipient
 *
 * @param {number} lookAheadDays how many days to look ahead
 * @param {string} emailToSend the email address to send it to
 */
function sendBirthdayEmail(lookAheadDays, emailToSend) {
    const spreadsheet = getDataSheet();
    const studentInfo = spreadsheet.getSheet('Student Info').getMapData();
    const today = new Date();
    let birthdays = '';
    for (const row of studentInfo.keys()) {
        const thisRow = studentInfo.get(row);
        if (thisRow == null) {
            throw new Error('Problem with map in Samples-Birthday');
        }
        const thisBirthday = thisRow.get('Birthday');
        if (thisBirthday == null) {
            throw new Error('Could not find birthday for ' +
                row);
        }
        const studentDate = new Date(thisBirthday);
        const lookAheadDate = new Date();
        lookAheadDate.setTime(today.getTime() + (lookAheadDays * ONE_DAY));
        if ((studentDate.getTime() >= today.getTime()) &&
            (studentDate.getTime() <= lookAheadDate.getTime())) {
            birthdays += row + ' has birthday #' +
                (today.getFullYear() - studentDate.getFullYear()) + ' on ' +
                (studentDate.getMonth() + 1) + '/' + studentDate.getDate() + '\n';
        }
    }
    MailApp.sendEmail(emailToSend, emailToSend, 'Today\'s Birthdays (plus the next ' + lookAheadDays + ' days)!', birthdays);
}
