import { ClassGS } from 'ClassGS';

/**
 * Class to store the Google Classroom object
 * Get the courses and coursework
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
export function getClassroomObject(obj: ClassroomGS): Array<GoogleAppsScript.Classroom.Schema.Course> {
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
export function getClassroomClass(obj: ClassroomGS, enrollmentCode: string): ClassGS {
  return obj.getClass(enrollmentCode);
}

/**
 * Class to store the Google Classroom object
 */
export class ClassroomGS {
  private _classList: Array<GoogleAppsScript.Classroom.Schema.Course>;

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
  getObject(): Array<GoogleAppsScript.Classroom.Schema.Course> {
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
  getClass(enrollmentCode: string): ClassGS {
    for (const c of this._classList) {
      if (c.enrollmentCode == enrollmentCode) return new ClassGS(c);
    }
    throw new Error('Could not find class with code ' + enrollmentCode + ' in ClassroomGS()');
  }
}
