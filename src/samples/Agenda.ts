import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { SheetGS } from '../sheets/SheetGS';
import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { DataSheet } from '../DataSheet';
import { ClassGS } from '../classroom/ClassGS';
import { Work } from '../classroom/Work';
import { DateParams, DateUtilities } from '../DateParams';
import { SlideDisplayParams, SlideshowGS } from '../slides/SlideshowGS';
import { Utilities } from '../utils/Utilities';
import { DocsGS } from '../docs/DocsGS';
import { LessonInfo } from './LessonInfo';
import { ParentEmailInfo, SampleUtilities } from './SampleUtilities';
import { EmailGS, RecipientType } from '../email/EmailGS';


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
   *  classroom enrollment code; default is 'Classroom Code'
   */
  classroomCodeColumnName?: string;
  /**
   * Column name for the gse-tools Settings sheet column that contains the
   *  classroom blurb code; default is 'Weekly Announcements'
   */
   classroomBlurbColumnName?: string;
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
  agendaSheetDateColumnEnd?: string;
  /**
   * Whether or not to write the agenda to a Google Doc; default is true
   */
  writeAgenda?: boolean;
  /**
   * Whether or not to publish the agenda to the web; default is true
   */
   publishAgenda?: boolean;
   /**
   * Whether or not to display the agenda on a Google Slides; default is true
   */
  displayAgenda?: boolean;
  /**
   * Whether or not to use a spreadsheet to get the agenda
   */
  getAgendaFromSheet?: boolean;
  /**
   * Specify parameters if you want to send an email to parents; writeAgenda
   *  must also be set to true; default is empty
   */
  emailToParents?: ParentEmailInfo;
  /**
   * How many days ahead to include in the agenda; default is 7
   */
  daysToLookAheadDefault?: number;
  /**
   * The column to store how many days ahead to include in the agenda; defaults to daysToLookAheadDefault
   */
   daysToLookAheadColumnName?: string;
   /**
    * Column to look for the maximum number of items in the agenda
    */
   maximumItemsColumnName?: string;
   /**
   * What to look for in the slide notes if the current slide is the agenda;
   * default is 'Agenda'
   */
  agendaSlideNotes?: string;
  /**
   * Optional ID for the slideshow to use in single mode
   */
  slideshowID?: string;
  /**
   * Optional ID for the spreadsheet to use in single mode
   */
  spreadsheetID?: string;
  /**
   * Optional sheet name for the spreadsheet to use in single mode
   */
  sheetName?: string;
  /**
   * The Classroom Topic to use to find the regular blurb
   */
  classroomBlurbTopic?: string;
  /**
   * The maximum number of items to display
   */
  maximumItemsDefault?: number;

};

export function updateSingleDailyAgenda(
  classCode: string,
  args: AgendaParams = {},
  slideDisplayParams: SlideDisplayParams = {},   
  ): boolean {
  const {
    daysToLookAheadDefault = DEFAULT_DAYS_TO_LOOK_AHEAD,
    daysToLookAheadColumnName = DAYS_TO_LOOK_AHEAD_COLUMN,
    timezoneOffset = DEFAULT_TIMEZONE_OFFSET,
    writeAgenda = false,
    displayAgenda = false,
    agendaDateColumnName = DATE_COLUMN,
    lessonColumnName = LESSON_COLUMN,
    slideshowID,
    spreadsheetID,
    sheetName,
    maximumItemsDefault = DEFAULT_MAXIMUM_ITEMS,
  } = args;

  const utils = new Utilities();
  const dateToday: Date = utils.getTodaysDate(timezoneOffset);

  const sampleUtils = new SampleUtilities();

  // Get the current slideshow
  let slideShow: SlideshowGS | undefined;
  if (slideshowID !== undefined) slideShow = sampleUtils._getSlideshow(slideshowID);

  const currentClass: ClassGS = sampleUtils._getClass(classCode, new ClassroomGS());

  const futureDate: Date = sampleUtils._getFutureDate(dateToday, daysToLookAheadColumnName, daysToLookAheadDefault);

  let lessonTitles: Array<LessonInfo> = [];
  if (sheetName !== undefined)
    lessonTitles = _getAgendaFromSheet(new SpreadsheetGS(spreadsheetID).getSheet(sheetName), agendaDateColumnName, lessonColumnName, dateToday, futureDate, maximumItemsDefault);
  else 
    lessonTitles = _getAgendaFromClass(dateToday, futureDate, maximumItemsDefault, currentClass);

  if (writeAgenda) {
    _writeAndEmailAgenda(lessonTitles, currentClass, args);
  }
  if (displayAgenda && slideShow !== undefined) {
    _displayAgendaOnSlide(lessonTitles, slideShow, slideDisplayParams);
  }

  return true;
}


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
export function updateDailyAgenda(args: AgendaParams = {}, slideDisplayArgs?: SlideDisplayParams, preview: string = ""): boolean {

  const {
    settingsName = AGENDA_SETTINGS_NAME,
    agendaSlideshowIDColumnName = AGENDA_SLIDESHOW_COLUMN,
    classroomCodeColumnName = CLASSROOM_CODE_COLUMN,
    dataSheet = DATA_SHEET_NAME,
    daysToLookAheadDefault = DEFAULT_DAYS_TO_LOOK_AHEAD,
    daysToLookAheadColumnName = DAYS_TO_LOOK_AHEAD_COLUMN,
    maximumItemsColumnName = MAXIMUM_ITEMS_COLUMN,
    timezoneOffset = DEFAULT_TIMEZONE_OFFSET,
    getAgendaFromSheet = false,
    writeAgenda = false,
    displayAgenda = false,
    maximumItemsDefault = DEFAULT_MAXIMUM_ITEMS   
  } = args;

  const dataSheetInterface = new DataSheet();  

  const settings = dataSheetInterface.getDataSheet(dataSheet);
  if (settings === undefined) {
    console.log("WARNING: Could not find data sheet with name/id '" + dataSheet + "' in updateDailyAgenda()");
    return false;
  }
  const classworkSettings: Map<string | Date, Map<string | Date, string | Date>> = settings.getDataAsMap(
    settingsName,
  );

  const utils = new Utilities();
  const allClasses: ClassroomGS = new ClassroomGS();
  const dateToday: Date = utils.getTodaysDate(timezoneOffset);

  const sampleUtils = new SampleUtilities();

  classworkSettings.forEach(function(thisRow) {
    // Get the current slideshow
    const slideShow: SlideshowGS | undefined = sampleUtils._getSlideshow(
      thisRow, 
      displayAgenda, 
      agendaSlideshowIDColumnName);

    const currentClass: ClassGS = sampleUtils._getClass(classroomCodeColumnName, allClasses, thisRow);

    const futureDate: Date = sampleUtils._getFutureDate(dateToday, daysToLookAheadColumnName, daysToLookAheadDefault, thisRow);

    const maxItems: number = sampleUtils._getMaxItems(maximumItemsColumnName, maximumItemsDefault, thisRow);
  
    let lessonTitles: Array<LessonInfo> = [];
    if (getAgendaFromSheet)
      lessonTitles = _getAgendaFromSpreadsheet(dateToday, futureDate, maxItems, thisRow, args);
    else 
      lessonTitles = _getAgendaFromClass(dateToday, futureDate, maxItems, currentClass);

    if (writeAgenda) {
      _writeAndEmailAgenda(lessonTitles, currentClass, args, thisRow, preview);
    }
    if (typeof slideDisplayArgs === 'object' && displayAgenda && slideShow !== undefined) {
      _displayAgendaOnSlide(lessonTitles, slideShow, slideDisplayArgs, thisRow);
    }
  });

  return true;
}

function _writeAndEmailAgenda(
  lessonTitles: Array<LessonInfo>, 
  currentClass: ClassGS,
  args: AgendaParams = {}, 
  thisRow?: Map<string | Date, string | Date>,
  preview: string = ""
  ) {
  let classroomBlurbTopic = args.classroomBlurbTopic || CLASSROOM_BLURB_TOPIC;
  const {
    classroomBlurbColumnName: classroomBlurbTopicColumnName = CLASSROOM_BLURB_TOPIC_COLUMN,
    emailToParents = undefined,
    sitesLinkColumnName = SITES_LINK_COLUMN, 
    publishAgenda = true,
  } = args;

  const agendaDoc: DocsGS = _writeAgendaToDoc(args, lessonTitles, currentClass);
  if (publishAgenda) {
    new DriveGS().publishToWeb(agendaDoc.getId());
  }
  if (emailToParents !== undefined) {

    // Get the classroom blurb topic from the current row
    if (thisRow !== undefined) {
       const thisClassroomBlurb = thisRow.get(classroomBlurbTopicColumnName);
       if ((thisClassroomBlurb === undefined) || (thisClassroomBlurb === null) || (thisClassroomBlurb == "")) {
        console.log("WARNING: No information found for column '" + classroomBlurbTopicColumnName + "' to find the classroom blurb in updateDailyAgenda()");
      } else {
        classroomBlurbTopic = thisClassroomBlurb.toString();
      }
    }

    const work: Array<Work> = currentClass.getTopicWorkByName(classroomBlurbTopic);
    if (work.length > 0) {
      const workForToday = currentClass.findWorkForToday(work);
      if (workForToday !== null) {
        let mailHTML = _writeWorkToEmailHTML(workForToday);
        if (emailToParents.sendInBody) {
          mailHTML += _writeAgendaToEmailHTML(args, lessonTitles, currentClass);
        }
        _emailAgendaToParents(emailToParents, agendaDoc, currentClass, sitesLinkColumnName, mailHTML, thisRow, preview);
      }
    }
  }
}

/**
 * Gets the agenda for a particular class in the form of an array of lessons
 * 
 * @param dateToday today's date
 * @param futureDate the last date to check
 * @param currentClass the current Class in Classroom
 * @returns the list of lessons
 */
function _getAgendaFromClass(
  dateToday: Date, 
  futureDate: Date, 
  maximumItemsDefault: number,
  currentClass: ClassGS
  ): Array<LessonInfo> {
  let lessonTitles: Array<LessonInfo> = [];
  const utils = new Utilities();
  const sampleUtils = new SampleUtilities();

  for (const topic of currentClass.getTopics()) {
    const topicWork: Work[] = currentClass.getTopicInfo(topic).work;
    for (const work of topicWork) {
      const dueDate: Date | undefined = sampleUtils._parseDueDate(work.dueDate);
      if (dueDate == undefined) continue;
      if (utils.compareDates(dueDate, dateToday, true, true) && utils.compareDates(futureDate, dueDate, true, true)) {

        lessonTitles.push(
          {
            title: work.title,
            dueDate: dueDate,
            lessonDate: dueDate,
            description: work.description
          }
        )
      }
      if ((maximumItemsDefault != -1) && (lessonTitles.length >= maximumItemsDefault)) {
        return lessonTitles;
      }
    }
  }

  return lessonTitles;
}

function _getAgendaFromSheet(agendaSheet: SheetGS, agendaDateColumnName: string, lessonColumnName: string, dateToday: Date, futureDate: Date, maximumItems: number): Array<LessonInfo> {
  let lessonRow: number = 1;
  const lessonTitles: Array<LessonInfo> = [];
  while (
    lessonRow <= agendaSheet.getLastRow()
  ) {
    const dateValue: Date = new Date(agendaSheet.getValueFromColumnHeader(lessonRow, agendaDateColumnName));
    const utils = new Utilities();

    if (dateValue != null) {
      if (utils.compareDates(dateValue, dateToday, true, true) && utils.compareDates(futureDate, dateValue, true, true)) {
        const lessonInfo = {} as LessonInfo;
        lessonInfo.title = agendaSheet.getValueFromColumnHeader(lessonRow, lessonColumnName).toString();

        lessonInfo.lessonDate = dateValue;
        lessonTitles.push(lessonInfo);

        if ((maximumItems != -1) && (lessonTitles.length >= maximumItems)) {
          return lessonTitles;
        }
  
      }
    }
    lessonRow++;
  }

  return lessonTitles;  
}

/**
 * Gets the current class's lessons from a spreadsheet
 * 
 * @param args the AgendaParams arguments
 * @param row the current row in the settings sheet
 * @param dateToday today's date
 * @param futureDate the last date to check
 * @returns the list of lessons
 */
function _getAgendaFromSpreadsheet(
  dateToday: Date,
  futureDate: Date,
  maxItems: number,
  row: Map<string | Date, string | Date>,
  args: AgendaParams
): Array<LessonInfo> {
  const {
      agendaSheetNameColumnName = AGENDA_SHEET_COLUMN,
      agendaDateColumnName = DATE_COLUMN,
      agendaSpreadsheetIDColumnName = AGENDA_SPREADSHEET_COLUMN,
      lessonColumnName = LESSON_COLUMN,  
    } = args;

  const sampleUtils = new SampleUtilities();

  let agendaSheet = sampleUtils._getSecondarySheet(agendaSpreadsheetIDColumnName, agendaSheetNameColumnName, row);

  if (agendaSheet === undefined) {
    console.log("WARNING: Could not find agenda sheet from column '" + agendaSheetNameColumnName + "' in _getAgendaFromSpreadsheet()");
    return [];
  }  

  return _getAgendaFromSheet(agendaSheet, agendaDateColumnName, lessonColumnName, dateToday, futureDate, maxItems);
}

/**
 * Write the agenda taken from Sheets and Classroom to a Google Doc
 *
 * @param {AgendaParams} args the settings for the agenda
 * @param {Array<LessonInfo>} lessonInfo the information for each lesson
 * @param {ClassGS} currentClass the object that contains the current class
 * @return {true} returns true if successful
 */
function _writeAgendaToDoc(
  args: AgendaParams,
  lessonInfo: Array<LessonInfo>,
  currentClass: ClassGS,
): DocsGS {
  const {
    templateName = AGENDA_TEMPLATE_NAME,
    agendaFileName = AGENDA_FILE_NAME,
    agendaDateParams = {} as DateParams,
  } = args;

  const agendaTitle: string = agendaFileName + ' ' + currentClass.getName();
  const agendaDoc = new DocsGS(new DriveGS().getOrCreateFileFromTemplateByName(agendaTitle, templateName).getId());
  agendaDoc.clearBody();
  agendaDoc.addText(agendaTitle, 'T', true);

  const dateUtilitiesInterface = new DateUtilities();

  for (const individualLesson of lessonInfo) {
    let lessonDate: string = dateUtilitiesInterface.formatTodaysDate(agendaDateParams, individualLesson.lessonDate);

    let dueDate: string = dateUtilitiesInterface.formatTodaysDate(agendaDateParams, individualLesson.dueDate);
;

    let textToAdd: string = individualLesson.title;
    if ((agendaDateParams.titlePrefix !== undefined) && (agendaDateParams.titlePrefix !== null) && (agendaDateParams.titlePrefix != "")) {
      textToAdd = agendaDateParams.titlePrefix + " " + textToAdd;
    }
    if (lessonDate != dueDate) 
      textToAdd = lessonDate + ' ' + textToAdd;

    agendaDoc.addText(textToAdd, 2);
    if (dueDate !== undefined) {
      agendaDoc.addText(AGENDA_DUE_PREFIX + dueDate, 3);
    }
    if (individualLesson.description !== undefined) {
      agendaDoc.addText(individualLesson.description, 5);
    }
  }
  return agendaDoc.publish();
}

/**
 * Get the agenda taken from Sheets and Classroom to HTML format for emailing
 *
 * @param {AgendaParams} args the settings for the agenda
 * @param {Array<LessonInfo>} lessonInfo the information for each lesson
 * @param {ClassGS} currentClass the object that contains the current class
 * @return {true} returns true if successful
 */
 function _writeAgendaToEmailHTML(
  args: AgendaParams,
  lessonInfo: Array<LessonInfo>,
  currentClass: ClassGS,
): string {
  const {
    agendaFileName = AGENDA_FILE_NAME,
    agendaDateParams = {} as DateParams,
  } = args;

  let agendaHTML: string = "<h1>" + agendaFileName + ' ' + currentClass.getName() + "</h1>";

  const dateUtilitiesInterface = new DateUtilities();
  const sampleUtils = new SampleUtilities();

  for (const individualLesson of lessonInfo) {
    let lessonDate: string = dateUtilitiesInterface.formatTodaysDate(agendaDateParams, individualLesson.lessonDate);

    let dueDate: string = dateUtilitiesInterface.formatTodaysDate(agendaDateParams, individualLesson.dueDate);
;

    let textToAdd: string = individualLesson.title;
    if ((agendaDateParams.titlePrefix !== undefined) && (agendaDateParams.titlePrefix !== null) && (agendaDateParams.titlePrefix != "")) {
      textToAdd = agendaDateParams.titlePrefix + " " + textToAdd;
    }

    if (lessonDate != dueDate) 
      textToAdd = lessonDate + ' ' + textToAdd;

    agendaHTML += "<h2>" + textToAdd + "</h2>";
    if (dueDate !== undefined) {
      agendaHTML += "<h3>" + AGENDA_DUE_PREFIX + dueDate + "</h3>";
    }
    if (individualLesson.description !== undefined) {
      agendaHTML += "<p>" + sampleUtils._replaceNewLinesWithBRs(individualLesson.description) + "</p>";
    }
  }
  return agendaHTML;
}

function _createLink(href: string, text: string): string {
  return "<a href='" + href + "'>" + text + "</a>";
}

function _writeWorkToEmailHTML(work: Work): string {
  const sampleUtils = new SampleUtilities();
  let emailHTML: string = "<h1>" + work.title + "</h1>";
  if (work.description !== undefined) {
    emailHTML += "<p>" + sampleUtils._replaceNewLinesWithBRs(work.description) + "</p>";
  }
  for (let material of work.materials) {
    emailHTML += "<h5>";
    if (material.file !== undefined) {
      emailHTML += _createLink(material.file, "Download file: " + material.title);
    } else if (material.form !== undefined) {
      emailHTML += _createLink(material.form, "Fill out form: " + material.title);
    } else if (material.link !== undefined) {
      emailHTML += _createLink(material.link, "Go to link: " + material.title);
    } else if (material.video !== undefined) {
      emailHTML += _createLink(material.video, "Watch video: " + material.title);
    }
    emailHTML += "</h5>";
  }
  return emailHTML;
}

function _emailAgendaToParents(
  emailToParents: ParentEmailInfo, 
  agendaDoc: DocsGS, 
  currentClass: ClassGS, 
  sitesLinkColumnName: string, 
  mailHTML: string,
  row?: Map<string | Date, string | Date>, 
  preview: string = ""
  ) {
  if (emailToParents != undefined) {
    let sitesLink = emailToParents.sitesLink;
    const {
      subject = AGENDA_SUBJECT,
      sendAsPDF = false,
      sendAsHTML = false,
      sendInBody = true,
      sendDocLink = false,
      sendSitesLink = false,
      docsLinkText = AGENDA_DOCS_LINK,
      sitesLinkText = AGENDA_SITES_LINK,
    } = emailToParents;

    let sendMail = new EmailGS();
    sendMail.setSubject(subject);

    const parentEmails = currentClass.getParentEmails();
    if (preview != "") {
      sendMail.addRecipient(preview, RecipientType.TO);
    } else {
      for (let email of parentEmails) {
        sendMail.addRecipient(email, RecipientType.BCC);
      }
    }
    let mailBody = "";
    if (sendInBody)
      mailBody = mailHTML;
    if (sendAsPDF) 
      sendMail.attachFileAsPDF(agendaDoc.getId());
    if (sendAsHTML) 
      sendMail.attachFile(agendaDoc.getAsHTML());

    if (sendDocLink) mailBody += '<br><a href="' + agendaDoc.getObject().getUrl() + '">' + docsLinkText + '</a>';
    if (sendSitesLink) {
      if (row !== undefined) {
        const thisSitesLink = row.get(sitesLinkColumnName);
        if (thisSitesLink !== undefined) {
          sitesLink = thisSitesLink.toString();
        }
      }
      if (sitesLink != undefined && sitesLink != null && sitesLink != '')
        mailBody += '<br><a href="' + sitesLink.toString() + '">' + sitesLinkText + '</a>';
    }
    sendMail.setBody(mailBody, true);
    sendMail.send(false);
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
function _displayAgendaOnSlide(
  lessonInfo: Array<LessonInfo>,
  slideShow: SlideshowGS,
  slideDisplayParams: SlideDisplayParams = {},
  row?: Map<string | Date, string | Date>
): boolean {

  if (row === undefined) {
    return false;
  }
  slideShow.setTextBoxOrTitleOnSlide(slideDisplayParams, {}, lessonInfo, row);

  return true;
}
