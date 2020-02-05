import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { getDataSheet } from '../DataSheet';
import { SlideshowGS } from '../slides/SlideshowGS';
import { getTodaysDate, getOneDay, compareDates } from '../utils/Utilities';
import { DocsGS } from '../docs/DocsGS';
/**
 * Update the daily agenda from Google Sheets, writing to (optionally) a
 * Google Doc and a slide on a Google Slides
 * @param {AgendaArgs} args the parameters to use
 * @return {true} returns true if successful
 */
export function updateDailyAgenda(args) {
    if (args == null)
        args = {};
    const { settingsName = 'Agenda', classroomCodeColumnName = 'Classroom Code', dataSheet = 'gse-tools Settings' } = args;
    const settings = getDataSheet(dataSheet);
    const classworkSettings = settings.getDataAsMap(settingsName);
    const allClasses = new ClassroomGS();
    classworkSettings.reset();
    while (classworkSettings.hasNext()) {
        const row = classworkSettings.next();
        const thisRow = classworkSettings.get(row);
        if (thisRow == undefined || classroomCodeColumnName == undefined) {
            throw new Error('Could not find row in classworkSettings in ' +
                'updateDailyAgenda()');
        }
        const thisClassroomCode = thisRow.get(classroomCodeColumnName);
        if (thisClassroomCode == undefined ||
            typeof thisClassroomCode !== 'string') {
            throw new Error('Classroom code not found in updateDailyAgenda()');
        }
        if (thisClassroomCode != '') {
            const currentClass = allClasses.getClass(thisClassroomCode);
            updateClassAgenda(args, thisRow, currentClass);
        }
    }
    return true;
}
/**
 * Update the individual class agenda by writing the agenda to a Google Doc
 * and/or a Google Slide, using both sheet information and also Google
 * Classroom
 *
 * @param {ClassroomArgs} args the classroom parameters
 * @param {ClassGS} currentClass the current Google class
 * @return {true} returns true if successful
 */
function updateClassAgenda(args, row, currentClass) {
    const { agendaSheetNameColumnName = 'Sheet Name', agendaDateColumnName = 'Date Column', agendaSheetDateColumnEnd = 'END', writeAgenda = true, displayAgenda = true, daysToLookAhead = 7, agendaSpreadsheetIDColumnName = 'Agenda Spreadsheet ID', lessonColumnName = 'Lesson Column Number', timezoneOffset = -5 } = args;
    const dateToday = getTodaysDate(timezoneOffset);
    const futureDate = new Date(dateToday);
    futureDate.setMilliseconds(futureDate.getMilliseconds() +
        (getOneDay() * daysToLookAhead));
    const thisAgendaSpreadsheetName = row.get(agendaSpreadsheetIDColumnName);
    if (thisAgendaSpreadsheetName == null ||
        typeof thisAgendaSpreadsheetName !== 'string') {
        throw new Error('Could not find spreadsheet ID in ' +
            'Agenda.updateClassAgenda()');
    }
    const agendaSpreadsheet = new SpreadsheetGS(thisAgendaSpreadsheetName);
    const thisSheetNameColumnName = row.get(agendaSheetNameColumnName);
    if (thisSheetNameColumnName == null ||
        typeof thisSheetNameColumnName !== 'string') {
        throw new Error('Could not find sheet name column name (' +
            agendaSheetNameColumnName + ') in Bellwork.updateTodaysQuestion()');
    }
    const agendaSheet = agendaSpreadsheet.getSheet(thisSheetNameColumnName);
    const thisAgendaDateColumnName = row.get(agendaDateColumnName);
    if (thisAgendaDateColumnName == null) {
        throw new Error('Could not find bellwork date column name in ' +
            'Bellwork.updateTodaysQuestion()');
    }
    let lessonRow = agendaSheet.skipBlankRows(1, +thisAgendaDateColumnName);
    let lessonTitles = [];
    while ((lessonRow <= agendaSheet.getLastRow()) &&
        ((agendaSheet.getValue(lessonRow, +thisAgendaDateColumnName) !==
            agendaSheetDateColumnEnd))) {
        const dateInCell = new Date(agendaSheet.getValue(lessonRow, +thisAgendaDateColumnName));
        if (compareDates(dateInCell, dateToday, true, true) &&
            compareDates(futureDate, dateInCell, true, true)) {
            const thisLessonColumnName = row.get(lessonColumnName);
            if (thisLessonColumnName == null) {
                throw new Error('Could not find bellwork column name in ' +
                    'Samples.doForBellwork()');
            }
            let lessonInfo = {};
            lessonInfo.title = agendaSheet.getValue(lessonRow, +thisLessonColumnName)
                .toString();
            lessonInfo.lessonDate = dateInCell;
            lessonTitles.push(lessonInfo);
        }
        lessonRow++;
    }
    if (lessonTitles.length == 0)
        return false;
    if (writeAgenda) {
        writeAgendaToDoc(args, lessonTitles, currentClass);
    }
    if (displayAgenda) {
        displayAgendaOnSlide(args, row, lessonTitles);
    }
    return true;
}
/**
 * Write the agenda taken from Sheets and Classroom to a Google Doc
 *
 * @param {AgendaArgs} args the settings for the agenda
 * @param {Array<LessonInfo>} lessonInfo the information for each lesson
 * @param {ClassGS} currentClass the object that contains the current class
 * @return {true} returns true if successful
 */
function writeAgendaToDoc(args, lessonInfo, currentClass) {
    const { templateName = 'Agenda Document Template', agendaFileName = 'Class Agenda', agendaDateParams = {}, } = args;
    for (let topic of currentClass.getTopics()) {
        const topicWork = currentClass.getTopicInfo(topic).work;
        for (let work of topicWork) {
            for (let lesson of lessonInfo) {
                if (lesson.title == work.title) {
                    Logger.log("Found " + lesson.title);
                    lesson.dueDate = work.dueDate;
                    lesson.description = work.description;
                }
            }
        }
    }
    let agendaTitle = agendaFileName + ' ' + currentClass.getName();
    let agendaDoc = new DocsGS(new DriveGS()
        .getOrCreateFileFromTemplateByName(agendaTitle, templateName).getId());
    agendaDoc.clearBody();
    agendaDoc.addText(agendaTitle, 'T');
    for (let individualLesson of lessonInfo) {
        let lessonDate = "";
        if (agendaDateParams.dateOrder == 'DM')
            lessonDate = [individualLesson.lessonDate.getDate(),
                (individualLesson.lessonDate.getMonth() + 1)]
                .join(agendaDateParams.dateDelim);
        else
            lessonDate = [(individualLesson.lessonDate.getMonth() + 1),
                individualLesson.lessonDate.getDate()].join(agendaDateParams.dateDelim);
        agendaDoc.addText(lessonDate + ' ' + agendaDateParams.titlePrefix + ' ' +
            individualLesson.title, 2);
        if (individualLesson.dueDate !== undefined)
            agendaDoc.addText(individualLesson.dueDate, 3);
        if (individualLesson.description !== undefined)
            agendaDoc.addText(individualLesson.description, 4);
    }
    return true;
}
/**
 * Displays the agenda on a slide in Google Slides
 *
 * @param {AgendaArgs} args the agenda parameters
 * @param {MapGS<string | Date, string | Date>} row the current row of info
 *  from the Google Sheet
 * @param {Array<LessonInfo>} lessonInfo the information for each lesson
 * @return {true} returns true if successful
 */
function displayAgendaOnSlide(args, row, lessonInfo) {
    const { agendaSlideshowIDColumnName = 'Agenda Slides ID', agendaSlideNotes = 'Agenda' } = args;
    const thisSlideshowID = row.get(agendaSlideshowIDColumnName);
    if ((thisSlideshowID !== undefined) &&
        (typeof thisSlideshowID === 'string') &&
        (thisSlideshowID != '')) {
        const slideShow = new SlideshowGS(thisSlideshowID);
        let agendaSlide = slideShow.getSlideByNotes(agendaSlideNotes);
        if (agendaSlide !== null) {
            agendaSlide.setList(lessonInfo.map(a => a.title).join('\n'));
        }
    }
    return true;
}
