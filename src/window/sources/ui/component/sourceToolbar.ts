export default class SourceToolbar {
  public render(): HTMLDivElement {
    const root =
      document.createElement(
        "div",
      );

    root.className =
      "dev-sources-toolbar";

    const search =
      document.createElement(
        "input",
      );

    search.type = "search";
    search.className =
      "dev-sources-search";

    search.placeholder =
      "Search sources…";

    search.autocomplete =
      "off";

    const refresh =
      document.createElement(
        "button",
      );

    refresh.type = "button";
    refresh.dataset.action =
      "refresh";

    refresh.className =
      "dev-sources-toolbar-button";

    refresh.textContent =
      "Refresh";

    root.append(
      search,
      refresh,
    );

    return root;
  }
}
