import {getDataSheet} from "../drive-sheets/DataSheet"
import { ONE_DAY } from "../utils/Utilities";
import { SpreadsheetGS } from "../sheets/SpreadsheetGS";
import { MapGS } from "../map/MapGS";

function sendBirthdayEmail(lookAheadDays: number, emailToSend: string) {
    let spreadsheet: SpreadsheetGS = getDataSheet();
    let studentInfo: MapGS<string | Date, MapGS<string | Date, string | Date>> = spreadsheet.getSheet("Student Info").getMapData();

    let today: Date = new Date();
    let birthdays: string = "";  
    
    for (let row of studentInfo.keys()) {
        let t_row = studentInfo.get(row);
        if (t_row == null) throw new Error("Problem with map in Samples-Birthday");
        let t_birthday = t_row.get("Birthday");
        if (t_birthday == null) throw new Error("Could not find birthday for " + row);
        let studentDate: Date = new Date(t_birthday);

        let lookAheadDate: Date = new Date();
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

  