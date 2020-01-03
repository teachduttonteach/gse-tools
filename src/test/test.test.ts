import {Test} from "./Test"

function test() {
    let testObject = new Test("log");
    testObject.testFunction(isJohnHappy, [5]);
    testObject.finish();
}

function isJohnHappy(times: number): string {
    return "Yes, he is .... over " + times + " times!";
}