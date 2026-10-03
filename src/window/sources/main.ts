import SourceCollectors from "./collectors/main.js";
import Store, {
  SourceEntry,
} from "./store/main.js";
import SourcesComponent from "./ui/component/main.js";

export default class Sources {
  private collectors =
    new SourceCollectors();

  private component =
    new SourcesComponent();

  private root:
    HTMLDivElement | null = null;

  private sources:
    SourceEntry[] = [];

  private activeId:
    string | undefined;

  public async init(): Promise<HTMLDivElement> {
  
    await this.refresh();

    this.root =
      this.component.render(
        this.sources,
        this.activeId,
      );

    this.bindEvents();

    return this.root;
  }

  public async refresh(): Promise<void> {
    this.sources =
      await this.collectors.collect();

    if (
      !this.activeId ||
      !this.sources.some(
        source =>
          source.id ===
          this.activeId,
      )
    ) {
      this.activeId =
        this.sources[0]?.id;
    }

    this.render();
  }

  private render(): void {
    if (!this.root) {
      return;
    }

    const next =
      this.component.render(
        this.sources,
        this.activeId,
      );

    this.root.replaceChildren(
      ...Array.from(
        next.childNodes,
      ),
    );
  }

  private bindEvents(): void {
    if (!this.root) {
      return;
    }

    this.root.addEventListener(
      "click",
      async event => {
        const target =
          event.target as HTMLElement;

        const sourceButton =
          target.closest(
            "[data-source-id]",
          ) as HTMLElement | null;

        if (
          sourceButton &&
          !sourceButton.dataset.action
        ) {
          this.activeId =
            sourceButton.dataset
              .sourceId;

          this.render();
          return;
        }

        const action =
          target.dataset.action;

        if (
          action === "refresh"
        ) {
          await this.refresh();
          return;
        }

        if (
          action ===
          "copy-source"
        ) {
          await this.copy(
            target.dataset
              .sourceId,
          );

          return;
        }

        if (
          action ===
          "download-source"
        ) {
          this.download(
            target.dataset
              .sourceId,
          );

          return;
        }
      },
    );

    this.root.addEventListener(
      "input",
      event => {
        const target =
          event.target as
            HTMLInputElement;

        if (
          !target.matches(
            ".dev-sources-search",
          )
        ) {
          return;
        }

        this.filter(
          target.value,
        );
      },
    );
  }

  private filter(
    query: string,
  ): void {
    if (!this.root) {
      return;
    }

    const value =
      query
        .trim()
        .toLowerCase();

    this.root
      .querySelectorAll(
        ".dev-source-item",
      )
      .forEach(item => {
        const element =
          item as HTMLElement;

        const source =
          this.sources.find(
            entry =>
              entry.id ===
              element.dataset
                .sourceId,
          );

        if (!source) {
          return;
        }

        const text =
          [
            source.name,
            source.url,
            source.type,
            source.mime,
          ]
            .join(" ")
            .toLowerCase();

        element.style.display =
          text.includes(value)
            ? ""
            : "none";
      });
  }

  private async copy(
    id: string | undefined,
  ): Promise<void> {
    if (!id) {
      return;
    }

    const source =
      Store.getSource(id);

    if (
      !source ||
      source.content ===
        undefined
    ) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        source.content,
      );
    } catch {
      // Clipboard may be unavailable.
    }
  }

  private download(
    id: string | undefined,
  ): void {
    if (!id) {
      return;
    }

    const source =
      Store.getSource(id);

    if (
      !source ||
      source.content ===
        undefined
    ) {
      return;
    }

    const blob =
      new Blob(
        [source.content],
        {
          type:
            source.mime ||
            "text/plain",
        },
      );

    const url =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement(
        "a",
      );

    anchor.href = url;

    anchor.download =
      source.name ||
      "source.txt";

    anchor.click();

    URL.revokeObjectURL(
      url,
    );
  }
}
