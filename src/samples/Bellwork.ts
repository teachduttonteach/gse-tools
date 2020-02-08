import {SpreadsheetGS} from '../sheets/SpreadsheetGS';
import {ClassroomGS} from '../classroom/ClassroomGS';
import {DriveGS} from '../drive/DriveGS';
import {getDataSheet} from '../DataSheet';
import {areDatesEqual, getTodaysDate} from '../utils/Utilities';
import {SheetGS} from '../sheets/SheetGS';
import {SlideshowGS} from '../slides/SlideshowGS';
import {FormsGS} from '../forms/FormsGS';
import {DateParams} from '../DateParams';
import {CalendarGS} from '../calendar/CalendarGS';
import {SlideGS} from '../slides/SlideGS';
import {MapGS} from '../map/MapGS';
import {QuestionType} from '../enums/QuestionType';
import {FormEventGS} from '../forms/FormEventGS';

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
}

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
export function updateBellwork(args: BellworkArgs): void {
  if (args == null) args = {} as BellworkArgs;
  const {
    bellworkSettingsSheetName = 'Bellwork',
    bellworkFormIDColumnName = 'Bellwork Form ID',
    onSubmitBellworkFunctionName = 'onSubmitBellwork',
    bellworkSpreadsheetIDColumnName = 'Bellwork Spreadsheet ID',
    dataSheet,
  } = args;

  const settings: SpreadsheetGS = getDataSheet(dataSheet,
      bellworkSettingsSheetName);
  const bellworkSettings: MapGS<string | Date, MapGS<string | Date,
    string | Date>> = settings.getDataAsMap(bellworkSettingsSheetName);

  bellworkSettings.reset();
  while (bellworkSettings.hasNext()) {
    const row = bellworkSettings.next();
    const thisRow = bellworkSettings.get(row);
    if (thisRow === null || bellworkFormIDColumnName === null ||
      bellworkSpreadsheetIDColumnName === null) {
      throw new Error('Could not find row in bellworkSettings');
    }

    const thisBellworkForm = thisRow.get(bellworkFormIDColumnName);
    if (thisBellworkForm === undefined ||
      typeof thisBellworkForm !== 'string') {
      throw new Error('Bellwork form column not found');
    }

    const thisSpreadsheet = thisRow.get(bellworkSpreadsheetIDColumnName);
    if (thisSpreadsheet === undefined) {
      throw new Error('Bellwork spreadsheet ID column not found');
    }

    const thisForm = new FormsGS(thisBellworkForm);
    thisForm.replaceTrigger('S', onSubmitBellworkFunctionName);
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
 * @param {FormsGS} form the form to use for the question
 * @return {boolean} whether the question was found or not
 */
function updateTodaysQuestion(args: BellworkArgs,
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
    timezoneOffset = -5,
  } = args;

  const dateToday: Date = getTodaysDate(timezoneOffset);

  const thisSpreadsheetID = row.get(bellworkSpreadsheetIDColumnName);
  if (thisSpreadsheetID == null ||
      typeof thisSpreadsheetID !== 'string') {
    throw new Error('Could not find spreadsheet column name in ' +
      'Bellwork.updateTodaysQuestion()');
  }

  const thisSheetName = row.get(bellworkSheetNameColumnName);
  if (thisSheetName == null ||
    typeof thisSheetName !== 'string') {
    throw new Error('Could not find sheet name column name (' +
      bellworkSheetNameColumnName + ') in Bellwork.updateTodaysQuestion()');
  }
  // TODO: Make Map of open spreadsheets
  const questionSpreadsheet: SpreadsheetGS =
    new SpreadsheetGS(thisSpreadsheetID, thisSheetName);
  const questionSheet: SheetGS =
    questionSpreadsheet.getSheet(thisSheetName);

  const thisBellworkDateColumnName = row.get(bellworkDateColumnName);
  if (thisBellworkDateColumnName == null) {
    throw new Error('Could not find bellwork date column name in ' +
      'Bellwork.updateTodaysQuestion()');
  }
  let questionRow: number = questionSheet.skipBlankRows(1,
      +thisBellworkDateColumnName);
  while ((questionRow <= questionSheet.getLastRow()) &&
    ((questionSheet.getValue(questionRow, +thisBellworkDateColumnName) !==
    bellworkSheetDateColumnEnd))) {
    const dateInCell: Date = new Date(questionSheet.getValue(questionRow,
        +thisBellworkDateColumnName));

    if (areDatesEqual(dateToday, dateInCell, 'month')) {
      const thisBellworkColumnName = row.get(bellworkColumnName);
      if (thisBellworkColumnName == null) {
        throw new Error('Could not find bellwork column name in ' +
        'Samples.doForBellwork()');
      }
      const questionTitle: string =
        questionSheet.
            getValue(questionRow, +thisBellworkColumnName).toString();

      const thisQuestionType = row.get(questionTypeColumnName);
      if (thisQuestionType == null) {
        throw new Error('Could not find question type column name in ' +
        'Samples.doForBellwork()');
      }
      let thisQuestionTypeString: QuestionType | undefined = 
        (<any>QuestionType)
        [questionSheet.getValue(questionRow, +thisQuestionType).toString()];
      if ((thisQuestionTypeString === undefined) || 
        !(thisQuestionTypeString in QuestionType)) {
        console.log("WARNING: Question type '" + thisQuestionTypeString + 
          "' not a valid question type in updateTodaysQuestion()");
        thisQuestionTypeString = QuestionType.Paragraph;
      }

      if (displayBellworkOnForm) {
        showBellworkOnForm(args, row, form, questionRow, questionSheet,
            questionTitle, thisQuestionTypeString);
      }

      if (displayBellworkOnSlide || displayExitQuestionOnSlide ||
        displayUpcomingDueDates) {
        showBellworkOnSlide(args, row, questionRow, questionSheet,
            questionTitle, thisQuestionTypeString);
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
 * @param {MapGS<string | Date, string | Date>} settingsRow the info about
 * the current date
 * @param {number} questionRow the row of the current question
 * @param {SheetGS} questionSheet the sheet containing the question
 * @param {string} questionTitle the title of the bellwork question
 * @param {QuestionType} questionType the type of the bellwork question
 *  class
 */
function showBellworkOnSlide(
    args: BellworkArgs,
    settingsRow: MapGS<string | Date, string | Date>,
    questionRow: number,
    questionSheet: SheetGS,
    questionTitle: string,
    questionType: QuestionType,
): void {
  const {
    bellworkSlideNotes = 'Bellwork',
    dailyPicturesColumnName = 'Daily Pictures Folder ID',
    dailyPicturesNotes = 'Daily Pictures',
    daysToLookAheadColumnName = 'Days to Look Ahead',
    upcomingDueDatesSlideNotes = 'Upcoming Due Dates',
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
    timezoneOffset = -5,
  } = args;

  const thisSlideshowID =
    settingsRow.get(bellworkSlideshowIDColumnName);
  if (thisSlideshowID == null ||
    typeof thisSlideshowID !== 'string') {
    throw new Error('Could not find slide show ID in ' +
      'Samples.updateTodaysQuestion()');
  }
  const slideShow = new SlideshowGS(thisSlideshowID);

  const thisBellworkImageFolder = settingsRow.get(dailyPicturesColumnName);
  if ((thisBellworkImageFolder !== null) && (thisBellworkImageFolder != '')) {
    const thisSlide = slideShow.getSlideByNotes(dailyPicturesNotes);
    if (thisSlide != null) {
      slideShow.changeSlidePictureFromFolder(
          thisBellworkImageFolder.toString(), thisSlide);
    }
  }

  if (displayBellworkOnSlide || displayExitQuestionOnSlide ||
      displayUpcomingDueDates) {
    if (displayBellworkOnSlide) {
      const bellworkSlide =
        slideShow.getSlideByNotes(bellworkSlideNotes);
      if (bellworkSlide != null) {
        const theseOptionsColumnName = settingsRow.get(optionsColumnName);
        if (theseOptionsColumnName != null) {
          const theseOptions = questionSheet.getValue(questionRow,
              +theseOptionsColumnName).toString();
          if (theseOptions !== null && theseOptions != '') {
            bellworkSlide.addItem(questionType, theseOptions);
          }
        }
        bellworkSlide.setTitle(questionTitle);

        const thisBellworkImage = settingsRow.get(imageColumnName);
        if (thisBellworkImage != null) {
          slideShow.changeSlidePicture(
              questionSheet.getValue(questionRow, +thisBellworkImage,
              ).toString(), bellworkSlide);
        }
      }
    }

    if (displayUpcomingDueDates) {
      const allClasses: ClassroomGS = new ClassroomGS();
      const thisClassroomCode = settingsRow.get(classroomCodeColumnName);
      if (thisClassroomCode === undefined ||
        typeof thisClassroomCode !== 'string') {
        throw new Error('Classroom code not found');
      }
      const currentClass = allClasses.getClass(thisClassroomCode);

      const thisDaysToLookAhead = settingsRow.get(daysToLookAheadColumnName);
      if (thisDaysToLookAhead == null) {
        throw new Error('Could not find days to look ahead in ' +
          'Samples.doForBellwork()');
      }
      const upcomingEvents: string =
        new CalendarGS(currentClass.getCalendarId(), timezoneOffset).getUpcomingDueDates(
            +thisDaysToLookAhead,
            dueDateParams
        );
      const thisSlide = slideShow.getSlideByNotes(upcomingDueDatesSlideNotes);
      if (thisSlide != null) thisSlide.setList(upcomingEvents);
    }

    if (displayExitQuestionOnSlide) {
      const thisExitTicketColumnName = settingsRow.get(exitQuestionColumnName);
      if ((thisExitTicketColumnName != null) &&
        (+thisExitTicketColumnName > 0)) {
        slideShow.setSlideBodyByType(
            exitQuestionSlideNotes,
            questionSheet.getValue(questionRow,
                +thisExitTicketColumnName).toString(),
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
 * @param {QuestionType} questionType the type of the bellwork question
 */
function showBellworkOnForm(
    args: BellworkArgs,
    row: MapGS<string | Date, string | Date>,
    bellworkForm: FormsGS,
    questionRow: number,
    questionSheet: SheetGS,
    questionTitle: string,
    questionType: QuestionType,
) {
  const {
    bellworkTitleColumnName = 'Bellwork Title',
    dateDelimiter = '/',
    dateInBellworkTitle = true,
    optionsColumnName = 'Question Options Column Number',
    gridRowsColumnName = 'Grid Rows Column Number',
    imageColumnName = 'Image Column',
    dueDateParams = {} as DateParams,
    timezoneOffset = -5,
  } = args;

  const dateToday: Date = getTodaysDate(timezoneOffset);

  let thisBellworkTitleColumnName = row.get(bellworkTitleColumnName);
  if (thisBellworkTitleColumnName == null ||
    typeof thisBellworkTitleColumnName !== 'string') {
    thisBellworkTitleColumnName = 'Bellwork';
  }

  if (dateInBellworkTitle) {
    const thisMonth = Number(dateToday.getUTCMonth()) + 1;
    const thisDay = dateToday.getUTCDate();

    if (
      dueDateParams == null ||
      dueDateParams.dateOrder == null ||
      dueDateParams.dateOrder.indexOf('M') >
        dueDateParams.dateOrder.indexOf('D')
    ) {
      thisBellworkTitleColumnName += ' ' + thisDay + dateDelimiter + thisMonth;
    } else {
      thisBellworkTitleColumnName += ' ' + thisMonth + dateDelimiter + thisDay;
    }
  }
  bellworkForm.deleteItems().setTitle(thisBellworkTitleColumnName);

  const theseOptionsColumnName = row.get(optionsColumnName);
  const theseGridRowsColumnName = row.get(gridRowsColumnName);
  let theseOptionsValue: string = '';
  if (theseOptionsColumnName != null) {
    theseOptionsValue = questionSheet.getValue(questionRow,
        +theseOptionsColumnName).toString();
  }
  if (theseOptionsValue != '') {
    let theseRowsValue: string = '';
    if (theseGridRowsColumnName !== null) {
      theseRowsValue = questionSheet.getValue(questionRow,
          +theseGridRowsColumnName).toString();
    }
    if (theseRowsValue != '') {
      bellworkForm.addItem(
          questionTitle,
          questionType,
          bellworkForm.convertLinebreaksToList(theseOptionsValue),
          bellworkForm.convertLinebreaksToList(theseRowsValue),
      );
    } else {
      bellworkForm.addItem(questionTitle, questionType,
          bellworkForm.convertLinebreaksToList(theseOptionsValue));
    }
  } else {
    bellworkForm.addItem(questionTitle, questionType);
  }

  const thisImageColumnNumber = row.get(imageColumnName);
  if (thisImageColumnNumber !== null) {
    const imageFileID: string = questionSheet.getValue(questionRow,
        +thisImageColumnNumber).toString();
    if (imageFileID != '') {
      const thisImageBlob: GoogleAppsScript.Base.Blob | boolean =
      new DriveGS().getImageBlob(imageFileID);
      if (thisImageBlob !== false) {
        bellworkForm.addImage(thisImageBlob);
      }
    }
  }
}

/**
 * Take the submitted bellwork and adds it to an existing Sheet for the 
 *  submitting student and their response
 * @param {GoogleAppsScript.Events.FormsOnFormSubmit} event the Google Form 
 *  event
 * @param {TabulateParams} args the tabulate bellwork parameters
 * @return {boolean} returns true if the bellwork was tabulated 
 */
export function tabulateBellwork(
    event: GoogleAppsScript.Events.FormsOnFormSubmit,
    args?: TabulateParams): boolean {
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
    throw new Error('Bellwork form response ' +
      'needs to have single values only in tabulateBellwork()');
  }
  const title = (formEvent.getFullDate(columnDateParams) + '\n' +
      formEvent.getItemTitle(0));
  const fullName: [string, string] = formEvent.getNameFromEmail();
  if (fullName.length != 2) {
    throw new Error('Could not get name from email' +
      ' in tabulateBellwork()');
  }

  const allClasses = getDataSheet(dataSheet, sheetName)
      .getDataAsMap(sheetName);

  let destinationSheetName: string = '';
  let bellworkSheetID: string = '';

  for (const className of allClasses.keys()) {
    const classData = allClasses.get(className);
    if ((classData != null) && (classData != undefined)) {
      const bellworkTitle = classData.get(bellworkTitleColumn);
      if ((bellworkTitle != null) && (bellworkTitle != undefined)) {
        if (formTitle.indexOf(bellworkTitle.toString()) == 0) {
          const bellworkResultsSheetName = 
            classData.get(bellworkResultsColumn);
          if ((bellworkResultsSheetName != null) && 
            (bellworkResultsSheetName != undefined)) {
            destinationSheetName = bellworkResultsSheetName.toString();
          } else {
            throw new Error('Could not find bellwork results sheet for ' +
              ' class "' + className + '" in column "' +
              bellworkResultsColumn + '" for tabulateBellwork()');
          }

          const spreadsheetID = classData.get(spreadsheetIDColumn);
          if ((spreadsheetID == null) || (spreadsheetID == undefined)) {
            throw new Error('Could not find bellwork results sheet ID for ' +
              ' class "' + className + '" in column "' +
              spreadsheetIDColumn + '" for tabulateBellwork()');
          }
          bellworkSheetID = spreadsheetID.toString();
        }
      } else {
        throw new Error('Could not find bellwork title for class "' +
            className + '" in column "' + bellworkTitleColumn +
            '" in tabulateBellwork()');
      }
    } else {
      throw new Error('Could not find data for class "' + className +
          '" in tabulateBellwork()');
    }
  }

  const responseSheet = new SpreadsheetGS(bellworkSheetID,
      destinationSheetName).getSheet(destinationSheetName);
  if (responseSheet.getValue(1, 3) != title) {
    responseSheet.insertCol(3).setValue(title, 1, 3);
  }

  let foundName: boolean = false;
  const lastRow: number = responseSheet.getLastRow();
  for (let i = 2; i <= lastRow; i++) {
    if ((responseSheet.getValue(i, 1) == fullName[0]) &&
        (responseSheet.getValue(i, 2) == fullName[1])) {
      responseSheet.setValue(response, i, 3);
      foundName = true;
      break;
    }
  }
  if (!foundName) {
    responseSheet.setValues([[fullName[0], fullName[1], response]],
        lastRow + 1, 1, 1, 3);
  }

  return true;
}
