import { SpreadsheetGS } from '../sheets/SpreadsheetGS';
import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { DataSheet } from '../DataSheet';
import { ClassGS } from '../classroom/ClassGS';
import { ClassroomDocsGS } from '../classroom-docs/ClassroomDocsGS';
import { MapGS } from '../map/MapGS';

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
 */
export function updateClassroomFiles(args: ClassroomArgs): void {
  if (args == null) args = {} as ClassroomArgs;
  const {
    settingsName = 'Classroom',
    classroomCodeColumnName = 'Classroom Code',
    dataSheet = 'gse-tools Settings',
  } = args;

  const dataSheetInterface = new DataSheet();

  const settings: SpreadsheetGS = dataSheetInterface.getDataSheet(dataSheet, settingsName);
  const classworkSettings: MapGS<string | Date, MapGS<string | Date, string | Date>> = settings.getDataAsMap(
    settingsName,
  );
  const allClasses: ClassroomGS = new ClassroomGS();

  classworkSettings.reset();
  while (classworkSettings.hasNext()) {
    const row = classworkSettings.next();
    const thisRow = classworkSettings.get(row);
    if (thisRow == undefined || classroomCodeColumnName == undefined) {
      throw new Error('Could not find row in classworkSettings in ' + 'updateClassroomFiles()');
    }

    const thisClassroomCode = thisRow.get(classroomCodeColumnName);
    if (thisClassroomCode == undefined || typeof thisClassroomCode !== 'string') {
      throw new Error('Classroom code not found in updateClassroomFiles');
    }

    if (thisClassroomCode != '') {
      const currentClass = allClasses.getClass(thisClassroomCode);
      updateGoogleClassroom(args, currentClass);
    }
  }
}

/**
 * Update the individual class
 *
 * @param {ClassroomArgs} args the classroom parameters
 * @param {ClassGS} currentClass the current Google class
 */
export function updateGoogleClassroom(args: ClassroomArgs, currentClass: ClassGS) {
  const { newFileName = 'Google Classroom Summary', templateName = 'Google Classroom Summary Template' } = args;

  const gDrive = new DriveGS();
  const theseTopics: Array<string> = currentClass.getTopics();
  for (let topic = 0; topic < theseTopics.length; topic++) {
    const fileObject = gDrive.getOrCreateFileFromTemplateByName(
      'Topic "' +
        currentClass.getTopicName(theseTopics[topic]) +
        '" for ' +
        currentClass.getName() +
        ': ' +
        newFileName,
      templateName,
    );
    new ClassroomDocsGS(fileObject.getId()).writeClassroomDocuments(currentClass, theseTopics[topic]);
  }
}
