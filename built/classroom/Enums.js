/**
 * Whether the Course Work has been published or not
 */
export var CourseWorkState;
(function (CourseWorkState) {
    CourseWorkState["None"] = "COURSE_WORK_STATE_UNSPECIFIED";
    CourseWorkState["Published"] = "PUBLISHED";
    CourseWorkState["Draft"] = "DRAFT";
    CourseWorkState["Deleted"] = "DELETED";
})(CourseWorkState || (CourseWorkState = {}));
/**
 * If the course work is an assignment or question
 */
export var CourseWorkType;
(function (CourseWorkType) {
    CourseWorkType["None"] = "COURSE_WORK_TYPE_UNSPECIFIED";
    CourseWorkType["Assignment"] = "ASSIGNMENT";
    CourseWorkType["ShortAnswer"] = "SHORT_ANSWER_QUESTION";
    CourseWorkType["MultipleChoice"] = "MULTIPLE_CHOICE_QUESTION";
})(CourseWorkType || (CourseWorkType = {}));
/**
 * If the announcement is published or not
 */
export var AnnouncementState;
(function (AnnouncementState) {
    AnnouncementState["None"] = "ANNOUNCEMENT_STATE_UNSPECIFIED";
    AnnouncementState["Published"] = "PUBLISHED";
    AnnouncementState["Draft"] = "DRAFT";
    AnnouncementState["Deleted"] = "DELETED";
})(AnnouncementState || (AnnouncementState = {}));
/**
 * If we're assigning to all of the students or some of them
 */
export var AssigneeMode;
(function (AssigneeMode) {
    AssigneeMode["None"] = "ASSIGNEE_MODE_UNSPECIFIED";
    AssigneeMode["All"] = "ALL_STUDENTS";
    AssigneeMode["IndividualStudents"] = "INDIVIDUAL_STUDENTS";
})(AssigneeMode || (AssigneeMode = {}));
/**
 * How submissions can be modified
 */
export var SubmissionModificationMode;
(function (SubmissionModificationMode) {
    SubmissionModificationMode["None"] = "SUBMISSION_MODIFICATION_MODE_UNSPECIFIED";
    SubmissionModificationMode["ModifiableUntilTurnedIn"] = "MODIFIABLE_UNTIL_TURNED_IN";
    SubmissionModificationMode["Modifiable"] = "MODIFIABLE";
})(SubmissionModificationMode || (SubmissionModificationMode = {}));
