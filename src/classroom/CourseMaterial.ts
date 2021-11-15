/**
 * Type to hold associated class materials
 */
export type CourseMaterial = {
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
export function addCourseMaterials(
  materials: Array<CourseMaterial>,
): Array<GoogleAppsScript.Classroom.Schema.Material> {
  const materialList: Array<GoogleAppsScript.Classroom.Schema.Material> = [];

  for (const m of materials) {
    const newMaterial: GoogleAppsScript.Classroom.Schema.Material = {} as GoogleAppsScript.Classroom.Schema.Material;
    if (m.file != undefined) {
      newMaterial.driveFile = {} as GoogleAppsScript.Classroom.Schema.SharedDriveFile;
      newMaterial.driveFile.driveFile = {} as GoogleAppsScript.Classroom.Schema.DriveFile;
      newMaterial.driveFile.driveFile.title = m.title;
      newMaterial.driveFile.driveFile.id = m.file;
    } else if (m.form != undefined) {
      newMaterial.form = {} as GoogleAppsScript.Classroom.Schema.Form;
      newMaterial.form.title = m.title;
      newMaterial.form.formUrl = m.form;
    } else if (m.link != undefined) {
      newMaterial.link = {} as GoogleAppsScript.Classroom.Schema.Link;
      newMaterial.link.title = m.title;
      newMaterial.link.url = m.link;
    } else if (m.video != undefined) {
      newMaterial.youtubeVideo = {} as GoogleAppsScript.Classroom.Schema.YouTubeVideo;
      newMaterial.youtubeVideo.title = m.title;
      newMaterial.youtubeVideo.alternateLink = m.video;
    }
    materialList.push(newMaterial);
  }
  return materialList;
}
