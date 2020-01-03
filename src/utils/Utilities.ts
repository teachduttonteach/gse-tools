export function benchmark(obj: object, method: string) {
  Logger.log(obj.constructor.name + ": " + method);
}

export function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}

export const ONE_DAY = 24*60*60*1000;

export function areDatesEqual(date1: Date | string, date2: Date | string, level: string = "YEAR") {
  if (!(date1 instanceof Date) || !(date2 instanceof Date) || (typeof date1 !== typeof date2)) return false;
  if (level.toUpperCase() == "YEAR") {
    if (date1.getUTCFullYear() != date2.getUTCFullYear()) return false;
  } 
  if (level.toUpperCase() != "DAY") {
    if (date1.getUTCMonth() != date2.getUTCMonth()) return false;
  }

  return (date1.getUTCDate() == date2.getUTCDate());
}


