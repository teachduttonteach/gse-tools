import { MapGS } from '../map/MapGS';
/**
 * Class to access a single course in Google Classroom
 * @param {GoogleAppsScript.Classroom.Schema.Course} course the
 *  Google course object
 * @return {ClassGS} the object for chaining
 */
export function newClass(course) {
    return new ClassGS(course);
}
/**
 * Get the list of students associated with the class
 *
 * @param {ClassGS} obj the Class object
 * @return {MapGS<string, string>} a map of the student ID to the full name
 */
export function getClassStudents(obj) {
    return obj.getStudents();
}
/**
 * Adds course work to the object
 *
 * @param {ClassGS} obj the Class object
 * @param {CourseWorkGS} work the work associated with this topic
 *
 * @return {ClassGS} the object for chaining
 */
export function addCourseWork(obj, work) {
    return obj.addCourseWork(work);
}
/**
 * Adds a topic to the course
 *
 * @param {ClassGS} obj the Class object
 * @param {string} topic the topic name
 *
 * @return {ClassGS} the object for chaining
 */
export function addClassTopic(obj, topic) {
    return obj.addTopic(topic);
}
/**
 * Adds an announcement to the coursework
 *
 * @param {ClassGS} obj the Class object
 * @param {CourseAnnouncementGS} announcement the announcement object
 *
 * @return {ClassGS} the object for chaining
 */
export function addClassAnnouncement(obj, announcement) {
    return obj.addAnnouncement(announcement);
}
/**
 * Get the topic ids
 *
 * @param {ClassGS} obj the Class object
 * @return {Array<string>} the topic ids
 */
export function getClassTopics(obj) {
    return obj.getTopics();
}
/**
 * Gets the name of a topic
 *
 * @param {ClassGS} obj the Class object
 * @param {string} topicId the topic id
 *
 * @return {string} the name of the topic
 */
export function getClassTopicName(obj, topicId) {
    return obj.getTopicName(topicId);
}
/**
 * Gets the list of announcements for the coursework
 *
 * @param {ClassGS} obj the Class object
 * @return {Array<string>} the list of announcements
 */
export function getClassAnnouncements(obj) {
    return obj.getAnnouncements();
}
/**
 * Gets the course work associated with the specified topic
 *
 * @param {ClassGS} obj the Class object
 * @param {string} topicId the topic id
 *
 * @return {CouseWork} the object for chaining
 */
export function getClassTopicInfo(obj, topicId) {
    return obj.getTopicInfo(topicId);
}
/**
 * Get the name of the course
 *
 * @param {ClassGS} obj the Class object
 * @return {string} the name of the course
 */
export function getClassName(obj) {
    return obj.getName();
}
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
export function getClassCalendarId(obj) {
    return obj.getCalendarId();
}
/**
 * Class to access a single course in Google Classroom
 */
export class ClassGS {
    /**
     *
     * @param {GoogleAppsScript.Classroom.Schema.Course} course the
     *  Google course object
     * @param {ClassDataParams} args the optional parameters for creating the
     *  classroom data object
     */
    constructor(course, args) {
        if (course == undefined || course.id == undefined) {
            throw new Error('Course not defined in ClassGS');
        }
        this._course = course;
        this._id = course.id;
        // Get the courses object
        const theseClassroomCourses = Classroom.Courses;
        if (theseClassroomCourses == undefined ||
            theseClassroomCourses.CourseWork == undefined) {
            throw new Error('Could not find courses in ClassGS');
        }
        this._announcements = [];
        if (theseClassroomCourses.Announcements != undefined) {
            const theseClassroomAnnouncements = theseClassroomCourses.Announcements.list(course.id).announcements;
            // Get all of the announcements into the appropriate array
            let announcement;
            if (theseClassroomAnnouncements != undefined) {
                for (announcement of theseClassroomAnnouncements) {
                    if (announcement == null || announcement.text == null) {
                        throw new Error('Cannot call announcements.forEach on an empty ' +
                            'announcement in ClassGS()');
                    }
                    this._announcements.push(announcement.text);
                }
            }
        }
        const theseClassroomTopics = 
        // @ts-ignore
        theseClassroomCourses.Topics.list(course.id).topic;
        // Get all of the topics into the appropriate Map
        this._topics = new MapGS();
        if (theseClassroomTopics != undefined) {
            // Add each topic
            // @ts-ignore
            let topic;
            for (topic of theseClassroomTopics) {
                this._topics.set(topic.topicId, {
                    level: 2,
                    // @ts-ignore
                    name: topic.name,
                    work: [],
                });
            }
        }
        if (args == undefined)
            args = {};
        // Get the lists of classwork, announcements, and topics
        const thisClassroomWork = theseClassroomCourses.CourseWork.list(course.id, { orderBy: 'dueDate asc' }).courseWork;
        if (thisClassroomWork != undefined) {
            // Loop through each task and add to coursework
            let courseWork;
            for (courseWork of thisClassroomWork) {
                let objWork = {};
                // Get title, due date and description of the current task
                objWork.title = courseWork.title == undefined ? '' : courseWork.title;
                if (courseWork.dueDate != undefined) {
                    objWork.dueDate = this._getDueDate(courseWork.dueDate, args);
                }
                if (courseWork.description != undefined) {
                    objWork.description = courseWork.description;
                }
                // Get the materials from the course work
                if (courseWork.materials != undefined) {
                    objWork = this._addCourseMaterials(courseWork.materials, objWork);
                }
                // Add the course work to the array
                // @ts-ignore
                const thisTopicId = courseWork.topicId;
                if (thisTopicId != null) {
                    this._topics.get(thisTopicId)?.work.push(objWork);
                }
            }
        }
    }
    /**
     * Gets the due date string
     *
     * @param {GoogleAppsScript.Classroom.Schema.Date} workDueDate the Google
     *  Date object holding the due date
     * @param {ClassDataParams} args the class data arguments for determining
     *  the date string
     *
     * @return {string} the due date string
     */
    _getDueDate(workDueDate, args) {
        const { dueDateString = 'Due Date:', dueDateDelim = '/', dueDateOrder = 'MDY' } = args;
        // Add the corresponding piece of the date for each part of the order
        let dueDate = dueDateString + ' ';
        for (let d = 0; d < dueDateOrder.length; d++) {
            const thisChar = dueDateOrder.charAt(d);
            if (thisChar.toUpperCase() == 'M')
                dueDate += workDueDate.month;
            else if (thisChar.toUpperCase() == 'D')
                dueDate += workDueDate.day;
            else if (thisChar.toUpperCase() == 'Y')
                dueDate += workDueDate.year;
            if (thisChar != dueDateOrder.substr(dueDateOrder.length - 1, 1)) {
                dueDate += dueDateDelim;
            }
        }
        return dueDate;
    }
    /**
     * Add course materials to a Work object
     *
     * @param {Array<GoogleAppsScript.Classroom.Schema.Material>} materials list
     *  of materials for the course
     * @param {Work} objWork the work object to put the materials into
     * @return {Work} the object for chaining
     */
    _addCourseMaterials(materials, objWork) {
        objWork.materials = [];
        let material;
        for (material of materials) {
            const thisMaterial = material;
            if (thisMaterial == null) {
                throw new Error('Could not find material in ' +
                    'ClassGS._addCourseMaterials()');
            }
            objWork.materials.push(this._getMaterials(thisMaterial));
        }
        return objWork;
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
     * Get the topic names
     *
     * @return {Array<string>} the topic names
     */
    getTopicNames() {
        return this._topics.values().map((a) => a.name);
    }
    /**
     * Gets the name of a topic
     *
     * @param {string} topicId the topic id
     *
     * @return {string} the name of the topic
     */
    getTopicName(topicId) {
        const thisTopic = this._topics.get(topicId);
        if (thisTopic == undefined) {
            throw new Error('Topic ' + topicId +
                ' not defined in ClassGS.getTopicName()');
        }
        return thisTopic.name;
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
     * Gets the course work associated with the specified topic
     *
     * @param {string} topicId the topic id
     *
     * @return {CouseWork} the object for chaining
     */
    getTopicInfo(topicId) {
        if (topicId == undefined) {
            throw new Error('Topic name ' + topicId +
                ' undefined in Topic.getTopicInfo()');
        }
        const thisTopicInfo = this._topics.get(topicId);
        if (thisTopicInfo == undefined) {
            throw new Error('Could not find course work in ' + topicId +
                ' in ClassGS.getTopicInfo()');
        }
        return thisTopicInfo;
    }
    /**
     * Get the name of the course
     *
     * @return {string} the name of the course
     */
    getName() {
        const thisName = this._course.name;
        if (thisName != null)
            return thisName;
        throw new Error('Course does not have name in ClassGS.getName()');
    }
    /**
     * Gets the id of the calendar associated with the course
     *
     * @return {string} the calendar id
     */
    getCalendarId() {
        const thisCalId = this._course.calendarId;
        if (thisCalId == undefined) {
            throw new Error('Calendar id undefined ' +
                'for course in ClassGS.getCalendarId()');
        }
        return thisCalId;
    }
    /**
     * Gets the current material associated with the task
     *
     * @param {GoogleAppsScript.Classroom.Schema.Material} thisMaterial the
     *  material associated with the current task as a Google object
     *
     * @return {CourseMaterial} the material associated with the current task
     *  in a Material object
     */
    _getMaterials(thisMaterial) {
        const objMaterials = {};
        // If it's a drive file, get the title and file link
        if (thisMaterial.driveFile != null) {
            if (thisMaterial.driveFile != null &&
                thisMaterial.driveFile.driveFile != null) {
                const thisFile = thisMaterial.driveFile.driveFile;
                if (thisFile != null) {
                    const thisTitle = thisFile.title;
                    const thisLink = thisFile.alternateLink;
                    if (thisTitle != null && thisLink != null) {
                        objMaterials.title = thisTitle;
                        objMaterials.file = thisLink;
                    }
                }
            }
        }
        else if (thisMaterial.youtubeVideo != null &&
            thisMaterial.youtubeVideo.alternateLink != null &&
            thisMaterial.youtubeVideo.title != null) {
            // If it's a YouTube video, get the link and title
            objMaterials.title = thisMaterial.youtubeVideo.title;
            objMaterials.video = thisMaterial.youtubeVideo.alternateLink;
        }
        else if (thisMaterial.link != null && thisMaterial.link.url != null &&
            thisMaterial.link.title != null) {
            // If it's a link, get the url and the title
            objMaterials.link = thisMaterial.link.url;
            objMaterials.title = thisMaterial.link.title;
        }
        else if (thisMaterial.form != null && thisMaterial.form.title != null &&
            thisMaterial.form.formUrl != null) {
            // If it's a form, get the url and the title
            objMaterials.form = thisMaterial.form.formUrl;
            objMaterials.title = thisMaterial.form.title;
        }
        return objMaterials;
    }
    /**
     * Get the list of students associated with the class
     *
     * @return {MapGS<string, string>} a map of the student ID to the full name
     */
    getStudents() {
        const studentList = new MapGS();
        if ((Classroom.Courses != undefined) &&
            (Classroom.Courses.Students != undefined)) {
            const thisStudentList = Classroom.Courses.Students.list(this._id);
            if ((thisStudentList != undefined) &&
                (thisStudentList.students != undefined)) {
                for (const s of thisStudentList.students) {
                    if ((s.userId != undefined) && (s.profile != undefined) &&
                        (s.profile.name != undefined) &&
                        (s.profile.name.fullName != undefined)) {
                        studentList.set(s.userId, s.profile.name.fullName);
                    }
                }
            }
        }
        return studentList;
    }
    /**
     * Adds course work to the object
     *
     * @param {CourseWorkGS} work the work associated with this topic
     *
     * @return {ClassGS} the object for chaining
     */
    addCourseWork(work) {
        if (Classroom.Courses == undefined) {
            throw new Error('Could not find ' +
                'Courses in Classroom');
        }
        if (Classroom.Courses.CourseWork == undefined) {
            throw new Error('Could ' +
                'not find Classwork in Classroom.Courses');
        }
        Classroom.Courses.CourseWork.create(work.getResource(), this._id);
        return this;
    }
    // TODO: Check to see if topic already exists
    // TODO: Update topics, classwork, announcements after they have been added
    /**
     * Adds a topic to the course
     *
     * @param {string} topic the topic name
     *
     * @return {ClassGS} the object for chaining
     */
    addTopic(topic) {
        if (this.getTopicNames().indexOf(topic) > -1) {
            console.log('WARNING: Topic \'' + topic + '\' already exists.');
            return this;
        }
        const newTopic = {};
        newTopic.name = topic;
        // @ts-ignore
        Classroom.Courses?.Topics?.create(newTopic, this._id);
        return this;
    }
    /**
     * Adds an announcement to the coursework
     *
     * @param {string} announcement the text of the announcement
     * @param {Array<CourseMaterial>} materials the
     *  materials associated with the announcement
     *
     * @return {ClassGS} the object for chaining
     */
    addAnnouncement(announcement) {
        Classroom.Courses?.Announcements?.
            create(announcement.getResource(), this._id);
        return this;
    }
}
