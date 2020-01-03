import {CourseWork} from './CourseWork'
import {Work} from './Work'
import {MapGS} from '../map/MapGS'

/**
 * Class for all of the particular course information
 */
export class ClassInfo {
    private _topics: MapGS<string, CourseWork>;
    private _announcements: Array<string>;
  
    constructor() {
      this._announcements = [];
      this._topics = new MapGS();
    }
  
    /**
     * Get the topic ids
     * 
     * @returns {Array<string>} the topic ids
     */
    getTopics(): Array<string> {
      return this._topics.keys();
    }
  
    /**
     * Gets the name of a topic
     * 
     * @param topicId the topic id
     * 
     * @returns {string} the name of the topic
     */
    getName(topicId: string): string {
      let t_topic = this._topics.get(topicId);
      if (t_topic == undefined) throw new Error("Topic " + topicId + " not defined in ClassInfo.getName()");
      return t_topic.name;
    }
  
    /**
     * Adds a topic to the course
     * 
     * @param topicId the topic id
     * @param {CourseWork} courseWork the coursework object associated with the topic
     * 
     * @returns {ClassInfo} the object for chaining
     */
    addTopic(topicId: string, courseWork: CourseWork): ClassInfo {
      this._topics.set(topicId, courseWork);
      return this;
    }
  
    /**
     * Adds an announcement to the coursework
     * 
     * @param announcement the text of the announcement
     * 
     * @returns {ClassInfo} the object for chaining 
     */
    addAnnouncement(announcement: string): ClassInfo {
      this._announcements.push(announcement);
      return this;
    } 
  
    /**
     * Gets the list of announcements for the coursework
     * 
     * @returns {Array<string>} the list of announcements
     */
    getAnnouncements(): Array<string> {
      return this._announcements;
    }
  
    /**
     * Adds course work to the object
     * 
     * @param topicId the topic id
     * @param {Work} courseWork the work associated with this topic
     * 
     * @returns {ClassInfo} the object for chaining
     */
    addCourseWork(topicId: string, courseWork: Work): ClassInfo {
      let currentTopic = this._topics.get(topicId);
      if (currentTopic == null) throw new Error("Topic for " + topicId + " not found in Topic.get()");
      currentTopic.work.push(courseWork);
      return this;
    }
  
    /**
     * Gets the course work associated with the specified topic
     * 
     * @param topicId the topic id
     * 
     * @returns {CouseWork} the object for chaining
     */
    getCourseWork(topicId: string): CourseWork {
      if (topicId == undefined) throw new Error("Topic name " + topicId + " undefined in Topic.getCourseWork()");
      let t_courseWork = this._topics.get(topicId);
  
      if (t_courseWork == undefined) throw new Error("Could not find course work in " + topicId + " in Topic.getCourseWork()");
      return t_courseWork;
    }
  }
  
  