import { SpreadsheetGS } from './SpreadsheetGS';
import { getDataSheet } from '../DataSheet';
import { setCache, getCache } from '../Cache';
/**
 * Starts by reading in all students from sheet
 *  Each student becomes a StudentForGrouping object
 *  Each intersection becomes a StudentRelationship object
 */
/**
 * Class to hold student information for making groups
 */
class StudentForGroups {
    /**
     *
     * @param {string} name name of the student
     * @param {number} number number of the row or column holding the student
     *  in the spreadsheet
     */
    constructor(name, number) {
        this._number = 0;
        this._name = name;
        this._number = number;
    }
    /**
     * Set the row (or column) that holds the student in the data sheet
     *
     * @param {number} number number of the row or column holding the student
     *  in the spreadsheet
     */
    setNumber(number) {
        this._number = number;
    }
    /**
     * Get the name of the student
     *
     * @return {string} name of the student
     */
    getName() {
        return this._name;
    }
    /**
     * Get the number of the student in the data sheet
     *
     * @return {number} number (row or column) of the student
     */
    getNumber() {
        return this._number;
    }
}
/**
 * Class to hold a group of students
 *
 */
class GroupOfStudents {
    /**
     *
     * @param {number} limitStudentsPerGroup the highest number of students
     *  allowed per group
     */
    constructor(limitStudentsPerGroup) {
        this._students = [];
        this._limitStudentsPerGroup = limitStudentsPerGroup;
    }
    /**
     * Add a student to the group if the group is not at its maximum
     *
     * @param {StudentForGroups} student student to add to the group
     * @return {boolean} whether or not student was added
     */
    addStudentIfPossible(student) {
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
    studentInGroup(student) {
        for (let s = 0; s < this._students.length; s++) {
            if (this._students[s] == student)
                return true;
        }
        return false;
    }
    /**
     * Add the student to the group
     *
     * @param {StudentForGroups} student the student to add to the group
     * @return {GroupOfStudents} the object for chaining
     */
    addStudent(student) {
        this._students.push(student);
        return this;
    }
    /**
     * Get the Array of students in the group
     *
     * @return {Array<StudentForGroups>} the list of students
     */
    getStudents() {
        return this._students;
    }
}
/**
 * Set of groups of students. A set is created in order to determine which
 *  set has the best score.
 */
class GroupSet {
    /**
     *
     * @param {number} numStudents the number of total students
     * @param {number} limitGroups the number of groups
     */
    constructor(numStudents, limitGroups) {
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
            if (numStudents % (limitGroups - i) > 0)
                groupSize++;
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
    convertToStringArrays() {
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
    convertToNumberArrays() {
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
    getRandomGroup() {
        return this._groups[Math.floor(Math.random() * this._groups.length)];
    }
    /**
     * Get the score of the group set
     *
     * @return {number} the score
     */
    getScore() {
        return this._score;
    }
    /**
     * Set the score of the group set
     *
     * @param {number} s the score
     * @return {number} the score
     */
    setScore(s) {
        return (this._score = s);
    }
    /**
     * Add a student to a random group in the set
     *
     * @param {StudentForGroups} student the student to add
     * @return {GroupSet} the object for chaining
     */
    addStudentToRandomGroup(student) {
        while (!this.getRandomGroup().addStudentIfPossible(student)) { }
        return this;
    }
    /**
       * Get the list of groups in the set
       *
       @return {Array<GroupOfStudents>} the list of groups in the set
       */
    getGroups() {
        return this._groups;
    }
}
/**
 * Class to create groups of students according to scores
 */
export class GroupCreator {
    /**
     *
     * @param {GroupParams} args the parameters that define the creation of
     *  the groups
     */
    constructor(args) {
        if (args == null)
            this._args = {};
        else
            this._args = args;
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
    calculateScore(set) {
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
    /**
     * Calculate the groups for this set
     *
     * @return {GroupCreator} the object for chaining
     */
    calculateGroups() {
        const { className, sheetName = 'Student Groups', sheetNameColumnName = 'Sheet Name', spreadsheetColumn = 'Spreadsheet', attemptedDepth = 1000, } = this._args;
        const settingsSheet = getDataSheet()
            .getDataAsMap(sheetName)
            .get(className);
        if (settingsSheet == null) {
            throw new Error("Could not find class '" +
                className +
                "' in " +
                "settings sheet '" +
                sheetName +
                "' in " +
                'GroupCreator.calculateGroups()');
        }
        const thisSpreadsheetId = settingsSheet.get(spreadsheetColumn);
        if (thisSpreadsheetId == null || typeof thisSpreadsheetId !== 'string') {
            throw new Error("Could not find spreadsheet for class '" + className + "' in GroupCreator.calculateGroups()");
        }
        const groupSpreadsheet = new SpreadsheetGS(thisSpreadsheetId);
        if (groupSpreadsheet == null) {
            throw new Error('Could not create spreadsheet object in ' + 'GroupCreator.calculateGroups()');
        }
        const thisSheetNameColumn = settingsSheet.get(sheetNameColumnName);
        if (thisSheetNameColumn == null || typeof thisSheetNameColumn !== 'string') {
            throw new Error('Could not find column that contains sheet' + ' name in GroupCreator.calculateGroups()');
        }
        setCache('spreadsheetId', thisSpreadsheetId);
        setCache('sheetName', thisSheetNameColumn);
        const groupData = groupSpreadsheet.getDataAsMap(thisSheetNameColumn);
        if (groupData == null) {
            throw new Error("Could not find sheet name '" + sheetName + "' on spreadsheet in GroupCreator.calculateGroups()");
        }
        if (groupData.keys().length == 0) {
            Logger.log('WARNING: No students found for calculateGroups()');
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
            student1Object = this.addStudent(student1Object);
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
                student2Object = this.addStudent(student2Object);
                this._relationships[student1].push(+thisScore);
            }
        }
        // Try to make the groups
        for (let d = 0; d < attemptedDepth; d++) {
            const set = new GroupSet(this._students.length, this._limitGroups);
            for (let s = 0; s < this._students.length; s++) {
                set.addStudentToRandomGroup(this._students[s]);
            }
            const score = set.setScore(this.calculateScore(set));
            if (this._minimumGroupSet != undefined) {
                if (score < this._minimumGroupSet.getScore()) {
                    this._minimumGroupSet = set;
                }
            }
            else {
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
    displayGroupSet() {
        const { acceptGroupsFunction = 'acceptGroups', calculateGroupsFunction = 'calculateGroups' } = this._args;
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
        const sidebarAcceptButton = {};
        sidebarAcceptButton.text = 'Accept';
        sidebarAcceptButton.function = acceptGroupsFunction;
        sidebarAcceptButton.close = true;
        sidebarAcceptButton.wait = true;
        const sidebarDeclineButton = {};
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
    addStudent(student) {
        for (const s of this._students) {
            if (s.getName() == student.getName())
                return s;
        }
        this._students.push(student);
        return student;
    }
    /**
     * Get the list of students
     *
     * @return {Array<StudentForGroups>} the list of students
     */
    getStudents() {
        return this._students;
    }
}
/**
 * Default callback function to accept the groups. Group set is saved in cache.
 *
 * @param {string} emailAddress the email address to send the group set to
 * @param {string} className the name of the class for this group set
 */
function acceptGroups(emailAddress, className) {
    const spreadsheet = new SpreadsheetGS(getCache('spreadsheetId'));
    const sheet = spreadsheet.getSheet(getCache('sheetName'));
    const groupSet = getCache('minimumGroupSet');
    const groupSetValues = getCache('minimumGroupSetValues');
    let body = 'Next ' + className + ' groups:\n';
    let groupNumber = 0;
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
