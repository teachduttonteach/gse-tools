import { QuestionType } from "../enums/QuestionType";
import { SpreadsheetGS } from "../sheets/SpreadsheetGS";
import { SlideshowGS } from "../slides/SlideshowGS";
import { Utilities } from "../utils/Utilities";
export class SampleUtilities {
    _getSlideshow(thisRow, display, slideshowIDColumnName) {
        if (display) {
            const thisSlideshowID = thisRow.get(slideshowIDColumnName);
            if (thisSlideshowID == null || typeof thisSlideshowID !== 'string') {
                throw new Error('Could not find slide show ID in _getSlideshow()');
            }
            return new SlideshowGS(thisSlideshowID);
        }
    }
    _getSecondarySheet(thisRow, secondarySpreadsheetIDColumnName, secondarySheetNameColumnName) {
        // Get the spreadsheet that contains the data for this class
        const thisSpreadsheetID = thisRow.get(secondarySpreadsheetIDColumnName);
        if (thisSpreadsheetID == null || typeof thisSpreadsheetID !== 'string') {
            throw new Error('Could not find spreadsheet column name in _getSecondarySheet()');
        }
        const thisSheetName = thisRow.get(secondarySheetNameColumnName);
        if (thisSheetName == null || typeof thisSheetName !== 'string') {
            throw new Error('Could not find sheet name column name (' + secondarySheetNameColumnName + ') in _getSecondarySheet()');
        }
        return new SpreadsheetGS(thisSpreadsheetID, thisSheetName).getSheet(thisSheetName);
    }
    _getClass(row, classroomCodeColumnName, allClasses) {
        if (row == undefined || classroomCodeColumnName == undefined) {
            throw new Error('Could not find row in classworkSettings in ' + 'updateDailyAgenda()');
        }
        const thisClassroomCode = row.get(classroomCodeColumnName);
        if (thisClassroomCode == undefined || typeof thisClassroomCode !== 'string' || thisClassroomCode == "") {
            throw new Error('Classroom code not found in updateDailyAgenda()');
        }
        return allClasses.getClass(thisClassroomCode);
    }
    _parseDueDate(dueDateRaw) {
        if (dueDateRaw == undefined)
            return undefined;
        const colon = dueDateRaw.indexOf(":");
        return new Date(dueDateRaw.substring(colon + 2));
    }
    _getFutureDate(row, dateToday, daysToLookAheadColumnName, daysToLookAheadDefault) {
        let futureDate = new Date(dateToday);
        let daysToLookAhead = daysToLookAheadDefault;
        if (daysToLookAheadColumnName !== undefined && daysToLookAheadColumnName != "") {
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
    _getQuestionTypeString(questionSheet, questionRow, questionTypeColumnName) {
        let thisQuestionTypeString = QuestionType[questionSheet.getValueFromColumnHeader(questionRow, questionTypeColumnName).toString()];
        if (thisQuestionTypeString === undefined || !(thisQuestionTypeString in QuestionType)) {
            console.log("WARNING: Question type '" +
                thisQuestionTypeString +
                "' not a valid question type in Question.updateTodaysQuestion()");
            thisQuestionTypeString = QuestionType.Paragraph;
        }
        return thisQuestionTypeString;
    }
}
