import { ClassInfo } from 'ClassInfo';
import { ClassDataParams } from 'ClassDataParams';
import { Work } from 'Work';
import { Material } from 'Material';

/**
 * Class to access a single course in Google Classroom
 * @param {GoogleAppsScript.Classroom.Schema.Course} course the
 *  Google course object
 * @return {ClassGS} the object for chaining
 */
export function newClass(course: GoogleAppsScript.Classroom.Schema.Course): ClassGS {
  return new ClassGS(course);
}

/**
 * Get the name of the course
 *
 * @param {ClassGS} obj the Class object
 * @return {string} the name of the course
 */
export function getClassName(obj: ClassGS): string {
  return obj.getName();
}

/**
 * Gets the id of the calendar associated with the course
 *
 * @param {ClassGS} obj the Class object
 * @return {string} the calendar id
 */
export function getClassCalendarId(obj: ClassGS): string {
  return obj.getCalendarId();
}

/**
 * Convert the current course's data into a ClassInfo object
 *
 * @param {ClassGS} obj the Class object
 * @param {ClassDataParams} args the optional parameters for creating the
 *  classroom data object
 *
 * @return {ClassInfo} the object for chaining
 */
export function convertClassroomData(obj: ClassGS, args?: ClassDataParams): ClassInfo {
  return obj.convertClassroomData(args);
}

/**
 * Class to access a single course in Google Classroom
 */
export class ClassGS {
  private _classInfo: ClassInfo;
  private _courseWork: Array<GoogleAppsScript.Classroom.Schema.CourseWork>;
  // @ts-ignore
  private _topics: Array<GoogleAppsScript.Classroom.Schema.Topic>;
  private _course: GoogleAppsScript.Classroom.Schema.Course;

  /**
   *
   * @param {GoogleAppsScript.Classroom.Schema.Course} course the
   *  Google course object
   */
  constructor(course: GoogleAppsScript.Classroom.Schema.Course) {
    if (course == undefined || course.id == undefined) {
      throw new Error('Course not defined in ClassGS');
    }
    this._course = course;

    // Get the courses object
    const theseClassroomCourses = Classroom.Courses;
    if (
      theseClassroomCourses == undefined ||
      theseClassroomCourses.CourseWork == undefined ||
      theseClassroomCourses.Announcements == undefined
    ) {
      throw new Error('Could not find courses in ClassGS');
    }

    // Get the lists of classwork, announcements, and topics
    const thisClassroomWork = theseClassroomCourses.CourseWork.list(course.id, { orderBy: 'dueDate asc' }).courseWork;
    const theseClassroomAnnouncements = theseClassroomCourses.Announcements.list(course.id).announcements;
    // @ts-ignore
    const theseClassroomTopics = theseClassroomCourses.Topics.list(course.id).topic;

    // Check to make sure all of the objects exist
    if (thisClassroomWork == undefined || theseClassroomAnnouncements == undefined) {
      throw new Error('No course work or announcements found in ClassGS');
    }
    this._courseWork = thisClassroomWork;

    // Creates a new instance of the all of the class information
    this._classInfo = new ClassInfo();

    // Get all of the announcements into the appropriate array
    let announcement: GoogleAppsScript.Classroom.Schema.Announcement;
    for (announcement of theseClassroomAnnouncements) {
      if (announcement == null || announcement.text == null) {
        throw new Error(
          'Cannot call announcements.forEach on an empty ' + 'announcement in ClassGS.convertClassroomData()',
        );
      }
      this._classInfo.addAnnouncement(announcement.text);
    }

    // Get all of the topics into the appropriate array
    if (theseClassroomTopics == undefined) this._topics = [];
    else this._topics = theseClassroomTopics;
  }

  /**
   * Get the name of the course
   *
   * @return {string} the name of the course
   */
  getName(): string {
    const thisName = this._course.name;
    if (thisName != null) return thisName;
    throw new Error('Course does not have name in ClassGS.getName()');
  }

  /**
   * Gets the id of the calendar associated with the course
   *
   * @return {string} the calendar id
   */
  getCalendarId(): string {
    const thisCalId = this._course.calendarId;
    if (thisCalId == undefined) {
      throw new Error('Calendar id undefined ' + 'for course in ClassGS.getCalendarId()');
    }
    return thisCalId;
  }

  /**
   * Convert the current course's data into a ClassInfo object
   *
   * @param {ClassDataParams} args the optional parameters for creating the
   *  classroom data object
   *
   * @return {ClassInfo} the object for chaining
   */
  convertClassroomData(args?: ClassDataParams): ClassInfo {
    if (args == undefined) args = {} as ClassDataParams;

    // Add each topic
    // @ts-ignore
    let topic: GoogleAppsScript.Classroom.Schema.Topic;
    for (topic of this._topics) {
      // @ts-ignore
      this._classInfo.addTopic(topic.topicId, {
        level: 2,
        // @ts-ignore
        name: topic.name,
        work: [],
      });
    }

    // Loop through each task and add to coursework
    let courseWork: GoogleAppsScript.Classroom.Schema.CourseWork;
    for (courseWork of this._courseWork) {
      const objWork: Work = {} as Work;

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
        objWork.materials = [];
        let material: GoogleAppsScript.Classroom.Schema.Material;
        for (material of courseWork.materials) {
          const thisMaterial = material;
          if (thisMaterial == null) {
            throw new Error('Could not find material in ' + 'ClassGS.convertClassroomData()');
          }
          objWork.materials.push(this._getMaterials(thisMaterial));
        }
      }

      // Add the course work to the array
      // @ts-ignore
      const thisTopicId = courseWork.topicId;
      if (thisTopicId != null) {
        this._classInfo.addCourseWork(thisTopicId, objWork);
      }
    }
    return this._classInfo;
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
  private _getDueDate(workDueDate: GoogleAppsScript.Classroom.Schema.Date, args: ClassDataParams): string {
    const { dueDateString = 'Due Date:', dueDateDelim = '/', dueDateOrder = 'MDY' } = args;

    // Add the corresponding piece of the date for each part of the order
    let dueDate = dueDateString + ' ';
    for (let d = 0; d < dueDateOrder.length; d++) {
      const thisChar = dueDateOrder.charAt(d);
      if (thisChar.toUpperCase() == 'M') dueDate += workDueDate.month;
      else if (thisChar.toUpperCase() == 'D') dueDate += workDueDate.day;
      else if (thisChar.toUpperCase() == 'Y') dueDate += workDueDate.year;
      if (thisChar != dueDateOrder.substr(dueDateOrder.length - 1, 1)) {
        dueDate += dueDateDelim;
      }
    }
    return dueDate;
  }

  /**
   * Gets the current material associated with the task
   *
   * @param {GoogleAppsScript.Classroom.Schema.Material} thisMaterial the
   *  material associated with the current task as a Google object
   *
   * @return {Material} the material associated with the current task
   *  in a Material object
   */
  private _getMaterials(thisMaterial: GoogleAppsScript.Classroom.Schema.Material): Material {
    const objMaterials: Material = {} as Material;

    // If it's a drive file, get the title and file link
    if (thisMaterial.driveFile != null) {
      if (thisMaterial.driveFile != null && thisMaterial.driveFile.driveFile != null) {
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
    } else if (
      thisMaterial.youtubeVideo != null &&
      thisMaterial.youtubeVideo.alternateLink != null &&
      thisMaterial.youtubeVideo.title != null
    ) {
      // If it's a YouTube video, get the link and title

      objMaterials.title = thisMaterial.youtubeVideo.title;
      objMaterials.video = thisMaterial.youtubeVideo.alternateLink;
    } else if (thisMaterial.link != null && thisMaterial.link.url != null && thisMaterial.link.title != null) {
      // If it's a link, get the url and the title
      objMaterials.link = thisMaterial.link.url;
      objMaterials.title = thisMaterial.link.title;
    } else if (thisMaterial.form != null && thisMaterial.form.title != null && thisMaterial.form.formUrl != null) {
      // If it's a form, get the url and the title
      objMaterials.form = thisMaterial.form.formUrl;
      objMaterials.title = thisMaterial.form.title;
    }
    return objMaterials;
  }
}
