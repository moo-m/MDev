import { StorageData } from "../../store/main.js";
import StorageRow from "./row.js";

export default class StorageTable {
  constructor(private data: StorageData) {}

  public format(): HTMLDivElement {
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

    const key =
      document.createElement("div");

    key.textContent = "Key";

    const value =
      document.createElement("div");

    value.textContent = "Value";

    const actions =
      document.createElement("div");

    actions.textContent = "Actions";

    header.append(
      key,
      value,
      actions,
    );

    const body =
      document.createElement("div");

    body.classList.add(
      "dev-storage-body",
    );

    for (const entry of this.data.entries) {
      body.appendChild(
        new StorageRow(entry).format(),
      );
    }

    table.append(
      header,
      body,
    );

    return table;
  }
}
