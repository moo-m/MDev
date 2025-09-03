import DevTools from "../../window/main.js";
import { CONSOLET } from "../../types/dock/apps/console";
export class Console implements CONSOLET {
  consoleApp: HTMLDivElement;
  constructor() {
    this.consoleApp = document.createElement("div");
  }
  setup() {
    this.consoleApp.textContent = "e";
    this.consoleApp.addEventListener("click", () => {
      //@ts-expect-error
      const consoleWindow: HTMLDivElement = document.getElementById(
        "dev-window-screen-console",
      )!;
      if (consoleWindow) {
        consoleWindow.classList.toggle("dev-window-screen-console-hidden");
      } else {
        new DevTools().consoleApp()
      }
    });

    return this.consoleApp;
  }
}
