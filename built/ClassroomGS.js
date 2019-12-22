"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassGS_1 = require("./ClassGS");
/**
 * Class to store the Google Classroom object
 */
var ClassroomGS = /** @class */ (function () {
    function ClassroomGS() {
        var classroomCourses = Classroom.Courses;
        if (classroomCourses == undefined)
            throw new Error("Could not find courses in ClassGS");
        var allCourses = classroomCourses.list().courses;
        if (allCourses == undefined)
            throw new Error("No course work found in ClassGS");
        this._classList = allCourses;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns {Array<GoogleAppsScript.Classroom.Schema.Course>} the list of Course objects
     */
    ClassroomGS.prototype.getObject = function () {
        return this._classList;
    };
    /**
     * Get the ClassGS object from the enrollment code that students use to join the class
     *
     * @param enrollmentCode the enrollment code that students use to join the class
     *
     * @returns {ClassGS} the Class object
     */
    ClassroomGS.prototype.getClass = function (enrollmentCode) {
        for (var _i = 0, _a = this._classList; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.enrollmentCode == enrollmentCode)
                return new ClassGS_1.ClassGS(c);
        }
        throw new Error("Could not find class with code " + enrollmentCode + " in ClassroomGS()");
    };
    ;
    return ClassroomGS;
}());
exports.ClassroomGS = ClassroomGS;
