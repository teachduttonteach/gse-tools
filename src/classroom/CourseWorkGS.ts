import {CourseWorkResource} from './CourseWorkResource';
import {CourseMaterial, addCourseMaterials} from './CourseMaterial';
import {CourseWorkState, CourseWorkType, AssigneeMode} from './Enums';

/**
 *
 * @param {string} title title of the assignment
 * @param {string} topicId topic associated with the assignment
 * @param {string} description optional description for the assignment
 * @param {number} maxPoints maximum points available, if 0 or blank is
 *  ungraded
 * @return {CourseWorkGS} the object for chaining
 */
export function newCourseWork(title: string,
    topicId: string, description: string = '', maxPoints: number = 100):
  CourseWorkGS {
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
export function addCourseWorkMaterials(obj: CourseWorkGS,
    materials: Array<CourseMaterial>): CourseWorkGS {
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
export function setCourseWorkDueDateAndTime(obj: CourseWorkGS, dueDate: Date,
    dueHour: number, dueMinute: number): CourseWorkGS {
  return obj.setDueDateAndTime(dueDate, dueHour, dueMinute);
}

/**
 * Schedule the assignment
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @param {Date} time the date and time to schedule it for
 * @return {CourseWorkGS} the object for chaining
 */
export function scheduleCourseWork(obj: CourseWorkGS, time: Date):
  CourseWorkGS {
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
export function changeCourseWorkType(obj: CourseWorkGS, type: CourseWorkType,
    choices?: Array<string>): CourseWorkGS {
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
export function assignCourseWork(obj: CourseWorkGS, studentIds: Array<string>):
  CourseWorkGS {
  return obj.assign(studentIds);
}

/**
 * Get the underyling resource for adding to Classroom
 *
 * @param {CourseWorkGS} obj the CourseWork object
 * @return {CourseWorkResource} the resource to add
 */
export function getCourseWorkResource(obj: CourseWorkGS): CourseWorkResource {
  return obj.getResource();
}

/**
 * Class for modifying the assignment before it's added to Classroom
 */
export class CourseWorkGS {
    private _courseWorkResource: CourseWorkResource;

    /**
     *
     * @param {string} title title of the assignment
     * @param {string} topicId topic associated with the assignment
     * @param {string} description optional description for the assignment
     * @param {number} maxPoints maximum points available, if 0 or blank is
     *  ungraded
     */
    constructor(title: string, topicId: string, description: string = '',
        maxPoints: number = 100) {
      this._courseWorkResource = {} as CourseWorkResource;
      this._courseWorkResource.title = title;
      this._courseWorkResource.description = description;
      this._courseWorkResource.state = CourseWorkState.Published;
      this._courseWorkResource.maxPoints = maxPoints;
      this._courseWorkResource.workType = CourseWorkType.Assignment;
      this._courseWorkResource.topicId = topicId;
      this._courseWorkResource.assigneeMode = AssigneeMode.All;
    }

    /**
     * Add materials to the assignment
     *
     * @param {Array<CourseMaterial>} materials materials to add to the
     *  assignment
     * @return {CourseWorkGS} the object for chaining
     */
    addMaterials(materials: Array<CourseMaterial>): CourseWorkGS {
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
    setDueDateAndTime(dueDate: Date, dueHour: number, dueMinute: number):
      CourseWorkGS {
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
    schedule(time: Date): CourseWorkGS {
      this._courseWorkResource.state = CourseWorkState.Draft;
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
    changeType(type: CourseWorkType, choices?: Array<string>): CourseWorkGS {
      this._courseWorkResource.workType = type;
      if (type == CourseWorkType.MultipleChoice) {
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
    assign(studentIds: Array<string>): CourseWorkGS {
      this._courseWorkResource.assigneeMode = AssigneeMode.IndividualStudents;
      this._courseWorkResource.individualStudentsOptions.studentIds =
        studentIds;
      return this;
    }

    /**
     * Get the underyling resource for adding to Classroom
     *
     * @return {CourseWorkResource} the resource to add
     */
    getResource(): CourseWorkResource {
      return this._courseWorkResource;
    }
}
