import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { DataSheet } from '../DataSheet';
import { ClassroomDocsGS } from '../classroom-docs/ClassroomDocsGS';
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
export function updateClassroomFiles(args) {
    if (args == null)
        args = {};
    const { settingsName = 'Classroom', classroomCodeColumnName = 'Classroom Code', dataSheet = 'gse-tools Settings', } = args;
    const dataSheetInterface = new DataSheet();
    const settings = dataSheetInterface.getDataSheet(dataSheet, settingsName);
    const classworkSettings = settings.getDataAsMap(settingsName);
    const allClasses = new ClassroomGS();
    classworkSettings.forEach(function (thisRow, row) {
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
    });
}
/**
 * Update the individual class
 *
 * @param {ClassroomArgs} args the classroom parameters
 * @param {ClassGS} currentClass the current Google class
 */
export function updateGoogleClassroom(args, currentClass) {
    const { newFileName = 'Google Classroom Summary', templateName = 'Google Classroom Summary Template' } = args;
    const gDrive = new DriveGS();
    const theseTopics = currentClass.getTopics();
    for (let topic = 0; topic < theseTopics.length; topic++) {
        const fileObject = gDrive.getOrCreateFileFromTemplateByName('Topic "' +
            currentClass.getTopicName(theseTopics[topic]) +
            '" for ' +
            currentClass.getName() +
            ': ' +
            newFileName, templateName);
        new ClassroomDocsGS(fileObject.getId()).writeClassroomDocuments(currentClass, theseTopics[topic]);
    }
}
