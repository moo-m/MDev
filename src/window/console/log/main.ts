import LogBind from "./bind.js";
import { Logger } from "./logger.js";
export default class LogManager {
  public static binder() {
    LogBind.bind(Logger);
  }
}
