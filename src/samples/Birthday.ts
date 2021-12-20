import { Utilities} from '../utils/Utilities';
import { SpreadsheetGS } from '../sheets/SpreadsheetGS';

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
 * ```javascript
 * var birthdayParams = {
 *
 *   // The name of the sheet that has the student info
 *   studentInfoSheet: 'Student Info',
 *
 *   // The column on the student info sheet that has the birthdays
 *   birthdayColumnName: 'Birthdate',
 *
 *   // The column on the student info sheet to use for each student
 *   studentNameColumn: 'Full Name',
 *
 *   // The date order, can be DM or MD
 *   dateOrder: 'DM'
 * };
 *
 * // The first parameter is how many days out to check for
 * // birthdays
 * gsetools.sendBirthdayEmail(10,
 *    "teachduttonteach@gmail.com", birthdayParams);
 * ```
 *
 * @param {number} lookAheadDays how many days to look ahead
 * @param {string} emailToSend the email address to send it to
 * @param {birthdayParams} birthdayParams the parameters for the birthday
 */
export function sendBirthdayEmail(lookAheadDays: number, emailToSend: string, birthdayParams?: BirthdayParams) {
  if (birthdayParams == null) birthdayParams = {} as BirthdayParams;

  const {
    studentInfoSheet = 'Student Info',
    birthdayColumnName = 'Birthday',
    studentNameColumn = 'Full Name',
    dateOrder = 'MD',
    timezoneOffset = -5,
  } = birthdayParams;

  const spreadsheet: SpreadsheetGS = new SpreadsheetGS();
  const studentInfo: Map<string | Date, Map<string | Date, string | Date>> = spreadsheet
    .getSheet(studentInfoSheet)
    .getDataAsMap();

  const utils = new Utilities();

  const today: Date = utils.getTodaysDate(timezoneOffset);
  const studentBirthdays: Map<string, string> = new Map<string, string>();

  for (const row of studentInfo.entries()) {
    const studentName = row[1].get(studentNameColumn);
    if (studentName == null || studentName instanceof Date) {
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
    const studentDate: Date = new Date(thisBirthday);

    const utils = new Utilities();

    const lookAheadDate: Date = utils.getTodaysDate(timezoneOffset);
    lookAheadDate.setTime(today.getTime() + lookAheadDays * utils.getOneDay());

    if (
      utils.compareDates(studentDate, today, true, true, 'MONTH') &&
      utils.compareDates(studentDate, lookAheadDate, false, true, 'MONTH')
    ) {
      let displayDate = studentDate.getMonth() + 1 + '/' + studentDate.getDate();
      if (dateOrder == 'DM') {
        displayDate = studentDate.getDate() + '/' + (studentDate.getMonth() + 1);
      }
      if (!studentBirthdays.has(studentName)) {
        studentBirthdays.set(
          studentName,
          studentName + ' has birthday #' + (today.getFullYear() - studentDate.getFullYear()) + ' on ' + displayDate,
        );
      }
    }
  }
  MailApp.sendEmail(
    emailToSend,
    emailToSend,
    "Today's Birthdays (plus the next " + lookAheadDays + ' days)!',
    Array.from(studentBirthdays.values()).join('\n'),
  );
}
