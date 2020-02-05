/**
 * Benchmarking tool
 *
 * @param {object} obj the object
 * @param {string} method the method
 */
export function benchmark(obj: object, method: string) {
  console.log(obj.constructor.name + ': ' + method);
}

/**
 * The getOAuthToken() function necessary for Google Apps Script authentication
 *
 * @return {string} the token
 */
export function getOAuthToken(): string {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}

/**
 * Gets the number of milliseconds in one day
 * @return {number} the number of milliseconds in one day
 */
export function getOneDay(): number {
  return 24 * 60 * 60 * 1000;
}

/**
 * Get today's date with the timezone offset
 *
 * @param {number} timezoneOffset how many hours from GMT the desired user is,
 *  negative for west of GMT, positive for east; default is -5 (EST)
 * @return {Date} the altered date
 */
export function getTodaysDate(timezoneOffset: number): Date {
  const date = new Date();
  date.setUTCHours(date.getUTCHours() + timezoneOffset);
  return date;
}

export function checkNull(testValue: any, description: string, 
  functionName: string, 
  errorType: 'Error' | 'Warning' | 'Log' | 'None' = 'Error'): any | null {

  if ((testValue === undefined) || (testValue === null)) {
    const errorString = description + ' not defined in ' + functionName;
    if (errorType == 'Error') throw new Error(errorString);
    else if (errorType == 'Warning') console.log('WARNING: ' + errorString);
    else if (errorType == 'Log') Logger.log(errorString);
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
export function areDatesEqual(date1: Date | string | null,
    date2: Date | string | null, level: string = 'YEAR'): boolean {
  if ((typeof date1 === null) || (typeof date2 === null)) {
    return false;
  }
  if (!(date1 instanceof Date) || !(date2 instanceof Date) ||
    typeof date1 !== typeof date2) {
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
export function compareDates(
    date1: Date | string,
    date2: Date | string,
    greaterThan: boolean = true,
    equal: boolean = true,
    level: string = 'YEAR',
): boolean {
  if (equal && areDatesEqual(date1, date2, level)) {
    return true;
  }
  if (!(date1 instanceof Date) || !(date2 instanceof Date) ||
    typeof date1 !== typeof date2) {
    return false;
  }
  if (level.toUpperCase() === 'YEAR') {
    if (date1.getUTCFullYear() !== date2.getUTCFullYear()) {
      if (greaterThan !== (date1.getUTCFullYear() > date2.getUTCFullYear())) {
        return false;
      }
    }
  }
  if (level.toUpperCase() !== 'DAY') {
    if (date1.getUTCMonth() !== date2.getUTCMonth()) {
      if (greaterThan !== (date1.getUTCMonth() > date2.getUTCMonth())) {
        return false;
      }
    }
  }

  return greaterThan === (date1.getUTCDate() > date2.getUTCDate());
}
