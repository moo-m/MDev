import Layout from "./layout/main.js";
import LogManager from "./log/main.js";
import { FormatManager } from "./formatters/main.js";
export class ConsoleManager {
    constructor() {
        // ConsoleManager.layout = new Layout();
    }
    init() {
        //bind methods with window
        LogManager.init();
        // container.append(this.layout.main())
        return ConsoleManager.layout.init();
    }
    logNotify(content) {
        ConsoleManager.layout.main(FormatManager.init(content));
    }
}
ConsoleManager.layout = new Layout();
