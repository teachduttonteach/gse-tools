import {Material} from './Material';

/**
 * Type to hold an individual instance of course work
 */
export type Work = {
    /**
     * title of the task
     */
    title: string;
    /**
     * due date for the task
     */
    dueDate: string;
    /**
     * description of the task
     */
    description?: string;
    /**
     * array of materials associated with the task
     */
    materials: Array<Material>;
  }


