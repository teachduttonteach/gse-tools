/**
 * Heading levels within a Google Doc, mapping anything starting with:
 * - "N" to NORMAL
 * - "S" to SUBTITLE
 * - "T" to TITLE
 *  and all numbers 1 - 6 to their respective HEADINGs
 * @param {string | number} key the document level to display (readable)
 * @return {GoogleAppsScript.Document.ParagraphHeading} the document level
 */
export function getDocLevels(key) {
    if (typeof key === 'string') {
        switch (key.toUpperCase().slice(0, 1)) {
            case 'S':
                return DocumentApp.ParagraphHeading.SUBTITLE;
            case 'T':
                return DocumentApp.ParagraphHeading.TITLE;
            default:
                return DocumentApp.ParagraphHeading.NORMAL;
        }
    }
    switch (key) {
        case 1:
            return DocumentApp.ParagraphHeading.HEADING1;
        case 2:
            return DocumentApp.ParagraphHeading.HEADING2;
        case 3:
            return DocumentApp.ParagraphHeading.HEADING3;
        case 4:
            return DocumentApp.ParagraphHeading.HEADING4;
        case 5:
            return DocumentApp.ParagraphHeading.HEADING5;
        case 6:
            return DocumentApp.ParagraphHeading.HEADING6;
        default:
            return DocumentApp.ParagraphHeading.NORMAL;
    }
}
