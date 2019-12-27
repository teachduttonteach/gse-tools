let ValidImageTypes = ["image/png", "image/gif", "image/jpeg"];
/**
 * Class to provide access and functions to Google Drive
 */
export class DriveGS {
    /**
     * Gets a random picture from a specified folder
     *
     * @param folder the id of the folder that contains random pictures
     *
     * @returns {GoogleAppsScript.Base.Blob} the picture as a Google Blob
     */
    getRandomPicture(folder) {
        if (folder == null)
            throw new Error("Folder must be defined in Drive.getRandomPicture");
        let dailyPicturesFolder = DriveApp.getFolderById(folder);
        if (dailyPicturesFolder == null)
            throw new Error("Could not find folder in Drive.getRandomPicture");
        let dailyPictures = dailyPicturesFolder.getFiles();
        let allPictures = [];
        while (dailyPictures.hasNext()) {
            let pic = dailyPictures.next();
            if (pic.getMimeType() in ValidImageTypes) {
                allPictures.push(pic.getAs("image/png"));
            }
        }
        if (allPictures.length == 0)
            throw new Error("No pictures found in Drive.getRandomPicture");
        return allPictures[Math.floor(Math.random() * Math.floor(allPictures.length))];
    }
    ;
    /**
     * Get the data (blob) of a specified image
     *
     * @param id the id of the image or false if it is an invalid image
     *
     * @returns {GoogleAppsScript.Base.Blob | boolean} the image blob or False if it could not be created
     */
    getImageBlob(id) {
        if (id == undefined)
            throw new Error("Id needs to defined for DriveGS.getImageBlob()");
        if (DriveApp.getFileById(id) == null)
            throw new Error("Could not file of id " + id + " in DriveGS.getImageBlob()");
        if (DriveApp.getFileById(id).getMimeType() in ValidImageTypes)
            return DriveApp.getFileById(id).getBlob();
        return false;
    }
    ;
    /**
     * Determines if a file (by name) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileName the name of the file
     * @param templateName the name of the template
     *
     * @returns {GoogleAppsScript.Drive.File} the file as a Google Object
     */
    getOrCreateFileFromTemplateByName(fileName, templateName) {
        if ((fileName == null) || (templateName == null))
            throw new Error("File name and template name need to be defined for Drive.getOrCreateFile");
        let fileObject = DriveApp.getFilesByName(fileName);
        if (!fileObject.hasNext()) {
            let templateFile = DriveApp.getFilesByName(templateName);
            if (templateFile.hasNext()) {
                return templateFile.next().makeCopy(fileName);
            }
        }
        return fileObject.next();
    }
    ;
    /**
     * Determines if a file (by id) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileId the name of the file
     * @param templateId the name of the template
     *
     * @returns {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileFromTemplateById(fileId, templateId) {
        if ((fileId == null) || (templateId == null))
            throw new Error("File id and template id need to be defined for Drive.getOrCreateFileFromTemplateById");
        let fileObject = DriveApp.getFileById(fileId);
        if (fileObject == null) {
            let templateFile = DriveApp.getFileById(templateId);
            if (templateFile == null)
                throw new Error("Could not find template file in DriveGS.getOrCreateFileFromTemplateById");
            return templateFile.makeCopy();
        }
        return fileObject;
    }
    ;
    /**
     * Determines if a file (by name) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileName the name of the file
     *
     * @returns {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileByName(fileName) {
        if (fileName == null)
            throw new Error("File name needs to be defined for Drive.getOrCreateFileByName");
        let fileObject = DriveApp.getFilesByName(fileName);
        if (!fileObject.hasNext())
            return DriveApp.createFile(fileName, "");
        return fileObject.next();
    }
    ;
    /**
     * Determines if a file (by id) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileId the id of the file
     * @param fileName the name of the new file
     *
     * @returns {GoogleAppsScript.Drive.File} the file as a Google object
     */
    getOrCreateFileById(fileId, fileName) {
        if ((fileId == null) || (fileName == null))
            throw new Error("File id and file name need to be defined for Drive.getOrCreateFileById");
        let fileObject = DriveApp.getFileById(fileId);
        if (fileObject == null)
            return DriveApp.createFile(fileName, "");
        return fileObject;
    }
    ;
}
;
