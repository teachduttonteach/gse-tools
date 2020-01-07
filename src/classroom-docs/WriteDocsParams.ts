/**
 * Parameters for writing a Google Doc
 */
export type WriteDocsParams = {
    /**
     * How many announcements to display in the document
     */
    displayAnnouncements: number,
    /**
     * Whether or not to display course work
     */
    displayCoursework: true,
    /**
     * Whether or not to display the course work titles
     */
    displayCourseworkTitle: true,
    /**
     * Whether or not to display the due dates
     */
    displayDueDate: true,
    /**
     * Whether or not to display the description of the course work
     */
    displayDescription: true,
    /**
     * Whether or not to display the materials
     */
    displayMaterials: true,
    /**
     * Whether or not to display file links in the materials
     */
    displayFiles: true,
    /**
     * Whether or not to display video links in the materials
     */
    displayVideos: true,
    /**
     * Whether or not to display urls for the links in the materials
     */
    displayLinks: true,
    /**
     * Whether or not to display form links in the materials
     */
    displayForms: true,
    /**
     * The document title
     */
    docTitle: string
  };
