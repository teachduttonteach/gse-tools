/**
 * Parses the name out of the email address provided in the format:
 *  first.last.##@institution.xxx
 *
 * @param {string} email the email address
 * @return {[string, string]} the name as an array [first, last]
 */
export declare function getNameFromEmail(email: string): [string, string];
