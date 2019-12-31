import { ClassInfo } from "./ClassInfo"
import {ClassDataParams} from "./ClassDataParams"
import {Work} from "./Work"
import {Material} from "./Material"

/**
 * Class to access a single course in Google Classroom
 */
export class ClassGS {
    private _classInfo: ClassInfo;
    private _courseWork: Array<GoogleAppsScript.Classroom.Schema.CourseWork>;
    //@ts-ignore
    private _topics: Array<GoogleAppsScript.Classroom.Schema.Topic>;
    private _course: GoogleAppsScript.Classroom.Schema.Course;

    /**
     *  
     * @param course the Google course object
     */
    constructor(course: GoogleAppsScript.Classroom.Schema.Course) {
      if ((course == undefined) || (course.id == undefined)) throw new Error("Course not defined in ClassGS");
        this._course = course;

        // Get the courses object
        let t_classroomCourses = Classroom.Courses;
        if ((t_classroomCourses == undefined) || (t_classroomCourses.CourseWork == undefined) || (t_classroomCourses.Announcements == undefined)) throw new Error("Could not find courses in ClassGS");

        // Get the lists of classwork, announcements, and topics
        let t_classroomWork = t_classroomCourses.CourseWork.list(course.id, {orderBy: "dueDate asc"}).courseWork;
        let t_classroomAnnouncements = t_classroomCourses.Announcements.list(course.id).announcements;
        //@ts-ignore
        let t_classroomTopics = t_classroomCourses.Topics.list(course.id).topic;

        // Check to make sure all of the objects exist
        if ((t_classroomWork == undefined) || (t_classroomAnnouncements == undefined) || (t_classroomTopics == undefined)) throw new Error("No course work or announcements found in ClassGS");
        this._courseWork = t_classroomWork;

        // Creates a new instance of the all of the class information
        this._classInfo = new ClassInfo();
        
        // Get all of the announcements into the appropriate array
        let announcement: GoogleAppsScript.Classroom.Schema.Announcement;
        for (announcement of t_classroomAnnouncements) {
          if ((announcement == null) || (announcement.text == null)) throw new Error("Cannot call announcements.forEach on an empty announcement in ClassGS.convertClassroomData()");
          this._classInfo.addAnnouncement(announcement.text);
        }

        // Get all of the topics into the appropriate array
        this._topics = t_classroomTopics;
    } 

    getName(): string {
      let t_name = this._course.name;
      if (t_name != null) return t_name;
      throw new Error("Course does not have name in ClassGS.getName()");
    }

    /**
     * Gets the id of the calendar associated with the course
     * 
     * @returns the calendar id
     */
    getCalendarId(): string {
      let t_calId = this._course.calendarId;
      if (t_calId == undefined) throw new Error("Calendar id undefined for course in ClassGS.getCalendarId()");
      return t_calId;
    };
  
    /**
     * Convert the current course's data into a ClassInfo object
     * 
     * @param args {ClassDataParams} the optional parameters for creating the classroom data object
     * 
     * @return {ClassInfo} the object for chaining
     */
    convertClassroomData(args?: ClassDataParams): ClassInfo {
      if (args == undefined) args = {} as ClassDataParams;

      // Add each topic
      //@ts-ignore
      let topic: GoogleAppsScript.Classroom.Schema.Topic;
      for (topic of this._topics) {
        //@ts-ignore
        this._classInfo.addTopic(topic.topicId, {
          level: 2,
          //@ts-ignore
          name: topic.name,
          work: [],
        });
      }

      // Loop through each task and add to coursework
      let courseWork: GoogleAppsScript.Classroom.Schema.CourseWork;
      for (courseWork of this._courseWork) {
        let objWork: Work = {} as Work;

        // Get title, due date and description of the current task
        objWork.title = courseWork.title == undefined ? "" : courseWork.title;
        if (courseWork.dueDate != undefined) objWork.dueDate = this._getDueDate(courseWork.dueDate, args);
        if (courseWork.description != undefined) objWork.description = courseWork.description;
        
        // Get the materials from the course work
        if (courseWork.materials != undefined) {
          objWork.materials = [];
          let material: GoogleAppsScript.Classroom.Schema.Material;
          for (material of courseWork.materials) {
            let t_material = material;
            if (t_material == null) throw new Error("Could not find material in ClassGS.convertClassroomData()");
            objWork.materials.push(this._getMaterials(t_material));
          }
        }

        // Add the course work to the array
        //@ts-ignore
        let t_topicId = courseWork.topicId;
        if (t_topicId != null) this._classInfo.addCourseWork(t_topicId, objWork);
      }
      return this._classInfo;
    }

    /**
     * Gets the due date string
     * 
     * @param workDueDate the Google Date object holding the due date
     * @param {ClassDataParams} args the class data arguments for determining the date string
     * 
     * @returns the due date string
     */
    private _getDueDate(workDueDate: GoogleAppsScript.Classroom.Schema.Date, args: ClassDataParams): string {
      let {
        dueDateString = "Due Date:",
        dueDateDelim = "/",
        dueDateOrder = "MDY"
      } = args;

      // Add the corresponding piece of the date for each part of the order
      let dueDate = dueDateString + " ";
      for (let d = 0; d < dueDateOrder.length; d++) {
        let t_char = dueDateOrder.charAt(d);
        if (t_char.toUpperCase() == "M") dueDate += workDueDate.month;
        else if (t_char.toUpperCase() == "D") dueDate += workDueDate.day;
        else if (t_char.toUpperCase() == "Y") dueDate += workDueDate.year;
        if (t_char != dueDateOrder.substr(dueDateOrder.length - 1, 1)) {
          dueDate += dueDateDelim;
        }
      }
      return dueDate;
    }

    /**
     * Gets the current material associated with the task
     * 
     * @param t_material the material associated with the current task as a Google object
     * 
     * @returns {Material} the material associated with the current task in a Material object
     */
    private _getMaterials(t_material: GoogleAppsScript.Classroom.Schema.Material): Material {
      let objMaterials: Material = {} as Material;

      // If it's a drive file, get the title and file link
      if (t_material.driveFile != null) {
        if ((t_material.driveFile != null) && (t_material.driveFile.driveFile != null)) {
          let t_file = t_material.driveFile.driveFile;
          if (t_file != null) {
            let t_title = t_file.title;
            let t_link = t_file.alternateLink;
            if ((t_title != null) && (t_link != null)) {
              objMaterials.title = t_title;
              objMaterials.file = t_link;
            }
          }
        }
      }
      
      // If it's a YouTube video, get the link and title
      else if ((t_material.youtubeVideo != null) && (t_material.youtubeVideo.alternateLink != null) && (t_material.youtubeVideo.title != null)) {
        objMaterials.title = t_material.youtubeVideo.title;
        objMaterials.video = t_material.youtubeVideo.alternateLink;
      } 
      
      // If it's a link, get the url and the title
      else if ((t_material.link != null) && (t_material.link.url != null) && (t_material.link.title != null)) {
        objMaterials.link = t_material.link.url;
        objMaterials.title = t_material.link.title;
      } 
      
      // If it's a form, get the url and the title
      else if ((t_material.form != null) && (t_material.form.title != null) && (t_material.form.formUrl != null)) {
        objMaterials.form = t_material.form.formUrl;
        objMaterials.title = t_material.form.title;
      }
      return objMaterials;      
    }
  };