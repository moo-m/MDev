export default class ToolbarFormatter {
  public format(): HTMLDivElement {
    const toolbar =
      document.createElement("div");

    toolbar.classList.add(
      "dev-application-toolbar",
    );

    const search =
      document.createElement("input");

    search.type = "search";
    search.placeholder = "Search...";
    search.classList.add(
      "dev-application-search",
    );

    const actions =
      document.createElement("div");

    actions.classList.add(
      "dev-application-toolbar-actions",
    );

    actions.append(
      this.button("Add", "add"),
      this.button("Refresh", "refresh"),
      this.button("Clear", "clear"),
    );

    toolbar.append(
      search,
      actions,
    );

    return toolbar;
  }

  private button(
    text: string,
    action: string,
  ): HTMLButtonElement {
    const button =
      document.createElement("button");

    button.type = "button";
    button.dataset.action = action;
    button.textContent = text;

    return button;
  }
}
