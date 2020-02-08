/// <reference types="google-apps-script" />
import { DateParams } from '../DateParams';
/**
 * All of the arguments used by the tabulateBellwork function
 */
declare type TabulateParams = {
    /**
     * The column name in the 'gse-tools Settings' sheet that contains the
     *  sheet for the bellwork results; default is 'Bellwork Results Sheet'
     */
    bellworkResultsColumn?: string;
    /**
     * The column name in the 'gse-tools Settings' sheet that contains the
     *  title for the associated bellwork form; default is 'Bellwork Title'
     */
    bellworkTitleColumn?: string;
    /**
     * The name of the data settings sheet to use; defaults to
     *  'gse-tools Settings'
     */
    dataSheet?: string;
    /**
     * The name of the sheet on the data settings sheet for the bellwork;
     *  default is 'Bellwork'
     */
    sheetName?: string;
    /**
     * The column name in the 'gse-tools Settings' sheet that contains the
     *  id for the results spreadsheet; default is 'Spreadsheet ID'
     */
    spreadsheetIDColumn?: string;
    /**
     * Date parameters for constructing the date for the results sheet column
     *  header
     */
    columnDateParams?: DateParams;
};
/**
 * All of the arguments and other variables used by the Bellwork script
 */
declare type BellworkArgs = {
    /**
     * Sheet name for the bellwork settings, contained on the gse-tools Settings
     *  spreadsheet; default is "Bellwork"
     */
    bellworkSettingsSheetName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  classroom enrollment code; default is "Classroom Code"
     */
    classroomCodeColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column number that contains
     *  the bellwork question; default is "Bellwork Column"
     */
    bellworkColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  bellwork date column number; default is "Bellwork Date Column Number"
     */
    bellworkDateColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  bellwork title to display before the current date on the form;
     *  default is "Bellwork Title"
     */
    bellworkTitleColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  bellwork form ID; default is 'Bellwork Form ID'
     */
    bellworkFormIDColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  bellwork slideshow ID; default is 'Bellwork Slides ID'
     */
    bellworkSlideshowIDColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  bellwork spreadsheet ID; default is 'Bellwork Spreadsheet ID'
     */
    bellworkSpreadsheetIDColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  sheet name containing bellwork on the spreadsheet specified by
     *  bellworkSpreadsheetIDColumnName; default is 'Sheet Name'
     */
    bellworkSheetNameColumnName?: string;
    /**
     * Optional column name for the gse-tools Setting sheet column that contains
     *  daily pictures to display on the slideshow; default is "Daily Pictures"
     */
    dailyPicturesColumnName?: string;
    /**
     * The notes on the slide that contains the daily pictures on the slideshow;
     *  default is "Daily Pictures"
     */
    dailyPicturesNotes?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  question type column number for the spreadsheet; default is "Question
     *  Type Column Number"
     */
    questionTypeColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  question options column number for the spreadsheet; default is "Question
     *  Options Column Number"
     */
    optionsColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  column number for multiple choice / select grid rows for the spreadsheet;
     *  default is "Grid Rows Column Number"
     */
    gridRowsColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  images to display for the bellwork form; default is "Bellwork Form
     *  Image Column"
     */
    imageColumnName?: string;
    /**
     * The notes on the slide that contains the bellwork on the slideshow;
     *  default is "Bellwork"
     */
    bellworkSlideNotes?: string;
    /**
     * Whether or not the date should be in the bellwork title; default is true
     */
    dateInBellworkTitle?: boolean;
    /**
     * The function to call after the bellwork has been submitted; default is
     *  "onSubmitBellwork"
     */
    onSubmitBellworkFunctionName?: string;
    /**
     * String to look for in the date column of the sheet to know that it's the
     *  last entry to look for bellwork; will not go past the end of the sheet;
     *  default is 'END'
     */
    bellworkSheetDateColumnEnd?: string;
    /**
     * Whether or not to display bellwork on form (default: true)
     */
    displayBellworkOnForm?: boolean;
    /**
     * Whether or not to display bellwork on slide (default: true)
     */
    displayBellworkOnSlide?: boolean;
    /**
     * Column name for the sheet column that contains the exit question; default
     *  is "Exit Question Column Number"
     */
    exitQuestionColumnName?: string;
    /**
     * Notes on the slide to hold the exit question; default is "Exit Question"
     */
    exitQuestionSlideNotes?: string;
    /**
     * Whether or not to display the exit ticket on slide; default is true
     */
    displayExitQuestionOnSlide?: boolean;
    /**
     * Column name for the sheet column that contains the number of days to
     *  look ahead for upcoming events; default is "Days to Look Ahead"
     */
    daysToLookAheadColumnName?: string;
    /**
     * Notes on the slide that holds the upcoming due dates; default is
     *  "Upcoming Due Dates"
     */
    upcomingDueDatesSlideNotes?: string;
    /**
     * Delimiter for the display of the due dates; default is "/"
     */
    dateDelimiter?: string;
    /**
     * Parameters for displaying due dates; default is empty
     */
    dueDateParams?: DateParams;
    /**
     * Whether or not to display the upcoming due dates on slide; default is true
     */
    displayUpcomingDueDates?: boolean;
    /**
     * The timezone offset to use for date comparisons. EST is -5, which is the
     *  default
     */
    timezoneOffset?: number;
    /**
     * The name of the data settings sheet to use; defaults to 'gse-tools
     *  Settings'
     */
    dataSheet?: string;
};
/**
 * Update the bellwork with the associated parameters
 *
 * ```javascript
 * var dateParams = {
 *  titlePrefix: ' - ',
 *  dateDelim: '/',
 *  dateOrder: 'MD',
 *  noEventString: 'NONE'
 * };
 *
 * var bellworkParams = {
 *  bellworkSettingsSheetName: 'Bellwork',
 *  classroomCodeColumnName: 'Class Code',
 *  bellworkColumnName: 'Bellwork Column Number',
 *  bellworkDateColumnName: 'Date Column',
 *  bellworkFormIDColumnName: 'Form ID',
 *  bellworkSlideshowIDColumnName: 'Slideshow ID',
 *  bellworkSpreadsheetIDColumnName: 'Spreadsheet ID',
 *  bellworkTitleColumnName: 'Bellwork Title',
 *  bellworkSlideNotes: 'Bellwork',
 *  dateInBellworkTitle: true,
 *  onSubmitBellworkFunctionName: 'onSubmitBellwork',
 *  bellworkSheetNameColumnName: 'Sheet Name',
 *  bellworkSheetDateColumnEnd: 'END',
 *  dailyPicturesColumnName: 'Daily Picture Folder',
 *  dailyPicturesNotes: 'Agenda',
 *  daysToLookAheadColumnName: '# of Days to Look',
 *  upcomingDueDatesSlideName: 'Upcoming Due Dates',
 *  dateDelimiter: '/',
 *  exitQuestionColumnName: 'Exit Question Column Number',
 *  exitQuestionSlideNotes: 'Exit Question',
 *  questionTypeColumnName: 'Question Type Column Number',
 *  optionsColumnName: 'Question Options Column Number',
 *  gridRowsColumnName: 'Grid Rows Column Number',
 *  imageColumnName: 'Bellwork Form Image Column',
 *  dueDateParams: dateParams,
 *  displayBellworkOnForm: true,
 *  displayBellworkOnSlide: true,
 *  displayExitQuestionOnSlide: true,
 *  displayUpcomingDueDates: true,
 *  timezoneOffset: -5,
 *  dataSheet: 'GSE Settings'
 * };
 * gsetools.updateBellwork(bellworkParams);
 * ```
 *
 * @param {BellworkArgs} args the parameters
 */
export declare function updateBellwork(args: BellworkArgs): void;
/**
 * Take the submitted bellwork and adds it to an existing Sheet for the
 *  submitting student and their response
 * @param {GoogleAppsScript.Events.FormsOnFormSubmit} event the Google Form
 *  event
 * @param {TabulateParams} args the tabulate bellwork parameters
 * @return {boolean} returns true if the bellwork was tabulated
 */
export declare function tabulateBellwork(event: GoogleAppsScript.Events.FormsOnFormSubmit, args?: TabulateParams): boolean;
export {};
