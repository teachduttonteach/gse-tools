import {ClassInfo} from "../classroom/ClassInfo"
import {Work} from "../classroom/Work"
import {Material} from "../classroom/Material"
import {DocsGS} from "../docs/DocsGS"
import {DocLevels} from "../docs/DocLevels"
import {WriteDocsParams} from "WriteDocsParams"

/**
 * Class to write a Google Document 
 * 
 */
export class ClassroomDocsGS extends DocsGS {
  /** 
   * Writes a document from the Classroom info
   * 
   * @param topic the topic object that contains class info
   * @param options the options for displaying the info
   * 
   * @returns {DocsGS} the object for chaining
   */
  writeClassroomDocuments(data: ClassInfo, topicName: string, options?: WriteDocsParams): DocsGS {
    // Expand options
    if (options == undefined) options = {} as WriteDocsParams;
    let {
      displayAnnouncements = 1,
      displayCoursework = true,
      docTitle = undefined
    } = options;

    // Clear the body and get the doc title
    this.clearBody();
    let t_title = docTitle;
    if (t_title == undefined) t_title = data.getName(topicName);
    let t_level = DocLevels("T");
    if ((t_title == undefined) || (t_level == undefined)) throw new Error("Title (" + t_title + ") or level (" + t_level + ") not defined in DocsGS.writeClassroomDocuments()");

    // Display the title by removing the first child if necessary
    let t_body = this._docObject.getBody();
    let t_child = t_body.getChild(0);
    if (t_child.getType() == DocumentApp.ElementType.LIST_ITEM) {
      t_body.appendParagraph(t_title).setHeading(t_level);
      t_child.removeFromParent();
    }
    else t_child.asParagraph().setHeading(t_level).setText(t_title);

    // Display the given number of announcements
    if (displayAnnouncements) {
      let t_announcements = data.getAnnouncements();
      if (t_announcements == undefined) throw new Error("Announcement titles undefined in DocsGS.writeClassroomDocuments()");
      for (let a = 0; a < displayAnnouncements; a++) {
        this.addText(t_announcements[a], "Normal");
      }
    }

    // Display the coursework
    if (displayCoursework) {
      // Get the coursework for the topic
      let t_courseWork = data.getCourseWork(topicName);
      let t_titles = t_courseWork.work;
      let t_level = t_courseWork.level;
      if ((t_level == undefined) || (t_titles == undefined)) throw new Error("Coursework titles undefined in DocsGS.writeClassroomDocuments()");

      // For each of the pieces of course work ...
      for (let courseWork of t_titles) {
        this._displayCourseWork(courseWork, options);
      }
    }
    return this;
  }

  private _displayCourseWork(courseWork: Work, options: WriteDocsParams): void {
    let {
      displayCourseworkTitle = true,
      displayDueDate = true,
      displayDescription = true,
      displayMaterials = true,
    } = options;

    // Display the title, due date and description
    if (displayCourseworkTitle) this.addText(courseWork.title, 2);
    if (displayDueDate && courseWork.dueDate) {
      this.addText(courseWork.dueDate, 3);
    }
    if (displayDescription && courseWork.description) {
      this.addText(courseWork.description, "Normal");
    }

    // Display the materials if they exist
    if (displayMaterials && (courseWork.materials != null) && (courseWork.materials.length > 0)) {
      this._displayMaterial(courseWork.materials, options);
    }
  }

  private _displayMaterial(materials: Array<Material>, options: WriteDocsParams): void {
    let {
      displayFiles = true,
      displayForms = true,
      displayLinks = true,
      displayVideos = true,
    } = options;

    this.addText("Materials:", "Normal");
    for (let material of materials) {
      if (displayFiles && material.file) {
        this.appendItem("File", material.title, material.file);
      } else if (displayVideos && material.video) {
        this.appendItem("Video", material.title, material.video);
      } else if (displayLinks && material.link) {
        this.appendItem("Link", material.title, material.link);
      } else if (displayForms && material.form) {
        this.appendItem("Form", material.title, material.form);
      }
    }

  }
};