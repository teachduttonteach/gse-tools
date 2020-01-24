import { ClassGS } from '../classroom/ClassGS';
import { Work } from '../classroom/Work';
import { CourseMaterial } from '../classroom/CourseMaterial';
import { DocsGS } from '../docs/DocsGS';
import { getDocLevels } from '../docs/DocLevels';
import { WriteDocsParams } from 'WriteDocsParams';

/**
 * Writes a document from the Classroom info
 *
 * @param {ClassroomDocsGS} obj the ClassroomDocs object
 * @param {ClassGS} classData the object that holds the class info
 * @param {string} topicName the topic object that contains class info
 * @param {WriteDocsParams} options the options for displaying the info
 *
 * @return {DocsGS} the object for chaining
 */
export function writeClassroomDocuments(
  obj: ClassroomDocsGS,
  classData: ClassGS,
  topicName: string,
  options?: WriteDocsParams,
): DocsGS {
  return obj.writeClassroomDocuments(classData, topicName, options);
}

/**
 * Class to write a Google Document
 *
 */
export class ClassroomDocsGS extends DocsGS {
  /**
   * Writes a document from the Classroom info
   *
   * @param {ClassGS} classData the object that holds class data
   * @param {string} topicId the topic id for the class info to print
   * @param {WriteDocsParams} options the options for displaying the info
   *
   * @return {DocsGS} the object for chaining
   */
  writeClassroomDocuments(classData: ClassGS, topicId: string, 
    options?: WriteDocsParams): DocsGS {
    // Expand options
    if (options == undefined) options = {} as WriteDocsParams;
    let { displayAnnouncements = 1, displayCoursework = true, 
      docTitle = undefined } = options;

    // Clear the body and get the doc title
    this.clearBody();
    if (docTitle == undefined) docTitle = classData.getTopicName(topicId);
    const thisLevel = getDocLevels('T');
    if (docTitle == undefined || thisLevel == undefined) {
      throw new Error(
        'Title (' + docTitle + ') or level (' + thisLevel + ') not defined in DocsGS.writeClassroomDocuments()',
      );
    }

    // Display the title by removing the first child if necessary
    const thisBody = this._docObject.getBody();
    const thisChild = thisBody.getChild(0);
    if (thisChild.getType() == DocumentApp.ElementType.LIST_ITEM) {
      thisBody.appendParagraph(docTitle).setHeading(thisLevel);
      thisChild.removeFromParent();
    } else
      thisChild
        .asParagraph()
        .setHeading(thisLevel)
        .setText(docTitle);

    // Display the given number of announcements
    if (displayAnnouncements) {
      const thisAnnouncements = classData.getAnnouncements();
      if (thisAnnouncements == undefined) {
        throw new Error('Announcement titles undefined in ' + 
        'DocsGS.writeClassroomDocuments()');
      }
      for (let a = 0; a < displayAnnouncements; a++) {
        this.addText(thisAnnouncements[a], 'Normal');
      }
    }

    // Display the coursework
    if (displayCoursework) {
      // Get the coursework for the topic
      const thisCoursework = classData.getTopicInfo(topicId);
      const thisTitles = thisCoursework.work;
      const thisLevel = thisCoursework.level;
      if (thisLevel == undefined || thisTitles == undefined) {
        throw new Error('Coursework titles undefined in ' + 
        'DocsGS.writeClassroomDocuments()');
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
  private _displayCourseWork(courseWork: Work, options: WriteDocsParams): 
  void {
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
    if (displayMaterials && courseWork.materials != null && 
      courseWork.materials.length > 0) {
      this._displayMaterial(courseWork.materials, options);
    }
  }

  /**
   * Display the materials for the course with the associated options
   *
   * @param {Array<CourseMaterial>} materials the associated materials
   * @param {WriteDocsParams} options the options
   */
  private _displayMaterial(materials: Array<CourseMaterial>, 
    options: WriteDocsParams): void {
    const { displayFiles = true, displayForms = true, displayLinks = true, 
      displayVideos = true } = options;

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
