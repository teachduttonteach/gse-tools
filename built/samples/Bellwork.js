import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { getDataSheet } from '../drive-sheets/DataSheet';
import { updateTriggers } from '../Triggers';
import { areDatesEqual } from '../utils/Utilities';
import { SlideshowGS } from '../slides/SlideshowGS';
import { FormsGS } from '../forms/FormsGS';
import { CalendarGS } from '../calendar/CalendarGS';
/**
 * Update the bellwork with the associated parameters
 *
 * @param {BellworkArgs} args the parameters
 */
function updateBellwork(args) {
    if (args == null)
        args = {};
    const { settingsName = 'Bellwork', bellworkFormColumnName = 'Bellwork Form', onSubmitBellworkFunctionName = 'onSubmitBellwork', spreadsheetColumnName = 'Spreadsheet', } = args;
    const settings = getDataSheet();
    const bellworkSettings = settings.getMapData(settingsName);
    bellworkSettings.reset();
    while (bellworkSettings.hasNext()) {
        const row = bellworkSettings.next();
        const thisRow = bellworkSettings.get(row);
        if (thisRow == undefined || bellworkFormColumnName == undefined || spreadsheetColumnName == undefined) {
            throw new Error('Could not find row in bellworkSettings');
        }
        const thisBellworkForm = thisRow.get(bellworkFormColumnName);
        if (thisBellworkForm == undefined || typeof thisBellworkForm !== 'string') {
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
function updateTodaysQuestion(args, row) {
    const { bellworkDateColumnName = 'Bellwork Date', spreadsheetColumnName = 'Spreadsheet', sheetNameColumnName = 'Sheet Name', bellworkSheetColumnEnd = 'END', bellworkColumnName = 'Bellwork Column', questionTypeColumnName = 'Question Type Column', displayBellworkOnForm = true, displayBellworkOnSlide = true, displayExitTicketOnSlide = true, displayUpcomingDueDates = true, } = args;
    const dateToday = new Date();
    const thisQuestionSpreadsheetName = row.get(spreadsheetColumnName);
    if (thisQuestionSpreadsheetName == null || typeof thisQuestionSpreadsheetName !== 'string') {
        throw new Error('Could not find spreadsheet column name in ' + 'Samples.updateTodaysQuestion()');
    }
    const questionSpreadsheet = new SpreadsheetGS(thisQuestionSpreadsheetName);
    const thisSheetNameColumnName = row.get(sheetNameColumnName);
    if (thisSheetNameColumnName == null || typeof thisSheetNameColumnName !== 'string') {
        throw new Error('Could not find sheet name column name in ' + 'Samples.updateTodaysQuestion()');
    }
    const questionSheet = questionSpreadsheet.getSheet(thisSheetNameColumnName);
    const thisBellworkDateColumnName = row.get(bellworkDateColumnName);
    if (thisBellworkDateColumnName == null) {
        throw new Error('Could not find bellwork date column name in ' + 'Samples.updateTodaysQuestion()');
    }
    let questionRow = questionSheet.skipBlankRows(1, +thisBellworkDateColumnName);
    while (questionSheet.getValue(questionRow, +thisBellworkDateColumnName) != bellworkSheetColumnEnd) {
        const dateInCell = new Date(questionSheet.getValue(questionRow, +thisBellworkDateColumnName));
        if (areDatesEqual(dateToday, dateInCell, 'month')) {
            const thisBellworkColumnName = row.get(bellworkColumnName);
            if (thisBellworkColumnName == null) {
                throw new Error('Could not find bellwork column name in ' + 'Samples.doForBellwork()');
            }
            const questionTitle = questionSheet.getValue(questionRow, +thisBellworkColumnName);
            const thisQuestionTypeColumnName = row.get(questionTypeColumnName);
            if (thisQuestionTypeColumnName == null) {
                throw new Error('Could not find question type column name in ' + 'Samples.doForBellwork()');
            }
            const questionType = questionSheet.getValue(questionRow, +thisQuestionTypeColumnName);
            if (displayBellworkOnForm) {
                showBellworkOnForm(args, row, questionRow, questionSheet, questionTitle, questionType);
            }
            if (displayBellworkOnSlide || displayExitTicketOnSlide || displayUpcomingDueDates) {
                showBellworkOnSlide(args, row, questionRow, questionSheet, questionTitle, questionType);
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
function showBellworkOnSlide(args, row, questionRow, questionSheet, questionTitle, questionType) {
    const { bellworkSlideName = 'Bellwork', dailyPicturesColumnName = 'Daily Pictures', daysToLookAheadColumnName = 'Days to Look Ahead', upcomingDueDatesSlideName = 'Upcoming Due Dates', exitTicketColumnName = 'Exit Ticket Column', exitQuestionSlideName = 'Exit Question', optionsColumnName = 'Options Column', dueDateParams = {}, slideshowColumnName = 'Slideshow', classroomCodeColumnName = 'Classroom Code', displayBellworkOnSlide = true, displayExitTicketOnSlide = true, displayUpcomingDueDates = true, } = args;
    if (displayBellworkOnSlide || displayExitTicketOnSlide || displayUpcomingDueDates) {
        const thisSlideshowColumnName = row.get(slideshowColumnName);
        if (thisSlideshowColumnName == null || typeof thisSlideshowColumnName !== 'string') {
            throw new Error('Could not find slide show column name in ' + 'Samples.updateTodaysQuestion()');
        }
        const slideShow = new SlideshowGS(thisSlideshowColumnName);
        if (displayBellworkOnSlide) {
            const bellworkSlide = slideShow.getSlideByType(bellworkSlideName);
            const theseOptionsColumnName = row.get(optionsColumnName);
            if (theseOptionsColumnName != null) {
                const theseOptions = questionSheet.getValue(questionRow, +theseOptionsColumnName);
                if (theseOptions != null && theseOptions != '') {
                    bellworkSlide.addItem(questionType, theseOptions);
                }
            }
            bellworkSlide.setTitle(questionTitle);
            const theseDailyPicturesColumnName = row.get(dailyPicturesColumnName);
            if (theseDailyPicturesColumnName == null) {
                throw new Error('Could not find daily pictures column name in ' + 'Samples.updateTodaysQuestion()');
            }
            slideShow.changeSlidePicture(questionSheet.getValue(questionRow, +theseDailyPicturesColumnName), bellworkSlide);
        }
        if (displayUpcomingDueDates) {
            const allClasses = new ClassroomGS();
            const thisClassroomCode = row.get(classroomCodeColumnName);
            if (thisClassroomCode == undefined || typeof thisClassroomCode !== 'string') {
                throw new Error('Classroom code not found');
            }
            const currentClass = allClasses.getClass(thisClassroomCode);
            const thisDaysToLookAhead = row.get(daysToLookAheadColumnName);
            if (thisDaysToLookAhead == null) {
                throw new Error('Could not find days to look ahead in ' + 'Samples.doForBellwork()');
            }
            const upcomingEvents = new CalendarGS(currentClass.getCalendarId()).getUpcomingDueDates(+thisDaysToLookAhead, dueDateParams);
            slideShow.getSlideByType(upcomingDueDatesSlideName).setList(upcomingEvents);
        }
        if (displayExitTicketOnSlide) {
            const thisExitTicketColumnName = row.get(exitTicketColumnName);
            if (thisExitTicketColumnName == null) {
                throw new Error('Could not find exit ticket column name in ' + 'Samples.doForBellwork()');
            }
            slideShow.setSlideBodyByType(questionSheet.getValue(questionRow, +thisExitTicketColumnName), exitQuestionSlideName);
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
function showBellworkOnForm(args, row, questionRow, questionSheet, questionTitle, questionType) {
    const { bellworkTitleColumnName = 'Bellwork Title', dateDelimiter = '/', dateInBellworkTitle = true, gridRowsColumnName = 'Grid Rows Column', imageColumnName = 'Image Column', dueDateParams = {}, bellworkFormColumnName = 'Bellwork Form', } = args;
    const dateToday = new Date();
    const thisBellworkForm = row.get(bellworkFormColumnName);
    if (thisBellworkForm == null || typeof thisBellworkForm !== 'string') {
        throw new Error('Could not find bellwork form column name in ' + 'Samples.updateTodaysQuestion()');
    }
    const bellworkForm = new FormsGS(thisBellworkForm);
    let thisBellworkTitleColumnName = row.get(bellworkTitleColumnName);
    if (thisBellworkTitleColumnName == null || typeof thisBellworkTitleColumnName !== 'string') {
        thisBellworkTitleColumnName = 'Bellwork';
    }
    if (dateInBellworkTitle) {
        const thisMonth = Number(dateToday.getUTCMonth()) + 1;
        const thisDay = dateToday.getUTCDate();
        if (dueDateParams == null ||
            dueDateParams.dateOrder == null ||
            dueDateParams.dateOrder.indexOf('M') > dueDateParams.dateOrder.indexOf('D')) {
            thisBellworkTitleColumnName += ' ' + thisDay + dateDelimiter + thisMonth;
        }
        else {
            thisBellworkTitleColumnName += ' ' + thisMonth + dateDelimiter + thisDay;
        }
    }
    bellworkForm.deleteItems().setTitle(thisBellworkTitleColumnName);
    const theseOptionsColumnName = row.get(bellworkTitleColumnName);
    const theseGridRowsColumnName = row.get(gridRowsColumnName);
    let theseOptionsValue = '';
    if (theseOptionsColumnName != null) {
        theseOptionsValue = questionSheet.getValue(questionRow, +theseOptionsColumnName);
    }
    if (theseOptionsValue != '') {
        let theseRowsValue = '';
        if (theseGridRowsColumnName != null) {
            theseRowsValue = questionSheet.getValue(questionRow, +theseGridRowsColumnName);
        }
        if (theseRowsValue != '') {
            bellworkForm.addItem(questionTitle, questionType, bellworkForm.convertLinebreaksToList(theseOptionsValue), bellworkForm.convertLinebreaksToList(theseRowsValue));
        }
        else {
            bellworkForm.addItem(questionTitle, questionType, bellworkForm.convertLinebreaksToList(theseOptionsValue));
        }
    }
    else {
        bellworkForm.addItem(questionTitle, questionType);
    }
    const thisImageColumnName = row.get(imageColumnName);
    if (thisImageColumnName != null) {
        const imageFileID = questionSheet.getValue(questionRow, +thisImageColumnName);
        const thisImageBlob = new DriveGS().getImageBlob(imageFileID);
        if (thisImageBlob != false && thisImageBlob != true) {
            bellworkForm.addImage(thisImageBlob);
        }
    }
}
