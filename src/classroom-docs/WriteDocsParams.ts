/**
 * Parameters for writing a Google Doc
 */
export type WriteDocsParams = {
  /**
   * Whether or not to display course work (default: true)
   */
  displayCoursework?: boolean;
  /**
   * Whether or not to display the course work titles (default: true)
   */
  displayCourseworkTitle?: boolean;
  /**
   * Whether or not to display the due dates (default: true)
   */
  displayDueDate?: boolean;
  /**
   * Whether or not to display the description of the course work
   * (default: true)
   */
  displayDescription?: boolean;
  /**
   * Whether or not to display the materials (default: true)
   */
  displayMaterials?: boolean;
  /**
   * Whether or not to display file links in the materials (default: true)
   */
  displayFiles?: boolean;
  /**
   * Whether or not to display video links in the materials (default: true)
   */
  displayVideos?: boolean;
  /**
   * Whether or not to display urls for the links in the materials
   *  (default: true)
   */
  displayLinks?: boolean;
  /**
   * Whether or not to display form links in the materials (default: true)
   */
  displayForms?: boolean;
  /**
   * The document title
   */
  docTitle: string;
};
