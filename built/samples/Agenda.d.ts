import { DateParams } from '../DateParams';
/**
 * All of the arguments and other variables used by the Agenda script
 */
declare type AgendaParams = {
    /**
     * Sheet name for the gse-tools Settings Google Sheet for the agenda files;
     * default is 'Agenda'
     */
    settingsName?: string;
    /**
     * Column name for the gse-tools Settings sheet to determine the column
     * number that contains the lesson description; default is
     * "Lesson Column Number"
     */
    lessonColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  agenda slideshow ID; default is 'Agenda Slides ID'
     */
    agendaSlideshowIDColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  agenda spreadsheet ID; default is 'Agenda Spreadsheet ID'
     */
    agendaSpreadsheetIDColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  lesson date column number; default is "Lesson Date Column Number"
     */
    lessonDateColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  classroom enrollment code; default is 'Classroom Code'
     */
    classroomCodeColumnName?: string;
    /**
     * Name to use for files that are created holding class info; default is
     *  'Daily Class Agenda'
     */
    agendaFileName?: string;
    /**
     * Name of the template to use for the new files to be created; default is
     *  'Daily Class Agenda Template'
     */
    templateName?: string;
    /**
     * Parameters for displaying due dates; default is empty
     */
    agendaDateParams?: DateParams;
    /**
     * The name of the data settings sheet to use; defaults to 'gse-tools
     *  Settings'
     */
    dataSheet?: string;
    /**
     * The timezone offset of your local timezone from GMT; default is -5
     */
    timezoneOffset?: number;
    /**
     * The column in the gse-tools Settings that defines the sheet name for
     * the class; default is 'Sheet Name'
     */
    agendaSheetNameColumnName?: string;
    /**
     * The column in the gse-tools Settings that defines the column to look for
     * the date of the lesson for the class; default is 'Date Column'
     */
    agendaDateColumnName?: string;
    /**
     * The string to look for in the date column to stop looking for more rows
     * that contain lessons; default is 'END'
     */
    agendaSheetDateColumnEnd?: string;
    /**
     * Whether or not to write the agenda to a Google Doc; default is true
     */
    writeAgenda?: boolean;
    /**
     * Whether or not to display the agenda on a Google Slides; default is true
     */
    displayAgenda?: boolean;
    /**
     * How many days ahead to include in the agenda; default is 7
     */
    daysToLookAhead?: number;
    /**
     * What to look for in the slide notes if the current slide is the agenda;
     * default is 'Agenda'
     */
    agendaSlideNotes?: string;
};
/**
 * Update the daily agenda from Google Sheets, writing to (optionally) a
 * Google Doc and a slide on a Google Slides
 *
 * ```javascript
 * var dateParams = {
 *  titlePrefix: ' - ',
 *  dateDelim: '/',
 *  dateOrder: 'MD',
 *  noEventString: 'NONE',
 * };
 * var agendaArgs = {
 *  settingsName: 'Agenda',
 *  lessonColumnName: 'Lesson Column Number',
 *  agendaSlideshowIDColumnName: 'Agenda Slides ID',
 *  agendaSpreadsheetIDColumnName: 'Agenda Spreadsheet ID',
 *  lessonDateColumnName: 'Lesson Date Column Number',
 *  classroomCodeColumnName: 'Classroom Code',
 *  agendaFileName: 'Daily Class Agenda',
 *  templateName: 'Daily Class Agenda Template',
 *  timezoneOffset: -5,
 *  agendaSheetNameColumnName: 'Sheet Name',
 *  agendaDateColumnName: 'Date Column',
 *  agendaSheetDateColumnEnd: 'END',
 *  writeAgenda: true,
 *  displayAgenda: true,
 *  daysToLookAhead: 7,
 *  agendaSlideNotes: 'Agenda',
 *  agendaDateParams: dateParams,
 *  dataSheet: 'GSE Settings'
 * }
 * gsetools.updateDailyAgenda(agendaArgs);
 * ```
 *
 * @param {AgendaParams} args the parameters to use
 * @return {true} returns true if successful
 */
export declare function updateDailyAgenda(args?: AgendaParams): true;
export {};
