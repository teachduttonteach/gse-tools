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
export function newClassroom() {
    return new ClassroomGS();
}
/**
 * Gets the underlying Google Apps Script object for direct access
 *
 * @param {ClassroomGS} obj the Classroom object
 * @return {Array<GoogleAppsScript.Classroom.Schema.Course>} the list of
 *  Course objects
 */
export function getClassroomObject(obj) {
    return obj.getObject();
}
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
export function getGoogleClass(obj, enrollmentCode) {
    return obj.getClass(enrollmentCode);
}
/**
 * Class to store the Google Classroom object
 */
export class ClassroomGS {
    /**
     * Get the courses and coursework
     */
    constructor() {
        const classroomCourses = Classroom.Courses;
        if (classroomCourses == undefined) {
            throw new Error('Could not find courses in ClassGS');
        }
        const allCourses = classroomCourses.list().courses;
        if (allCourses == undefined) {
            throw new Error('No course work found in ClassGS');
        }
        this._classList = allCourses;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @return {Array<GoogleAppsScript.Classroom.Schema.Course>} the list of
     *  Course objects
     */
    getObject() {
        return this._classList;
    }
    /**
     * Get the ClassGS object from the enrollment code that students use to
     *  join the class
     *
     * @param {string} enrollmentCode the enrollment code that students use to
     *  join the class
     *
     * @return {ClassGS} the Class object
     */
    getClass(enrollmentCode) {
        for (const c of this._classList) {
            if (c.enrollmentCode == enrollmentCode)
                return new ClassGS(c);
        }
        throw new Error('Could not find class with code ' + enrollmentCode +
            ' in ClassroomGS()');
    }
}
