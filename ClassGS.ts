class ClassGS {
    courseWork: Array<GoogleAppsScript.Classroom.Schema.CourseWork>;
    announcements: Array<GoogleAppsScript.Classroom.Schema.Announcement>;
    topics: Array<gsapiTopic>;
    _course: GoogleAppsScript.Classroom.Schema.Course;
    constructor(course: GoogleAppsScript.Classroom.Schema.Course) {
        this._course = course;
        this.courseWork = Classroom.Courses.CourseWork.list(course.id, {orderBy: "dueDate asc"}).courseWork;
        this.announcements = Classroom.Courses.Announcements.list(course.id, {orderBy: "dueDate asc"}).announcements;
        //this.topics = Classroom.Courses.Topics.list(course.id).topic;
    } 

    getCalendarId = function(): string {
      return this._course.calendarId;
    };
  
    convertClassroomData = function(): gsoTopic {
      let objClassroomData: gsoTopic;
      // This might be the wrong iterator
      this.topics.forEach(
        function(t: gsapiTopic) {
          objClassroomData[t.topicId] = {
            announcements: {
              level: "2",
              titles: []
            },
            courseWork: {
              level: "2",
              titles: [],
            },
              
          };
          this.announcements.forEach(
            function(a: GoogleAppsScript.Classroom.Schema.Announcement) {
              //if (a.topicId == t.topicId) {
              if (a.courseId == t.courseId) {
                objClassroomData[t.topicId].announcements.titles.push(a["title"]);
              }  
            }
          );
          this.courseWork.forEach(
            function(c: GoogleAppsScript.Classroom.Schema.CourseWork) {
                if (c["topicId"] == t["topicId"]) {
                  let objWork: gsoTopicWork = {
                    title: c["title"],
                    dueDate: "",
                    description: "",
                    materials: []
                  };
                  if (c["dueDate"]) {
                    objWork.dueDate = "Due Date: " + c["dueDate"]["month"] + "/" + c["dueDate"]["day"] + "/" + c["dueDate"]["year"];
                  }
                  if (c["description"]) {
                    objWork.description = c["description"];
                  }
                  if (c["materials"]) {
                    this.materials.forEach(
                      function(m: GoogleAppsScript.Classroom.Schema.CourseMaterial) {
                        let objMaterials: gsoTopicMaterial;
                        objMaterials.title = m.driveFile.title;
                        if (m.driveFile) {
                          objMaterials.file = m.driveFile.alternateLink;
                          objMaterials.title = m.driveFile.title;
                        } else if (m.youTubeVideo) {
                          objMaterials.title = m.driveFile.title;
                          objMaterials.video = m.youTubeVideo.alternateLink;
                        } else if (m.link) {
                          objMaterials.link = m.link.url;
                          objMaterials.title = m.link.title;
                        } else if (m.form) {
                          objMaterials.form = m.form.formUrl;
                          objMaterials.title = m.form.title;
                        }
                        objWork.materials.push(objMaterials);
                    }
                    );
                  }
                  objClassroomData[t.topicId].courseWork.titles.push(objWork);
                }
            }
          );
        }
      );
      return objClassroomData;
    }
  };