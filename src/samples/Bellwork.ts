import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { DataSheet } from '../DataSheet';
import { Utilities } from '../utils/Utilities';
import { SheetGS } from '../sheets/SheetGS';
import { SlideDisplayParams, SlideshowGS, TextBoxSlideParams } from '../slides/SlideshowGS';
import { FormsGS } from '../forms/FormsGS';
import { DateParams, DateUtilities } from '../DateParams';
import { CalendarGS } from '../calendar/CalendarGS';
import { QuestionType } from '../enums/QuestionType';
import { FormEventGS } from '../forms/FormEventGS';
import { SampleUtilities } from './SampleUtilities';

/**
 * All of the arguments used by the tabulateQuestion function
 */
type TabulateParams = {
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
type QuestionArgs = {
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
export function updateQuestion(args: QuestionArgs = {}, slideDisplayArgs: SlideDisplayParams = {}): void {
  const {
    settingsName = 'Bellwork',
    questionFormIDColumnName = 'Bellwork Form ID',
    onSubmitQuestionFunctionName = 'onSubmitQuestion',
    questionSpreadsheetIDColumnName = 'Bellwork Spreadsheet ID',
    questionSlideshowIDColumnName = 'Bellwork Slideshow ID',
    dataSheet,
    questionDateColumnName = 'Date',
    questionSheetNameColumnName = 'Sheet Name',
    questionSheetDateColumnEnd = 'END',
    questionColumnName = 'Bellwork',
    questionTypeColumnName = 'Question Type',
    displayQuestionOnForm = true,
    displayQuestionOnSlide = true,
    displayUpcomingDueDates = true,
    updateSlideDate = false,
    timezoneOffset = -5,
  } = args;

  const dataSheetInterface = new DataSheet();

  const settings: SpreadsheetGS = dataSheetInterface.getDataSheet(dataSheet, settingsName);
  const questionSettings: Map<string | Date, Map<string | Date, string | Date>> = settings.getDataAsMap(
    settingsName,
  );
  const utils = new Utilities();

  const dateToday: Date = utils.getTodaysDate(timezoneOffset);
  const sampleUtils = new SampleUtilities();


  // For each entry (usually class) in the settings sheet
  questionSettings.forEach(function(thisRow) {

    // Get the spreadsheet that holds all of the questions
    const questionSheet: SheetGS = sampleUtils._getSecondarySheet(
      thisRow, 
      questionSpreadsheetIDColumnName, 
      questionSheetNameColumnName);

    // Get the current slideshow
    const slideShow: SlideshowGS | undefined = sampleUtils._getSlideshow(
      thisRow, 
      displayQuestionOnSlide || displayUpcomingDueDates, 
      questionSlideshowIDColumnName);
  
    // The row of the question
    let questionRow: number = 1; //questionSheet.skipBlankRows(1, +thisQuestionDateColumnName);

    // As long as there are more questions
    while (
      questionRow <= questionSheet.getLastRow() &&
      questionSheet.getValueFromColumnHeader(questionRow, questionDateColumnName) !== questionSheetDateColumnEnd
    ) {

      // Get the date inside the current cell
      const dateInCell: Date = new Date(questionSheet.getValueFromColumnHeader(questionRow, questionDateColumnName));
  
      // If this is today, then process
      if (utils.areDatesEqual(dateToday, dateInCell, 'month')) {
        const questionTitle: string = questionSheet.getValueFromColumnHeader(questionRow, questionColumnName).toString();
  
        let thisQuestionTypeString = sampleUtils._getQuestionTypeString(questionSheet, questionRow, questionTypeColumnName);
  
        if (displayQuestionOnForm) {
            const thisQuestionForm = thisRow.get(questionFormIDColumnName);
            if (thisQuestionForm !== undefined && typeof thisQuestionForm === 'string') {
                const thisForm = new FormsGS(thisQuestionForm);
                thisForm.replaceTrigger('S', onSubmitQuestionFunctionName);
                showQuestionOnForm(
                  args, 
                  thisRow, 
                  thisForm, 
                  questionRow, 
                  questionSheet, 
                  questionTitle, 
                  thisQuestionTypeString);
            }
        }    
        
        if (updateSlideDate && slideShow !== undefined) {
          updateDateOnSlide(
            args,
            dateToday,
            slideShow
          );
        }
  
        if (displayQuestionOnSlide && slideShow !== undefined) {

          showQuestionOnSlide(
            args, 
            thisRow, 
            questionRow, 
            questionSheet, 
            questionTitle,
            thisQuestionTypeString,
            slideShow,
            slideDisplayArgs);        
        } 
        
        if (displayUpcomingDueDates && slideShow !== undefined) {
          showUpcomingDueDates(
            args, 
            thisRow, 
            slideShow);
        }
        return true;
      }
      questionRow++;
    }
    return false;
  });
}

function updateDateOnSlide(args: QuestionArgs, dateToday: Date, slideShow: SlideshowGS) {
  const {
    slideDateTitle = "Date",
    displayDateParams = {} as DateParams,  
  } = args;

  const dateUtilitiesInterface = new DateUtilities();
  slideShow.setSlideTextByTitle(
    slideDateTitle, 
    dateUtilitiesInterface.formatTodaysDate(displayDateParams, dateToday), 
    true)
}

/**
 * Display the daily image for the slideshow
 * 
 * @param {QuestionArgs} args the passed arguments
 * @param {Map<string | Date, string | Date>} settingsRow the info about
 * the current date
 * @param {SlideshowGS} slideShow the current slideshow
 */
function showDailyImage(
  args: QuestionArgs,
  settingsRow: Map<string | Date, string | Date>,
  slideShow: SlideshowGS,
) {
  const {
    dailyPicturesColumnName = 'Daily Pictures Folder ID',
    dailyPicturesNotes = 'Daily Pictures',
  } = args;

  const thisQuestionImageFolder = settingsRow.get(dailyPicturesColumnName);
  if ((thisQuestionImageFolder !== undefined) && (thisQuestionImageFolder !== null) && (thisQuestionImageFolder != '')) {
    const thisSlide = slideShow.getSlideByNotes(dailyPicturesNotes);
    if (thisSlide != null) {
      slideShow.changeSlidePictureFromFolder(thisQuestionImageFolder.toString(), thisSlide);
    }
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
  args: QuestionArgs,
  settingsRow: Map<string | Date, string | Date>,
  slideShow: SlideshowGS,
) {
  const {
    daysToLookAheadColumnName = DAYS_TO_LOOK_AHEAD_COLUMN,
    upcomingDueDatesSlideNotes = UPCOMING_DUE_DATES_SLIDE_NOTES,
    dueDateParams = {} as DateParams,
    classroomCodeColumnName = CLASSROOM_CODE_COLUMN,
    timezoneOffset = -5,
  } = args;

  const allClasses: ClassroomGS = new ClassroomGS();
  const thisClassroomCode = settingsRow.get(classroomCodeColumnName);
  if (thisClassroomCode === undefined || typeof thisClassroomCode !== 'string') {
    throw new Error('Classroom code not found in showUpcomingDueDates()');
  }
  const currentClass = allClasses.getClass(thisClassroomCode);

  const thisDaysToLookAhead = settingsRow.get(daysToLookAheadColumnName);
  if (thisDaysToLookAhead == null) {
    throw new Error('Could not find days to look ahead in showUpcomingDueDates()');
  }
  const upcomingEvents: string = new CalendarGS(currentClass.getCalendarId(), timezoneOffset).getUpcomingDueDates(
    +thisDaysToLookAhead,
    dueDateParams,
  );
  const thisSlide = slideShow.getSlideByNotes(upcomingDueDatesSlideNotes);
  if (thisSlide != null) thisSlide.setList(upcomingEvents);
}

/**
 * Displays the current question on the appropriate slide
 * 
 * @param {QuestionArgs} args the passed arguments
 * @param {Map<string | Date, string | Date>} settingsRow the info about
 * the current date
 * @param {number} questionRow the row of the current question
 * @param {SheetGS} questionSheet the sheet containing the question
 * @param {string} questionTitle the title of the question
 * @param {QuestionType} questionType the type of the question
 * @param {string} altTextTitle the title text to look for to find the 
 *  question text box
 * @param {SlideshowGS} slideShow the current slideshow
 */
function showQuestionOnSlide(
  args: QuestionArgs,
  settingsRow: Map<string | Date, string | Date>,
  questionRow: number,
  questionSheet: SheetGS,
  questionTitle: string,
  questionType: QuestionType,
  slideShow: SlideshowGS,
  slideDisplayParams: SlideDisplayParams,
) {
  const {
    optionsColumnName = OPTIONS_COLUMN,
    imageColumnName = PICTURE_COLUMN,
  } = args;

  const textBoxSlideParams: TextBoxSlideParams = {
    imageLink: questionSheet.getValueFromColumnHeader(questionRow, imageColumnName).toString(),
    optionsToDisplay: questionSheet.getValueFromColumnHeader(questionRow, optionsColumnName).toString(),
    optionsType: questionType,
  };

  slideShow.setTextBoxOrTitleOnSlide(slideDisplayParams, textBoxSlideParams, settingsRow, questionTitle);

}

/**
 * Displays the question on a form
 *
 * @param {args} args the parameters for the function
 * @param {Map<string | Date, string | Date>} row the information for the
 *  current date
 * @param {FormsGS} questionForm the form to display the question on
 * @param {number} questionRow the number of the current row
 * @param {SheetGS} questionSheet the sheet where the question info is
 * @param {string} questionTitle the title of the question
 * @param {QuestionType} questionType the type of the question
 */
function showQuestionOnForm(
  args: QuestionArgs,
  row: Map<string | Date, string | Date>,
  questionForm: FormsGS,
  questionRow: number,
  questionSheet: SheetGS,
  questionTitle: string,
  questionType: QuestionType,
) {
  const {
    questionTitleColumnName = QUESTION_TITLE_COLUMN,
    dateInQuestionTitle = true,
    optionsColumnName = OPTIONS_COLUMN,
    gridRowsColumnName = GRID_ROWS_COLUMN,
    imageColumnName = IMAGE_COLUMN,
    dueDateParams = {} as DateParams,
    timezoneOffset = DEFAULT_TIMEZONE_OFFSET,
  } = args;

  const { 
    dateOrder = DEFAULT_DATE_ORDER, 
    dateDelim = DEFAULT_DATE_DELIM 
  } = dueDateParams;

  const utils = new Utilities();

  const dateToday: Date = utils.getTodaysDate(timezoneOffset);

  let thisQuestionTitleColumnName = row.get(questionTitleColumnName);
  if (thisQuestionTitleColumnName == null || typeof thisQuestionTitleColumnName !== 'string') {
    thisQuestionTitleColumnName = QUESTION_TITLE_COLUMN_NAME;
  }

  if (dateInQuestionTitle) {
    const thisMonth = Number(dateToday.getUTCMonth()) + 1;
    const thisDay = dateToday.getUTCDate();

    if (dateOrder.indexOf('M') > dateOrder.indexOf('D')) {
      thisQuestionTitleColumnName += ' ' + thisDay + dateDelim + thisMonth;
    } else {
      thisQuestionTitleColumnName += ' ' + thisMonth + dateDelim + thisDay;
    }
  }
  questionForm.deleteItems().setTitle(thisQuestionTitleColumnName);

  const theseGridRowsColumnName = row.get(gridRowsColumnName);
  let theseOptionsValue: string = questionSheet.getValueFromColumnHeader(questionRow, optionsColumnName).toString();

  if (theseOptionsValue != '') {
    let theseRowsValue: string = '';
    if ((theseGridRowsColumnName !== undefined) && (theseGridRowsColumnName !== null)) {
      theseRowsValue = questionSheet.getValue(questionRow, +theseGridRowsColumnName).toString();
    }
    if (theseRowsValue != '') {
      questionForm.addItem(
        questionTitle,
        questionType,
        questionForm.convertLinebreaksToList(theseOptionsValue),
        questionForm.convertLinebreaksToList(theseRowsValue),
      );
    } else {
      questionForm.addItem(questionTitle, questionType, questionForm.convertLinebreaksToList(theseOptionsValue));
    }
  } else {
    questionForm.addItem(questionTitle, questionType);
  }

  const thisImageColumnNumber = row.get(imageColumnName);
  if ((thisImageColumnNumber !== undefined) && (thisImageColumnNumber !== null)) {
    const imageFileID: string = questionSheet.getValue(questionRow, +thisImageColumnNumber).toString();
    if (imageFileID != '') {
      const thisImageBlob: GoogleAppsScript.Base.Blob | boolean = new DriveGS().getImageBlob(imageFileID);
      if (thisImageBlob !== false) {
        questionForm.addImage(thisImageBlob);
      }
    }
  }
}

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
export function tabulateAnswers(event: GoogleAppsScript.Events.FormsOnFormSubmit, args?: TabulateParams): boolean {
  const formEvent: FormEventGS = new FormEventGS(event);
  if (args == undefined) args = {} as TabulateParams;
  const {
    questionResultsColumn = QUESTION_RESULTS_COLUMN,
    dataSheet = DATA_SHEET_NAME,
    sheetName = QUESTION_SHEET_NAME,
    questionTitleColumn = QUESTION_TITLE_COLUMN,
    spreadsheetIDColumn = SPREADSHEET_COLUMN,
    columnDateParams = {} as DateParams,
  } = args;

  const formTitle = formEvent.getTitle();
  const response = formEvent.getItemResponse(0);
  if (response instanceof Array) {
    throw new Error('Bellwork form response needs to have single values only in tabulateBellwork()');
  }
  const title = formEvent.getFullDate(columnDateParams) + '\n' + formEvent.getItemTitle(0);
  const fullName: [string, string] = formEvent.getNameFromEmail();
  if (fullName.length != 2) {
    throw new Error('Could not get name from email in tabulateAnswers()');
  }

  const dataSheetInterface = new DataSheet();

  const allClasses = dataSheetInterface.getDataSheet(dataSheet, sheetName).getDataAsMap(sheetName);

  let destinationSheetName: string = '';
  let questionSheetID: string = '';

  for (const className of allClasses.keys()) {
    const classData = allClasses.get(className);
    if (classData != null && classData != undefined) {
      const questionTitle = classData.get(questionTitleColumn);
      if (questionTitle != null && questionTitle != undefined) {
        if (formTitle.indexOf(questionTitle.toString()) == 0) {
          const questionResultsSheetName = classData.get(questionResultsColumn);
          if (questionResultsSheetName != null && questionResultsSheetName != undefined) {
            destinationSheetName = questionResultsSheetName.toString();
          } else {
            throw new Error(
              'Could not find bellwork results sheet for class "' + className + '" in column "' + questionResultsColumn + '" for tabulateAnswers()',
            );
          }

          const spreadsheetID = classData.get(spreadsheetIDColumn);
          if (spreadsheetID == null || spreadsheetID == undefined) {
            throw new Error(
              'Could not find bellwork results sheet ID for class "' + className + '" in column "' + spreadsheetIDColumn + '" for tabulateAnswers()',
            );
          }
          questionSheetID = spreadsheetID.toString();
        }
      } else {
        throw new Error(
          'Could not find question title for class "' + className + '" in column "' + questionTitleColumn + '" in tabulateAnswers()',
        );
      }
    } else {
      throw new Error('Could not find data for class "' + className + '" in tabulateAnswers()');
    }
  }

  const responseSheet = new SpreadsheetGS(questionSheetID, destinationSheetName).getSheet(destinationSheetName);
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
