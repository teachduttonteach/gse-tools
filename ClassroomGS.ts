class ClassroomGS {
  classList: Array<GoogleAppsScript.Classroom.Schema.Course>;
  constructor() {
    this.classList = Classroom.Courses.list().courses;
  }

  getClass = function(enrollmentCode: string): ClassGS {
    for (let c of this.classList) {
      if (c.enrollmentCode == enrollmentCode) return new ClassGS(c);
    }
    throw new Error("Could not find class with code " + enrollmentCode + " in ClassroomGS()");
  };
}
