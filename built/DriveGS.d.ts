/// <reference types="google-apps-script" />
/**
 * Class to provide access and functions to Google Drive
 */
export declare class DriveGS {
    /**
     * Gets a random picture from a specified folder
     *
     * @param folder the id of the folder that contains random pictures
     *
     * @returns {GoogleAppsScript.Base.Blob} the picture as a Google Blob
     */
    getRandomPicture(folder: string): GoogleAppsScript.Base.Blob;
    /**
     * Get the data (blob) of a specified image
     *
     * @param id the id of the image or false if it is an invalid image
     *
     * @returns {GoogleAppsScript.Base.Blob | boolean} the image blob or False if it could not be created
     */
    getImageBlob(id: string): GoogleAppsScript.Base.Blob | boolean;
    /**
     * Determines if a file (by name) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileName the name of the file
     * @param templateName the name of the template
     *
     * @returns {GoogleAppsScript.Drive.File} the file as a Google Object
     */
    getOrCreateFileFromTemplateByName(fileName: string, templateName: string): GoogleAppsScript.Drive.File;
    /**
     * Determines if a file (by id) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileId the name of the file
     * @param templateId the name of the template
     *
     * @returns {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileFromTemplateById(fileId: string, templateId: string): GoogleAppsScript.Drive.File;
    /**
     * Determines if a file (by name) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileName the name of the file
     *
     * @returns {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileByName(fileName: string): GoogleAppsScript.Drive.File;
    /**
     * Determines if a file (by id) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileId the id of the file
     * @param fileName the name of the new file
     *
     * @returns {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileById(fileId: string, fileName: string): GoogleAppsScript.Drive.File;
}
