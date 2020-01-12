import {TimeOfDay} from './TimeOfDay'
import {AssigneeMode, CourseWorkState, CourseWorkType, SubmissionModificationMode} from './Enums'

/**
 * Type to hold all of the coursework in an object
 */
export type CourseWorkResource = {
  courseId: string,
  id: string,
  title: string,
  description: string,
  materials: Array<GoogleAppsScript.Classroom.Schema.Material>,
  state: CourseWorkState,
  alternateLink: string,
  creationTime: string,
  updateTime: string,
  dueDate: GoogleAppsScript.Classroom.Schema.Date,
  dueTime: TimeOfDay,
  scheduledTime: string,
  maxPoints: number,
  workType: CourseWorkType,
  associatedWithDeveloper: boolean,
  assigneeMode: AssigneeMode,
  individualStudentsOptions: GoogleAppsScript.Classroom.Schema.IndividualStudentsOptions,
  submissionModificationMode: SubmissionModificationMode,
  creatorUserId: string,
  topicId: string,

  // Union field details can be only one of the following:
  assignment: GoogleAppsScript.Classroom.Schema.Assignment,
  multipleChoiceQuestion: GoogleAppsScript.Classroom.Schema.MultipleChoiceQuestion
  // End of list of possible types for union field details.
}
