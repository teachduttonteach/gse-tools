import { SheetGS } from '../sheets/SheetGS';
import { FormsGS } from '../forms/FormsGS';
import { DateParams } from '../calendar/DateParams';
import { MapGS } from '../map/MapGS';
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
 * @param {BellworkArgs} args the parameters
 */
export declare function updateBellwork(args: BellworkArgs): void;
/**
 * Figure out the current question and determine whether to display it on
 *  a form or slides
 *
 * @param {BellworkArgs} args the passed arguments
 * @param {MapGS<string | Date, string | Date>} row the relevant information
 *  from the settings
 * @param {FormsGS} form the form to use for the question
 * @return {boolean} whether the question was found or not
 */
export declare function updateTodaysQuestion(args: BellworkArgs, row: MapGS<string | Date, string | Date>, form: FormsGS): boolean;
/**
 * Display bellwork on both the associated slideshow and form
 *
 * @param {BellworkArgs} args the passed arguments
 * @param {MapGS<string | Date, string | Date>} settingsRow the info about
 * the current date
 * @param {number} questionRow the row of the current question
 * @param {SheetGS} questionSheet the sheet containing the question
 * @param {string} questionTitle the title of the bellwork question
 * @param {string} questionType the type of the bellwork question
 *  class
 */
export declare function showBellworkOnSlide(args: BellworkArgs, settingsRow: MapGS<string | Date, string | Date>, questionRow: number, questionSheet: SheetGS, questionTitle: string, questionType: string): void;
/**
 * Displays the bellwork on a form
 *
 * @param {args} args the parameters for the function
 * @param {MapGS<string | Date, string | Date>} row the information for the
 *  current date
 * @param {FormsGS} bellworkForm the form to display the bellwork on
 * @param {number} questionRow the number of the current row
 * @param {SheetGS} questionSheet the sheet where the question info is
 * @param {string} questionTitle the title of the bellwork question
 * @param {string} questionType the type of the bellwork question
 */
export declare function showBellworkOnForm(args: BellworkArgs, row: MapGS<string | Date, string | Date>, bellworkForm: FormsGS, questionRow: number, questionSheet: SheetGS, questionTitle: string, questionType: string): void;
export {};
