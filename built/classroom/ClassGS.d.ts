/// <reference types="google-apps-script" />
import { ClassInfo } from 'ClassInfo';
import { ClassDataParams } from 'ClassDataParams';
/**
 * Class to access a single course in Google Classroom
  * @param {GoogleAppsScript.Classroom.Schema.Course} course the
  *  Google course object
  * @return {ClassGS} the object for chaining
  */
export declare function newClass(course: GoogleAppsScript.Classroom.Schema.Course): ClassGS;
/**
 * Get the name of the course
 *
 * @param {ClassGS} obj the Class object
 * @return {string} the name of the course
 */
export declare function getClassName(obj: ClassGS): string;
/**
 * Gets the id of the calendar associated with the course
 *
 * @param {ClassGS} obj the Class object
 * @return {string} the calendar id
 */
export declare function getClassCalendarId(obj: ClassGS): string;
/**
 * Convert the current course's data into a ClassInfo object
 *
 * @param {ClassGS} obj the Class object
 * @param {ClassDataParams} args the optional parameters for creating the
 *  classroom data object
 *
 * @return {ClassInfo} the object for chaining
 */
export declare function convertClassroomData(obj: ClassGS, args?: ClassDataParams): ClassInfo;
/**
 * Class to access a single course in Google Classroom
 */
export declare class ClassGS {
    private _classInfo;
    private _courseWork;
    private _topics;
    private _course;
    /**
     *
     * @param {GoogleAppsScript.Classroom.Schema.Course} course the
     *  Google course object
     */
    constructor(course: GoogleAppsScript.Classroom.Schema.Course);
    /**
     * Get the name of the course
     *
     * @return {string} the name of the course
     */
    getName(): string;
    /**
     * Gets the id of the calendar associated with the course
     *
     * @return {string} the calendar id
     */
    getCalendarId(): string;
    /**
     * Convert the current course's data into a ClassInfo object
     *
     * @param {ClassDataParams} args the optional parameters for creating the
     *  classroom data object
     *
     * @return {ClassInfo} the object for chaining
     */
    convertClassroomData(args?: ClassDataParams): ClassInfo;
    /**
     * Gets the due date string
     *
     * @param {GoogleAppsScript.Classroom.Schema.Date} workDueDate the Google
     *  Date object holding the due date
     * @param {ClassDataParams} args the class data arguments for determining
     *  the date string
     *
     * @return {string} the due date string
     */
    private _getDueDate;
    /**
     * Gets the current material associated with the task
     *
     * @param {GoogleAppsScript.Classroom.Schema.Material} thisMaterial the
     *  material associated with the current task as a Google object
     *
     * @return {Material} the material associated with the current task
     *  in a Material object
     */
    private _getMaterials;
}
