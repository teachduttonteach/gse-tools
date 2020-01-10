/**
 * Type to hold the parameters for the convertClassroomData method
 */
export type ClassDataParams = {
  /**
   * the prefix for the due date (default: "Due Date:")
   */
  dueDateString?: string;
  /**
   * the delimiter for the actual due date (default: "/")
   */
  dueDateDelim?: string;
  /**
   * the order to write the due date (default MDY)
   */
  dueDateOrder?: string;
};
