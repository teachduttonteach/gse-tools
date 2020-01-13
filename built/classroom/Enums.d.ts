/**
 * Whether the Course Work has been published or not
 */
export declare enum CourseWorkState {
    COURSE_WORK_STATE_UNSPECIFIED = "COURSE_WORK_STATE_UNSPECIFIED",
    PUBLISHED = "PUBLISHED",
    DRAFT = "DRAFT",
    DELETED = "DELETED"
}
/**
 * If the course work is an assignment or question
 */
export declare enum CourseWorkType {
    COURSE_WORK_TYPE_UNSPECIFIED = "COURSE_WORK_TYPE_UNSPECIFIED",
    ASSIGNMENT = "ASSIGNMENT",
    SHORT_ANSWER_QUESTION = "SHORT_ANSWER_QUESTION",
    MULTIPLE_CHOICE_QUESTION = "MULTIPLE_CHOICE_QUESTION"
}
/**
 * If the announcement is published or not
 */
export declare enum AnnouncementState {
    ANNOUNCEMENT_STATE_UNSPECIFIED = "ANNOUNCEMENT_STATE_UNSPECIFIED",
    PUBLISHED = "PUBLISHED",
    DRAFT = "DRAFT",
    DELETED = "DELETED"
}
/**
 * If we're assigning to all of the students or some of them
 */
export declare enum AssigneeMode {
    ASSIGNEE_MODE_UNSPECIFIED = "ASSIGNEE_MODE_UNSPECIFIED",
    ALL_STUDENTS = "ALL_STUDENTS",
    INDIVIDUAL_STUDENTS = "INDIVIDUAL_STUDENTS"
}
/**
 * How submissions can be modified
 */
export declare enum SubmissionModificationMode {
    SUBMISSION_MODIFICATION_MODE_UNSPECIFIED = "SUBMISSION_MODIFICATION_MODE_UNSPECIFIED",
    MODIFIABLE_UNTIL_TURNED_IN = "MODIFIABLE_UNTIL_TURNED_IN",
    MODIFIABLE = "MODIFIABLE"
}
