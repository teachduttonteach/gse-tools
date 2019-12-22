"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to provide access and functions to Google Drive
 */
var DriveGS = /** @class */ (function () {
    function DriveGS() {
    }
    /**
     * Gets a random picture from a specified folder
     *
     * @param folder the id of the folder that contains random pictures
     *
     * @returns the picture
     */
    DriveGS.prototype.getRandomPicture = function (folder) {
        if (folder) {
            var dailyPicturesFolder = DriveApp.getFolderById(folder);
            if (dailyPicturesFolder) {
                var dailyPictures = dailyPicturesFolder.getFiles();
                var allPictures = [];
                while (dailyPictures.hasNext()) {
                    var pic = dailyPictures.next();
                    if (["image/png", "image/gif", "image/jpeg"].indexOf(pic.getMimeType()) >= 0) {
                        allPictures.push(pic.getAs("image/png"));
                    }
                }
                if (allPictures.length > 0) {
                    return allPictures[Math.floor(Math.random() * Math.floor(allPictures.length))];
                }
                else {
                    throw new Error("No pictures found in Drive.getRandomPicture");
                }
            }
            else {
                throw new Error("Could not find folder in Drive.getRandomPicture");
            }
        }
        else {
            throw new Error("Folder must be defined in Drive.getRandomPicture");
        }
    };
    ;
    /**
     * Get the data (blob) of a specified image
     *
     * @param id the id of the image or false if it is an invalid image
     *
     * @returns the image blob
     */
    DriveGS.prototype.getImageBlob = function (id) {
        if (id == undefined)
            throw new Error("Id needs to defined for DriveGS.getImageBlob()");
        if (DriveApp.getFileById(id) == null)
            throw new Error("Could not file of id " + id + " in DriveGS.getImageBlob()");
        var t_blob;
        switch (DriveApp.getFileById(id).getMimeType()) {
            case "image/jpeg":
            case "image/png":
            case "image/gif":
                return DriveApp.getFileById(id).getBlob();
        }
        return false;
    };
    ;
    /**
     * Determines if a file (by name) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileName the name of the file
     * @param templateName the name of the template
     *
     * @returns the file
     */
    DriveGS.prototype.getOrCreateFileFromTemplateByName = function (fileName, templateName) {
        if (fileName && templateName) {
            var fileObject = DriveApp.getFilesByName(fileName);
            if (!fileObject.hasNext()) {
                return DriveApp.getFilesByName(templateName).next().makeCopy(fileName);
            }
            else {
                return fileObject.next();
            }
        }
        else {
            throw new Error("File name and template name need to be defined for Drive.getOrCreateFile");
        }
    };
    ;
    /**
     * Determines if a file (by id) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileId the name of the file
     * @param templateId the name of the template
     *
     * @returns the file
     */
    DriveGS.prototype.getOrCreateFileFromTemplateById = function (fileId, templateId) {
        if (fileId && templateId) {
            var fileObject = DriveApp.getFileById(fileId);
            if (fileObject == null) {
                var templateFile = DriveApp.getFileById(templateId);
                if (templateFile == null) {
                    throw new Error("Could not find template file in DriveGS.getOrCreateFileFromTemplateById");
                }
                else {
                    return templateFile.makeCopy();
                }
            }
            else {
                return fileObject;
            }
        }
        else {
            throw new Error("File id and template id need to be defined for Drive.getOrCreateFileFromTemplateById");
        }
    };
    ;
    /**
     * Determines if a file (by name) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileName the name of the file
     *
     * @returns the file
     */
    DriveGS.prototype.getOrCreateFileByName = function (fileName) {
        if (fileName) {
            var fileObject = DriveApp.getFilesByName(fileName);
            if (!fileObject.hasNext()) {
                return DriveApp.createFile(fileName, "");
            }
            else {
                return fileObject.next();
            }
        }
        else {
            throw new Error("File name needs to be defined for Drive.getOrCreateFileByName");
        }
    };
    ;
    /**
     * Determines if a file (by id) exists; if it doesn't creates it from a template, then return the file in either case
     *
     * @param fileId the id of the file
     * @param fileName the name of the new file
     *
     * @returns the file
     */
    DriveGS.prototype.getOrCreateFileById = function (fileId, fileName) {
        if (fileId && fileName) {
            var fileObject = DriveApp.getFileById(fileId);
            if (fileObject == null) {
                return DriveApp.createFile(fileName, "");
            }
            else {
                return fileObject;
            }
        }
        else {
            throw new Error("File id and file name need to be defined for Drive.getOrCreateFileById");
        }
    };
    ;
    return DriveGS;
}());
exports.DriveGS = DriveGS;
;
