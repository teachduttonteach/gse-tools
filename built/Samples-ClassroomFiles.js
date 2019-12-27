import { ClassroomGS } from "./ClassroomGS";
import { DriveGS } from "./DriveGS";
import { getDataSheet } from "./Properties";
import { DocsGS } from "./DocsGS";
/**
 *
 * @param args
 */
function updateClassroomFiles(args) {
    if (args == null)
        args = {};
    let { settingsName = "Classroom", classroomCodeColumnName = "Classroom Code", } = args;
    let settings = getDataSheet();
    let classworkSettings = settings.getMapData(settingsName);
    let allClasses = new ClassroomGS();
    classworkSettings.reset();
    while (classworkSettings.hasNext()) {
        let row = classworkSettings.next();
        let t_row = classworkSettings.get(row);
        if ((t_row == undefined) || (classroomCodeColumnName == undefined))
            throw new Error("Could not find row in classworkSettings");
        let t_classroomCode = t_row.get(classroomCodeColumnName);
        if (t_classroomCode == undefined)
            throw new Error("Classroom code not found");
        let currentClass = allClasses.getClass(t_classroomCode);
        updateGoogleClassroom(args, currentClass);
    }
}
function updateGoogleClassroom(args, currentClass) {
    const { newFileName = "Google Classroom Summary", templateName = "Google Classroom Summary Template", } = args;
    var gClassData = currentClass.convertClassroomData();
    var gDrive = new DriveGS();
    let t_topics = gClassData.getTopics();
    for (var topic = 0; topic < t_topics.length; topic++) {
        var fileObject = gDrive.getOrCreateFileFromTemplateByName("Topic " + topic + " for " + currentClass.getName() + ": " + newFileName, templateName);
        new DocsGS(fileObject.getId()).writeClassroomDocuments(gClassData, t_topics[topic]);
    }
}
