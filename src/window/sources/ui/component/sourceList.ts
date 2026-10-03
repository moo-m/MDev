import {
  SourceEntry,
} from "../../store/main.js";
import SourceItem from "./sourceItem.js";

export default class SourceList {
  private item =
    new SourceItem();

  public render(
    sources: SourceEntry[],
    activeId?: string,
  ): HTMLDivElement {
    const root =
      document.createElement(
        "div",
      );

    root.className =
      "dev-sources-list";

    for (
      const source of sources
    ) {
      root.appendChild(
        this.item.render(
          source,
          source.id === activeId,
        ),
      );
    }

    if (!sources.length) {
      const empty =
        document.createElement(
          "div",
        );

      empty.className =
        "dev-sources-empty";

      empty.textContent =
        "No sources found.";

      root.appendChild(empty);
    }

    return root;
  }
}
