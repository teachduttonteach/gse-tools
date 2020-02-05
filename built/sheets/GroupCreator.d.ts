/**
 * Create a new GroupCreator object
 *
 * @param {GroupParams} args the parameters for the group creation
 * @return {GroupCreator} the GroupCreator object
 */
export declare function newGroupCreator(args: GroupParams): GroupCreator;
/**
 * Calculate the groups for this set
 *
 * @param {GroupCreator} obj the GroupCreator object
 * @return {GroupCreator} the object for chaining
 */
export declare function calculateGroups(obj: GroupCreator): GroupCreator;
/**
 * Display the group set found
 *
 * @param {GroupCreator} obj the GroupCreator object
 * @return {GroupCreator} the object for chaining
 */
export declare function displayGroupSet(obj: GroupCreator): GroupCreator;
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
    private _calculateScore;
    /**
     * Get the spreadsheet ID and sheet name for groups
     * @return {[string, string]} the spreadsheet ID and sheet name
     */
    private _getSpreadsheetForGroups;
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
    private _addStudent;
    /**
     * Get the list of students
     *
     * @return {Array<StudentForGroups>} the list of students
     */
    private _getStudents;
}
