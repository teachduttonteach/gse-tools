var Topic = /** @class */ (function () {
    function Topic() {
        this._object = new Map();
    }
    Topic.prototype.add = function (key, value) {
        this._object.set(key, value);
        return this;
    };
    Topic.prototype.addAnnouncement = function (key, announcement) {
        var currentTopic = this._object.get(key);
        if (currentTopic == null)
            throw new Error("Topic for " + key + " not found in Topic.get()");
        currentTopic.announcements.titles.push(announcement);
        return this;
    };
    Topic.prototype.getAnnouncements = function (topicName) {
        if (topicName == undefined)
            throw new Error("Topic name is undefined in Topic.getAnnouncements()");
        var t_topic = this._object.get(topicName);
        if (t_topic == undefined)
            throw new Error("Could not find topic " + topicName + " in Topic.getAnnouncements()");
        var t_announcements = t_topic.announcements;
        if (t_announcements == undefined)
            throw new Error("Could not find announcements for topic " + topicName + " in Topic.getAnnouncements()");
        return t_announcements;
    };
    Topic.prototype.addCourseWork = function (key, courseWork) {
        var currentTopic = this._object.get(key);
        if (currentTopic == null)
            throw new Error("Topic for " + key + " not found in Topic.get()");
        currentTopic.courseWork.titles.push(courseWork);
        return this;
    };
    Topic.prototype.getCourseWork = function (key) {
        if (key == undefined)
            throw new Error("Topic name " + key + " undefined in Topic.getCourseWork()");
        var t_topic = this._object.get(key);
        if (t_topic == undefined)
            throw new Error("Could not find topic " + key + " in Topic.getCourseWork()");
        var t_courseWork = t_topic.courseWork;
        if (t_courseWork == undefined)
            throw new Error("Could not find course work in " + key + " in Topic.getCourseWork()");
        return t_courseWork;
    };
    return Topic;
}());
