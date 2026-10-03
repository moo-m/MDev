import { ConsoleManager } from "../main.js";
import getTime from "./utils/getTime.js";
export class Logger {
  public static green(...data: any[]) {
    new ConsoleManager().addMsg({ status: "success", payload: data });
  }
  public static red(...data: any[]) {
    new ConsoleManager().addMsg({ status: "error", payload: data });
  }
  public static blue(...data: any[]) {
    new ConsoleManager().addMsg({ status: "info", payload: data });
  }
  public static yellow(...data: any[]) {
    new ConsoleManager().addMsg({ status: "warn", payload: data });
  }
  public static test(condition: any, ...data: any[]) {
    if (condition) {
      new ConsoleManager().addMsg({ status: "test", payload: data });
    }
  }
  public static time(label: string = "time start") {
    new ConsoleManager().addMsg({
      status: "time",
      payload: [`${label}${getTime()}`],
    });
  }
  public static timeEnd(label: string = "time end") {
    new ConsoleManager().addMsg({
      status: "time",
      payload: [`${label}${getTime()}`],
    });
  }
  public static clear() {
    new ConsoleManager().clear();
  }
}
