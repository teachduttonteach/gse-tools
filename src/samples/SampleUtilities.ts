import { ClassGS } from "../classroom/ClassGS";
import { ClassroomGS } from "../classroom/ClassroomGS";
import { QuestionType } from "../enums/QuestionType";
import { SheetGS } from "../sheets/SheetGS";
import { SpreadsheetGS } from "../sheets/SpreadsheetGS";
import { SlideshowGS } from "../slides/SlideshowGS";
import { Utilities } from "../utils/Utilities";

export type ParentEmailInfo = {
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
    sendAsHTML?: boolean;
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
     * The text to display for the Google Sites link; default is "Click here to
     *  see the Google Site for this class."
     */
    sitesLinkText?: string;
      /**
      * The link to use for Google Sites
      */
    sitesLink?: string;

  };
  
  export class SampleUtilities {
    _getSlideshow(
      thisRow: Map<string | Date, string | Date> | string, 
      display: boolean = true, 
      slideshowIDColumnName: string = SLIDESHOW_COLUMN): SlideshowGS | undefined {

      if (typeof thisRow === 'string') {
        return new SlideshowGS(thisRow);
      }
      if (display) {
        const thisSlideshowID = thisRow.get(slideshowIDColumnName);
        if (thisSlideshowID == null || typeof thisSlideshowID !== 'string' || thisSlideshowID == "") {
          console.log('WARNING: Could not find slide show ID in _getSlideshow()');
          return undefined;
        }
        return new SlideshowGS(thisSlideshowID);  
      }
    }  

    _getSecondarySheet(
      secondarySpreadsheetIDColumnName: string,
      secondarySheetNameColumnName: string,
      thisRow: Map<string | Date, string | Date>
      ): SheetGS {
    
        // Get the spreadsheet that contains the data for this class
        const thisSpreadsheetID = thisRow.get(secondarySpreadsheetIDColumnName);
        if (thisSpreadsheetID == null || typeof thisSpreadsheetID !== 'string' || thisSpreadsheetID == "") {
          throw new Error('Could not find spreadsheet column name in _getSecondarySheet()');
        }
        const thisSheetName = thisRow.get(secondarySheetNameColumnName);
        if (thisSheetName == null || typeof thisSheetName !== 'string') {
          throw new Error(
            'Could not find sheet name column name (' + secondarySheetNameColumnName + ') in _getSecondarySheet()',
          );
        }
        return new SpreadsheetGS(thisSpreadsheetID, thisSheetName).getSheet(thisSheetName);
    
    }

    _getClass(classroomCodeColumnName: string, allClasses: ClassroomGS, row?: Map<string | Date, string | Date>): ClassGS {
      if (row === undefined) {
        return allClasses.getClass(classroomCodeColumnName);
      }
      if (row == undefined || classroomCodeColumnName == undefined || typeof classroomCodeColumnName !== 'object') {
        throw new Error('Could not find row in classworkSettings in _getClass()');
      }
    
      const thisClassroomCode = row.get(classroomCodeColumnName);
      if (thisClassroomCode == undefined || typeof thisClassroomCode !== 'string' || thisClassroomCode == "") {
        throw new Error('Classroom code not found in _getClass()');
      }
    
      if (allClasses === undefined) {
        throw new Error("Cannot call getClass without list of all classes.");
      }
      return allClasses.getClass(thisClassroomCode);
    }

    _replaceNewLinesWithBRs(text: string): string {
      return text.replace(/\n/g, "<br>");
    }
    
    _parseDueDate(dueDateRaw: string): Date | undefined {
      if (dueDateRaw == undefined) return undefined;
      const colon = dueDateRaw.indexOf(":");
      return new Date(dueDateRaw.substring(colon + 2));
    }
    
    _getFutureDate(dateToday: Date, daysToLookAheadColumnName: string | undefined, daysToLookAheadDefault: number, row?: Map<string | Date, string | Date>): Date {
      let futureDate: Date = new Date(dateToday);
      let daysToLookAhead: number = daysToLookAheadDefault;
    
      if (daysToLookAheadColumnName !== undefined && daysToLookAheadColumnName != "" && row !== undefined) {
        const thisDays = row.get(daysToLookAheadColumnName);
        if (thisDays !== undefined && thisDays != "") {
          daysToLookAhead = +thisDays;
        }
      }
      const utils = new Utilities();
    
      futureDate.setMilliseconds(futureDate.getMilliseconds() + utils.getOneDay() * daysToLookAhead); 
    
      return futureDate;
    }
    
    /**
   * 
   * @param {SheetGS} questionSheet 
   * @param {number} questionRow 
   * @param {string} questionTypeColumnName 
   * @returns {string}
   */
  _getQuestionTypeString(
      questionSheet: SheetGS, 
      questionRow: number, 
      questionTypeColumnName: string): QuestionType 
      {
      let thisQuestionTypeString: QuestionType | undefined = (<any>QuestionType)[
        questionSheet.getValueFromColumnHeader(questionRow, questionTypeColumnName).toString()
      ];
      if (thisQuestionTypeString === undefined || !(thisQuestionTypeString in QuestionType)) {
        console.log(
          "WARNING: Question type '" +
            thisQuestionTypeString +
            "' not a valid question type in Question.updateTodaysQuestion()",
        );
        thisQuestionTypeString = QuestionType.Paragraph;
      }
      return thisQuestionTypeString;
    }
  }
  
  