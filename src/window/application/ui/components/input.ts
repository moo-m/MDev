export default class UI_Input {
  public static create(
    placeholder = "",
  ): HTMLInputElement {
    const input =
      document.createElement("input");

    input.type = "text";
    input.placeholder = placeholder;

    input.classList.add(
      "dev-ui-input",
    );

    return input;
  }
}
