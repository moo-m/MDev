import { StorageEntry } from "../../store/main.js";

export default class StorageRow {
  constructor(private entry: StorageEntry) {}

  public format(): HTMLDivElement {
    const row =
      document.createElement("div");

    row.classList.add(
      "dev-storage-row",
    );

    row.dataset.key = this.entry.key;

    const key =
      document.createElement("div");

    key.classList.add(
      "dev-storage-row-key",
    );

    key.textContent = this.entry.key;

    const value =
      document.createElement("div");

    value.classList.add(
      "dev-storage-row-value",
    );

    value.textContent =
      this.entry.value;

    const actions =
      document.createElement("div");

    actions.classList.add(
      "dev-storage-row-actions",
    );

    const edit =
      document.createElement("button");

    edit.type = "button";
    edit.dataset.action = "edit";
    edit.textContent = "Edit";

    const remove =
      document.createElement("button");

    remove.type = "button";
    remove.dataset.action = "delete";
    remove.textContent = "Delete";

    actions.append(
      edit,
      remove,
    );

    row.append(
      key,
      value,
      actions,
    );

    return row;
  }
}
