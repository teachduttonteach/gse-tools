export declare class Utilities {
    /**
     * Benchmarking tool
     *
     * @param {object} obj the object
     * @param {string} method the method
     */
    benchmark(obj: object, method: string): void;
    /**
     * The getOAuthToken() function necessary for Google Apps Script authentication
     *
     * @return {string} the token
     */
    getOAuthToken(): string;
    /**
     * Gets the number of milliseconds in one day
     * @return {number} the number of milliseconds in one day
     */
    getOneDay(): number;
    /**
     * Get today's date with the timezone offset
     *
     * @param {number} timezoneOffset how many hours from GMT the desired user is,
     *  negative for west of GMT, positive for east; default is -5 (EST)
     * @return {Date} the altered date
     */
    getTodaysDate(timezoneOffset: number): Date;
    /**
     * Check to see if an assignment is null, and return the value of the
     *  assignment
     * @param {T | undefined | null} testValue the assignment to test
     * @param {string} description the description of the assignment being tested,
     *  will display for an error or warning
     * @param {string} functionName the name of the function to display for an
     *  error or warning
     * @param {'Error' | 'Warning' | 'Log' | 'None'} errorType the type of error
     *  to throw if the assignment is null
     */
    checkNull<T>(testValue: T | undefined | null, description: string, functionName: string, errorType?: 'Error' | 'Warning' | 'Log' | 'None'): T;
    /**
     * Checks to see if two dates are equal
     *
     * @param {Date | string} date1 the first date
     * @param {Date | string} date2 the second date
     * @param {string} level what level to check the dates; 'YEAR' checks on all
     *  of year, month and day; 'MONTH' checks on just month and day; 'DAY' only
     *  checks to see if the day is equal
     * @return {boolean} true if the dates are equal
     */
    areDatesEqual(date1: Date | string | null, date2: Date | string | null, level?: string): boolean;
    /**
     * Checks to see if two dates are equal
     *
     * @param {Date | string} date1 the first date
     * @param {Date | string} date2 the second date
     * @param {boolean} greaterThan check to see if the first date is greater
     *  than the second
     * @param {boolean} equal check to see if the first date is equal to the
     *  second
     * @param {string} level what level to check the dates; 'YEAR' checks on all
     *  of year, month and day; 'MONTH' checks on just month and day; 'DAY' only
     *  checks to see if the day is equal
     * @return {boolean} true if the dates are equal
     */
    compareDates(date1: Date | string, date2: Date | string, greaterThan?: boolean, equal?: boolean, level?: string): boolean;
    _checkDate(comp: number, greaterThan: boolean): boolean;
}
