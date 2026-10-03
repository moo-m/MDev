import DevTools from "../../window/main.js";
import Proto from "./prototype.js";

export default class Application extends Proto {
  constructor() {
    super("storageIcon","a");
  }
  protected clickHandler() {
    new DevTools().applicationApp();
  }
}
