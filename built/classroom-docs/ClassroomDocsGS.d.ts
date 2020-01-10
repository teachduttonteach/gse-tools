import { ClassInfo } from '../classroom/ClassInfo';
import { DocsGS } from '../docs/DocsGS';
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
export declare function writeClassroomDocuments(obj: ClassroomDocsGS, data: ClassInfo, topicName: string, options?: WriteDocsParams): DocsGS;
/**
 * Class to write a Google Document
 *
 */
export declare class ClassroomDocsGS extends DocsGS {
    /**
     * Writes a document from the Classroom info
     *
     * @param {ClassInfo} data the object that holds
     * @param {string} topicName the topic object that contains class info
     * @param {WriteDocsParams} options the options for displaying the info
     *
     * @return {DocsGS} the object for chaining
     */
    writeClassroomDocuments(data: ClassInfo, topicName: string, options?: WriteDocsParams): DocsGS;
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
     * @param {Array<Material>} materials the associated materials
     * @param {WriteDocsParams} options the options
     */
    private _displayMaterial;
}
