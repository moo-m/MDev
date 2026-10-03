import Store, {
  StorageData,
  StorageEntry,
} from "./main.js";

export default class StorageStore {
  public collect(
    type: "localStorage" | "sessionStorage",
  ): StorageData {
    const storage = window[type];

    const entries: StorageEntry[] = [];

    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index);

      if (key === null) {
        continue;
      }

      entries.push({
        key,
        value: storage.getItem(key) ?? "",
      });
    }

    const data: StorageData = {
      type,
      entries,
    };

    Store.setStorage(type, data);

    return data;
  }

  public set(
    type: "localStorage" | "sessionStorage",
    key: string,
    value: string,
  ): void {
    if (!key.trim()) {
      return;
    }

    window[type].setItem(key, value);
    this.collect(type);
  }

  public remove(
    type: "localStorage" | "sessionStorage",
    key: string,
  ): void {
    window[type].removeItem(key);
    this.collect(type);
  }

  public clear(
    type: "localStorage" | "sessionStorage",
  ): void {
    window[type].clear();
    this.collect(type);
  }
}
