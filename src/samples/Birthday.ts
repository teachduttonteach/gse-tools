import { getDataSheet } from '../DataSheet';
import { getOneDay, compareDates, getTodaysDate } from '../utils/Utilities';
import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { MapGS } from '../map/MapGS';

/**
 * Parameters to run birthday e-mails
 */
export type BirthdayParams = {
  /**
   * The sheet that contains student information, including their name and 
   *  birthday; default is 'Student Info'
   */
  studentInfoSheet?: string;
  /**
   * The column name in the student info sheet that contains the birthday;
   *  default is 'Birthday'
   */
  birthdayColumnName?: string;
  /**
   * The preferred date order to display in the e-mail: 'DM' or 'MD'; default 
   *  is 'MD'
   */
  dateOrder?: 'DM' | 'MD';
  /**
   * The column in the sheet that contains the student's full name; default is
   *  'Full Name'
   */
  studentNameColumn?: string;
  /**
   * The timezone offset to use for date comparisons. EST is -5, which is the
   *  default
   */
  timezoneOffset?: number;

};

/**
 * Send birthday email to the requested recipient
 *
 * @param {number} lookAheadDays how many days to look ahead
 * @param {string} emailToSend the email address to send it to
 */
export function sendBirthdayEmail(lookAheadDays: number, emailToSend: string,
  birthdayParams?: BirthdayParams) {
  if (birthdayParams == null) birthdayParams = {} as BirthdayParams;

  const {
    studentInfoSheet = 'Student Info',
    birthdayColumnName = 'Birthday',
    studentNameColumn = 'Full Name',
    dateOrder = 'MD',
    timezoneOffset = -5
  } = birthdayParams;

  const spreadsheet: SpreadsheetGS = new SpreadsheetGS();
  const studentInfo: MapGS<string | Date, MapGS<string | Date, string | Date>>
     = spreadsheet.getSheet(studentInfoSheet).getDataAsMap();

  const today: Date = getTodaysDate(timezoneOffset);
  let studentBirthdays: MapGS<string, string> = new MapGS<string, string>();

  for (const row of studentInfo.entries()) {
    const studentName = row[1].get(studentNameColumn);
    if ((studentName == null) || studentName instanceof Date) throw new 
      Error("Student name cannot be a date or empty.");

    const thisRow = row[1];
    if (thisRow == null) {
      throw new Error('Problem with map in Samples-Birthday');
    }
    const thisBirthday = thisRow.get(birthdayColumnName);
    if (thisBirthday == null) {
      throw new Error('Could not find birthday for ' + studentName);
    }
    const studentDate: Date = new Date(thisBirthday);

    const lookAheadDate: Date = getTodaysDate(timezoneOffset);
    lookAheadDate.setTime(today.getTime() + lookAheadDays * getOneDay());

    if (compareDates(studentDate, today, true, true, 'MONTH') &&
      compareDates(studentDate, lookAheadDate, false, true, 'MONTH')) {

      let displayDate = (studentDate.getMonth() + 1) + '/' + 
        studentDate.getDate();
      if (dateOrder == 'DM') displayDate = studentDate.getDate() + '/' +
        (studentDate.getMonth() + 1);
      if (!studentBirthdays.has(studentName)) studentBirthdays.set(
        studentName, studentName + ' has birthday #' + 
        (today.getFullYear() - studentDate.getFullYear()) +
        ' on ' + displayDate);
    }
  }
  MailApp.sendEmail(
    emailToSend,
    emailToSend,
    "Today's Birthdays (plus the next " + lookAheadDays + ' days)!',
    studentBirthdays.values().join("\n"),
  );
}
