import CookieStore from "../../store/cookieStore.js";

export default class CookieCollector {
  private store = new CookieStore();

  public collect() {
    return this.store.collect();
  }
}
