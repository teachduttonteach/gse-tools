"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassGS = /** @class */ (function () {
    function ClassGS(course) {
        this.getCalendarId = function () {
            return this._course.calendarId;
        };
        this.convertClassroomData = function () {
            var objClassroomData = new Topic();
            // This might be the wrong iterator
            this.topics.forEach(function (t) {
                objClassroomData.add(t.topicId, {
                    announcements: {
                        level: "2",
                        titles: []
                    },
                    courseWork: {
                        level: "2",
                        titles: [],
                    },
                });
                this.announcements.forEach(function (a) {
                    if ((a == null) || (a.text == null))
                        throw new Error("Cannot call announcements.forEach on an empty announcement in ClassGS.convertClassroomData()");
                    //TODO: if (a.topicId == t.topicId) {
                    if (a.courseId == t.courseId) {
                        objClassroomData.addAnnouncement(t.topicId, a.text);
                    }
                });
                this.courseWork.forEach(function (c) {
                    //if (c.topicId == t.topicId) {
                    if (c.courseId == t.courseId) {
                        var objWork_1 = {
                            title: c.title == undefined ? "" : c.title,
                            dueDate: "",
                            description: "",
                            materials: []
                        };
                        if (c["dueDate"]) {
                            objWork_1.dueDate = "Due Date: " + c["dueDate"]["month"] + "/" + c["dueDate"]["day"] + "/" + c["dueDate"]["year"];
                        }
                        if (c["description"]) {
                            objWork_1.description = c["description"];
                        }
                        if (c["materials"]) {
                            this.materials.forEach(function (m) {
                                if ((m == null) || (m.driveFile == null) || (m.driveFile.title == null))
                                    throw new Error("Materials need to be defined in ClassGS.convertClassroomData()");
                                var objMaterials = {
                                    file: "",
                                    title: "",
                                    video: "",
                                    link: "",
                                    form: ""
                                };
                                objMaterials.title = m.driveFile.title;
                                if (m.driveFile.alternateLink != null) {
                                    objMaterials.file = m.driveFile.alternateLink;
                                    objMaterials.title = m.driveFile.title;
                                }
                                else if ((m.youTubeVideo != null) && (m.youTubeVideo.alternateLink != null)) {
                                    objMaterials.title = m.driveFile.title;
                                    objMaterials.video = m.youTubeVideo.alternateLink;
                                }
                                else if ((m.link != null) && (m.link.url != null) && (m.link.title != null)) {
                                    objMaterials.link = m.link.url;
                                    objMaterials.title = m.link.title;
                                }
                                else if ((m.form != null) && (m.form.title != null) && (m.form.formUrl != null)) {
                                    objMaterials.form = m.form.formUrl;
                                    objMaterials.title = m.form.title;
                                }
                                objWork_1.materials.push(objMaterials);
                            });
                        }
                        objClassroomData.addCourseWork(t.topicId, objWork_1);
                    }
                });
            });
            return objClassroomData;
        };
        if ((course == undefined) || (course.id == undefined))
            throw new Error("Course not defined in ClassGS");
        this._course = course;
        var classroomCourses = Classroom.Courses;
        if ((classroomCourses == undefined) || (classroomCourses.CourseWork == undefined) || (classroomCourses.Announcements == undefined))
            throw new Error("Could not find courses in ClassGS");
        var classroomWork = classroomCourses.CourseWork.list(course.id, { orderBy: "dueDate asc" }).courseWork;
        var classroomAnnouncements = classroomCourses.Announcements.list(course.id, { orderBy: "dueDate asc" }).announcements;
        if ((classroomWork == undefined) || (classroomAnnouncements == undefined))
            throw new Error("No course work or announcements found in ClassGS");
        this.courseWork = classroomWork;
        this.announcements = classroomAnnouncements;
        //this.topics = Classroom.Courses.Topics.list(course.id).topic;
    }
    return ClassGS;
}());
exports.ClassGS = ClassGS;
;
