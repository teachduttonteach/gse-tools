import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { DataSheet } from '../DataSheet';
import { DateUtilities } from '../DateParams';
import { Utilities } from '../utils/Utilities';
import { DocsGS } from '../docs/DocsGS';
import { SampleUtilities } from './SampleUtilities';
import { EmailGS, RecipientType } from '../email/EmailGS';
/**
 * Update the daily agenda from Google Sheets, writing to (optionally) a
 * Google Doc and a slide on a Google Slides
 *
 * ```javascript
 * // Object to hold all of the date settings (all have default settings)
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
 * };
 *
 * // Object to hold all of the email settings (all have defaults)
 * var emailArgs = {
 *
 *   // Subject of the e-mail
 *   subject: "This Week's Agenda",
 *
 *   // Whether or not to send the agenda as an attached PDF
 *   sendAsPDF: true,
 *
 *   // Whether or not to send the agenda in the body of the e-mail
 *   sendInBody: true,
 *
 *   // Whether or not to send the link to the agenda Google Doc
 *   sendDocLink: true,
 *
 *   // The text for the agenda Google Doc link
 *   docsLinkText: "Click here to see the agenda in Google Docs",
 *
 *   // Whether or not to send the link to the associated Google Sites page
 *   sendSitesLink: true,
 *
 *   // The text for the Google Sites link
 *   sitesLinkText: "Click here to see the Google Site for this class"
 * }
 *
 * // Object to hold all of the agenda settings (all have defaults)
 * var agendaArgs = {
 *   // The Settings Spreadsheet name
 *   dataSheet: 'gse-tools Settings',
 *
 *   // The sheet name within the Settings Spreadsheet that has settings
 *   // for each class
 *   settingsName: 'Agenda',
 *
 *   // Column in the Settings sheet that defines the sheet name on the Lesson
 *   // Spreadsheet for this class
 *   agendaSheetNameColumnName: 'Sheet Name',
 *
 *   // Column in the Settings sheet that defines the ID of the Lesson
 *   // Spreadsheet for this class
 *   agendaSpreadsheetIDColumnName: 'Agenda Spreadsheet ID',
 *
 *   // Column in the Settings sheet that defines which column in the Lesson
 *   // Spreadsheet to look for the name of the lesson
 *   lessonColumnName: 'Lesson Column Number',
 *
 *   // Column in the Settings sheet that defines which column in the Lesson
 *   // Spreadsheet to look for the date of the lesson
 *   agendaDateColumnName: 'Date Column',
 *
 *   // Useful string to define when the Lesson Spreadsheet no longer has valid
 *   // entries (so the user can put other information in the sheet)
 *   agendaSheetDateColumnEnd: 'END',
 *
 *   // Object that defines how to display the date
 *   agendaDateParams: dateParams,
 *
 *   // Number of days ahead of today to display in the agenda
 *   daysToLookAhead: 7,
 *
 *   // Set the current timezone
 *   timezoneOffset: -5,
 *
 *   // Column in the Settings sheet that defines which column in the Lesson
 *   // Spreadsheet to look for the Classroom enrollment code
 *   classroomCodeColumnName: 'Classroom Code',
 *
 *   // Column in the Settings sheet that defines which column in the Lesson
 *   // Spreadsheet to look for the Google Sites link
 *   sitesLinkColumnName: 'Google Sites',
 *
 *   // Column in the Settings sheet that defines which column in the Lesson
 *   // Spreadsheet to look for the Slideshow ID
 *   agendaSlideshowIDColumnName: 'Agenda Slides ID',
 *
 *   // Whether or not to display the agenda
 *   displayAgenda: true,
 *
 *   // When displaying the agenda on a Google Slide, put this string in the
 *   // slide notes and it will recognize
 *   agendaSlideNotes: 'Agenda',
 *
 *   // Whether or not to write the agenda to a Google Doc; must be true to
 *   // send e-mails
 *   writeAgenda: true,
 *
 *   // Name to use for all files created by this script; will add the name of
 *   // the class
 *   agendaFileName: 'Class Agenda',
 *
 *   // The template file to use for all of the files created by this script
 *   templateName: 'Agenda Document Template',
 *
 *   // Object with all of the e-mail settings; if not specified, will not
 *   // send e-mails
 *   emailToParents: emailArgs
 * }
 *
 * // Call the gse-tools function
 * gsetools.updateDailyAgenda(agendaArgs);
 * ```
 *
 * @param {AgendaParams} args the parameters to use
 * @return {true} returns true if successful
 */
export function updateDailyAgenda(args = {}, slideDisplayArgs = {}) {
    const { settingsName = 'Agenda', agendaSlideshowIDColumnName = 'Agenda Slideshow ID', classroomCodeColumnName = 'Classroom Code', dataSheet = 'gse-tools Settings', daysToLookAheadDefault = 7, daysToLookAheadColumnName, timezoneOffset = -5, emailToParents = undefined, getAgendaFromSheet = false, sitesLinkColumnName = 'Google Sites', writeAgenda = false, publishAgenda = true, displayAgenda = false } = args;
    const dataSheetInterface = new DataSheet();
    const settings = dataSheetInterface.getDataSheet(dataSheet);
    const classworkSettings = settings.getDataAsMap(settingsName);
    const allClasses = new ClassroomGS();
    const utils = new Utilities();
    const dateToday = utils.getTodaysDate(timezoneOffset);
    const sampleUtils = new SampleUtilities();
    classworkSettings.forEach(function (thisRow, row) {
        // Get the current slideshow
        const slideShow = sampleUtils._getSlideshow(thisRow, displayAgenda, agendaSlideshowIDColumnName);
        const currentClass = sampleUtils._getClass(thisRow, classroomCodeColumnName, allClasses);
        const futureDate = sampleUtils._getFutureDate(thisRow, dateToday, daysToLookAheadColumnName, daysToLookAheadDefault);
        let lessonTitles = [];
        if (getAgendaFromSheet)
            lessonTitles = getAgendaFromSpreadsheet(args, thisRow, dateToday, futureDate);
        else
            lessonTitles = getAgendaFromClass(dateToday, futureDate, currentClass);
        if (writeAgenda) {
            const agendaDoc = writeAgendaToDoc(args, lessonTitles, currentClass);
            if (publishAgenda) {
                new DriveGS().publishToWeb(agendaDoc.getId());
            }
            if (emailToParents !== undefined) {
                emailAgendaToParents(emailToParents, thisRow, agendaDoc, currentClass, sitesLinkColumnName);
            }
        }
        if (displayAgenda && slideShow !== undefined) {
            displayAgendaOnSlide(slideDisplayArgs, thisRow, lessonTitles, slideShow);
        }
    });
    return true;
}
function getAgendaFromClass(dateToday, futureDate, currentClass) {
    let lessonTitles = [];
    const utils = new Utilities();
    const sampleUtils = new SampleUtilities();
    for (const topic of currentClass.getTopics()) {
        const topicWork = currentClass.getTopicInfo(topic).work;
        for (const work of topicWork) {
            const dueDate = sampleUtils._parseDueDate(work.dueDate);
            if (dueDate == undefined)
                continue;
            if (utils.compareDates(dueDate, dateToday, true, true) && utils.compareDates(futureDate, dueDate, true, true)) {
                lessonTitles.push({
                    title: work.title,
                    dueDate: dueDate,
                    lessonDate: dueDate,
                    description: work.description
                });
            }
        }
    }
    return lessonTitles;
}
function getAgendaFromSpreadsheet(args, row, dateToday, futureDate) {
    const { agendaSheetNameColumnName = 'Class Name', agendaDateColumnName = 'Date', agendaSpreadsheetIDColumnName = 'Agenda Spreadsheet ID', lessonColumnName = 'Lesson', } = args;
    const sampleUtils = new SampleUtilities();
    const agendaSheet = sampleUtils._getSecondarySheet(row, agendaSpreadsheetIDColumnName, agendaSheetNameColumnName);
    let lessonRow = 1;
    const lessonTitles = [];
    while (lessonRow <= agendaSheet.getLastRow()) {
        const dateValue = new Date(agendaSheet.getValueFromColumnHeader(lessonRow, agendaDateColumnName));
        const utils = new Utilities();
        if (dateValue != null) {
            if (utils.compareDates(dateValue, dateToday, true, true) && utils.compareDates(futureDate, dateValue, true, true)) {
                const lessonInfo = {};
                lessonInfo.title = agendaSheet.getValueFromColumnHeader(lessonRow, lessonColumnName).toString();
                lessonInfo.lessonDate = dateValue;
                lessonTitles.push(lessonInfo);
            }
        }
        lessonRow++;
    }
    return lessonTitles;
}
/**
 * Write the agenda taken from Sheets and Classroom to a Google Doc
 *
 * @param {AgendaParams} args the settings for the agenda
 * @param {Array<LessonInfo>} lessonInfo the information for each lesson
 * @param {ClassGS} currentClass the object that contains the current class
 * @return {true} returns true if successful
 */
function writeAgendaToDoc(args, lessonInfo, currentClass) {
    const { templateName = 'Agenda Document Template', agendaFileName = 'Class Agenda', agendaDateParams = {}, } = args;
    const agendaTitle = agendaFileName + ' ' + currentClass.getName();
    const agendaDoc = new DocsGS(new DriveGS().getOrCreateFileFromTemplateByName(agendaTitle, templateName).getId());
    agendaDoc.clearBody();
    agendaDoc.addText(agendaTitle, 'T', true);
    const dateUtilitiesInterface = new DateUtilities();
    for (const individualLesson of lessonInfo) {
        let lessonDate = dateUtilitiesInterface.formatTodaysDate(agendaDateParams, individualLesson.lessonDate);
        let dueDate = dateUtilitiesInterface.formatTodaysDate(agendaDateParams, individualLesson.dueDate);
        ;
        let textToAdd = agendaDateParams.titlePrefix + ' ' + individualLesson.title;
        if (lessonDate != dueDate)
            textToAdd = lessonDate + ' ' + textToAdd;
        agendaDoc.addText(textToAdd, 2);
        if (dueDate !== undefined) {
            agendaDoc.addText("Due: " + dueDate, 3);
        }
        if (individualLesson.description !== undefined) {
            agendaDoc.addText(individualLesson.description, 5);
        }
    }
    return agendaDoc.publish();
}
function emailAgendaToParents(emailToParents, row, agendaDoc, currentClass, sitesLinkColumnName) {
    if (emailToParents != undefined) {
        const { subject = "This Week's Agenda", sendAsPDF = false, sendInBody = true, sendDocLink = false, sendWebLink = true, sendSitesLink = false, docsLinkText = 'Click here to see the agenda on Google Docs', webLinkText = 'Click here to see the agenda on the web', sitesLinkText = 'Click here to see the Google Site for this class', } = emailToParents;
        let sendMail = new EmailGS();
        sendMail.setSubject(subject);
        const parentEmails = currentClass.getParentEmails();
        for (let email of parentEmails) {
            sendMail.addRecipient(email, RecipientType.BCC);
        }
        let mailBody = "";
        if (sendInBody)
            mailBody = agendaDoc
                .getBody()
                .asBody()
                .getText()
                .toString();
        if (sendAsPDF)
            sendMail.attachFile(agendaDoc.getId());
        if (sendDocLink)
            mailBody += '<br><a href="' + agendaDoc.getObject().getUrl() + '">' + docsLinkText + '</a>';
        if (sendWebLink)
            mailBody += '<br><a href="' + new DriveGS().publishToWeb(agendaDoc.getId()) + '">' + webLinkText + '</a>';
        if (sendSitesLink) {
            const sitesLink = row.get(sitesLinkColumnName);
            if (sitesLink != undefined && sitesLink != null && sitesLink != '')
                mailBody += '<br><a href="' + sitesLink.toString() + '">' + sitesLinkText + '</a>';
        }
        sendMail.setBody(mailBody, true);
        sendMail.send();
    }
}
/**
 * Displays the agenda on a slide in Google Slides
 *
 * @param {AgendaParams} args the agenda parameters
 * @param {Map<string | Date, string | Date>} row the current row of info
 *  from the Google Sheet
 * @param {Array<LessonInfo>} lessonInfo the information for each lesson
 * @return {true} returns true if successful
 */
function displayAgendaOnSlide(slideDisplayParams, row, lessonInfo, slideShow) {
    slideShow.setTextBoxOrTitleOnSlide(slideDisplayParams, {}, row, lessonInfo);
    return true;
}
