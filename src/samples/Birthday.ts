import {getDataSheet} from '../drive-sheets/DataSheet';
import {ONE_DAY} from '../utils/Utilities';
import {SpreadsheetGS} from '../sheets/SpreadsheetGS';
import {MapGS} from '../map/MapGS';

function sendBirthdayEmail(lookAheadDays: number, emailToSend: string) {
  const spreadsheet: SpreadsheetGS = getDataSheet();
  const studentInfo: MapGS<string | Date, MapGS<string | Date, string | Date>> = spreadsheet.getSheet('Student Info').getMapData();

  const today: Date = new Date();
  let birthdays: string = '';

  for (const row of studentInfo.keys()) {
    const t_row = studentInfo.get(row);
    if (t_row == null) throw new Error('Problem with map in Samples-Birthday');
    const t_birthday = t_row.get('Birthday');
    if (t_birthday == null) throw new Error('Could not find birthday for ' + row);
    const studentDate: Date = new Date(t_birthday);

    const lookAheadDate: Date = new Date();
    lookAheadDate.setTime(today.getTime() + (lookAheadDays * ONE_DAY));

    if ((studentDate.getTime() >= today.getTime()) && (studentDate.getTime() <= lookAheadDate.getTime())) {
      birthdays += row + ' has birthday #' + (today.getFullYear() - studentDate.getFullYear()) + ' on ' + (studentDate.getMonth() + 1) + '/' + studentDate.getDate() + '\n';
    }
  }
  MailApp.sendEmail(emailToSend, emailToSend, 'Today\'s Birthdays (plus the next ' + lookAheadDays + ' days)!', birthdays);
}


function happyBirthday() {
  sendBirthdayEmail(7, 'john.dutton@campusinternationalschool.org');
}

