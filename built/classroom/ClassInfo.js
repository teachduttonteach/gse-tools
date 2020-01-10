import { MapGS } from '../map/MapGS';
/**
 * Class for all of the particular course information
  * Resets the announcements and topics.
  */
export function newClassInfo() {
    return new ClassInfo();
}
/**
 * Get the topic ids
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @return {Array<string>} the topic ids
 */
export function getClassInfoTopics(obj) {
    return obj.getTopics();
}
/**
 * Gets the name of a topic
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @param {string} topicId the topic id
 *
 * @return {string} the name of the topic
 */
export function getClassInfoName(obj, topicId) {
    return obj.getName(topicId);
}
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
export function addClassInfoTopic(obj, topicId, courseWork) {
    return obj.addTopic(topicId, courseWork);
}
/**
 * Adds an announcement to the coursework
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @param {string} announcement the text of the announcement
 *
 * @return {ClassInfo} the object for chaining
 */
export function addClassInfoAnnouncement(obj, announcement) {
    return obj.addAnnouncement(announcement);
}
/**
 * Gets the list of announcements for the coursework
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @return {Array<string>} the list of announcements
 */
export function getClassInfoAnnouncements(obj) {
    return obj.getAnnouncements();
}
/**
 * Adds course work to the object
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @param {string} topicId the topic id
 * @param {Work} courseWork the work associated with this topic
 *
 * @return {ClassInfo} the object for chaining
 */
export function addClassInfoCourseWork(obj, topicId, courseWork) {
    return obj.addCourseWork(topicId, courseWork);
}
/**
 * Gets the course work associated with the specified topic
 *
 * @param {ClassInfo} obj the ClassInfo object
 * @param {string} topicId the topic id
 *
 * @return {CouseWork} the object for chaining
 */
export function getClassInfoCourseWork(obj, topicId) {
    return obj.getCourseWork(topicId);
}
/**
 * Class for all of the particular course information
 */
export class ClassInfo {
    /**
     * Resets the announcements and topics.
     */
    constructor() {
        this._announcements = [];
        this._topics = new MapGS();
    }
    /**
     * Get the topic ids
     *
     * @return {Array<string>} the topic ids
     */
    getTopics() {
        return this._topics.keys();
    }
    /**
     * Gets the name of a topic
     *
     * @param {string} topicId the topic id
     *
     * @return {string} the name of the topic
     */
    getName(topicId) {
        const thisTopic = this._topics.get(topicId);
        if (thisTopic == undefined) {
            throw new Error('Topic ' + topicId +
                ' not defined in ClassInfo.getName()');
        }
        return thisTopic.name;
    }
    /**
     * Adds a topic to the course
     *
     * @param {ClassInfo} topicId the topic id
     * @param {CourseWork} courseWork the coursework object associated with
     *  the topic
     *
     * @return {ClassInfo} the object for chaining
     */
    addTopic(topicId, courseWork) {
        this._topics.set(topicId, courseWork);
        return this;
    }
    /**
     * Adds an announcement to the coursework
     *
     * @param {string} announcement the text of the announcement
     *
     * @return {ClassInfo} the object for chaining
     */
    addAnnouncement(announcement) {
        this._announcements.push(announcement);
        return this;
    }
    /**
     * Gets the list of announcements for the coursework
     *
     * @return {Array<string>} the list of announcements
     */
    getAnnouncements() {
        return this._announcements;
    }
    /**
     * Adds course work to the object
     *
     * @param {ClassInfo} topicId the topic id
     * @param {Work} courseWork the work associated with this topic
     *
     * @return {ClassInfo} the object for chaining
     */
    addCourseWork(topicId, courseWork) {
        const currentTopic = this._topics.get(topicId);
        if (currentTopic == null) {
            throw new Error('Topic for ' + topicId +
                ' not found in Topic.get()');
        }
        currentTopic.work.push(courseWork);
        return this;
    }
    /**
     * Gets the course work associated with the specified topic
     *
     * @param {string} topicId the topic id
     *
     * @return {CouseWork} the object for chaining
     */
    getCourseWork(topicId) {
        if (topicId == undefined) {
            throw new Error('Topic name ' + topicId +
                ' undefined in Topic.getCourseWork()');
        }
        const thisCourseWork = this._topics.get(topicId);
        if (thisCourseWork == undefined) {
            throw new Error('Could not find course work in ' + topicId +
                ' in Topic.getCourseWork()');
        }
        return thisCourseWork;
    }
}
