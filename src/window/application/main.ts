import ApplicationCore from "./core/main.js";
import ApplicationFormatter from "./formatter/main.js";
import ApplicationLayout from "./layout/main.js";
import IndexedDBFormatter from "./formatter/indexedDB.js";
import StorageEditor from "./formatter/storage/editor.js";
import CookieStore from "./store/cookieStore.js";
import UI_Dialog from "./ui/components/dialog.js";
import UI_Confirm from "./ui/components/confirm.js";

type ApplicationSection =
    | "localStorage"
    | "sessionStorage"
    | "cookies"
    | "indexedDB"
    | "cache"
    | "serviceWorkers";

export default class Application {
    private core = new ApplicationCore();

    private formatter = new ApplicationFormatter();

    private editor = new StorageEditor();

    private cookies = new CookieStore();

    private indexedDBFormatter = new IndexedDBFormatter();

    private root: HTMLDivElement | null = null;

    private content: HTMLDivElement | null = null;

    private currentStorage: ApplicationSection = "localStorage";

    public init(): HTMLDivElement {
        this.root = this.formatter.shell();

        const sidebar = this.formatter.sidebar();

        const content = document.createElement("div");

        content.classList.add("dev-application-content");

        this.content = content;

        const layout = ApplicationLayout.render(sidebar, content);

        this.root.appendChild(layout);

        this.bindEvents();
        this.refresh();

        return this.root;
    }

    private bindEvents(): void {
        if (!this.root) {
            return;
        }

        this.root.addEventListener("click", event => {
            const target = event.target as HTMLElement;

            const storageButton = target.closest(
                "[data-storage]"
            ) as HTMLElement | null;

            if (storageButton) {
                const storage = storageButton.dataset.storage;

                if (this.isSection(storage)) {
                    this.currentStorage = storage;

                    this.setActiveSidebar(storage);

                    this.updateToolbar();
                    this.refresh();

                    return;
                }
            }

            const actionButton = target.closest(
                "[data-action]"
            ) as HTMLElement | null;

            if (!actionButton) {
                return;
            }

            const action = actionButton.dataset.action;

            if (action === "refresh") {
                this.refresh();
                return;
            }

            if (action === "add") {
                this.add();
                return;
            }

            if (action === "clear") {
                this.clear();
                return;
            }

            if (action === "delete") {
                this.delete(actionButton);
                return;
            }

            const indexedDBStore = target.closest(
                "[data-indexeddb-store]"
            ) as HTMLElement | null;

            if (indexedDBStore) {
                const database = indexedDBStore.dataset.indexeddbDatabase;

                const store = indexedDBStore.dataset.indexeddbStore;

                if (database && store) {
                    this.openIndexedDBStore(database, store);
                }

                return;
            }

            const indexedDBDatabase = target.closest(
                "[data-indexeddb-database]"
            ) as HTMLElement | null;

            if (indexedDBDatabase) {
                const parent = indexedDBDatabase.parentElement;

                const stores = parent?.querySelector(".dev-indexeddb-stores");

                const arrow = indexedDBDatabase.querySelector(
                    ".dev-indexeddb-arrow"
                );

                if (stores) {
                    const hidden = stores.classList.toggle("collapsed");

                    if (arrow) {
                        arrow.textContent = hidden ? "▶" : "▼";
                    }
                }

                return;
            }

            if (action === "edit") {
                this.edit(actionButton);
                return;
            }
        });

        this.root.addEventListener("input", event => {
            const target = event.target as HTMLInputElement;

            if (!target.matches(".dev-application-search")) {
                return;
            }

            this.filterRows(target.value);
        });

        this.updateToolbar();
    }

    private isSection(value: string | undefined): value is ApplicationSection {
        return (
            value === "localStorage" ||
            value === "sessionStorage" ||
            value === "cookies" ||
            value === "indexedDB" ||
            value === "cache" ||
            value === "serviceWorkers"
        );
    }

    private async refresh(): Promise<void> {
        if (!this.content) {
            return;
        }

        if (
            this.currentStorage === "localStorage" ||
            this.currentStorage === "sessionStorage"
        ) {
            const data = this.core.collectors[this.currentStorage]();

            this.content.replaceChildren(this.formatter.storage(data));

            return;
        }

        if (this.currentStorage === "cookies") {
            const data = this.core.collectors.cookies();

            this.content.replaceChildren(
                this.formatter.generic(
                    "Cookies",
                    data.map(item => ({
                        key: item.name,
                        value: item.value,
                        action: "delete"
                    }))
                )
            );

            return;
        }

        if (this.currentStorage === "indexedDB") {
            const data = await this.core.collectors.indexedDB();

            this.content.replaceChildren(this.indexedDBFormatter.format(data));

            return;
        }

        if (this.currentStorage === "cache") {
            const data = await this.core.collectors.cache();

            this.content.replaceChildren(
                this.formatter.generic(
                    "Cache Storage",
                    data.map(item => ({
                        key: item.name,
                        value: "Cache"
                    }))
                )
            );

            return;
        }

        if (this.currentStorage === "serviceWorkers") {
            const data = await this.core.collectors.serviceWorkers();

            this.content.replaceChildren(
                this.formatter.generic(
                    "Service Workers",
                    data.map(item => ({
                        key: item.scope,
                        value:
                            `${item.state} • ` +
                            `${item.scriptURL || "No active worker"}`
                    }))
                )
            );
        }
    }

    private async openIndexedDBStore(
        database: string,
        store: string
    ): Promise<void> {
        if (!this.content) {
            return;
        }

        const records = await this.core.collectors.indexedDBStore(
            database,
            store
        );

        this.content.replaceChildren(
            this.indexedDBFormatter.records(database, store, records)
        );
    }

private async add(): Promise<void> {
  if (
    this.currentStorage ===
      "localStorage" ||
    this.currentStorage ===
      "sessionStorage"
  ) {
    const result =
      await UI_Dialog.open({
        title:
          `Add ${this.currentStorage}`,
        fields: [
          {
            name: "key",
            label: "Key",
            placeholder:
              "Storage key",
          },
          {
            name: "value",
            label: "Value",
            type: "textarea",
            placeholder:
              "Storage value",
          },
        ],
        confirmText: "Add",
      });

    if (!result) {
      return;
    }

    const key =
      result.key.trim();

    if (!key) {
      return;
    }

    this.editor.create(
      this.currentStorage,
      key,
      result.value,
    );

    await this.refresh();

    return;
  }

  if (
    this.currentStorage ===
      "cookies"
  ) {
    const result =
      await UI_Dialog.open({
        title: "Add Cookie",
        fields: [
          {
            name: "name",
            label: "Name",
            placeholder:
              "Cookie name",
          },
          {
            name: "value",
            label: "Value",
            type: "textarea",
            placeholder:
              "Cookie value",
          },
        ],
        confirmText: "Add",
      });

    if (!result) {
      return;
    }

    const name =
      result.name.trim();

    if (!name) {
      return;
    }

    this.cookies.set(
      name,
      result.value,
    );

    await this.refresh();
  }
}

    // private clear(): void {
    //     if (
    //         this.currentStorage === "localStorage" ||
    //         this.currentStorage === "sessionStorage"
    //     ) {
    //         if (!window.confirm(`Clear ${this.currentStorage}?`)) {
    //             return;
    //         }

    //         this.editor.clear(this.currentStorage);

    //         this.refresh();

    //         return;
    //     }

    //     if (this.currentStorage === "cookies") {
    //         if (!window.confirm("Delete all accessible cookies?")) {
    //             return;
    //         }

    //         this.cookies.clear();
    //         this.refresh();
    //     }
    // }





private async clear(): Promise<void> {
    if (
        this.currentStorage !== "localStorage" &&
        this.currentStorage !== "sessionStorage" &&
        this.currentStorage !== "cookies"
    ) {
        return;
    }

    const isCookies =
        this.currentStorage === "cookies";

    const result = await UI_Confirm.open({
        title: isCookies
            ? "Delete All Cookies"
            : `Clear ${this.currentStorage}`,

        message: isCookies
            ? "Are you sure you want to delete all accessible cookies?"
            : `Are you sure you want to clear all ${this.currentStorage}?`,

        confirmText: isCookies
            ? "Delete All"
            : "Clear",

        cancelText: "Cancel",

        danger: true,
    });

    if (!result) {
        return;
    }

    if (
        this.currentStorage === "localStorage" ||
        this.currentStorage === "sessionStorage"
    ) {
        this.editor.clear(
            this.currentStorage,
        );

        await this.refresh();

        return;
    }

    if (this.currentStorage === "cookies") {
        this.cookies.clear();

        await this.refresh();
    }
}
  
    private delete(button: HTMLElement): void {
        if (this.currentStorage === "cookies") {
            const name = button.dataset.key;

            if (!name) {
                return;
            }

            if (!window.confirm(`Delete cookie "${name}"?`)) {
                return;
            }

            this.cookies.remove(name);
            this.refresh();

            return;
        }

        if (
            this.currentStorage !== "localStorage" &&
            this.currentStorage !== "sessionStorage"
        ) {
            return;
        }

        const row = button.closest(".dev-storage-row") as HTMLElement | null;

        const key = row?.dataset.key;

        if (!key) {
            return;
        }

        this.editor.remove(this.currentStorage, key);

        this.refresh();
    }

private async edit(
  button: HTMLElement,
): Promise<void> {
  if (
    this.currentStorage !==
      "localStorage" &&
    this.currentStorage !==
      "sessionStorage"
  ) {
    return;
  }

  const row =
    button.closest(
      ".dev-storage-row",
    ) as HTMLElement | null;

  const key =
    row?.dataset.key;

  if (!key) {
    return;
  }

  const value =
    window[
      this.currentStorage
    ].getItem(key) ?? "";

  const result =
    await UI_Dialog.open({
      title: `Edit "${key}"`,
      fields: [
        {
          name: "value",
          label: "Value",
          type: "textarea",
          value,
          placeholder:
            "Storage value",
        },
      ],
      confirmText: "Save",
    });

  if (!result) {
    return;
  }

  this.editor.update(
    this.currentStorage,
    key,
    result.value,
  );

  await this.refresh();
}
    private updateToolbar(): void {
        if (!this.root) {
            return;
        }

        const add = this.root.querySelector(
            '[data-action="add"]'
        ) as HTMLButtonElement | null;

        const clear = this.root.querySelector(
            '[data-action="clear"]'
        ) as HTMLButtonElement | null;

        const editable =
            this.currentStorage === "localStorage" ||
            this.currentStorage === "sessionStorage" ||
            this.currentStorage === "cookies";

        if (add) {
            add.hidden = !editable;
        }

        if (clear) {
            clear.hidden = !editable;
        }
    }

    private setActiveSidebar(storage: ApplicationSection): void {
        if (!this.root) {
            return;
        }

        const buttons = this.root.querySelectorAll("[data-storage]");

        buttons.forEach(button => {
            button.classList.toggle(
                "active",
                (button as HTMLElement).dataset.storage === storage
            );
        });
    }

    private filterRows(query: string): void {
        if (!this.root) {
            return;
        }

        const normalized = query.trim().toLowerCase();

        const rows = this.root.querySelectorAll(".dev-storage-row");

        rows.forEach(row => {
            const element = row as HTMLElement;

            const text = element.textContent?.toLowerCase() ?? "";

            element.style.display = text.includes(normalized) ? "" : "none";
        });
    }
}
