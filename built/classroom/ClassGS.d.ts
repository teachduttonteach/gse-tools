/// <reference types="google-apps-script" />
import { DateParams } from '../DateParams';
import { TopicInfo } from './TopicInfo';
import { CourseWorkGS } from './CourseWorkGS';
import { CourseAnnouncementGS } from './CourseAnnouncementGS';
/**
 * Class to access a single course in Google Classroom
 * @param {GoogleAppsScript.Classroom.Schema.Course} course the
 *  Google course object
 * @return {ClassGS} the object for chaining
 */
export declare function newClass(course: GoogleAppsScript.Classroom.Schema.Course): ClassGS;
/**
 * Get the list of students associated with the class
 * ```javascript
 * var myClassroom = new gsetools.newClassroom();
 * var myClass = gsetools.getGoogleClass(myClassroom, 'izg4qrh');
 * var myStudents = gsetools.getStudents(myClass);
 *
 * // Get the list of student IDs as an array
 * var studentIDs = myStudents.keys();
 *
 * // Get the list of student names as an array
 * var studentNames = myStudents.values();
 *
 * // Get student names for their IDs
 * while (myStudents.hasNext()) {
 *  var studentID = myStudents.next();
 *  var studentName = myStudents.get(studentID);
 * }
 * ```
 *
 * @param {ClassGS} obj the Class object
 * @return {Map<string, string>} a map of the student ID to the full name
 */
export declare function getStudents(obj: ClassGS): Map<string, string>;
/**
 * Get the list of student names associated with the class
 * ```javascript
 * var myClassroom = new gsetools.newClassroom();
 * var myClass = gsetools.getGoogleClass(myClassroom, 'izg4qrh');
 * var studentNames = gsetools.getStudentNames(myClass);
 * ```
 *
 * @param {ClassGS} obj the Class object
 * @return {Array<string>} a list of the student names
 */
export declare function getStudentNames(obj: ClassGS): Array<string>;
/**
 * Get the list of student IDs associated with the class
 * ```javascript
 * var myClassroom = new gsetools.newClassroom();
 * var myClass = gsetools.getGoogleClass(myClassroom, 'izg4qrh');
 * var studentIDs = gsetools.getStudentIDs(myClass);
 * ```
 *
 * @param {ClassGS} obj the Class object
 * @return {Array<string>} a list of the student IDs
 */
export declare function getStudentIDs(obj: ClassGS): Array<string>;
/**
 * Get the list of student IDs associated with the class
 * ```javascript
 * var myClassroom = new gsetools.newClassroom();
 * var myClass = gsetools.getGoogleClass(myClassroom, 'izg4qrh');
 * var studentIDs = gsetools.getStudentIDs(myClass);
 * ```
 * @param {ClassGS} obj the Class object
 * @param {string} id the student ID
 * @return {string | null} the student name, or null if not found
 */
export declare function getStudentName(obj: ClassGS, id: string): string | null;
/**
 * Get a list of the parent e-mails for the class (or for an individual
 * student)
 * ```javascript
 * var myClassroom = new gsetools.newClassroom();
 * var myClass = gsetools.getGoogleClass(myClassroom, 'izg4qrh');
 * var parentEmails = gsetools.getParentEmails(myClass);
 * ```
 * @param {ClassGS} obj the Class object
 * @param {string} studentID the optional student ID
 * @return {Array<string>} the list of parent emails
 */
export declare function getParentEmails(obj: ClassGS, studentID?: string): Array<string>;
/**
 * Get a list of the parent names for the class (or for an individual
 * student)
 * ```javascript
 * var myClassroom = new gsetools.newClassroom();
 * var myClass = gsetools.getGoogleClass(myClassroom, 'izg4qrh');
 * var parentNames = gsetools.getParentNames(myClass);
 * ```
 * @param {ClassGS} obj the Class object
 * @param {string} studentID the optional student ID
 * @return {Array<string>} the list of parent emails
 */
export declare function getParentNames(obj: ClassGS, studentID?: string): Array<string>;
/**
 * Adds course work to the object
 *
 * @param {ClassGS} obj the Class object
 * @param {CourseWorkGS} work the work associated with this topic
 *
 * @return {ClassGS} the object for chaining
 */
export declare function addCourseWork(obj: ClassGS, work: CourseWorkGS): ClassGS;
/**
 * Adds a topic to the course
 *
 * @param {ClassGS} obj the Class object
 * @param {string} topic the topic name
 *
 * @return {ClassGS} the object for chaining
 */
export declare function addClassTopic(obj: ClassGS, topic: string): ClassGS;
/**
 * Adds an announcement to the coursework
 *
 * @param {ClassGS} obj the Class object
 * @param {CourseAnnouncementGS} announcement the announcement object
 *
 * @return {ClassGS} the object for chaining
 */
export declare function addClassAnnouncement(obj: ClassGS, announcement: CourseAnnouncementGS): ClassGS;
/**
 * Get the topic ids
 *
 * @param {ClassGS} obj the Class object
 * @return {Array<string>} the topic ids
 */
export declare function getClassTopics(obj: ClassGS): Array<string>;
/**
 * Gets the name of a topic
 *
 * @param {ClassGS} obj the Class object
 * @param {string} topicId the topic id
 *
 * @return {string} the name of the topic
 */
export declare function getClassTopicName(obj: ClassGS, topicId: string): string;
/**
 * Gets the list of announcements for the coursework
 *
 * @param {ClassGS} obj the Class object
 * @return {Array<string>} the list of announcements
 */
export declare function getClassAnnouncements(obj: ClassGS): Array<string>;
/**
 * Gets the course work associated with the specified topic
 *
 * @param {ClassGS} obj the Class object
 * @param {string} topicId the topic id
 *
 * @return {CouseWork} the object for chaining
 */
export declare function getClassTopicInfo(obj: ClassGS, topicId: string): TopicInfo;
/**
 * Get the name of the course
 *
 * @param {ClassGS} obj the Class object
 * @return {string} the name of the course
 */
export declare function getClassName(obj: ClassGS): string;
/**
 * Gets the id of the calendar associated with the course
 * ```
 * var enrollmentCode = '1234qz';
 *
 * var gseClassroom = gsetools.newClassroom();
 * var gseClass = gsetools.getGoogleClass(gseClassroom, enrollmentCode);
 * var calendarId = gsetools.getClassCalendarId(gseClass);
 * ```
 *
 * @param {ClassGS} obj the Class object
 * @return {string} the calendar id
 */
export declare function getClassCalendarId(obj: ClassGS): string;
/**
 * Class to access a single course in Google Classroom
 */
export declare class ClassGS {
    private _course;
    private _topics;
    private _announcements;
    private _id;
    /**
     * Gets the due date string
     *
     * @param {GoogleAppsScript.Classroom.Schema.Date} workDueDate the Google
     *  Date object holding the due date
     * @param {DateParams} args the class data arguments for determining
     *  the date string
     *
     * @return {string} the due date string
     */
    private _getDueDate;
    /**
     *
     * @param {GoogleAppsScript.Classroom.Schema.Course} course the
     *  Google course object
     * @param {DateParams} args the optional parameters for creating the
     *  classroom data object
     */
    constructor(course: GoogleAppsScript.Classroom.Schema.Course, args?: DateParams);
    /**
     * Add course materials to a Work object
     *
     * @param {Array<GoogleAppsScript.Classroom.Schema.Material>} materials list
     *  of materials for the course
     * @param {Work} objWork the work object to put the materials into
     * @return {Work} the object for chaining
     */
    private _addCourseMaterials;
    /**
     * Get the topic ids
     *
     * @return {Array<string>} the topic ids
     */
    getTopics(): Array<string>;
    /**
     * Get the topic names
     *
     * @return {Array<string>} the topic names
     */
    getTopicNames(): Array<string>;
    /**
     * Gets the name of a topic
     *
     * @param {string} topicId the topic id
     *
     * @return {string} the name of the topic
     */
    getTopicName(topicId: string): string;
    /**
     * Gets the list of announcements for the coursework
     *
     * @return {Array<string>} the list of announcements
     */
    getAnnouncements(): Array<string>;
    /**
     * Gets the course work associated with the specified topic
     *
     * @param {string} topicId the topic id
     *
     * @return {CouseWork} the object for chaining
     */
    getTopicInfo(topicId: string): TopicInfo;
    /**
     * Get the name of the course
     *
     * @return {string} the name of the course
     */
    getName(): string;
    /**
     * Gets the id of the calendar associated with the course
     *
     * @return {string} the calendar id
     */
    getCalendarId(): string;
    /**
     * Gets the current material associated with the task
     *
     * @param {GoogleAppsScript.Classroom.Schema.Material} thisMaterial the
     *  material associated with the current task as a Google object
     *
     * @return {CourseMaterial} the material associated with the current task
     *  in a Material object
     */
    private _getMaterials;
    /**
     * Get the list of students associated with the class
     * ```javascript
     * var myClassroom = new gsetools.ClassroomGS();
     * var myClass = myClassroom.getClass('izg4qrh');
     * var myStudents = myClass.getStudents();
     *
     * // Get the list of student IDs as an array
     * var studentIDs = myStudents.keys();
     *
     * // Get the list of student names as an array
     * var studentNames = myStudents.values();
     *
     * // Get student names for their IDs
     * while (myStudents.hasNext()) {
     *  var studentID = myStudents.next();
     *  var studentName = myStudents.get(studentID);
     * }
     * ```
     *
     * @return {Map<string, string>} a map of the student ID to the full name
     */
    getStudents(): Map<string, string>;
    /**
     * Get the student profiles from Classroom for the current class
     * @return {GoogleAppsScript.Classroom.Schema.Student[]} the list of students
     *  which can be empty if there are no students found
     */
    private _getStudentProfiles;
    /**
     * Get the list of student names associated with the class
     * ```javascript
     * var myClassroom = new gsetools.ClassroomGS();
     * var myClass = myClassroom.getClass('izg4qrh');
     * var studentNames = myClass.getStudentNames();
     * ```
     *
     * @return {Array<string>} a list of the student names
     */
    getStudentNames(): Array<string>;
    /**
     * Get the list of student IDs associated with the class
     * ```javascript
     * var myClassroom = new gsetools.ClassroomGS();
     * var myClass = myClassroom.getClass('izg4qrh');
     * var studentIDs = myClass.getStudentIDs();
     * ```
     *
     * @return {Array<string>} a list of the student IDs
     */
    getStudentIDs(): Array<string>;
    /**
     * Get the list of student IDs associated with the class
     * ```javascript
     * var myClassroom = new gsetools.ClassroomGS();
     * var myClass = myClassroom.getClass('izg4qrh');
     * var studentIDs = myClass.getStudentIDs();
     * ```
     * @param {string} id the student ID
     * @return {string | null} the student name, or null if not found
     */
    getStudentName(id: string): string | null;
    /**
     * Get a list of the parent e-mails for the class (or for an individual
     * student)
     * ```javascript
     * var myClassroom = new gsetools.ClassroomGS();
     * var myClass = myClassroom.getClass('izg4qrh');
     * var parentEmails = myClass.getParentEmails();
     * ```
     * @param {string} studentID the optional student ID
     * @return {Array<string>} the list of parent emails
     */
    getParentEmails(studentID?: string): Array<string>;
    /**
     * Get a list of the parent names for the class (or for an individual
     * student)
     * ```javascript
     * var myClassroom = new gsetools.ClassroomGS();
     * var myClass = myClassroom.getClass('izg4qrh');
     * var parentNames = myClass.getParentNames();
     * ```
     * @param {string} studentID the optional student ID
     * @return {Array<string>} the list of parent emails
     */
    getParentNames(studentID?: string): Array<string>;
    /**
     * Get the list of parents associated with the class (or a particular
     *  student)
     * @param {string} studentID the optional studentID to get parents for
     * @return {Map<string, GoogleAppsScript.Classroom.Schema.Guardian[]>} a
     * list of the parent profiles
     */
    private _getParentProfiles;
    /**
     * Adds course work to the object
     *
     * @param {CourseWorkGS} work the work associated with this topic
     *
     * @return {ClassGS} the object for chaining
     */
    addCourseWork(work: CourseWorkGS): ClassGS;
    /**
     * Adds a topic to the course
     *
     * @param {string} topic the topic name
     *
     * @return {ClassGS} the object for chaining
     */
    addTopic(topic: string): ClassGS;
    /**
     * Adds an announcement to the coursework
     *
     * @param {string} announcement the text of the announcement
     * @param {Array<CourseMaterial>} materials the
     *  materials associated with the announcement
     *
     * @return {ClassGS} the object for chaining
     */
    addAnnouncement(announcement: CourseAnnouncementGS): ClassGS;
}
