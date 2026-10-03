export default class ApplicationContentLayout {
  constructor(
    private content: HTMLDivElement,
  ) {}

  public render(): HTMLDivElement {
    const container =
      document.createElement("div");

    container.classList.add(
      "dev-application-content",
    );

    container.appendChild(
      this.content,
    );

    return container;
  }
}
