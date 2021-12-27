/// <reference types="google-apps-script" />
import { SlideDisplayParams } from '../slides/SlideshowGS';
import { DateParams } from '../DateParams';
/**
 * All of the arguments used by the tabulateQuestion function
 */
declare type TabulateParams = {
    /**
     * The column name in the 'gse-tools Settings' sheet that contains the
     *  sheet for the question results; default is 'Bellwork Results Sheet'
     */
    questionResultsColumn?: string;
    /**
     * The column name in the 'gse-tools Settings' sheet that contains the
     *  title for the associated question form; default is 'Bellwork Title'
     */
    questionTitleColumn?: string;
    /**
     * The name of the data settings sheet to use; defaults to
     *  'gse-tools Settings'
     */
    dataSheet?: string;
    /**
     * The name of the sheet on the data settings sheet for the question;
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
 * All of the arguments and other variables used by the question script
 */
declare type QuestionArgs = {
    /**
     * Sheet name for the question settings, contained on the gse-tools Settings
     *  spreadsheet; default is "Bellwork"
     */
    settingsName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  classroom enrollment code; default is "Classroom Code"
     */
    classroomCodeColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column number that contains
     *  the question; default is "Bellwork Column"
     */
    questionColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  question date column number; default is "Bellwork Date Column Number"
     */
    questionDateColumnName?: string;
    /**
     * String to look for in the alt text of the slide text boxes for this class;
     *  default is "Bellwork Alt Text"
     */
    altText?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  question title to display before the current date on the form;
     *  default is "Bellwork Title"
     */
    questionTitleColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  question slide notes string to look for in the slide that has the
     *  question; default is 'Bellwork Slide Notes'
     */
    questionSlideNotesColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  question form ID; default is 'Bellwork Form ID'
     */
    questionFormIDColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  question slideshow ID; default is 'Bellwork Slides ID'
     */
    questionSlideshowIDColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  question spreadsheet ID; default is 'Bellwork Spreadsheet ID'
     */
    questionSpreadsheetIDColumnName?: string;
    /**
     * Column name for the gse-tools Settings sheet column that contains the
     *  sheet name containing question on the spreadsheet specified by
     *  questionSpreadsheetIDColumnName; default is 'Sheet Name'
     */
    questionSheetNameColumnName?: string;
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
     *  images to display for the question form; default is "Bellwork Form
     *  Image Column"
     */
    imageColumnName?: string;
    /**
     * The notes on the slide that contains the question on the slideshow;
     *  default is "Bellwork"
     */
    questionSlideNotes?: string;
    /**
     * Whether or not the date should be in the question title; default is true
     */
    dateInQuestionTitle?: boolean;
    /**
     * The function to call after the question has been submitted; default is
     *  "onSubmitBellwork"
     */
    onSubmitQuestionFunctionName?: string;
    /**
     * String to look for in the date column of the sheet to know that it's the
     *  last entry to look for question; will not go past the end of the sheet;
     *  default is 'END'
     */
    questionSheetDateColumnEnd?: string;
    /**
     * Whether or not to display question on form (default: true)
     */
    displayQuestionOnForm?: boolean;
    /**
     * Whether or not to display question on slide (default: true)
     */
    displayQuestionOnSlide?: boolean;
    /**
     * The default text to display if there is no question
     */
    noQuestionText?: string;
    /**
     * Whether to update the current date on the slide, works with
     *  slideDateTitle (default: false)
     */
    updateSlideDate?: boolean;
    /**
     * The title of the slide date alt text, works with updateSlideDate
     */
    slideDateTitle?: string;
    /**
     * Whether or not to display the exit ticket on slide; default is true
     */
    displayExitQuestionOnSlide?: boolean;
    /**
     * Whether or not to display the question response options on the slide;
     *  default is false
     */
    displayQuestionOptions?: boolean;
    /**
     * Whether or not to display the question question as the title of the slide;
     *  default is false
     */
    displayQuestionAsTitle?: boolean;
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
     * Parameters for displaying the current date; default is empty
     */
    displayDateParams?: DateParams;
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
 * Update the question with the associated parameters
 *
 * ```javascript
 * // Object to hold all of the date settings (all have default
 * // settings)
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
 *
 *   // What to display if there are no events
 *   noEventString: 'NONE',
 * };
 *
 * // These are all optional arguments - all have default values
 * // (see documentation)
 * var questionParams = {
 *   // The Settings Spreadsheet name
 *   dataSheet: 'gse-tools Settings',
 *
 *   // The sheet name within the Settings Spreadsheet that has
 *   // settings for each class
 *   settingsName: 'Bellwork',
 *
 *   // Column in the Settings sheet that has the classroom code
 *   // for the class
 *   classroomCodeColumnName: 'Classroom Code',
 *
 *   // Column in the Settings sheet that defines which column in the
 *   // question sheet to look for the question
 *   questionColumnName: 'Bellwork Column Number',
 *
 *   // Column in the Settings sheet that defines which column in the
 *   // question sheet to look for the date
 *   questionDateColumnName: 'Date Column',
 *
 *   // Object that defines how to display the date
 *   dueDateParams: dateParams,
 *
 *   // Whether or not to display the question on a Form
 *   displayQuestionOnForm: true,
 *
 *   // Column in the Settings sheet that has the question form
 *   // ID for the class
 *   questionFormIDColumnName: 'Form ID',
 *
 *   // Whether or not to display the question on a Slide
 *   displayQuestionOnSlide: true,
 *
 *   // Column in the Settings sheet that has the question slideshow
 *   // ID for the class
 *   questionSlideshowIDColumnName: 'Slideshow ID',
 *
 *   // When displaying the question on a Google Slide, put this string
 *   // in the slide notes and the script will put the question on that
 *   // slide
 *   questionSlideNotes: 'Bellwork',
 *
 *   // Column in the Settings sheet that has the question spreadsheet
 *   // ID for the class
 *   questionSpreadsheetIDColumnName: 'Spreadsheet ID',
 *
 *   // Column in the Settings sheet that defines the question title
 *   // for each class
 *   questionTitleColumnName: 'Bellwork Title',
 *
 *   // Whether or not to display the date in the question title
 *   dateInQuestionTitle: true,
 *
 *   // The function to call when a student submits question
 *   onSubmitQuestionFunctionName: 'onSubmitQuestion',
 *
 *   // Column in the Settings sheet that defines the sheet name to
 *   // look for all of the question info
 *   questionSheetNameColumnName: 'Sheet Name',
 *
 *   // Useful string to define when the question Spreadsheet no longer
 *   // has valid entries (so the user can put other information in the
 *   // sheet)
 *   questionSheetDateColumnEnd: 'END',
 *
 *   // Column in the Settings sheet that defines the folder which has
 *   // pictures that can be randomly chosen to be displayed on the
 *   // Slide
 *   dailyPicturesColumnName: 'Daily Picture Folder',
 *
 *   // When displaying a picture on a Slide, put this string in the
 *   // slide notes and the script will put the agenda on that slide
 *   dailyPicturesNotes: 'Agenda',
 *
 *   // Whether or not to display upcoming due dates
 *   displayUpcomingDueDates: true,
 *
 *   // Column in the Settings sheet that defines the number of days
 *   // to look ahead for due dates
 *   daysToLookAheadColumnName: '# of Days to Look',
 *
 *   // When displaying upcoming due dates on a Slide, put this string
 *   // in the slide notes and the script will put the due dates on
 *   // that slide
 *   upcomingDueDatesSlideNotes: 'Upcoming Due Dates',
 *
 *   // Whether or not to display the exit question on the slideshow
 *   displayExitQuestionOnSlide: true,
 *
 *   // Column in the Settings sheet that defines the column number
 *   // for the current exit question
 *   exitQuestionColumnName: 'Exit Question Column Number',
 *
 *   // When displaying an exit question on a Slide, put this string
 *   // in the slide notes and the script will put the exit question
 *   // on that slide
 *   exitQuestionSlideNotes: 'Exit Question',
 *
 *   // Column in the Settings sheet that defines the column number
 *   // for the question type (Paragraph, Multiple Choice, etc.)
 *   questionTypeColumnName: 'Question Type Column Number',
 *
 *   // Column in the Settings sheet that defines the column number
 *   // for the question options (for Multiple Choice, Select, etc.)
 *   optionsColumnName: 'Question Options Column Number',
 *
 *   // Column in the Settings sheet that defines the column number
 *   // for the grid rows options (for MC Grid, MS Grid question
 *   // types); the optionsColumnName will refer to the grid columns
 *   gridRowsColumnName: 'Grid Rows Column Number',
 *
 *   // Column in the Settings sheet that defines the column number
 *   // for the image to display with the question
 *   imageColumnName: 'Question Form Image Column',
 *
 *   // Set the current timezone
 *   timezoneOffset: -5,
 * };
 * gsetools.updateQuestion(questionParams);
 * ```
 *
 * @param {QuestionArgs} args the parameters
 */
export declare function updateQuestion(args?: QuestionArgs, slideDisplayArgs?: SlideDisplayParams): void;
/**
 * Take the submitted question and adds it to an existing Sheet for the
 *  submitting student and their response
 * ```javascript
 *  // Object to hold all of the date settings (all have default
 *  // settings)
 *  var dateParams = {
 *
 *   // String that will go between the date and the title
 *   titlePrefix: ' - ',
 *
 *   // Delimiter to go between the month and day of the date
 *   dateDelim: '/',
 *
 *   // The order to display the date; can be MD or DM
 *   dateOrder: 'MD',
 *
 *   // What to display if there are no events
 *   noEventString: 'NONE',
 * };
 *
 * var tabulateArgs = {
 *   // The name of the data settings sheet to use; defaults to
 *   // 'gse-tools Settings'
 *   dataSheet: 'gse-tools Settings',
 *
 *   // The name of the sheet on the data settings sheet for the question;
 *   // default is 'Bellwork'
 *   sheetName: 'Bellwork',
 *
 *   // The column name in the 'gse-tools Settings' sheet that contains the
 *   // sheet for the question results; default is 'Bellwork Results Sheet'
 *   questionResultsColumn: 'Bellwork Results Sheet',
 *
 *   // The column name in the 'gse-tools Settings' sheet that contains the
 *   // title for the associated bellwork form; default is 'Bellwork Title'
 *   questionTitleColumn: 'Bellwork Title',
 *
 *   // The column name in the 'gse-tools Settings' sheet that contains the
 *   // id for the results spreadsheet; default is 'Spreadsheet ID'
 *   spreadsheetIDColumn: 'Spreadsheet ID',
 *
 *   // Date parameters for constructing the date for the results sheet column
 *   // header
 *   columnDateParams: dateParams
 * };
 * gsetools.tabulateAnswers(e, tabulateArgs);
 * ```
 * @param {GoogleAppsScript.Events.FormsOnFormSubmit} event the Google Form
 *  event
 * @param {TabulateParams} args the tabulate answers parameters
 * @return {boolean} returns true if the answers were tabulated
 */
export declare function tabulateAnswers(event: GoogleAppsScript.Events.FormsOnFormSubmit, args?: TabulateParams): boolean;
export {};
