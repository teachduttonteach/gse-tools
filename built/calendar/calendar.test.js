import { CalendarGS } from './CalendarGS';
import { MapGS } from '../map/MapGS';
import { Test } from '../test/Test';
/** Test functions in app */
function test() {
    const holidayCalendar = new CalendarGS('en.usa#holiday@group.v.calendar.google.com');
    const eventOptions = {};
    const argumentValues = new MapGS();
    argumentValues.set('dateOrder', ['MD', 'DM']);
    argumentValues.set('dateDelim', ['-', '/', '.']);
    argumentValues.set('noEventString', ['Nothing', 'None']);
    argumentValues.set('titlePrefix', [' ', ' ... ']);
    const testSuite = new Test();
    testSuite.testEachArgumentOfMethod(eventOptions, argumentValues, holidayCalendar.getUpcomingDueDates.bind(holidayCalendar), [25, 'objectToTest']);
    testSuite.finish();
}
