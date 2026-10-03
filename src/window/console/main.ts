//@console
import Store from "./store/main.js";
import Layout from "./layout/main.js";
import { FormatManager } from "./formatters/main.js";
export class ConsoleManager {
  public init(): HTMLDivElement {
    const container: HTMLDivElement = document.createElement("div");
    Store.consoleInfo.container = container;
    container.id = "dev-console-container";

    let data: Record<string, unknown>[] = new Store().data;

    //format data;
    const format: DocumentFragment = FormatManager.init(data);

    const main: HTMLDivElement = Layout.main(format);

    //stor main element
    Store.consoleInfo.main = main;

    const nav: HTMLElement = Layout.nav();

    container.append(nav, main);

    return container;
  }
  addMsg(data: Record<string, unknown>) {
    new Store().data = data;
    if (window.MDev.screens.console.activate) {
      //format receive just array
      const format: DocumentFragment = FormatManager.init([data]);
      Store.consoleInfo.main!.append(format);
    }
  }
  public clear() {
    Store.consoleInfo.logs = [];
    const inputContainer: Element =
      Store.consoleInfo.main!.getElementsByClassName(
        "dev-console-main-container-input",
      )![0];
    Store.consoleInfo.main!.replaceChildren(inputContainer);
    this.addMsg({ status: "welcome", payload: ["MDiv has been cleaned"] });
  }
}
