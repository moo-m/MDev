export default class CookieObserver {
  private timer: number | null = null;

  public observe(callback: () => void): void {
    this.timer = window.setInterval(
      callback,
      1000,
    );
  }

  public disconnect(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
