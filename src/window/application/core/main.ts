import Collectors from "../collectors/main.js";
import ApplicationObserver from "./observer/main.js";

export default class ApplicationCore {
  public collectors = new Collectors();
  public observer = new ApplicationObserver();

  public collect() {
    return this.collectors.all();
  }
}
