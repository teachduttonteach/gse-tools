import { ClassGS } from "./ClassGS";
/**
 * Class to store the Google Classroom object
 */
export class ClassroomGS {
    constructor() {
        let classroomCourses = Classroom.Courses;
        if (classroomCourses == undefined)
            throw new Error("Could not find courses in ClassGS");
        let allCourses = classroomCourses.list().courses;
        if (allCourses == undefined)
            throw new Error("No course work found in ClassGS");
        this._classList = allCourses;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {Array<GoogleAppsScript.Classroom.Schema.Course>} the list of Course objects
     */
    getObject() {
        return this._classList;
    }
    /**
     * Get the ClassGS object from the enrollment code that students use to join the class
     *
     * @param enrollmentCode the enrollment code that students use to join the class
     *
     * @returns {ClassGS} the Class object
     */
    getClass(enrollmentCode) {
        for (let c of this._classList) {
            if (c.enrollmentCode == enrollmentCode)
                return new ClassGS(c);
        }
        throw new Error("Could not find class with code " + enrollmentCode + " in ClassroomGS()");
    }
    ;
}
