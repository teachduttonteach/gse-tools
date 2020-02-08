/**
 * Parses the name out of the email address provided in the format:
 *  first.last.##@institution.xxx
 *
 * @param {string} email the email address
 * @return {[string, string]} the name as an array [first, last]
 */
export function getNameFromEmail(email: string): [string, string] {
  const name = email.split('@')[0].split('.');
  return [name[0].charAt(0).toUpperCase() + name[0].slice(1),
    name[1].charAt(0).toUpperCase() + name[1].slice(1)];
}
