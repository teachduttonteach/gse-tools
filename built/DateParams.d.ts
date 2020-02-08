/**
 * Type to hold the parameters to print out the date for the calendar event
 *
 */
export declare type DateParams = {
    /**
     * What to print out before the date
     */
    titlePrefix?: string;
    /**
     * The delimiter between sections of the date
     */
    dateDelim?: string;
    /**
     * The order to display the date in, "DM" or "MD", or "DMY", "MDY", "YMD" or
     *  "YDM". Do you really want an option with the year in the middle? Contact
     *  me at teachduttonteach@gmail.com if it's that important to you :)
     */
    dateOrder?: 'DM' | 'MD' | 'DMY' | 'MDY' | 'YMD' | 'YDM';
    /**
     * What to print if there is no event / date for this day
     */
    noEventString?: string;
};
