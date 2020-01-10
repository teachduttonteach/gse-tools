/**
 * Type to hold the parameters to print out the date for the calendar event
 *
 */
export type DateParams = {
  /**
   * what to print out before the title of the event
   */
  titlePrefix?: string;
  /**
   * the delimiter between sections of the date
   */
  dateDelim?: string;
  /**
   * the order to display the date in
   */
  dateOrder?: string;
  /**
   * what to print if there is no event for this day
   */
  noEventString?: string;
};
