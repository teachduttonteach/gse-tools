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

