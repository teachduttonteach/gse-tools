import {SpreadsheetGS} from '../sheets/SpreadsheetGS';
import {ClassroomGS} from '../classroom/ClassroomGS';
import {DriveGS} from '../drive/DriveGS';
import {getDataSheet} from '../drive-sheets/DataSheet';
import {updateTriggers} from '../Triggers';
import {areDatesEqual} from '../utils/Utilities';
import {SheetGS} from '../sheets/SheetGS';
import {SlideshowGS} from '../slides/SlideshowGS';
import {FormsGS} from '../forms/FormsGS';
import {DateParams} from '../calendar/DateParams';
import {CalendarGS} from '../calendar/CalendarGS';
import {SlideGS} from '../slides/SlideGS';
import {MapGS} from '../map/MapGS';

/**
 * All of the arguments and other variables used by the Bellwork script
 */
type BellworkArgs = {
  /**
   * Sheet name for the settings for the bellwork (default: "Bellwork")
   */
  settingsName?: string,
  /**
   * Column name for the sheet column that contains the classroom enrollment
   *  code (default: "Classroom Code")
   */
  classroomCodeColumnName?: string,
  /**
   * Column name for the sheet column that contains the bellwork question
   *  (default: "Bellwork Column")
   */
  bellworkColumnName?: string,
  /**
   * Column name for the sheet column that contains the bellwork date
   *  (default: "Bellwork Date")
   */
  bellworkDateColumnName?: string,
  /**
   * Column name for the sheet column that contains the bellwork form
   *  (default: "Bellwork Form")
   */
  bellworkFormColumnName?: string,
  /**
   * The name of the slide that contains the bellwork on the slideshow
   *  (default: "Bellwork")
   */
  bellworkSlideName?: string,
  /**
   * Column name for the sheet column that contains the bellwork title
   *  (default: "Bellwork Title")
   */
  bellworkTitleColumnName?: string,
  /**
   * Whether or not the date should be in the bellwork title
   */
  dateInBellworkTitle?: boolean,
  /**
   * The function to call after the bellwork has been submitted (default:
   *  "onSubmitBellwork")
   */
  onSubmitBellworkFunctionName?: string,
  /**
   * Column name for the spreadsheet
   */
  spreadsheetColumnName?: string,
  /**
   * Name to use for new files that are created holding class info (default:
   *  "Google Classroom Summary")
   */
  newFileName?: string,
  /**
   * Name of the template to use for the new files to be created (default:
   *  "Google Classroom Summary Template")
   */
  templateName?: string,
  /**
   * Column name for the sheet column that contains the sheet name
   */
  sheetNameColumnName?: string,
  /**
   * Column name for the sheet column that contains the slideshow id
   *  (default: "Slide Show")
   */
  slideshowColumnName?: string,
  /**
   * Column name for the sheet column that contains the "end" string to look
   *  for new bellwork (default: "END")
   */
  bellworkSheetColumnEnd?: string,
  /**
   * Column name for the sheet column that contains daily pictures to display
   *  on the sheet (default: "Daily Pictures")
   */
  dailyPicturesColumnName?: string,
  /**
   * Column name for the sheet column that contains the number of days to
   *  look ahead for upcoming events (default: "Days to Look Ahead")
   */
  daysToLookAheadColumnName?: string,
  /**
   * Name of the slide that holds the upcoming due dates (default:
   *  "Upcoming Due Dates")
   */
  upcomingDueDatesSlideName?: string,
  /**
   * Delimiter for the display of the due dates (default: "/")
   */
  dateDelimiter?: string,
  /**
   * Column name for the sheet column that contains the exit ticket
   *  (default: "Exit Ticket Column")
   */
  exitTicketColumnName?: string,
  /**
   * Slide name to hold the exit question (default: "Exit Question")
   */
  exitQuestionSlideName?: string,
  /**
   * Column name for the sheet column that contains the question type
   *  (default: "Question Type Column")
   */
  questionTypeColumnName?: string,
  /**
   * Column name for the sheet column that contains the options (for
   *  multiple choice, etc.) (default: "Options Column")
   */
  optionsColumnName?: string,
  /**
   * Column name for the sheet column that contains the options for
   *  multiple choice / select rows (default: "Grid Rows Column")
   */
  gridRowsColumnName?: string,
  /**
   * Column name for the sheet column that contains the images to display
   *  (default: "Image Column")
   */
  imageColumnName?: string,
  /**
   * Parameters for displaying due dates (default: empty)
   */
  dueDateParams?: DateParams,
  /**
   * Whether or not to display bellwork on form (default: true)
   */
  displayBellworkOnForm?: boolean,
  /**
   * Whether or not to display bellwork on slide (default: true)
   */
  displayBellworkOnSlide?: boolean,
  /**
   * Whether or not to display the exit ticket on slide (default: true)
   */
  displayExitTicketOnSlide?: boolean,
  /**
   * Whether or not to display the upcoming due dates on slide (default: true)
   */
  displayUpcomingDueDates?: boolean

}

/**
 * Update the bellwork with the associated parameters
 *
 * @param {BellworkArgs} args the parameters
 */
function updateBellwork(args: BellworkArgs): void {
  if (args == null) args = {} as BellworkArgs;
  const {
    settingsName = 'Bellwork',
    bellworkFormColumnName = 'Bellwork Form',
    onSubmitBellworkFunctionName = 'onSubmitBellwork',
    spreadsheetColumnName = 'Spreadsheet',
  } = args;

  const settings: SpreadsheetGS = getDataSheet();
  const bellworkSettings:
    MapGS<string | Date, MapGS<string | Date, string | Date>> =
    settings.getMapData(settingsName);

  bellworkSettings.reset();
  while (bellworkSettings.hasNext()) {
    const row = bellworkSettings.next();
    const thisRow = bellworkSettings.get(row);
    if ((thisRow == undefined) || (bellworkFormColumnName == undefined) ||
      (spreadsheetColumnName == undefined)) {
      throw new Error('Could not find row in bellworkSettings');
    }

    const thisBellworkForm = thisRow.get(bellworkFormColumnName);
    if ((thisBellworkForm == undefined) ||
      (typeof thisBellworkForm !== 'string')) {
      throw new Error('Classroom code not found');
    }

    const thisSpreadsheet = thisRow.get(spreadsheetColumnName);
    if (thisSpreadsheet == undefined) {
      throw new Error('Classroom code not found');
    }

    updateTriggers(thisBellworkForm, onSubmitBellworkFunctionName);
    updateTodaysQuestion(args, thisRow);
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
function updateTodaysQuestion(args: BellworkArgs,
    row: MapGS<string | Date, string | Date>): boolean {
  const {
    bellworkDateColumnName = 'Bellwork Date',
    spreadsheetColumnName = 'Spreadsheet',
    sheetNameColumnName = 'Sheet Name',
    bellworkSheetColumnEnd = 'END',
    bellworkColumnName = 'Bellwork Column',
    questionTypeColumnName = 'Question Type Column',
    displayBellworkOnForm = true,
    displayBellworkOnSlide = true,
    displayExitTicketOnSlide = true,
    displayUpcomingDueDates = true,
  } = args;

  const dateToday: Date = new Date();

  const thisQuestionSpreadsheetName = row.get(spreadsheetColumnName);
  if ((thisQuestionSpreadsheetName == null) ||
    (typeof thisQuestionSpreadsheetName !== 'string')) {
    throw new Error('Could not find spreadsheet column name in ' +
      'Samples.updateTodaysQuestion()');
  }
  const questionSpreadsheet: SpreadsheetGS =
    new SpreadsheetGS(thisQuestionSpreadsheetName);

  const thisSheetNameColumnName = row.get(sheetNameColumnName);
  if ((thisSheetNameColumnName == null) ||
    (typeof thisSheetNameColumnName !== 'string')) {
    throw new Error('Could not find sheet name column name in ' +
      'Samples.updateTodaysQuestion()');
  }
  const questionSheet: SheetGS =
    questionSpreadsheet.getSheet(thisSheetNameColumnName);

  const thisBellworkDateColumnName = row.get(bellworkDateColumnName);
  if (thisBellworkDateColumnName == null) {
    throw new Error('Could not find bellwork date column name in ' +
      'Samples.updateTodaysQuestion()');
  }
  let questionRow: number =
    questionSheet.skipBlankRows(1, +thisBellworkDateColumnName);
  while (questionSheet.getValue(questionRow, +thisBellworkDateColumnName) !=
    bellworkSheetColumnEnd) {
    const dateInCell: Date = new Date(questionSheet.getValue(questionRow,
        +thisBellworkDateColumnName));

    if (areDatesEqual(dateToday, dateInCell, 'month')) {
      const thisBellworkColumnName = row.get(bellworkColumnName);
      if (thisBellworkColumnName == null) {
        throw new Error('Could not find bellwork column name in ' +
          'Samples.doForBellwork()');
      }
      const questionTitle: string =
        questionSheet.getValue(questionRow, +thisBellworkColumnName);

      const thisQuestionTypeColumnName = row.get(questionTypeColumnName);
      if (thisQuestionTypeColumnName == null) {
        throw new Error('Could not find question type column name in ' +
          'Samples.doForBellwork()');
      }
      const questionType: string =
        questionSheet.getValue(questionRow, +thisQuestionTypeColumnName);

      if (displayBellworkOnForm) {
        showBellworkOnForm(args, row, questionRow,
            questionSheet, questionTitle, questionType);
      }

      if (displayBellworkOnSlide || displayExitTicketOnSlide ||
        displayUpcomingDueDates) {
        showBellworkOnSlide(args, row, questionRow,
            questionSheet, questionTitle, questionType);
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
 * @param {MapGS<string | Date, string | Date>} row the info about the current
 *  date
 * @param {number} questionRow the row of the current question
 * @param {SheetGS} questionSheet the sheet containing the question
 * @param {string} questionTitle the title of the bellwork question
 * @param {string} questionType the type of the bellwork question
 *  class
 */
function showBellworkOnSlide(args: BellworkArgs,
    row: MapGS<string | Date, string | Date>, questionRow: number,
    questionSheet: SheetGS, questionTitle: string,
    questionType: string): void {
  const {
    bellworkSlideName = 'Bellwork',
    dailyPicturesColumnName = 'Daily Pictures',
    daysToLookAheadColumnName = 'Days to Look Ahead',
    upcomingDueDatesSlideName = 'Upcoming Due Dates',
    exitTicketColumnName = 'Exit Ticket Column',
    exitQuestionSlideName = 'Exit Question',
    optionsColumnName = 'Options Column',
    dueDateParams = {} as DateParams,
    slideshowColumnName = 'Slideshow',
    classroomCodeColumnName = 'Classroom Code',
    displayBellworkOnSlide = true,
    displayExitTicketOnSlide = true,
    displayUpcomingDueDates = true,
  } = args;

  if (displayBellworkOnSlide || displayExitTicketOnSlide ||
    displayUpcomingDueDates) {
    const thisSlideshowColumnName = row.get(slideshowColumnName);
    if ((thisSlideshowColumnName == null) ||
      (typeof thisSlideshowColumnName !== 'string')) {
      throw new Error('Could not find slide show column name in ' +
        'Samples.updateTodaysQuestion()');
    }
    const slideShow = new SlideshowGS(thisSlideshowColumnName);

    if (displayBellworkOnSlide) {
      const bellworkSlide: SlideGS =
        slideShow.getSlideByType(bellworkSlideName);

      const theseOptionsColumnName = row.get(optionsColumnName);
      if (theseOptionsColumnName != null) {
        const theseOptions = questionSheet.
            getValue(questionRow, +theseOptionsColumnName);
        if ((theseOptions != null) && (theseOptions != '')) {
          bellworkSlide.addItem(questionType, theseOptions);
        }
      }
      bellworkSlide.setTitle(questionTitle);

      const theseDailyPicturesColumnName = row.get(dailyPicturesColumnName);
      if (theseDailyPicturesColumnName == null) {
        throw new Error('Could not find daily pictures column name in ' +
          'Samples.updateTodaysQuestion()');
      }
      slideShow.changeSlidePicture(questionSheet.
          getValue(questionRow, +theseDailyPicturesColumnName), bellworkSlide);
    }

    if (displayUpcomingDueDates) {
      const allClasses: ClassroomGS = new ClassroomGS();
      const thisClassroomCode = row.get(classroomCodeColumnName);
      if ((thisClassroomCode == undefined) ||
        (typeof thisClassroomCode !== 'string')) {
        throw new Error('Classroom code not found');
      }
      const currentClass = allClasses.getClass(thisClassroomCode);

      const thisDaysToLookAhead = row.get(daysToLookAheadColumnName);
      if (thisDaysToLookAhead == null) {
        throw new Error('Could not find days to look ahead in ' +
          'Samples.doForBellwork()');
      }
      const upcomingEvents: string =
        new CalendarGS(currentClass.getCalendarId()).
            getUpcomingDueDates(+thisDaysToLookAhead, dueDateParams);
      slideShow.getSlideByType(upcomingDueDatesSlideName).
          setList(upcomingEvents);
    }

    if (displayExitTicketOnSlide) {
      const thisExitTicketColumnName = row.get(exitTicketColumnName);
      if (thisExitTicketColumnName == null) {
        throw new Error('Could not find exit ticket column name in ' +
          'Samples.doForBellwork()');
      }
      slideShow.setSlideBodyByType(questionSheet.
          getValue(questionRow, +thisExitTicketColumnName),
      exitQuestionSlideName);
    }
  }
}

/**
 * Displays the bellwork on a form
 *
 * @param {args} args the parameters for the function
 * @param {MapGS<string | Date, string | Date>} row the information for the
 *  current date
 * @param {number} questionRow the number of the current row
 * @param {SheetGS} questionSheet the sheet where the question info is
 * @param {string} questionTitle the title of the bellwork question
 * @param {string} questionType the type of the bellwork question
 */
function showBellworkOnForm(args: BellworkArgs, row: MapGS<string | Date,
  string | Date>, questionRow: number, questionSheet: SheetGS,
questionTitle: string, questionType: string) {
  const {
    bellworkTitleColumnName = 'Bellwork Title',
    dateDelimiter = '/',
    dateInBellworkTitle = true,
    gridRowsColumnName = 'Grid Rows Column',
    imageColumnName = 'Image Column',
    dueDateParams = {} as DateParams,
    bellworkFormColumnName = 'Bellwork Form',
  } = args;

  const dateToday: Date = new Date();

  const thisBellworkForm = row.get(bellworkFormColumnName);
  if ((thisBellworkForm == null) || (typeof thisBellworkForm !== 'string')) {
    throw new Error('Could not find bellwork form column name in ' +
      'Samples.updateTodaysQuestion()');
  }
  const bellworkForm = new FormsGS(thisBellworkForm);

  let thisBellworkTitleColumnName = row.get(bellworkTitleColumnName);
  if ((thisBellworkTitleColumnName == null) ||
    (typeof thisBellworkTitleColumnName !== 'string')) {
    thisBellworkTitleColumnName = 'Bellwork';
  }

  if (dateInBellworkTitle) {
    const thisMonth = Number(dateToday.getUTCMonth()) + 1;
    const thisDay = dateToday.getUTCDate();

    if ((dueDateParams == null) || (dueDateParams.dateOrder == null) ||
      (dueDateParams.dateOrder.indexOf('M') >
      dueDateParams.dateOrder.indexOf('D'))) {
      thisBellworkTitleColumnName += ' ' + thisDay + dateDelimiter + thisMonth;
    } else {
      thisBellworkTitleColumnName += ' ' + thisMonth + dateDelimiter + thisDay;
    }
  }
  bellworkForm.deleteItems().setTitle(thisBellworkTitleColumnName);

  const theseOptionsColumnName = row.get(bellworkTitleColumnName);
  const theseGridRowsColumnName = row.get(gridRowsColumnName);
  let theseOptionsValue: string = '';
  if (theseOptionsColumnName != null) {
    theseOptionsValue =
    questionSheet.getValue(questionRow, +theseOptionsColumnName);
  }
  if (theseOptionsValue != '') {
    let theseRowsValue: string = '';
    if (theseGridRowsColumnName != null) {
      theseRowsValue =
      questionSheet.getValue(questionRow, +theseGridRowsColumnName);
    }
    if (theseRowsValue != '') {
      bellworkForm.addItem(questionTitle, questionType,
          bellworkForm.convertLinebreaksToList(theseOptionsValue),
          bellworkForm.convertLinebreaksToList(theseRowsValue));
    } else {
      bellworkForm.addItem(questionTitle, questionType,
          bellworkForm.convertLinebreaksToList(theseOptionsValue));
    }
  } else {
    bellworkForm.addItem(questionTitle, questionType);
  }

  const thisImageColumnName = row.get(imageColumnName);
  if (thisImageColumnName != null) {
    const imageFileID: string = questionSheet.
        getValue(questionRow, +thisImageColumnName);
    const thisImageBlob: GoogleAppsScript.Base.Blob | boolean =
      new DriveGS().getImageBlob(imageFileID);
    if ((thisImageBlob != false) && (thisImageBlob != true)) {
      bellworkForm.addImage(thisImageBlob);
    }
  }
}
