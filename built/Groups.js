import { SpreadsheetGS } from "./SpreadsheetGS";
import { getDataSheet, setCache, getCache } from "./Properties";
/**
 * Starts by reading in all students from sheet
 *  Each student becomes a StudentForGrouping object
 *  Each intersection becomes a StudentRelationship object
 */
class StudentForGroups {
    constructor(name, number) {
        this._number = 0;
        this._name = name;
        this._number = number;
    }
    setNumber(number) {
        this._number = number;
    }
    getName() {
        return this._name;
    }
    getNumber() {
        return this._number;
    }
}
class GroupOfStudents {
    constructor(limitStudentsPerGroup) {
        this._students = [];
        this._limitStudentsPerGroup = limitStudentsPerGroup;
    }
    addStudentIfPossible(student) {
        if (this._students.length < this._limitStudentsPerGroup) {
            this.addStudent(student);
            return true;
        }
        return false;
    }
    studentInGroup(student) {
        for (let s = 0; s < this._students.length; s++) {
            if (this._students[s] == student)
                return true;
        }
        return false;
    }
    addStudent(student) {
        this._students.push(student);
        return this;
    }
    getStudents() {
        return this._students;
    }
}
class GroupSet {
    constructor(numStudents, limitGroups) {
        // Initialize the group array
        this._groups = [];
        this._score = 0;
        // Loop through all of the groups to set the size of each group
        for (var i = 0; i < limitGroups; i++) {
            // Initialize the group size to the minimum per group
            let groupSize = Math.floor(numStudents / (limitGroups - i));
            // Add one to the group size if there's an odd number of students for the remaining groups
            if (numStudents % (limitGroups - i) > 0)
                groupSize++;
            // Add a group with the specified number of students
            this._groups.push(new GroupOfStudents(groupSize));
            // Set the remaining number of students left to place
            numStudents -= groupSize;
        }
    }
    convertToStringArrays() {
        let t_return = [];
        for (let g of this._groups) {
            t_return.push(g.getStudents().map(x => x.getName()));
        }
        return t_return;
    }
    convertToNumberArrays() {
        let t_return = [];
        for (let g of this._groups) {
            t_return.push(g.getStudents().map(x => x.getNumber()));
        }
        return t_return;
    }
    getRandomGroup() {
        return this._groups[Math.floor(Math.random() * this._groups.length)];
    }
    getScore() {
        return this._score;
    }
    setScore(s) {
        return this._score = s;
    }
    addStudentToRandomGroup(student) {
        while (!this.getRandomGroup().addStudentIfPossible(student)) { }
        return this;
    }
    getGroups() {
        return this._groups;
    }
}
export class GroupCreator {
    constructor(args) {
        if (args == null)
            this._args = {};
        else
            this._args = args;
        let { numGroups = 5, } = this._args;
        this._limitGroups = numGroups;
        this._students = [];
        this._relationships = [];
    }
    calculateScore(set) {
        let totalScore = 0;
        for (let group of set.getGroups()) {
            let allStudents = group.getStudents();
            for (let student1 = 0; student1 < allStudents.length; student1++) {
                for (let student2 = student1 + 1; student2 < allStudents.length; student2++) {
                    totalScore += this._relationships[student1][student2 - student1 - 1]; // getRelationship(allStudents[student1], allStudents[student2]);
                }
            }
        }
        return totalScore;
    }
    calculateGroups() {
        let { className, sheetName = "Student Groups", sheetNameColumnName = "Sheet Name", spreadsheetColumn = "Spreadsheet", attemptedDepth = 1000 } = this._args;
        let settingsSheet = getDataSheet().getMapData(sheetName).get(className);
        if (settingsSheet == null)
            throw new Error("Could not find class '" + className + "' in settings sheet '" + sheetName + "' in GroupCreator.calculateGroups()");
        let t_spreadsheetId = settingsSheet.get(spreadsheetColumn);
        if (t_spreadsheetId == null)
            throw new Error("Could not find spreadsheet for class '" + className + "' in GroupCreator.calculateGroups()");
        let groupSpreadsheet = new SpreadsheetGS(t_spreadsheetId);
        if (groupSpreadsheet == null)
            throw new Error("Could not create spreadsheet object in GroupCreator.calculateGroups()");
        let t_sheetNameColumn = settingsSheet.get(sheetNameColumnName);
        if (t_sheetNameColumn == null)
            throw new Error("Could not find column that contains sheet name in GroupCreator.calculateGroups()");
        setCache("spreadsheetId", t_spreadsheetId);
        setCache("sheetName", t_sheetNameColumn);
        let groupData = groupSpreadsheet.getMapData(t_sheetNameColumn);
        if (groupData == null)
            throw new Error("Could not find sheet name '" + sheetName + "' on spreadsheet in GroupCreator.calculateGroups()");
        if (groupData.getKeys().length == 0)
            Logger.log("WARNING: No students found for calculateGroups()");
        // Read in all students and establish relationships
        let rows = groupData.getKeys();
        for (let student1 = 0; student1 < rows.length; student1++) {
            let t_student = groupData.get(rows[student1]);
            if (t_student == null)
                throw new Error("Could not find student in GroupCreator.calculateGroups()");
            let student1Object = new StudentForGroups(rows[student1], student1 + 2);
            student1Object = this.addStudent(student1Object);
            this._relationships.push([]);
            let columns = t_student.getKeys();
            for (let student2 = student1 + 1; student2 < columns.length; student2++) {
                let t_score = t_student.get(columns[student2]);
                if (t_score == null)
                    throw new Error("Could not find student 2 in GroupCreator.calculateGroups()");
                let student2Object = new StudentForGroups(columns[student2], student2 + 2);
                student2Object = this.addStudent(student2Object);
                this._relationships[student1].push(+t_score);
            }
        }
        // Try to make the groups
        for (let d = 0; d < attemptedDepth; d++) {
            let set = new GroupSet(this._students.length, this._limitGroups);
            for (var s = 0; s < this._students.length; s++) {
                set.addStudentToRandomGroup(this._students[s]);
            }
            let score = set.setScore(this.calculateScore(set));
            if (this._minimumGroupSet != undefined) {
                if (score < this._minimumGroupSet.getScore()) {
                    this._minimumGroupSet = set;
                }
            }
            else {
                this._minimumGroupSet = set;
            }
        }
    }
    displayGroupSet() {
        let { acceptGroupsFunction = "acceptGroups", calculateGroupsFunction = "calculateGroups" } = this._args;
        let currentSheet = new SpreadsheetGS();
        currentSheet.activateUi();
        if (this._minimumGroupSet == undefined)
            throw new Error("Could not get minimum group set in GroupCreator.displayGroupSet()");
        let studentGroups = this._minimumGroupSet.getGroups();
        // Display the best group set
        let display = "";
        let groupNumber = 0;
        for (let group of studentGroups) {
            groupNumber++;
            display += "<h2>Group " + groupNumber + "</h2><ol>";
            for (let student of group.getStudents()) {
                display += "<li>" + student.getName() + "</li>";
            }
            display += "</ol>";
        }
        let sidebarAcceptButton = {};
        sidebarAcceptButton.text = "Accept";
        sidebarAcceptButton.function = acceptGroupsFunction;
        sidebarAcceptButton.close = true;
        sidebarAcceptButton.wait = true;
        let sidebarDeclineButton = {};
        sidebarDeclineButton.text = "Decline";
        sidebarDeclineButton.function = calculateGroupsFunction;
        sidebarDeclineButton.close = true;
        sidebarDeclineButton.wait = true;
        setCache("minimumGroupSet", this._minimumGroupSet.convertToStringArrays());
        setCache("minimumGroupSetValues", this._minimumGroupSet.convertToNumberArrays());
        currentSheet.showSidebar(display, "Groups", [sidebarAcceptButton, sidebarDeclineButton]);
    }
    addStudent(student) {
        for (let s of this._students) {
            if (s.getName() == student.getName())
                return s;
        }
        this._students.push(student);
        return student;
    }
    getStudents() {
        return this._students;
    }
}
function acceptGroups(emailAddress, className) {
    let spreadsheet = new SpreadsheetGS(getCache("spreadsheetId"));
    let sheet = spreadsheet.getSheet(getCache("sheetName"));
    let groupSet = getCache("minimumGroupSet");
    let groupSetValues = getCache("minimumGroupSetValues");
    let body = "Next " + className + " groups:\n";
    let groupNumber = 0;
    for (let group of groupSet) {
        groupNumber++;
        body += "Group #" + groupNumber + "\n";
        for (let student1 = 0; student1 < group.length; student1++) {
            body += "\t" + group[student1] + "\n";
        }
        body += "\n";
    }
    for (let group of groupSetValues) {
        for (let student1 = 0; student1 < group.length; student1++) {
            for (let student2 = student1 + 1; student2 < group.length; student2++) {
                let score = +sheet.getValue(group[student2], group[student1]);
                sheet.setValue((score + 1).toString(), group[student2], group[student1]);
            }
        }
    }
    var email = MailApp.sendEmail(emailAddress, className + " Groups", body);
    return true;
}
