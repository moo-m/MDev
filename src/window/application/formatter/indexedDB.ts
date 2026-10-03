import {
  IndexedDBEntry,
  IndexedDBRecord,
} from "../store/main.js";

export default class IndexedDBFormatter {
  public format(
    databases: IndexedDBEntry[],
  ): HTMLDivElement {
    const container =
      document.createElement("div");

    container.classList.add(
      "dev-indexeddb",
    );

    const header =
      document.createElement("div");

    header.classList.add(
      "dev-storage-title",
    );

    header.textContent =
      "IndexedDB";

    container.appendChild(header);

    if (!databases.length) {
      const empty =
        document.createElement("div");

      empty.classList.add(
        "dev-application-empty",
      );

      empty.textContent =
        "No IndexedDB databases";

      container.appendChild(empty);

      return container;
    }

    const tree =
      document.createElement("div");

    tree.classList.add(
      "dev-indexeddb-tree",
    );

    for (const database of databases) {
      tree.appendChild(
        this.database(database),
      );
    }

    container.appendChild(tree);

    return container;
  }

  public records(
    database: string,
    store: string,
    records: IndexedDBRecord[],
  ): HTMLDivElement {
    const container =
      document.createElement("div");

    container.classList.add(
      "dev-indexeddb-records",
    );

    const title =
      document.createElement("div");

    title.classList.add(
      "dev-storage-title",
    );

    title.textContent =
      `${database} / ${store}`;

    container.appendChild(title);

    if (!records.length) {
      const empty =
        document.createElement("div");

      empty.classList.add(
        "dev-application-empty",
      );

      empty.textContent =
        "Object store is empty";

      container.appendChild(empty);

      return container;
    }

    const table =
      document.createElement("div");

    table.classList.add(
      "dev-storage-table",
      "dev-indexeddb-record-table",
    );

    const header =
      document.createElement("div");

    header.classList.add(
      "dev-storage-header",
    );

    header.append(
      this.cell("Key"),
      this.cell("Value"),
    );

    const body =
      document.createElement("div");

    body.classList.add(
      "dev-storage-body",
    );

    for (const record of records) {
      const row =
        document.createElement("div");

      row.classList.add(
        "dev-storage-row",
      );

      row.dataset.indexeddbRecord =
        "true";

      const key =
        document.createElement("div");

      key.classList.add(
        "dev-storage-row-key",
      );

      key.textContent =
        record.key;

      const value =
        document.createElement("div");

      value.classList.add(
        "dev-storage-row-value",
        "dev-indexeddb-record-value",
      );

      value.textContent =
        record.value;

      row.append(
        key,
        value,
      );

      body.appendChild(row);
    }

    table.append(
      header,
      body,
    );

    container.appendChild(table);

    return container;
  }

  private database(
    database: IndexedDBEntry,
  ): HTMLDivElement {
    const wrapper =
      document.createElement("div");

    wrapper.classList.add(
      "dev-indexeddb-database-wrapper",
    );

    const databaseElement =
      document.createElement("div");

    databaseElement.classList.add(
      "dev-indexeddb-database",
    );

    databaseElement.dataset.indexeddbDatabase =
      database.name;

    const arrow =
      document.createElement("span");

    arrow.classList.add(
      "dev-indexeddb-arrow",
    );

    arrow.textContent =
      "▼";

    const name =
      document.createElement("span");

    name.classList.add(
      "dev-indexeddb-database-name",
    );

    name.textContent =
      database.name;

    const version =
      document.createElement("span");

    version.classList.add(
      "dev-indexeddb-version",
    );

    version.textContent =
      `v${database.version}`;

    databaseElement.append(
      arrow,
      name,
      version,
    );

    const stores =
      document.createElement("div");

    stores.classList.add(
      "dev-indexeddb-stores",
    );

    for (
      const objectStore
      of database.objectStores
    ) {
      const item =
        document.createElement("button");

      item.type =
        "button";

      item.classList.add(
        "dev-indexeddb-store",
      );

      item.dataset.indexeddbStore =
        objectStore.name;

      item.dataset.indexeddbDatabase =
        database.name;

      const storeName =
        document.createElement("span");

      storeName.classList.add(
        "dev-indexeddb-store-name",
      );

      storeName.textContent =
        objectStore.name;

      const count =
        document.createElement("span");

      count.classList.add(
        "dev-indexeddb-store-count",
      );

      count.textContent =
        String(objectStore.count);

      item.append(
        storeName,
        count,
      );

      stores.appendChild(item);
    }

    if (!database.objectStores.length) {
      const empty =
        document.createElement("div");

      empty.classList.add(
        "dev-indexeddb-no-stores",
      );

      empty.textContent =
        "No object stores";

      stores.appendChild(empty);
    }

    wrapper.append(
      databaseElement,
      stores,
    );

    return wrapper;
  }

  private cell(
    text: string,
  ): HTMLDivElement {
    const cell =
      document.createElement("div");

    cell.textContent =
      text;

    return cell;
  }
}
