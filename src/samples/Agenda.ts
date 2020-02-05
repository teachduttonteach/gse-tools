import {SpreadsheetGS} from '../sheets/SpreadsheetGS';
import {SheetGS} from '../sheets/SheetGS'
import {ClassroomGS} from '../classroom/ClassroomGS';
import {DriveGS} from '../drive/DriveGS';
import {getDataSheet} from '../DataSheet';
import {ClassGS} from '../classroom/ClassGS';
import {Work} from '../classroom/Work'
import {DateParams} from '../calendar/DateParams';
import {MapGS} from '../map/MapGS';
import {SlideshowGS} from '../slides/SlideshowGS';
import {getTodaysDate, getOneDay, compareDates} from '../utils/Utilities'
import { DocsGS } from '../docs/DocsGS';

type LessonTitle = {
  lessonDate: Date;
  title: string;
  dueDate: string;
  description?: string;
}

/**
 * All of the arguments and other variables used by the Bellwork script
 */
type AgendaArgs = {
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
   * 'Date Column'
   */
  agendaDateColumnName?: string;
  /**
   * 'END'
   */
  agendaSheetDateColumnEnd?: string,
  /**
   * true
   */
  writeAgenda?: boolean;
  /**
   * true
   */
  displayAgenda?: boolean;
  /**
   * 7
   */
  daysToLookAhead?: number;
  /**
   * 'Agenda'
   */
  agendaSlideNotes?: string;
};

/**
 * Update Google Docs from Classroom information
 * @param {ClassroomArgs} args the parameters to use
 */
export function updateDailyAgenda(args?: AgendaArgs): void {
  if (args == null) args = {} as AgendaArgs;
  const {
    settingsName = 'Agenda',
    classroomCodeColumnName = 'Classroom Code',
    dataSheet = 'gse-tools Settings'
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
}

/**
 * Update the individual class
 *
 * @param {ClassroomArgs} args the classroom parameters
 * @param {ClassGS} currentClass the current Google class
 */
function updateClassAgenda(args: AgendaArgs,
  row: MapGS<string | Date, string | Date>, currentClass: ClassGS) {
  const {
    agendaSheetNameColumnName = 'Sheet Name',
    agendaDateColumnName = 'Date Column',
    agendaSheetDateColumnEnd = 'END',
    writeAgenda = true,
    displayAgenda = true,
    daysToLookAhead = 7,
    agendaSpreadsheetIDColumnName = 'Agenda Spreadsheet ID',
    lessonColumnName = 'Lesson Column Number',
    timezoneOffset = -5
  } = args;

  const dateToday: Date = getTodaysDate(timezoneOffset);
  const futureDate: Date = new Date(dateToday);
  futureDate.setMilliseconds(futureDate.getMilliseconds() + 
    (getOneDay() * daysToLookAhead));

  const thisAgendaSpreadsheetName = row.get(agendaSpreadsheetIDColumnName);
  if (thisAgendaSpreadsheetName == null ||
      typeof thisAgendaSpreadsheetName !== 'string') {
    throw new Error('Could not find spreadsheet ID in ' +
      'Agenda.updateClassAgenda()');
  }
  const agendaSpreadsheet: SpreadsheetGS =
    new SpreadsheetGS(thisAgendaSpreadsheetName);

  const thisSheetNameColumnName = row.get(agendaSheetNameColumnName);
  if (thisSheetNameColumnName == null ||
    typeof thisSheetNameColumnName !== 'string') {
    throw new Error('Could not find sheet name column name (' +
    agendaSheetNameColumnName + ') in Bellwork.updateTodaysQuestion()');
  }
  const agendaSheet: SheetGS =
    agendaSpreadsheet.getSheet(thisSheetNameColumnName);

  const thisAgendaDateColumnName = row.get(agendaDateColumnName);
  if (thisAgendaDateColumnName == null) {
    throw new Error('Could not find bellwork date column name in ' +
      'Bellwork.updateTodaysQuestion()');
  }
  let lessonRow: number = agendaSheet.skipBlankRows(1,
      +thisAgendaDateColumnName);
  let lessonTitles: Array<LessonTitle> = [];
  while ((lessonRow <= agendaSheet.getLastRow()) &&
    ((agendaSheet.getValue(lessonRow, +thisAgendaDateColumnName) !==
    agendaSheetDateColumnEnd))) {
    const dateInCell: Date = new Date(agendaSheet.getValue(lessonRow,
        +thisAgendaDateColumnName));

    if (compareDates(dateInCell, dateToday, true, true) && 
      compareDates(futureDate, dateInCell, true, true)) {
      const thisLessonColumnName = row.get(lessonColumnName);
      if (thisLessonColumnName == null) {
        throw new Error('Could not find bellwork column name in ' +
        'Samples.doForBellwork()');
      }
      let lessonInfo = {} as LessonTitle;
      lessonInfo.title = agendaSheet.getValue(lessonRow, +thisLessonColumnName).toString();
      lessonInfo.lessonDate = dateInCell;
      lessonTitles.push(lessonInfo);
    }
    lessonRow++;
  }

  if (lessonTitles.length == 0) return false;

  if (writeAgenda) {
    writeAgendaToDoc(args, lessonTitles, currentClass);
  }

  if (displayAgenda) {
    displayAgendaOnSlide(args, row, lessonTitles);
  }
  return true;
}

function writeAgendaToDoc(args: AgendaArgs, 
  lessonTitles: Array<LessonTitle>, 
  currentClass: ClassGS) {
  
  const {
    templateName = 'Agenda Document Template',
    agendaFileName = 'Class Agenda',
    agendaDateParams = {} as DateParams,
  } = args;

  for (let topic of currentClass.getTopics()) {
    const topicWork: Work[] =
      currentClass.getTopicInfo(topic).work;
    for (let work of topicWork) {
      for (let lesson of lessonTitles) {
        if (lesson.title == work.title) {
          Logger.log("Found " + lesson.title);
          lesson.dueDate = work.dueDate;
          lesson.description = work.description;
        }
      }
    }
  }

  let agendaTitle: string = agendaFileName + ' ' + currentClass.getName();
  let agendaDoc = new DocsGS(new DriveGS().getOrCreateFileFromTemplateByName(agendaTitle,
    templateName).getId());
  agendaDoc.clearBody();
  agendaDoc.addText(agendaTitle, 'T');
  
  for (let lessonTitle of lessonTitles) {
    let lessonDate: string = "";
    if (agendaDateParams.dateOrder == 'DM') 
      lessonDate = [lessonTitle.lessonDate.getDate(), 
        (lessonTitle.lessonDate.getMonth() + 1)].join(agendaDateParams.dateDelim);
    else 
      lessonDate = [(lessonTitle.lessonDate.getMonth() + 1), 
        lessonTitle.lessonDate.getDate()].join(agendaDateParams.dateDelim);
    
    agendaDoc.addText(lessonDate + ' ' + agendaDateParams.titlePrefix + ' ' + lessonTitle.title, 2);
    if (lessonTitle.dueDate !== undefined) 
      agendaDoc.addText(lessonTitle.dueDate, 3);
    if (lessonTitle.description !== undefined) 
      agendaDoc.addText(lessonTitle.description, 4); 
  }
}

function displayAgendaOnSlide(args: AgendaArgs, 
  row: MapGS<string | Date, string | Date>,
  lessonTitles: Array<LessonTitle>) {
  
  const {
    agendaSlideshowIDColumnName = 'Agenda Slides ID',
    agendaSlideNotes = 'Agenda'
  } = args;

  const thisSlideshowID =
    row.get(agendaSlideshowIDColumnName);
  if ((thisSlideshowID !== undefined) && 
    (typeof thisSlideshowID === 'string') &&
    (thisSlideshowID != '')) {
    const slideShow = new SlideshowGS(thisSlideshowID);
    let agendaSlide = slideShow.getSlideByNotes(agendaSlideNotes);
    if (agendaSlide !== null) {
      agendaSlide.setList(lessonTitles.map(a => a.title).join('\n'));
    }
  }
}