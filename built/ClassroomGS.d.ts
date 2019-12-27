/// <reference types="google-apps-script" />
import { ClassGS } from "./ClassGS";
/**
 * Class to store the Google Classroom object
 */
export declare class ClassroomGS {
    private _classList;
    constructor();
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {Array<GoogleAppsScript.Classroom.Schema.Course>} the list of Course objects
     */
    getObject(): Array<GoogleAppsScript.Classroom.Schema.Course>;
    /**
     * Get the ClassGS object from the enrollment code that students use to join the class
     *
     * @param enrollmentCode the enrollment code that students use to join the class
     *
     * @returns {ClassGS} the Class object
     */
    getClass(enrollmentCode: string): ClassGS;
}
