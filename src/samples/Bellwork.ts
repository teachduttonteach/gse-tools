import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { getDataSheet } from '../DataSheet';
import { areDatesEqual, getTodaysDate } from '../utils/Utilities';
import { SheetGS } from '../sheets/SheetGS';
import { SlideshowGS } from '../slides/SlideshowGS';
import { FormsGS } from '../forms/FormsGS';
import { DateParams } from '../calendar/DateParams';
import { CalendarGS } from '../calendar/CalendarGS';
import { SlideGS } from '../slides/SlideGS';
import { MapGS } from '../map/MapGS';
import { QuestionType } from '../enums/QuestionType';

/**
 * All of the arguments and other variables used by the Bellwork script
 */
type BellworkArgs = {
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
  upcomingDueDatesSlideName?: string;
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
};

/**
 * Update the bellwork with the associated parameters
 *
 * @param {BellworkArgs} args the parameters
 */
export function updateBellwork(args: BellworkArgs): void {
  if (args == null) args = {} as BellworkArgs;
  const {
    bellworkSettingsSheetName = 'Bellwork',
    bellworkFormIDColumnName = 'Bellwork Form ID',
    onSubmitBellworkFunctionName = 'onSubmitBellwork',
    bellworkSpreadsheetIDColumnName = 'Bellwork Spreadsheet ID',
  } = args;

  const settings: SpreadsheetGS = getDataSheet();
  const bellworkSettings: MapGS<string | Date, MapGS<string | Date, string | Date>> = settings.getDataAsMap(bellworkSettingsSheetName);

  bellworkSettings.reset();
  while (bellworkSettings.hasNext()) {
    const row = bellworkSettings.next();
    const thisRow = bellworkSettings.get(row);
    if (thisRow == undefined || bellworkFormIDColumnName == undefined || bellworkSpreadsheetIDColumnName == undefined) {
      throw new Error('Could not find row in bellworkSettings');
    }

    const thisBellworkForm = thisRow.get(bellworkFormIDColumnName);
    if (thisBellworkForm == undefined || typeof thisBellworkForm !== 'string') {
      throw new Error('Bellwork form column not found');
    }

    const thisSpreadsheet = thisRow.get(bellworkSpreadsheetIDColumnName);
    if (thisSpreadsheet == undefined) {
      throw new Error('Bellwork spreadsheet ID column not found');
    }

    const thisForm = new FormsGS(thisBellworkForm);
    thisForm.replaceTrigger('S', onSubmitBellworkFunctionName);
    Logger.log("Going to updateTodaysQuestion");
    updateTodaysQuestion(args, thisRow, thisForm);
  }
}

/**
 * Figure out the current question and determine whether to display it on
 *  a form or slides
 *
 * @param {BellworkArgs} args the passed arguments
 * @param {MapGS<string | Date, string | Date>} row the relevant information
 *  from the settings
 * @return {boolean} whether the question was found or not
 */
export function updateTodaysQuestion(args: BellworkArgs, 
  row: MapGS<string | Date, string | Date>, form: FormsGS): boolean {
  const {
    bellworkDateColumnName = 'Bellwork Date Column Number',
    bellworkSpreadsheetIDColumnName = 'Spreadsheet',
    bellworkSheetNameColumnName = 'Sheet Name',
    bellworkSheetDateColumnEnd = 'END',
    bellworkColumnName = 'Bellwork Column',
    questionTypeColumnName = 'Question Type Column Number',
    displayBellworkOnForm = true,
    displayBellworkOnSlide = true,
    displayExitQuestionOnSlide = true,
    displayUpcomingDueDates = true,
    timezoneOffset = -5
  } = args;

  const dateToday: Date = getTodaysDate(timezoneOffset);

  const thisQuestionSpreadsheetName = row.get(bellworkSpreadsheetIDColumnName);
  if (thisQuestionSpreadsheetName == null || typeof thisQuestionSpreadsheetName !== 'string') {
    throw new Error('Could not find spreadsheet column name in ' + 
      'Bellwork.updateTodaysQuestion()');
  }
  const questionSpreadsheet: SpreadsheetGS = new SpreadsheetGS(thisQuestionSpreadsheetName);

  const thisSheetNameColumnName = row.get(bellworkSheetNameColumnName);
  if (thisSheetNameColumnName == null || typeof thisSheetNameColumnName !== 'string') {
    throw new Error('Could not find sheet name column name (' + 
      bellworkSheetNameColumnName + ') in Bellwork.updateTodaysQuestion()');
  }
  const questionSheet: SheetGS = questionSpreadsheet.getSheet(thisSheetNameColumnName);

  const thisBellworkDateColumnName = row.get(bellworkDateColumnName);
  if (thisBellworkDateColumnName == null) {
    throw new Error('Could not find bellwork date column name in ' + 
      'Bellwork.updateTodaysQuestion()');
  }
  let questionRow: number = questionSheet.skipBlankRows(1, +thisBellworkDateColumnName);
  Logger.log(questionSheet.getValue(questionRow, +thisBellworkDateColumnName) 
  + "," + bellworkSheetDateColumnEnd);
  while ((questionRow <= questionSheet.getLastRow()) && 
    (questionSheet.getValue(questionRow, +thisBellworkDateColumnName) 
    != bellworkSheetDateColumnEnd)) {

    const dateInCell: Date = new Date(questionSheet.getValue(questionRow, +thisBellworkDateColumnName));

    if (areDatesEqual(dateToday, dateInCell, 'month')) {
      const thisBellworkColumnName = row.get(bellworkColumnName);
      if (thisBellworkColumnName == null) {
        throw new Error('Could not find bellwork column name in ' + 
        'Samples.doForBellwork()');
      }
      Logger.log("1: " + questionSheet.getValue(questionRow, +thisBellworkColumnName));
      const questionTitle: string = 
        questionSheet.
          getValue(questionRow, +thisBellworkColumnName).toString();

      const thisQuestionTypeColumnName = row.get(questionTypeColumnName);
      if (thisQuestionTypeColumnName == null) {
        throw new Error('Could not find question type column name in ' + 
        'Samples.doForBellwork()');
      }
      Logger.log("2: " + questionSheet.getValue(questionRow, +thisQuestionTypeColumnName));
      let questionTypeString: string = 
        questionSheet.
          getValue(questionRow, +thisQuestionTypeColumnName).toString();

      if (!(questionTypeString in QuestionType)) questionTypeString = "Paragraph";

      if (displayBellworkOnForm) {
        showBellworkOnForm(args, row, form, questionRow, questionSheet, questionTitle, questionTypeString);
      }

      if (displayBellworkOnSlide || displayExitQuestionOnSlide || displayUpcomingDueDates) {
        showBellworkOnSlide(args, row, questionRow, questionSheet, questionTitle, questionTypeString);
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
 * @param {MapGS<string | Date, string | Date>} settingsRow the info about the current
 *  date
 * @param {number} questionRow the row of the current question
 * @param {SheetGS} questionSheet the sheet containing the question
 * @param {string} questionTitle the title of the bellwork question
 * @param {string} questionType the type of the bellwork question
 *  class
 */
export function showBellworkOnSlide(
  args: BellworkArgs,
  settingsRow: MapGS<string | Date, string | Date>,
  questionRow: number,
  questionSheet: SheetGS,
  questionTitle: string,
  questionType: string,
): void {
  const {
    bellworkSlideNotes = 'Bellwork',
    dailyPicturesColumnName = 'Daily Pictures Folder ID',
    dailyPicturesNotes = 'Daily Pictures',    
    daysToLookAheadColumnName = 'Days to Look Ahead',
    upcomingDueDatesSlideName = 'Upcoming Due Dates',
    exitQuestionColumnName = 'Exit Question Column Number',
    exitQuestionSlideNotes = 'Exit Question',
    optionsColumnName = 'Question Options Column Number',
    dueDateParams = {} as DateParams,
    bellworkSlideshowIDColumnName = 'Bellwork Slideshow ID',
    classroomCodeColumnName = 'Classroom Code',
    imageColumnName = 'Bellwork Form Image Column',
    displayBellworkOnSlide = true,
    displayExitQuestionOnSlide = true,
    displayUpcomingDueDates = true,
  } = args;

  const thisSlideshowColumnName = settingsRow.get(bellworkSlideshowIDColumnName);
  if (thisSlideshowColumnName == null || typeof thisSlideshowColumnName !== 'string') {
    throw new Error('Could not find slide show column name in ' + 'Samples.updateTodaysQuestion()');
  }
  const slideShow = new SlideshowGS(thisSlideshowColumnName);

  const thisBellworkImageFolder = settingsRow.get(dailyPicturesColumnName);
  if (thisBellworkImageFolder != null) {
    slideShow.changeSlidePictureFromFolder(
      thisBellworkImageFolder.toString(), 
      slideShow.getSlideByNotes(dailyPicturesNotes));
  }

  if (displayBellworkOnSlide || displayExitQuestionOnSlide || displayUpcomingDueDates) {
    if (displayBellworkOnSlide) {
      const bellworkSlide: SlideGS = slideShow.getSlideByNotes(bellworkSlideNotes);

      const theseOptionsColumnName = settingsRow.get(optionsColumnName);
      if (theseOptionsColumnName != null) {
        const theseOptions = questionSheet.getValue(questionRow, +theseOptionsColumnName).toString();
        if (theseOptions != null && theseOptions != '') {
          bellworkSlide.addItem(questionType, theseOptions);
        }
      }
      bellworkSlide.setTitle(questionTitle);

      
      const thisBellworkImage = settingsRow.get(imageColumnName);
      if (thisBellworkImage != null) {
        slideShow.changeSlidePicture(
          questionSheet.getValue(questionRow, +thisBellworkImage
        ).toString(), bellworkSlide);
      }
    }

    if (displayUpcomingDueDates) {
      const allClasses: ClassroomGS = new ClassroomGS();
      const thisClassroomCode = settingsRow.get(classroomCodeColumnName);
      if (thisClassroomCode == undefined || typeof thisClassroomCode !== 'string') {
        throw new Error('Classroom code not found');
      }
      const currentClass = allClasses.getClass(thisClassroomCode);

      Logger.log("D: " + daysToLookAheadColumnName + ", " + settingsRow.get(daysToLookAheadColumnName));
      const thisDaysToLookAhead = settingsRow.get(daysToLookAheadColumnName);
      if (thisDaysToLookAhead == null) {
        throw new Error('Could not find days to look ahead in ' + 'Samples.doForBellwork()');
      }
      const upcomingEvents: string = new CalendarGS(currentClass.getCalendarId()).getUpcomingDueDates(
        +thisDaysToLookAhead,
        dueDateParams,
      );
      slideShow.getSlideByNotes(upcomingDueDatesSlideName).setList(upcomingEvents);
    }

    if (displayExitQuestionOnSlide) {
      const thisExitTicketColumnName = settingsRow.get(exitQuestionColumnName);
      if ((thisExitTicketColumnName != null) && (+thisExitTicketColumnName > 0)) {
        slideShow.setSlideBodyByType(
          exitQuestionSlideNotes, 
          questionSheet.getValue(questionRow, +thisExitTicketColumnName).toString()
        );
      }
    }
  }
}

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
export function showBellworkOnForm(
  args: BellworkArgs,
  row: MapGS<string | Date, string | Date>,
  bellworkForm: FormsGS,
  questionRow: number,
  questionSheet: SheetGS,
  questionTitle: string,
  questionType: string,
) {
  const {
    bellworkTitleColumnName = 'Bellwork Title',
    dateDelimiter = '/',
    dateInBellworkTitle = true,
    optionsColumnName = 'Question Options Column Number',
    gridRowsColumnName = 'Grid Rows Column Number',
    imageColumnName = 'Image Column',
    dueDateParams = {} as DateParams,
    timezoneOffset = -5
  } = args;

  const dateToday: Date = getTodaysDate(timezoneOffset);

  let thisBellworkTitleColumnName = row.get(bellworkTitleColumnName);
  if (thisBellworkTitleColumnName == null || typeof thisBellworkTitleColumnName !== 'string') {
    thisBellworkTitleColumnName = 'Bellwork';
  }

  if (dateInBellworkTitle) {
    const thisMonth = Number(dateToday.getUTCMonth()) + 1;
    const thisDay = dateToday.getUTCDate();

    if (
      dueDateParams == null ||
      dueDateParams.dateOrder == null ||
      dueDateParams.dateOrder.indexOf('M') > dueDateParams.dateOrder.indexOf('D')
    ) {
      thisBellworkTitleColumnName += ' ' + thisDay + dateDelimiter + thisMonth;
    } else {
      thisBellworkTitleColumnName += ' ' + thisMonth + dateDelimiter + thisDay;
    }
  }
  Logger.log("Setting title " + thisBellworkTitleColumnName);
  bellworkForm.deleteItems().setTitle(thisBellworkTitleColumnName);

  const theseOptionsColumnName = row.get(optionsColumnName);
  const theseGridRowsColumnName = row.get(gridRowsColumnName);
  let theseOptionsValue: string = '';
  if (theseOptionsColumnName != null) {
    theseOptionsValue = questionSheet.getValue(questionRow, +theseOptionsColumnName).toString();
    Logger.log("These options: " + theseOptionsValue);
  }
  if (theseOptionsValue != '') {
    let theseRowsValue: string = '';
    if (theseGridRowsColumnName != null) {
      theseRowsValue = questionSheet.getValue(questionRow, +theseGridRowsColumnName).toString();
      Logger.log("These rows value: " + theseRowsValue);
    }
    if (theseRowsValue != '') {
      Logger.log("Adding to bellwork form 1");
      bellworkForm.addItem(
        questionTitle,
        questionType,
        bellworkForm.convertLinebreaksToList(theseOptionsValue),
        bellworkForm.convertLinebreaksToList(theseRowsValue),
      );
    } else {
      Logger.log("Adding to bellwork form 2");
      bellworkForm.addItem(questionTitle, questionType, bellworkForm.convertLinebreaksToList(theseOptionsValue));
    }
  } else {
    Logger.log("Adding to bellwork form 3");
    bellworkForm.addItem(questionTitle, questionType);
  }

  const thisImageColumnName = row.get(imageColumnName);
  if (thisImageColumnName != null) {
    const imageFileID: string = questionSheet.getValue(questionRow, +thisImageColumnName).toString();
    const thisImageBlob: GoogleAppsScript.Base.Blob | boolean = new DriveGS().getImageBlob(imageFileID);
    if (thisImageBlob != false) {
      bellworkForm.addImage(thisImageBlob);
    }
  }
}
