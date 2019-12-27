/**
 * Starts by reading in all students from sheet
 *  Each student becomes a StudentForGrouping object
 *  Each intersection becomes a StudentRelationship object
 */
declare class StudentForGroups {
    private _name;
    private _number;
    constructor(name: string, number: number);
    setNumber(number: number): void;
    getName(): string;
    getNumber(): number;
}
declare class GroupOfStudents {
    private _students;
    private _limitStudentsPerGroup;
    constructor(limitStudentsPerGroup: number);
    addStudentIfPossible(student: StudentForGroups): boolean;
    studentInGroup(student: StudentForGroups): boolean;
    addStudent(student: StudentForGroups): GroupOfStudents;
    getStudents(): Array<StudentForGroups>;
}
declare class GroupSet {
    private _groups;
    private _score;
    constructor(numStudents: number, limitGroups: number);
    convertToStringArrays(): Array<Array<string>>;
    convertToNumberArrays(): Array<Array<number>>;
    getRandomGroup(): GroupOfStudents;
    getScore(): number;
    setScore(s: number): number;
    addStudentToRandomGroup(student: StudentForGroups): GroupSet;
    getGroups(): Array<GroupOfStudents>;
}
export declare type GroupParams = {
    className: string;
    numGroups?: number;
    sheetName?: string;
    spreadsheetColumn?: string;
    sheetNameColumn?: string;
    attemptedDepth?: number;
    acceptGroupsFunction?: string;
    calculateGroupsFunction?: string;
    sheetNameColumnName?: string;
};
export declare type SidebarButton = {
    text: string;
    function: string;
    wait: boolean;
    close: boolean;
};
export declare class GroupCreator {
    private _limitGroups;
    private _students;
    private _relationships;
    private _minimumGroupSet;
    private _args;
    constructor(args?: GroupParams);
    calculateScore(set: GroupSet): number;
    calculateGroups(): void;
    displayGroupSet(): void;
    addStudent(student: StudentForGroups): StudentForGroups;
    getStudents(): Array<StudentForGroups>;
}
export {};
