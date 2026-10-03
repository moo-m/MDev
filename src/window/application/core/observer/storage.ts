import Events from "../events/main.js";

export default class StorageObserver {
  private listener = (event: StorageEvent) => {
    Events.emit("storage:changed", event);
  };

  public observe(): void {
    window.addEventListener(
      "storage",
      this.listener,
    );
  }

  public disconnect(): void {
    window.removeEventListener(
      "storage",
      this.listener,
    );
  }
}
