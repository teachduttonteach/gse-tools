import { Work } from './Work';
/**
 * Type to hold all of the coursework in an object
 */
export declare type CourseWork = {
    /**
     * default heading level from DocLevels (default: 2)
     */
    level: string | number;
    /**
     * name of the group (topic) for this coursework
     */
    name: string;
    /**
     * list of the coursework associated with this topic
     */
    work: Array<Work>;
};
