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

/**
 * All of the arguments and other variables used by the Bellwork script
 */
type BellworkArgs = {
    settingsName?: string,
    questionTypesName?: string,
    classroomCodeColumnName?: string,
    bellworkColumnName?: string,
    bellworkDateColumnName?: string,
    bellworkFormColumnName?: string,
    bellworkSlideName?: string,
    bellworkTitleColumnName?: string,
    onSubmitBellworkFunctionName?: string,
    spreadsheetColumnName?: string,
    newFileName?: string,
    templateName?: string,
    sheetNameColumnName?: string,
    slideshowColumnName?: string,
    bellworkSheetColumnEnd?: string,    
    dailyPicturesColumnName?: string,
    daysToLookAheadColumnName?: string,
    upcomingDueDatesSlideName?: string,
    dateDelimiter?: string,
    exitTicketColumnName?: string,
    exitQuestionSlideName?: string,
    questionTypeColumnName?: string,
    optionsColumnName?: string,
    gridRowsColumnName?: string,
    imageColumnName?: string
}

/**
 * 
 * @param args 
 */
function updateBellwork(args: BellworkArgs): void {

    let {
        settingsName = "Bellwork",
        questionTypesName = "Question Types",
        classroomCodeColumnName = "Classroom Code",
        bellworkFormColumnName = "Bellwork Form",
        onSubmitBellworkFunctionName = "onSubmitBellwork",
        spreadsheetColumnName = "Spreadsheet",
    } = args;

    let settings: SpreadsheetGS = getDataSheet();
    let bellworkSettings: Map<string, Map<string, string>> = settings.getDataAsObject(settingsName);
    let questionTypes: object = settings.getDataAsObject(questionTypesName);
    let allClasses: ClassroomGS = new ClassroomGS();
    
    for (let row in bellworkSettings) {
      let t_row = bellworkSettings.get(row);
      if ((t_row == undefined) || (classroomCodeColumnName == undefined) || (bellworkFormColumnName == undefined) || (spreadsheetColumnName == undefined)) throw new Error("Could not find row in bellworkSettings");

      let t_classroomCode = t_row.get(classroomCodeColumnName);
      if (t_classroomCode == undefined) throw new Error("Classroom code not found");

      let t_bellworkForm = t_row.get(bellworkFormColumnName);
      if (t_bellworkForm == undefined) throw new Error("Classroom code not found");

      let t_spreadsheet = t_row.get(spreadsheetColumnName);
      if (t_spreadsheet == undefined) throw new Error("Classroom code not found");

      let currentClass = allClasses.getClass(t_classroomCode);
      updateTriggers(t_bellworkForm, onSubmitBellworkFunctionName);    
      updateTodaysQuestion(args, currentClass, t_row, questionTypes);
      updateGoogleClassroom(args, currentClass, t_spreadsheet);
    }
  }
  
  function updateGoogleClassroom(args: BellworkArgs, currentClass: ClassGS, currentSheet: string) {
    const {
        newFileName = "Google Classroom Summary (TestSuite)",
        templateName = "Google Classroom Summary Template",
    } = args;

    var gClassData = currentClass.convertClassroomData({});
    var gDrive = new DriveGS();
    for (var topic in gClassData) {
      var fileObject = gDrive.getOrCreateFileFromTemplateByName(currentSheet + " " + topic + " " + newFileName, templateName);
      new DocsGS(fileObject.getId()).writeClassroomDocuments(gClassData, topic);
    }
  }
  
  function updateTodaysQuestion(args: BellworkArgs, currentClass: ClassGS, row: Map<string, string>, questionTypes: object) {
    const {
        bellworkColumnName = "Bellwork Column",
        bellworkDateColumnName = "Bellwork Date",
        bellworkFormColumnName = "Bellwork Form",
        bellworkSlideName = "Bellwork",
        bellworkTitleColumnName = "Bellwork Title",
        spreadsheetColumnName = "Spreadsheet",
        sheetNameColumnName = "Sheet Name",
        slideshowColumnName = "Slide Show",
        bellworkSheetColumnEnd = "END",    
        dailyPicturesColumnName = "Daily Pictures",
        daysToLookAheadColumnName = "Days to Look Ahead",
        dateDelimiter = "/",
        exitTicketColumnName = "Exit Ticket Column",
        exitQuestionSlideName = "Exit Question",
        questionTypeColumnName = "Question Type Column",
        optionsColumnName = "Options Column",
        gridRowsColumnName = "Grid Rows Column",
        imageColumnName = "Image Column"
    } = args;

    let questionSpreadsheet: SpreadsheetGS = new SpreadsheetGS(row.get(spreadsheetColumnName)!);
    let questionSheet: SheetGS = questionSpreadsheet.getSheet(row.get(sheetNameColumnName)!);
    let slideShow: SlideshowGS = new SlideshowGS(row.get(slideshowColumnName)!);
    let dateToday: Date = new Date(), endDate: Date = new Date();
    let bellworkForm: FormsGS = new FormsGS(row.get(bellworkFormColumnName)!);

    let questionRow: number = questionSheet.skipBlankRows(1, +row.get(bellworkDateColumnName)!);
    while (questionSheet.getValue(questionRow, +row.get(bellworkDateColumnName)!) != bellworkSheetColumnEnd) {
      let dateInCell: Date = new Date(questionSheet.getValue(questionRow, +row.get(bellworkDateColumnName)!));
      if (areDatesEqual(dateToday, dateInCell, "month")) {
        let bellworkSlide: SlideGS = slideShow.getSlideByType(bellworkSlideName);
        slideShow.changeSlidePicture(questionSheet.getValue(questionRow, +row.get(dailyPicturesColumnName)!), 1);
        let eventOptions: DateParams = {

        };
        let upcomingEvents: string = new CalendarGS(currentClass.getCalendarId()).getUpcomingDueDates(+row.get(daysToLookAheadColumnName)!, eventOptions);
        slideShow.getSlideByType("Upcoming Due Dates").setList(upcomingEvents);
        bellworkForm.deleteItems().setTitle(row.get(bellworkTitleColumnName)! + (Number(dateToday.getUTCMonth()) + 1) + dateDelimiter + dateToday.getUTCDate());
        slideShow.setSlideBodyByType(questionSheet.getValue(questionRow, +row.get(exitTicketColumnName)!), exitQuestionSlideName);
        let questionTitle: string = questionSheet.getValue(questionRow, +row.get(bellworkColumnName)!);
        if (questionTitle != "") {
          let questionType: string = questionSheet.getValue(questionRow, +row.get(questionTypeColumnName)!);
          bellworkSlide.addItem(questionType, questionSheet.getValue(questionRow, +row.get(optionsColumnName)!).setTitle(questionTitle));
          bellworkForm.addItem(questionTitle, questionType, bellworkForm.convertLinebreaksToList(questionSheet.getValue(questionRow, +row.get(optionsColumnName)!)), bellworkForm.convertLinebreaksToList(questionSheet.getValue(questionRow, +row.get(gridRowsColumnName)!)));
          let imageFileID: string = questionSheet.getValue(questionRow, +row.get(imageColumnName)!);
          let t_imageBlob: GoogleAppsScript.Base.Blob | boolean = new DriveGS().getImageBlob(imageFileID);
          if ((t_imageBlob != false) && (t_imageBlob != true)) bellworkForm.addImage(t_imageBlob);      
        }
      }
      questionRow++;
    }
  }