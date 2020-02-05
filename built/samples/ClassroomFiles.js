import { ClassroomGS } from '../classroom/ClassroomGS';
import { DriveGS } from '../drive/DriveGS';
import { getDataSheet } from '../DataSheet';
import { ClassroomDocsGS } from '../classroom-docs/ClassroomDocsGS';
/**
 * Update Google Docs from Classroom information
 * @param {ClassroomArgs} args the parameters to use
 */
export function updateClassroomFiles(args) {
    if (args == null)
        args = {};
    const { settingsName = 'Classroom', classroomCodeColumnName = 'Classroom Code', dataSheet } = args;
    const settings = getDataSheet(dataSheet);
    const classworkSettings = settings.getDataAsMap(settingsName);
    const allClasses = new ClassroomGS();
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
export function updateGoogleClassroom(args, currentClass) {
    const { newFileName = 'Google Classroom Summary', templateName = 'Google Classroom Summary Template', } = args;
    const gDrive = new DriveGS();
    const theseTopics = currentClass.getTopics();
    for (let topic = 0; topic < theseTopics.length; topic++) {
        const fileObject = gDrive.getOrCreateFileFromTemplateByName('Topic "' + currentClass.getTopicName(theseTopics[topic]) + '" for ' +
            currentClass.getName() + ': ' + newFileName, templateName);
        new ClassroomDocsGS(fileObject.getId())
            .writeClassroomDocuments(currentClass, theseTopics[topic]);
    }
}
