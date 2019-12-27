import { SpreadsheetGS } from "./SpreadsheetGS"
import { ClassroomGS } from "./ClassroomGS"
import { DriveGS } from "./DriveGS"
import { areDatesEqual, getDataSheet, updateTriggers } from "./Properties"
import { ClassGS } from "./ClassGS"
import { DocsGS } from "./DocsGS"
import { SheetGS } from "./SheetGS"
import { SlideshowGS } from "./SlideshowGS"
import { FormsGS } from "./FormsGS"
import { DateParams } from "./CalendarEventGS"
import { CalendarGS } from "./CalendarGS"
import { SlideGS } from "./SlideGS"
import { MapGS } from "./MapGS"

/**
 * All of the arguments and other variables used by the Bellwork script
 */
type BellworkArgs = {
  /**
   * Sheet name for the settings for the bellwork (default: "Bellwork")
   */
  settingsName?: string,
  /**
   * Column name for the sheet column that contains the classroom enrollment code (default: "Classroom Code")
   */
  classroomCodeColumnName?: string,
  /**
   * Column name for the sheet column that contains the bellwork question (default: "Bellwork Column")
   */
  bellworkColumnName?: string,
  /**
   * Column name for the sheet column that contains the bellwork date (default: "Bellwork Date")
   */
  bellworkDateColumnName?: string,
  /**
   * Column name for the sheet column that contains the bellwork form (default: "Bellwork Form")
   */
  bellworkFormColumnName?: string,
  /**
   * The name of the slide that contains the bellwork on the slideshow (default: "Bellwork")
   */
  bellworkSlideName?: string,
  /**
   * Column name for the sheet column that contains the bellwork title (default: "Bellwork Title")
   */
  bellworkTitleColumnName?: string,
  /**
   * Whether or not the date should be in the bellwork title
   */
  dateInBellworkTitle?: boolean,
  /**
   * The function to call after the bellwork has been submitted (default: "onSubmitBellwork")
   */
  onSubmitBellworkFunctionName?: string,
  /**
   * Column name for the spreadsheet
   */
  spreadsheetColumnName?: string,
  /**
   * Name to use for new files that are created holding class info (default: "Google Classroom Summary")
   */
  newFileName?: string,
  /**
   * Name of the template to use for the new files to be created (default: "Google Classroom Summary Template")
   */
  templateName?: string,
  /**
   * Column name for the sheet column that contains the sheet name
   */
  sheetNameColumnName?: string,
  /**
   * Column name for the sheet column that contains the slideshow id (default: "Slide Show")
   */
  slideshowColumnName?: string,
  /**
   * Column name for the sheet column that contains the "end" string to look for new bellwork (default: "END")
   */
  bellworkSheetColumnEnd?: string,
  /**
   * Column name for the sheet column that contains daily pictures to display on the sheet (default: "Daily Pictures")
   */
  dailyPicturesColumnName?: string,
  /**
   * Column name for the sheet column that contains the number of days to look ahead for upcoming events (default: "Days to Look Ahead")
   */
  daysToLookAheadColumnName?: string,
  /**
   * Name of the slide that holds the upcoming due dates (default: "Upcoming Due Dates")
   */
  upcomingDueDatesSlideName?: string,
  /**
   * Delimiter for the display of the due dates (default: "/")
   */
  dateDelimiter?: string,
  /**
   * Column name for the sheet column that contains the exit ticket (default: "Exit Ticket Column")
   */
  exitTicketColumnName?: string,
  /**
   * Slide name to hold the exit question (default: "Exit Question")
   */
  exitQuestionSlideName?: string,
  /**
   * Column name for the sheet column that contains the question type (default: "Question Type Column")
   */
  questionTypeColumnName?: string,
  /**
   * Column name for the sheet column that contains the options (for multiple choice, etc.) (default: "Options Column")
   */
  optionsColumnName?: string,
  /**
   * Column name for the sheet column that contains the options for multiple choice / select rows (default: "Grid Rows Column")
   */
  gridRowsColumnName?: string,
  /**
   * Column name for the sheet column that contains the images to display (default: "Image Column")
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
 * 
 * @param args 
 */
function updateBellwork(args: BellworkArgs): void {
  if (args == null) args = {} as BellworkArgs;
    let {
        settingsName = "Bellwork",
        bellworkFormColumnName = "Bellwork Form",
        onSubmitBellworkFunctionName = "onSubmitBellwork",
        spreadsheetColumnName = "Spreadsheet",
    } = args;

    let settings: SpreadsheetGS = getDataSheet();
    let bellworkSettings: MapGS<string, MapGS<string, string>> = settings.getMapData(settingsName);
    
    bellworkSettings.reset();
    while (bellworkSettings.hasNext()) {
      let row = bellworkSettings.next();
      let t_row = bellworkSettings.get(row);
      if ((t_row == undefined) || (bellworkFormColumnName == undefined) || (spreadsheetColumnName == undefined)) throw new Error("Could not find row in bellworkSettings");

      let t_bellworkForm = t_row.get(bellworkFormColumnName);
      if (t_bellworkForm == undefined) throw new Error("Classroom code not found");

      let t_spreadsheet = t_row.get(spreadsheetColumnName);
      if (t_spreadsheet == undefined) throw new Error("Classroom code not found");

      updateTriggers(t_bellworkForm, onSubmitBellworkFunctionName);    
      updateTodaysQuestion(args, t_row);
    }
  }
  
  function updateTodaysQuestion(args: BellworkArgs, row: MapGS<string, string>) {
    const {
        bellworkDateColumnName = "Bellwork Date",
        spreadsheetColumnName = "Spreadsheet",
        sheetNameColumnName = "Sheet Name",
        bellworkSheetColumnEnd = "END",    
        classroomCodeColumnName = "Classroom Code",
    } = args;

    let dateToday: Date = new Date();
    let allClasses: ClassroomGS = new ClassroomGS();
    let t_classroomCode = row.get(classroomCodeColumnName);
    if (t_classroomCode == undefined) throw new Error("Classroom code not found");
    let currentClass = allClasses.getClass(t_classroomCode);

    let t_questionSpreadsheetName = row.get(spreadsheetColumnName);
    if (t_questionSpreadsheetName == null) throw new Error("Could not find spreadsheet column name in Samples.updateTodaysQuestion()");
    let questionSpreadsheet: SpreadsheetGS = new SpreadsheetGS(t_questionSpreadsheetName);
    
    let t_sheetNameColumnName = row.get(sheetNameColumnName);
    if (t_sheetNameColumnName == null) throw new Error("Could not find sheet name column name in Samples.updateTodaysQuestion()");
    let questionSheet: SheetGS = questionSpreadsheet.getSheet(t_sheetNameColumnName);

    let t_bellworkDateColumnName = row.get(bellworkDateColumnName);
    if (t_bellworkDateColumnName == null) throw new Error("Could not find bellwork date column name in Samples.updateTodaysQuestion()");
    let questionRow: number = questionSheet.skipBlankRows(1, +t_bellworkDateColumnName);
    while (questionSheet.getValue(questionRow, +t_bellworkDateColumnName) != bellworkSheetColumnEnd) {
      let dateInCell: Date = new Date(questionSheet.getValue(questionRow, +t_bellworkDateColumnName));
      if (areDatesEqual(dateToday, dateInCell, "month")) doForBellwork(args, row, questionRow, questionSheet, currentClass);
      questionRow++;
    }
  }

function doForBellwork(args: BellworkArgs, row: MapGS<string, string>, questionRow: number, questionSheet: SheetGS, currentClass: ClassGS): void {
    const {
      bellworkColumnName = "Bellwork Column",
      bellworkSlideName = "Bellwork",
      dailyPicturesColumnName = "Daily Pictures",
      daysToLookAheadColumnName = "Days to Look Ahead",
      upcomingDueDatesSlideName = "Upcoming Due Dates",
      exitTicketColumnName = "Exit Ticket Column",
      exitQuestionSlideName = "Exit Question",
      questionTypeColumnName = "Question Type Column",
      optionsColumnName = "Options Column",
      dueDateParams = {} as DateParams,
      slideshowColumnName = "Slideshow",
      displayBellworkOnForm = true,
      displayBellworkOnSlide = true,
      displayExitTicketOnSlide = true,
      displayUpcomingDueDates = true
  } = args;

  let t_bellworkColumnName = row.get(bellworkColumnName);
  if (t_bellworkColumnName == null) throw new Error("Could not find bellwork column name in Samples.doForBellwork()");
  let questionTitle: string = questionSheet.getValue(questionRow, +t_bellworkColumnName);

  let t_questionTypeColumnName = row.get(questionTypeColumnName);
  if (t_questionTypeColumnName == null) throw new Error("Could not find question type column name in Samples.doForBellwork()");
  let questionType: string = questionSheet.getValue(questionRow, +t_questionTypeColumnName);

  if (displayBellworkOnSlide || displayExitTicketOnSlide || displayUpcomingDueDates) {
    let t_slideshowColumnName = row.get(slideshowColumnName);
    if (t_slideshowColumnName == null) throw new Error("Could not find slide show column name in Samples.updateTodaysQuestion()");
    let slideShow = new SlideshowGS(t_slideshowColumnName);

    if (displayBellworkOnSlide) {
      let bellworkSlide: SlideGS = slideShow.getSlideByType(bellworkSlideName);

      let t_optionsColumnName = row.get(optionsColumnName);
      if (t_optionsColumnName != null) {
        let t_options = questionSheet.getValue(questionRow, +t_optionsColumnName);
        if ((t_options != null) && (t_options != "")) bellworkSlide.addItem(questionType, t_options);
      }
      bellworkSlide.setTitle(questionTitle);
      
      let t_dailyPicturesColumnName = row.get(dailyPicturesColumnName);
      if (t_dailyPicturesColumnName == null) throw new Error("Could not find daily pictures column name in Samples.updateTodaysQuestion()");
      slideShow.changeSlidePicture(questionSheet.getValue(questionRow, +t_dailyPicturesColumnName), bellworkSlide);
    }
    
    if (displayUpcomingDueDates) {
      let t_daysToLookAhead = row.get(daysToLookAheadColumnName);
      if (t_daysToLookAhead == null) throw new Error("Could not find days to look ahead in Samples.doForBellwork()");
      let upcomingEvents: string = new CalendarGS(currentClass.getCalendarId()).getUpcomingDueDates(+t_daysToLookAhead, dueDateParams);
      slideShow.getSlideByType(upcomingDueDatesSlideName).setList(upcomingEvents);
    }

    if (displayExitTicketOnSlide) {
      let t_exitTicketColumnName = row.get(exitTicketColumnName);
      if (t_exitTicketColumnName == null) throw new Error("Could not find exit ticket column name in Samples.doForBellwork()");
      slideShow.setSlideBodyByType(questionSheet.getValue(questionRow, +t_exitTicketColumnName), exitQuestionSlideName);
    }
  }

  if (displayBellworkOnForm) bellworkOnForm(args, row, questionRow, questionSheet, questionTitle, questionType);
}

function bellworkOnForm(args: BellworkArgs, row: MapGS<string, string>, questionRow: number, questionSheet: SheetGS, questionTitle: string, questionType: string) {
  const {
    bellworkTitleColumnName = "Bellwork Title",
    dateDelimiter = "/",
    dateInBellworkTitle = true,
    gridRowsColumnName = "Grid Rows Column",
    imageColumnName = "Image Column",
    dueDateParams = {} as DateParams,
    bellworkFormColumnName = "Bellwork Form",
  } = args;

  let dateToday: Date = new Date();

  let t_bellworkForm = row.get(bellworkFormColumnName);
  if (t_bellworkForm == null) throw new Error("Could not find bellwork form column name in Samples.updateTodaysQuestion()");
  let bellworkForm = new FormsGS(t_bellworkForm);

  let t_bellworkTitleColumnName = row.get(bellworkTitleColumnName);
  if (t_bellworkTitleColumnName == null) t_bellworkTitleColumnName = "Bellwork";
  
  if (dateInBellworkTitle) {
    let t_month = Number(dateToday.getUTCMonth()) + 1;
    let t_day = dateToday.getUTCDate();

    if ((dueDateParams == null) || (dueDateParams.dateOrder == null) || (dueDateParams.dateOrder.indexOf("M") > dueDateParams.dateOrder.indexOf("D"))) {
      t_bellworkTitleColumnName += " " + t_day + dateDelimiter + t_month;
    } else {
      t_bellworkTitleColumnName += " " + t_month + dateDelimiter + t_day;
    }
  }
  bellworkForm.deleteItems().setTitle(t_bellworkTitleColumnName);
  
  let t_optionsColumnName = row.get(bellworkTitleColumnName);
  let t_gridRowsColumnName = row.get(gridRowsColumnName);
  let t_optionsValue: string = "";
  if (t_optionsColumnName != null) t_optionsValue = questionSheet.getValue(questionRow, +t_optionsColumnName);
  if (t_optionsValue != "") {
    let t_rowsValue: string = "";
    if (t_gridRowsColumnName != null) t_rowsValue = questionSheet.getValue(questionRow, +t_gridRowsColumnName);
    if (t_rowsValue != "") {
      bellworkForm.addItem(questionTitle, questionType, bellworkForm.convertLinebreaksToList(t_optionsValue), bellworkForm.convertLinebreaksToList(t_rowsValue));
    } else {
      bellworkForm.addItem(questionTitle, questionType, bellworkForm.convertLinebreaksToList(t_optionsValue));
    }  
  } else {
    bellworkForm.addItem(questionTitle, questionType);
  }
  
  let t_imageColumnName = row.get(imageColumnName);
  if (t_imageColumnName != null) {
    let imageFileID: string = questionSheet.getValue(questionRow, +t_imageColumnName);
    let t_imageBlob: GoogleAppsScript.Base.Blob | boolean = new DriveGS().getImageBlob(imageFileID);
    if ((t_imageBlob != false) && (t_imageBlob != true)) bellworkForm.addImage(t_imageBlob);  
  } 
}