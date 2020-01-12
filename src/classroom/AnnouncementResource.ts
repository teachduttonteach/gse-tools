import { Material } from './Material';
import {AnnouncementState, AssigneeMode} from './Enums'

/**
 * Type to hold all of the coursework in an object
 */
export type AnnouncementResource = {
  courseId: string,
  id: string,
  text: string,
  materials: Array<GoogleAppsScript.Classroom.Schema.Material>,
  state: AnnouncementState,
  alternateLink: string,
  creationTime: string,
  updateTime: string,
  scheduledTime: string,
  assigneeMode: AssigneeMode,
  individualStudentsOptions: GoogleAppsScript.Classroom.Schema.IndividualStudentsOptions,
  creatorUserId: string
};
