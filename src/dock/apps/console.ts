import DevTools from "../../window/main.js";
import Proto from "./prototype.js";
export default class Console extends Proto {
  constructor() {
    super("console","c");
  }
  protected clickHandler() {
    new DevTools().consoleApp();
  }
}
