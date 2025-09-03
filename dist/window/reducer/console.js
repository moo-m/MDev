import ConsoleManager from "../console/main.js";
export class ConsoleReducer {
    constructor() { }
    logNotify(data) {
        ConsoleManager.renderLogs(data);
    }
}
