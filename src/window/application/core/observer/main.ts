export default class ApplicationObserver {
  private observer: MutationObserver | null = null;

  public observe(
    callback: () => void,
  ): void {
    this.disconnect();

    this.observer =
      new MutationObserver(
        mutations => {
          for (const mutation of mutations) {
            if (
              //@ts-ignore
              mutation.type ===
                "storage"
            ) {
              callback();
              return;
            }
          }
        },
      );

    window.addEventListener(
      "storage",
      callback,
    );
  }

  public disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
