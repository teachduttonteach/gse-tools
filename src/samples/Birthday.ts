import { getDataSheet } from '../DataSheet';
import { ONE_DAY } from '../utils/Utilities';
import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { MapGS } from '../map/MapGS';

/**
 * Send birthday email to the requested recipient
 *
 * @param {number} lookAheadDays how many days to look ahead
 * @param {string} emailToSend the email address to send it to
 */
function sendBirthdayEmail(lookAheadDays: number, emailToSend: string) {
  const spreadsheet: SpreadsheetGS = getDataSheet();
  const studentInfo: MapGS<string | Date, MapGS<string | Date, string | Date>> = spreadsheet
    .getSheet('Student Info')
    .getDataAsMap();

  const today: Date = new Date();
  let birthdays: string = '';

  for (const row of studentInfo.keys()) {
    const thisRow = studentInfo.get(row);
    if (thisRow == null) {
      throw new Error('Problem with map in Samples-Birthday');
    }
    const thisBirthday = thisRow.get('Birthday');
    if (thisBirthday == null) {
      throw new Error('Could not find birthday for ' + row);
    }
    const studentDate: Date = new Date(thisBirthday);

    const lookAheadDate: Date = new Date();
    lookAheadDate.setTime(today.getTime() + lookAheadDays * ONE_DAY);

    if (studentDate.getTime() >= today.getTime() && studentDate.getTime() <= lookAheadDate.getTime()) {
      birthdays +=
        row +
        ' has birthday #' +
        (today.getFullYear() - studentDate.getFullYear()) +
        ' on ' +
        (studentDate.getMonth() + 1) +
        '/' +
        studentDate.getDate() +
        '\n';
    }
  }
  MailApp.sendEmail(
    emailToSend,
    emailToSend,
    "Today's Birthdays (plus the next " + lookAheadDays + ' days)!',
    birthdays,
  );
}
