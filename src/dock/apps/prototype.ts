export default abstract class Proto {
  app: HTMLDivElement;
  constructor(private name: string,private icon:string) {
    this.app = document.createElement("div");
  }
  public setup() {
    this.app.textContent = this.icon;
    this.app.addEventListener("click", this.clickHandler);
    return this.app;
  }
  protected abstract clickHandler(): void;
}
