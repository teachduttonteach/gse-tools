"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to provide functions to Google Form events
 *
 * ```javascript
 * function onSubmitBellwork(e) {
 *   var formEvent = new gseTools.FormEventGS(e);
 *   alert(formEvent.fullDate("MD", "/", "\n", 0, "T"));
 * }
 * ```
 */
var FormEventGS = /** @class */ (function () {
    /**
     * Get the values needed for these tools from the form event
     *
     * @param e contains the form event
     */
    function FormEventGS(e) {
        this._title = e.source.getTitle();
        this._date = e.response.getTimestamp();
        this._email = e.response.getRespondentEmail();
        this._response = e.response;
        this._event = e;
    }
    /**
     * Gets the underlying Google Apps Script object for direct access
     *
     * @returns the Event object
     */
    FormEventGS.prototype.getObject = function () {
        return this._event;
    };
    /**
     * Prints the full date from a list of optional arguments
     *
     * ```javascript
     * alert(formEvent.fullDate("MD", "/", "\n", 0, "T"));
     *
     * alert(formEvent.fullDate("MD", "-", ""));
     *
     * alert(formEvent.fullDate("DM"));
     * ```
     *
     * @param dateOrder the order of the dates, can be "MD" or "DM"
     * @param dateDelimiter how to separate dates
     * @param suffixDelimiter how to separate the title from the date
     * @param suffixResponseNumber which response (in list of responses) to use for the title
     * @param suffixType what to get the suffix from ("T" = "Title")
     */
    FormEventGS.prototype.fullDate = function (dateOrder, dateDelimiter, suffixDelimiter, suffixResponseNumber, suffixType) {
        var _a;
        if (dateOrder === void 0) { dateOrder = "MD"; }
        if (dateDelimiter === void 0) { dateDelimiter = "/"; }
        if (suffixDelimiter === void 0) { suffixDelimiter = "\n"; }
        if (suffixResponseNumber === void 0) { suffixResponseNumber = 0; }
        if (suffixType === void 0) { suffixType = "T"; }
        var _b = [this._date.getMonth() + 1, this._date.getDate()], firstDate = _b[0], secondDate = _b[1];
        if (dateOrder.toUpperCase() == "DM")
            _a = [this._date.getDate(), this._date.getMonth() + 1], firstDate = _a[0], secondDate = _a[1];
        var suffixBuilder = this._response.getItemResponses()[suffixResponseNumber];
        var suffix = "";
        // Can account for other types here
        if (suffixType.toUpperCase().startsWith("T"))
            suffix = suffixBuilder.getItem().getTitle();
        return firstDate + dateDelimiter + secondDate + suffixDelimiter + suffix;
    };
    return FormEventGS;
}());
exports.FormEventGS = FormEventGS;
