import { SpreadsheetGS } from './SpreadsheetGS';
import { getDataSheet } from '../DataSheet';
import { setCache, getCache } from '../Cache';
import { SidebarButton } from '../SidebarButton';

export function newGroupCreator(args: GroupParams): GroupCreator {
  return new GroupCreator(args);
}

/**
 * Calculate the groups for this set
 *
 * @param {GroupCreator} obj the GroupCreator object
 * @return {GroupCreator} the object for chaining
 */
export function calculateGroups(obj: GroupCreator): GroupCreator {
  return obj.calculateGroups();
}

/**
 * Display the group set found
 *
 * @param {GroupCreator} obj the GroupCreator object
 * @return {GroupCreator} the object for chaining
 */
export function displayGroupSet(obj: GroupCreator): GroupCreator {
  return obj.displayGroupSet();
}


/**
 * Starts by reading in all students from sheet
 *  Each student becomes a StudentForGrouping object
 *  Each intersection becomes a StudentRelationship object
 */

/**
 * Class to hold student information for making groups
 */
class StudentForGroups {
  private _name: string;
  private _number: number = 0;

  /**
   *
   * @param {string} name name of the student
   * @param {number} number number of the row or column holding the student
   *  in the spreadsheet
   */
  constructor(name: string, number: number) {
    this._name = name;
    this._number = number;
  }

  /**
   * Set the row (or column) that holds the student in the data sheet
   *
   * @param {number} number number of the row or column holding the student
   *  in the spreadsheet
   */
  setNumber(number: number) {
    this._number = number;
  }

  /**
   * Get the name of the student
   *
   * @return {string} name of the student
   */
  getName(): string {
    return this._name;
  }

  /**
   * Get the number of the student in the data sheet
   *
   * @return {number} number (row or column) of the student
   */
  getNumber(): number {
    return this._number;
  }
}

/**
 * Class to hold a group of students
 *
 */
class GroupOfStudents {
  private _students: Array<StudentForGroups>;
  private _limitStudentsPerGroup: number;

  /**
   *
   * @param {number} limitStudentsPerGroup the highest number of students
   *  allowed per group
   */
  constructor(limitStudentsPerGroup: number) {
    this._students = [];
    this._limitStudentsPerGroup = limitStudentsPerGroup;
  }

  /**
   * Add a student to the group if the group is not at its maximum
   *
   * @param {StudentForGroups} student student to add to the group
   * @return {boolean} whether or not student was added
   */
  addStudentIfPossible(student: StudentForGroups): boolean {
    if (this._students.length < this._limitStudentsPerGroup) {
      this.addStudent(student);
      return true;
    }
    return false;
  }

  /**
   * Check to see if the student is in the current group
   *
   * @param {StudentForGroups} student the student to check
   * @return {boolean} true if the student is in the group
   */
  studentInGroup(student: StudentForGroups): boolean {
    for (let s = 0; s < this._students.length; s++) {
      if (this._students[s] == student) return true;
    }
    return false;
  }

  /**
   * Add the student to the group
   *
   * @param {StudentForGroups} student the student to add to the group
   * @return {GroupOfStudents} the object for chaining
   */
  addStudent(student: StudentForGroups): GroupOfStudents {
    this._students.push(student);
    return this;
  }

  /**
   * Get the Array of students in the group
   *
   * @return {Array<StudentForGroups>} the list of students
   */
  getStudents(): Array<StudentForGroups> {
    return this._students;
  }
}

/**
 * Set of groups of students. A set is created in order to determine which
 *  set has the best score.
 */
class GroupSet {
  private _groups: Array<GroupOfStudents>;
  private _score: number;

  /**
   *
   * @param {number} numStudents the number of total students
   * @param {number} limitGroups the number of groups
   */
  constructor(numStudents: number, limitGroups: number) {
    // Initialize the group array
    this._groups = [];
    this._score = 0;

    // Loop through all of the groups to set the size of each
    // group
    for (let i = 0; i < limitGroups; i++) {
      // Initialize the group size to the minimum per group
      let groupSize = Math.floor(numStudents / (limitGroups - i));

      // Add one to the group size if there's an odd number of
      //  students for the remaining groups
      if (numStudents % (limitGroups - i) > 0) groupSize++;

      // Add a group with the specified number of students
      this._groups.push(new GroupOfStudents(groupSize));

      // Set the remaining number of students left to place
      numStudents -= groupSize;
    }
  }

  /**
   * Converts the group set to an Array of Array of strings
   *
   * @return {Array<Array<string>>} the array of array of strings
   */
  convertToStringArrays(): Array<Array<string>> {
    const thisReturn = [];
    for (const g of this._groups) {
      thisReturn.push(g.getStudents().map(x => x.getName()));
    }
    return thisReturn;
  }

  /**
   * Converts the group set to an Array of Array of numbers
   *
   * @return {Array<Array<number>>} the array of array of numbers
   */
  convertToNumberArrays(): Array<Array<number>> {
    const thisReturn = [];
    for (const g of this._groups) {
      thisReturn.push(g.getStudents().map(x => x.getNumber()));
    }
    return thisReturn;
  }

  /**
   * Get a random group from the set
   *
   * @return {GroupOfStudents} the random group
   */
  getRandomGroup(): GroupOfStudents {
    return this._groups[Math.floor(Math.random() * this._groups.length)];
  }

  /**
   * Get the score of the group set
   *
   * @return {number} the score
   */
  getScore(): number {
    return this._score;
  }

  /**
   * Set the score of the group set
   *
   * @param {number} s the score
   * @return {number} the score
   */
  setScore(s: number): number {
    return (this._score = s);
  }

  /**
   * Add a student to a random group in the set
   *
   * @param {StudentForGroups} student the student to add
   * @return {GroupSet} the object for chaining
   */
  addStudentToRandomGroup(student: StudentForGroups): GroupSet {
    while (!this.getRandomGroup().addStudentIfPossible(student)) {}
    return this;
  }

  /**
     * Get the list of groups in the set
     *
     @return {Array<GroupOfStudents>} the list of groups in the set
     */
  getGroups(): Array<GroupOfStudents> {
    return this._groups;
  }
}

// TODO: Change scoring system so it can positive, negative or zero. Zero
// scoring would be used for just creating random groups without caring about
// score
/**
 * Group parameters type for defining the creation of groups for the class
 */
export type GroupParams = {
  /**
   * Name of the class
   */
  className: string;
  /**
   * Number of groups to create; defaults to 5
   */
  numGroups?: number;
  /**
   * The sheet name to pull names and scores from; default is "Student Groups"
   */
  sheetName?: string;
  /**
   * The column in the settings spreadsheet that contains the spreadsheet for
   * this class; default is "Spreadsheet"
   */
  spreadsheetColumn?: string;
  /**
   * The id of the Spreadsheet to use if not using the settings spreadsheet
   */
  spreadsheetId?: string;
  /**
   * How many group sets to create to find the lowest score; default is 1000
   */
  attemptedDepth?: number;
  /**
   * The callback function name to use if the user accepts the group set;
   * default is "acceptGroups"
   */
  acceptGroupsFunction?: string;
  /**
   * The callback function name to use if the user rejects the group set and
   * asks to recalculate groups; default is "calculateGroups"
   */
  calculateGroupsFunction?: string;
  /**
   * The column in the settings (data) sheet that contains the name of the 
   * column in the sheet that has the students and scores on it; default is
   * "Sheet Name"
   */
  settingsSheetColumnName?: string;
};

/**
 * Class to create groups of students according to scores
 */
export class GroupCreator {
  private _limitGroups: number;
  private _students: Array<StudentForGroups>;
  private _relationships: Array<Array<number>>;
  private _minimumGroupSet: GroupSet | undefined;
  private _args: GroupParams;

  /**
   *
   * @param {GroupParams} args the parameters that define the creation of
   *  the groups
   */
  constructor(args?: GroupParams) {
    if (args == null) this._args = {} as GroupParams;
    else this._args = args;

    const { numGroups = 5 } = this._args;

    this._limitGroups = numGroups;
    this._students = [];
    this._relationships = [];
  }

  /**
   * Calculate the score for the group set
   *
   * @param {GroupSet} set the group set to calculate
   * @return {number} the score of the set
   */
  private _calculateScore(set: GroupSet): number {
    let totalScore = 0;
    for (const group of set.getGroups()) {
      const allStudents = group.getStudents();
      for (let student1 = 0; student1 < allStudents.length; student1++) {
        for (let student2 = student1 + 1; student2 < allStudents.length; student2++) {
          totalScore += this._relationships[student1][student2 - student1 - 1];
        }
      }
    }
    return totalScore;
  }

  private _getSpreadsheetForGroups(): [string, string] {
    const {
      className,
      sheetName = 'Student Groups',
      settingsSheetColumnName = 'Sheet Name',
      spreadsheetColumn = 'Spreadsheet'
    } = this._args;
    const settingsSheet = getDataSheet()
      .getDataAsMap(sheetName)
      .get(className);
    if (settingsSheet == null) {
      throw new Error(
        "Could not find class '" +
          className +
          "' in " +
          "settings sheet '" +
          sheetName +
          "' in " +
          'GroupCreator.calculateGroups()',
      );
    }

    const thisSpreadsheetId = settingsSheet.get(spreadsheetColumn);
    if (thisSpreadsheetId == null || typeof thisSpreadsheetId !== 'string') {
      throw new Error("Could not find spreadsheet for class '" + className + "' in GroupCreator.calculateGroups()");
    }

    const sheetNameFromSettings = settingsSheet.get(settingsSheetColumnName);
    if (sheetNameFromSettings == null || typeof sheetNameFromSettings !== 'string') {
      throw new Error('Could not find column that contains sheet' + ' name in GroupCreator.calculateGroups()');
    }

    return [thisSpreadsheetId, sheetNameFromSettings];
  }

  /**
   * Calculate the groups for this set
   *
   * @return {GroupCreator} the object for chaining
   */
  calculateGroups(): GroupCreator {
    let {
      sheetName = 'Student Groups',
      attemptedDepth = 1000,
      spreadsheetId
    } = this._args;

    let sheetColumn: string;
    if (typeof spreadsheetId === null) [spreadsheetId, sheetColumn] = this._getSpreadsheetForGroups();
    else sheetColumn = sheetName;

    const groupSpreadsheet = new SpreadsheetGS(spreadsheetId);
    if (groupSpreadsheet == null) {
      throw new Error('Could not create spreadsheet object in ' + 'GroupCreator.calculateGroups()');
    }

    setCache('spreadsheetId', spreadsheetId);
    setCache('sheetName', sheetColumn);

    const groupData = groupSpreadsheet.getDataAsMap(sheetColumn);
    if (groupData == null) {
      throw new Error("Could not find sheet name '" + sheetName + "' on spreadsheet in GroupCreator.calculateGroups()");
    }
    if (groupData.keys().length == 0) {
      console.log('WARNING: No students found for GroupCreator.calculateGroups()');
    }
    // Read in all students and establish relationships
    const rows = groupData.keys();
    for (let student1 = 0; student1 < rows.length; student1++) {
      const thisStudent = groupData.get(rows[student1]);
      if (thisStudent == null) {
        throw new Error('Could not find student in ' + 'GroupCreator.calculateGroups()');
      }
      const student1Name = rows[student1];
      if (typeof student1Name !== 'string') {
        throw new Error('Student name must be a string in ' + 'GroupCreator.calculateGroups()');
      }

      let student1Object = new StudentForGroups(student1Name, student1 + 2);
      student1Object = this._addStudent(student1Object);
      this._relationships.push([]);

      const columns = thisStudent.keys();
      for (let student2 = student1 + 1; student2 < columns.length; student2++) {
        const thisScore = thisStudent.get(columns[student2]);
        if (thisScore == null) {
          throw new Error('Could not find student 2 in ' + 'GroupCreator.calculateGroups()');
        }

        const student2Name = columns[student2];
        if (typeof student2Name !== 'string') {
          throw new Error('Student name must be a string in ' + 'GroupCreator.calculateGroups()');
        }

        let student2Object = new StudentForGroups(student2Name, student2 + 2);
        student2Object = this._addStudent(student2Object);
        this._relationships[student1].push(+thisScore);
      }
    }

    // Try to make the groups
    for (let d = 0; d < attemptedDepth; d++) {
      const set = new GroupSet(this._students.length, this._limitGroups);
      for (let s = 0; s < this._students.length; s++) {
        set.addStudentToRandomGroup(this._students[s]);
      }

      const score = set.setScore(this._calculateScore(set));

      if (this._minimumGroupSet != undefined) {
        if (score < this._minimumGroupSet.getScore()) {
          this._minimumGroupSet = set;
        }
      } else {
        this._minimumGroupSet = set;
      }
    }
    return this;
  }

  /**
   * Display the group set found
   *
   * @return {GroupCreator} the object for chaining
   */
  displayGroupSet(): GroupCreator {
    const { 
      acceptGroupsFunction = 'acceptGroups', 
      calculateGroupsFunction = 'calculateGroups',
      spreadsheetId 
    } = this._args;

    if (spreadsheetId != null) throw new Error("Cannot display group set " +
      "when script is not attached to spreadsheet. If you have enabled the " +
      "spreadsheetId, remove this parameter and try again in GroupCreator." +
      "displayGroupSet()");

    const currentSheet = new SpreadsheetGS();
    currentSheet.activateUi();

    if (this._minimumGroupSet == undefined) {
      throw new Error('Could not get minimum group set in ' + 'GroupCreator.displayGroupSet()');
    }
    const studentGroups = this._minimumGroupSet.getGroups();

    // Display the best group set
    let display = '';
    let groupNumber = 0;
    for (const group of studentGroups) {
      groupNumber++;
      display += '<h2>Group ' + groupNumber + '</h2><ol>';
      for (const student of group.getStudents()) {
        display += '<li>' + student.getName() + '</li>';
      }
      display += '</ol>';
    }

    const sidebarAcceptButton: SidebarButton = {} as SidebarButton;
    sidebarAcceptButton.text = 'Accept';
    sidebarAcceptButton.function = acceptGroupsFunction;
    sidebarAcceptButton.close = true;
    sidebarAcceptButton.wait = true;

    const sidebarDeclineButton: SidebarButton = {} as SidebarButton;
    sidebarDeclineButton.text = 'Decline';
    sidebarDeclineButton.function = calculateGroupsFunction;
    sidebarDeclineButton.close = true;
    sidebarDeclineButton.wait = true;

    setCache('minimumGroupSet', this._minimumGroupSet.convertToStringArrays());
    setCache('minimumGroupSetValues', this._minimumGroupSet.convertToNumberArrays());
    currentSheet.showSidebar(display, 'Groups', [sidebarAcceptButton, sidebarDeclineButton]);

    return this;
  }

  /**
   * Add a student to the list of students
   *
   * @param {StudentForGroups} student the student to add
   * @return {StudentForGroups} the student added
   */
  private _addStudent(student: StudentForGroups): StudentForGroups {
    for (const s of this._students) {
      if (s.getName() == student.getName()) return s;
    }
    this._students.push(student);
    return student;
  }

  /**
   * Get the list of students
   *
   * @return {Array<StudentForGroups>} the list of students
   */
  private _getStudents(): Array<StudentForGroups> {
    return this._students;
  }
}

/**
 * Default callback function to accept the groups. Group set is saved in cache.
 *
 * @param {string} emailAddress the email address to send the group set to
 * @param {string} className the name of the class for this group set
 */
function acceptGroups(emailAddress: string, className: string) {
  const spreadsheet = new SpreadsheetGS(getCache<string>('spreadsheetId'));
  const sheet = spreadsheet.getSheet(getCache<string>('sheetName'));
  const groupSet = getCache<Array<Array<string>>>('minimumGroupSet');
  const groupSetValues = getCache<Array<Array<number>>>('minimumGroupSetValues');

  let body = 'Next ' + className + ' groups:\n';

  let groupNumber: number = 0;
  for (const group of groupSet) {
    groupNumber++;
    body += 'Group #' + groupNumber + '\n';
    for (let student1 = 0; student1 < group.length; student1++) {
      body += '\t' + group[student1] + '\n';
    }
    body += '\n';
  }

  for (const group of groupSetValues) {
    for (let student1 = 0; student1 < group.length; student1++) {
      for (let student2 = student1 + 1; student2 < group.length; student2++) {
        const score = +sheet.getValue(group[student2], group[student1]);
        sheet.setValue((score + 1).toString(), group[student2], group[student1]);
      }
    }
  }

  MailApp.sendEmail(emailAddress, className + ' Groups', body);
}
