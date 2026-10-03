//@Store
import { ConsoleManager } from "../main.js";
export default class Store {
  static consoleInfo: {
    container?: HTMLDivElement;
    main: HTMLDivElement | null;
    logs: Record<string, unknown>[];
  } = {
    logs: [{ status: "welcome", payload: ["welcome to MDev"] }],
    main: null,
  };
  public get data(): Record<string, unknown>[] {
    return Store.consoleInfo.logs;
  }
  public set data(data: Record<string, unknown>) {
    Store.consoleInfo.logs.push(data);
  }
}
