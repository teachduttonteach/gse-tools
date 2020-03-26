import {SpreadsheetGS} from '../sheets/SpreadsheetGS';
import {ClassroomGS} from '../classroom/ClassroomGS';
import {DriveGS} from '../drive/DriveGS';
import {getDataSheet} from '../DataSheet';
import {ClassGS} from '../classroom/ClassGS';
import {ClassroomDocsGS} from '../classroom-docs/ClassroomDocsGS';
import {MapGS} from '../map/MapGS';
import { WriteDocsParams } from '../classroom-docs/WriteDocsParams';

/**
 * All of the arguments and other variables used by the Bellwork script
 */
type ClassroomArgs = {
  /**
   * Sheet name for the gse-tools Settings for the classroom files; default
   *  is 'Classroom'
   */
  settingsName?: string;
  /**
   * Column name for the gse-tools Settings sheet column that contains the
   *  classroom enrollment code; default is 'Classroom Code'
   */
  classroomCodeColumnName?: string;
  /**
   * Name to use for new files that are created holding class info; default is
   *  'Google Classroom Summary'
   */
  newFileName?: string;
  /**
   * Name of the template to use for the new files to be created; default is
   *  'Google Classroom Summary Template'
   */
  templateName?: string;
  /**
   * The name of the data settings sheet to use; defaults to 'gse-tools
   *  Settings'
   */
  dataSheet?: string;
  /**
   * Column name of the ID of the destination folder to store files in
   */
  destinationFolder?: string;
  /**
   * Column name for whether or not the Table of Contents should be created
   */
  tableOfContents?: string;
  /**
   * Name of the template to use for the Table of Contents to be created; 
   *  default is 'Google Classroom Summary TOC Template'
   */
  tocTemplateName?: string;
};

/**
 * Update Google Docs from Classroom information
 *
 * ```javascript
 * // These are all optional arguments - all have default values (see documentation)  
 * var classroomArgs = {
 *   // The Settings Spreadsheet name
 *   dataSheet: 'gse-tools Settings',
 *   
 *   // The sheet name within the Settings Spreadsheet that has settings for each class 
 *   settingsName: 'Classroom',
 *   
 *   // The column name in the settings sheet that has the Google Classroom enrollment codes
 *   classroomCodeColumnName: 'Class Code',
 *   
 *   // The name to give all files created by this script; will also include the class name
 *   newFileName: 'Google Classroom Summary',
 *   
 *   // The template file to use for all of the files created by this script
 *   templateName: 'Google Classroom Summary Test Template',
 * };
 * 
 * // Call the gse-tools function
 * gsetools.updateClassroomFiles(classroomArgs);
 * ```
 * @param {ClassroomArgs} args the parameters to use
 * @param {WriteDocsParams} writeDocsParams the parameters that define how to 
 *  write the documents
 */
export function updateClassroomFiles(args: ClassroomArgs, writeDocsParams?: WriteDocsParams): void {
  if (args == null) args = {} as ClassroomArgs;
  const {
    settingsName = 'Classroom',
    classroomCodeColumnName = 'Classroom Code',
    dataSheet = 'gse-tools Settings',
    destinationFolder = 'Destination Folder',
    tableOfContents = 'Table of Contents'
  } = args;

  if (writeDocsParams == undefined) writeDocsParams = {} as WriteDocsParams;

  const settings: SpreadsheetGS = getDataSheet(dataSheet, settingsName);
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
        'updateClassroomFiles()');
    }

    const thisClassroomCode = thisRow.get(classroomCodeColumnName);
    if (thisClassroomCode == undefined ||
      typeof thisClassroomCode !== 'string') {
      throw new Error('Classroom code not found in updateClassroomFiles');
    }

    const thisDestinationFolder = thisRow.get(destinationFolder);
    if (thisDestinationFolder instanceof Date) 
      throw new Error('Destination folder cannot be a Date'); 

    let createTableOfContents = false;
    const thisTableOfContents = thisRow.get(tableOfContents);
    if (thisTableOfContents instanceof Date) 
      throw new Error('Table of contents cannot be a Date'); 
    else if (thisTableOfContents != "") createTableOfContents = true;

    if (thisClassroomCode != '') {
      const currentClass = allClasses.getClass(thisClassroomCode);
      updateGoogleClassroom(args, currentClass, writeDocsParams, createTableOfContents, thisDestinationFolder);
    }
  }
}

/**
 * Update the individual class
 *
 * @param {ClassroomArgs} args the classroom parameters
 * @param {ClassGS} currentClass the current Google class
 * @param {WriteDocsParams} writeDocsParams the document writing parameters
 * @param {boolean} tableOfContents whether or not to create a TOC
 * @param {string | null} destinationFolder the destination folder for the 
 *  files
 */
export function updateGoogleClassroom(args: ClassroomArgs,
    currentClass: ClassGS, writeDocsParams: WriteDocsParams, 
    tableOfContents: boolean, destinationFolder: string | null) {
  const {
    newFileName = 'Google Classroom Summary',
    templateName = 'Google Classroom Summary Template',
    tocTemplateName = 'Google Classroom Summary TOC Template'
  } = args;

  const gDrive = new DriveGS();
  const theseTopics: Array<string> = currentClass.getTopics();

  let allCreatedFiles: Array<GoogleAppsScript.Drive.File> = [];

  for (let topic = 0; topic < theseTopics.length; topic++) {
    const fileObject = gDrive.getOrCreateFileFromTemplateByName(
        'Topic "' + currentClass.getTopicName(theseTopics[topic]) + '" for ' +
      currentClass.getName() + ': ' + newFileName, templateName, 
      destinationFolder);
    allCreatedFiles.push(fileObject);
    new ClassroomDocsGS(fileObject.getId())
        .writeClassroomDocuments(currentClass, theseTopics[topic], writeDocsParams);
  }

  if (tableOfContents) {
    let tocFile = gDrive.getOrCreateFileFromTemplateByName(
      'Table of Contents for ' + currentClass.getName(), tocTemplateName, destinationFolder);
    for (const thisFile of allCreatedFiles) {
      
    }
  }
}

export function getClassList() {
  new ClassroomGS().getClassList();
}
