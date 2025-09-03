import {ConsoleManager} from "../main.js";
import getTime from "../utils/getTime.js";
export class Logger {
  constructor() {}
  public green(...data: any[]) {
    new ConsoleManager().logNotify(data);
  }
  public red(...data: any[]) {
    new ConsoleManager().logNotify(data);
  }
  public blue(...data: any[]) {
    new ConsoleManager().logNotify(data);
  }
  public yellow(...data: any[]) {
    new ConsoleManager().logNotify(data);
  }
  public test(condition: any, data: any[]) {
    if (condition) {
      new ConsoleManager().logNotify(data);
    }
  }
  public time(label: string = "time start") {
    new ConsoleManager().logNotify(`${label}${getTime()}`);
  }
  public timeEnd(label: string = "time end") {
    new ConsoleManager().logNotify(`${label}${getTime()}`);
  }
}
