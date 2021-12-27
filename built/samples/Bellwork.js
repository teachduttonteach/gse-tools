import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { DataSheet } from '../DataSheet';
import { Utilities } from '../utils/Utilities';
import { FormsGS } from '../forms/FormsGS';
import { DateUtilities } from '../DateParams';
import { CalendarGS } from '../calendar/CalendarGS';
import { FormEventGS } from '../forms/FormEventGS';
import { SampleUtilities } from './SampleUtilities';
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
export function updateQuestion(args = {}, slideDisplayArgs = {}) {
    const { settingsName = 'Bellwork', questionFormIDColumnName = 'Bellwork Form ID', onSubmitQuestionFunctionName = 'onSubmitQuestion', questionSpreadsheetIDColumnName = 'Bellwork Spreadsheet ID', questionSlideshowIDColumnName = 'Bellwork Slideshow ID', dataSheet, questionDateColumnName = 'Date', questionSheetNameColumnName = 'Sheet Name', questionSheetDateColumnEnd = 'END', questionColumnName = 'Bellwork', questionTypeColumnName = 'Question Type', displayQuestionOnForm = true, displayQuestionOnSlide = true, displayUpcomingDueDates = true, updateSlideDate = false, timezoneOffset = -5, } = args;
    const dataSheetInterface = new DataSheet();
    const settings = dataSheetInterface.getDataSheet(dataSheet, settingsName);
    const questionSettings = settings.getDataAsMap(settingsName);
    const utils = new Utilities();
    const dateToday = utils.getTodaysDate(timezoneOffset);
    const sampleUtils = new SampleUtilities();
    // For each entry (usually class) in the settings sheet
    questionSettings.forEach(function (thisRow) {
        // Get the spreadsheet that holds all of the questions
        const questionSheet = sampleUtils._getSecondarySheet(thisRow, questionSpreadsheetIDColumnName, questionSheetNameColumnName);
        // Get the current slideshow
        const slideShow = sampleUtils._getSlideshow(thisRow, displayQuestionOnSlide || displayUpcomingDueDates, questionSlideshowIDColumnName);
        // The row of the question
        let questionRow = 1; //questionSheet.skipBlankRows(1, +thisQuestionDateColumnName);
        // As long as there are more questions
        while (questionRow <= questionSheet.getLastRow() &&
            questionSheet.getValueFromColumnHeader(questionRow, questionDateColumnName) !== questionSheetDateColumnEnd) {
            // Get the date inside the current cell
            const dateInCell = new Date(questionSheet.getValueFromColumnHeader(questionRow, questionDateColumnName));
            // If this is today, then process
            if (utils.areDatesEqual(dateToday, dateInCell, 'month')) {
                const questionTitle = questionSheet.getValueFromColumnHeader(questionRow, questionColumnName).toString();
                let thisQuestionTypeString = sampleUtils._getQuestionTypeString(questionSheet, questionRow, questionTypeColumnName);
                if (displayQuestionOnForm) {
                    const thisQuestionForm = thisRow.get(questionFormIDColumnName);
                    if (thisQuestionForm !== undefined && typeof thisQuestionForm === 'string') {
                        const thisForm = new FormsGS(thisQuestionForm);
                        thisForm.replaceTrigger('S', onSubmitQuestionFunctionName);
                        showQuestionOnForm(args, thisRow, thisForm, questionRow, questionSheet, questionTitle, thisQuestionTypeString);
                    }
                }
                if (updateSlideDate && slideShow !== undefined) {
                    updateDateOnSlide(args, dateToday, slideShow);
                }
                if (displayQuestionOnSlide && slideShow !== undefined) {
                    showQuestionOnSlide(args, thisRow, questionRow, questionSheet, questionTitle, thisQuestionTypeString, slideShow, slideDisplayArgs);
                }
                if (displayUpcomingDueDates && slideShow !== undefined) {
                    showUpcomingDueDates(args, thisRow, slideShow);
                }
                return true;
            }
            questionRow++;
        }
        return false;
    });
}
function updateDateOnSlide(args, dateToday, slideShow) {
    const { slideDateTitle = "Date", displayDateParams = {}, } = args;
    const dateUtilitiesInterface = new DateUtilities();
    slideShow.setSlideTextByTitle(slideDateTitle, dateUtilitiesInterface.formatTodaysDate(displayDateParams, dateToday), true);
}
/**
 * Display the daily image for the slideshow
 *
 * @param {QuestionArgs} args the passed arguments
 * @param {Map<string | Date, string | Date>} settingsRow the info about
 * the current date
 * @param {SlideshowGS} slideShow the current slideshow
 */
function showDailyImage(args, settingsRow, slideShow) {
    const { dailyPicturesColumnName = 'Daily Pictures Folder ID', dailyPicturesNotes = 'Daily Pictures', } = args;
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
function showUpcomingDueDates(args, settingsRow, slideShow) {
    const { daysToLookAheadColumnName = 'Days to Look Ahead', upcomingDueDatesSlideNotes = 'Upcoming Due Dates', dueDateParams = {}, classroomCodeColumnName = 'Classroom Code', timezoneOffset = -5, } = args;
    const allClasses = new ClassroomGS();
    const thisClassroomCode = settingsRow.get(classroomCodeColumnName);
    if (thisClassroomCode === undefined || typeof thisClassroomCode !== 'string') {
        throw new Error('Classroom code not found');
    }
    const currentClass = allClasses.getClass(thisClassroomCode);
    const thisDaysToLookAhead = settingsRow.get(daysToLookAheadColumnName);
    if (thisDaysToLookAhead == null) {
        throw new Error('Could not find days to look ahead in ' + 'Samples.doForBellwork()');
    }
    const upcomingEvents = new CalendarGS(currentClass.getCalendarId(), timezoneOffset).getUpcomingDueDates(+thisDaysToLookAhead, dueDateParams);
    const thisSlide = slideShow.getSlideByNotes(upcomingDueDatesSlideNotes);
    if (thisSlide != null)
        thisSlide.setList(upcomingEvents);
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
function showQuestionOnSlide(args, settingsRow, questionRow, questionSheet, questionTitle, questionType, slideShow, slideDisplayParams) {
    const { optionsColumnName = 'Options', imageColumnName = 'Picture', } = args;
    const textBoxSlideParams = {
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
function showQuestionOnForm(args, row, questionForm, questionRow, questionSheet, questionTitle, questionType) {
    const { questionTitleColumnName = 'Bellwork Title', dateInQuestionTitle = true, optionsColumnName = 'Options', gridRowsColumnName = 'Grid Rows Column Number', imageColumnName = 'Image Column', dueDateParams = {}, timezoneOffset = -5, } = args;
    const { dateOrder = 'MD', dateDelim = '/' } = dueDateParams;
    const utils = new Utilities();
    const dateToday = utils.getTodaysDate(timezoneOffset);
    let thisQuestionTitleColumnName = row.get(questionTitleColumnName);
    if (thisQuestionTitleColumnName == null || typeof thisQuestionTitleColumnName !== 'string') {
        thisQuestionTitleColumnName = 'Bellwork';
    }
    if (dateInQuestionTitle) {
        const thisMonth = Number(dateToday.getUTCMonth()) + 1;
        const thisDay = dateToday.getUTCDate();
        if (dateOrder.indexOf('M') > dateOrder.indexOf('D')) {
            thisQuestionTitleColumnName += ' ' + thisDay + dateDelim + thisMonth;
        }
        else {
            thisQuestionTitleColumnName += ' ' + thisMonth + dateDelim + thisDay;
        }
    }
    questionForm.deleteItems().setTitle(thisQuestionTitleColumnName);
    const theseGridRowsColumnName = row.get(gridRowsColumnName);
    let theseOptionsValue = questionSheet.getValueFromColumnHeader(questionRow, optionsColumnName).toString();
    if (theseOptionsValue != '') {
        let theseRowsValue = '';
        if ((theseGridRowsColumnName !== undefined) && (theseGridRowsColumnName !== null)) {
            theseRowsValue = questionSheet.getValue(questionRow, +theseGridRowsColumnName).toString();
        }
        if (theseRowsValue != '') {
            questionForm.addItem(questionTitle, questionType, questionForm.convertLinebreaksToList(theseOptionsValue), questionForm.convertLinebreaksToList(theseRowsValue));
        }
        else {
            questionForm.addItem(questionTitle, questionType, questionForm.convertLinebreaksToList(theseOptionsValue));
        }
    }
    else {
        questionForm.addItem(questionTitle, questionType);
    }
    const thisImageColumnNumber = row.get(imageColumnName);
    if ((thisImageColumnNumber !== undefined) && (thisImageColumnNumber !== null)) {
        const imageFileID = questionSheet.getValue(questionRow, +thisImageColumnNumber).toString();
        if (imageFileID != '') {
            const thisImageBlob = new DriveGS().getImageBlob(imageFileID);
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
export function tabulateAnswers(event, args) {
    const formEvent = new FormEventGS(event);
    if (args == undefined)
        args = {};
    const { questionResultsColumn = 'Bellwork Results Sheet', dataSheet = 'gse-tools Settings', sheetName = 'Bellwork', questionTitleColumn = 'Bellwork Title', spreadsheetIDColumn = 'Spreadsheet ID', columnDateParams = {}, } = args;
    const formTitle = formEvent.getTitle();
    const response = formEvent.getItemResponse(0);
    if (response instanceof Array) {
        throw new Error('Bellwork form response ' + 'needs to have single values only in tabulateBellwork()');
    }
    const title = formEvent.getFullDate(columnDateParams) + '\n' + formEvent.getItemTitle(0);
    const fullName = formEvent.getNameFromEmail();
    if (fullName.length != 2) {
        throw new Error('Could not get name from email' + ' in tabulateAnswers()');
    }
    const dataSheetInterface = new DataSheet();
    const allClasses = dataSheetInterface.getDataSheet(dataSheet, sheetName).getDataAsMap(sheetName);
    let destinationSheetName = '';
    let questionSheetID = '';
    for (const className of allClasses.keys()) {
        const classData = allClasses.get(className);
        if (classData != null && classData != undefined) {
            const questionTitle = classData.get(questionTitleColumn);
            if (questionTitle != null && questionTitle != undefined) {
                if (formTitle.indexOf(questionTitle.toString()) == 0) {
                    const questionResultsSheetName = classData.get(questionResultsColumn);
                    if (questionResultsSheetName != null && questionResultsSheetName != undefined) {
                        destinationSheetName = questionResultsSheetName.toString();
                    }
                    else {
                        throw new Error('Could not find bellwork results sheet for ' +
                            ' class "' +
                            className +
                            '" in column "' +
                            questionResultsColumn +
                            '" for tabulateAnswers()');
                    }
                    const spreadsheetID = classData.get(spreadsheetIDColumn);
                    if (spreadsheetID == null || spreadsheetID == undefined) {
                        throw new Error('Could not find bellwork results sheet ID for ' +
                            ' class "' +
                            className +
                            '" in column "' +
                            spreadsheetIDColumn +
                            '" for tabulateAnswers()');
                    }
                    questionSheetID = spreadsheetID.toString();
                }
            }
            else {
                throw new Error('Could not find question title for class "' +
                    className +
                    '" in column "' +
                    questionTitleColumn +
                    '" in tabulateAnswers()');
            }
        }
        else {
            throw new Error('Could not find data for class "' + className + '" in tabulateAnswers()');
        }
    }
    const responseSheet = new SpreadsheetGS(questionSheetID, destinationSheetName).getSheet(destinationSheetName);
    if (responseSheet.getValue(1, 3) != title) {
        responseSheet.insertCol(3).setValue(title, 1, 3);
    }
    let foundName = false;
    const lastRow = responseSheet.getLastRow();
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
