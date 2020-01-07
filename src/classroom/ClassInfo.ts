import {CourseWork} from './CourseWork';
import {Work} from './Work';
import {MapGS} from '../map/MapGS';

/**
 * Class for all of the particular course information
 */
export class ClassInfo {
    private _topics: MapGS<string, CourseWork>;
    private _announcements: Array<string>;

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
    getTopics(): Array<string> {
      return this._topics.keys();
    }

    /**
     * Gets the name of a topic
     *
     * @param {string} topicId the topic id
     *
     * @return {string} the name of the topic
     */
    getName(topicId: string): string {
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
    addTopic(topicId: string, courseWork: CourseWork): ClassInfo {
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
    addAnnouncement(announcement: string): ClassInfo {
      this._announcements.push(announcement);
      return this;
    }

    /**
     * Gets the list of announcements for the coursework
     *
     * @return {Array<string>} the list of announcements
     */
    getAnnouncements(): Array<string> {
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
    addCourseWork(topicId: string, courseWork: Work): ClassInfo {
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
    getCourseWork(topicId: string): CourseWork {
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
