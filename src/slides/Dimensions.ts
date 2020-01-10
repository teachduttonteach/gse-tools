/**
 * Type to hold the slide and picture dimensions
 */
export type Dimensions = {
  /**
   * Total height of the slide for positioning pictures
   */
  totalHeight?: number;
  /**
   * Total width of the slide for positioning pictures
   */
  totalWidth?: number;
  /**
   * Maximum height of the picture
   */
  maxHeight?: number;
  /**
   * Maximum width of the picture
   */
  maxWidth?: number;
  /**
   * Margin between the sides of the picture and the slide
   */
  margin?: number;
};
