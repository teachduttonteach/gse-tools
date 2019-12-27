/**
 * Type to hold the options for the form event
 */
export type FormEventOptions = {
    /**
     * The order of the dates, MD or DM (default: MD)
     */
    dateOrder?: string, 
    /**
     * The delimiter for the date (default: "/")
     */
    dateDelimiter?: string,
    /**
     * The delimiter for the text to add afterwards (default: "\n")
     */ 
    suffixDelimiter?: string, 
    /**
     * The response number for the response to use as a suffix (default: 0)
     */
    suffixResponseNumber?: number, 
    /**
     * The type of the property to get off of the response (currently only "T" is valid for the title)
     */
    suffixType?: string
}

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
export class FormEventGS {
    private _title: string;
    private _date: GoogleAppsScript.Base.Date;
    private _email: string;
    private _response: GoogleAppsScript.Forms.FormResponse;
    private _event: GoogleAppsScript.Events.FormsOnFormSubmit;
    
    /**
     * Get the values needed for these tools from the form event
     * 
     * @param e contains the form event
     */
    constructor(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
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
    getObject(): GoogleAppsScript.Events.FormsOnFormSubmit {
        return this._event;
    }

    /**
     * Gets the title of the form
     * 
     * @returns the title
     */
    getTitle(): string {
        return this._title;
    }

    /**
     * Gets the email address of the submitter of the form
     * 
     * @returns the email address
     */
    getEmail(): string {
        return this._email;
    }

    /**
     * Prints the full date from a list of optional arguments
     * 
     * @param {FormEventOptions} options the options for the form event
     */
    fullDate(options?: FormEventOptions): string {
        if (options == null) options = {} as FormEventOptions;
        let {
            dateOrder = "MD",
            dateDelimiter = "/",
            suffixDelimiter = "\n",
            suffixResponseNumber = 0,
            suffixType = "T"
        } = options;

        let [firstDate, secondDate] = [this._date.getMonth() + 1, this._date.getDate()];
        if (dateOrder == "DM") [firstDate, secondDate] = [this._date.getDate(), this._date.getMonth() + 1];
        
        let suffixBuilder = this._response.getItemResponses()[suffixResponseNumber];
        let suffix: string = "";

        // Can account for other types here
        if (suffixType.toUpperCase().startsWith("T")) suffix = suffixBuilder.getItem().getTitle();
        return firstDate + dateDelimiter + secondDate + suffixDelimiter + suffix;        
    }
}