import { SpreadsheetGS } from "./SpreadsheetGS";
import { ClassroomGS } from "./ClassroomGS";
import { DriveGS } from "./DriveGS";
import { areDatesEqual, getDataSheet, updateTriggers } from "./Properties";
import { SlideshowGS } from "./SlideshowGS";
import { FormsGS } from "./FormsGS";
import { CalendarGS } from "./CalendarGS";
/**
 *
 * @param args
 */
function updateBellwork(args) {
    if (args == null)
        args = {};
    let { settingsName = "Bellwork", bellworkFormColumnName = "Bellwork Form", onSubmitBellworkFunctionName = "onSubmitBellwork", spreadsheetColumnName = "Spreadsheet", } = args;
    let settings = getDataSheet();
    let bellworkSettings = settings.getMapData(settingsName);
    bellworkSettings.reset();
    while (bellworkSettings.hasNext()) {
        let row = bellworkSettings.next();
        let t_row = bellworkSettings.get(row);
        if ((t_row == undefined) || (bellworkFormColumnName == undefined) || (spreadsheetColumnName == undefined))
            throw new Error("Could not find row in bellworkSettings");
        let t_bellworkForm = t_row.get(bellworkFormColumnName);
        if (t_bellworkForm == undefined)
            throw new Error("Classroom code not found");
        let t_spreadsheet = t_row.get(spreadsheetColumnName);
        if (t_spreadsheet == undefined)
            throw new Error("Classroom code not found");
        updateTriggers(t_bellworkForm, onSubmitBellworkFunctionName);
        updateTodaysQuestion(args, t_row);
    }
}
function updateTodaysQuestion(args, row) {
    const { bellworkDateColumnName = "Bellwork Date", spreadsheetColumnName = "Spreadsheet", sheetNameColumnName = "Sheet Name", bellworkSheetColumnEnd = "END", classroomCodeColumnName = "Classroom Code", } = args;
    let dateToday = new Date();
    let allClasses = new ClassroomGS();
    let t_classroomCode = row.get(classroomCodeColumnName);
    if (t_classroomCode == undefined)
        throw new Error("Classroom code not found");
    let currentClass = allClasses.getClass(t_classroomCode);
    let t_questionSpreadsheetName = row.get(spreadsheetColumnName);
    if (t_questionSpreadsheetName == null)
        throw new Error("Could not find spreadsheet column name in Samples.updateTodaysQuestion()");
    let questionSpreadsheet = new SpreadsheetGS(t_questionSpreadsheetName);
    let t_sheetNameColumnName = row.get(sheetNameColumnName);
    if (t_sheetNameColumnName == null)
        throw new Error("Could not find sheet name column name in Samples.updateTodaysQuestion()");
    let questionSheet = questionSpreadsheet.getSheet(t_sheetNameColumnName);
    let t_bellworkDateColumnName = row.get(bellworkDateColumnName);
    if (t_bellworkDateColumnName == null)
        throw new Error("Could not find bellwork date column name in Samples.updateTodaysQuestion()");
    let questionRow = questionSheet.skipBlankRows(1, +t_bellworkDateColumnName);
    while (questionSheet.getValue(questionRow, +t_bellworkDateColumnName) != bellworkSheetColumnEnd) {
        let dateInCell = new Date(questionSheet.getValue(questionRow, +t_bellworkDateColumnName));
        if (areDatesEqual(dateToday, dateInCell, "month"))
            doForBellwork(args, row, questionRow, questionSheet, currentClass);
        questionRow++;
    }
}
function doForBellwork(args, row, questionRow, questionSheet, currentClass) {
    const { bellworkColumnName = "Bellwork Column", bellworkSlideName = "Bellwork", dailyPicturesColumnName = "Daily Pictures", daysToLookAheadColumnName = "Days to Look Ahead", upcomingDueDatesSlideName = "Upcoming Due Dates", exitTicketColumnName = "Exit Ticket Column", exitQuestionSlideName = "Exit Question", questionTypeColumnName = "Question Type Column", optionsColumnName = "Options Column", dueDateParams = {}, slideshowColumnName = "Slideshow", displayBellworkOnForm = true, displayBellworkOnSlide = true, displayExitTicketOnSlide = true, displayUpcomingDueDates = true } = args;
    let t_bellworkColumnName = row.get(bellworkColumnName);
    if (t_bellworkColumnName == null)
        throw new Error("Could not find bellwork column name in Samples.doForBellwork()");
    let questionTitle = questionSheet.getValue(questionRow, +t_bellworkColumnName);
    let t_questionTypeColumnName = row.get(questionTypeColumnName);
    if (t_questionTypeColumnName == null)
        throw new Error("Could not find question type column name in Samples.doForBellwork()");
    let questionType = questionSheet.getValue(questionRow, +t_questionTypeColumnName);
    if (displayBellworkOnSlide || displayExitTicketOnSlide || displayUpcomingDueDates) {
        let t_slideshowColumnName = row.get(slideshowColumnName);
        if (t_slideshowColumnName == null)
            throw new Error("Could not find slide show column name in Samples.updateTodaysQuestion()");
        let slideShow = new SlideshowGS(t_slideshowColumnName);
        if (displayBellworkOnSlide) {
            let bellworkSlide = slideShow.getSlideByType(bellworkSlideName);
            let t_optionsColumnName = row.get(optionsColumnName);
            if (t_optionsColumnName != null) {
                let t_options = questionSheet.getValue(questionRow, +t_optionsColumnName);
                if ((t_options != null) && (t_options != ""))
                    bellworkSlide.addItem(questionType, t_options);
            }
            bellworkSlide.setTitle(questionTitle);
            let t_dailyPicturesColumnName = row.get(dailyPicturesColumnName);
            if (t_dailyPicturesColumnName == null)
                throw new Error("Could not find daily pictures column name in Samples.updateTodaysQuestion()");
            slideShow.changeSlidePicture(questionSheet.getValue(questionRow, +t_dailyPicturesColumnName), bellworkSlide);
        }
        if (displayUpcomingDueDates) {
            let t_daysToLookAhead = row.get(daysToLookAheadColumnName);
            if (t_daysToLookAhead == null)
                throw new Error("Could not find days to look ahead in Samples.doForBellwork()");
            let upcomingEvents = new CalendarGS(currentClass.getCalendarId()).getUpcomingDueDates(+t_daysToLookAhead, dueDateParams);
            slideShow.getSlideByType(upcomingDueDatesSlideName).setList(upcomingEvents);
        }
        if (displayExitTicketOnSlide) {
            let t_exitTicketColumnName = row.get(exitTicketColumnName);
            if (t_exitTicketColumnName == null)
                throw new Error("Could not find exit ticket column name in Samples.doForBellwork()");
            slideShow.setSlideBodyByType(questionSheet.getValue(questionRow, +t_exitTicketColumnName), exitQuestionSlideName);
        }
    }
    if (displayBellworkOnForm)
        bellworkOnForm(args, row, questionRow, questionSheet, questionTitle, questionType);
}
function bellworkOnForm(args, row, questionRow, questionSheet, questionTitle, questionType) {
    const { bellworkTitleColumnName = "Bellwork Title", dateDelimiter = "/", dateInBellworkTitle = true, gridRowsColumnName = "Grid Rows Column", imageColumnName = "Image Column", dueDateParams = {}, bellworkFormColumnName = "Bellwork Form", } = args;
    let dateToday = new Date();
    let t_bellworkForm = row.get(bellworkFormColumnName);
    if (t_bellworkForm == null)
        throw new Error("Could not find bellwork form column name in Samples.updateTodaysQuestion()");
    let bellworkForm = new FormsGS(t_bellworkForm);
    let t_bellworkTitleColumnName = row.get(bellworkTitleColumnName);
    if (t_bellworkTitleColumnName == null)
        t_bellworkTitleColumnName = "Bellwork";
    if (dateInBellworkTitle) {
        let t_month = Number(dateToday.getUTCMonth()) + 1;
        let t_day = dateToday.getUTCDate();
        if ((dueDateParams == null) || (dueDateParams.dateOrder == null) || (dueDateParams.dateOrder.indexOf("M") > dueDateParams.dateOrder.indexOf("D"))) {
            t_bellworkTitleColumnName += " " + t_day + dateDelimiter + t_month;
        }
        else {
            t_bellworkTitleColumnName += " " + t_month + dateDelimiter + t_day;
        }
    }
    bellworkForm.deleteItems().setTitle(t_bellworkTitleColumnName);
    let t_optionsColumnName = row.get(bellworkTitleColumnName);
    let t_gridRowsColumnName = row.get(gridRowsColumnName);
    let t_optionsValue = "";
    if (t_optionsColumnName != null)
        t_optionsValue = questionSheet.getValue(questionRow, +t_optionsColumnName);
    if (t_optionsValue != "") {
        let t_rowsValue = "";
        if (t_gridRowsColumnName != null)
            t_rowsValue = questionSheet.getValue(questionRow, +t_gridRowsColumnName);
        if (t_rowsValue != "") {
            bellworkForm.addItem(questionTitle, questionType, bellworkForm.convertLinebreaksToList(t_optionsValue), bellworkForm.convertLinebreaksToList(t_rowsValue));
        }
        else {
            bellworkForm.addItem(questionTitle, questionType, bellworkForm.convertLinebreaksToList(t_optionsValue));
        }
    }
    else {
        bellworkForm.addItem(questionTitle, questionType);
    }
    let t_imageColumnName = row.get(imageColumnName);
    if (t_imageColumnName != null) {
        let imageFileID = questionSheet.getValue(questionRow, +t_imageColumnName);
        let t_imageBlob = new DriveGS().getImageBlob(imageFileID);
        if ((t_imageBlob != false) && (t_imageBlob != true))
            bellworkForm.addImage(t_imageBlob);
    }
}
