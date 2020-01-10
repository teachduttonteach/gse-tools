/**
 * The cell range type for us in setting values
 */
export declare type CellRange = {
    /**
     * The starting row
     */
    startRow: number;
    /**
     * The starting column
     */
    startCol: number;
    /**
     * The number of rows (default: 1)
     */
    numRows?: number;
    /**
     * The number of columns (default: 1)
     */
    numCols?: number;
    /**
     * The value of the cells
     */
    value: string | Date;
};
