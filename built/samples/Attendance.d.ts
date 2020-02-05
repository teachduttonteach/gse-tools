/// <reference types="google-apps-script" />
/**
 * Parameters to run attendance
 */
export declare type AttendanceParams = {
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
    secondaryColumnsToCheck?: Array<{
        name: string | Date;
        value: [number, number];
    }>;
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
export declare function changeAttendance(_e: GoogleAppsScript.Events.SheetsOnEdit, args?: AttendanceParams): void;
/**
 * Updates the date codes for the selected periods
 */
