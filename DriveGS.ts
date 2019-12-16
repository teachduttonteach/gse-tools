class DriveGS {
  getRandomPicture = function(folder: string) {
    if (folder as string) {
      let dailyPicturesFolder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(folder);
      if (dailyPicturesFolder as GoogleAppsScript.Drive.Folder) {
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
        } else {
          throw new Error("No pictures found in Drive.getRandomPicture");
        }
      } else {
        throw new Error("Could not find folder in Drive.getRandomPicture");
      }
    } else {
      throw new Error("Folder must be defined in Drive.getRandomPicture");
    }
  };
  
  getImageBlob = function(name: string) {
    if (name as string) {
      if (DriveApp.getFileById(name)) {
        switch (DriveApp.getFileById(name).getMimeType()) {
          case "image/jpeg":
          case "image/png":
          case "image/gif":
            return DriveApp.getFileById(name).getBlob();
        }
      }
      return null;
    } else {
      throw new Error("Name needs to be defined for Drive.getImageBlob");
    }
  };
  
  getOrCreateFile = function(fileName: string, templateName: string): GoogleAppsScript.Drive.File { 
    if ((fileName as string) && (templateName as string)) {
      let fileObject: GoogleAppsScript.Drive.FileIterator = DriveApp.getFilesByName(fileName);
      if (!fileObject.hasNext()) {
        return DriveApp.getFilesByName(templateName).next().makeCopy(fileName);
      } else {
        return fileObject.next();
      }
    } else {
      throw new Error("File name and template name need to be defined for Drive.getOrCreateFile");
    }
  };
};