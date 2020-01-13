/**
 * Type to hold topic information
 */
export declare type TopicResource = {
    /**
     * Course associated with the topic
     */
    courseId: string;
    /**
     * The topic Id to be used in other objects
     */
    topicId: string;
    /**
     * The name of the topic
     */
    name: string;
    /**
     * The last time the topic was updated
     */
    updateTime: string;
};
