/// <reference types="google-apps-script" />
/**
 * Type to hold associated class materials
 */
export declare type CourseMaterial = {
    /**
     * title of the associated material
     */
    title: string;
    /**
     * url to the file in Drive (optional)
     */
    file?: string;
    /**
     * YouTube link to the video (optional)
     */
    video?: string;
    /**
     * url of the link (optional)
     */
    link?: string;
    /**
     * url to the form in Drive (optional)
     */
    form?: string;
};
/**
 * Convert raw materials to Google Classroom Materials
 *
 * @param {Array<CourseMaterial>} materials the raw materials to convert
 * @return {Array<GoogleAppsScript.Classroom.Schema.Material>} the list of
 *  course materials
 */
export declare function addCourseMaterials(materials: Array<CourseMaterial>): Array<GoogleAppsScript.Classroom.Schema.Material>;
