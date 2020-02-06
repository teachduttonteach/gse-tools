/**
 * Whether the Course Work has been published or not
 */
export enum CourseWorkState {
  None = 'COURSE_WORK_STATE_UNSPECIFIED',
  Published = 'PUBLISHED',
  Draft = 'DRAFT',
  Deleted = 'DELETED'
}

/**
 * If the course work is an assignment or question
 */
export enum CourseWorkType {
  None = 'COURSE_WORK_TYPE_UNSPECIFIED',
  Assignment = 'ASSIGNMENT',
  ShortAnswer = 'SHORT_ANSWER_QUESTION',
  MultipleChoice = 'MULTIPLE_CHOICE_QUESTION'
}

/**
 * If the announcement is published or not
 */
export enum AnnouncementState {
  None = 'ANNOUNCEMENT_STATE_UNSPECIFIED',
  Published = 'PUBLISHED',
  Draft = 'DRAFT',
  Deleted = 'DELETED'
}

/**
 * If we're assigning to all of the students or some of them
 */
export enum AssigneeMode {
  None = 'ASSIGNEE_MODE_UNSPECIFIED',
  All = 'ALL_STUDENTS',
  IndividualStudents = 'INDIVIDUAL_STUDENTS'
}

/**
 * How submissions can be modified
 */
export enum SubmissionModificationMode {
  None =
    'SUBMISSION_MODIFICATION_MODE_UNSPECIFIED',
  ModifiableUntilTurnedIn = 'MODIFIABLE_UNTIL_TURNED_IN',
  Modifiable = 'MODIFIABLE'
}
