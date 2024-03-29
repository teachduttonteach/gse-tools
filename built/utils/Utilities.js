export class Utilities {
    /**
     * Benchmarking tool
     *
     * @param {object} obj the object
     * @param {string} method the method
     */
    benchmark(obj, method) {
        console.log(obj.constructor.name + ': ' + method);
    }
    /**
     * The getOAuthToken() function necessary for Google Apps Script authentication
     *
     * @return {string} the token
     */
    getOAuthToken() {
        DriveApp.getRootFolder();
        return ScriptApp.getOAuthToken();
    }
    /**
     * Gets the number of milliseconds in one day
     * @return {number} the number of milliseconds in one day
     */
    getOneDay() {
        return 24 * 60 * 60 * 1000;
    }
    /**
     * Get today's date with the timezone offset
     *
     * @param {number} timezoneOffset how many hours from GMT the desired user is,
     *  negative for west of GMT, positive for east; default is -5 (EST)
     * @return {Date} the altered date
     */
    getTodaysDate(timezoneOffset) {
        const date = new Date();
        date.setUTCHours(date.getUTCHours() + timezoneOffset);
        return date;
    }
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
    checkNull(testValue, description, functionName, errorType = 'Error') {
        if (testValue === undefined || testValue === null) {
            const errorString = description + ' not defined in ' + functionName;
            if (errorType == 'Error')
                throw new Error(errorString);
            else if (errorType == 'Warning')
                console.log('WARNING: ' + errorString);
            else if (errorType == 'Log')
                Logger.log(errorString);
            return {};
        }
        return testValue;
    }
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
    areDatesEqual(date1, date2, level = 'YEAR') {
        if (typeof date1 === null || typeof date2 === null) {
            return false;
        }
        if (!(date1 instanceof Date) || !(date2 instanceof Date) || typeof date1 !== typeof date2) {
            return false;
        }
        if (level.toUpperCase() === 'YEAR') {
            if (date1.getUTCFullYear() !== date2.getUTCFullYear()) {
                return false;
            }
        }
        if (level.toUpperCase() !== 'DAY') {
            if (date1.getUTCMonth() !== date2.getUTCMonth()) {
                return false;
            }
        }
        return date1.getUTCDate() === date2.getUTCDate();
    }
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
    compareDates(date1, date2, greaterThan = true, equal = true, level = 'YEAR') {
        if (equal && this.areDatesEqual(date1, date2, level)) {
            return true;
        }
        if (!(date1 instanceof Date) || !(date2 instanceof Date) || typeof date1 !== typeof date2) {
            return false;
        }
        level = level.toUpperCase();
        const yearComp = date1.getUTCFullYear() > date2.getUTCFullYear() ? 1 : (date1.getUTCFullYear() < date2.getUTCFullYear() ? -1 : 0);
        if (level == "YEAR" && yearComp != 0)
            return this._checkDate(yearComp, greaterThan);
        const monthComp = date1.getUTCMonth() > date2.getUTCMonth() ? 1 : (date1.getUTCMonth() < date2.getUTCMonth() ? -1 : 0);
        if (level != "DAY" && monthComp != 0)
            return this._checkDate(monthComp, greaterThan);
        const dayComp = date1.getUTCDate() > date2.getUTCDate() ? 1 : (date1.getUTCDate() < date2.getUTCDate() ? -1 : 0);
        return this._checkDate(dayComp, greaterThan);
    }
    _checkDate(comp, greaterThan) {
        if ((greaterThan && comp == 1) || (!greaterThan && comp == -1))
            return true;
        return false;
    }
}
