export default class UI_Table {
  public static create(): HTMLDivElement {
    const table =
      document.createElement("div");

    table.classList.add(
      "dev-ui-table",
    );

    return table;
  }
}
