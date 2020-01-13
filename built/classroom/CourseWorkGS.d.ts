import { CourseWorkResource } from './CourseWorkResource';
import { CourseMaterial } from './CourseMaterial';
import { CourseWorkType } from './Enums';
/**
 *
 * @param {string} title title of the assignment
 * @param {string} topicId topic associated with the assignment
 * @param {string} description optional description for the assignment
 * @param {number} maxPoints maximum points available, if 0 or blank is
 *  ungraded
 * @return {CourseWorkGS} the object for chaining
 */
export declare function newCourseWork(title: string, topicId: string, description?: string, maxPoints?: number): CourseWorkGS;
/**
 * Add materials to the assignment
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {Array<CourseMaterial>} materials materials to add to the
 *  assignment
 * @return {CourseWorkGS} the object for chaining
 */
export declare function addCourseWorkMaterials(obj: CourseWorkGS, materials: Array<CourseMaterial>): CourseWorkGS;
/**
 * Set the due date and time
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {Date} dueDate the date this assignment is due
 * @param {number} dueHour the hour this assignment is due
 * @param {number} dueMinute the minute this assignment is due
 * @return {CourseWorkGS} the object for chaining
 */
export declare function setCourseWorkDueDateAndTime(obj: CourseWorkGS, dueDate: Date, dueHour: number, dueMinute: number): CourseWorkGS;
/**
 * Schedule the assignment
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {Date} time the date and time to schedule it for
 * @return {CourseWorkGS} the object for chaining
 */
export declare function scheduleCourseWork(obj: CourseWorkGS, time: Date): CourseWorkGS;
/**
 * Creates the assignment as a short answer question or multiple choice
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {CourseWorkType} type the type of course work (not an assignment)
 * @param {Array<string>} choices choices for a multiple choice question
 * @return {CourseWorkGS} the object for chaining
 */
export declare function changeCourseWorkType(obj: CourseWorkGS, type: CourseWorkType, choices?: Array<string>): CourseWorkGS;
/**
 * Assign course work to a list of students instead of the entire class
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {Array<string>} studentIds list of student IDs to assign this
 *  work to
 * @return {CourseWorkGS} the object for chaining
 */
export declare function assignCourseWork(obj: CourseWorkGS, studentIds: Array<string>): CourseWorkGS;
/**
 * Get the underyling resource for adding to Classroom
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @return {CourseWorkResource} the resource to add
 */
export declare function getCourseWorkResource(obj: CourseWorkGS): CourseWorkResource;
/**
 * Class for modifying the assignment before it's added to Classroom
 */
export declare class CourseWorkGS {
    private _courseWorkResource;
    /**
     *
     * @param {string} title title of the assignment
     * @param {string} topicId topic associated with the assignment
     * @param {string} description optional description for the assignment
     * @param {number} maxPoints maximum points available, if 0 or blank is
     *  ungraded
     */
    constructor(title: string, topicId: string, description?: string, maxPoints?: number);
    /**
     * Add materials to the assignment
     *
     * @param {Array<CourseMaterial>} materials materials to add to the
     *  assignment
     * @return {CourseWorkGS} the object for chaining
     */
    addMaterials(materials: Array<CourseMaterial>): CourseWorkGS;
    /**
     * Set the due date and time
     *
     * @param {Date} dueDate the date this assignment is due
     * @param {number} dueHour the hour this assignment is due
     * @param {number} dueMinute the minute this assignment is due
     * @return {CourseWorkGS} the object for chaining
     */
    setDueDateAndTime(dueDate: Date, dueHour: number, dueMinute: number): CourseWorkGS;
    /**
     * Schedule the assignment
     *
     * @param {Date} time the date and time to schedule it for
     * @return {CourseWorkGS} the object for chaining
     */
    schedule(time: Date): CourseWorkGS;
    /**
     * Creates the assignment as a short answer question or multiple choice
     *
     * @param {CourseWorkType} type the type of course work (not an assignment)
     * @param {Array<string>} choices choices for a multiple choice question
     * @return {CourseWorkGS} the object for chaining
     */
    changeType(type: CourseWorkType, choices?: Array<string>): CourseWorkGS;
    /**
     * Assign course work to a list of students instead of the entire class
     *
     * @param {Array<string>} studentIds list of student IDs to assign this
     *  work to
     * @return {CourseWorkGS} the object for chaining
     */
    assign(studentIds: Array<string>): CourseWorkGS;
    /**
     * Get the underyling resource for adding to Classroom
     *
     * @return {CourseWorkResource} the resource to add
     */
    getResource(): CourseWorkResource;
}
