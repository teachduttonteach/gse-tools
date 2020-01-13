import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { MapGS } from '../map/MapGS';
import { SheetEventGS } from '../sheets/SheetEventGS';
import { getDataSheet } from '../drive-sheets/DataSheet';
/**
 * Change the attendance value for the student and date
 * @param {SheetEventGS} _e the Google event
 * @param {AttendanceParams} args the parameters for attendance
 */
function changeAttendance(_e, args) {
    if (args == null)
        args = {};
    const { workingStatusCell = [1, 1], workingStatusColor = '#DD0000', normalStatusColor = '#FFFFFF', studentInfoSheetName = 'Student Info', attendanceSheetName = 'Attendance', fullnameColumnName = 'Full Name', secondaryColumnsToCheck = [{ name: 'Period', value: [1, 1] }], maximumLength = 40, } = args;
    const e = new SheetEventGS(_e);
    if (e.getSheetName() == attendanceSheetName) {
        const attendanceSheet = e.getSheet();
        attendanceSheet.changeWorkingStatus(true, workingStatusCell, workingStatusColor);
        const studentInfoSheet = e.getActiveSheet().getSheet(studentInfoSheetName);
        const topRow = attendanceSheet.getRow(e.getRow() - 1);
        const name = topRow[0];
        const attendance = topRow[topRow.length - 1];
        const currentDate = attendanceSheet.getValue(1, topRow.length);
        const secondaryColumns = [];
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
                    const returnColumnNames = [fullnameColumnName];
                    for (const colName of topRow) {
                        returnColumnNames.push(colName);
                    }
                    returnColumnNames.push(currentDate);
                    const records = studentInfoSheet.getRecordsMatchingColumnValue(secondaryColumns[0].name, secondaryColumns[0].value, returnColumnNames, true);
                    attendanceSheet.setValues(records, 2, 1, records.length - 1, topRow.length);
                }
            }
        }
        else if (e.getColumn() > 1 && e.getColumn() < topRow.length) {
            studentInfoSheet.setMapValues(e.getEditedValue(), name, topRow[e.getColumn() - 1], secondaryColumns);
        }
        else if (e.getColumn() === topRow.length) {
            // edit the attendance record
            studentInfoSheet.setMapValues(attendance, name, currentDate, secondaryColumns);
        }
        attendanceSheet.changeWorkingStatus(false, workingStatusCell, normalStatusColor);
    }
}
/**
 * Updates the date codes for the selected periods
 */
function updateDateCodes() {
    const spreadsheet = getDataSheet();
    let sheet = spreadsheet.getSheet('Daily Schedule');
    const dailySchedule = sheet.getValues(1, 1, sheet.getLastRow(), sheet.getLastColumn());
    const daysOfWeek = new MapGS();
    for (let j = 1; j < dailySchedule.length; j++) {
        const weeklySchedule = [];
        for (let i = 1; i < 6; i++) {
            if (dailySchedule[j][i] == 'X')
                weeklySchedule.push(true);
            else
                weeklySchedule.push(false);
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
                }
                else if (studentInfo[i][j] == 'N/A - Not Applicable') {
                    sheet.setValue('', i + 1, j + 1);
                }
            }
        }
    }
}
