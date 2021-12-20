/**
 * The object to hold information about the current lesson
 */
 export type LessonInfo = {
    /**
     * The date of the lesson
     */
    lessonDate: Date;
    /**
     * The title of the lesson
     */
    title: string;
    /**
     * The due date of the lesson 
     */
    dueDate: Date;
    /**
     * The description of the lesson, optional
     */
    description?: string;
  };
  
  