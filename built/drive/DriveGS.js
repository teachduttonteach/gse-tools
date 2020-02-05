import { MimeTypes } from '../enums/MimeTypes';
const ValidImageTypes = ['image/png', 'image/gif', 'image/jpeg'];
/**
 * Gets a random picture from a specified folder
 *
 * @param {DriveGS} obj the Drive object
 * @param {string} folder the id of the folder that contains random pictures
 *
 * @return {GoogleAppsScript.Base.Blob} the picture as a Google Blob
 */
export function getRandomPicture(obj, folder) {
    return obj.getRandomPicture(folder);
}
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
export function getImageBlob(obj, id, isUrl = false) {
    return obj.getImageBlob(id, isUrl);
}
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
export function getOrCreateFileFromTemplateByName(obj, fileName, templateName) {
    return obj.getOrCreateFileFromTemplateByName(fileName, templateName);
}
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
export function getOrCreateFileFromTemplateById(obj, fileId, templateId) {
    return obj.getOrCreateFileFromTemplateById(fileId, templateId);
}
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
export function getOrCreateFileByName(obj, fileName, mimeType = MimeTypes.DOCS) {
    return obj.getOrCreateFileByName(fileName, mimeType);
}
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
export function getOrCreateFileById(obj, fileId, fileName, mimeType = MimeTypes.DOCS) {
    return obj.getOrCreateFileById(fileId, fileName, mimeType);
}
/**
 * Class to provide access and functions to Google Drive
 */
export class DriveGS {
    /**
     * Empty constructor for code consistency
     */
    constructor() {
    }
    /**
     * Gets a random picture from a specified folder
     *
     * @param {string} folder the id of the folder that contains random pictures
     *
     * @return {GoogleAppsScript.Base.Blob} the picture as a Google Blob
     */
    getRandomPicture(folder) {
        if (folder == null) {
            throw new Error('Folder must be defined in Drive.getRandomPicture');
        }
        const dailyPicturesFolder = DriveApp.getFolderById(folder);
        if (dailyPicturesFolder == null) {
            throw new Error('Could not find folder in Drive.getRandomPicture');
        }
        const dailyPictures = dailyPicturesFolder.getFiles();
        const tempPictures = [];
        while (dailyPictures.hasNext()) {
            const pic = dailyPictures.next();
            tempPictures.push(pic);
        }
        const allPictures = [];
        for (let i = 0; i < tempPictures.length; i++) {
            if (ValidImageTypes.indexOf(tempPictures[i].getMimeType()) !== -1) {
                allPictures.push(tempPictures[i].getAs('image/png'));
            }
        }
        if (allPictures.length == 0) {
            throw new Error('No pictures found in Drive.getRandomPicture');
        }
        return allPictures[Math.floor(Math.random() *
            Math.floor(allPictures.length))];
    }
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
    getImageBlob(id, isUrl = false) {
        if (id == undefined) {
            throw new Error('Id needs to defined for DriveGS.getImageBlob()');
        }
        if (isUrl)
            id = id.split('=')[1];
        const thisFile = DriveApp.getFileById(id);
        if (thisFile == null) {
            throw new Error('Could not file of id ' + id +
                ' in DriveGS.getImageBlob()');
        }
        if (ValidImageTypes.indexOf(thisFile.getMimeType()) != -1) {
            return thisFile.getBlob();
        }
        return false;
    }
    /**
     * Determines if a file (by name) exists; if it doesn't creates it from a
     *  template, then return the file in either case
     *
     * @param {string} fileName the name of the file
     * @param {string} templateName the name of the template
     *
     * @return {GoogleAppsScript.Drive.File} the file as a Google Object
     */
    getOrCreateFileFromTemplateByName(fileName, templateName) {
        if (fileName == null || templateName == null) {
            throw new Error('File name and template name need to be defined for ' +
                'Drive.getOrCreateFile');
        }
        const fileObject = DriveApp.getFilesByName(fileName);
        if (fileObject.hasNext())
            return fileObject.next();
        const templateFile = DriveApp.getFilesByName(templateName);
        if (templateFile.hasNext())
            return templateFile.next().makeCopy(fileName);
        throw new Error('Could not find file or template in DriveGS.' +
            'getOrCreateFileFromTemplateByName()');
    }
    /**
     * Determines if a file (by id) exists; if it doesn't creates it from a
     *  template, then return the file in either case
     *
     * @param {string} fileId the name of the file
     * @param {string} templateId the name of the template
     *
     * @return {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileFromTemplateById(fileId, templateId) {
        if (fileId == null || templateId == null) {
            throw new Error('File id ' + 'and template id need to be defined for ' +
                'DriveGS.getOrCreateFileFromTemplateById()');
        }
        let fileObject;
        try {
            fileObject = DriveApp.getFileById(fileId);
        }
        catch (e) {
            const templateFile = DriveApp.getFileById(templateId);
            if (templateFile == null) {
                throw new Error('Could not find template ' +
                    'file in DriveGS.getOrCreateFileFromTemplateById()');
            }
            return templateFile.makeCopy();
        }
        return fileObject;
    }
    /**
     * Determines if a file (by name) exists; if it doesn't creates it from a
     *  template, then return the file in either case
     *
     * @param {string} fileName the name of the file
     * @param {string} mimeType the MimeType of the file
     *
     * @return {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileByName(fileName, mimeType = MimeTypes.DOCS) {
        if (fileName == null) {
            throw new Error('File name needs to be defined ' +
                'for Drive.getOrCreateFileByName');
        }
        let fileObject = DriveApp.getFilesByName(fileName);
        if (!fileObject.hasNext()) {
            this._createFile(fileName, mimeType);
            fileObject = DriveApp.getFilesByName(fileName);
        }
        return fileObject.next();
    }
    /**
     * Creates a file with a particular MimeType
     *
     * @param {string} fileName name of the file
     * @param {string} mimeType the MimeType of the file
     * @return {string} the ID of the created file
     */
    _createFile(fileName, mimeType) {
        switch (mimeType) {
            case MimeTypes.APPS_SCRIPT:
            case MimeTypes.AUDIO:
            case MimeTypes.DRAWING:
            case MimeTypes.DRIVE_FOLDER:
            case MimeTypes.DRIVE_SDK:
            case MimeTypes.FUSION:
            case MimeTypes.MAPS:
            case MimeTypes.PHOTO:
            case MimeTypes.SITES:
            case MimeTypes.VIDEO:
                throw new Error('Cannot create file of type ' + mimeType +
                    ' from DriveGS.getOrCreateFileByName()');
            case MimeTypes.DOCS:
                return DocumentApp.create(fileName).getId();
            case MimeTypes.FORMS:
                return FormApp.create(fileName).getId();
            case MimeTypes.SHEETS:
                return SpreadsheetApp.create(fileName).getId();
            case MimeTypes.SLIDES:
                return SlidesApp.create(fileName).getId();
            default:
                return DriveApp.createFile(fileName, '').getId();
        }
    }
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
    getOrCreateFileById(fileId, newFileName = 'Untitled', mimeType = MimeTypes.DOCS) {
        if (fileId == null) {
            throw new Error('File id and file name need to be defined for ' +
                'Drive.getOrCreateFileById');
        }
        let fileObject;
        try {
            fileObject = DriveApp.getFileById(fileId);
        }
        catch (e) {
            return DriveApp.getFileById(this._createFile(newFileName, mimeType));
        }
        return fileObject;
    }
}
