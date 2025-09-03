import { ConsoleManager } from "../main.js";
import getTime from "../utils/getTime.js";
export class Logger {
    constructor() { }
    green(...data) {
        new ConsoleManager().logNotify(data);
    }
    red(...data) {
        new ConsoleManager().logNotify(data);
    }
    blue(...data) {
        new ConsoleManager().logNotify(data);
    }
    yellow(...data) {
        new ConsoleManager().logNotify(data);
    }
    test(condition, data) {
        if (condition) {
            new ConsoleManager().logNotify(data);
        }
    }
    time(label = "time start") {
        new ConsoleManager().logNotify(`${label}${getTime()}`);
    }
    timeEnd(label = "time end") {
        new ConsoleManager().logNotify(`${label}${getTime()}`);
    }
}
