/// <reference types="google-apps-script" />
/**
 * Heading levels within a Google Doc, mapping anything starting with:
 * - "N" to NORMAL
 * - "S" to SUBTITLE
 * - "T" to TITLE
 *  and all numbers 1 - 6 to their respective HEADINGs
 * @param {string | number} key the document level to display (readable)
 * @return {GoogleAppsScript.Document.ParagraphHeading} the document level
 */
export declare function getDocLevels(key: string | number): GoogleAppsScript.Document.ParagraphHeading;
