import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { getDataSheet } from '../DataSheet';
import { areDatesEqual, getTodaysDate } from '../utils/Utilities';
import { SlideshowGS } from '../slides/SlideshowGS';
import { FormsGS } from '../forms/FormsGS';
import { CalendarGS } from '../calendar/CalendarGS';
import { QuestionType } from '../enums/QuestionType';
import { FormEventGS } from '../forms/FormEventGS';
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
export function updateBellwork(args) {
    if (args == null)
        args = {};
    const { bellworkSettingsSheetName = 'Bellwork', bellworkFormIDColumnName = 'Bellwork Form ID', onSubmitBellworkFunctionName = 'onSubmitBellwork', bellworkSpreadsheetIDColumnName = 'Bellwork Spreadsheet ID', dataSheet, } = args;
    const settings = getDataSheet(dataSheet, bellworkSettingsSheetName);
    const bellworkSettings = settings.getDataAsMap(bellworkSettingsSheetName);
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
function updateTodaysQuestion(args, row, form) {
    const { bellworkDateColumnName = 'Bellwork Date Column Number', bellworkSpreadsheetIDColumnName = 'Spreadsheet', bellworkSheetNameColumnName = 'Sheet Name', bellworkSheetDateColumnEnd = 'END', bellworkColumnName = 'Bellwork Column', questionTypeColumnName = 'Question Type Column Number', displayBellworkOnForm = true, displayBellworkOnSlide = true, displayExitQuestionOnSlide = true, displayUpcomingDueDates = true, timezoneOffset = -5, } = args;
    const dateToday = getTodaysDate(timezoneOffset);
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
    const questionSpreadsheet = new SpreadsheetGS(thisSpreadsheetID, thisSheetName);
    const questionSheet = questionSpreadsheet.getSheet(thisSheetName);
    const thisBellworkDateColumnName = row.get(bellworkDateColumnName);
    if (thisBellworkDateColumnName == null) {
        throw new Error('Could not find bellwork date column name in ' +
            'Bellwork.updateTodaysQuestion()');
    }
    let questionRow = questionSheet.skipBlankRows(1, +thisBellworkDateColumnName);
    while ((questionRow <= questionSheet.getLastRow()) &&
        ((questionSheet.getValue(questionRow, +thisBellworkDateColumnName) !==
            bellworkSheetDateColumnEnd))) {
        const dateInCell = new Date(questionSheet.getValue(questionRow, +thisBellworkDateColumnName));
        if (areDatesEqual(dateToday, dateInCell, 'month')) {
            const thisBellworkColumnName = row.get(bellworkColumnName);
            if (thisBellworkColumnName == null) {
                throw new Error('Could not find bellwork column name in ' +
                    'Samples.doForBellwork()');
            }
            const questionTitle = questionSheet.
                getValue(questionRow, +thisBellworkColumnName).toString();
            const thisQuestionType = row.get(questionTypeColumnName);
            if (thisQuestionType == null) {
                throw new Error('Could not find question type column name in ' +
                    'Samples.doForBellwork()');
            }
            let thisQuestionTypeString = QuestionType[questionSheet.getValue(questionRow, +thisQuestionType).toString()];
            if ((thisQuestionTypeString === undefined) ||
                !(thisQuestionTypeString in QuestionType)) {
                console.log("WARNING: Question type '" + thisQuestionTypeString +
                    "' not a valid question type in updateTodaysQuestion()");
                thisQuestionTypeString = QuestionType.Paragraph;
            }
            if (displayBellworkOnForm) {
                showBellworkOnForm(args, row, form, questionRow, questionSheet, questionTitle, thisQuestionTypeString);
            }
            if (displayBellworkOnSlide || displayExitQuestionOnSlide ||
                displayUpcomingDueDates) {
                showBellworkOnSlide(args, row, questionRow, questionSheet, questionTitle, thisQuestionTypeString);
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
function showBellworkOnSlide(args, settingsRow, questionRow, questionSheet, questionTitle, questionType) {
    const { bellworkSlideNotes = 'Bellwork', dailyPicturesColumnName = 'Daily Pictures Folder ID', dailyPicturesNotes = 'Daily Pictures', daysToLookAheadColumnName = 'Days to Look Ahead', upcomingDueDatesSlideNotes = 'Upcoming Due Dates', exitQuestionColumnName = 'Exit Question Column Number', exitQuestionSlideNotes = 'Exit Question', optionsColumnName = 'Question Options Column Number', dueDateParams = {}, bellworkSlideshowIDColumnName = 'Bellwork Slideshow ID', classroomCodeColumnName = 'Classroom Code', imageColumnName = 'Bellwork Form Image Column', displayBellworkOnSlide = true, displayExitQuestionOnSlide = true, displayUpcomingDueDates = true, timezoneOffset = -5, } = args;
    const thisSlideshowID = settingsRow.get(bellworkSlideshowIDColumnName);
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
            slideShow.changeSlidePictureFromFolder(thisBellworkImageFolder.toString(), thisSlide);
        }
    }
    if (displayBellworkOnSlide || displayExitQuestionOnSlide ||
        displayUpcomingDueDates) {
        if (displayBellworkOnSlide) {
            const bellworkSlide = slideShow.getSlideByNotes(bellworkSlideNotes);
            if (bellworkSlide != null) {
                const theseOptionsColumnName = settingsRow.get(optionsColumnName);
                if (theseOptionsColumnName != null) {
                    const theseOptions = questionSheet.getValue(questionRow, +theseOptionsColumnName).toString();
                    if (theseOptions !== null && theseOptions != '') {
                        bellworkSlide.addItem(questionType, theseOptions);
                    }
                }
                bellworkSlide.setTitle(questionTitle);
                const thisBellworkImage = settingsRow.get(imageColumnName);
                if (thisBellworkImage != null) {
                    slideShow.changeSlidePicture(questionSheet.getValue(questionRow, +thisBellworkImage).toString(), bellworkSlide);
                }
            }
        }
        if (displayUpcomingDueDates) {
            const allClasses = new ClassroomGS();
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
            const upcomingEvents = new CalendarGS(currentClass.getCalendarId()).getUpcomingDueDates(+thisDaysToLookAhead, dueDateParams, timezoneOffset);
            const thisSlide = slideShow.getSlideByNotes(upcomingDueDatesSlideNotes);
            if (thisSlide != null)
                thisSlide.setList(upcomingEvents);
        }
        if (displayExitQuestionOnSlide) {
            const thisExitTicketColumnName = settingsRow.get(exitQuestionColumnName);
            if ((thisExitTicketColumnName != null) &&
                (+thisExitTicketColumnName > 0)) {
                slideShow.setSlideBodyByType(exitQuestionSlideNotes, questionSheet.getValue(questionRow, +thisExitTicketColumnName).toString());
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
function showBellworkOnForm(args, row, bellworkForm, questionRow, questionSheet, questionTitle, questionType) {
    const { bellworkTitleColumnName = 'Bellwork Title', dateDelimiter = '/', dateInBellworkTitle = true, optionsColumnName = 'Question Options Column Number', gridRowsColumnName = 'Grid Rows Column Number', imageColumnName = 'Image Column', dueDateParams = {}, timezoneOffset = -5, } = args;
    const dateToday = getTodaysDate(timezoneOffset);
    let thisBellworkTitleColumnName = row.get(bellworkTitleColumnName);
    if (thisBellworkTitleColumnName == null ||
        typeof thisBellworkTitleColumnName !== 'string') {
        thisBellworkTitleColumnName = 'Bellwork';
    }
    if (dateInBellworkTitle) {
        const thisMonth = Number(dateToday.getUTCMonth()) + 1;
        const thisDay = dateToday.getUTCDate();
        if (dueDateParams == null ||
            dueDateParams.dateOrder == null ||
            dueDateParams.dateOrder.indexOf('M') >
                dueDateParams.dateOrder.indexOf('D')) {
            thisBellworkTitleColumnName += ' ' + thisDay + dateDelimiter + thisMonth;
        }
        else {
            thisBellworkTitleColumnName += ' ' + thisMonth + dateDelimiter + thisDay;
        }
    }
    bellworkForm.deleteItems().setTitle(thisBellworkTitleColumnName);
    const theseOptionsColumnName = row.get(optionsColumnName);
    const theseGridRowsColumnName = row.get(gridRowsColumnName);
    let theseOptionsValue = '';
    if (theseOptionsColumnName != null) {
        theseOptionsValue = questionSheet.getValue(questionRow, +theseOptionsColumnName).toString();
    }
    if (theseOptionsValue != '') {
        let theseRowsValue = '';
        if (theseGridRowsColumnName !== null) {
            theseRowsValue = questionSheet.getValue(questionRow, +theseGridRowsColumnName).toString();
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
    const thisImageColumnNumber = row.get(imageColumnName);
    if (thisImageColumnNumber !== null) {
        const imageFileID = questionSheet.getValue(questionRow, +thisImageColumnNumber).toString();
        if (imageFileID != '') {
            const thisImageBlob = new DriveGS().getImageBlob(imageFileID);
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
export function tabulateBellwork(event, args) {
    const formEvent = new FormEventGS(event);
    if (args == undefined)
        args = {};
    const { bellworkResultsColumn = 'Bellwork Results Sheet', dataSheet = 'gse-tools Settings', sheetName = 'Bellwork', bellworkTitleColumn = 'Bellwork Title', spreadsheetIDColumn = 'Spreadsheet ID', columnDateParams = {}, } = args;
    const formTitle = formEvent.getTitle();
    const response = formEvent.getItemResponse(0);
    if (response instanceof Array) {
        throw new Error('Bellwork form response ' +
            'needs to have single values only in tabulateBellwork()');
    }
    const title = (formEvent.getFullDate(columnDateParams) + '\n' +
        formEvent.getItemTitle(0));
    const fullName = formEvent.getNameFromEmail();
    if (fullName.length != 2) {
        throw new Error('Could not get name from email' +
            ' in tabulateBellwork()');
    }
    const allClasses = getDataSheet(dataSheet, sheetName)
        .getDataAsMap(sheetName);
    let destinationSheetName = '';
    let bellworkSheetID = '';
    for (const className of allClasses.keys()) {
        const classData = allClasses.get(className);
        if ((classData != null) && (classData != undefined)) {
            const bellworkTitle = classData.get(bellworkTitleColumn);
            if ((bellworkTitle != null) && (bellworkTitle != undefined)) {
                if (formTitle.indexOf(bellworkTitle.toString()) == 0) {
                    const bellworkResultsSheetName = classData.get(bellworkResultsColumn);
                    if ((bellworkResultsSheetName != null) &&
                        (bellworkResultsSheetName != undefined)) {
                        destinationSheetName = bellworkResultsSheetName.toString();
                    }
                    else {
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
            }
            else {
                throw new Error('Could not find bellwork title for class "' +
                    className + '" in column "' + bellworkTitleColumn +
                    '" in tabulateBellwork()');
            }
        }
        else {
            throw new Error('Could not find data for class "' + className +
                '" in tabulateBellwork()');
        }
    }
    const responseSheet = new SpreadsheetGS(bellworkSheetID, destinationSheetName).getSheet(destinationSheetName);
    if (responseSheet.getValue(1, 3) != title) {
        responseSheet.insertCol(3).setValue(title, 1, 3);
    }
    let foundName = false;
    const lastRow = responseSheet.getLastRow();
    for (let i = 2; i <= lastRow; i++) {
        if ((responseSheet.getValue(i, 1) == fullName[0]) &&
            (responseSheet.getValue(i, 2) == fullName[1])) {
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
