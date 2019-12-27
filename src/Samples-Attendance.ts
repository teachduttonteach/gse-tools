import { SpreadsheetGS } from "./SpreadsheetGS"
import { SheetGS } from "./SheetGS"
import { MapGS } from "./MapGS"
import { SheetEventGS } from "./SheetEventGS"
import { getDataSheet } from "./Properties"

  function changeAttendance(e: SheetEventGS) {
    if (e.getSheetName() == "Attendance") {
      var sheet = e.getSheet();
      var currentRow = sheet.getValues(e.getRow(), 1, 1, 3);
      if (e.getRow() === 1) {
        if ((e.getColumn() === 1) || (e.getColumn() === 3)) {
          // check to see if both 0 and 2 are defined
          if (currentRow[0][0] && currentRow[0][2]) {
            sheet.changeWorkingStatus(true, [1, 1], "#DD0000");
            sheet.clear(2, 1, 40, 3);
            const records = sheet.getRecordsMatchingColumnValue("Period", currentRow[0][0], ["Full Name", "HP", currentRow[0][2]])
            sheet.setValues(records, 2, 1, records.length, 3);
            sheet.changeWorkingStatus(false, [1, 1], "#FFFFFF");
          }
        } 
      } else if (e.getColumn() === 2) {
        // edit the hall passes
        sheet.changeWorkingStatus(true, [1, 1], "#DD0000");
        sheet.setMapValues(currentRow[0][1], currentRow[0][0], sheet.getValue(1, 1));
        sheet.changeWorkingStatus(false, [1, 1], "#FFFFFF");
      } else if (e.getColumn() === 3) {
        // edit the attendance record
        sheet.changeWorkingStatus(true, [1, 1], "#DD0000");
        sheet.setMapValues(currentRow[0][2], currentRow[0][0], sheet.getValue(1, 3), "Period", sheet.getValue(1, 1));
        sheet.changeWorkingStatus(false, [1, 1], "#FFFFFF");
      }
    } 
  }
  
  function updateDateCodes() {
    const spreadsheet = getDataSheet();
    let sheet = spreadsheet.getSheet("Daily Schedule");
    const dailySchedule: string[][] = sheet.getValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
    let daysOfWeek: MapGS<string, string[]> = new MapGS();
    for (let j: number = 1; j < dailySchedule.length; j++) {
      let weeklySchedule: boolean[] = [];
      for (var i = 1; i < 6; i++) {
        if (dailySchedule[j][i] == "X") weeklySchedule.push(true);
        else weeklySchedule.push(false);
      }
      daysOfWeek.set(dailySchedule[j][0], []);
    }
    
    sheet = new SpreadsheetGS().getSheet("Student Info");
    var studentInfo = sheet.getValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
    for (var i = 1; i < studentInfo.length; i++) {
      for (var j = 15; j < studentInfo[0].length; j++) {
        var period = studentInfo[i][1];
        var day = new Date(studentInfo[0][j]).getDay() - 1;
        let t_classMeetsForPeriod = daysOfWeek.get(period);
        if (t_classMeetsForPeriod != null) {
          if (!t_classMeetsForPeriod[day]) sheet.setValue("N/A - Not Applicable", i + 1, j + 1);
          else if (studentInfo[i][j] == "N/A - Not Applicable") sheet.setValue("", i + 1, j + 1);
        }
      }
    }
  }
  
  