/// <reference types="google-apps-script" />
/**
 * Gets a random picture from a specified folder
 *
 * @param {DriveGS} obj the Drive object
 * @param {string} folder the id of the folder that contains random pictures
 *
 * @return {GoogleAppsScript.Base.Blob} the picture as a Google Blob
 */
export declare function getRandomPicture(obj: DriveGS, folder: string): GoogleAppsScript.Base.Blob;
/**
 * Get the data (blob) of a specified image
 *
 * @param {DriveGS} obj the Drive object
 * @param {string} id the id of the image or false if it is an invalid image
 * @param {boolean} isUrl whether the id is a link to the Google
 *  Drive image
 *
 * @return {GoogleAppsScript.Base.Blob | boolean} the image blob or False
 *  if it could not be created
 */
export declare function getImageBlob(obj: DriveGS, id: string, isUrl?: boolean): GoogleAppsScript.Base.Blob | boolean;
/**
 * Determines if a file (by name) exists; if it doesn't creates it from a
 *  template, then return the file in either case
 *
 * @param {DriveGS} obj the Drive object
 * @param {string} fileName the name of the file
 * @param {string} templateName the name of the template
 *
 * @return {GoogleAppsScript.Drive.File} the file as a Google Object
 */
export declare function getOrCreateFileFromTemplateByName(obj: DriveGS, fileName: string, templateName: string): GoogleAppsScript.Drive.File;
/**
 * Determines if a file (by id) exists; if it doesn't creates it from a
 *  template, then return the file in either case
 *
 * @param {DriveGS} obj the Drive object
 * @param {string} fileId the name of the file
 * @param {string} templateId the name of the template
 *
 * @return {GoogleAppsScript.Drive.File} the file as a Google object
 */
export declare function getOrCreateFileFromTemplateById(obj: DriveGS, fileId: string, templateId: string): GoogleAppsScript.Drive.File;
/**
 * Determines if a file (by name) exists; if it doesn't creates it from a
 *  template, then return the file in either case
 *
 * @param {DriveGS} obj the Drive object
 * @param {string} fileName the name of the file
 * @param {string} mimeType the MimeType of the file
 *
 * @return {GoogleAppsScript.Drive.File} the file as a Google object
 */
export declare function getOrCreateFileByName(obj: DriveGS, fileName: string, mimeType?: string): GoogleAppsScript.Drive.File;
/**
 * Determines if a file (by id) exists; if it doesn't creates it from a
 *  template, then return the file in either case
 *
 * @param {DriveGS} obj the Drive object
 * @param {string} fileId the id of the file
 * @param {string} fileName the name of the new file
 * @param {string} mimeType the MimeType of the file
 *
 * @return {GoogleAppsScript.Drive.File} the file as a Google object
 */
export declare function getOrCreateFileById(obj: DriveGS, fileId: string, fileName: string, mimeType?: string): GoogleAppsScript.Drive.File;
/**
 * Class to provide access and functions to Google Drive
 */
export declare class DriveGS {
    /**
     * Empty constructor for code consistency
     */
    constructor();
    /**
     * Gets a random picture from a specified folder
     *
     * @param {string} folder the id of the folder that contains random pictures
     *
     * @return {GoogleAppsScript.Base.Blob} the picture as a Google Blob
     */
    getRandomPicture(folder: string): GoogleAppsScript.Base.Blob;
    /**
     * Get the data (blob) of a specified image
     *
     * @param {string} id the id of the image or false if it is an invalid image
     * @param {boolean} isUrl whether the id is a link to the Google
     *  Drive image
     *
     * @return {GoogleAppsScript.Base.Blob | boolean} the image blob or False
     *  if it could not be created
     */
    getImageBlob(id: string, isUrl?: boolean): GoogleAppsScript.Base.Blob | false;
    /**
     * Determines if a file (by name) exists; if it doesn't creates it from a
     *  template, then return the file in either case
     *
     * @param {string} fileName the name of the file
     * @param {string} templateName the name of the template
     *
     * @return {GoogleAppsScript.Drive.File} the file as a Google Object
     */
    getOrCreateFileFromTemplateByName(fileName: string, templateName: string): GoogleAppsScript.Drive.File;
    /**
     * Determines if a file (by id) exists; if it doesn't creates it from a
     *  template, then return the file in either case
     *
     * @param {string} fileId the name of the file
     * @param {string} templateId the name of the template
     *
     * @return {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileFromTemplateById(fileId: string, templateId: string): GoogleAppsScript.Drive.File;
    /**
     * Determines if a file (by name) exists; if it doesn't creates it from a
     *  template, then return the file in either case
     *
     * @param {string} fileName the name of the file
     * @param {string} mimeType the MimeType of the file
     *
     * @return {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileByName(fileName: string, mimeType?: string): GoogleAppsScript.Drive.File;
    /**
     * Creates a file with a particular MimeType
     *
     * @param {string} fileName name of the file
     * @param {string} mimeType the MimeType of the file
     * @return {string} the ID of the created file
     */
    private _createFile;
    /**
     * Determines if a file (by id) exists; if it doesn't, creates it from
     *  scratch, then return the file in either case
     *
     * @param {string} fileId the id of the file
     * @param {string} newFileName the name of the new file
     * @param {string} mimeType the MimeType of the file
     *
     * @return {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileById(fileId: string, newFileName?: string, mimeType?: string): GoogleAppsScript.Drive.File;
}
