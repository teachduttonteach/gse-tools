import { SpreadsheetGS } from "../sheets/SpreadsheetGS"
import { ClassroomGS } from "../classroom/ClassroomGS"
import { DriveGS } from "../drive/DriveGS"
import { getDataSheet } from "../drive-sheets/DataSheet"
import { ClassGS } from "../classroom/ClassGS"
import { ClassroomDocsGS } from "../classroom-docs/ClassroomDocsGS"
import { DateParams } from "../calendar/DateParams"
import { MapGS } from "../map/MapGS"

/**
 * All of the arguments and other variables used by the Bellwork script
 */
type ClassroomArgs = {
  /**
   * Sheet name for the settings for the classroom files (default: "Classroom")
   */
  settingsName?: string,
  /**
   * Column name for the sheet column that contains the classroom enrollment code (default: "Classroom Code")
   */
  classroomCodeColumnName?: string,
  /**
   * Name to use for new files that are created holding class info (default: "Google Classroom Summary")
   */
  newFileName?: string,
  /**
   * Name of the template to use for the new files to be created (default: "Google Classroom Summary Template")
   */
  templateName?: string,
  /**
   * Parameters for displaying due dates (default: empty)
   */
  dueDateParams?: DateParams,

}

/**
 * 
 * @param args 
 */
function updateClassroomFiles(args: ClassroomArgs): void {
  if (args == null) args = {} as ClassroomArgs;
    let {
        settingsName = "Classroom",
        classroomCodeColumnName = "Classroom Code",
    } = args;

    let settings: SpreadsheetGS = getDataSheet();
    let classworkSettings: MapGS<string | Date, MapGS<string | Date, string | Date>> = settings.getMapData(settingsName);
    let allClasses: ClassroomGS = new ClassroomGS();
    
    classworkSettings.reset();
    while (classworkSettings.hasNext()) {
      let row = classworkSettings.next();
      let t_row = classworkSettings.get(row);
      if ((t_row == undefined) || (classroomCodeColumnName == undefined)) throw new Error("Could not find row in classworkSettings");

      let thisClassroomCode = t_row.get(classroomCodeColumnName);
      if ((thisClassroomCode == undefined) || (typeof thisClassroomCode !== "string")) throw new Error("Classroom code not found");

      let currentClass = allClasses.getClass(thisClassroomCode);
      updateGoogleClassroom(args, currentClass);
    }
  }
  
function updateGoogleClassroom(args: ClassroomArgs, currentClass: ClassGS) {
    const {
        newFileName = "Google Classroom Summary",
        templateName = "Google Classroom Summary Template",
    } = args;

    var gClassData = currentClass.convertClassroomData();
    var gDrive = new DriveGS();
    let t_topics: Array<string> = gClassData.getTopics();
    for (var topic = 0; topic < t_topics.length; topic++) {
        var fileObject = gDrive.getOrCreateFileFromTemplateByName("Topic " + topic + " for " + currentClass.getName() + ": " + newFileName, templateName);
        new ClassroomDocsGS(fileObject.getId()).writeClassroomDocuments(gClassData, t_topics[topic]);
    }
}
