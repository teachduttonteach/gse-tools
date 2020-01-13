import { addCourseMaterials } from './CourseMaterial';
import { CourseWorkState, CourseWorkType, AssigneeMode } from './Enums';
/**
 *
 * @param {string} title title of the assignment
 * @param {string} topicId topic associated with the assignment
 * @param {string} description optional description for the assignment
 * @param {number} maxPoints maximum points available, if 0 or blank is
 *  ungraded
 * @return {CourseWorkGS} the object for chaining
 */
export function newCourseWork(title, topicId, description = '', maxPoints = 100) {
    return new CourseWorkGS(title, topicId, description, maxPoints);
}
/**
 * Add materials to the assignment
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {Array<CourseMaterial>} materials materials to add to the
 *  assignment
 * @return {CourseWorkGS} the object for chaining
 */
export function addCourseWorkMaterials(obj, materials) {
    return obj.addMaterials(materials);
}
/**
 * Set the due date and time
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {Date} dueDate the date this assignment is due
 * @param {number} dueHour the hour this assignment is due
 * @param {number} dueMinute the minute this assignment is due
 * @return {CourseWorkGS} the object for chaining
 */
export function setCourseWorkDueDateAndTime(obj, dueDate, dueHour, dueMinute) {
    return obj.setDueDateAndTime(dueDate, dueHour, dueMinute);
}
/**
 * Schedule the assignment
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {Date} time the date and time to schedule it for
 * @return {CourseWorkGS} the object for chaining
 */
export function scheduleCourseWork(obj, time) {
    return obj.schedule(time);
}
/**
 * Creates the assignment as a short answer question or multiple choice
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {CourseWorkType} type the type of course work (not an assignment)
 * @param {Array<string>} choices choices for a multiple choice question
 * @return {CourseWorkGS} the object for chaining
 */
export function changeCourseWorkType(obj, type, choices) {
    return obj.changeType(type, choices);
}
/**
 * Assign course work to a list of students instead of the entire class
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {Array<string>} studentIds list of student IDs to assign this
 *  work to
 * @return {CourseWorkGS} the object for chaining
 */
export function assignCourseWork(obj, studentIds) {
    return obj.assign(studentIds);
}
/**
 * Get the underyling resource for adding to Classroom
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @return {CourseWorkResource} the resource to add
 */
export function getCourseWorkResource(obj) {
    return obj.getResource();
}
/**
 * Class for modifying the assignment before it's added to Classroom
 */
export class CourseWorkGS {
    /**
     *
     * @param {string} title title of the assignment
     * @param {string} topicId topic associated with the assignment
     * @param {string} description optional description for the assignment
     * @param {number} maxPoints maximum points available, if 0 or blank is
     *  ungraded
     */
    constructor(title, topicId, description = '', maxPoints = 100) {
        this._courseWorkResource = {};
        this._courseWorkResource.title = title;
        this._courseWorkResource.description = description;
        this._courseWorkResource.state = CourseWorkState.PUBLISHED;
        this._courseWorkResource.maxPoints = maxPoints;
        this._courseWorkResource.workType = CourseWorkType.ASSIGNMENT;
        this._courseWorkResource.topicId = topicId;
        this._courseWorkResource.assigneeMode = AssigneeMode.ALL_STUDENTS;
    }
    /**
     * Add materials to the assignment
     *
     * @param {Array<CourseMaterial>} materials materials to add to the
     *  assignment
     * @return {CourseWorkGS} the object for chaining
     */
    addMaterials(materials) {
        this._courseWorkResource.materials = addCourseMaterials(materials);
        return this;
    }
    /**
     * Set the due date and time
     *
     * @param {Date} dueDate the date this assignment is due
     * @param {number} dueHour the hour this assignment is due
     * @param {number} dueMinute the minute this assignment is due
     * @return {CourseWorkGS} the object for chaining
     */
    setDueDateAndTime(dueDate, dueHour, dueMinute) {
        this._courseWorkResource.dueTime = {
            hours: dueHour,
            minutes: dueMinute,
            seconds: 0,
            nanos: 0,
        };
        this._courseWorkResource.dueDate = {
            day: dueDate.getDate(),
            month: dueDate.getMonth() + 1,
            year: dueDate.getFullYear(),
        };
        return this;
    }
    /**
     * Schedule the assignment
     *
     * @param {Date} time the date and time to schedule it for
     * @return {CourseWorkGS} the object for chaining
     */
    schedule(time) {
        this._courseWorkResource.state = CourseWorkState.DRAFT;
        this._courseWorkResource.scheduledTime = time.toISOString();
        return this;
    }
    /**
     * Creates the assignment as a short answer question or multiple choice
     *
     * @param {CourseWorkType} type the type of course work (not an assignment)
     * @param {Array<string>} choices choices for a multiple choice question
     * @return {CourseWorkGS} the object for chaining
     */
    changeType(type, choices) {
        this._courseWorkResource.workType = type;
        if (type == CourseWorkType.MULTIPLE_CHOICE_QUESTION) {
            this._courseWorkResource.multipleChoiceQuestion.choices = choices;
        }
        return this;
    }
    /**
     * Assign course work to a list of students instead of the entire class
     *
     * @param {Array<string>} studentIds list of student IDs to assign this
     *  work to
     * @return {CourseWorkGS} the object for chaining
     */
    assign(studentIds) {
        this._courseWorkResource.assigneeMode = AssigneeMode.INDIVIDUAL_STUDENTS;
        this._courseWorkResource.individualStudentsOptions.studentIds =
            studentIds;
        return this;
    }
    /**
     * Get the underyling resource for adding to Classroom
     *
     * @return {CourseWorkResource} the resource to add
     */
    getResource() {
        return this._courseWorkResource;
    }
}
