/// <reference types="google-apps-script" />
/**
 * Type to hold all of the coursework in an object
 */
export declare type CourseWork = {
    /**
     * default heading level from DocLevels (default: 2)
     */
    level: string | number;
    /**
     * name of the group (topic) for this coursework
     */
    name: string;
    /**
     * list of the coursework associated with this topic
     */
    work: Array<Work>;
};
/**
 * Type to hold an individual instance of course work
 */
export declare type Work = {
    /**
     * title of the task
     */
    title: string;
    /**
     * due date for the task
     */
    dueDate: string;
    /**
     * description of the task
     */
    description?: string;
    /**
     * array of materials associated with the task
     */
    materials: Array<Material>;
};
/**
 * Type to hold associated class materials
 */
export declare type Material = {
    /**
     * title of the associated material
     */
    title: string;
    /**
     * url to the file in Drive (optional)
     */
    file?: string;
    /**
     * YouTube link to the video (optional)
     */
    video?: string;
    /**
     * url of the link (optional)
     */
    link?: string;
    /**
     * url to the form in Drive (optional)
     */
    form?: string;
};
/**
 * Type to hold the parameters for the convertClassroomData method
 */
export declare type ClassDataParams = {
    /**
     * the prefix for the due date (default: "Due Date:")
     */
    dueDateString?: string;
    /**
     * the delimiter for the actual due date (default: "/")
     */
    dueDateDelim?: string;
    /**
     * the order to write the due date (default MDY)
     */
    dueDateOrder?: string;
};
/**
 * Class for all of the particular course information
 */
export declare class ClassInfo {
    private _topics;
    private _announcements;
    constructor();
    /**
     * Get the topic ids
     *
     * @returns {Array<string>} the topic ids
     */
    getTopics(): Array<string>;
    /**
     * Gets the name of a topic
     *
     * @param topicId the topic id
     *
     * @returns {string} the name of the topic
     */
    getName(topicId: string): string;
    /**
     * Adds a topic to the course
     *
     * @param topicId the topic id
     * @param {CourseWork} courseWork the coursework object associated with the topic
     *
     * @returns {ClassInfo} the object for chaining
     */
    addTopic(topicId: string, courseWork: CourseWork): ClassInfo;
    /**
     * Adds an announcement to the coursework
     *
     * @param announcement the text of the announcement
     *
     * @returns {ClassInfo} the object for chaining
     */
    addAnnouncement(announcement: string): ClassInfo;
    /**
     * Gets the list of announcements for the coursework
     *
     * @returns {Array<string>} the list of announcements
     */
    getAnnouncements(): Array<string>;
    /**
     * Adds course work to the object
     *
     * @param topicId the topic id
     * @param {Work} courseWork the work associated with this topic
     *
     * @returns {ClassInfo} the object for chaining
     */
    addCourseWork(topicId: string, courseWork: Work): ClassInfo;
    /**
     * Gets the course work associated with the specified topic
     *
     * @param topicId the topic id
     *
     * @returns {CouseWork} the object for chaining
     */
    getCourseWork(topicId: string): CourseWork;
}
/**
 * Class to access a single course in Google Classroom
 */
export declare class ClassGS {
    private _classInfo;
    private _courseWork;
    private _topics;
    private _course;
    /**
     *
     * @param course the Google course object
     */
    constructor(course: GoogleAppsScript.Classroom.Schema.Course);
    getName(): string;
    /**
     * Gets the id of the calendar associated with the course
     *
     * @returns the calendar id
     */
    getCalendarId(): string;
    /**
     * Convert the current course's data into a ClassInfo object
     *
     * @param args {ClassDataParams} the optional parameters for creating the classroom data object
     *
     * @return {ClassInfo} the object for chaining
     */
    convertClassroomData(args?: ClassDataParams): ClassInfo;
    /**
     * Gets the due date string
     *
     * @param workDueDate the Google Date object holding the due date
     * @param {ClassDataParams} args the class data arguments for determining the date string
     *
     * @returns the due date string
     */
    private _getDueDate;
    /**
     * Gets the current material associated with the task
     *
     * @param t_material the material associated with the current task as a Google object
     *
     * @returns {Material} the material associated with the current task in a Material object
     */
    private _getMaterials;
}
