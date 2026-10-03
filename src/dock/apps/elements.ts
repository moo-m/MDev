import DevTools from "../../window/main.js";
import Proto from "./prototype.js";

export default class Elements extends Proto {
  constructor() {
    super("elementsIcon","</>");
  }
  protected clickHandler() {
    new DevTools().elementsApp();
  }
}
