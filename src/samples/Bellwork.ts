import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { DataSheet } from '../DataSheet';
import { Utilities } from '../utils/Utilities';
import { SheetGS } from '../sheets/SheetGS';
import { SlideshowGS } from '../slides/SlideshowGS';
import { FormsGS } from '../forms/FormsGS';
import { DateParams } from '../DateParams';
import { CalendarGS } from '../calendar/CalendarGS';
import { SlideGS } from '../slides/SlideGS';
import { QuestionType } from '../enums/QuestionType';
import { FormEventGS } from '../forms/FormEventGS';
import { ExitStatus } from '../../node_modules/typescript/lib/typescript';

/**
 * All of the arguments used by the tabulateBellwork function
 */
type TabulateParams = {
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
type BellworkArgs = {
  /**
   * Sheet name for the bellwork settings, contained on the gse-tools Settings
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
   *  the bellwork question; default is "Bellwork Column"
   */
  bellworkColumnName?: string;
  /**
   * Column name for the gse-tools Settings sheet column that contains the
   *  bellwork date column number; default is "Bellwork Date Column Number"
   */
  bellworkDateColumnName?: string;
  /**
   * String to look for in the alt text of the slide text boxes for this class;
   *  default is "Bellwork Alt Text"
   */
  bellworkAltText?: string;
  /**
   * Column name for the gse-tools Settings sheet column that contains the
   *  bellwork title to display before the current date on the form;
   *  default is "Bellwork Title"
   */
  bellworkTitleColumnName?: string;
  /**
   * Column name for the gse-tools Settings sheet column that contains the
   *  bellwork slide notes string to look for in the slide that has the 
   *  bellwork; default is 'Bellwork Slide Notes'
   */
   bellworkSlideNotesColumnName?: string;
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
   * Whether or not to display the bellwork response options on the slide;
   *  default is false
   */
  displayBellworkOptions?: boolean;
  /**
   * Whether or not to display the bellwork question as the title of the slide;
   *  default is false
   */
  displayBellworkAsTitle?: boolean;

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
 * var bellworkParams = {
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
 *   // bellwork sheet to look for the bellwork
 *   bellworkColumnName: 'Bellwork Column Number',
 *
 *   // Column in the Settings sheet that defines which column in the
 *   // bellwork sheet to look for the date
 *   bellworkDateColumnName: 'Date Column',
 *
 *   // Object that defines how to display the date
 *   dueDateParams: dateParams,
 *
 *   // Whether or not to display the bellwork on a Form
 *   displayBellworkOnForm: true,
 *
 *   // Column in the Settings sheet that has the bellwork form
 *   // ID for the class
 *   bellworkFormIDColumnName: 'Form ID',
 *
 *   // Whether or not to display the bellwork on a Slide
 *   displayBellworkOnSlide: true,
 *
 *   // Column in the Settings sheet that has the bellwork slideshow
 *   // ID for the class
 *   bellworkSlideshowIDColumnName: 'Slideshow ID',
 *
 *   // When displaying the bellwork on a Google Slide, put this string
 *   // in the slide notes and the script will put the bellwork on that
 *   // slide
 *   bellworkSlideNotes: 'Bellwork',
 *
 *   // Column in the Settings sheet that has the bellwork spreadsheet
 *   // ID for the class
 *   bellworkSpreadsheetIDColumnName: 'Spreadsheet ID',
 *
 *   // Column in the Settings sheet that defines the bellwork title
 *   // for each class
 *   bellworkTitleColumnName: 'Bellwork Title',
 *
 *   // Whether or not to display the date in the bellwork title
 *   dateInBellworkTitle: true,
 *
 *   // The function to call when a student submits bellwork
 *   onSubmitBellworkFunctionName: 'onSubmitBellwork',
 *
 *   // Column in the Settings sheet that defines the sheet name to
 *   // look for all of the bellwork info
 *   bellworkSheetNameColumnName: 'Sheet Name',
 *
 *   // Useful string to define when the bellwork Spreadsheet no longer
 *   // has valid entries (so the user can put other information in the
 *   // sheet)
 *   bellworkSheetDateColumnEnd: 'END',
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
 *   // for the image to display with the bellwork
 *   imageColumnName: 'Bellwork Form Image Column',
 *
 *   // Set the current timezone
 *   timezoneOffset: -5,
 * };
 * gsetools.updateBellwork(bellworkParams);
 * ```
 *
 * @param {BellworkArgs} args the parameters
 */
export function updateBellwork(args: BellworkArgs): void {
  if (args == null) args = {} as BellworkArgs;
  const {
    settingsName = 'Bellwork',
    bellworkFormIDColumnName = 'Bellwork Form ID',
    onSubmitBellworkFunctionName = 'onSubmitBellwork',
    bellworkSpreadsheetIDColumnName = 'Bellwork Spreadsheet ID',
    dataSheet,
  } = args;

  const dataSheetInterface = new DataSheet();

  const settings: SpreadsheetGS = dataSheetInterface.getDataSheet(dataSheet, settingsName);
  const bellworkSettings: Map<string | Date, Map<string | Date, string | Date>> = settings.getDataAsMap(
    settingsName,
  );

  bellworkSettings.forEach(function(thisRow, row) {
    if (thisRow === null || bellworkFormIDColumnName === null || bellworkSpreadsheetIDColumnName === null) {
      throw new Error('Could not find row in bellworkSettings');
    }

    const thisBellworkForm = thisRow.get(bellworkFormIDColumnName);
    if (thisBellworkForm === undefined || typeof thisBellworkForm !== 'string') {
      throw new Error('Bellwork form column not found');
    }

    const thisSpreadsheet = thisRow.get(bellworkSpreadsheetIDColumnName);
    if (thisSpreadsheet === undefined) {
      throw new Error('Bellwork spreadsheet ID column not found');
    }

    const thisForm = new FormsGS(thisBellworkForm);
    thisForm.replaceTrigger('S', onSubmitBellworkFunctionName);
    updateTodaysQuestion(args, thisRow, thisForm);
  });
}

/**
 * Figure out the current question and determine whether to display it on
 *  a form or slides
 *
 * @param {BellworkArgs} args the passed arguments
 * @param {Map<string | Date, string | Date>} row the relevant information
 *  from the settings
 * @param {FormsGS} form the form to use for the question
 * @return {boolean} whether the question was found or not
 */
function updateTodaysQuestion(args: BellworkArgs, row: Map<string | Date, string | Date>, form: FormsGS): boolean {
  const {
    bellworkDateColumnName = 'Date',
    bellworkAltText = 'Bellwork Alt Text',
    bellworkSpreadsheetIDColumnName = 'Spreadsheet',
    bellworkSheetNameColumnName = 'Sheet Name',
    bellworkSheetDateColumnEnd = 'END',
    bellworkColumnName = 'Bellwork',
    questionTypeColumnName = 'Question Type',
    displayBellworkOnForm = true,
    displayBellworkOnSlide = true,
    displayExitQuestionOnSlide = true,
    displayUpcomingDueDates = true,
    timezoneOffset = -5,
  } = args;

  const utilitiesInterface = new Utilities();

  const dateToday: Date = utilitiesInterface.getTodaysDate(timezoneOffset);

  const thisSpreadsheetID = row.get(bellworkSpreadsheetIDColumnName);
  if (thisSpreadsheetID == null || typeof thisSpreadsheetID !== 'string') {
    throw new Error('Could not find spreadsheet column name in ' + 'Bellwork.updateTodaysQuestion()');
  }

  const thisSheetName = row.get(bellworkSheetNameColumnName);
  if (thisSheetName == null || typeof thisSheetName !== 'string') {
    throw new Error(
      'Could not find sheet name column name (' + bellworkSheetNameColumnName + ') in Bellwork.updateTodaysQuestion()',
    );
  }

  // TODO: Make Map of open spreadsheets
  const questionSpreadsheet: SpreadsheetGS = new SpreadsheetGS(thisSpreadsheetID, thisSheetName);
  const questionSheet: SheetGS = questionSpreadsheet.getSheet(thisSheetName);

  let questionRow: number = 1; //questionSheet.skipBlankRows(1, +thisBellworkDateColumnName);
  while (
    questionRow <= questionSheet.getLastRow() &&
    questionSheet.getValueFromColumnHeader(questionRow, bellworkDateColumnName) !== bellworkSheetDateColumnEnd
  ) {
    const dateInCell: Date = new Date(questionSheet.getValueFromColumnHeader(questionRow, bellworkDateColumnName));

    if (utilitiesInterface.areDatesEqual(dateToday, dateInCell, 'month')) {
      const questionTitle: string = questionSheet.getValueFromColumnHeader(questionRow, bellworkColumnName).toString();

      let thisQuestionTypeString: QuestionType | undefined = (<any>QuestionType)[
        questionSheet.getValueFromColumnHeader(questionRow, questionTypeColumnName).toString()
      ];
      if (thisQuestionTypeString === undefined || !(thisQuestionTypeString in QuestionType)) {
        console.log(
          "WARNING: Question type '" +
            thisQuestionTypeString +
            "' not a valid question type in Bellwork.updateTodaysQuestion()",
        );
        thisQuestionTypeString = QuestionType.Paragraph;
      }

      if (displayBellworkOnForm) {
        showBellworkOnForm(args, row, form, questionRow, questionSheet, questionTitle, thisQuestionTypeString);
      }

      if (displayBellworkOnSlide || displayExitQuestionOnSlide || displayUpcomingDueDates) {
        const thisBellworkAltText = row.get(bellworkAltText);
        if (thisBellworkAltText == null || typeof thisBellworkAltText !== 'string') {
          throw new Error(
            'Could not find bellwork alt text column name (' + bellworkAltText + ') in Bellwork.updateTodaysQuestion()',
          );
        }

        showClassInfoOnSlide(
          args,
          row,
          questionRow,
          questionSheet,
          questionTitle,
          thisQuestionTypeString,
          thisBellworkAltText,
        );
      }
      return true;
    }
    questionRow++;
  }
  return false;
}

/**
 * Display bellwork on both the associated slideshow and form
 *
 * @param {BellworkArgs} args the passed arguments
 * @param {Map<string | Date, string | Date>} settingsRow the info about
 * the current date
 * @param {number} questionRow the row of the current question
 * @param {SheetGS} questionSheet the sheet containing the question
 * @param {string} questionTitle the title of the bellwork question
 * @param {QuestionType} questionType the type of the bellwork question
 *  class
 */
function showClassInfoOnSlide(
  args: BellworkArgs,
  settingsRow: Map<string | Date, string | Date>,
  questionRow: number,
  questionSheet: SheetGS,
  questionTitle: string,
  questionType: QuestionType,
  bellworkAltText: string,
): void {
  const {
    bellworkSlideshowIDColumnName = 'Bellwork Slideshow ID',
    displayBellworkOnSlide = true,
    displayExitQuestionOnSlide = true,
    displayUpcomingDueDates = true,
  } = args;

  const thisSlideshowID = settingsRow.get(bellworkSlideshowIDColumnName);
  if (thisSlideshowID == null || typeof thisSlideshowID !== 'string') {
    throw new Error('Could not find slide show ID in showClassInfoOnSlide()');
  }
  const slideShow = new SlideshowGS(thisSlideshowID);

  showDailyImage(args, settingsRow, slideShow);

  if (displayBellworkOnSlide) showBellworkOnSlide(args, 
    settingsRow, 
    questionRow, 
    questionSheet, 
    questionTitle,
    questionType,
    bellworkAltText,
    slideShow);

  if (displayUpcomingDueDates) showUpcomingDueDates(args, 
    settingsRow, 
    slideShow);

  if (displayExitQuestionOnSlide) showExitQuestion(args,
    questionRow,
    questionSheet,
    slideShow);
}

/**
 * Display the daily image for the slideshow
 * 
 * @param {BellworkArgs} args the passed arguments
 * @param {Map<string | Date, string | Date>} settingsRow the info about
 * the current date
 * @param {SlideshowGS} slideShow the current slideshow
 */
function showDailyImage(
  args: BellworkArgs,
  settingsRow: Map<string | Date, string | Date>,
  slideShow: SlideshowGS,
) {
  const {
    dailyPicturesColumnName = 'Daily Pictures Folder ID',
    dailyPicturesNotes = 'Daily Pictures',
  } = args;

  const thisBellworkImageFolder = settingsRow.get(dailyPicturesColumnName);
  if ((thisBellworkImageFolder !== undefined) && (thisBellworkImageFolder !== null) && (thisBellworkImageFolder != '')) {
    const thisSlide = slideShow.getSlideByNotes(dailyPicturesNotes);
    if (thisSlide != null) {
      slideShow.changeSlidePictureFromFolder(thisBellworkImageFolder.toString(), thisSlide);
    }
  }
}

/**
 * Display exit question on both the associated slideshow
 *
 * @param {BellworkArgs} args the passed arguments
 * @param {number} questionRow the row of the current question
 * @param {SheetGS} questionSheet the sheet containing the question
 * @param {string} questionTitle the title of the bellwork question
 * @param {SlideshowGS} slideShow the current slideshow
 *  class
 */
 function showExitQuestion(
  args: BellworkArgs,
  questionRow: number,
  questionSheet: SheetGS,
  slideShow: SlideshowGS
): void {
  const {
    exitQuestionColumnName = 'Exit Ticket',
    exitQuestionSlideNotes = 'Exit Question',
  } = args;

  const exitQuestion: string = questionSheet.getValueFromColumnHeader(questionRow, exitQuestionColumnName).toString();
  if (exitQuestion != '') {
    slideShow.setSlideBodyByType(
      exitQuestionSlideNotes,
      exitQuestion
    );
  }
}

/**
 * Displays upcoming due dates taken from Google Classroom on a slide
 * 
 * @param args 
 * @param settingsRow 
 * @param slideShow 
 */
function showUpcomingDueDates(
  args: BellworkArgs,
  settingsRow: Map<string | Date, string | Date>,
  slideShow: SlideshowGS,
) {
  const {
    daysToLookAheadColumnName = 'Days to Look Ahead',
    upcomingDueDatesSlideNotes = 'Upcoming Due Dates',
    dueDateParams = {} as DateParams,
    classroomCodeColumnName = 'Classroom Code',
    timezoneOffset = -5,
  } = args;

  const allClasses: ClassroomGS = new ClassroomGS();
  const thisClassroomCode = settingsRow.get(classroomCodeColumnName);
  if (thisClassroomCode === undefined || typeof thisClassroomCode !== 'string') {
    throw new Error('Classroom code not found');
  }
  const currentClass = allClasses.getClass(thisClassroomCode);

  const thisDaysToLookAhead = settingsRow.get(daysToLookAheadColumnName);
  if (thisDaysToLookAhead == null) {
    throw new Error('Could not find days to look ahead in ' + 'Samples.doForBellwork()');
  }
  const upcomingEvents: string = new CalendarGS(currentClass.getCalendarId(), timezoneOffset).getUpcomingDueDates(
    +thisDaysToLookAhead,
    dueDateParams,
  );
  const thisSlide = slideShow.getSlideByNotes(upcomingDueDatesSlideNotes);
  if (thisSlide != null) thisSlide.setList(upcomingEvents);
}

/**
 * Displays the current bellwork on the appropriate slide
 * 
 * @param {BellworkArgs} args the passed arguments
 * @param {Map<string | Date, string | Date>} settingsRow the info about
 * the current date
 * @param {number} questionRow the row of the current question
 * @param {SheetGS} questionSheet the sheet containing the question
 * @param {string} questionTitle the title of the bellwork question
 * @param {QuestionType} questionType the type of the bellwork question
 * @param {string} bellworkAltText the title text to look for to find the 
 *  bellwork text box
 * @param {SlideshowGS} slideShow the current slideshow
 */
function showBellworkOnSlide(
  args: BellworkArgs,
  settingsRow: Map<string | Date, string | Date>,
  questionRow: number,
  questionSheet: SheetGS,
  questionTitle: string,
  questionType: QuestionType,
  bellworkAltText: string,    
  slideShow: SlideshowGS,
) {
  const {
    bellworkSlideNotes = 'Bellwork',
    bellworkSlideNotesColumnName = 'Bellwork Slide Notes',
    optionsColumnName = 'Options',
    imageColumnName = 'Picture',
    displayBellworkOptions = false,
    displayBellworkAsTitle = false,
  } = args;

  // Finds the slide with the Bellwork on it
  let bellworkSlide = slideShow.getSlideByNotes(bellworkSlideNotes);

  // If there is a more specific slide to get, grab it based on the notes
  const theseSlideNotes = settingsRow.get(bellworkSlideNotesColumnName);
  if (theseSlideNotes != null) {
    bellworkSlide = slideShow.getSlideByNotes(theseSlideNotes.toString());
  }

  if (bellworkSlide != null) {
    if (displayBellworkOptions) {
      const theseOptions = questionSheet.getValueFromColumnHeader(questionRow, optionsColumnName).toString();
      if (theseOptions !== null && theseOptions != '') {
        bellworkSlide.addItem(questionType, theseOptions);
      }
    }
    if (displayBellworkAsTitle) bellworkSlide.setTitle(questionTitle);
    else slideShow.setSlideTextByTitle(bellworkAltText, questionTitle);

    const thisBellworkImage = questionSheet.getValueFromColumnHeader(questionRow, imageColumnName).toString();
    if ((thisBellworkImage != null) && (thisBellworkImage != "")) {
      slideShow.changeSlidePicture(thisBellworkImage, bellworkSlide);  
    }
  }

}

/**
 * Displays the bellwork on a form
 *
 * @param {args} args the parameters for the function
 * @param {Map<string | Date, string | Date>} row the information for the
 *  current date
 * @param {FormsGS} bellworkForm the form to display the bellwork on
 * @param {number} questionRow the number of the current row
 * @param {SheetGS} questionSheet the sheet where the question info is
 * @param {string} questionTitle the title of the bellwork question
 * @param {QuestionType} questionType the type of the bellwork question
 */
function showBellworkOnForm(
  args: BellworkArgs,
  row: Map<string | Date, string | Date>,
  bellworkForm: FormsGS,
  questionRow: number,
  questionSheet: SheetGS,
  questionTitle: string,
  questionType: QuestionType,
) {
  const {
    bellworkTitleColumnName = 'Bellwork Title',
    dateInBellworkTitle = true,
    optionsColumnName = 'Options',
    gridRowsColumnName = 'Grid Rows Column Number',
    imageColumnName = 'Image Column',
    dueDateParams = {} as DateParams,
    timezoneOffset = -5,
  } = args;

  const { dateOrder = 'MD', dateDelim = '/' } = dueDateParams;
  const utilitiesInterface = new Utilities();

  const dateToday: Date = utilitiesInterface.getTodaysDate(timezoneOffset);

  let thisBellworkTitleColumnName = row.get(bellworkTitleColumnName);
  if (thisBellworkTitleColumnName == null || typeof thisBellworkTitleColumnName !== 'string') {
    thisBellworkTitleColumnName = 'Bellwork';
  }

  if (dateInBellworkTitle) {
    const thisMonth = Number(dateToday.getUTCMonth()) + 1;
    const thisDay = dateToday.getUTCDate();

    if (dateOrder.indexOf('M') > dateOrder.indexOf('D')) {
      thisBellworkTitleColumnName += ' ' + thisDay + dateDelim + thisMonth;
    } else {
      thisBellworkTitleColumnName += ' ' + thisMonth + dateDelim + thisDay;
    }
  }
  bellworkForm.deleteItems().setTitle(thisBellworkTitleColumnName);

  const theseGridRowsColumnName = row.get(gridRowsColumnName);
  let theseOptionsValue: string = questionSheet.getValueFromColumnHeader(questionRow, optionsColumnName).toString();

  if (theseOptionsValue != '') {
    let theseRowsValue: string = '';
    if ((theseGridRowsColumnName !== undefined) && (theseGridRowsColumnName !== null)) {
      theseRowsValue = questionSheet.getValue(questionRow, +theseGridRowsColumnName).toString();
    }
    if (theseRowsValue != '') {
      bellworkForm.addItem(
        questionTitle,
        questionType,
        bellworkForm.convertLinebreaksToList(theseOptionsValue),
        bellworkForm.convertLinebreaksToList(theseRowsValue),
      );
    } else {
      bellworkForm.addItem(questionTitle, questionType, bellworkForm.convertLinebreaksToList(theseOptionsValue));
    }
  } else {
    bellworkForm.addItem(questionTitle, questionType);
  }

  const thisImageColumnNumber = row.get(imageColumnName);
  if ((thisImageColumnNumber !== undefined) && (thisImageColumnNumber !== null)) {
    const imageFileID: string = questionSheet.getValue(questionRow, +thisImageColumnNumber).toString();
    if (imageFileID != '') {
      const thisImageBlob: GoogleAppsScript.Base.Blob | boolean = new DriveGS().getImageBlob(imageFileID);
      if (thisImageBlob !== false) {
        bellworkForm.addImage(thisImageBlob);
      }
    }
  }
}

/**
 * Take the submitted bellwork and adds it to an existing Sheet for the
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
 *   // The name of the sheet on the data settings sheet for the bellwork;
 *   // default is 'Bellwork'
 *   sheetName: 'Bellwork',
 *
 *   // The column name in the 'gse-tools Settings' sheet that contains the
 *   // sheet for the bellwork results; default is 'Bellwork Results Sheet'
 *   bellworkResultsColumn: 'Bellwork Results Sheet',
 *
 *   // The column name in the 'gse-tools Settings' sheet that contains the
 *   // title for the associated bellwork form; default is 'Bellwork Title'
 *   bellworkTitleColumn: 'Bellwork Title',
 *
 *   // The column name in the 'gse-tools Settings' sheet that contains the
 *   // id for the results spreadsheet; default is 'Spreadsheet ID'
 *   spreadsheetIDColumn: 'Spreadsheet ID',
 *
 *   // Date parameters for constructing the date for the results sheet column
 *   // header
 *   columnDateParams: dateParams
 * };
 * gsetools.tabulateBellwork(e, tabulateArgs);
 * ```
 * @param {GoogleAppsScript.Events.FormsOnFormSubmit} event the Google Form
 *  event
 * @param {TabulateParams} args the tabulate bellwork parameters
 * @return {boolean} returns true if the bellwork was tabulated
 */
export function tabulateBellwork(event: GoogleAppsScript.Events.FormsOnFormSubmit, args?: TabulateParams): boolean {
  const formEvent: FormEventGS = new FormEventGS(event);
  if (args == undefined) args = {} as TabulateParams;
  const {
    bellworkResultsColumn = 'Bellwork Results Sheet',
    dataSheet = 'gse-tools Settings',
    sheetName = 'Bellwork',
    bellworkTitleColumn = 'Bellwork Title',
    spreadsheetIDColumn = 'Spreadsheet ID',
    columnDateParams = {} as DateParams,
  } = args;

  const formTitle = formEvent.getTitle();
  const response = formEvent.getItemResponse(0);
  if (response instanceof Array) {
    throw new Error('Bellwork form response ' + 'needs to have single values only in tabulateBellwork()');
  }
  const title = formEvent.getFullDate(columnDateParams) + '\n' + formEvent.getItemTitle(0);
  const fullName: [string, string] = formEvent.getNameFromEmail();
  if (fullName.length != 2) {
    throw new Error('Could not get name from email' + ' in tabulateBellwork()');
  }

  const dataSheetInterface = new DataSheet();

  const allClasses = dataSheetInterface.getDataSheet(dataSheet, sheetName).getDataAsMap(sheetName);

  let destinationSheetName: string = '';
  let bellworkSheetID: string = '';

  for (const className of allClasses.keys()) {
    const classData = allClasses.get(className);
    if (classData != null && classData != undefined) {
      const bellworkTitle = classData.get(bellworkTitleColumn);
      if (bellworkTitle != null && bellworkTitle != undefined) {
        if (formTitle.indexOf(bellworkTitle.toString()) == 0) {
          const bellworkResultsSheetName = classData.get(bellworkResultsColumn);
          if (bellworkResultsSheetName != null && bellworkResultsSheetName != undefined) {
            destinationSheetName = bellworkResultsSheetName.toString();
          } else {
            throw new Error(
              'Could not find bellwork results sheet for ' +
                ' class "' +
                className +
                '" in column "' +
                bellworkResultsColumn +
                '" for tabulateBellwork()',
            );
          }

          const spreadsheetID = classData.get(spreadsheetIDColumn);
          if (spreadsheetID == null || spreadsheetID == undefined) {
            throw new Error(
              'Could not find bellwork results sheet ID for ' +
                ' class "' +
                className +
                '" in column "' +
                spreadsheetIDColumn +
                '" for tabulateBellwork()',
            );
          }
          bellworkSheetID = spreadsheetID.toString();
        }
      } else {
        throw new Error(
          'Could not find bellwork title for class "' +
            className +
            '" in column "' +
            bellworkTitleColumn +
            '" in tabulateBellwork()',
        );
      }
    } else {
      throw new Error('Could not find data for class "' + className + '" in tabulateBellwork()');
    }
  }

  const responseSheet = new SpreadsheetGS(bellworkSheetID, destinationSheetName).getSheet(destinationSheetName);
  if (responseSheet.getValue(1, 3) != title) {
    responseSheet.insertCol(3).setValue(title, 1, 3);
  }

  let foundName: boolean = false;
  const lastRow: number = responseSheet.getLastRow();
  for (let i = 2; i <= lastRow; i++) {
    if (responseSheet.getValue(i, 1) == fullName[0] && responseSheet.getValue(i, 2) == fullName[1]) {
      responseSheet.setValue(response, i, 3);
      foundName = true;
      break;
    }
  }
  if (!foundName) {
    responseSheet.setValues([[fullName[0], fullName[1], response]], lastRow + 1, 1, 1, 3);
  }

  return true;
}
