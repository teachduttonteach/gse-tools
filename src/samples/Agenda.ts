import {SpreadsheetGS} from '../sheets/SpreadsheetGS';
import {SheetGS} from '../sheets/SheetGS';
import {ClassroomGS} from '../classroom/ClassroomGS';
import {DriveGS} from '../drive/DriveGS';
import {getDataSheet} from '../DataSheet';
import {ClassGS} from '../classroom/ClassGS';
import {Work} from '../classroom/Work';
import {DateParams} from '../DateParams';
import {MapGS} from '../map/MapGS';
import {SlideshowGS} from '../slides/SlideshowGS';
import {getTodaysDate, getOneDay, compareDates, checkNull} from 
  '../utils/Utilities';
import {DocsGS} from '../docs/DocsGS';
import {BirthdayParams, sendBirthdayEmail} from './Birthday'

/**
 * The object to hold information about the current lesson
 */
type LessonInfo = {
  /**
   * The date of the lesson
   */
  lessonDate: Date;
  /**
   * The title of the lesson
   */
  title: string;
  /**
   * The due date of the lesson in string format
   */
  dueDate: string;
  /**
   * The description of the lesson, optional
   */
  description?: string;
}

type ParentEmailInfo = {
  /**
   * The subject of the email to send to parents; default is "This Week's
   * Agenda"
   */
  subject?: string;
  /**
   * Send agenda as PDF; default is false
   */
  sendAsPDF?: boolean;
  /**
   * Send agenda in body of email; default is true
   */
  sendInBody?: boolean;
  /**
   * Send the link to the Google Document with the agenda; default is true
   */
  sendDocLink?: boolean;
  /**
   * Send the link to the associated Google Sites page; default is false
   */
  sendSitesLink?: boolean;
  /**
   * The text to display for the Google Docs link; default is "Click here to 
   *  see the agenda in Google Docs."
   */
  docsLinkText?: string;
  /**
   * The text to display for the Google Sites link; default is "Click here to 
   *  see the Google Site for this class."
   */
  sitesLinkText?: string;  

}

/**
 * All of the arguments and other variables used by the Agenda script
 */
type AgendaParams = {
  /**
   * Sheet name for the gse-tools Settings Google Sheet for the agenda files;
   * default is 'Agenda'
   */
  settingsName?: string;
  /**
   * Column name for the gse-tools Settings sheet to determine the column
   * number that contains the lesson description; default is
   * "Lesson Column Number"
   */
  lessonColumnName?: string;
  /**
   * Column name for the gse-tools Settings sheet column that contains the
   *  agenda slideshow ID; default is 'Agenda Slides ID'
   */
  agendaSlideshowIDColumnName?: string;
  /**
   * Column name for the gse-tools Settings sheet column that contains the
   *  agenda spreadsheet ID; default is 'Agenda Spreadsheet ID'
   */
  agendaSpreadsheetIDColumnName?: string;
  /**
   * Column name for the gse-tools Settings sheet column that contains the
   *  lesson date column number; default is "Lesson Date Column Number"
   */
  lessonDateColumnName?: string;
  /**
   * Column name for the gse-tools Settings sheet column that contains the
   *  classroom enrollment code; default is 'Classroom Code'
   */
  classroomCodeColumnName?: string;
  /**
   * Column name for the gse-tools Settings sheet column that contains the
   *  Google Sites link; default is 'Google Sites'
   */
  sitesLinkColumnName?: string;
  /**
   * Name to use for files that are created holding class info; default is
   *  'Daily Class Agenda'
   */
  agendaFileName?: string;
  /**
   * Name of the template to use for the new files to be created; default is
   *  'Daily Class Agenda Template'
   */
  templateName?: string;
  /**
   * Parameters for displaying due dates; default is empty
   */
  agendaDateParams?: DateParams;
  /**
   * The name of the data settings sheet to use; defaults to 'gse-tools
   *  Settings'
   */
  dataSheet?: string;
  /**
   * The timezone offset of your local timezone from GMT; default is -5
   */
  timezoneOffset?: number;
  /**
   * The column in the gse-tools Settings that defines the sheet name for
   * the class; default is 'Sheet Name'
   */
  agendaSheetNameColumnName?: string;
  /**
   * The column in the gse-tools Settings that defines the column to look for
   * the date of the lesson for the class; default is 'Date Column'
   */
  agendaDateColumnName?: string;
  /**
   * The string to look for in the date column to stop looking for more rows
   * that contain lessons; default is 'END'
   */
  agendaSheetDateColumnEnd?: string,
  /**
   * Whether or not to write the agenda to a Google Doc; default is true
   */
  writeAgenda?: boolean;
  /**
   * Whether or not to display the agenda on a Google Slides; default is true
   */
  displayAgenda?: boolean;
  /**
   * Specify parameters if you want to send an email to parents; writeAgenda
   *  must also be set to true; default is empty
   */
  emailToParents?: ParentEmailInfo;
  /**
   * How many days ahead to include in the agenda; default is 7
   */
  daysToLookAhead?: number;
  /**
   * What to look for in the slide notes if the current slide is the agenda;
   * default is 'Agenda'
   */
  agendaSlideNotes?: string;
};

/**
 * Update the daily agenda from Google Sheets, writing to (optionally) a
 * Google Doc and a slide on a Google Slides
 *
 * ```javascript
 * var dateParams = {
 *  titlePrefix: ' - ',
 *  dateDelim: '/',
 *  dateOrder: 'MD',
 *  noEventString: 'NONE',
 * };
 * var emailArgs = {
 *  subject: "This Week's Agenda",
 *  sendAsPDF: true,
 *  sendInBody: true,
 *  sendDocLink: true,
 * sendSitesLink: true 
 * };
 * var agendaArgs = {
 *  settingsName: 'Agenda',
 *  lessonColumnName: 'Lesson Column Number',
 *  agendaSlideshowIDColumnName: 'Agenda Slides ID',
 *  agendaSpreadsheetIDColumnName: 'Agenda Spreadsheet ID',
 *  lessonDateColumnName: 'Lesson Date Column Number',
 *  classroomCodeColumnName: 'Classroom Code',
 *  agendaFileName: 'Daily Class Agenda',
 *  templateName: 'Daily Class Agenda Template',
 *  timezoneOffset: -5,
 *  agendaSheetNameColumnName: 'Sheet Name',
 *  agendaDateColumnName: 'Date Column',
 *  agendaSheetDateColumnEnd: 'END',
 *  writeAgenda: true,
 *  displayAgenda: true,
 *  emailToParents: emailArgs,
 *  daysToLookAhead: 7,
 *  agendaSlideNotes: 'Agenda',
 *  agendaDateParams: dateParams,
 *  dataSheet: 'GSE Settings'
 * }
 * gsetools.updateDailyAgenda(agendaArgs);
 * ```
 *
 * @param {AgendaParams} args the parameters to use
 * @return {true} returns true if successful
 */
export function updateDailyAgenda(args?: AgendaParams): true {
  if (args == null) args = {} as AgendaParams;
  const {
    settingsName = 'Agenda',
    classroomCodeColumnName = 'Classroom Code',
    dataSheet = 'gse-tools Settings',
  } = args;

  const settings: SpreadsheetGS = getDataSheet(dataSheet);
  const classworkSettings: MapGS<string | Date, MapGS<string | Date,
    string | Date>> = settings.getDataAsMap(
        settingsName,
    );
  const allClasses: ClassroomGS = new ClassroomGS();

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
 * @param {ClassroomArgs} args the agenda parameters
 * @param {MapGS<string | Date, string | Date>} row the classroom information
 * @param {ClassGS} currentClass the current Google class
 * @return {boolean} returns true if successful
 */
function updateClassAgenda(args: AgendaParams,
    row: MapGS<string | Date, string | Date>, currentClass: ClassGS): boolean {
  const {
    agendaSheetNameColumnName = 'Sheet Name',
    agendaDateColumnName = 'Date Column',
    agendaSheetDateColumnEnd = 'END',
    writeAgenda = true,
    displayAgenda = true,
    daysToLookAhead = 7,
    agendaSpreadsheetIDColumnName = 'Agenda Spreadsheet ID',
    lessonColumnName = 'Lesson Column Number',
    timezoneOffset = -5,
  } = args;

  const dateToday: Date = getTodaysDate(timezoneOffset);
  const futureDate: Date = new Date(dateToday);
  futureDate.setMilliseconds(futureDate.getMilliseconds() +
    (getOneDay() * daysToLookAhead));

  const thisAgendaSpreadsheetID = row.get(agendaSpreadsheetIDColumnName);
  if (thisAgendaSpreadsheetID == null ||
      typeof thisAgendaSpreadsheetID !== 'string') {
    throw new Error('Could not find spreadsheet ID in ' +
      'Agenda.updateClassAgenda()');
  }

  const thisSheetName = row.get(agendaSheetNameColumnName);
  if (thisSheetName == null ||
    typeof thisSheetName !== 'string') {
    throw new Error('Could not find sheet name column name (' +
    agendaSheetNameColumnName + ') in Bellwork.updateTodaysQuestion()');
  }
  const agendaSpreadsheet: SpreadsheetGS =
    new SpreadsheetGS(thisAgendaSpreadsheetID, thisSheetName);
  const agendaSheet: SheetGS =
    agendaSpreadsheet.getSheet(thisSheetName);

  const thisAgendaDateColumnName = checkNull(row.get(agendaDateColumnName),
      'Bellwork date column number', 'updateClassAgenda()', 'Error');
  let lessonRow: number = agendaSheet.skipBlankRows(1,
      +thisAgendaDateColumnName);
  const lessonTitles: Array<LessonInfo> = [];
  while ((lessonRow <= agendaSheet.getLastRow()) &&
    ((agendaSheet.getValue(lessonRow, +thisAgendaDateColumnName) !==
    agendaSheetDateColumnEnd))) {
    const dateValue = agendaSheet.getDateValue(lessonRow, 
      +thisAgendaDateColumnName);
    if (dateValue != null) {
      const dateInCell: Date = dateValue;

      if (compareDates(dateInCell, dateToday, true, true) &&
        compareDates(futureDate, dateInCell, true, true)) {
        const thisLessonColumnNumber = checkNull(row.get(lessonColumnName),
            'Lesson column number', 'updateClassAgenda()', 'Error');
        const lessonInfo = {} as LessonInfo;
        lessonInfo.title = agendaSheet.getValue(lessonRow, 
            +thisLessonColumnNumber).toString();
        lessonInfo.lessonDate = dateInCell;
        lessonTitles.push(lessonInfo);
      }
    }
    lessonRow++;
  }

  if (lessonTitles.length == 0) return false;

  if (writeAgenda) {
    writeAgendaToDoc(args, row, lessonTitles, currentClass);
  }

  if (displayAgenda) {
    displayAgendaOnSlide(args, row, lessonTitles);
  }
  return true;
}

/**
 * Write the agenda taken from Sheets and Classroom to a Google Doc
 *
 * @param {AgendaParams} args the settings for the agenda
 * @param {Array<LessonInfo>} lessonInfo the information for each lesson
 * @param {ClassGS} currentClass the object that contains the current class
 * @return {true} returns true if successful
 */
function writeAgendaToDoc(args: AgendaParams,
    row: MapGS<string | Date, string | Date>,
    lessonInfo: Array<LessonInfo>,
    currentClass: ClassGS): true {
  const {
    templateName = 'Agenda Document Template',
    agendaFileName = 'Class Agenda',
    agendaDateParams = {} as DateParams,
    emailToParents = undefined,
    sitesLinkColumnName = 'Google Sites',
  } = args;

  for (const topic of currentClass.getTopics()) {
    const topicWork: Work[] =
      currentClass.getTopicInfo(topic).work;
    for (const work of topicWork) {
      for (const lesson of lessonInfo) {
        if (lesson.title == work.title) {
          lesson.dueDate = work.dueDate;
          lesson.description = work.description;
        }
      }
    }
  }

  const agendaTitle: string = agendaFileName + ' ' + currentClass.getName();
  const agendaDoc = new DocsGS(new DriveGS()
      .getOrCreateFileFromTemplateByName(agendaTitle, templateName).getId());
  agendaDoc.clearBody();
  agendaDoc.addText(agendaTitle, 'T');

  for (const individualLesson of lessonInfo) {
    let lessonDate: string = '';
    if (agendaDateParams.dateOrder == 'DM') {
      lessonDate = [individualLesson.lessonDate.getDate(),
        (individualLesson.lessonDate.getMonth() + 1)]
          .join(agendaDateParams.dateDelim);
    } else {
      lessonDate = [(individualLesson.lessonDate.getMonth() + 1),
        individualLesson.lessonDate.getDate()].join(agendaDateParams.dateDelim);
    }

    agendaDoc.addText(lessonDate + ' ' + agendaDateParams.titlePrefix + ' ' +
      individualLesson.title, 2);
    if (individualLesson.dueDate !== undefined) {
      agendaDoc.addText(individualLesson.dueDate, 3);
    }
    if (individualLesson.description !== undefined) {
      agendaDoc.addText(individualLesson.description, 4);
    }
  }

  if (emailToParents != undefined) {
    const {
      subject = "This Week's Agenda",
      sendAsPDF = false,
      sendInBody = true,
      sendDocLink = true,
      sendSitesLink = false,
      docsLinkText = "Click here to see the agenda in Google Docs",
      sitesLinkText = "Click here to see the Google Site for this class"  
    } = emailToParents;
    const parentEmails = currentClass.getParentEmails();
    for (let email of parentEmails) {
      let sendEMail: GoogleAppsScript.Mail.MailAdvancedParameters = {
        to: email,
        subject: subject,
        body: "",
      };
      if (sendInBody) sendEMail.body = 
        agendaDoc.getBody().asBody().getText().toString();
      if (sendAsPDF) sendEMail.attachments = 
        [agendaDoc.getObject().getAs('application/pdf')];
      if (sendDocLink) sendEMail.body += "\n" + docsLinkText + ": " + 
        agendaDoc.getObject().getUrl();
      if (sendSitesLink) {
        const sitesLink = row.get(sitesLinkColumnName);
        if ((sitesLink != undefined) && (sitesLink != null) 
          && (sitesLink != "")) 
          sendEMail.body += "\n" + sitesLinkText + ": " + sitesLink.toString();
      }
      MailApp.sendEmail(sendEMail);
    }
  }

  return true;
}

/**
 * Displays the agenda on a slide in Google Slides
 *
 * @param {AgendaParams} args the agenda parameters
 * @param {MapGS<string | Date, string | Date>} row the current row of info
 *  from the Google Sheet
 * @param {Array<LessonInfo>} lessonInfo the information for each lesson
 * @return {true} returns true if successful
 */
function displayAgendaOnSlide(args: AgendaParams,
    row: MapGS<string | Date, string | Date>,
    lessonInfo: Array<LessonInfo>): true {
  const {
    agendaSlideshowIDColumnName = 'Agenda Slides ID',
    agendaSlideNotes = 'Agenda',
  } = args;

  const thisSlideshowID =
    row.get(agendaSlideshowIDColumnName);
  if ((thisSlideshowID !== undefined) &&
    (typeof thisSlideshowID === 'string') &&
    (thisSlideshowID != '')) {
    const slideShow = new SlideshowGS(thisSlideshowID);
    const agendaSlide = slideShow.getSlideByNotes(agendaSlideNotes);
    if (agendaSlide !== null) {
      agendaSlide.setList(lessonInfo.map((a) => a.title).join('\n'));
    }
  }

  return true;
}
