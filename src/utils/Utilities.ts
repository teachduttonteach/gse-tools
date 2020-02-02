/**
 * Benchmarking tool
 *
 * @param {object} obj the object
 * @param {string} method the method
 */
export function benchmark(obj: object, method: string) {
  Logger.log(obj.constructor.name + ': ' + method);
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
 * ONE_DAY equals the number of milliseconds in one day
 */
export function getOneDay(): number { return 24 * 60 * 60 * 1000; }

export function getTodaysDate(timezoneOffset: number): Date {
  let date = new Date();
  date.setUTCHours(date.getUTCHours() + timezoneOffset);
  return date;
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

  if ((typeof date1 === null) || (typeof date2 === null)) return false;
  if (!(date1 instanceof Date) || !(date2 instanceof Date) || typeof date1 !== typeof date2) return false;
  if (level.toUpperCase() == 'YEAR') {
    if (date1.getUTCFullYear() != date2.getUTCFullYear()) return false;
  }
  if (level.toUpperCase() != 'DAY') {
    if (date1.getUTCMonth() != date2.getUTCMonth()) return false;
    Logger.log("Month is the same");
  }

  if (date1.getUTCDate() == date2.getUTCDate()) Logger.log("Day is the same");
  else Logger.log("Day 1: " + date1.getUTCDate() + ", Day 2: " + date2.getUTCDate());
  return date1.getUTCDate() == date2.getUTCDate();
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
  if (equal && areDatesEqual(date1, date2, level)) return true;
  if (!(date1 instanceof Date) || !(date2 instanceof Date) || typeof date1 !== typeof date2) return false;
  if (level.toUpperCase() == 'YEAR') {
    if (date1.getUTCFullYear() != date2.getUTCFullYear()) {
      if (greaterThan != (date1.getUTCFullYear() > date2.getUTCFullYear())) return false;
    }
  }
  if (level.toUpperCase() != 'DAY') {
    if (date1.getUTCMonth() != date2.getUTCMonth()) {
      if (greaterThan != (date1.getUTCMonth() > date2.getUTCMonth())) return false;
    }
  }

  return greaterThan == (date1.getUTCDate() > date2.getUTCDate());
}
