/**
 * Whether the Course Work has been published or not
 */
export var CourseWorkState;
(function (CourseWorkState) {
    CourseWorkState["COURSE_WORK_STATE_UNSPECIFIED"] = "COURSE_WORK_STATE_UNSPECIFIED";
    CourseWorkState["PUBLISHED"] = "PUBLISHED";
    CourseWorkState["DRAFT"] = "DRAFT";
    CourseWorkState["DELETED"] = "DELETED";
})(CourseWorkState || (CourseWorkState = {}));
/**
 * If the course work is an assignment or question
 */
export var CourseWorkType;
(function (CourseWorkType) {
    CourseWorkType["COURSE_WORK_TYPE_UNSPECIFIED"] = "COURSE_WORK_TYPE_UNSPECIFIED";
    CourseWorkType["ASSIGNMENT"] = "ASSIGNMENT";
    CourseWorkType["SHORT_ANSWER_QUESTION"] = "SHORT_ANSWER_QUESTION";
    CourseWorkType["MULTIPLE_CHOICE_QUESTION"] = "MULTIPLE_CHOICE_QUESTION";
})(CourseWorkType || (CourseWorkType = {}));
/**
 * If the announcement is published or not
 */
export var AnnouncementState;
(function (AnnouncementState) {
    AnnouncementState["ANNOUNCEMENT_STATE_UNSPECIFIED"] = "ANNOUNCEMENT_STATE_UNSPECIFIED";
    AnnouncementState["PUBLISHED"] = "PUBLISHED";
    AnnouncementState["DRAFT"] = "DRAFT";
    AnnouncementState["DELETED"] = "DELETED";
})(AnnouncementState || (AnnouncementState = {}));
/**
 * If we're assigning to all of the students or some of them
 */
export var AssigneeMode;
(function (AssigneeMode) {
    AssigneeMode["ASSIGNEE_MODE_UNSPECIFIED"] = "ASSIGNEE_MODE_UNSPECIFIED";
    AssigneeMode["ALL_STUDENTS"] = "ALL_STUDENTS";
    AssigneeMode["INDIVIDUAL_STUDENTS"] = "INDIVIDUAL_STUDENTS";
})(AssigneeMode || (AssigneeMode = {}));
/**
 * How submissions can be modified
 */
export var SubmissionModificationMode;
(function (SubmissionModificationMode) {
    SubmissionModificationMode["SUBMISSION_MODIFICATION_MODE_UNSPECIFIED"] = "SUBMISSION_MODIFICATION_MODE_UNSPECIFIED";
    SubmissionModificationMode["MODIFIABLE_UNTIL_TURNED_IN"] = "MODIFIABLE_UNTIL_TURNED_IN";
    SubmissionModificationMode["MODIFIABLE"] = "MODIFIABLE";
})(SubmissionModificationMode || (SubmissionModificationMode = {}));
