/// <reference types="google-apps-script" />
import { ClassGS } from 'ClassGS';
/**
 * Class to store the Google Classroom object
  * Get the courses and coursework
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
export declare function getClassroomClass(obj: ClassroomGS, enrollmentCode: string): ClassGS;
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
