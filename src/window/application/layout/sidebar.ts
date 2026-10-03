export default class ApplicationSidebarLayout {
  constructor(
    private sidebar: HTMLDivElement,
  ) {}

  public render(): HTMLDivElement {
    const container =
      document.createElement("div");

    container.classList.add(
      "dev-application-layout-sidebar",
    );

    container.appendChild(
      this.sidebar,
    );

    return container;
  }
}
