/**
 * Convert raw materials to Google Classroom Materials
 *
 * @param {Array<CourseMaterial>} materials the raw materials to convert
 * @return {Array<GoogleAppsScript.Classroom.Schema.Material>} the list of
 *  course materials
 */
export function addCourseMaterials(materials) {
    const materialList = [];
    for (const m of materials) {
        const newMaterial = {};
        if (m.file != undefined) {
            newMaterial.driveFile =
                {};
            newMaterial.driveFile.driveFile =
                {};
            newMaterial.driveFile.driveFile.title = m.title;
            newMaterial.driveFile.driveFile.id = m.file;
        }
        else if (m.form != undefined) {
            newMaterial.form = {};
            newMaterial.form.title = m.title;
            newMaterial.form.formUrl = m.form;
        }
        else if (m.link != undefined) {
            newMaterial.link = {};
            newMaterial.link.title = m.title;
            newMaterial.link.url = m.link;
        }
        else if (m.video != undefined) {
            newMaterial.youtubeVideo =
                {};
            newMaterial.youtubeVideo.title = m.title;
            newMaterial.youtubeVideo.alternateLink = m.video;
        }
        materialList.push(newMaterial);
    }
    return materialList;
}
