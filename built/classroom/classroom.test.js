import { ClassroomGS } from './ClassroomGS';
import { MapGS } from '../map/MapGS';
import { CourseAnnouncementGS } from './CourseAnnouncementGS';
import { CourseWorkGS } from './CourseWorkGS';
/** Test functions in app */
function test() {
    const classId = '';
    const classDataParams = new MapGS();
    classDataParams.set('titlePrefix', ['DueDate', 'DUE DATE', 'due']);
    classDataParams.set('dateDelim', [':', '-', '...']);
    classDataParams.set('dateOrder', ['DMY', 'DYM', 'MDY', 'MYD', 'DMY', 'DYM']);
    const materialParamsFile = {};
    materialParamsFile.title = 'Test Material with File';
    materialParamsFile.file =
        'https://docs.google.com/document/d/1wGf1BPoSzqnMMcBVyAeLGvQZtw25DP_Q3uBtotWrdz4';
    const materialParamsVideo = {};
    materialParamsVideo.title = 'Test Material with Video';
    materialParamsVideo.video = 'https://www.youtube.com/watch?v=NLRODdJqigQ';
    const materialParamsLink = {};
    materialParamsLink.title = 'Test Material with Link';
    materialParamsLink.link =
        'https://github.com/teachduttonteach/gse-tools/edit/master/README.md';
    const materialParamsForm = {};
    materialParamsForm.title = 'Test Material with Form';
    materialParamsForm.form =
        'https://docs.google.com/forms/d/1sOweZJDYt4uyMEOqwnp6DDuf3A8yrs7Cfzs8iToMLkw/edit';
    const workParams = new MapGS();
    workParams.set('description', ['some work', 'other work', 'third work']);
    workParams.set('dueDate', [Date()]);
    workParams.set('materials', [[materialParamsFile, materialParamsForm,
            materialParamsLink, materialParamsVideo]]);
    workParams.set('title', ['Title 1', 'Title 2']);
    // @ts-ignore
    const testSuite = new gsetoolstest.Test('doc', true);
    // ClassGS
    const testClassroom = new ClassroomGS();
    const testClass = testClassroom.getClass('izg4qrh'); // gse-tools Test
    const testTopic = testClass.getTopics()[0];
    // const testCourseWork = testClass.getTopicInfo(testTopic);
    const newTopicName = 'For Testing (Second)';
    const annMaterial = {};
    annMaterial.title = 'Sample Material';
    annMaterial.link = 'https://teachduttonteach.com';
    const annMaterials = [annMaterial];
    testSuite.testMethod(testClass.getStudents.bind(testClass), [], 'getStudents');
    const students = testClass.getStudents();
    Logger.log(JSON.stringify(students));
    const newDate = new Date();
    newDate.setUTCDate(newDate.getUTCDate() + 4);
    const courseAnnouncement = new CourseAnnouncementGS('This is an announcement in the CA with materials');
    courseAnnouncement.addMaterials(annMaterials);
    const courseAnnouncement2 = new CourseAnnouncementGS('This is an announcement in the CA with materials and students');
    courseAnnouncement2.addMaterials(annMaterials);
    courseAnnouncement2.assign(students.keys());
    const courseAnnouncement3 = new CourseAnnouncementGS('This is an announcement in the CA with materials, schedule and students');
    courseAnnouncement3.addMaterials(annMaterials);
    courseAnnouncement3.assign(students.keys());
    courseAnnouncement3.schedule(newDate);
    const testCourseWork = new CourseWorkGS('Test Assignment', testTopic);
    // getName
    testSuite.testEquals('Class name', testClass.getName(), 'gse-tools Test');
    // getCalendarId
    testSuite.testEquals('Calendar Id', testClass.getCalendarId(), 'campusinternationalschool.org_classroom63913b01@group.calendar.google.com');
    // getTopics
    testSuite.testMethod(testClass.getTopics.bind(testClass), [], 'getTopics');
    // getTopicName
    testSuite.testEquals('ClassInfo first topic name', testClass.getTopicName(testTopic), 'For Testing (Second)');
    // addTopic
    testSuite.testMethod(testClass.addTopic.bind(testClass), [newTopicName], 'addTopic');
    // addAnnouncement
    testSuite.testMethod(testClass.addAnnouncement.bind(testClass), [courseAnnouncement], 'addAnnouncement1');
    // addAnnouncement
    testSuite.testMethod(testClass.addAnnouncement.bind(testClass), [courseAnnouncement2], 'addAnnouncement2');
    // addAnnouncement
    testSuite.testMethod(testClass.addAnnouncement.bind(testClass), [courseAnnouncement3], 'addAnnouncement3');
    // getAnnouncements
    testSuite.testMethod(testClass.getAnnouncements.bind(testClass), [], 'getAnnouncements');
    // addCourseWork
    testSuite.testEachArgumentOfMethod(workParams, testClass.addCourseWork.bind(testClass), [testCourseWork, 'objectToTest'], 'addCourseWork');
    // getTopicInfo
    testSuite.testMethod(testClass.getTopicInfo.bind(testClass), [testTopic], 'getCourseWork');
    // ClassroomGS
    // getObject
    testSuite.testObject(testClassroom);
    // getClass
    testSuite.testMethod(testClassroom.getClass.bind(testClassroom), ['i62tn2'], 'getClass');
    testSuite.finish();
}
