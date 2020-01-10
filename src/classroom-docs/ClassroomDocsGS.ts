import { ClassInfo } from '../classroom/ClassInfo';
import { Work } from '../classroom/Work';
import { Material } from '../classroom/Material';
import { DocsGS } from '../docs/DocsGS';
import { docLevels } from '../docs/DocLevels';
import { WriteDocsParams } from 'WriteDocsParams';

/**
 * Writes a document from the Classroom info
 *
 * @param {ClassroomDocsGS} obj the ClassroomDocs object
 * @param {ClassInfo} data the object that holds
 * @param {string} topicName the topic object that contains class info
 * @param {WriteDocsParams} options the options for displaying the info
 *
 * @return {DocsGS} the object for chaining
 */
export function writeClassroomDocuments(
  obj: ClassroomDocsGS,
  data: ClassInfo,
  topicName: string,
  options?: WriteDocsParams,
): DocsGS {
  return obj.writeClassroomDocuments(data, topicName, options);
}

/**
 * Class to write a Google Document
 *
 */
export class ClassroomDocsGS extends DocsGS {
  /**
   * Writes a document from the Classroom info
   *
   * @param {ClassInfo} data the object that holds
   * @param {string} topicName the topic object that contains class info
   * @param {WriteDocsParams} options the options for displaying the info
   *
   * @return {DocsGS} the object for chaining
   */
  writeClassroomDocuments(data: ClassInfo, topicName: string, options?: WriteDocsParams): DocsGS {
    // Expand options
    if (options == undefined) options = {} as WriteDocsParams;
    const { displayAnnouncements = 1, displayCoursework = true, docTitle = undefined } = options;

    // Clear the body and get the doc title
    this.clearBody();
    let thisTitle = docTitle;
    if (thisTitle == undefined) thisTitle = data.getName(topicName);
    const thisLevel = docLevels('T');
    if (thisTitle == undefined || thisLevel == undefined) {
      throw new Error(
        'Title (' + thisTitle + ') or level (' + thisLevel + ') not defined in DocsGS.writeClassroomDocuments()',
      );
    }

    // Display the title by removing the first child if necessary
    const thisBody = this._docObject.getBody();
    const thisChild = thisBody.getChild(0);
    if (thisChild.getType() == DocumentApp.ElementType.LIST_ITEM) {
      thisBody.appendParagraph(thisTitle).setHeading(thisLevel);
      thisChild.removeFromParent();
    } else
      thisChild
        .asParagraph()
        .setHeading(thisLevel)
        .setText(thisTitle);

    // Display the given number of announcements
    if (displayAnnouncements) {
      const thisAnnouncements = data.getAnnouncements();
      if (thisAnnouncements == undefined) {
        throw new Error('Announcement titles undefined in ' + 'DocsGS.writeClassroomDocuments()');
      }
      for (let a = 0; a < displayAnnouncements; a++) {
        this.addText(thisAnnouncements[a], 'Normal');
      }
    }

    // Display the coursework
    if (displayCoursework) {
      // Get the coursework for the topic
      const thisCoursework = data.getCourseWork(topicName);
      const thisTitles = thisCoursework.work;
      const thisLevel = thisCoursework.level;
      if (thisLevel == undefined || thisTitles == undefined) {
        throw new Error('Coursework titles undefined in ' + 'DocsGS.writeClassroomDocuments()');
      }

      // For each of the pieces of course work ...
      for (const courseWork of thisTitles) {
        this._displayCourseWork(courseWork, options);
      }
    }
    return this;
  }

  /**
   * Displays the coursework with the specified options
   *
   * @param {Work} courseWork the coursework
   * @param {WriteDocsParams} options the options for display
   */
  private _displayCourseWork(courseWork: Work, options: WriteDocsParams): void {
    const {
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
      this.addText(courseWork.description, 'Normal');
    }

    // Display the materials if they exist
    if (displayMaterials && courseWork.materials != null && courseWork.materials.length > 0) {
      this._displayMaterial(courseWork.materials, options);
    }
  }

  /**
   * Display the materials for the course with the associated options
   *
   * @param {Array<Material>} materials the associated materials
   * @param {WriteDocsParams} options the options
   */
  private _displayMaterial(materials: Array<Material>, options: WriteDocsParams): void {
    const { displayFiles = true, displayForms = true, displayLinks = true, displayVideos = true } = options;

    this.addText('Materials:', 'Normal');
    for (const material of materials) {
      if (displayFiles && material.file) {
        this.appendItem('File', material.title, material.file);
      } else if (displayVideos && material.video) {
        this.appendItem('Video', material.title, material.video);
      } else if (displayLinks && material.link) {
        this.appendItem('Link', material.title, material.link);
      } else if (displayForms && material.form) {
        this.appendItem('Form', material.title, material.form);
      }
    }
  }
}
