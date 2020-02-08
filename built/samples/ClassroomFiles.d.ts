import { ClassGS } from '../classroom/ClassGS';
import { DateParams } from '../DateParams';
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
     * Parameters for displaying due dates; default is empty
     */
    dueDateParams?: DateParams;
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
 * var dateParams = {
 *  titlePrefix: ' - ',
 *  dateDelim: '/',
 *  dateOrder: 'MD',
 *  noEventString: 'NONE',
 * };
 *
 * var classroomArgs = {
 *  settingsName: 'Classroom',
 *  classroomCodeColumnName: 'Class Code',
 *  newFileName: 'Google Classroom Test Summary',
 *  templateName: 'Google Classroom Summary Test Template',
 *  dueDateParams: dateParams,
 * };
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
