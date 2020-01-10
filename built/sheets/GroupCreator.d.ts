/**
 * Starts by reading in all students from sheet
 *  Each student becomes a StudentForGrouping object
 *  Each intersection becomes a StudentRelationship object
 */
/**
 * Class to hold student information for making groups
 */
declare class StudentForGroups {
    private _name;
    private _number;
    /**
     *
     * @param {string} name name of the student
     * @param {number} number number of the row or column holding the student
     *  in the spreadsheet
     */
    constructor(name: string, number: number);
    /**
     * Set the row (or column) that holds the student in the data sheet
     *
     * @param {number} number number of the row or column holding the student
     *  in the spreadsheet
     */
    setNumber(number: number): void;
    /**
     * Get the name of the student
     *
     * @return {string} name of the student
     */
    getName(): string;
    /**
     * Get the number of the student in the data sheet
     *
     * @return {number} number (row or column) of the student
     */
    getNumber(): number;
}
/**
 * Class to hold a group of students
 *
 */
declare class GroupOfStudents {
    private _students;
    private _limitStudentsPerGroup;
    /**
     *
     * @param {number} limitStudentsPerGroup the highest number of students
     *  allowed per group
     */
    constructor(limitStudentsPerGroup: number);
    /**
     * Add a student to the group if the group is not at its maximum
     *
     * @param {StudentForGroups} student student to add to the group
     * @return {boolean} whether or not student was added
     */
    addStudentIfPossible(student: StudentForGroups): boolean;
    /**
     * Check to see if the student is in the current group
     *
     * @param {StudentForGroups} student the student to check
     * @return {boolean} true if the student is in the group
     */
    studentInGroup(student: StudentForGroups): boolean;
    /**
     * Add the student to the group
     *
     * @param {StudentForGroups} student the student to add to the group
     * @return {GroupOfStudents} the object for chaining
     */
    addStudent(student: StudentForGroups): GroupOfStudents;
    /**
     * Get the Array of students in the group
     *
     * @return {Array<StudentForGroups>} the list of students
     */
    getStudents(): Array<StudentForGroups>;
}
/**
 * Set of groups of students. A set is created in order to determine which
 *  set has the best score.
 */
declare class GroupSet {
    private _groups;
    private _score;
    /**
     *
     * @param {number} numStudents the number of total students
     * @param {number} limitGroups the number of groups
     */
    constructor(numStudents: number, limitGroups: number);
    /**
     * Converts the group set to an Array of Array of strings
     *
     * @return {Array<Array<string>>} the array of array of strings
     */
    convertToStringArrays(): Array<Array<string>>;
    /**
     * Converts the group set to an Array of Array of numbers
     *
     * @return {Array<Array<number>>} the array of array of numbers
     */
    convertToNumberArrays(): Array<Array<number>>;
    /**
     * Get a random group from the set
     *
     * @return {GroupOfStudents} the random group
     */
    getRandomGroup(): GroupOfStudents;
    /**
     * Get the score of the group set
     *
     * @return {number} the score
     */
    getScore(): number;
    /**
     * Set the score of the group set
     *
     * @param {number} s the score
     * @return {number} the score
     */
    setScore(s: number): number;
    /**
     * Add a student to a random group in the set
     *
     * @param {StudentForGroups} student the student to add
     * @return {GroupSet} the object for chaining
     */
    addStudentToRandomGroup(student: StudentForGroups): GroupSet;
    /**
     * Get the list of groups in the set
     *
     @return {Array<GroupOfStudents>} the list of groups in the set
     */
    getGroups(): Array<GroupOfStudents>;
}
/**
 * Group parameters type for defining the creation of groups for the class
 */
export declare type GroupParams = {
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
     * The column name in the settings sheet that contains the column name for
     * the sheet name that has the students and scores on it; default is
     * "Sheet Name"
     */
    sheetNameColumnName?: string;
};
/**
 * Class to create groups of students according to scores
 */
export declare class GroupCreator {
    private _limitGroups;
    private _students;
    private _relationships;
    private _minimumGroupSet;
    private _args;
    /**
     *
     * @param {GroupParams} args the parameters that define the creation of
     *  the groups
     */
    constructor(args?: GroupParams);
    /**
     * Calculate the score for the group set
     *
     * @param {GroupSet} set the group set to calculate
     * @return {number} the score of the set
     */
    calculateScore(set: GroupSet): number;
    /**
     * Calculate the groups for this set
     *
     * @return {GroupCreator} the object for chaining
     */
    calculateGroups(): GroupCreator;
    /**
     * Display the group set found
     *
     * @return {GroupCreator} the object for chaining
     */
    displayGroupSet(): GroupCreator;
    /**
     * Add a student to the list of students
     *
     * @param {StudentForGroups} student the student to add
     * @return {StudentForGroups} the student added
     */
    addStudent(student: StudentForGroups): StudentForGroups;
    /**
     * Get the list of students
     *
     * @return {Array<StudentForGroups>} the list of students
     */
    getStudents(): Array<StudentForGroups>;
}
export {};
