interface gsapiTopic {
    courseId: string;
    name: string;
    topicId: string;
    updateTime: string;
}

interface gsoTopicGroup {
    level: string;
    titles: Array<any>;
}

interface gsoTopicWork {
    title: string;
    dueDate: string;
    description: string;
    materials: Array<gsoTopicMaterial>;
}

interface gsoTopicMaterial {
    file: string;
    title: string;
    video: string;
    link: string;
    form: string;
}
  
interface gsoTopic {
    [topic: string]: {
        announcements: gsoTopicGroup,
        courseWork: gsoTopicGroup,
    }
}  