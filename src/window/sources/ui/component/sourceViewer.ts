import {
  SourceEntry,
} from "../../store/main.js";

export default class SourceViewer {
  public render(
    source: SourceEntry | undefined,
  ): HTMLDivElement {
    const root =
      document.createElement(
        "div",
      );

    root.className =
      "dev-source-viewer";

    if (!source) {
      root.appendChild(
        this.empty(),
      );

      return root;
    }

    root.appendChild(
      this.header(source),
    );

    root.appendChild(
      this.metadata(source),
    );

    root.appendChild(
      this.content(source),
    );

    return root;
  }

  private header(
    source: SourceEntry,
  ): HTMLElement {
    const header =
      document.createElement(
        "div",
      );

    header.className =
      "dev-source-viewer-header";

    const title =
      document.createElement(
        "div",
      );

    title.className =
      "dev-source-viewer-title";

    title.textContent =
      source.name;

    const actions =
      document.createElement(
        "div",
      );

    actions.className =
      "dev-source-viewer-actions";

    if (source.content !== undefined) {
      const copy =
        document.createElement(
          "button",
        );

      copy.type = "button";
      copy.dataset.action =
        "copy-source";
      copy.dataset.sourceId =
        source.id;

      copy.textContent =
        "Copy";

      actions.appendChild(copy);

      const download =
        document.createElement(
          "button",
        );

      download.type = "button";
      download.dataset.action =
        "download-source";
      download.dataset.sourceId =
        source.id;

      download.textContent =
        "Download";

      actions.appendChild(
        download,
      );
    }

    header.append(
      title,
      actions,
    );

    return header;
  }

  private metadata(
    source: SourceEntry,
  ): HTMLElement {
    const root =
      document.createElement(
        "div",
      );

    root.className =
      "dev-source-metadata";

    const values: Array<
      [string, string]
    > = [
      ["Type", source.type],
      ["MIME", source.mime || "—"],
      [
        "Size",
        this.formatSize(
          source.size,
        ),
      ],
      [
        "Status",
        source.status || "—",
      ],
      [
        "URL",
        source.url || "—",
      ],
    ];

    for (
      const [label, value]
      of values
    ) {
      const row =
        document.createElement(
          "div",
        );

      row.className =
        "dev-source-meta-row";

      const key =
        document.createElement(
          "span",
        );

      key.className =
        "dev-source-meta-key";

      key.textContent =
        label;

      const val =
        document.createElement(
          "span",
        );

      val.className =
        "dev-source-meta-value";

      val.textContent =
        value;

      row.append(
        key,
        val,
      );

      root.appendChild(row);
    }

    return root;
  }

  private content(
    source: SourceEntry,
  ): HTMLElement {
    if (
      source.type === "image" &&
      source.url
    ) {
      const image =
        document.createElement(
          "img",
        );

      image.className =
        "dev-source-preview-image";

      image.src =
        source.url;

      image.alt =
        source.name;

      return image;
    }

    if (
      source.type === "media" &&
      source.url
    ) {
      const media =
        document.createElement(
          "div",
        );

      media.className =
        "dev-source-media-preview";

      const element =
        source.mime.startsWith(
          "audio",
        )
          ? document.createElement(
              "audio",
            )
          : document.createElement(
              "video",
            );

      element.controls = true;
      element.src =
        source.url;

      media.appendChild(
        element,
      );

      return media;
    }

    const wrapper =
      document.createElement(
        "div",
      );

    wrapper.className =
      "dev-source-code-wrapper";

    if (
      source.content === undefined
    ) {
      const unavailable =
        document.createElement(
          "div",
        );

      unavailable.className =
        "dev-source-unavailable";

      unavailable.textContent =
        source.status ===
        "binary"
          ? "Binary resource. Content preview is not available."
          : "Source content is not available. The browser may have blocked access to this resource.";

      wrapper.appendChild(
        unavailable,
      );

      return wrapper;
    }

    const pre =
      document.createElement(
        "pre",
      );

    pre.className =
      "dev-source-code";

    const code =
      document.createElement(
        "code",
      );

    code.textContent =
      source.content;

    pre.appendChild(code);
    wrapper.appendChild(pre);

    return wrapper;
  }

  private empty(): HTMLElement {
    const empty =
      document.createElement(
        "div",
      );

    empty.className =
      "dev-source-empty-view";

    empty.textContent =
      "Select a source to inspect it.";

    return empty;
  }

  private formatSize(
    size: number,
  ): string {
    if (!size) {
      return "0 B";
    }

    const units = [
      "B",
      "KB",
      "MB",
      "GB",
    ];

    let value = size;
    let index = 0;

    while (
      value >= 1024 &&
      index <
        units.length - 1
    ) {
      value /= 1024;
      index++;
    }

    return (
      `${value.toFixed(
        index === 0 ? 0 : 2,
      )} ${units[index]}`
    );
  }
}
