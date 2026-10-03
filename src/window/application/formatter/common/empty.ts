export default class EmptyFormatter {
  public format(message: string): HTMLDivElement {
    const element =
      document.createElement("div");

    element.classList.add(
      "dev-application-empty",
    );

    element.textContent = message;

    return element;
  }
}
