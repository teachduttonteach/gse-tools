import { CourseWork } from './CourseWork';
import { Work } from './Work';
/**
 * Class for all of the particular course information
  * Resets the announcements and topics.
  */
export declare function newClassInfo(): ClassInfo;
/**
 * Get the topic ids
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @return {Array<string>} the topic ids
 */
export declare function getClassInfoTopics(obj: ClassInfo): Array<string>;
/**
 * Gets the name of a topic
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @param {string} topicId the topic id
 *
 * @return {string} the name of the topic
 */
export declare function getClassInfoName(obj: ClassInfo, topicId: string): string;
/**
 * Adds a topic to the course
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @param {string} topicId the topic id
 * @param {CourseWork} courseWork the coursework object associated with
 *  the topic
 *
 * @return {ClassInfo} the object for chaining
 */
export declare function addClassInfoTopic(obj: ClassInfo, topicId: string, courseWork: CourseWork): ClassInfo;
/**
 * Adds an announcement to the coursework
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @param {string} announcement the text of the announcement
 *
 * @return {ClassInfo} the object for chaining
 */
export declare function addClassInfoAnnouncement(obj: ClassInfo, announcement: string): ClassInfo;
/**
 * Gets the list of announcements for the coursework
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @return {Array<string>} the list of announcements
 */
export declare function getClassInfoAnnouncements(obj: ClassInfo): Array<string>;
/**
 * Adds course work to the object
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @param {string} topicId the topic id
 * @param {Work} courseWork the work associated with this topic
 *
 * @return {ClassInfo} the object for chaining
 */
export declare function addClassInfoCourseWork(obj: ClassInfo, topicId: string, courseWork: Work): ClassInfo;
/**
 * Gets the course work associated with the specified topic
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @param {string} topicId the topic id
 *
 * @return {CouseWork} the object for chaining
 */
export declare function getClassInfoCourseWork(obj: ClassInfo, topicId: string): CourseWork;
/**
 * Class for all of the particular course information
 */
export declare class ClassInfo {
    private _topics;
    private _announcements;
    /**
     * Resets the announcements and topics.
     */
    constructor();
    /**
     * Get the topic ids
     *
     * @return {Array<string>} the topic ids
     */
    getTopics(): Array<string>;
    /**
     * Gets the name of a topic
     *
     * @param {string} topicId the topic id
     *
     * @return {string} the name of the topic
     */
    getName(topicId: string): string;
    /**
     * Adds a topic to the course
     *
     * @param {ClassInfo} topicId the topic id
     * @param {CourseWork} courseWork the coursework object associated with
     *  the topic
     *
     * @return {ClassInfo} the object for chaining
     */
    addTopic(topicId: string, courseWork: CourseWork): ClassInfo;
    /**
     * Adds an announcement to the coursework
     *
     * @param {string} announcement the text of the announcement
     *
     * @return {ClassInfo} the object for chaining
     */
    addAnnouncement(announcement: string): ClassInfo;
    /**
     * Gets the list of announcements for the coursework
     *
     * @return {Array<string>} the list of announcements
     */
    getAnnouncements(): Array<string>;
    /**
     * Adds course work to the object
     *
     * @param {ClassInfo} topicId the topic id
     * @param {Work} courseWork the work associated with this topic
     *
     * @return {ClassInfo} the object for chaining
     */
    addCourseWork(topicId: string, courseWork: Work): ClassInfo;
    /**
     * Gets the course work associated with the specified topic
     *
     * @param {string} topicId the topic id
     *
     * @return {CouseWork} the object for chaining
     */
    getCourseWork(topicId: string): CourseWork;
}
