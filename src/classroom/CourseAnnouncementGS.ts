import {AnnouncementResource} from './AnnouncementResource';
import {CourseMaterial, addCourseMaterials} from './CourseMaterial';
import {AssigneeMode, AnnouncementState} from './Enums';

/**
 * Create a new announcement for the course
 *
 * @param {string} text the text of the announcement
 * @return {CourseAnnouncementGS} the CourseAnnouncement object
 */
export function newCourseAnnouncement(text: string): CourseAnnouncementGS {
  return new CourseAnnouncementGS(text);
}

/**
 * Add materials to the announcement
 *
 * @param {CourseAnnouncementGS} obj the CourseAnnouncement object
 * @param {Array<CourseMaterial>} materials the materials to add to the
 *  announcement
 * @return {CourseAnnouncementGS} the object for chaining
 */
export function addCourseAnnouncementMaterials(
    obj: CourseAnnouncementGS, materials: Array<CourseMaterial>):
  CourseAnnouncementGS {
  return obj.addMaterials(materials);
}

/**
 * Schedule an announcement for a particular time
 *
 * @param {CourseAnnouncementGS} obj the CourseAnnouncement object
 * @param {Date} time the scheduled time to post the announcement
 * @return {CourseAnnouncementGS} the object for chaining
 */
export function scheduleCourseAnnouncement(obj: CourseAnnouncementGS,
    time: Date): CourseAnnouncementGS {
  return obj.schedule(time);
}

/**
 * Assign an announcement to a selection of students instead of the entire
 *  class
 *
 * @param {CourseAnnouncementGS} obj the CourseAnnouncement object
 * @param {Array<string>} studentIds the list of students IDs to assign
 *  this announcement
 * @return {CourseAnnouncementGS} the object for chaining
 */
export function assignCourseAnnouncement(obj: CourseAnnouncementGS,
    studentIds: Array<string>): CourseAnnouncementGS {
  return obj.assign(studentIds);
}

/**
 * Get the underlying resource to pass to Classroom
 *
 * @param {CourseAnnouncementGS} obj the CourseAnnouncement object
 * @return {AnnouncementResource} the underlying resource object
 */
export function getCourseAnnouncementResource(obj: CourseAnnouncementGS):
  AnnouncementResource {
  return obj.getResource();
}

/**
 * Methods to modify and create an announcement on a class
 */
export class CourseAnnouncementGS {
  private _announcementResource: AnnouncementResource;

  /**
   *
   * @param {string} text the text of the announcement
   */
  constructor(text: string) {
    this._announcementResource = {} as AnnouncementResource;
    this._announcementResource.text = text;
    this._announcementResource.materials = [];
    this._announcementResource.state = AnnouncementState.PUBLISHED;
  }

  /**
   * Add materials to the announcement
   *
   * @param {Array<CourseMaterial>} materials the materials to add to the
   *  announcement
   * @return {CourseAnnouncementGS} the object for chaining
   */
  addMaterials(materials: Array<CourseMaterial>): CourseAnnouncementGS {
    this._announcementResource.materials = addCourseMaterials(materials);
    return this;
  }

  /**
   * Schedule an announcement for a particular time
   *
   * @param {Date} time the scheduled time to post the announcement
   * @return {CourseAnnouncementGS} the object for chaining
   */
  schedule(time: Date): CourseAnnouncementGS {
    this._announcementResource.state = AnnouncementState.DRAFT;
    this._announcementResource.scheduledTime = time.toISOString();
    return this;
  }

  /**
   * Assign an announcement to a selection of students instead of the entire
   *  class
   *
   * @param {Array<string>} studentIds the list of students IDs to assign
   *  this announcement
   * @return {CourseAnnouncementGS} the object for chaining
   */
  assign(studentIds: Array<string>): CourseAnnouncementGS {
    this._announcementResource.assigneeMode =
      AssigneeMode.INDIVIDUAL_STUDENTS;
    this._announcementResource.individualStudentsOptions = 
      {} as GoogleAppsScript.Classroom.Schema.IndividualStudentsOptions;
    this._announcementResource.individualStudentsOptions.studentIds =
      studentIds;
    return this;
  }

  /**
   * Get the underlying resource to pass to Classroom
   *
   * @return {AnnouncementResource} the underlying resource object
   */
  getResource(): AnnouncementResource {
    return this._announcementResource;
  }
}
