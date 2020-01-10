/**
 * Benchmarking tool
 *
 * @param {object} obj the object
 * @param {string} method the method
 */
export declare function benchmark(obj: object, method: string): void;
/**
 * The getOAuthToken() function necessary for Google Apps Script authentication
 *
 * @return {string} the token
 */
export declare function getOAuthToken(): string;
/**
 * ONE_DAY equals the number of milliseconds in one day
 */
export declare const ONE_DAY: number;
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
export declare function areDatesEqual(date1: Date | string, date2: Date | string, level?: string): boolean;
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
export declare function compareDates(date1: Date | string, date2: Date | string, greaterThan?: boolean, equal?: boolean, level?: string): boolean;
