"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpreadsheetGS_1 = require("./SpreadsheetGS");
var ClassroomGS_1 = require("./ClassroomGS");
var DriveGS_1 = require("./DriveGS");
var Properties_1 = require("./Properties");
var DocsGS_1 = require("./DocsGS");
var SlideshowGS_1 = require("./SlideshowGS");
var FormsGS_1 = require("./FormsGS");
var CalendarGS_1 = require("./CalendarGS");
/**
 *
 * @param args
 */
function updateBellwork(args) {
    var _a = args.settingsName, settingsName = _a === void 0 ? "Bellwork" : _a, _b = args.questionTypesName, questionTypesName = _b === void 0 ? "Question Types" : _b, _c = args.classroomCodeColumnName, classroomCodeColumnName = _c === void 0 ? "Classroom Code" : _c, _d = args.bellworkFormColumnName, bellworkFormColumnName = _d === void 0 ? "Bellwork Form" : _d, _e = args.onSubmitBellworkFunctionName, onSubmitBellworkFunctionName = _e === void 0 ? "onSubmitBellwork" : _e, _f = args.spreadsheetColumnName, spreadsheetColumnName = _f === void 0 ? "Spreadsheet" : _f;
    var settings = Properties_1.getDataSheet();
    var bellworkSettings = settings.getDataAsObject(settingsName);
    var questionTypes = settings.getDataAsObject(questionTypesName);
    var allClasses = new ClassroomGS_1.ClassroomGS();
    for (var row in bellworkSettings) {
        var t_row = bellworkSettings.get(row);
        if ((t_row == undefined) || (classroomCodeColumnName == undefined) || (bellworkFormColumnName == undefined) || (spreadsheetColumnName == undefined))
            throw new Error("Could not find row in bellworkSettings");
        var t_classroomCode = t_row.get(classroomCodeColumnName);
        if (t_classroomCode == undefined)
            throw new Error("Classroom code not found");
        var t_bellworkForm = t_row.get(bellworkFormColumnName);
        if (t_bellworkForm == undefined)
            throw new Error("Classroom code not found");
        var t_spreadsheet = t_row.get(spreadsheetColumnName);
        if (t_spreadsheet == undefined)
            throw new Error("Classroom code not found");
        var currentClass = allClasses.getClass(t_classroomCode);
        Properties_1.updateTriggers(t_bellworkForm, onSubmitBellworkFunctionName);
        updateTodaysQuestion(args, currentClass, t_row, questionTypes);
        updateGoogleClassroom(args, currentClass, t_spreadsheet);
    }
}
function updateGoogleClassroom(args, currentClass, currentSheet) {
    var _a = args.newFileName, newFileName = _a === void 0 ? "Google Classroom Summary (TestSuite)" : _a, _b = args.templateName, templateName = _b === void 0 ? "Google Classroom Summary Template" : _b;
    var gClassData = currentClass.convertClassroomData();
    var gDrive = new DriveGS_1.DriveGS();
    for (var topic in gClassData) {
        var fileObject = gDrive.getOrCreateFileFromTemplateByName(currentSheet + " " + topic + " " + newFileName, templateName);
        new DocsGS_1.DocsGS(fileObject.getId()).writeClassroomDocuments(gClassData, topic, "Title");
    }
}
function updateTodaysQuestion(args, currentClass, row, questionTypes) {
    var _a = args.bellworkColumnName, bellworkColumnName = _a === void 0 ? "Bellwork Column" : _a, _b = args.bellworkDateColumnName, bellworkDateColumnName = _b === void 0 ? "Bellwork Date" : _b, _c = args.bellworkFormColumnName, bellworkFormColumnName = _c === void 0 ? "Bellwork Form" : _c, _d = args.bellworkSlideName, bellworkSlideName = _d === void 0 ? "Bellwork" : _d, _e = args.bellworkTitleColumnName, bellworkTitleColumnName = _e === void 0 ? "Bellwork Title" : _e, _f = args.spreadsheetColumnName, spreadsheetColumnName = _f === void 0 ? "Spreadsheet" : _f, _g = args.sheetNameColumnName, sheetNameColumnName = _g === void 0 ? "Sheet Name" : _g, _h = args.slideshowColumnName, slideshowColumnName = _h === void 0 ? "Slide Show" : _h, _j = args.bellworkSheetColumnEnd, bellworkSheetColumnEnd = _j === void 0 ? "END" : _j, _k = args.dailyPicturesColumnName, dailyPicturesColumnName = _k === void 0 ? "Daily Pictures" : _k, _l = args.daysToLookAheadColumnName, daysToLookAheadColumnName = _l === void 0 ? "Days to Look Ahead" : _l, _m = args.dateDelimiter, dateDelimiter = _m === void 0 ? "/" : _m, _o = args.exitTicketColumnName, exitTicketColumnName = _o === void 0 ? "Exit Ticket Column" : _o, _p = args.exitQuestionSlideName, exitQuestionSlideName = _p === void 0 ? "Exit Question" : _p, _q = args.questionTypeColumnName, questionTypeColumnName = _q === void 0 ? "Question Type Column" : _q, _r = args.optionsColumnName, optionsColumnName = _r === void 0 ? "Options Column" : _r, _s = args.gridRowsColumnName, gridRowsColumnName = _s === void 0 ? "Grid Rows Column" : _s, _t = args.imageColumnName, imageColumnName = _t === void 0 ? "Image Column" : _t;
    var questionSpreadsheet = new SpreadsheetGS_1.SpreadsheetGS(row.get(spreadsheetColumnName));
    var questionSheet = questionSpreadsheet.getSheet(row.get(sheetNameColumnName));
    var slideShow = new SlideshowGS_1.SlideshowGS(row.get(slideshowColumnName));
    var dateToday = new Date(), endDate = new Date();
    var bellworkForm = new FormsGS_1.FormsGS(row.get(bellworkFormColumnName));
    var questionRow = questionSheet.skipBlankRows(1, +row.get(bellworkDateColumnName));
    while (questionSheet.getValue(questionRow, +row.get(bellworkDateColumnName)) != bellworkSheetColumnEnd) {
        var dateInCell = new Date(questionSheet.getValue(questionRow, +row.get(bellworkDateColumnName)));
        if (Properties_1.areDatesEqual(dateToday, dateInCell, "month")) {
            var bellworkSlide = slideShow.getSlideByType(bellworkSlideName);
            slideShow.changeSlidePicture(questionSheet.getValue(questionRow, +row.get(dailyPicturesColumnName)), 1);
            var eventOptions = {};
            var upcomingEvents = new CalendarGS_1.CalendarGS(currentClass.getCalendarId()).getUpcomingDueDates(+row.get(daysToLookAheadColumnName), eventOptions);
            slideShow.getSlideByType("Upcoming Due Dates").setList(upcomingEvents);
            bellworkForm.deleteItems().setTitle(row.get(bellworkTitleColumnName) + (Number(dateToday.getUTCMonth()) + 1) + dateDelimiter + dateToday.getUTCDate());
            slideShow.setSlideBodyByType(questionSheet.getValue(questionRow, +row.get(exitTicketColumnName)), exitQuestionSlideName);
            var questionTitle = questionSheet.getValue(questionRow, +row.get(bellworkColumnName));
            if (questionTitle != "") {
                var questionType = questionSheet.getValue(questionRow, +row.get(questionTypeColumnName));
                bellworkSlide.addItem(questionType, questionSheet.getValue(questionRow, +row.get(optionsColumnName)).setTitle(questionTitle));
                bellworkForm.addItem(questionTitle, questionType, bellworkForm.convertLinebreaksToList(questionSheet.getValue(questionRow, +row.get(optionsColumnName))), bellworkForm.convertLinebreaksToList(questionSheet.getValue(questionRow, +row.get(gridRowsColumnName))));
                var imageFileID = questionSheet.getValue(questionRow, +row.get(imageColumnName));
                var t_imageBlob = new DriveGS_1.DriveGS().getImageBlob(imageFileID);
                if ((t_imageBlob != false) && (t_imageBlob != true))
                    bellworkForm.addImage(t_imageBlob);
            }
        }
        questionRow++;
    }
}
