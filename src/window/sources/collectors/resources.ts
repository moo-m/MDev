import {
  SourceEntry,
  SourceType,
} from "../store/main.js";

export default class ResourceCollector {
  public async collect(): Promise<SourceEntry[]> {
    const elements =
      Array.from(
        document.querySelectorAll(
          "img,source,video,audio,iframe,object,embed",
        ),
      );

    return Promise.all(
      elements.map(
        async (element, index) => {
          const url =
            this.url(element);

          const type =
            this.type(element);

          if (!url) {
            return {
              id:
                `resource:${index}`,
              name:
                `Resource ${index + 1}`,
              url: "",
              type,
              mime: "",
              size: 0,
              status: "unavailable",
              source: "dom",
            };
          }

          const binary =
            type === "image" ||
            type === "media";

          let mime =
            this.mime(element);

          let size = 0;

          let content:
            | string
            | undefined;

          let status:
            | "available"
            | "unavailable"
            | "binary" =
            binary
              ? "binary"
              : "unavailable";

          if (!binary) {
            try {
              const response =
                await fetch(url, {
                  credentials:
                    "same-origin",
                });

              if (response.ok) {
                mime =
                  response.headers.get(
                    "content-type",
                  ) || mime;

                content =
                  await response.text();

                size =
                  new Blob([
                    content,
                  ]).size;

                status =
                  "available";
              }
            } catch {
              status =
                "unavailable";
            }
          }

          return {
            id:
              `resource:${index}:` +
              `${url}`,
            name: this.name(url),
            url,
            type,
            mime,
            size,
            content,
            status,
            source: "dom",
          };
        },
      ),
    );
  }

  private url(
    element: Element,
  ): string {
    if (
      element instanceof
      HTMLImageElement
    ) {
      return element.currentSrc ||
        element.src ||
        "";
    }

    if (
      element instanceof
      HTMLSourceElement
    ) {
      return element.src ||
        element.srcset ||
        "";
    }

    if (
      element instanceof
      HTMLVideoElement
    ) {
      return element.currentSrc ||
        element.src ||
        "";
    }

    if (
      element instanceof
      HTMLAudioElement
    ) {
      return element.currentSrc ||
        element.src ||
        "";
    }

    if (
      element instanceof
      HTMLIFrameElement
    ) {
      return element.src || "";
    }

    if (
      element instanceof
      HTMLObjectElement
    ) {
      return element.data || "";
    }

    if (
      element instanceof
      HTMLEmbedElement
    ) {
      return element.src || "";
    }

    return "";
  }

  private type(
    element: Element,
  ): SourceType {
    if (
      element instanceof
      HTMLImageElement
    ) {
      return "image";
    }

    if (
      element instanceof
      HTMLVideoElement ||
      element instanceof
      HTMLAudioElement ||
      element instanceof
      HTMLSourceElement
    ) {
      return "media";
    }

    return "other";
  }

  private mime(
    element: Element,
  ): string {
    if (
      element instanceof
      HTMLImageElement
    ) {
      return (
        element.currentSrc
          .match(
            /\.(png|jpe?g|gif|webp|svg)$/i,
          )?.[1] || ""
      );
    }

    return "";
  }

  private name(
    url: string,
  ): string {
    if (
      url.startsWith("data:")
    ) {
      return "Data Resource";
    }

    if (
      url.startsWith("blob:")
    ) {
      return "Blob Resource";
    }

    try {
      return (
        new URL(url).pathname
          .split("/")
          .filter(Boolean)
          .pop() ||
        url
      );
    } catch {
      return url;
    }
  }
}
