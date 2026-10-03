import StorageStore from "../../store/storageStore.js";
import { StorageData } from "../../store/main.js";

export default class LocalStorageCollector {
  private storageStore = new StorageStore();

  public collect(): StorageData {
    return this.storageStore.collect(
      "localStorage",
    );
  }
}
