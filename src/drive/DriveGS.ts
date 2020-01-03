import { MimeTypes } from "../MimeTypes";

let ValidImageTypes: Array<string> = ["image/png", "image/gif", "image/jpeg"];

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
  getRandomPicture(folder: string): GoogleAppsScript.Base.Blob {
    if (folder == null) throw new Error("Folder must be defined in Drive.getRandomPicture");
    
    let dailyPicturesFolder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(folder);
    if (dailyPicturesFolder == null) throw new Error("Could not find folder in Drive.getRandomPicture");
    
    let dailyPictures: GoogleAppsScript.Drive.FileIterator = dailyPicturesFolder.getFiles();
    let allPictures: Array<GoogleAppsScript.Base.Blob> = [];
    while (dailyPictures.hasNext()) {
      let pic: GoogleAppsScript.Drive.File = dailyPictures.next();
      if (pic.getMimeType() in ValidImageTypes) {
        allPictures.push(pic.getAs("image/png"));
      }
    }
    
    if (allPictures.length == 0) throw new Error("No pictures found in Drive.getRandomPicture");
    return allPictures[Math.floor(Math.random() * Math.floor(allPictures.length))];
  };
  
  /**
   * Get the data (blob) of a specified image
   * 
   * @param id the id of the image or false if it is an invalid image
   * 
   * @returns {GoogleAppsScript.Base.Blob | boolean} the image blob or False if it could not be created
   */
  getImageBlob(id: string): GoogleAppsScript.Base.Blob | boolean {
    if (id == undefined) throw new Error("Id needs to defined for DriveGS.getImageBlob()");
    if (DriveApp.getFileById(id) == null) throw new Error("Could not file of id " + id + " in DriveGS.getImageBlob()");
    if (DriveApp.getFileById(id).getMimeType() in ValidImageTypes) return DriveApp.getFileById(id).getBlob();
    return false;
  };
  
  /**
   * Determines if a file (by name) exists; if it doesn't creates it from a template, then return the file in either case
   * 
   * @param fileName the name of the file
   * @param templateName the name of the template
   * 
   * @returns {GoogleAppsScript.Drive.File} the file as a Google Object
   */
  getOrCreateFileFromTemplateByName(fileName: string, templateName: string): GoogleAppsScript.Drive.File { 
    if ((fileName == null) || (templateName == null)) throw new Error("File name and template name need to be defined for Drive.getOrCreateFile");
    let fileObject: GoogleAppsScript.Drive.FileIterator = DriveApp.getFilesByName(fileName);
    if (!fileObject.hasNext()) {
      let templateFile = DriveApp.getFilesByName(templateName);
      if (templateFile.hasNext()) {
        return templateFile.next().makeCopy(fileName);
      }
    }
    return fileObject.next();
  };

  /**
   * Determines if a file (by id) exists; if it doesn't creates it from a template, then return the file in either case
   * 
   * @param fileId the name of the file
   * @param templateId the name of the template
   * 
   * @returns {GoogleAppsScript.Drive.File} the file as a Google object
   */
  getOrCreateFileFromTemplateById(fileId: string, templateId: string): GoogleAppsScript.Drive.File { 
    if ((fileId == null) || (templateId == null)) throw new Error("File id and template id need to be defined for Drive.getOrCreateFileFromTemplateById");
    let fileObject: GoogleAppsScript.Drive.File = DriveApp.getFileById(fileId);
    if (fileObject == null) {
      let templateFile = DriveApp.getFileById(templateId);
      if (templateFile == null) throw new Error("Could not find template file in DriveGS.getOrCreateFileFromTemplateById");
      return templateFile.makeCopy();
    }
    return fileObject;
  };

  /**
   * Determines if a file (by name) exists; if it doesn't creates it from a template, then return the file in either case
   * 
   * @param fileName the name of the file
   *  
   * @returns {GoogleAppsScript.Drive.File} the file as a Google object
   */

  // TODO: Need to define what sort of file we're creating
  getOrCreateFileByName(fileName: string, mimeType: string = MimeTypes.DOCS): GoogleAppsScript.Drive.File { 
    if (fileName == null) throw new Error("File name needs to be defined for Drive.getOrCreateFileByName");
    let fileObject: GoogleAppsScript.Drive.FileIterator = DriveApp.getFilesByName(fileName);
    if (!fileObject.hasNext()) {
      this._createFile(fileName, "", mimeType);
      fileObject = DriveApp.getFilesByName(fileName);
    }
    return fileObject.next();
  };

  private _createFile(fileName: string, content: string, mimeType: string): string {
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
        throw new Error("Cannot create file of type " + mimeType + " from DriveGS.getOrCreateFileByName()");
      case MimeTypes.DOCS:
        return DocumentApp.create(fileName).getId();
      case MimeTypes.FORMS:
        return FormApp.create(fileName).getId();
      case MimeTypes.SHEETS:
        return SpreadsheetApp.create(fileName).getId();
      case MimeTypes.SLIDES:
        return SlidesApp.create(fileName).getId();
      default:
        return DriveApp.createFile(fileName, "").getId();
    }
  }

  /**
   * Determines if a file (by id) exists; if it doesn't creates it from a template, then return the file in either case
   * 
   * @param fileId the id of the file
   * @param fileName the name of the new file
   * 
   * @returns {GoogleAppsScript.Drive.File} the file as a Google object
   */
  getOrCreateFileById(fileId: string, fileName: string, mimeType: string = MimeTypes.DOCS): GoogleAppsScript.Drive.File { 
    if ((fileId == null) || (fileName == null)) throw new Error("File id and file name need to be defined for Drive.getOrCreateFileById"); 
    let fileObject: GoogleAppsScript.Drive.File = DriveApp.getFileById(fileId);
    if (fileObject == null) {
      fileObject = DriveApp.getFileById(this._createFile(fileName, "", mimeType));
    }
    return fileObject;
  };  
};