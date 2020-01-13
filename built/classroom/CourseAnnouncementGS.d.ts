import { AnnouncementResource } from './AnnouncementResource';
import { CourseMaterial } from './CourseMaterial';
/**
 * Create a new announcement for the course
 *
 * @param {string} text the text of the announcement
 * @return {CourseAnnouncementGS} the CourseAnnouncement object
 */
export declare function newCourseAnnouncement(text: string): CourseAnnouncementGS;
/**
 * Add materials to the announcement
 *
 * @param {CourseAnnouncementGS} obj the CourseAnnouncement object
 * @param {Array<CourseMaterial>} materials the materials to add to the
 *  announcement
 * @return {CourseAnnouncementGS} the object for chaining
 */
export declare function addCourseAnnouncementMaterials(obj: CourseAnnouncementGS, materials: Array<CourseMaterial>): CourseAnnouncementGS;
/**
 * Schedule an announcement for a particular time
 *
 * @param {CourseAnnouncementGS} obj the CourseAnnouncement object
 * @param {Date} time the scheduled time to post the announcement
 * @return {CourseAnnouncementGS} the object for chaining
 */
export declare function scheduleCourseAnnouncement(obj: CourseAnnouncementGS, time: Date): CourseAnnouncementGS;
/**
 * Assign an announcement to a selection of students instead of the entire
 *  class
 *
 * @param {CourseAnnouncementGS} obj the CourseAnnouncement object
 * @param {Array<string>} studentIds the list of students IDs to assign
 *  this announcement
 * @return {CourseAnnouncementGS} the object for chaining
 */
export declare function assignCourseAnnouncement(obj: CourseAnnouncementGS, studentIds: Array<string>): CourseAnnouncementGS;
/**
 * Get the underlying resource to pass to Classroom
 *
 * @param {CourseAnnouncementGS} obj the CourseAnnouncement object
 * @return {AnnouncementResource} the underlying resource object
 */
export declare function getCourseAnnouncementResource(obj: CourseAnnouncementGS): AnnouncementResource;
/**
 * Methods to modify and create an announcement on a class
 */
export declare class CourseAnnouncementGS {
    private _announcementResource;
    /**
     *
     * @param {string} text the text of the announcement
     */
    constructor(text: string);
    /**
     * Add materials to the announcement
     *
     * @param {Array<CourseMaterial>} materials the materials to add to the
     *  announcement
     * @return {CourseAnnouncementGS} the object for chaining
     */
    addMaterials(materials: Array<CourseMaterial>): CourseAnnouncementGS;
    /**
     * Schedule an announcement for a particular time
     *
     * @param {Date} time the scheduled time to post the announcement
     * @return {CourseAnnouncementGS} the object for chaining
     */
    schedule(time: Date): CourseAnnouncementGS;
    /**
     * Assign an announcement to a selection of students instead of the entire
     *  class
     *
     * @param {Array<string>} studentIds the list of students IDs to assign
     *  this announcement
     * @return {CourseAnnouncementGS} the object for chaining
     */
    assign(studentIds: Array<string>): CourseAnnouncementGS;
    /**
     * Get the underlying resource to pass to Classroom
     *
     * @return {AnnouncementResource} the underlying resource object
     */
    getResource(): AnnouncementResource;
}
