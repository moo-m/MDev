import StorageStore from "../../store/storageStore.js";
import { StorageData } from "../../store/main.js";

export default class SessionStorageCollector {
  private storageStore = new StorageStore();

  public collect(): StorageData {
    return this.storageStore.collect(
      "sessionStorage",
    );
  }
}
