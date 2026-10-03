import IndexedDBStore from "../../store/indexedDBStore.js";

export default class IndexedDBCollector {
  private store =
    new IndexedDBStore();

  public collect() {
    return this.store.collect();
  }

  public records(
    database: string,
    store: string,
  ) {
    return this.store.records(
      database,
      store,
    );
  }

  public addRecord(
    database: string,
    store: string,
    value: unknown,
    key?: IDBValidKey,
  ) {
    return this.store.addRecord(
      database,
      store,
      value,
      key,
    );
  }

  public updateRecord(
    database: string,
    store: string,
    key: IDBValidKey,
    value: unknown,
  ) {
    return this.store.updateRecord(
      database,
      store,
      key,
      value,
    );
  }

  public deleteRecord(
    database: string,
    store: string,
    key: IDBValidKey,
  ) {
    return this.store.deleteRecord(
      database,
      store,
      key,
    );
  }
}
