import {SpreadsheetGS} from '../sheets/SpreadsheetGS';
import {ClassroomGS} from '../classroom/ClassroomGS';
import {DriveGS} from '../drive/DriveGS';
import {getDataSheet} from '../DataSheet';
import {ClassGS} from '../classroom/ClassGS';
import {ClassroomDocsGS} from '../classroom-docs/ClassroomDocsGS';
import {MapGS} from '../map/MapGS';
import { WriteDocsParams } from '../classroom-docs/WriteDocsParams';

type DocTemplateInfo = {
  type: "Name" | "ID";
  value: string;
}

type TemplateInfo = {
  docTemplate: DocTemplateInfo,
  tocTemplate: DocTemplateInfo,
};

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
   * Column name for the class name of the Classroom
   */
  classNameColumnName?: string;
  /**
   * Column name for the number of announcements to display; default is 
   *  'Display Announcements'
   */
  displayAnnouncementsColumnName?: string;
  /**
   * Determine the default number of announcements to display; default is '1'
   */
  displayAnnouncementsDefault?: number;
  /**
   * Name to use for new files that are created holding class info; default is
   *  'Google Classroom Summary'
   */
  newFileName?: string;
  /**
   * What to display between the topic name and the class name; default is 
   *  'for'
   */
  fileNamePreposition?: string;
  /**
   * What to display between the class name and the template name; default is
   *  ':'
   */
  fileNameSeparator?: string;
  /**
   * Name of the template to use for the new files to be created; default is
   *  'Google Classroom Summary Template'
   */
  templateName?: string;
  /**
   * ID of the template to use for the new files to be created
   */
  templateID?: string;
  /**
   * Column name to get a specific template by name for the class
   */
  specificTemplateNameColumnName?: string;
  /**
   * Column name to get a specific template by ID for the class
   */
  specificTemplateIDColumnName?: string;
  /**
   * Column name to get a specific TOC template by name for the class
   */
  specificTOCTemplateNameColumnName?: string;
  /**
   * Column name to get a specific TOC template by ID for the class
   */
  specificTOCTemplateIDColumnName?: string;
  /**
   * The name of the data settings sheet to use; defaults to 'gse-tools
   *  Settings'
   */
  dataSheet?: string;
  /**
   * Column name of the ID of the source folder to get files from
   */
  sourceFolder?: string;
  /**
   * Column name of the ID of the destination folder to store files in
   */
  destinationFolder?: string;
  /**
   * Whether or not the Table of Contents should be created
   */
  tableOfContents?: boolean;
  /**
   * The name of the table of contents, default is 'Table of Contents'
   */
  tableOfContentsString?: string;
  /**
   * Name of the template to use for the Table of Contents to be created; 
   *  default is 'Google Classroom Summary TOC Template'
   */
  tocTemplateName?: string;
  /**
   * ID of the template to use for the Table of Contents to be created
   */
  tocTemplateID?: string;
  /**
   * Column name of the No Topic string for the individual class; defaults to
   *  'No Topic'
   */
  noTopicColumnName?: string;
  /**
   * Default string to display for the assignments that have no topic; defaults
   *  to 'Assignments'
   */
  noTopicDefaultString?: string;
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
    classNameColumnName = 'Class Name',
    displayAnnouncementsColumnName = 'Display Announcements',
    displayAnnouncementsDefault = 1,
    dataSheet = 'gse-tools Settings',
    sourceFolder = 'Source Folder',
    destinationFolder = 'Destination Folder',
    tableOfContents = false,
    tableOfContentsString = 'Table of Contents',
    newFileName = 'Google Classroom Summary',
    fileNamePreposition = 'for',
    noTopicColumnName = 'No Topic',
    noTopicDefaultString = 'Assignments',
    specificTemplateNameColumnName,
    specificTemplateIDColumnName,
    specificTOCTemplateNameColumnName,
    specificTOCTemplateIDColumnName,
    templateName = 'Google Classroom Summary Template',
    templateID,
    tocTemplateName = 'Google Classroom Summary TOC Template',
    tocTemplateID
  } = args;

  // Get default writeDocsParams
  if (writeDocsParams == undefined) writeDocsParams = {} as WriteDocsParams;

  // Get the DriveGS object for later
  const gDrive = new DriveGS();

  // Get the current settings from the data sheet
  const settings: SpreadsheetGS = getDataSheet(dataSheet, settingsName);
  const classworkSettings: MapGS<string | Date, MapGS<string | Date,
    string | Date>> = settings.getDataAsMap(settingsName);

  // Get all of the classes
  const allClasses: ClassroomGS = new ClassroomGS();

  // Loop through the settings
  classworkSettings.reset();
  while (classworkSettings.hasNext()) {

    // Get the current row from the settings
    const rowName = classworkSettings.next();
    const thisRow = classworkSettings.get(rowName);

    // Make sure that the row is defined
    if (thisRow == undefined || classroomCodeColumnName == undefined) {
      throw new Error('Could not find row in classworkSettings in ' +
        'updateClassroomFiles()');
    }

    // Make sure the classroom code is defined
    const thisClassroomCode = thisRow.get(classroomCodeColumnName);
    if (thisClassroomCode == undefined ||
      typeof thisClassroomCode !== 'string') {
      throw new Error('Classroom code not found in updateClassroomFiles');
    }

    // Get the string to display for assignments for which there is no topic 
    //  defined; if it's not specified on the row, then use the default
    let noTopicString = thisRow.get(noTopicColumnName);
    if (noTopicString == "" || noTopicString == undefined ||
      typeof noTopicString !== 'string') {
        noTopicString = noTopicDefaultString;
    }

    // Get the number of announcements to display
    let thisDisplayAnnouncements: number = displayAnnouncementsDefault;
    let thisDisplayAnnouncementsString = 
      thisRow.get(displayAnnouncementsColumnName);
    if (thisDisplayAnnouncementsString != "" && 
      thisDisplayAnnouncementsString !== null &&
      !(thisDisplayAnnouncementsString instanceof Date)) {
        thisDisplayAnnouncements = 
          Number.parseInt(thisDisplayAnnouncementsString);
    }

    // Object to determine which templates should be used for the doc template
    //  and the toc templates
    let templateInfo: TemplateInfo = {} as TemplateInfo;
    templateInfo.docTemplate = {} as DocTemplateInfo;
    templateInfo.tocTemplate = {} as DocTemplateInfo;

    // Checking to see if the templates were specified by name
    templateInfo = checkArgForTemplate(templateName, templateInfo, 
      "doc", "Name");
    templateInfo = checkArgForTemplate(tocTemplateName, templateInfo, 
      "toc", "Name");
  
    // Checking to see if the templates were specified by ID
    templateInfo = checkArgForTemplate(templateID, templateInfo, 
        "doc", "ID");
    templateInfo = checkArgForTemplate(tocTemplateID, templateInfo, 
        "toc", "ID");
      
    // Checking to see if the templates were specified by name for this class
    templateInfo = checkRowForTemplate(thisRow, specificTemplateNameColumnName, 
      templateInfo, "doc", "Name");
    templateInfo = checkRowForTemplate(thisRow, 
      specificTOCTemplateNameColumnName, templateInfo, "toc", "Name");
      
    // Checking to see if the templates was specified by ID for this class
    templateInfo = checkRowForTemplate(thisRow, specificTemplateIDColumnName, 
      templateInfo, "doc", "ID");
    templateInfo = checkRowForTemplate(thisRow, 
      specificTOCTemplateIDColumnName, templateInfo, "toc", "ID");  

    // Check to make sure the source folder for the doc is not a Date
    const thisSourceFolder = thisRow.get(sourceFolder);
    if (thisSourceFolder instanceof Date) 
      throw new Error('Destination folder cannot be a Date'); 

    // Check to make sure the destination folder for the doc is not a Date
    const thisDestinationFolder = thisRow.get(destinationFolder);
    if (thisDestinationFolder instanceof Date) 
      throw new Error('Destination folder cannot be a Date'); 

    // Only continue if the classroom code is defined
    if (thisClassroomCode != '') {
      const currentClass = allClasses.getClass(thisClassroomCode);

      // Get the class name from the settings sheet
      let thisClassName = thisRow.get(classNameColumnName);
      
      // If the class name was undefined, get it from Classroom
      if (thisClassName == "" || thisClassName == undefined ||
        typeof thisClassName !== 'string') {
          thisClassName = currentClass.getName();
      }
  
      // Get the list of topics for the current class
      const theseTopics: Array<string> = currentClass.getTopics();
    
      // Create an object to hold all of the created files in order to create
      // the table of contents
      let allCreatedFiles: Array<GoogleAppsScript.Drive.File> = [];
    
      // Create object to hold the current file
      let fileObject: GoogleAppsScript.Drive.File = createFile(args, 
        templateInfo.docTemplate, gDrive, noTopicString, thisClassName, 
        newFileName, thisSourceFolder, thisDestinationFolder);

      // Add this file to the list of files to use for the toc
      allCreatedFiles.push(fileObject);

      // Create the document for the assignments that have no topic
      new ClassroomDocsGS(fileObject.getId())
        .writeClassroomDocuments(currentClass, false, thisDisplayAnnouncements, writeDocsParams, noTopicString);
    
      // Loop through all of the topics
      for (let topic = 0; topic < theseTopics.length; topic++) {

        // Get file object from templates
        fileObject = createFile(args, templateInfo.docTemplate, gDrive, 
          currentClass.getTopicName(theseTopics[topic]), 
          thisClassName, newFileName, thisSourceFolder, thisDestinationFolder);
  
        // Add file to list for toc and create it
        allCreatedFiles.push(fileObject);
        new ClassroomDocsGS(fileObject.getId())
            .writeClassroomDocuments(currentClass, theseTopics[topic], thisDisplayAnnouncements, writeDocsParams);
      }
    
      if (tableOfContents) {

        // Create the toc file
        fileObject = createFile(args, templateInfo.tocTemplate, gDrive, 
          tableOfContentsString + ' ' + fileNamePreposition + ' ' + 
          thisClassName, thisClassName, newFileName, thisSourceFolder, 
          thisDestinationFolder);

        // Write the toc file
        new ClassroomDocsGS(fileObject.getId())
          .writeTableOfContents(currentClass, thisClassName, allCreatedFiles, 
            theseTopics, noTopicString);
      }
    }
  }
}

// Create the file based on the template info provided
function createFile(args: ClassroomArgs, templateInfo: DocTemplateInfo, 
  gDrive: DriveGS, topicString: string, className: string, fileName: string,
  sourceFolder: string | null, destinationFolder: string | null): GoogleAppsScript.Drive.File {
  const {
    fileNamePreposition = 'for',
    fileNameSeparator = ':'
  } = args;
  const newFileName = topicString + ' ' + fileNamePreposition + ' ' + className 
    + fileNameSeparator + ' ' + fileName;
  let fileObject: GoogleAppsScript.Drive.File;
  if (templateInfo.type == "Name") {
    fileObject = gDrive.getOrCreateFileFromTemplateByName(
      newFileName, templateInfo.value, sourceFolder, destinationFolder);  
  } else {
    fileObject = gDrive.getOrCreateFileFromTemplateById(
      newFileName, templateInfo.value, destinationFolder);  
  }
  return fileObject;
}

function checkRowForTemplate(thisRow: 
  MapGS<string | Date, string | Date>, colName: string | undefined, templateInfo: TemplateInfo, templateType: "doc" | "toc", type: "Name" | "ID"): TemplateInfo {
  if (colName !== undefined) {
    const thisName = thisRow.get(colName);
    if (thisName !== undefined &&
      thisName !== null &&
      !(thisName instanceof Date)) {
        if (templateType == "doc") {
          templateInfo.docTemplate.type = type;
          templateInfo.docTemplate.value = thisName;    
        } else {
          templateInfo.tocTemplate.type = type;
          templateInfo.tocTemplate.value = thisName;    
        }
    }
  }
  
  return templateInfo;
}

function checkArgForTemplate(value: string | undefined, templateInfo: TemplateInfo, templateType: "doc" | "toc", type: "Name" | "ID"): TemplateInfo {
  if (value !== undefined &&
    value !== null) {
      if (templateType == "doc") {
        templateInfo.docTemplate.type = type;
        templateInfo.docTemplate.value = value;    
      } else {
        templateInfo.tocTemplate.type = type;
        templateInfo.tocTemplate.value = value;    
      }
  }
  
  return templateInfo;
}

export function getClassList() {
  new ClassroomGS().getClassList();
}
