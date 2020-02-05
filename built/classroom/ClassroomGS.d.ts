/// <reference types="google-apps-script" />
import { ClassGS } from 'ClassGS';
/**
 * Class to store the Google Classroom object
 * Get the courses and coursework
 * ```javascript
 * var enrollmentCode = '1234qz';
 *
 * var gseClassroom = gsetools.newClassroom();
 * var gseClass = gsetools.getGoogleClass(gseClassroom, enrollmentCode);
 * ```
 *
 * @return {ClassroomGS} the Classroom object
 */
export declare function newClassroom(): ClassroomGS;
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {ClassroomGS} obj the Classroom object
 * @return {Array<GoogleAppsScript.Classroom.Schema.Course>} the list of
 *  Course objects
 */
export declare function getClassroomObject(obj: ClassroomGS): Array<GoogleAppsScript.Classroom.Schema.Course>;
/**
 * Get the ClassGS object from the enrollment code that students use to
 *  join the class
 *
 * @param {ClassroomGS} obj the Classroom object
 * @param {string} enrollmentCode the enrollment code that students use to
 *  join the class
 *
 * @return {ClassGS} the Class object
 */
export declare function getGoogleClass(obj: ClassroomGS, enrollmentCode: string): ClassGS;
/**
 * Class to store the Google Classroom object
 */
export declare class ClassroomGS {
    private _classList;
    /**
     * Get the courses and coursework
     */
    constructor();
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {Array<GoogleAppsScript.Classroom.Schema.Course>} the list of
     *  Course objects
     */
    getObject(): Array<GoogleAppsScript.Classroom.Schema.Course>;
    /**
     * Get the ClassGS object from the enrollment code that students use to
     *  join the class
     *
     * @param {string} enrollmentCode the enrollment code that students use to
     *  join the class
     *
     * @return {ClassGS} the Class object
     */
    getClass(enrollmentCode: string): ClassGS;
}
