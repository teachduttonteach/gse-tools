import { ClassGS } from '../classroom/ClassGS';
import { DocsGS } from '../docs/DocsGS';
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
export declare function writeClassroomDocuments(obj: ClassroomDocsGS, classData: ClassGS, topicName: string, options?: WriteDocsParams): DocsGS;
/**
 * Class to write a Google Document
 *
 */
export declare class ClassroomDocsGS extends DocsGS {
    /**
     * Writes a document from the Classroom info
     *
     * @param {ClassGS} classData the object that holds class data
     * @param {string} topicId the topic id for the class info to print
     * @param {WriteDocsParams} options the options for displaying the info
     *
     * @return {DocsGS} the object for chaining
     */
    writeClassroomDocuments(classData: ClassGS, topicId: string, options?: WriteDocsParams): DocsGS;
    /**
     * Displays the coursework with the specified options
     *
     * @param {Work} courseWork the coursework
     * @param {WriteDocsParams} options the options for display
     */
    private _displayCourseWork;
    /**
     * Display the materials for the course with the associated options
     *
     * @param {Array<CourseMaterial>} materials the associated materials
     * @param {WriteDocsParams} options the options
     */
    private _displayMaterial;
}
