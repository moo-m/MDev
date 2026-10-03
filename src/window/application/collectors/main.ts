import LocalStorageCollector from "./localStorage/main.js";
import SessionStorageCollector from "./sessionStorage/main.js";
import CookieCollector from "./cookies/main.js";
import IndexedDBCollector from "./indexedDB/main.js";
import CacheCollector from "./cache/main.js";
import ServiceWorkerCollector from "./serviceWorkers/main.js";

export default class Collectors {
  private local = new LocalStorageCollector();
  private session = new SessionStorageCollector();
  private cookiesCollector = new CookieCollector();
  private indexedDBCollector = new IndexedDBCollector();
  private cacheCollector = new CacheCollector();
  private serviceWorkerCollector =
    new ServiceWorkerCollector();

  public localStorage() {
    return this.local.collect();
  }

  public sessionStorage() {
    return this.session.collect();
  }

  public cookies() {
    return this.cookiesCollector.collect();
  }

  public indexedDB() {
    return this.indexedDBCollector.collect();
  }

  public indexedDBStore(
    database: string,
    store: string,
  ) {
    return this.indexedDBCollector.records(
      database,
      store,
    );
  }

  public cache() {
    return this.cacheCollector.collect();
  }

  public serviceWorkers() {
    return this.serviceWorkerCollector.collect();
  }

  public async all() {
    return {
      localStorage: this.localStorage(),
      sessionStorage: this.sessionStorage(),
      cookies: this.cookies(),
      indexedDB: await this.indexedDBCollector.collect(),
      cache: await this.cacheCollector.collect(),
      serviceWorkers:
        await this.serviceWorkerCollector.collect(),
    };
  }
}
