export default class Layout {
  container: HTMLDivElement;
  constructor() {
    this.container = document.createElement("div");
  }
  public init() {
    this.container.id = "dev-layout-console";
    this.header();
    return this.container;
  }
  public main(content: HTMLDivElement) {
    const main: HTMLDivElement = document.createElement("div");
    main.id = "dev-console-main-section";
    main.appendChild(content);
    this.container.appendChild(main);
  }
  public header(content /*HTMLDivElement*/ = undefined) {
    const head: HTMLDivElement = document.createElement("div");
    head.classList.add("dev-console-headerL");
    head.textContent = "head";
    //head.appendChild(content);
    this.container.appendChild(head);
  }
}
