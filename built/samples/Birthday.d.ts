/**
 * Parameters to run birthday e-mails
 */
export declare type BirthdayParams = {
    /**
     * The sheet that contains student information, including their name and
     *  birthday; default is 'Student Info'
     */
    studentInfoSheet?: string;
    /**
     * The column name in the student info sheet that contains the birthday;
     *  default is 'Birthday'
     */
    birthdayColumnName?: string;
    /**
     * The preferred date order to display in the e-mail: 'DM' or 'MD'; default
     *  is 'MD'
     */
    dateOrder?: 'DM' | 'MD';
    /**
     * The column in the sheet that contains the student's full name; default is
     *  'Full Name'
     */
    studentNameColumn?: string;
    /**
     * The timezone offset to use for date comparisons. EST is -5, which is the
     *  default
     */
    timezoneOffset?: number;
};
/**
 * Send birthday email to the requested recipient
 * ```javascript
 * var birthdayParams = {
 *  studentInfoSheet: 'Student Info',
 *  birthdayColumnName: 'Birthdate',
 *  studentNameColumn: 'Last',
 *  dateOrder: 'MD'
 * };
 * gsetools.sendBirthdayEmail(10, "teachduttonteach@gmail.com",
 *  birthdayParams);
 * ```
 *
 * @param {number} lookAheadDays how many days to look ahead
 * @param {string} emailToSend the email address to send it to
 * @param {birthdayParams} birthdayParams the parameters for the birthday
 */
export declare function sendBirthdayEmail(lookAheadDays: number, emailToSend: string, birthdayParams?: BirthdayParams): void;
