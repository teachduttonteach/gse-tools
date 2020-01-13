/// <reference types="google-apps-script" />
import { TimeOfDay } from './TimeOfDay';
import { AssigneeMode, CourseWorkState, CourseWorkType, SubmissionModificationMode } from './Enums';
/**
 * Type to hold all of the coursework in an object
 */
export declare type CourseWorkResource = {
    /**
     * Title of this course work. The title must be a valid UTF-8 string
     *  containing between 1 and 3000 characters.
     */
    title: string;
    /**
     * Optional description of this course work. If set, the description must be
     *  a valid UTF-8 string containing no more than 30,000 characters.
     */
    description: string;
    /**
     * Additional materials. CourseWork must have no more than 20 material items.
     */
    materials: Array<GoogleAppsScript.Classroom.Schema.Material>;
    /**
     * Status of this course work. If unspecified, the default state is
     *  PUBLISHED
     */
    state: CourseWorkState;
    /**
     * Optional date, in UTC, that submissions for this course work are due.
     *  This must be specified if dueTime is specified.
     */
    dueDate: GoogleAppsScript.Classroom.Schema.Date;
    /**
     * Optional time of day, in UTC, that submissions for this course work are
     *  due. This must be specified if dueDate is specified.
     */
    dueTime: TimeOfDay;
    /**
     * Optional timestamp when this course work is scheduled to be published. A
     *  timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds.
     *  Example: "2014-10-02T15:01:23.045123456Z".
     */
    scheduledTime: string;
    /**
     * Maximum grade for this course work. If zero or unspecified, this
     *  assignment is considered ungraded. This must be a non-negative integer
     *  value.
     */
    maxPoints: number;
    /**
     * Type of this course work. The type is set when the course work is
     *  created and cannot be changed.
     */
    workType: CourseWorkType;
    /**
     * Assignee mode of the coursework. If unspecified, the default value is
     *  ALL_STUDENTS.
     */
    assigneeMode: AssigneeMode;
    /**
     * Identifiers of students with access to the coursework. This field is set
     *  only if assigneeMode is INDIVIDUAL_STUDENTS. If the assigneeMode is
     *  INDIVIDUAL_STUDENTS, then only students specified in this field will be
     *  assigned the coursework.
     */
    individualStudentsOptions: GoogleAppsScript.Classroom.Schema.IndividualStudentsOptions;
    /**
     * Setting to determine when students are allowed to modify submissions.
     *  If unspecified, the default value is MODIFIABLE_UNTIL_TURNED_IN.
     */
    submissionModificationMode: SubmissionModificationMode;
    /**
     * Identifier for the topic that this coursework is associated with. Must
     *  match an existing topic in the course.
     */
    topicId: string;
    /**
     * Multiple choice question details. For read operations, this field is
     *  populated only when workType is MULTIPLE_CHOICE_QUESTION. For write
     *  operations, this field must be specified when creating course work with
     *  a workType of MULTIPLE_CHOICE_QUESTION, and it must not be set
     *  otherwise.
     */
    multipleChoiceQuestion: GoogleAppsScript.Classroom.Schema.MultipleChoiceQuestion;
};
