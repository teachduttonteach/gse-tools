import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { MapGS } from '../map/MapGS';
import { SheetEventGS } from '../sheets/SheetEventGS';
import { getDataSheet } from '../DataSheet';

/**
 * Parameters to run attendance
 */
export type AttendanceParams = {
  /**
   * The cell location on the attendance sheet to display if the script is in 
   * working mode (busy); default is [1, 1]
   */
  workingStatusCell?: [number, number];
  /**
   * The color for working mode; default is '#DD0000'
   */
  workingStatusColor?: string;
  /**
   * The color for the normal mode; default is '#FFFFFF'
   */
  normalStatusColor?: string;
  /**
   * The sheet that contains the student information; default is 'Student Info'
   */
  studentInfoSheetName?: string;
  /**
   * The sheet that contains the attendance information; default is
   *  'Attendance'
   */
  attendanceSheetName?: string;
  /**
   * The column on the attendance sheet that contains the full name of the
   *  student; default is 'Full Name'
   */
  fullnameColumnName?: string;
  /**
   * Secondary columns to check to make sure that we are pulling the correct
   *  set of data from the attendance sheet; default is 
   *  [{name: 'Period', value: [1, 1]}]
   */
  secondaryColumnsToCheck?: 
    Array<{ name: string | Date; value: [number, number] }>;
  /**
   * The maximum number of students to accomodate on the attendance form;
   *  default is 40
   */
  maximumLength?: number;
};

/**
 * Change the attendance value for the student and date
 * @param {SheetEventGS} _e the Google event from onEdit
 * @param {AttendanceParams} args the parameters for attendance
 */
export function changeAttendance(_e: GoogleAppsScript.Events.SheetsOnEdit, args?: AttendanceParams) {
  if (args == null) args = {} as AttendanceParams;
  const {
    workingStatusCell = [1, 1] as [number, number],
    workingStatusColor = '#DD0000',
    normalStatusColor = '#FFFFFF',
    studentInfoSheetName = 'Student Info',
    attendanceSheetName = 'Attendance',
    fullnameColumnName = 'Full Name',
    secondaryColumnsToCheck = [{ name: 'Period', value: [1, 1] }],
    maximumLength = 40,
  } = args;
  const e: SheetEventGS = new SheetEventGS(_e);
  if (e.getSheetName() == attendanceSheetName) {
    const attendanceSheet = e.getSheet();
    const thisActiveSheet = e.getActiveSheet();
    const thisRow = e.getRow();
    const thisColumn = e.getColumn();
    const thisEditedValue = e.getEditedValue();

    if ((attendanceSheet === undefined) || (thisActiveSheet === undefined) ||
      (thisRow === undefined) || (thisColumn == undefined) ||
      (thisEditedValue === undefined)) return;

    attendanceSheet.changeWorkingStatus(true, workingStatusCell, workingStatusColor);
    const studentInfoSheet = thisActiveSheet.getSheet(studentInfoSheetName);
    const topRow = attendanceSheet.getRow(thisRow);
    const name = topRow[0];
    const attendance = topRow[topRow.length - 1];
    const currentDate = attendanceSheet.getValue(1, topRow.length);

    const secondaryColumns: Array<{ name: string | Date; value: string | Date }> = [];
    for (const columnToCheck of secondaryColumnsToCheck) {
      secondaryColumns.push({
        name: columnToCheck.name,
        value: attendanceSheet.getValue(columnToCheck.value[0], columnToCheck.value[1]),
      });
    }

    if (e.getRow() === 1) {
      if (e.getColumn() === 1 || e.getColumn() === topRow.length) {
        // check to see if both 0 and 2 are defined
        if (name != null && attendance != null) {
          attendanceSheet.clear(2, 1, maximumLength, topRow.length);

          const returnColumnNames: Array<string | Date> = [fullnameColumnName];
          for (const colName of topRow.slice(1)) {
            returnColumnNames.push(colName);
          }

          returnColumnNames.push(currentDate);
          const records = studentInfoSheet.getRecordsMatchingColumnValue(
            secondaryColumns[0].name,
            secondaryColumns[0].value,
            returnColumnNames,
            true,
          );
          attendanceSheet.setValues(records, 2, 1, records.length, topRow.length);
        }
      }
    } else if (thisColumn > 1 && thisColumn < topRow.length) {
      // edits a column in the middle between the name and attendance record
      secondaryColumns.push({name: fullnameColumnName, value: name});
      studentInfoSheet.setValueWithMatchingColumns(thisEditedValue, 
        attendanceSheet.getValue(1, thisColumn), secondaryColumns);
    } else if (e.getColumn() === topRow.length) {
      // edit the attendance record
      secondaryColumns.push({name: fullnameColumnName, value: name});
      studentInfoSheet.setValueWithMatchingColumns(attendance, currentDate, secondaryColumns);
    }
    attendanceSheet.changeWorkingStatus(false, workingStatusCell, normalStatusColor);
  }
}

/**
 * Updates the date codes for the selected periods
 */
/*
function updateDateCodes() {
  const spreadsheet = getDataSheet();
  let sheet = spreadsheet.getSheet('Daily Schedule');
  const dailySchedule: Array<Array<Date | string>> = sheet.getValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  const daysOfWeek: MapGS<string | Date, MapGS<string | Date, string | Date>> = new MapGS();
  for (let j: number = 1; j < dailySchedule.length; j++) {
    const weeklySchedule: boolean[] = [];
    for (let i = 1; i < 6; i++) {
      if (dailySchedule[j][i] == 'X') weeklySchedule.push(true);
      else weeklySchedule.push(false);
    }
    daysOfWeek.set(dailySchedule[j][0], new MapGS());
  }

  sheet = new SpreadsheetGS().getSheet('Student Info');
  const studentInfo = sheet.getValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  for (let i = 1; i < studentInfo.length; i++) {
    for (let j = 15; j < studentInfo[0].length; j++) {
      const period = studentInfo[i][1];
      const day = new Date(studentInfo[0][j]).getDay() - 1;
      const classMeetsForPeriod = daysOfWeek.get(period);
      if (classMeetsForPeriod != null) {
        if (!classMeetsForPeriod.get(day.toString())) {
          sheet.setValue('N/A - Not Applicable', i + 1, j + 1);
        } else if (studentInfo[i][j] == 'N/A - Not Applicable') {
          sheet.setValue('', i + 1, j + 1);
        }
      }
    }
  }
}
*/
