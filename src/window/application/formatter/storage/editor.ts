import StorageStore from "../../store/storageStore.js";

export default class StorageEditor {
  private store = new StorageStore();

  public create(
    type: "localStorage" | "sessionStorage",
    key: string,
    value: string,
  ): void {
    this.store.set(
      type,
      key,
      value,
    );
  }

  public update(
    type: "localStorage" | "sessionStorage",
    key: string,
    value: string,
  ): void {
    this.store.set(
      type,
      key,
      value,
    );
  }

  public remove(
    type: "localStorage" | "sessionStorage",
    key: string,
  ): void {
    this.store.remove(
      type,
      key,
    );
  }

  public clear(
    type: "localStorage" | "sessionStorage",
  ): void {
    this.store.clear(type);
  }
}
