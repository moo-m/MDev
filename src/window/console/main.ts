import Layout from "./layout/main.js";
import LogManager from "./log/main.js";
import { FormatManager } from "./formatters/main.js";
export class ConsoleManager {
  static layout: Layout=new Layout();
  constructor() {
    // ConsoleManager.layout = new Layout();
  }
  public init(): HTMLDivElement {
    //bind methods with window
    LogManager.init();
    // container.append(this.layout.main())
    return ConsoleManager.layout.init();
  }
  logNotify(content: any) {
    ConsoleManager.layout.main(FormatManager.init(content));
  }
}

