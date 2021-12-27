import { ClassGS } from "../classroom/ClassGS";
import { ClassroomGS } from "../classroom/ClassroomGS";
import { QuestionType } from "../enums/QuestionType";
import { SheetGS } from "../sheets/SheetGS";
import { SlideshowGS } from "../slides/SlideshowGS";
export declare type ParentEmailInfo = {
    /**
     * The subject of the email to send to parents; default is "This Week's
     * Agenda"
     */
    subject?: string;
    /**
     * Send agenda as PDF; default is false
     */
    sendAsPDF?: boolean;
    /**
     * Send agenda in body of email; default is true
     */
    sendInBody?: boolean;
    /**
     * Send the link to the Google Document with the agenda; default is false
     */
    sendDocLink?: boolean;
    /**
     * Send the link to the Google Document website with the agenda; default is true
     */
    sendWebLink?: boolean;
    /**
    * Send the link to the associated Google Sites page; default is false
    */
    sendSitesLink?: boolean;
    /**
     * The text to display for the Google Docs link; default is "Click here to
     *  see the agenda in Google Docs."
     */
    docsLinkText?: string;
    /**
     * The text to display for the Google Docs website link; default is "Click here to
     *  see the agenda on the web."
     */
    webLinkText?: string;
    /**
    * The text to display for the Google Sites link; default is "Click here to
    *  see the Google Site for this class."
    */
    sitesLinkText?: string;
};
export declare class SampleUtilities {
    _getSlideshow(thisRow: Map<string | Date, string | Date>, display: boolean, slideshowIDColumnName: string): SlideshowGS | undefined;
    _getSecondarySheet(thisRow: Map<string | Date, string | Date>, secondarySpreadsheetIDColumnName: string, secondarySheetNameColumnName: string): SheetGS;
    _getClass(row: Map<string | Date, string | Date>, classroomCodeColumnName: string, allClasses: ClassroomGS): ClassGS;
    _parseDueDate(dueDateRaw: string): Date | undefined;
    _getFutureDate(row: Map<string | Date, string | Date>, dateToday: Date, daysToLookAheadColumnName: string | undefined, daysToLookAheadDefault: number): Date;
    /**
   *
   * @param {SheetGS} questionSheet
   * @param {number} questionRow
   * @param {string} questionTypeColumnName
   * @returns {string}
   */
    _getQuestionTypeString(questionSheet: SheetGS, questionRow: number, questionTypeColumnName: string): QuestionType;
}
