/**
 * Type to hold associated class materials
 */
export type Material = {
  /**
   * title of the associated material
   */
  title: string;
  /**
   * url to the file in Drive (optional)
   */
  file?: string;
  /**
   * YouTube link to the video (optional)
   */
  video?: string;
  /**
   * url of the link (optional)
   */
  link?: string;
  /**
   * url to the form in Drive (optional)
   */
  form?: string;
};
