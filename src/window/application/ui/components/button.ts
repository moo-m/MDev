export default class UI_Button {
  public static create(
    text: string,
    action: string,
    danger = false,
  ): HTMLButtonElement {
    const button =
      document.createElement("button");

    button.textContent = text;
    button.dataset.action = action;

    button.classList.add(
      "dev-ui-button",
    );

    if (danger) {
      button.classList.add("danger");
    }

    return button;
  }
}
