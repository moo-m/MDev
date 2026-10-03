export default class MainL {
  constructor(private content: HTMLDivElement) {}
  public render(): HTMLDivElement {
    const main: HTMLDivElement = document.createElement("div");
    main.id = "dev-elements-layout-main";
    main.appendChild(this.content);
    return main;
  }
}
