import DevTools from "../../window/main.js";
import Proto from "./prototype.js";

export default class Sources extends Proto {
  constructor() {
    super("appsIcon","s");
  }
  protected clickHandler() {
    new DevTools().sourcesApp();
  }
}
