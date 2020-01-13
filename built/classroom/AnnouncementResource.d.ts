/// <reference types="google-apps-script" />
import { AnnouncementState, AssigneeMode } from './Enums';
/**
 * Announcements associated with a class in Google Classroom
 */
export declare type AnnouncementResource = {
    /**
     * Description of this announcement. The text must be a valid UTF-8 string
     *  containing no more than 30,000 characters.
     */
    text: string;
    /**
     * Additional materials. Announcements must have no more than 20 material
     *  items.
     */
    materials: Array<GoogleAppsScript.Classroom.Schema.Material>;
    /**
     * Status of this announcement. If unspecified, the default state is
     *  PUBLISHED.
     */
    state: AnnouncementState;
    /**
     * Optional timestamp when this announcement is scheduled to be published. A
     *  timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example:
     *  "2014-10-02T15:01:23.045123456Z".
     */
    scheduledTime: string;
    /**
     * Assignee mode of the announcement. If unspecified, the default value is
     *  ALL_STUDENTS.
     */
    assigneeMode: AssigneeMode;
    /**
     * Identifiers of students with access to the announcement. This field is
     *  set only if assigneeMode is INDIVIDUAL_STUDENTS. If the assigneeMode is
     *  INDIVIDUAL_STUDENTS, then only students specified in this field will be
     *  able to see the announcement.
     */
    individualStudentsOptions: GoogleAppsScript.Classroom.Schema.IndividualStudentsOptions;
};
