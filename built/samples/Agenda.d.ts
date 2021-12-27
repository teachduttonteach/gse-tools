import { DateParams } from '../DateParams';
import { SlideDisplayParams } from '../slides/SlideshowGS';
import { ParentEmailInfo } from './SampleUtilities';
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
     *  classroom enrollment code; default is 'Classroom Code'
     */
    classroomCodeColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  Google Sites link; default is 'Google Sites'
     */
    sitesLinkColumnName?: string;
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
     * Whether or not to publish the agenda to the web; default is true
     */
    publishAgenda?: boolean;
    /**
    * Whether or not to display the agenda on a Google Slides; default is true
    */
    displayAgenda?: boolean;
    /**
     * Whether or not to use a spreadsheet to get the agenda
     */
    getAgendaFromSheet?: boolean;
    /**
     * Specify parameters if you want to send an email to parents; writeAgenda
     *  must also be set to true; default is empty
     */
    emailToParents?: ParentEmailInfo;
    /**
     * How many days ahead to include in the agenda; default is 7
     */
    daysToLookAheadDefault?: number;
    /**
     * The column to store how many days ahead to include in the agenda; defaults to daysToLookAheadDefault
     */
    daysToLookAheadColumnName?: string;
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
 * // Object to hold all of the date settings (all have default settings)
 * var dateParams = {
 *
 *   // String that will go between the date and the title
 *   titlePrefix: ' - ',
 *
 *   // Delimiter to go between the month and day of the date
 *   dateDelim: '/',
 *
 *   // The order to display the date; can be MD or DM
 *   dateOrder: 'MD',
 * };
 *
 * // Object to hold all of the email settings (all have defaults)
 * var emailArgs = {
 *
 *   // Subject of the e-mail
 *   subject: "This Week's Agenda",
 *
 *   // Whether or not to send the agenda as an attached PDF
 *   sendAsPDF: true,
 *
 *   // Whether or not to send the agenda in the body of the e-mail
 *   sendInBody: true,
 *
 *   // Whether or not to send the link to the agenda Google Doc
 *   sendDocLink: true,
 *
 *   // The text for the agenda Google Doc link
 *   docsLinkText: "Click here to see the agenda in Google Docs",
 *
 *   // Whether or not to send the link to the associated Google Sites page
 *   sendSitesLink: true,
 *
 *   // The text for the Google Sites link
 *   sitesLinkText: "Click here to see the Google Site for this class"
 * }
 *
 * // Object to hold all of the agenda settings (all have defaults)
 * var agendaArgs = {
 *   // The Settings Spreadsheet name
 *   dataSheet: 'gse-tools Settings',
 *
 *   // The sheet name within the Settings Spreadsheet that has settings
 *   // for each class
 *   settingsName: 'Agenda',
 *
 *   // Column in the Settings sheet that defines the sheet name on the Lesson
 *   // Spreadsheet for this class
 *   agendaSheetNameColumnName: 'Sheet Name',
 *
 *   // Column in the Settings sheet that defines the ID of the Lesson
 *   // Spreadsheet for this class
 *   agendaSpreadsheetIDColumnName: 'Agenda Spreadsheet ID',
 *
 *   // Column in the Settings sheet that defines which column in the Lesson
 *   // Spreadsheet to look for the name of the lesson
 *   lessonColumnName: 'Lesson Column Number',
 *
 *   // Column in the Settings sheet that defines which column in the Lesson
 *   // Spreadsheet to look for the date of the lesson
 *   agendaDateColumnName: 'Date Column',
 *
 *   // Useful string to define when the Lesson Spreadsheet no longer has valid
 *   // entries (so the user can put other information in the sheet)
 *   agendaSheetDateColumnEnd: 'END',
 *
 *   // Object that defines how to display the date
 *   agendaDateParams: dateParams,
 *
 *   // Number of days ahead of today to display in the agenda
 *   daysToLookAhead: 7,
 *
 *   // Set the current timezone
 *   timezoneOffset: -5,
 *
 *   // Column in the Settings sheet that defines which column in the Lesson
 *   // Spreadsheet to look for the Classroom enrollment code
 *   classroomCodeColumnName: 'Classroom Code',
 *
 *   // Column in the Settings sheet that defines which column in the Lesson
 *   // Spreadsheet to look for the Google Sites link
 *   sitesLinkColumnName: 'Google Sites',
 *
 *   // Column in the Settings sheet that defines which column in the Lesson
 *   // Spreadsheet to look for the Slideshow ID
 *   agendaSlideshowIDColumnName: 'Agenda Slides ID',
 *
 *   // Whether or not to display the agenda
 *   displayAgenda: true,
 *
 *   // When displaying the agenda on a Google Slide, put this string in the
 *   // slide notes and it will recognize
 *   agendaSlideNotes: 'Agenda',
 *
 *   // Whether or not to write the agenda to a Google Doc; must be true to
 *   // send e-mails
 *   writeAgenda: true,
 *
 *   // Name to use for all files created by this script; will add the name of
 *   // the class
 *   agendaFileName: 'Class Agenda',
 *
 *   // The template file to use for all of the files created by this script
 *   templateName: 'Agenda Document Template',
 *
 *   // Object with all of the e-mail settings; if not specified, will not
 *   // send e-mails
 *   emailToParents: emailArgs
 * }
 *
 * // Call the gse-tools function
 * gsetools.updateDailyAgenda(agendaArgs);
 * ```
 *
 * @param {AgendaParams} args the parameters to use
 * @return {true} returns true if successful
 */
export declare function updateDailyAgenda(args?: AgendaParams, slideDisplayArgs?: SlideDisplayParams): true;
export {};
