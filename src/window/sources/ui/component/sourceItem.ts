import {
  SourceEntry,
} from "../../store/main.js";

export default class SourceItem {
  public render(
    source: SourceEntry,
    active = false,
  ): HTMLButtonElement {
    const button =
      document.createElement(
        "button",
      );

    button.type = "button";

    button.className =
      "dev-source-item";

    if (active) {
      button.classList.add(
        "active",
      );
    }

    button.dataset.sourceId =
      source.id;

    const icon =
      document.createElement(
        "span",
      );

    icon.className =
      "dev-source-item-icon";

    icon.textContent =
      this.icon(source.type);

    const body =
      document.createElement(
        "span",
      );

    body.className =
      "dev-source-item-body";

    const name =
      document.createElement(
        "span",
      );

    name.className =
      "dev-source-item-name";

    name.textContent =
      source.name;

    const url =
      document.createElement(
        "span",
      );

    url.className =
      "dev-source-item-url";

    url.textContent =
      source.url ||
      source.source ||
      "Inline";

    body.append(
      name,
      url,
    );

    const status =
      document.createElement(
        "span",
      );

    status.className =
      "dev-source-item-status";

    status.textContent =
      source.status ===
      "available"
        ? "✓"
        : source.status ===
          "inline"
        ? "●"
        : source.status ===
          "binary"
        ? "◆"
        : "—";

    button.append(
      icon,
      body,
      status,
    );

    return button;
  }

  private icon(
    type: string,
  ): string {
    switch (type) {
      case "document":
        return "▤";
      case "script":
        return "JS";
      case "stylesheet":
        return "CSS";
      case "image":
        return "IMG";
      case "media":
        return "▶";
      case "font":
        return "Aa";
      default:
        return "•";
    }
  }
}
