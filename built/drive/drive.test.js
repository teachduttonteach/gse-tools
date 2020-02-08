import { DriveGS } from './DriveGS';
function test() {
    const testDrive = new DriveGS();
    const testPicture = testDrive.getRandomPicture('1aI8Sx63hj3Gcnwus9i2OCtYTbr9kgstC');
    // @ts-ignore
    const testSuite = new gsetoolstest.Test();
    testSuite.testEquals('getRandomPicture', testPicture.isGoogleType(), true);
    testSuite.testEquals('getRandomPicture', testPicture.getContentType(), 'image/png');
    const testBlob = testDrive.getImageBlob('1avOU-o7D06eXqb2W-iv6OdUHgcaESebb');
    const testFileById = testDrive.getOrCreateFileById('bogus_id');
    const testFileByName = testDrive.getOrCreateFileByName('Test for ' + Date());
    const testFileFromTemplateById = testDrive.getOrCreateFileFromTemplateById('bogus_id', '1avOU-o7D06eXqb2W-iv6OdUHgcaESebb');
    const testFileFromTemplateByName = testDrive.getOrCreateFileFromTemplateByName('Test2 for ' + Date(), 'Using Google Apps Script');
}
