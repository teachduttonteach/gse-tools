import { ClassGS } from '../classroom/ClassGS';
/**
 * All of the arguments and other variables used by the Bellwork script
 */
declare type ClassroomArgs = {
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
export declare function updateClassroomFiles(args: ClassroomArgs): void;
/**
 * Update the individual class
 *
 * @param {ClassroomArgs} args the classroom parameters
 * @param {ClassGS} currentClass the current Google class
 */
export declare function updateGoogleClassroom(args: ClassroomArgs, currentClass: ClassGS): void;
export {};
