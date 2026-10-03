import { StorageData } from "../store/main.js";
import HeaderFormatter from "./common/header.js";
import ToolbarFormatter from "./common/toolbar.js";
import SidebarFormatter from "./sidebar/main.js";
import StorageFormatter from "./storage/main.js";
import EmptyFormatter from "./common/empty.js";

export interface GenericRow {
  key: string;
  value: string;
  action?: string;
}

export default class ApplicationFormatter {
  public shell(): HTMLDivElement {
    const root =
      document.createElement("div");

    root.classList.add(
      "dev-application",
    );

    root.append(
      new HeaderFormatter().format(),
      new ToolbarFormatter().format(),
    );

    return root;
  }

  public sidebar(): HTMLDivElement {
    return new SidebarFormatter().format();
  }

  public storage(
    data: StorageData,
  ): HTMLDivElement {
    if (!data.entries.length) {
      return new EmptyFormatter().format(
        "Storage is empty",
      );
    }

    return new StorageFormatter(
      data,
    ).format();
  }

  public generic(
    title: string,
    rows: GenericRow[],
  ): HTMLDivElement {
    const container =
      document.createElement("div");

    container.classList.add(
      "dev-storage",
    );

    const heading =
      document.createElement("div");

    heading.classList.add(
      "dev-storage-title",
    );

    heading.textContent =
      `${title} (${rows.length})`;

    const table =
      document.createElement("div");

    table.classList.add(
      "dev-storage-table",
    );

    const header =
      document.createElement("div");

    header.classList.add(
      "dev-storage-header",
    );

    header.append(
      this.cell("Name"),
      this.cell("Details"),
      this.cell("Actions"),
    );

    const body =
      document.createElement("div");

    body.classList.add(
      "dev-storage-body",
    );

    for (const row of rows) {
      const element =
        document.createElement("div");

      element.classList.add(
        "dev-storage-row",
      );

      element.dataset.key =
        row.key;

      const actions =
        document.createElement("div");

      actions.classList.add(
        "dev-storage-row-actions",
      );

      if (row.action) {
        const button =
          document.createElement("button");

        button.type = "button";
        button.dataset.action =
          row.action;

        button.dataset.key =
          row.key;

        button.textContent =
          row.action === "delete"
            ? "Delete"
            : "Open";

        actions.appendChild(button);
      }

      element.append(
        this.cell(row.key),
        this.cell(row.value),
        actions,
      );

      body.appendChild(element);
    }

    table.append(
      header,
      body,
    );

    container.append(
      heading,
      table,
    );

    return container;
  }

  private cell(
    text: string,
  ): HTMLDivElement {
    const cell =
      document.createElement("div");

    cell.textContent = text;

    return cell;
  }
}
